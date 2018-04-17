var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @myfly
 */
var manager;
(function (manager) {
    /**
     * 本地化管理器
     */
    var LocalizeManager = (function () {
        function LocalizeManager() {
            this._localizeData = {};
        }
        /**
         * 设置本地化数据
         */
        LocalizeManager.prototype.setLocalizeData = function (jsonData) {
            this._localizeData = jsonData;
        };
        /**
         * 根据key从本地化数据中获取value值
         * 变量形式为：%数字，索引从1开始。如：aaa%1bb%3cc%2
         */
        LocalizeManager.prototype.getValue = function (key) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var value = this._localizeData[key];
            if (!value)
                return "can not find key " + key;
            else {
                var argLen = args.length;
                if (argLen > 0) {
                    var regStr = "(";
                    for (var i = argLen; i > 0; i--) {
                        regStr += "%" + i;
                        if (i > 0)
                            regStr += "|";
                    }
                    regStr += ")";
                    value = value.replace(new RegExp(regStr, "gm"), function (matchStr) {
                        var index = parseInt(matchStr.slice(1));
                        if (isNaN(index))
                            return matchStr;
                        else
                            return args[index - 1];
                    });
                }
            }
            return value;
        };
        return LocalizeManager;
    }());
    manager.LocalizeManager = LocalizeManager;
    __reflect(LocalizeManager.prototype, "manager.LocalizeManager");
})(manager || (manager = {}));
//# sourceMappingURL=LocalizeManager.js.map