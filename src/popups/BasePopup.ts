/**
 * @myfly
 */
module popups {

    /**
     * popup的基类
     */
    export class BasePopup extends eui.Component implements IPopup {

        public closeState: boolean = false;
        public closeBtn: eui.Button = null;
        public popupBg: eui.Rect = null;

        // ====
        public playSound: boolean = true;

        constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = 0;
            this.popupBg = new eui.Rect();
            this.addChild(this.popupBg);
            this.popupBg.touchChildren = false;
            this.popupBg.alpha = 0.35;
            this.popupBg.left = 0;
            this.popupBg.right = 0;
            this.popupBg.top = 0;
            this.popupBg.bottom = 0;
        }

        public onCreate(): void {
            if (this.closeBtn) this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        }

        public onDestroy(): void {
            if (this.closeBtn) this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            if (this.popupBg && this.popupBg.parent) this.popupBg.parent.removeChild(this.popupBg);
        }

        public onClose(): void {
            this.closeState = true;
            manager.popupManager().closePopup(this);
        }
        
        public onReset(param: any){

        }
    }
}