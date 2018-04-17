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
    var BaseScene = (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            var _this = _super.call(this) || this;
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            return _this;
            // this.doLanguage();
        }
        BaseScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * 进入，需要重写
         */
        BaseScene.prototype.onEnter = function () {
            egret.log("你需要重写 onEnter");
        };
        /**
         * 退出，需要重写
         */
        BaseScene.prototype.onExit = function () {
            egret.log("你需要重写 onExit");
        };
        /**
         * 重新加载界面，断线重连时会执行这个函数
         */
        BaseScene.prototype.reloadView = function () {
            // ===
        };
        /**
         * 暂停声音
         */
        BaseScene.prototype.pauseSounds = function () {
        };
        /**
         * 恢复声音
         */
        BaseScene.prototype.resumeSounds = function () {
        };
        /**添加多语言切换事件  */
        BaseScene.prototype.addLanguageEvent = function () {
        };
        /**移除多语言切换事件 */
        BaseScene.prototype.removeLanguageEvent = function () {
        };
        BaseScene.prototype.doLanguage = function () {
        };
        return BaseScene;
    }(eui.Component));
    scenes.BaseScene = BaseScene;
    __reflect(BaseScene.prototype, "scenes.BaseScene");
})(scenes || (scenes = {}));
//# sourceMappingURL=BaseScene.js.map