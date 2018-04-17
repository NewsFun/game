module models {

    /**
     * 本地存储的数据
     */
    export class StorageProxy extends egret.EventDispatcher {

        private _lastType: number;
        private _lastAccount: string;
        private _signinkey: string;
        private _sid: string;
        private _wxsigninkey: string;

        private _canPlayMusic: boolean = true;
        private _canPlaySound: boolean = true;
        private _canShowMessage: boolean = true;
        private _canPlayMsgSound: boolean = true;

        private _isXSDTips: boolean = false;
        private _identity: string = "";
        private _languages: string = "";//多语言

        private _user_id: string = "";

        constructor() {
            super(null);
        }

        public loadData(): void {
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

            this._languages = (languages) ? languages : "null";//取消默认CN中文

            this._user_id = (user_id) ? user_id : "";

            if (canPlayMusic) this._canPlayMusic = canPlayMusic == "true" ? true : false;
            if (canPlaySound) this._canPlaySound = canPlaySound == "true" ? true : false;
            if (canShowMessage) this._canShowMessage = canShowMessage == "true" ? true : false;
            if (canPlayMsgSound) this._canPlayMsgSound = canPlayMsgSound == "true" ? true : false;


            var date: Date = new Date();
            if (identity) { this._identity = identity } else { this.identity = String(date.getTime() + Math.random()) }
        }

        public set lastType(value: number) {
            this._lastType = value;

            egret.localStorage.setItem("lastType", this.lastType.toString());
        }

        public get lastType(): number {
            return this._lastType;
        }

        public set lastAccount(value: string) {
            this._lastAccount = value;

            egret.localStorage.setItem("lastAccount", this.lastAccount);
        }

        public get lastAccount(): string {
            return this._lastAccount;
        }

        public set signinkey(value: string) {
            this._signinkey = value;

            egret.localStorage.setItem("signinkey", this.signinkey);
        }

        public get signinkey(): string {
            return this._signinkey;
        }

        public set user_id(value: string) {
            this._user_id = value;

            egret.localStorage.setItem("user_id", this.user_id);
        }

        public get user_id(): string {
            return this._user_id;
        }


        public set sid(value: string) {
            this._sid = value;

            egret.localStorage.setItem("sid", this.signinkey);
        }

        public get sid(): string {
            return this._sid;
        }

        public set wxsigninkey(value: string) {
            this._wxsigninkey = value;

            egret.localStorage.setItem("wxsigninkey", this.wxsigninkey);
        }

        public get wxsigninkey(): string {
            return this._wxsigninkey;
        }

        public set canPlayMusic(value: boolean) {
            this._canPlayMusic = value;

            egret.localStorage.setItem("canPlayMusic", this.canPlayMusic ? "true" : "false");
        }

        public get canPlayMusic(): boolean {
            return false;//this._canPlayMusic;
        }

        public set canPlaySound(value: boolean) {
            this._canPlaySound = value;

            egret.localStorage.setItem("canPlaySound", this.canPlaySound ? "true" : "false");
        }

        public get canPlaySound(): boolean {
            return this._canPlaySound;
        }

        public set canPlayMsgSound(value: boolean) {

            this._canPlayMsgSound = value;

            egret.localStorage.setItem("canPlayMsgSound", this._canPlayMsgSound ? "true" : "false");
        }

        public get canPlayMsgSound(): boolean {
            return this._canPlayMsgSound;
        }

        public set isXSDTips(value: boolean) {
            this._isXSDTips = value;
        }

        public get isXSDTips(): boolean {
            return this._isXSDTips;
        }

        public set canShowMessage(value: boolean) {
            this._canShowMessage = value;

            egret.localStorage.setItem("canShowMessage", this.canShowMessage ? "true" : "false");
        }

        public get canShowMessage(): boolean {
            return this._canShowMessage;
        }

        public set identity(value: string) {
            this._identity = value;

            egret.localStorage.setItem("identity", this.identity);
        }

        public get identity(): string {
            return this._identity;
        }
    }

}