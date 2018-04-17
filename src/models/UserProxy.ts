module models {

    /**
     * 当前用户信息
     */
    export class UserProxy extends egret.EventDispatcher {

        private _selfUser: vos.User = new vos.User();


        private _uid: number = 0;

        private _sessionId: string = "testSessionId";


        constructor() {
            super(null);
        }


        /**
         * 当前用户，登陆成功后返回的数据
         */

        public set selfUser(value: vos.User) {
            if (value) {
                this._selfUser = value;
            }
            else {
                this._selfUser = new vos.User();
            }

        }
        public get selfUser(): vos.User {
            return this._selfUser;
        }



        /**
         * 玩家UID
         */
        public get uid(): number {
            return this._uid;
        }
        public set uid(value: number) {
            this._uid = value;
        }

        /**
         * 玩家UID
         */
        public get sessionId(): string {
            return this._sessionId;
        }
        public set sessionId(value: string) {
            this._sessionId = value;
        }

    }

}