/**
 * @myfly
 */
module manager {

    /**
     * 本地化管理器
     */
    export class LocalizeManager {

        private _localizeData: Object = {};

        /**
         * 设置本地化数据
         */
        public setLocalizeData(jsonData: Object): void {
            this._localizeData = jsonData;
        }

        /**
         * 根据key从本地化数据中获取value值
         * 变量形式为：%数字，索引从1开始。如：aaa%1bb%3cc%2
         */
        public getValue(key: string, ...args): string {
            var value: string = this._localizeData[key];
            if (!value) return "can not find key " + key;
            else {
                var argLen: number = args.length;
                if (argLen > 0) {
                    var regStr: string = "(";
                    for (var i = argLen; i > 0; i--) {
                        regStr += "%" + i;
                        if (i > 0) regStr += "|";
                    }
                    regStr += ")";

                    value = value.replace(new RegExp(regStr, "gm"), function (matchStr: string): string {
                        var index: number = parseInt(matchStr.slice(1));
                        if (isNaN(index)) return matchStr;
                        else return args[index-1];
                    });
                }
            }

            return value;
        }
    }

}