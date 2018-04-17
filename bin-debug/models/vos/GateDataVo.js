var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var models;
(function (models) {
    var vos;
    (function (vos) {
        /**
         * 用户信息
         */
        var User = (function () {
            function User() {
                /** 角色名 */
                this.nickName = "";
            }
            return User;
        }());
        vos.User = User;
        __reflect(User.prototype, "models.vos.User");
    })(vos = models.vos || (models.vos = {}));
})(models || (models = {}));
//# sourceMappingURL=GateDataVo.js.map