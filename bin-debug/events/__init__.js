var events;
(function (events) {
    /** loading tip 数据获取到 */
    events.LoadingTipsGetted = "LoadingTipsGetted";
    /** LoadingScene的资源加载完成 */
    events.LoadingSceneResLoaded = "LoadingSceneResLoaded";
    /** 场景资源组加载进度 */
    events.SceneResGroupLoadProgress = "SceneResGroupLoadProgress";
    /** 场景资源组加载完成 */
    events.SceneResGroupLoaded = "SceneResGroupLoaded";
    /** 账号服连接 */
    events.AccountServerConnect = "AccountServerConnect";
    /** 账号服关闭 */
    events.AccountServerClose = "AccountServerClose";
    /** 账号服错误 */
    events.AccountServerError = "AccountServerError";
    /** gate服连接 */
    events.GateServerConnect = "GateServerConnect";
    /** gate服关闭 */
    events.GateServerClose = "GateServerClose";
    /** gate服错误 */
    events.GateServerError = "GateServerError";
    /** 游戏服连接 */
    events.GameServerConnect = "GameServerConnect";
    /** 游戏服关闭 */
    events.GameServerClose = "GameServerClose";
    /** 游戏服错误 */
    events.GameServerError = "GameServerError";
    events.RoomTypeChanged = "RoomTypeChanged";
    events.Back = "Back";
    events.EnterRoom = "EnterRoom";
    events.SeletedArea = "SeletedArea";
    events.SeletedHead = "SeletedHead";
    events.SeletedReg = "SeletedReg";
    events.UserInfo = "UserInfo";
    events.SeletedValue = "SeletedValue";
    events.ChangeRoom = "ChangeRoom";
    events.EnterTable = "EnterTable";
    events.SelectBuyItem = "SelectBuyItem";
    // export const BackRoom: string = "BackRoom";
    events.QuickStart = "QuickStart";
    events.GameTableMenu = "GameTableMenu";
    events.MatchTableMenu = "MatchTableMenu";
    /** 点击扑克牌 */
    events.CardViewTapped = "CardViewTapped";
    /** MovieCilp资源加载完成 */
    events.MovieClipDataLoadComplete = "MovieClipDataLoadComplete";
    /** DragonBones资源加载完成 */
    events.DragonBonesDataLoadComplete = "DragonBonesDataLoadComplete";
    /**多语言 改变 */
    events.LanguagesChange = "LanguagesChange";
    /**牌桌背景变更 */
    events.TableClothChange = "TableClothChange";
    /**牌面 风格变更 */
    events.CardFaceChange = "CardFaceChange";
    /**牌背风格变更 */
    events.CardBackChange = "CardBackChange";
})(events || (events = {}));
//# sourceMappingURL=__init__.js.map