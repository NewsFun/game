
// ================ 全局函数 =================


/**
 * 本地化翻译
 */
function _T(key: string, ...args): string {
    var arr = [key];
    if (args && args.length > 0) arr = arr.concat(args);
    return manager.localizeManager().getValue.apply(manager.localizeManager(), arr);
}



/**
 * 货币名字，3银币，5体验币（前端一律不显示新手豆）
 */
function coinName(type: number = 3): string {
    // return _T("coin_wnd");
    if (type == 3) {
        return "金币"
    } else {
        return "体验币"
    }
}

/**
 * 添加监听
 */
function g_addListener(dispatcher: egret.IEventDispatcher, type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {
    manager.eventManager().addListener(dispatcher, type, listener, thisObject, useCapture, priority);
}

/**
 * 添加监听，会删除该对象上之前的所有监听
 */
function g_addListenerUnique(dispatcher: egret.IEventDispatcher, type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {
    manager.eventManager().addListenerUnique(dispatcher, type, listener, thisObject, useCapture, priority);
}

/**
 * 删除监听
 */
function g_removeListener(dispatcher: egret.IEventDispatcher, type?: string, onlyFirst: boolean = true): void {
    manager.eventManager().removeListener(dispatcher, type, onlyFirst);
}

/**
 * 删除thisObject上的所有监听
 */
function g_removeListenerByThisObject(thisObject: any): void {
    manager.eventManager().removeListenerByThisObject(thisObject);
}

/**
 * 播放音效
 */
function sound_play_effect(name: string, volume:number, pos: number = 0, loops: number = 1): void {
    return manager.soundManager().playEffect(name,volume,pos, loops);
}

/**
 * 停止音效
 */
function sound_stop_effect(name: string): void {
    return manager.soundManager().playEffect(name);
}

/**
 * 播放语音
 */
function sound_play_voice(name: string, pos: number = 0, loops: number = 1): void {
    return manager.soundManager().playVoice(name, pos, loops);
}

/**
 * 停止语音
 */
function sound_stop_voice(name: string): void {
    return manager.soundManager().stop(name);
}

/**
 * 消息播放
 */
function sound_play_msgSound(name: string, pos: number = 0, loops: number = 1): void {
    return manager.soundManager().playVoice(name, pos, loops);
}

/**
 * 停止消息
 */
function sound_stop_msgSound(name: string): void {
    return manager.soundManager().stop(name);
}

/**
 * 播放按钮点击音效
 */
function sound_button_click(): void {
    // return;
    // sound_play_effect(SOUND_common_button);
}

/**
 * 显示弹出提示框
 * @param contentStr            提示内容
 * @param showCancel            是否显示去掉按钮，默认不显示
 * @param callbackFunc          回调函数，默认是null
 * @param callbackFuncParams    回调函数的参数，默认是null
 */
function alert_show(contentStr: string, showCancel: boolean = false,
    callbackFunc: Function = null,
    callbackFuncParams: any[] = null,
    callbackFuncThisObject = null,
    cancelFunc: Function = null,
    cancelFuncParams: any[] = null,
    cancelFuncThisObject = null, title: string = "提示") {
    var alertView = manager.popupManager().openPopup(popups.AlertView, true) as popups.AlertView;

    alertView.setContent(contentStr, title);
    alertView.showCancelBtn = showCancel;
    alertView.setCallback(callbackFunc, callbackFuncParams, callbackFuncThisObject, cancelFunc, cancelFuncParams, cancelFuncThisObject);
}

function alert_hide(): void {
    manager.popupManager().closePopup(popups.AlertView, true)
}

function getSharedCanvas(){
    const bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
    bitmapdata.$deleteSource = false;

    const texture = new egret.Texture();
    texture._setBitmapData(bitmapdata);

    egret.startTick((timeStarmp: number) => {
        egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
        bitmapdata.webGLTexture = null;
        return false;
    }, this);

    return new egret.Bitmap(texture);
}

function deBounce(callback: Function, wait: number) {
    let timer = null;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(callback, wait);
    }
}