/**
 * @myfly
 */
module manager {

    /**
     * 场景管理器
     */
    export class SceneManager {

        private _sceneContainer: egret.DisplayObjectContainer = null;

        private _currentScene: scenes.BaseScene = null;

        private _lastTimer: number = NaN;

        constructor() {
            ///
        }

        /**
         * 初始化
         */
        public init(sceneContainer: egret.DisplayObjectContainer): void {
            this._sceneContainer = sceneContainer;

            // 开启计时器
            egret.startTick(this.onEgretTick, this);
        }

        private onEgretTick(timeStamp: number): boolean {
            if (isNaN(this._lastTimer)) this._lastTimer = timeStamp;

            var elapsedTime = timeStamp - this._lastTimer;
            this._lastTimer = timeStamp;

            // 刷新骨骼动画的世界时钟
            // if (DRAGONBONES_MOTION) dragonBones.WorldClock.clock.advanceTime(elapsedTime / 1000);

            return false;
        }

        /**
         * 返回当前正在显示的场景
         */
        public get currentScene(): scenes.BaseScene {
            return this._currentScene;
        }

        /**
         * 切换场景
         * @param sceneClass 场景的类
         */
        public changeScene(sceneClass: any): void {

            // 判断是不是场景基类
            if (sceneClass == scenes.BaseScene) return;
            // 判断是不是场景类
            if (!utils.isSuperClass(sceneClass, scenes.BaseScene)) {
                egret.log(utils.getQualifiedClassName(sceneClass), "is not a Scene.");
                return;
            }

            var oldScene: scenes.BaseScene = null;

            if (this._currentScene) {
                oldScene = this._currentScene;
                this._currentScene = null;
            }

            eventManager().removeAllListener();
            manager.popupManager().closeAllPopups();

            // === 判断是否显示loading
            var loadingXy = models.loadingXy();
            this._currentScene = new sceneClass();
            this._sceneContainer.addChild(this._currentScene);
            this._currentScene.onEnter();

            if (oldScene) {
                oldScene.onExit();
                if (oldScene.parent) oldScene.parent.removeChild(oldScene);
                oldScene = null;
            }
        }
    }

}