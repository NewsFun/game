/**
 * @myfly
 */
var manager;
(function (manager) {
    var _sceneManager = null;
    var _eventManager = null;
    var _soundManager = null;
    var _popupManager = null;
    var _localizeManager = null;
    var _currentSceneManager = null;
    /**
     * 本地化数据管理器
     */
    function localizeManager() {
        if (!_localizeManager) {
            _localizeManager = new manager.LocalizeManager();
        }
        return _localizeManager;
    }
    manager.localizeManager = localizeManager;
    /**
     * 場景返回
     */
    function currentSceneManager() {
        if (!_currentSceneManager) {
            _currentSceneManager = new manager.CurrentSceneManager();
        }
        return _currentSceneManager;
    }
    manager.currentSceneManager = currentSceneManager;
    /**
     * 场景管理器
     */
    function sceneManager() {
        if (!_sceneManager) {
            _sceneManager = new manager.SceneManager();
        }
        return _sceneManager;
    }
    manager.sceneManager = sceneManager;
    /**
     * 弹出窗口管理器
     */
    function popupManager() {
        if (!_popupManager) {
            _popupManager = new manager.PopupManager();
        }
        return _popupManager;
    }
    manager.popupManager = popupManager;
    /**
     * 事件管理器
     */
    function eventManager() {
        if (!_eventManager) {
            _eventManager = new manager.EventManager();
        }
        return _eventManager;
    }
    manager.eventManager = eventManager;
    /**
     * 声音管理器
     */
    function soundManager() {
        if (!_soundManager) {
            _soundManager = new manager.SoundManager();
        }
        return _soundManager;
    }
    manager.soundManager = soundManager;
})(manager || (manager = {}));
//# sourceMappingURL=__init__.js.map