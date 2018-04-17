
module utils {

    export function log(message?: any, ...optionalParams: any[]): void {
        optionalParams.unshift(message);
        egret.log.apply(null, optionalParams);
    }

    /**
     * 获取资源
     */
    export function getAsset(source: string, compFunc: Function, thisObject: any, type: string = RES.ResourceItem.TYPE_IMAGE): void {
        function onGetRes(data: any): void {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, type);
        }
    }

    // 获取用户登录信息 focus=1 强制更新
    export async function login(focus) {
        // 登陆获取code
        var user_id = models.storageProxy().user_id;
        egret.log("登陆，用户user_id", user_id)

        var result;
        if (!user_id || focus == 1) {
            result = await getCode()
        } else {
            // result = await platform.wxCheckSession();
            // if (result.code == 200) {
            //     result = { "code": 200, "data": "" };
            // }
            // else {
            //     result = await getCode()
            // }

            result = { "code": 200, "data": "" };
        }

        return new Promise(function (resolve, reject) {
            resolve(result)
        })
    }

    // 获取用户code
    export async function getCode() {
        let result1 = await platform.wxLogin();
        let result2 = await getOpenId(result1.data.code)
        egret.log("收到的user_id", result2);
        if (result2.data.userId) {
            models.storageProxy().user_id = result2.data.userId;
        }
        return new Promise(function (resolve, reject) {
            resolve(result2)
        })
    }

    // 根据code获取用户openid
    export async function getOpenId(code) {
        var data: any = {};
        data.code = code;
        data.userId = models.storageProxy().user_id;
        let result = await platform.request("POST", {
            action: "getUserInfo",
            data: data
        })

        return result;
    }

    // 获取用户信息并上传
    export async function saveUserInfo() {
        var _this = this;
        var user_id = models.storageProxy().user_id;
        if (!user_id) {
            console.log("错误:user_id为空")
            return false;
        }

        let result1 = await platform.wxGetUserInfo();
        if (result1.code < 0) {
            await platform.wxOpenSetting()
            return saveUserInfo()
        }
        else { //JSON.parse(JSON.stringify(result1.data))
            var data: any = {};
            data.userId = user_id;
            data.nickname = result1.data.nickName;
            data.gender = result1.data.gender;
            data.avatarUrl = result1.data.avatarUrl;
            data.country = result1.data.country;
            data.city = result1.data.city;
            data.province = result1.data.province;
            let result2 = await platform.request("POST", {
                action: 'updateUserInfo',
                data: data
            })

            return new Promise(function (resolve, reject) {
                resolve(result2)
            });
        }
    }
    // 播放音符
    export function playMusic(musicname: string, volume: number) {
        var audio = platform.createInnerAudioContext();
        audio.src = 'resource/mp3/' + musicname + '.mp3';
        audio.volume = volume;
        audio.play();
        audio.onEnded(function () {
            audio.destroy();
        });
    }
}