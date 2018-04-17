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
/**
 * @myfly
 */
var events;
(function (events) {
    /**
     * SocketServer数据事件
     */
    var ServerDataEvent = (function (_super) {
        __extends(ServerDataEvent, _super);
        function ServerDataEvent(type, msgId, msgData, carryData) {
            var _this = _super.call(this, type, false, false) || this;
            _this._msgId = -1;
            _this._carryData = null;
            _this._msgId = msgId;
            _this.data = msgData;
            _this._carryData = carryData;
            return _this;
        }
        /**
         * 创建Gate服的事件对象
         */
        ServerDataEvent.createGateServerEvent = function (msgId, msgData, carryData) {
            return new ServerDataEvent(ServerDataEvent.GATE_SERVER, msgId, msgData, carryData);
        };
        ServerDataEvent.createAccountServerEvent = function (msgId, msgData, carryData) {
            egret.log("msgId====", msgId);
            return new ServerDataEvent(ServerDataEvent.ACCOUNT_SERVER, msgId, msgData, carryData);
        };
        ServerDataEvent.createGameServerEvent = function (msgId, msgData, carryData) {
            return new ServerDataEvent(ServerDataEvent.GAME_SERVER, msgId, msgData, carryData);
        };
        ServerDataEvent.createChatEvent = function (msgId, msgData, carryData) {
            return new ServerDataEvent(ServerDataEvent.CHAT_SERVER, msgId, msgData, carryData);
        };
        Object.defineProperty(ServerDataEvent.prototype, "msgId", {
            /**
             * 返回消息ID
             */
            get: function () {
                return this._msgId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerDataEvent.prototype, "msgData", {
            /**
             * 返回消息内容，跟 this.data 等价
             */
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServerDataEvent.prototype, "carryData", {
            /**
             * 返回携带的数据
             */
            get: function () {
                return this._carryData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 账号服的事件类型
         */
        ServerDataEvent.ACCOUNT_SERVER = "ACCOUNT_SERVER";
        /**
         * Gate服的事件类型
         */
        ServerDataEvent.GATE_SERVER = "GATE_SERVER";
        ServerDataEvent.GAME_SERVER = "GAME_SERVER";
        ServerDataEvent.CHAT_SERVER = "CHAT_SERVER";
        return ServerDataEvent;
    }(egret.Event));
    events.ServerDataEvent = ServerDataEvent;
    __reflect(ServerDataEvent.prototype, "events.ServerDataEvent");
})(events || (events = {}));
//# sourceMappingURL=ServerDataEvent.js.map