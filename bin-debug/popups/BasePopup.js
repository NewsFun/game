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
/**
 * @myfly
 */
var popups;
(function (popups) {
    /**
     * popup的基类
     */
    var BasePopup = (function (_super) {
        __extends(BasePopup, _super);
        function BasePopup() {
            var _this = _super.call(this) || this;
            _this.closeState = false;
            _this.closeBtn = null;
            _this.popupBg = null;
            // ====
            _this.playSound = true;
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            _this.popupBg = new eui.Rect();
            _this.addChild(_this.popupBg);
            _this.popupBg.touchChildren = false;
            _this.popupBg.alpha = 0.35;
            _this.popupBg.left = 0;
            _this.popupBg.right = 0;
            _this.popupBg.top = 0;
            _this.popupBg.bottom = 0;
            return _this;
        }
        BasePopup.prototype.onCreate = function () {
            if (this.closeBtn)
                this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        };
        BasePopup.prototype.onDestroy = function () {
            if (this.closeBtn)
                this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            if (this.popupBg && this.popupBg.parent)
                this.popupBg.parent.removeChild(this.popupBg);
        };
        BasePopup.prototype.onClose = function () {
            this.closeState = true;
            manager.popupManager().closePopup(this);
        };
        BasePopup.prototype.onReset = function (param) {
        };
        return BasePopup;
    }(eui.Component));
    popups.BasePopup = BasePopup;
    __reflect(BasePopup.prototype, "popups.BasePopup", ["IPopup", "IView"]);
})(popups || (popups = {}));
//# sourceMappingURL=BasePopup.js.map