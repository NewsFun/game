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
     * 本地存储的数据
     */
    var StorageProxy = (function (_super) {
        __extends(StorageProxy, _super);
        function StorageProxy() {
            var _this = _super.call(this, null) || this;
            _this._canPlayMusic = true;
            _this._canPlaySound = true;
            _this._canShowMessage = true;
            _this._canPlayMsgSound = true;
            _this._isXSDTips = false;
            _this._identity = "";
            _this._languages = ""; //多语言
            _this._user_id = "";
            return _this;
        }
        StorageProxy.prototype.loadData = function () {
            var lastType = egret.localStorage.getItem("lastType");
            var lastAccount = egret.localStorage.getItem("lastAccount");
            var signinkey = egret.localStorage.getItem("signinkey");
            var sid = egret.localStorage.getItem("sid");
            var wxsigninkey = egret.localStorage.getItem("wxsigninkey");
            var canPlayMusic = egret.localStorage.getItem("canPlayMusic");
            var canPlaySound = egret.localStorage.getItem("canPlaySound");
            var canPlayMsgSound = egret.localStorage.getItem("canPlayMsgSound");
            var canShowMessage = egret.localStorage.getItem("canShowMessage");
            var identity = egret.localStorage.getItem("identity");
            var user_id = egret.localStorage.getItem("user_id");
            var languages = egret.localStorage.getItem("languages");
            this._lastType = (lastType) ? Number(lastType) : 0;
            this._lastAccount = (lastAccount) ? lastAccount : "";
            this._signinkey = (signinkey) ? signinkey : "";
            this._sid = (sid) ? sid : "";
            this._wxsigninkey = (wxsigninkey) ? wxsigninkey : "";
            this._languages = (languages) ? languages : "null"; //取消默认CN中文
            this._user_id = (user_id) ? user_id : "";
            if (canPlayMusic)
                this._canPlayMusic = canPlayMusic == "true" ? true : false;
            if (canPlaySound)
                this._canPlaySound = canPlaySound == "true" ? true : false;
            if (canShowMessage)
                this._canShowMessage = canShowMessage == "true" ? true : false;
            if (canPlayMsgSound)
                this._canPlayMsgSound = canPlayMsgSound == "true" ? true : false;
            var date = new Date();
            if (identity) {
                this._identity = identity;
            }
            else {
                this.identity = String(date.getTime() + Math.random());
            }
        };
        Object.defineProperty(StorageProxy.prototype, "lastType", {
            get: function () {
                return this._lastType;
            },
            set: function (value) {
                this._lastType = value;
                egret.localStorage.setItem("lastType", this.lastType.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageProxy.prototype, "lastAccount", {
            get: function () {
                return this._lastAccount;
            },
            set: function (value) {
                this._lastAccount = value;
                egret.localStorage.setItem("lastAccount", this.lastAccount);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageProxy.prototype, "signinkey", {
            get: function () {
                return this._signinkey;
            },
            set: function (value) {
                this._signinkey = value;
                egret.localStorage.setItem("signinkey", this.signinkey);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageProxy.prototype, "user_id", {
            get: function () {
                return this._user_id;
            },
            set: function (value) {
                this._user_id = value;
                egret.localStorage.setItem("user_id", this.user_id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageProxy.prototype, "sid", {
            get: function () {
                return this._sid;
            },
            set: function (value) {
                this._sid = value;
                egret.localStorage.setItem("sid", this.signinkey);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageProxy.prototype, "wxsigninkey", {
            get: function () {
                return this._wxsigninkey;
            },
            set: function (value) {
                this._wxsigninkey = value;
                egret.localStorage.setItem("wxsigninkey", this.wxsigninkey);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageProxy.prototype, "canPlayMusic", {
            get: function () {
                return false; //this._canPlayMusic;
            },
            set: function (value) {
                this._canPlayMusic = value;
                egret.localStorage.setItem("canPlayMusic", this.canPlayMusic ? "true" : "false");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageProxy.prototype, "canPlaySound", {
            get: function () {
                return this._canPlaySound;
            },
            set: function (value) {
                this._canPlaySound = value;
                egret.localStorage.setItem("canPlaySound", this.canPlaySound ? "true" : "false");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageProxy.prototype, "canPlayMsgSound", {
            get: function () {
                return this._canPlayMsgSound;
            },
            set: function (value) {
                this._canPlayMsgSound = value;
                egret.localStorage.setItem("canPlayMsgSound", this._canPlayMsgSound ? "true" : "false");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageProxy.prototype, "isXSDTips", {
            get: function () {
                return this._isXSDTips;
            },
            set: function (value) {
                this._isXSDTips = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageProxy.prototype, "canShowMessage", {
            get: function () {
                return this._canShowMessage;
            },
            set: function (value) {
                this._canShowMessage = value;
                egret.localStorage.setItem("canShowMessage", this.canShowMessage ? "true" : "false");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageProxy.prototype, "identity", {
            get: function () {
                return this._identity;
            },
            set: function (value) {
                this._identity = value;
                egret.localStorage.setItem("identity", this.identity);
            },
            enumerable: true,
            configurable: true
        });
        return StorageProxy;
    }(egret.EventDispatcher));
    models.StorageProxy = StorageProxy;
    __reflect(StorageProxy.prototype, "models.StorageProxy");
})(models || (models = {}));
//# sourceMappingURL=StorageProxy.js.map