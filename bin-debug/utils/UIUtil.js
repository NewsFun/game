var utils;
(function (utils) {
    function enabledView(view, enabled) {
        if (enabled) {
            view.touchEnabled = true;
            view.alpha = 1;
        }
        else {
            view.touchEnabled = false;
            view.alpha = 0.5;
        }
    }
    utils.enabledView = enabledView;
})(utils || (utils = {}));
//# sourceMappingURL=UIUtil.js.map