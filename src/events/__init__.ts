
module events {

    /** loading tip 数据获取到 */
    export const LoadingTipsGetted = "LoadingTipsGetted";

    /** LoadingScene的资源加载完成 */
    export const LoadingSceneResLoaded = "LoadingSceneResLoaded";
    /** 场景资源组加载进度 */
    export const SceneResGroupLoadProgress = "SceneResGroupLoadProgress";
    /** 场景资源组加载完成 */
    export const SceneResGroupLoaded = "SceneResGroupLoaded";

    /** 账号服连接 */
    export const AccountServerConnect = "AccountServerConnect";
    /** 账号服关闭 */
    export const AccountServerClose = "AccountServerClose";
    /** 账号服错误 */
    export const AccountServerError = "AccountServerError";

    /** gate服连接 */
    export const GateServerConnect = "GateServerConnect";
    /** gate服关闭 */
    export const GateServerClose = "GateServerClose";
    /** gate服错误 */
    export const GateServerError = "GateServerError";

    /** 游戏服连接 */
    export const GameServerConnect = "GameServerConnect";
    /** 游戏服关闭 */
    export const GameServerClose = "GameServerClose";
    /** 游戏服错误 */
    export const GameServerError = "GameServerError";

    export const RoomTypeChanged: string = "RoomTypeChanged";
    export const Back: string = "Back";
    export const EnterRoom: string = "EnterRoom";
    export const SeletedArea: string = "SeletedArea";
    export const SeletedHead: string = "SeletedHead";
    export const SeletedReg: string = "SeletedReg";

    export const UserInfo: string = "UserInfo";


    export const SeletedValue: string = "SeletedValue";
    export const ChangeRoom: string = "ChangeRoom";
    export const EnterTable: string = "EnterTable";

    export const SelectBuyItem: string = "SelectBuyItem";


    // export const BackRoom: string = "BackRoom";
    export const QuickStart: string = "QuickStart";

    export const GameTableMenu: string = "GameTableMenu";

    export const MatchTableMenu: string = "MatchTableMenu";

    /** 点击扑克牌 */
    export const CardViewTapped: string = "CardViewTapped";

    /** MovieCilp资源加载完成 */
    export const MovieClipDataLoadComplete: string = "MovieClipDataLoadComplete";
    /** DragonBones资源加载完成 */
    export const DragonBonesDataLoadComplete: string = "DragonBonesDataLoadComplete";

    /**多语言 改变 */
    export const LanguagesChange: string = "LanguagesChange";

    /**牌桌背景变更 */
    export const TableClothChange: string = "TableClothChange";

    /**牌面 风格变更 */
    export const CardFaceChange: string = "CardFaceChange";

    /**牌背风格变更 */
    export const CardBackChange: string = "CardBackChange";


}