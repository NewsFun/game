
module utils {

    /**
     * 获取ArrayBuffer对象
     */
    export function getArrayBuffer(message: any): any {
        return message.buffer.slice(message.offset, message.limit);
    }

}