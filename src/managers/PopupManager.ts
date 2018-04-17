/**
 * @myfly
 */
module manager {

    /**
     * 弹出窗口管理器
     */
    export class PopupManager {

        private _popupGp: eui.Group = null;

        /**
         * 获取打开的popup窗口实例
         */
        public getPopupView(popupClass: any): popups.BasePopup {
            if (!this._popupGp) return null;

            var view: popups.BasePopup = null;
            for (var i = 0, iLen = this._popupGp.numChildren; i < iLen; i++) {
                var popupI = this._popupGp.getChildAt(i);
                if (utils.isInstanceOf(popupI, popupClass)) {
                    view = popupI as popups.BasePopup;
                    break;
                }
            }

            return view;
        }

        /**
         * 打开弹出窗口
         * @param popupClass  弹窗基类
         * @param showMotion 是否播放弹窗动画
         * @param data 弹窗参数
         */
        public openPopup(popupClass: any, showMotion: boolean = true, data: any = null): popups.BasePopup {
            // 判断是不是弹出窗口基类
            if (popupClass == popups.BasePopup) return;
            // 判断是不是弹出窗口类
            if (!utils.isSuperClass(popupClass, popups.BasePopup)) {
                egret.log(utils.getQualifiedClassName(popupClass), "is not a Popup.");
                return;
            }

            var curScene = manager.sceneManager().currentScene;
            if (!curScene) return;

            var view: popups.BasePopup = this.getPopupView(popupClass);

            if (!view) {
                if (data) {
                    view = new popupClass(data);
                    view.verticalCenter = 0;
                    view.horizontalCenter = 0;
                }
                else {
                    view = new popupClass();
                    view.verticalCenter = 0;
                    view.horizontalCenter = 0;
                }

                view.onCreate();
            }

            if (!this._popupGp) {
                this._popupGp = new eui.Group();
                this._popupGp.left = 0;
                this._popupGp.right = 0;
                this._popupGp.top = 0;
                this._popupGp.bottom = 0;
                this._popupGp.width = curScene.width;
                this._popupGp.height = curScene.height;
                // this._popupGp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPopupMaskGpTapped, this, true);
            }

            curScene.addChild(this._popupGp);

            var toX = (curScene.width - view.width) / 2;
            var toY = (curScene.height - view.height) / 2;

            if (showMotion && POPUP_MOTION) {
                var fromScaleX = 0.1;
                var fromScaleY = 0.1;
                //view.x = (curScene.width - view.width * fromScaleX) / 2;
                //view.y = (curScene.height - view.height * fromScaleY) / 2;
                view.scaleX = fromScaleX;
                view.scaleY = fromScaleY;

                var twVars = { scaleX: 1, scaleY: 1};
                // twVars["onComplete"] = onComplete;
                // TweenMax.to(view, 0.4, twVars);

                egret.Tween.get(view).to(twVars, 400, egret.Ease.backOut);
                // curScene.touchChildren = true;
                // curScene.touchEnabled = true;

            }
            else {
                //view.x = toX;
                //view.y = toY;
                curScene.touchEnabled = true;
                curScene.touchChildren = true;
                this._popupGp.touchEnabled = true;
            }

            if (view.popupBg) {
                this._popupGp.addChild(view.popupBg);
                view.popupBg.left = 0;
                view.popupBg.right = 0;
                view.popupBg.top = 0;
                view.popupBg.bottom = 0;
            }
            this._popupGp.addChild(view);

            return view;
        }

        /**
         * 关闭弹出窗口
         */
        public closePopup(popupClassOrInstance: any, showMotion: boolean = true): void {

            // egret.log("close Popup", popupClassOrInstance);
            if (!this._popupGp) return;

            var view: popups.BasePopup = null;

            for (var i = 0, iLen = this._popupGp.numChildren; i < iLen; i++) {
                var popupI = this._popupGp.getChildAt(i);
                if (utils.isInstanceOf(popupI, popupClassOrInstance)) {
                    view = popupI as popups.BasePopup;
                    break;
                }
            }

            if (view) {
                var curScene = manager.sceneManager().currentScene;
                if (!curScene) return;

                var removeView = () => {
                    view.onDestroy();
                    if (view.popupBg && view.popupBg.parent) view.popupBg.parent.removeChild(view.popupBg);
                    if (view.parent) view.parent.removeChild(view);
                    if (this._popupGp.numChildren == 0) {
                        if (this._popupGp.parent) this._popupGp.parent.removeChild(this._popupGp);
                    }
                    this._popupGp.touchEnabled = true;
                    curScene.touchEnabled = true;
                    curScene.touchChildren = true;
                }

                if (showMotion && POPUP_MOTION) {
                    this._popupGp.touchEnabled = false;
                    var toScaleX = 0.1;
                    var toScaleY = 0.1;
                    //var toX = (curScene.width - view.width * toScaleX) / 2;
                    //var toY = (curScene.height - view.height * toScaleY) / 2;
                    var twVars = { scaleX: toScaleX, scaleY: toScaleY};
                    // twVars["onComplete"] = removeView;
                    // TweenMax.to(view, 0.3, twVars);
                    egret.Tween.get(view).to(twVars, 300).call(removeView);
                    this._popupGp.touchEnabled = false;
                    curScene.touchEnabled = false;
                    curScene.touchChildren = false;
                }
                else {
                    removeView();
                }
            }
        }

        /**
         * 关闭所有弹出窗口
         */
        public closeAllPopups(): void {
            if (!this._popupGp) return;

            while (this._popupGp.numChildren > 0) {
                var view = this._popupGp.getChildAt(this._popupGp.numChildren - 1) as popups.BasePopup;
                if (view) view.onDestroy();
                this._popupGp.removeChildAt(this._popupGp.numChildren - 1);
            }
            this._popupGp.touchEnabled = true;
            var curScene = manager.sceneManager().currentScene;
            if (curScene) {
                curScene.touchEnabled = false;
                curScene.touchChildren = false;
            }

            if (this._popupGp.parent) this._popupGp.parent.removeChild(this._popupGp);
        }

        private onPopupMaskGpTapped(e: egret.TouchEvent): void {
            if (!this._popupGp || !this._popupGp.parent) return;

            if (this._popupGp.numChildren > 0) {
                var lastView = this._popupGp.getChildAt(this._popupGp.numChildren - 1) as popups.BasePopup;

                var pos = this._popupGp.parent.globalToLocal(e.stageX, e.stageY);
                var hittedLastView = new egret.Rectangle(lastView.x, lastView.y, lastView.width, lastView.height).containsPoint(pos);

                if (!hittedLastView) {
                    e.stopImmediatePropagation();

                    lastView.onClose();
                }
            }

            if (this._popupGp.numChildren == 0) {
                if (this._popupGp.parent) this._popupGp.parent.removeChild(this._popupGp);
            }
        }
    }

}