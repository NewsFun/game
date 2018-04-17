var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var models;
(function (models) {
    var vos;
    (function (vos) {
        /**
         * 服务器配置
         */
        var ConfigVo = (function () {
            function ConfigVo() {
                /**
                 * 账号服配置数据
                 */
                this.DoorYesNo = false;
                this.accountServerDoor = new ServerConfig();
                this.accountServer = new ServerConfig();
                /**
                 * Gate服配置数据
                 */
                this.gateServer = new ServerConfig();
                /**
                 * Game 服配置数据
                 */
                this.gameServer = new ServerConfig();
            }
            return ConfigVo;
        }());
        vos.ConfigVo = ConfigVo;
        __reflect(ConfigVo.prototype, "models.vos.ConfigVo");
        var ServerConfig = (function () {
            function ServerConfig() {
                this.serverIp = "";
                this.serverPort = 1000;
                this.serverUrl = "";
                this.serverUseUrl = false;
            }
            return ServerConfig;
        }());
        __reflect(ServerConfig.prototype, "ServerConfig");
    })(vos = models.vos || (models.vos = {}));
})(models || (models = {}));
//# sourceMappingURL=ConfigVo.js.map