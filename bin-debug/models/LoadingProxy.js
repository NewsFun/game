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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var models;
(function (models) {
    /**
     * 资源加载时显示loading界面的代理
     */
    var LoadingProxy = (function (_super) {
        __extends(LoadingProxy, _super);
        function LoadingProxy() {
            var _this = _super.call(this, null) || this;
            /**
             * loading完成后要显示的场景
             */
            _this.nextSceneClass = null;
            _this._appInitResGroup = {
                scene: null,
                loaded: false,
                groups: [
                    { name: "preload", loaded: false },
                ]
            };
            return _this;
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
        Object.defineProperty(LoadingProxy.prototype, "appInitResGroup", {
            /**
             * 程序初始化时的资源组
             */
            get: function () {
                return this._appInitResGroup;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取加载场景所需要的资源组
         */
        LoadingProxy.prototype.getSceneResGroup = function (sceneClass) {
            for (var i = 0, iLen = this._sceneResGroups.length; i < iLen; i++) {
                if (this._sceneResGroups[i].scene == sceneClass) {
                    return this._sceneResGroups[i];
                }
            }
            return null;
        };
        /**
         * 加载初始化的资源
         */
        LoadingProxy.prototype.loadAppInitRes = function () {
            if (this.appInitResGroup.loaded) {
                return;
            }
            // 加载 default.res.json 文件
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigJsonComplete, this);
            RES.loadConfig("resource/default.res.json", "resource/");
        };
        LoadingProxy.prototype.onConfigJsonComplete = function () {
            // 加载LoadingScene用到的资源
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSceneLoadingGroupComplete, this);
            RES.loadGroup("preload");
        };
        LoadingProxy.prototype.onSceneLoadingGroupComplete = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSceneLoadingGroupComplete, this);
                            this.dispatchEvent(new egret.Event(events.LoadingSceneResLoaded));
                            egret.log("LoadingScene 加载完毕，开始加载皮肤主题配置文件...");
                            // 加载皮肤主题配置文件
                            // var theme = new eui.Theme("resource/default.thm.json", egret.MainContext.instance.stage);
                            // theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
                            return [4 /*yield*/, this.loadTheme()];
                        case 1:
                            // 加载皮肤主题配置文件
                            // var theme = new eui.Theme("resource/default.thm.json", egret.MainContext.instance.stage);
                            // theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        LoadingProxy.prototype.loadTheme = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // load skin theme configuration file, you can manually modify the file. And replace the default skin.
                //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
                var theme = new eui.Theme("resource/default.thm.json", egret.MainContext.instance.stage);
                theme.addEventListener(eui.UIEvent.COMPLETE, _this.onThemeLoadComplete, _this);
            });
        };
        LoadingProxy.prototype.onThemeLoadComplete = function (e) {
            var theme = e.currentTarget;
            theme.removeEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
            egret.log("皮肤主题配置文件 加载完毕，开始加载appInitResGroup 对应的资源...");
            // 开始加载 appInitResGroup 对应的资源
            this.loadSceneResGroup(this.appInitResGroup);
        };
        /**
         * 加载资源组
         */
        LoadingProxy.prototype.loadSceneResGroup = function (resGp) {
            this._curLoadingResGroup = resGp;
            if (resGp.loaded) {
                this._curLoadingResGroup = null;
                egret.log("场景资源组加载完成：", resGp.scene);
                this.dispatchEvent(new egret.Event(events.SceneResGroupLoaded));
                return;
            }
            var gpsLoading = [];
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
        };
        LoadingProxy.prototype.setRESResourceEvent = function (isAdd) {
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
        };
        /**
         * preload资源组加载完成
         * preload resource group is loaded
         */
        LoadingProxy.prototype.onResourceLoadComplete = function (event) {
            var someIsLoading = false;
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
        };
        /**
         * 资源组加载出错
         */
        LoadingProxy.prototype.onItemLoadError = function (event) {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        };
        /**
         * 资源组加载出错
         */
        LoadingProxy.prototype.onResourceLoadError = function (event) {
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            this.onResourceLoadComplete(event);
        };
        /**
         * preload资源组加载进度
         */
        LoadingProxy.prototype.onResourceLoadProgress = function (event) {
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
        };
        return LoadingProxy;
    }(egret.EventDispatcher));
    models.LoadingProxy = LoadingProxy;
    __reflect(LoadingProxy.prototype, "models.LoadingProxy");
})(models || (models = {}));
//# sourceMappingURL=LoadingProxy.js.map