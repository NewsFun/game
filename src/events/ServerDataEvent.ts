/**
 * @myfly
 */
module events {

    /**
     * SocketServer数据事件
     */
    export class ServerDataEvent extends egret.Event {

        /**
         * 账号服的事件类型
         */
        public static ACCOUNT_SERVER: string = "ACCOUNT_SERVER";

        /**
         * Gate服的事件类型
         */
        public static GATE_SERVER: string = "GATE_SERVER";

        public static GAME_SERVER: string = "GAME_SERVER";

        public static CHAT_SERVER: string = "CHAT_SERVER";

        private _msgId: number = -1;
        private _carryData: any = null;

        constructor(type: string, msgId: number, msgData?: any, carryData?: any) {
            super(type, false, false);

            this._msgId = msgId;
            this.data = msgData;
            this._carryData = carryData;
        }

        /**
         * 创建Gate服的事件对象
         */
        public static createGateServerEvent(msgId: number, msgData?: any, carryData?: any): ServerDataEvent {
            return new ServerDataEvent(ServerDataEvent.GATE_SERVER, msgId, msgData, carryData);
        }

        public static createAccountServerEvent(msgId: number, msgData?: any, carryData?: any): ServerDataEvent {
            egret.log("msgId====", msgId);
            return new ServerDataEvent(ServerDataEvent.ACCOUNT_SERVER, msgId, msgData, carryData);
        }

        public static createGameServerEvent(msgId: number, msgData?: any, carryData?: any): ServerDataEvent {
            return new ServerDataEvent(ServerDataEvent.GAME_SERVER, msgId, msgData, carryData);
        }

        public static createChatEvent(msgId: number, msgData?: any, carryData?: any): ServerDataEvent {
            return new ServerDataEvent(ServerDataEvent.CHAT_SERVER, msgId, msgData, carryData);
        }

        /**
         * 返回消息ID
         */
        public get msgId(): number {
            return this._msgId;
        }

        /**
         * 返回消息内容，跟 this.data 等价
         */
        public get msgData(): any {
            return this.data;
        }

        /**
         * 返回携带的数据
         */
        public get carryData(): any {
            return this._carryData;
        }

    }
}