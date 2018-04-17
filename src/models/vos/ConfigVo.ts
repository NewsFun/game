module models.vos {

    /**
     * 服务器配置
     */
    export class ConfigVo {

        /**
         * 账号服配置数据
         */
        public DoorYesNo: boolean = false;
        public accountServerDoor: ServerConfig = new ServerConfig();
        public accountServer: ServerConfig = new ServerConfig();

        /**
         * Gate服配置数据
         */
        public gateServer: ServerConfig = new ServerConfig();

        /**
         * Game 服配置数据
         */
        public gameServer: ServerConfig = new ServerConfig();

    }

    class ServerConfig {
        public serverIp: string = "";
        public serverPort: number = 1000;
        public serverUrl: string = "";
        public serverUseUrl: boolean = false;
    }

}