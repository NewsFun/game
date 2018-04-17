
/**
 * 接口，这里放的都是全局接口
 */

// ============== 界面接口 ===============

interface IView {
    onCreate();
    onDestroy();
}

interface IPopup extends IView {
    onClose();
}


interface ISceneController {
    init();
    onEnter();
    onExit();
}


// ============== 数据接口 ===============

interface ISceneResGroupItem {
    name: string;
    loaded: boolean;
}

interface ISceneResGroupLoadingItem {
    name: string;
    percent: number;
}

interface ISceneResGroup {
    scene: any;
    loaded: boolean;
    groups: ISceneResGroupItem[];
    groupsLoading?: ISceneResGroupLoadingItem[];
}

/**
 * 广播消息
 */
interface IBroadcastMessage {
    type: number;
    category: number;
    content: string;
    vipLevel?: number;
}