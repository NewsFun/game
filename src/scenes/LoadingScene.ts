// TypeScript file

module scenes {

    export class LoadingScene extends scenes.BaseScene {

        private loadingBar: eui.Image;
        private txtPre: eui.Label;

        // ====
        private _curLoadingPercent: number = 0;
        private _curTipIndex: number = -1;

        constructor() {
            super();

            // this.setSceneSkinName();
        }

        public onEnter(): void {
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

        }

        public onExit(): void {
            g_removeListenerByThisObject(this);
        }

        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
            if (instance == this.txtPre || instance == this.loadingBar) {
                this.onLoadProgress();
            }
        }

        private onLoadingTipsGetted(e: egret.Event): void {
            g_removeListener(models.configProXy(), events.LoadingTipsGetted);
        }

        private setSceneSkinName(): void {

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
        }

        private onLoadProgress(e: events.ObjectDataEvent = null): void {
            if (e) this._curLoadingPercent = e.data;

            if (this.txtPre) {
                this.txtPre.text = Math.floor(this._curLoadingPercent * 100) + "%";
            }
            if (this.loadingBar) {
                this.loadingBar.width = 34 + Math.floor(590 * this._curLoadingPercent);
            }
        }

        /**
         * 程序初始化加载完成
         */
        private onAppInitLoadComplete(e: egret.Event): void {
            egret.log("资源加载完成，切换到登陆场景！");
            manager.sceneManager().changeScene(scenes.GameScene);
        }

        /**
         * 场景资源加载完成
         */
        private onSceneResLoadComplete(e: egret.Event): void {

            if (models.loadingXy().nextSceneClass != null) {
                manager.sceneManager().changeScene(models.loadingXy().nextSceneClass);
            }

            egret.log("Scene_场景加载完成。");

        }
    }
}