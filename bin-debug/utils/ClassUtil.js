var utils;
(function (utils) {
    /**
     * 判断clsSuper是不是cls的父类
     */
    function isSuperClass(cls, clsSuper) {
        var clsSuperName = getQualifiedClassName(clsSuper);
        var types = cls.prototype.__types__;
        if (types.indexOf(clsSuperName) != -1)
            return true;
        return false;
    }
    utils.isSuperClass = isSuperClass;
    /**
     * 判断instance是不是cls的实例
     */
    function isInstanceOf(instance, cls) {
        var clsName = getQualifiedClassName(cls);
        return egret.is(instance, clsName);
    }
    utils.isInstanceOf = isInstanceOf;
    /**
     * 返回对象的完全限定类名
     */
    function getQualifiedClassName(value) {
        return egret.getQualifiedClassName(value);
    }
    utils.getQualifiedClassName = getQualifiedClassName;
    /**
     * 从proto的message对象里复制数据到toObj对象
     */
    // export function copyPropertyOfProto(toObj: any, fromProtoMsg: any): void {
    //     for (var i = 0, iLen = fromProtoMsg.$type.children.length; i < iLen; i++) {
    //         var propertyName: string = fromProtoMsg.$type.children[i].name;
    //         if (toObj.hasOwnProperty(propertyName)) {
    //             toObj[propertyName] = fromProtoMsg[propertyName];
    //         }
    //     }
    // }
    function getProtoNumber(protoNum) {
        var value = 0;
        if (protoNum) {
            if (protoNum["toNumber"])
                value = protoNum.toNumber();
            else
                value = protoNum;
        }
        return value;
    }
    utils.getProtoNumber = getProtoNumber;
    function getProtoNumberArray(protoArr) {
        var backArr = [];
        for (var i = 0, iLen = protoArr.length; i < iLen; i++) {
            var element = protoArr[i];
            var value = 0;
            if (element["toNumber"])
                value = element.toNumber();
            else
                value = element;
            backArr.push(value);
        }
        return backArr;
    }
    utils.getProtoNumberArray = getProtoNumberArray;
})(utils || (utils = {}));
//# sourceMappingURL=ClassUtil.js.map