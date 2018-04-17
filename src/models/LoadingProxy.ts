module models {

    /**
     * 资源加载时显示loading界面的代理
     */
    export class LoadingProxy extends egret.EventDispatcher {

        /**
         * 程序初始化时的资源组
         */
        private _appInitResGroup: ISceneResGroup;

        /**
         * 资源组，加载scene前需要预先加载的资源
         */
        private _sceneResGroups: ISceneResGroup[];

        /**
         * 当前正在加载的资源组
         */
        private _curLoadingResGroup: ISceneResGroup;

        /**
         * loading完成后要显示的场景
         */
        public nextSceneClass: any = null;


        constructor() {
            super(null);

            this._appInitResGroup = {
                scene: null,
                loaded: false,
                groups: [
                    { name: "preload", loaded: false },
                ]
            };

            // this._sceneResGroups = [
            //     {
            //         scene: scenes.HallScene,
            //         loaded: false,
            //         groups: [
            //             { name: "scene_hall", loaded: false },
            //         ]
            //     },
            //     {
            //         scene: scenes.GameScene,
            //         loaded: false,
            //         groups: [
            //             { name: "scene_game", loaded: false },
            //         ]
            //     },

            // ];
        }

        /**
         * 程序初始化时的资源组
         */
        public get appInitResGroup(): ISceneResGroup {
            return this._appInitResGroup;
        }

        /**
         * 获取加载场景所需要的资源组
         */
        public getSceneResGroup(sceneClass: any): ISceneResGroup {
            for (var i = 0, iLen = this._sceneResGroups.length; i < iLen; i++) {
                if (this._sceneResGroups[i].scene == sceneClass) {
                    return this._sceneResGroups[i];
                }
            }

            return null;
        }

        /**
         * 加载初始化的资源
         */
        public loadAppInitRes(): void {
            if (this.appInitResGroup.loaded) {
                return;
            }
            
            // 加载 default.res.json 文件
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigJsonComplete, this);

            
            RES.loadConfig("resource/default.res.json", "resource/");
        }

        private onConfigJsonComplete(): void {

            // 加载LoadingScene用到的资源
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSceneLoadingGroupComplete, this);
            RES.loadGroup("preload");
        }

        private async onSceneLoadingGroupComplete(event: RES.ResourceEvent) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSceneLoadingGroupComplete, this);

            this.dispatchEvent(new egret.Event(events.LoadingSceneResLoaded));

            egret.log("LoadingScene 加载完毕，开始加载皮肤主题配置文件...");

            // 加载皮肤主题配置文件
            // var theme = new eui.Theme("resource/default.thm.json", egret.MainContext.instance.stage);
            // theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

            await this.loadTheme();
        }

        private loadTheme() {
            return new Promise((resolve, reject) => {
                // load skin theme configuration file, you can manually modify the file. And replace the default skin.
                //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
                let theme = new eui.Theme("resource/default.thm.json", egret.MainContext.instance.stage);
                theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
            })
        }

        private onThemeLoadComplete(e: eui.UIEvent): void {
            var theme = e.currentTarget as eui.Theme;
            theme.removeEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
            egret.log("皮肤主题配置文件 加载完毕，开始加载appInitResGroup 对应的资源...");
            // 开始加载 appInitResGroup 对应的资源
            this.loadSceneResGroup(this.appInitResGroup);
        }

        /**
         * 加载资源组
         */
        public loadSceneResGroup(resGp: ISceneResGroup): void {
            this._curLoadingResGroup = resGp;

            if (resGp.loaded) {
                this._curLoadingResGroup = null;
                egret.log("场景资源组加载完成：", resGp.scene);
                this.dispatchEvent(new egret.Event(events.SceneResGroupLoaded));
                return;
            }

            var gpsLoading: ISceneResGroupLoadingItem[] = [];

            for (var i = 0, iLen = resGp.groups.length; i < iLen; i++) {
                var gp = resGp.groups[i];
                if (!gp.loaded) {
                    if (RES.isGroupLoaded(gp.name) || RES.getGroupByName(gp.name).length == 0) {
                        egret.log("资源组加载完成：", gp.name);
                        gp.loaded = true;
                    }
                    else {
                        egret.log("资源组未完成...：", gp.name);
                        RES.loadGroup(gp.name);
                        gpsLoading.push({ name: gp.name, percent: 0 });
                    }
                }
            }

            if (gpsLoading.length == 0) {
                this.setRESResourceEvent(false);
                this._curLoadingResGroup = null;
                this.dispatchEvent(new egret.Event(events.SceneResGroupLoaded));
            }
            else {
                resGp.groupsLoading = gpsLoading;
                this.setRESResourceEvent(true);
                // egret.log("资源组加载中：",resGp.scene)
                this.dispatchEvent(new events.ObjectDataEvent(events.SceneResGroupLoadProgress, 0));
            }
        }

        private setRESResourceEvent(isAdd: boolean): void {
            if (isAdd) {
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            }
            else {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            }
        }

        /**
         * preload资源组加载完成
         * preload resource group is loaded
         */
        private onResourceLoadComplete(event: RES.ResourceEvent): void {
            var someIsLoading: boolean = false;
            egret.log(event.groupName, "资源组加载完成！");
            for (var i = 0, iLen = this._curLoadingResGroup.groupsLoading.length; i < iLen; i++) {
                var gpLoading = this._curLoadingResGroup.groupsLoading[i];
                if (gpLoading.name == event.groupName) {
                    gpLoading.percent = 1;
                }
                if (gpLoading.percent != 1) {
                    someIsLoading = true;
                }
            }

            // 标记为加载完成
            for (var i = 0, iLen = this._curLoadingResGroup.groups.length; i < iLen; i++) {
                var gp = this._curLoadingResGroup.groups[i];
                if (gp.name == event.groupName) {
                    gp.loaded = true;
                    break;
                }
            }

            // ================ 根据组名做相应的处理 =================

            // 判断是不是全部加载完成了
            if (!someIsLoading) {
                this._curLoadingResGroup.loaded = true;
                this.setRESResourceEvent(false);
                this._curLoadingResGroup = null;
                this.dispatchEvent(new egret.Event(events.SceneResGroupLoaded));
            }
        }

        /**
         * 资源组加载出错
         */
        private onItemLoadError(event: RES.ResourceEvent): void {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        }
        /**
         * 资源组加载出错
         */
        private onResourceLoadError(event: RES.ResourceEvent): void {
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            this.onResourceLoadComplete(event);
        }
        /**
         * preload资源组加载进度
         */
        private onResourceLoadProgress(event: RES.ResourceEvent): void {
            var percent = 0;
            var iLen = this._curLoadingResGroup.groupsLoading.length;
            for (var i = 0; i < iLen; i++) {
                var gpLoading = this._curLoadingResGroup.groupsLoading[i];
                if (gpLoading.name == event.groupName) {
                    gpLoading.percent = event.itemsLoaded / event.itemsTotal;
                }
                percent += gpLoading.percent;
            }

            percent /= iLen;

            this.dispatchEvent(new events.ObjectDataEvent(events.SceneResGroupLoadProgress, percent));
        }

    }

}