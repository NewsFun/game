// ================ 全局函数 =================
/**
 * 本地化翻译
 */
function _T(key) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var arr = [key];
    if (args && args.length > 0)
        arr = arr.concat(args);
    return manager.localizeManager().getValue.apply(manager.localizeManager(), arr);
}
/**
 * 货币名字，3银币，5体验币（前端一律不显示新手豆）
 */
function coinName(type) {
    if (type === void 0) { type = 3; }
    // return _T("coin_wnd");
    if (type == 3) {
        return "金币";
    }
    else {
        return "体验币";
    }
}
/**
 * 添加监听
 */
function g_addListener(dispatcher, type, listener, thisObject, useCapture, priority) {
    manager.eventManager().addListener(dispatcher, type, listener, thisObject, useCapture, priority);
}
/**
 * 添加监听，会删除该对象上之前的所有监听
 */
function g_addListenerUnique(dispatcher, type, listener, thisObject, useCapture, priority) {
    manager.eventManager().addListenerUnique(dispatcher, type, listener, thisObject, useCapture, priority);
}
/**
 * 删除监听
 */
function g_removeListener(dispatcher, type, onlyFirst) {
    if (onlyFirst === void 0) { onlyFirst = true; }
    manager.eventManager().removeListener(dispatcher, type, onlyFirst);
}
/**
 * 删除thisObject上的所有监听
 */
function g_removeListenerByThisObject(thisObject) {
    manager.eventManager().removeListenerByThisObject(thisObject);
}
/**
 * 播放音效
 */
function sound_play_effect(name, volume, pos, loops) {
    if (pos === void 0) { pos = 0; }
    if (loops === void 0) { loops = 1; }
    return manager.soundManager().playEffect(name, volume, pos, loops);
}
/**
 * 停止音效
 */
function sound_stop_effect(name) {
    return manager.soundManager().playEffect(name);
}
/**
 * 播放语音
 */
function sound_play_voice(name, pos, loops) {
    if (pos === void 0) { pos = 0; }
    if (loops === void 0) { loops = 1; }
    return manager.soundManager().playVoice(name, pos, loops);
}
/**
 * 停止语音
 */
function sound_stop_voice(name) {
    return manager.soundManager().stop(name);
}
/**
 * 消息播放
 */
function sound_play_msgSound(name, pos, loops) {
    if (pos === void 0) { pos = 0; }
    if (loops === void 0) { loops = 1; }
    return manager.soundManager().playVoice(name, pos, loops);
}
/**
 * 停止消息
 */
function sound_stop_msgSound(name) {
    return manager.soundManager().stop(name);
}
/**
 * 播放按钮点击音效
 */
function sound_button_click() {
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
function alert_show(contentStr, showCancel, callbackFunc, callbackFuncParams, callbackFuncThisObject, cancelFunc, cancelFuncParams, cancelFuncThisObject, title) {
    if (showCancel === void 0) { showCancel = false; }
    if (callbackFunc === void 0) { callbackFunc = null; }
    if (callbackFuncParams === void 0) { callbackFuncParams = null; }
    if (callbackFuncThisObject === void 0) { callbackFuncThisObject = null; }
    if (cancelFunc === void 0) { cancelFunc = null; }
    if (cancelFuncParams === void 0) { cancelFuncParams = null; }
    if (cancelFuncThisObject === void 0) { cancelFuncThisObject = null; }
    if (title === void 0) { title = "提示"; }
    var alertView = manager.popupManager().openPopup(popups.AlertView, true);
    alertView.setContent(contentStr, title);
    alertView.showCancelBtn = showCancel;
    alertView.setCallback(callbackFunc, callbackFuncParams, callbackFuncThisObject, cancelFunc, cancelFuncParams, cancelFuncThisObject);
}
function alert_hide() {
    manager.popupManager().closePopup(popups.AlertView, true);
}
function getSharedCanvas() {
    var bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
    bitmapdata.$deleteSource = false;
    var texture = new egret.Texture();
    texture._setBitmapData(bitmapdata);
    egret.startTick(function (timeStarmp) {
        egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
        bitmapdata.webGLTexture = null;
        return false;
    }, this);
    return new egret.Bitmap(texture);
}
function deBounce(callback, wait) {
    var timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(callback, wait);
    };
}
//# sourceMappingURL=__function__.js.map