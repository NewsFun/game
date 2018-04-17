module utils {

    export function enabledView(view: egret.DisplayObject, enabled: boolean): void {
        if (enabled) {
            view.touchEnabled = true;
            view.alpha = 1;
        }
        else {
            view.touchEnabled = false;
            view.alpha = 0.5;
        }
    }

}