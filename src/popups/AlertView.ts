module popups {

    /**
     * 弹出提示框
     */
    export class AlertView extends BasePopup {

        private cancelBtn: eui.Button;
        private confirmBtn: eui.Button;
        private okBtn: eui.Button;
        private contentTxt: eui.Label;

        // =====
        private _callbackFunc: Function;
        private _callbackFuncParams: any[];
        private _callbackFuncThisObject: any;
        private _cancelFunc: Function;
        private _cancelFuncParams: any[];
        private _cancelFuncThisObject: any;

        constructor() {
            super();
            this.skinName = "popups.AlertViewSkin2";
        }

        public onCreate(): void {
            super.onCreate();

            g_addListener(this.okBtn, egret.TouchEvent.TOUCH_TAP, this.onOkBtnTapped, this);

            g_addListener(this.cancelBtn, egret.TouchEvent.TOUCH_TAP, this.onCancelBtnTapped, this);
            g_addListener(this.confirmBtn, egret.TouchEvent.TOUCH_TAP, this.onConfirmBtnTapped, this);
        }

        public onDestroy(): void {
            super.onDestroy();

            g_removeListenerByThisObject(this);
            this.setCallback();
        }

        private onCancelBtnTapped(e: egret.TouchEvent): void {

            this.onClose();
        }

        private onOkBtnTapped(e: egret.TouchEvent): void {
            if (this._callbackFunc) {
                this._callbackFunc.apply(this._callbackFuncThisObject, this._callbackFuncParams);
            }

            manager.popupManager().closePopup(this);
        }

        public onClose(): void {
            if (this._cancelFunc) {
                this._cancelFunc.apply(this._cancelFuncThisObject, this._cancelFuncParams);
            }

            super.onClose();
        }

        private onConfirmBtnTapped(e: egret.TouchEvent): void {
            if (this._callbackFunc) {
                this._callbackFunc.apply(this._callbackFuncThisObject, this._callbackFuncParams);
            }

            manager.popupManager().closePopup(this);
        }

        public set showCancelBtn(value: boolean) {
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

        }

        public setContent(value: string, title: string = "温馨提示") {
            // this.contentTxt.textFlow = (new egret.HtmlTextParser()).parser(value);
            this.contentTxt.text = value;
        }

        /**
         * 设置回调函数，不传参数就是清除回调的意思
         */
        public setCallback(callbackFunc?: Function, callbackFuncParams?: any[], callbackFuncThisObject?: any, cancelFunc?: Function, cancelFuncParams?: any[], cancelFuncThisObject?: any): void {
            this._callbackFunc = callbackFunc;
            this._callbackFuncParams = callbackFuncParams;
            this._callbackFuncThisObject = callbackFuncThisObject;
            this._cancelFunc = cancelFunc;
            this._cancelFuncParams = cancelFuncParams;
            this._cancelFuncThisObject = cancelFuncThisObject;
        }
    }

}