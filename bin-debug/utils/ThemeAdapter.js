var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var ThemeAdapter = (function () {
        function ThemeAdapter() {
        }
        /**
         * 解析主题
         * @param url 待解析的主题url
         * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
         * @param onError 解析失败回调函数，示例：errorFunc():void;
         * @param thisObject 回调的this引用
         */
        ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
            function onResGet(e) {
                onSuccess.call(thisObject, e);
            }
            function onResError(e) {
                if (e.resItem.url == url) {
                    RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                    onError.call(thisObject);
                }
            }
            if (typeof generateEUI !== 'undefined') {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI);
                }, this);
            }
            else {
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
            }
        };
        return ThemeAdapter;
    }());
    utils.ThemeAdapter = ThemeAdapter;
    __reflect(ThemeAdapter.prototype, "utils.ThemeAdapter", ["eui.IThemeAdapter"]);
})(utils || (utils = {}));
//# sourceMappingURL=ThemeAdapter.js.map