module models {

    /**
     * 配置信息
     */
    export class ConfigProxy extends egret.EventDispatcher {

        // 版本号
        public version: string = "1.0.0";

        /**
         * 测试登录
         */
        public loginByTest: boolean = true;

        /**
         * 首充礼包ID
         */
        public firstBuyID: string = "";

        /**
         * APP下载地址
         */
        public appDownloadPath_android: string = "";

        /**
         * APP下载地址
         */
        public appDownloadPath_ios: string = "";

        /**
         * 游戏精灵地址
         */
        public sprite_url: string = "";

        /**
         * 宝箱地址
         */
        public chest_url: string = "";

        /**
         * 微信登陆接口
         */
        public wx_api: string = "";

        /**
         * 返回房间时首充礼包显示的检测玩家
         */
        public firstBuyShowLessThan: number = 0;

        /**
         * 配置文件
         */
        public configVo: vos.ConfigVo = new vos.ConfigVo();

        /**
         * 游戏提示
         */
        public loadingTips: string[] = [];

        /**
         * 当前语言
         */
        public lang: string = "zh_CN";

        /**
         * 当前渠道
         */
        public channel: number = 0;

        /**
         * 游戏ID
         */
        public gameID: number = 0;

        public areasConfig: any = []

        constructor() {
            super();
        }

        /**
         * 初始化loading过程中的提示
         */
        public initLoadingTip(data: any): void {
            this.loadingTips = data;

            this.dispatchEvent(new egret.Event(events.LoadingTipsGetted));
        }
        /** */
        public getAreaByIndex(index: number): string {

            var str: string = "";
            str = this.areasConfig[index];
            return str;
        }

        /** */
        public getKeybyArea(name:string):number{

            var index:number = 0;

            for (var i = 0, len = this.areasConfig.length; i < len; i++){
                if (name == this.areasConfig[i]){
                    index = i;
                }
            }
            
            return index;

        }




    }
}