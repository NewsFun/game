var utils;
(function (utils) {
    /**
     * 判断能不能联网
     */
    function isNetWorkOk() {
        // 有兼容性，
        var navigator;
        return navigator && navigator.onLine;
    }
    utils.isNetWorkOk = isNetWorkOk;
})(utils || (utils = {}));
//# sourceMappingURL=NativeUtil.js.map