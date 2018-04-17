var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @myfly
 */
var manager;
(function (manager) {
    /**
     * 场景管理器
     */
    var SceneManager = (function () {
        function SceneManager() {
            this._sceneContainer = null;
            this._currentScene = null;
            this._lastTimer = NaN;
            ///
        }
        /**
         * 初始化
         */
        SceneManager.prototype.init = function (sceneContainer) {
            this._sceneContainer = sceneContainer;
            // 开启计时器
            egret.startTick(this.onEgretTick, this);
        };
        SceneManager.prototype.onEgretTick = function (timeStamp) {
            if (isNaN(this._lastTimer))
                this._lastTimer = timeStamp;
            var elapsedTime = timeStamp - this._lastTimer;
            this._lastTimer = timeStamp;
            // 刷新骨骼动画的世界时钟
            // if (DRAGONBONES_MOTION) dragonBones.WorldClock.clock.advanceTime(elapsedTime / 1000);
            return false;
        };
        Object.defineProperty(SceneManager.prototype, "currentScene", {
            /**
             * 返回当前正在显示的场景
             */
            get: function () {
                return this._currentScene;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 切换场景
         * @param sceneClass 场景的类
         */
        SceneManager.prototype.changeScene = function (sceneClass) {
            // 判断是不是场景基类
            if (sceneClass == scenes.BaseScene)
                return;
            // 判断是不是场景类
            if (!utils.isSuperClass(sceneClass, scenes.BaseScene)) {
                egret.log(utils.getQualifiedClassName(sceneClass), "is not a Scene.");
                return;
            }
            var oldScene = null;
            if (this._currentScene) {
                oldScene = this._currentScene;
                this._currentScene = null;
            }
            manager.eventManager().removeAllListener();
            manager.popupManager().closeAllPopups();
            // === 判断是否显示loading
            var loadingXy = models.loadingXy();
            this._currentScene = new sceneClass();
            this._sceneContainer.addChild(this._currentScene);
            this._currentScene.onEnter();
            if (oldScene) {
                oldScene.onExit();
                if (oldScene.parent)
                    oldScene.parent.removeChild(oldScene);
                oldScene = null;
            }
        };
        return SceneManager;
    }());
    manager.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "manager.SceneManager");
})(manager || (manager = {}));
//# sourceMappingURL=SceneManager.js.map