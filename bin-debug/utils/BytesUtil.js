var utils;
(function (utils) {
    /**
     * 获取ArrayBuffer对象
     */
    function getArrayBuffer(message) {
        return message.buffer.slice(message.offset, message.limit);
    }
    utils.getArrayBuffer = getArrayBuffer;
})(utils || (utils = {}));
//# sourceMappingURL=BytesUtil.js.map