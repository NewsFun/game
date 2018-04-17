var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var models;
(function (models) {
    /**
     * 配置信息
     */
    var ConfigProxy = (function (_super) {
        __extends(ConfigProxy, _super);
        function ConfigProxy() {
            var _this = _super.call(this) || this;
            // 版本号
            _this.version = "1.0.0";
            /**
             * 测试登录
             */
            _this.loginByTest = true;
            /**
             * 首充礼包ID
             */
            _this.firstBuyID = "";
            /**
             * APP下载地址
             */
            _this.appDownloadPath_android = "";
            /**
             * APP下载地址
             */
            _this.appDownloadPath_ios = "";
            /**
             * 游戏精灵地址
             */
            _this.sprite_url = "";
            /**
             * 宝箱地址
             */
            _this.chest_url = "";
            /**
             * 微信登陆接口
             */
            _this.wx_api = "";
            /**
             * 返回房间时首充礼包显示的检测玩家
             */
            _this.firstBuyShowLessThan = 0;
            /**
             * 配置文件
             */
            _this.configVo = new models.vos.ConfigVo();
            /**
             * 游戏提示
             */
            _this.loadingTips = [];
            /**
             * 当前语言
             */
            _this.lang = "zh_CN";
            /**
             * 当前渠道
             */
            _this.channel = 0;
            /**
             * 游戏ID
             */
            _this.gameID = 0;
            _this.areasConfig = [];
            return _this;
        }
        /**
         * 初始化loading过程中的提示
         */
        ConfigProxy.prototype.initLoadingTip = function (data) {
            this.loadingTips = data;
            this.dispatchEvent(new egret.Event(events.LoadingTipsGetted));
        };
        /** */
        ConfigProxy.prototype.getAreaByIndex = function (index) {
            var str = "";
            str = this.areasConfig[index];
            return str;
        };
        /** */
        ConfigProxy.prototype.getKeybyArea = function (name) {
            var index = 0;
            for (var i = 0, len = this.areasConfig.length; i < len; i++) {
                if (name == this.areasConfig[i]) {
                    index = i;
                }
            }
            return index;
        };
        return ConfigProxy;
    }(egret.EventDispatcher));
    models.ConfigProxy = ConfigProxy;
    __reflect(ConfigProxy.prototype, "models.ConfigProxy");
})(models || (models = {}));
//# sourceMappingURL=ConfigProxy.js.map