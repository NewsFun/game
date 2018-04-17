
module utils {

    /**
     * 判断clsSuper是不是cls的父类
     */
    export function isSuperClass(cls: any, clsSuper: any): boolean {
        var clsSuperName: string = getQualifiedClassName(clsSuper);
        var types = cls.prototype.__types__;

        if (types.indexOf(clsSuperName) != -1) return true;

        return false;
    }

    /**
     * 判断instance是不是cls的实例
     */
    export function isInstanceOf(instance: any, cls: any): boolean {
        var clsName: string = getQualifiedClassName(cls);

        return egret.is(instance, clsName);
    }

    /**
     * 返回对象的完全限定类名
     */
    export function getQualifiedClassName(value: any): string {
        return egret.getQualifiedClassName(value);
    }

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
    
    export function getProtoNumber(protoNum:any):number {
        var value:number = 0;
        
        if (protoNum) {
            if (protoNum["toNumber"]) value = protoNum.toNumber();
            else value = protoNum;
        }
        
        return value;
    }
    
    export function getProtoNumberArray(protoArr:any):number[] {
        var backArr:number[] = [];
        for (var i = 0, iLen = protoArr.length; i < iLen; i++) {
            var element = protoArr[i];
            var value:number = 0;
            if (element["toNumber"]) value = element.toNumber();
            else value = element;
            backArr.push(value);
        }
        
        return backArr;
    }
}