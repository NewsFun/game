// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var scenes;
(function (scenes) {
    var LoadingScene = (function (_super) {
        __extends(LoadingScene, _super);
        function LoadingScene() {
            var _this = _super.call(this) || this;
            // ====
            _this._curLoadingPercent = 0;
            _this._curTipIndex = -1;
            return _this;
            // this.setSceneSkinName();
        }
        LoadingScene.prototype.onEnter = function () {
            g_addListener(models.configProXy(), events.LoadingTipsGetted, this.onLoadingTipsGetted, this);
            var loadingXy = models.loadingXy();
            if (!loadingXy.appInitResGroup.loaded) {
                g_addListener(loadingXy, events.LoadingSceneResLoaded, this.setSceneSkinName, this);
                g_addListener(loadingXy, events.SceneResGroupLoadProgress, this.onLoadProgress, this);
                g_addListener(loadingXy, events.SceneResGroupLoaded, this.onAppInitLoadComplete, this);
                loadingXy.loadAppInitRes();
            }
            else {
                // var resGp = loadingXy.getSceneResGroup(loadingXy.nextSceneClass);
                // if (resGp) {
                //     g_addListener(loadingXy, events.SceneResGroupLoadProgress, this.onLoadProgress, this);
                //     g_addListener(loadingXy, events.SceneResGroupLoaded, this.onSceneResLoadComplete, this);
                //     loadingXy.loadSceneResGroup(resGp);
                // }
                this.setSceneSkinName();
            }
        };
        LoadingScene.prototype.onExit = function () {
            g_removeListenerByThisObject(this);
        };
        LoadingScene.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.txtPre || instance == this.loadingBar) {
                this.onLoadProgress();
            }
        };
        LoadingScene.prototype.onLoadingTipsGetted = function (e) {
            g_removeListener(models.configProXy(), events.LoadingTipsGetted);
        };
        LoadingScene.prototype.setSceneSkinName = function () {
            var rect = new eui.Rect();
            rect.top = 0;
            rect.bottom = 0;
            rect.right = 0;
            rect.left = 0;
            this.addChild(rect);
            var tiplb = new eui.Label();
            tiplb.text = "欢迎来到小游戏";
            tiplb.horizontalCenter = 0;
            tiplb.verticalCenter = 0;
            this.addChild(tiplb);
            this.loadingBar = new eui.Image();
            this.loadingBar.height = 4;
            this.loadingBar.horizontalCenter = 0;
            this.loadingBar.bottom = 322;
            this.addChild(this.loadingBar);
            this.txtPre = new eui.Label();
            this.txtPre.horizontalCenter = 0;
            this.txtPre.bottom = 264;
            this.addChild(this.txtPre);
        };
        LoadingScene.prototype.onLoadProgress = function (e) {
            if (e === void 0) { e = null; }
            if (e)
                this._curLoadingPercent = e.data;
            if (this.txtPre) {
                this.txtPre.text = Math.floor(this._curLoadingPercent * 100) + "%";
            }
            if (this.loadingBar) {
                this.loadingBar.width = 34 + Math.floor(590 * this._curLoadingPercent);
            }
        };
        /**
         * 程序初始化加载完成
         */
        LoadingScene.prototype.onAppInitLoadComplete = function (e) {
            egret.log("资源加载完成，切换到登陆场景！");
            manager.sceneManager().changeScene(scenes.GameScene);
        };
        /**
         * 场景资源加载完成
         */
        LoadingScene.prototype.onSceneResLoadComplete = function (e) {
            if (models.loadingXy().nextSceneClass != null) {
                manager.sceneManager().changeScene(models.loadingXy().nextSceneClass);
            }
            egret.log("Scene_场景加载完成。");
        };
        return LoadingScene;
    }(scenes.BaseScene));
    scenes.LoadingScene = LoadingScene;
    __reflect(LoadingScene.prototype, "scenes.LoadingScene");
})(scenes || (scenes = {}));
//# sourceMappingURL=LoadingScene.js.map