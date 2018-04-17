
/**
 * @myfly
 */
module manager {

    var _sceneManager: SceneManager = null;
    var _eventManager: EventManager = null;
    var _soundManager: SoundManager = null;
    var _popupManager: PopupManager = null;
    var _localizeManager: LocalizeManager = null;
    var _currentSceneManager: CurrentSceneManager = null;

    /**
     * 本地化数据管理器
     */
    export function localizeManager(): LocalizeManager {
        if (!_localizeManager) {
            _localizeManager = new LocalizeManager();
        }
        return _localizeManager;
    }

    /**
     * 場景返回
     */
    export function currentSceneManager(): CurrentSceneManager {
        if (!_currentSceneManager) {
            _currentSceneManager = new CurrentSceneManager();
        }
        return _currentSceneManager;
    }

    /**
     * 场景管理器
     */
    export function sceneManager(): SceneManager {
        if (!_sceneManager) {
            _sceneManager = new SceneManager();
        }
        return _sceneManager;
    }

    /**
     * 弹出窗口管理器
     */
    export function popupManager(): PopupManager {
        if (!_popupManager) {
            _popupManager = new PopupManager();
        }
        return _popupManager;
    }

    /**
     * 事件管理器
     */
    export function eventManager(): EventManager {
        if (!_eventManager) {
            _eventManager = new EventManager();
        }
        return _eventManager;
    }

    /**
     * 声音管理器
     */
    export function soundManager(): SoundManager {
        if (!_soundManager) {
            _soundManager = new SoundManager();
        }
        return _soundManager;
    }

}