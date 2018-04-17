
module models.vos {

    /**
     * 用户信息
     */
    export class User {

        /** 用户id */
        public id: string;
        /**服务器session */
        public sid: string;
        /** 角色名 */
        public nickName: string = "";
        /**用户等级 */
        public level: number;
        /**用户金币*/
        public coin: number;
        /**用户体力 */
        public stamina: number;
        /**经验值 */
        public exp:number;
        /**头像 */
        public avatarurl:string;
        /**性别 */
        public gender:number;

        /** 游戏id */
        public game_id: number;

        /**最高分音乐 */
        public music_name: string;

        /**最高分音乐 */
        public best_score: string;

        /**最高分音乐 */
        public music_composer: string;

        /**最高分音乐 */
        public music_stars: string;

    }
}
