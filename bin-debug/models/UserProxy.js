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
     * 当前用户信息
     */
    var UserProxy = (function (_super) {
        __extends(UserProxy, _super);
        function UserProxy() {
            var _this = _super.call(this, null) || this;
            _this._selfUser = new models.vos.User();
            _this._uid = 0;
            _this._sessionId = "testSessionId";
            return _this;
        }
        Object.defineProperty(UserProxy.prototype, "selfUser", {
            get: function () {
                return this._selfUser;
            },
            /**
             * 当前用户，登陆成功后返回的数据
             */
            set: function (value) {
                if (value) {
                    this._selfUser = value;
                }
                else {
                    this._selfUser = new models.vos.User();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserProxy.prototype, "uid", {
            /**
             * 玩家UID
             */
            get: function () {
                return this._uid;
            },
            set: function (value) {
                this._uid = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserProxy.prototype, "sessionId", {
            /**
             * 玩家UID
             */
            get: function () {
                return this._sessionId;
            },
            set: function (value) {
                this._sessionId = value;
            },
            enumerable: true,
            configurable: true
        });
        return UserProxy;
    }(egret.EventDispatcher));
    models.UserProxy = UserProxy;
    __reflect(UserProxy.prototype, "models.UserProxy");
})(models || (models = {}));
//# sourceMappingURL=UserProxy.js.map