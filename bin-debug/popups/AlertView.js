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
var popups;
(function (popups) {
    /**
     * 弹出提示框
     */
    var AlertView = (function (_super) {
        __extends(AlertView, _super);
        function AlertView() {
            var _this = _super.call(this) || this;
            _this.skinName = "popups.AlertViewSkin2";
            return _this;
        }
        AlertView.prototype.onCreate = function () {
            _super.prototype.onCreate.call(this);
            g_addListener(this.okBtn, egret.TouchEvent.TOUCH_TAP, this.onOkBtnTapped, this);
            g_addListener(this.cancelBtn, egret.TouchEvent.TOUCH_TAP, this.onCancelBtnTapped, this);
            g_addListener(this.confirmBtn, egret.TouchEvent.TOUCH_TAP, this.onConfirmBtnTapped, this);
        };
        AlertView.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            g_removeListenerByThisObject(this);
            this.setCallback();
        };
        AlertView.prototype.onCancelBtnTapped = function (e) {
            this.onClose();
        };
        AlertView.prototype.onOkBtnTapped = function (e) {
            if (this._callbackFunc) {
                this._callbackFunc.apply(this._callbackFuncThisObject, this._callbackFuncParams);
            }
            manager.popupManager().closePopup(this);
        };
        AlertView.prototype.onClose = function () {
            if (this._cancelFunc) {
                this._cancelFunc.apply(this._cancelFuncThisObject, this._cancelFuncParams);
            }
            _super.prototype.onClose.call(this);
        };
        AlertView.prototype.onConfirmBtnTapped = function (e) {
            if (this._callbackFunc) {
                this._callbackFunc.apply(this._callbackFuncThisObject, this._callbackFuncParams);
            }
            manager.popupManager().closePopup(this);
        };
        Object.defineProperty(AlertView.prototype, "showCancelBtn", {
            set: function (value) {
                this.cancelBtn.visible = value;
                if (value) {
                    this.confirmBtn.visible = false;
                    this.cancelBtn.visible = true;
                    this.okBtn.visible = true;
                }
                else {
                    this.confirmBtn.visible = true;
                    this.cancelBtn.visible = false;
                    this.okBtn.visible = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        AlertView.prototype.setContent = function (value, title) {
            if (title === void 0) { title = "温馨提示"; }
            // this.contentTxt.textFlow = (new egret.HtmlTextParser()).parser(value);
            this.contentTxt.text = value;
        };
        /**
         * 设置回调函数，不传参数就是清除回调的意思
         */
        AlertView.prototype.setCallback = function (callbackFunc, callbackFuncParams, callbackFuncThisObject, cancelFunc, cancelFuncParams, cancelFuncThisObject) {
            this._callbackFunc = callbackFunc;
            this._callbackFuncParams = callbackFuncParams;
            this._callbackFuncThisObject = callbackFuncThisObject;
            this._cancelFunc = cancelFunc;
            this._cancelFuncParams = cancelFuncParams;
            this._cancelFuncThisObject = cancelFuncThisObject;
        };
        return AlertView;
    }(popups.BasePopup));
    popups.AlertView = AlertView;
    __reflect(AlertView.prototype, "popups.AlertView");
})(popups || (popups = {}));
//# sourceMappingURL=AlertView.js.map