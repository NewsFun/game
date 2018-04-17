var utils;
(function (utils) {
    /**
     * 获取某个点落到0-1之间的比率，概率更接近于0
     * 25,  20,   18,   15,   12,   7,  3
     */
    function getStepPosRate() {
        var steps = [0.25, 0.45, 0.63, 0.78, 0.90, 0.97, 1.1];
        var ran = Math.random();
        var pos = 0;
        if (ran <= steps[0])
            pos = 0;
        for (var i = 1; i < steps.length; i++) {
            if (ran >= steps[i - 1] && ran < steps[i]) {
                pos = i;
                break;
            }
        }
        return pos / steps.length;
    }
    utils.getStepPosRate = getStepPosRate;
    /**
     * 获取矩形范围中，靠近中间位置的点
     */
    function getPointNearCenter(bounds) {
        var pos = new egret.Point(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
        pos.x += (bounds.width / 2) * utils.getStepPosRate() * (Math.random() < 0.5 ? -1 : 1);
        pos.y += (bounds.height / 2) * utils.getStepPosRate() * (Math.random() < 0.5 ? -1 : 1);
        return pos;
    }
    utils.getPointNearCenter = getPointNearCenter;
    /**
     * 一个数组里面随机取出n个数据
     */
    function getRandomNOfArray(arr, maxCount) {
        var arrLen = arr.length;
        if (arrLen <= maxCount)
            return arr.slice();
        var indexArr = [];
        for (var i = 0; i < arrLen; i++)
            indexArr.push(i);
        var backArr = [];
        var backCount = 0;
        while (backCount < maxCount) {
            backArr.push(arr[indexArr.splice(Math.floor(indexArr.length * Math.random()), 1)[0]]);
            backCount++;
        }
        return backArr;
    }
    utils.getRandomNOfArray = getRandomNOfArray;
    /**
     * 数字转数字数组
     */
    function numberToNumberArr(value) {
        var numArr = [];
        if (value >= 0) {
            while (value >= 10) {
                numArr.push(value % 10);
                value = Math.floor(value / 10);
            }
            numArr.push(value);
        }
        return numArr;
    }
    utils.numberToNumberArr = numberToNumberArr;
    /**
     * 取整数部分
     */
    function getInt(value) {
        if (value < 0) {
            return Math.ceil(value);
        }
        else {
            return Math.floor(value);
        }
    }
    utils.getInt = getInt;
    /**
     * 取小数部分
     */
    function getFloat(value) {
        return value - getInt(value);
    }
    utils.getFloat = getFloat;
})(utils || (utils = {}));
//# sourceMappingURL=NumberUtil.js.map