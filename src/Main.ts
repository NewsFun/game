/**
 * 程序启动入口
 * 
 */

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */

    constructor() {
        super();
        egret.log("start egret main");
        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private init(e: egret.Event = null): void {
        egret.log("main.init");

        if (e) this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

        this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;

        //注入自定义的素材解析器
        this.stage.registerImplementation("eui.IAssetAdapter", new utils.AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new utils.ThemeAdapter());

        //设置文字默认字体
        egret.TextField.default_fontFamily = "黑体";
        egret.ImageLoader.crossOrigin = "anonymous";

        // 初始化场景管理
        manager.sceneManager().init(this);
        manager.sceneManager().changeScene(scenes.LoadingScene);

        //进入加载场景
        egret.log("main.init ok.");
    }

    private async runGame() {
        if (this.stage) this.init();
        else this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

    }
    private async setUserInfo(){
        //上传用户唯一openid
        let result1 = await utils.login(0);
        //上传用户信息
        let result2 = await utils.saveUserInfo();

        var userDate = result2['data'];

        egret.log("用户信息", userDate)
        models.userProXy().selfUser.id = userDate.id;
        models.userProXy().selfUser.nickName = userDate.userBaseInfo.nickname;
        models.userProXy().selfUser.avatarurl = userDate.userBaseInfo.avatarUrl;
        models.userProXy().selfUser.gender = userDate.userBaseInfo.gender;
        models.userProXy().selfUser.exp = userDate.exp;
        models.userProXy().selfUser.level = userDate.level;
        models.userProXy().selfUser.stamina = userDate.stamina;
        models.userProXy().selfUser.coin = userDate.gold;

        var openDataContext = platform.getOpenDataContext();
        openDataContext.postMessage({
            'key': 'setUserCloudStorage',
            'keyList': [
                { "key": "userId", "value": models.userProXy().selfUser.id + "" },
                { "key": "exp", "value": models.userProXy().selfUser.exp + "" },
                { "key": "level", "value": models.userProXy().selfUser.level + "" },
            ],
        })
    }
}

