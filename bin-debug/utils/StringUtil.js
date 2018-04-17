var utils;
(function (utils) {
    /**
     * 获取ByteArray对象
     */
    function getByteArray(endianIsLittle, buffer) {
        var byte = new egret.ByteArray(buffer);
        byte.endian = endianIsLittle ? egret.Endian.LITTLE_ENDIAN : egret.Endian.BIG_ENDIAN;
        return byte;
    }
    utils.getByteArray = getByteArray;
    /**
     * ByteArray转string
     */
    function byteToString(byte, p) {
        if (p === void 0) { p = 0; }
        byte.position = p;
        var str = byte.readUTFBytes(byte.bytesAvailable);
        return str;
    }
    utils.byteToString = byteToString;
    /**
     * string转ByteArray
     */
    function stringToByte(str, endianIsLittle) {
        if (endianIsLittle === void 0) { endianIsLittle = false; }
        var byte = getByteArray(endianIsLittle);
        byte.writeUTFBytes(str);
        return byte;
    }
    utils.stringToByte = stringToByte;
    /**
    * 加上科学计数的逗号（,）例如：13，034，555，600
    */
    function formatCoinByComma(value) {
        var regExp = new RegExp("(?!^)(?=(\\d{3})+(?:$|\\.))", "g");
        var backStr = value + "";
        backStr = backStr.replace(regExp, ",");
        return backStr;
    }
    utils.formatCoinByComma = formatCoinByComma;
    /**
    * 全显示规则（万亿，亿，万，个）
    * XXXX万亿XXXX亿XXXX万XXXX
    * XXXX亿XXXX万XXXX
    */
    function formatCoinByAllUnits(value) {
        if (value == 0)
            return "0";
        var backStr = "";
        if (value < 0) {
            backStr = "-";
            value = -value;
        }
        var wanyi = Math.floor(value / YI_WANYI);
        var yi = Math.floor((value % YI_WANYI) / YI_YI);
        var wan = Math.floor((value % YI_YI) / YI_WAN);
        var ge = Math.floor(value % YI_WAN);
        if (wanyi != 0)
            backStr += wanyi + "万亿";
        if (yi != 0)
            backStr += yi + "亿";
        if (wan != 0)
            backStr += wan + "万";
        if (ge != 0)
            backStr += ge;
        return backStr;
    }
    utils.formatCoinByAllUnits = formatCoinByAllUnits;
    /**
    * 显示规则一：
    * 万能豆不过万，直接显示数量，如：XXXX；
    * 万能豆过万不过亿，万位以上显示万字，如：XXXX万XXXX(最多8个数字1个汉字)；
    * 万能豆过亿不过万亿，万位以下不再显示，如XXXX亿XXXX万(最多8个数字2个汉字)；
    * 万能豆超过万亿，万亿以下不再显示，如：XXXX万亿(最多6个数字2个汉字)；
    * @param value 要传入的数字
    */
    function formatCoinByRule1(value) {
        if (value == 0)
            return "0";
        var backStr = "";
        var ge, wan, yi, wanyi;
        if (value < ZERO) {
            backStr = "-";
            value = -value;
        }
        if (value >= ZERO && value < YI_WAN) {
            backStr += value + "";
        }
        else if (value >= YI_WAN && value < YI_YI) {
            wan = Math.floor((value % YI_YI) / YI_WAN);
            ge = Math.floor(value % YI_WAN);
            if (wan != 0)
                backStr += wan + "万";
            if (ge != 0)
                backStr += ge;
        }
        else if (value >= YI_YI && value < YI_WANYI) {
            yi = Math.floor((value % YI_WANYI) / YI_YI);
            wan = Math.floor((value % YI_YI) / YI_WAN);
            if (yi != 0)
                backStr += yi + "亿";
            if (wan != 0)
                backStr += wan + "万";
        }
        else {
            wanyi = Math.floor(value / YI_WANYI);
            backStr += wanyi + "万亿";
        }
        return backStr;
    }
    utils.formatCoinByRule1 = formatCoinByRule1;
    /**
    * 显示规则二：
    * 主要用于筹码显示，最多千万级，X千万、XXX万、XXXX
    * @param value 要传入的数字
    */
    function formatCoinByRule2(value) {
        if (value == 0)
            return "0";
        var backStr = "";
        var ge, wan, qianwan;
        if (value < ZERO) {
            backStr = "-";
            value = -value;
        }
        if (value >= ZERO && value < YI_WAN) {
            backStr += value + "";
        }
        else if (value >= YI_WAN && value < QIAN_WAN) {
            wan = Math.floor(value / YI_WAN);
            if (wan != 0)
                backStr += wan + "万";
        }
        else {
            qianwan = Math.floor(value / QIAN_WAN);
            if (qianwan != 0)
                backStr += qianwan + "千万";
        }
        return backStr;
    }
    utils.formatCoinByRule2 = formatCoinByRule2;
    /**
    * 显示规则三：四个有效数字
    * 筹码显示，xxxx万、xx.xx万、xxxx亿、xx.xx亿等
    * @param value 要传入的数字
    */
    function formatCoinByRule3(value) {
        if (value == 0)
            return "0";
        var backStr = "";
        var ge, wan, yi, wanyi;
        if (value < ZERO) {
            backStr = "-";
            value = -value;
        }
        if (value >= ZERO && value < YI_WAN) {
            backStr += value + "";
        }
        else if (value >= YI_WAN && value < YI_YI) {
            backStr += utils.getEffectiveDigit(value / YI_WAN, 4) + "万";
        }
        else {
            backStr += utils.getEffectiveDigit(value / YI_YI, 4) + "亿";
        }
        return backStr;
    }
    utils.formatCoinByRule3 = formatCoinByRule3;
    /**
     * 显示规则4：只处理千，万，10万，其他的不处理
     * 用户经典模式叫倍的数字显示，100、1千123、1万123、10万124、100000000
     */
    function formatCoinByRule4(value) {
        if (value == 0)
            return "0";
        var backStr = "";
        var ge, wan, yi;
        if (value < ZERO) {
            backStr = "-";
            value = -value;
        }
        if (value >= ZERO && value < YI_QIAN) {
            backStr += value;
        }
        else if (value >= YI_QIAN && value < YI_WAN) {
            backStr += Math.floor(value / YI_QIAN) + "千";
            ge = value % YI_QIAN;
            if (ge > 0)
                backStr += ge;
        }
        else if (value >= YI_WAN && value < BAI_WAN) {
            backStr += Math.floor(value / YI_WAN) + "万";
            ge = value % YI_WAN;
            if (ge > 0)
                backStr += ge;
        }
        else {
            backStr += value;
        }
        return backStr;
    }
    utils.formatCoinByRule4 = formatCoinByRule4;
    /**
    * a)>=1000的时候显示1k
    * b)>=1000000的时候显示1M
    * c)>=1000000000的时候显示1B（1B=1000M=1000000k=10亿）
    * d)向下去整保留两位小数，最多4位。如1.23k , 123.4k , 1234k , 1234M , 9999B。
    */
    function formatCoinByRule5(value) {
        if (value == 0)
            return "0";
        var backStr = "";
        var ge, wan, yi, wanyi;
        if (value < ZERO) {
            backStr = "-";
            value = -value;
        }
        if (value >= ZERO && value < YI_QIAN) {
            backStr += value + "";
        }
        else if (value >= YI_QIAN && value < BAI_WAN) {
            backStr += utils.getEffectivePoint(value / YI_QIAN, 4) + "K";
        }
        else if (value >= BAI_WAN && value < SHI_YI) {
            backStr += utils.getEffectivePoint(value / BAI_WAN, 4) + "M";
        }
        else if (value >= SHI_YI) {
            backStr += utils.getEffectivePoint(value / SHI_YI, 4) + "B";
        }
        return backStr;
    }
    utils.formatCoinByRule5 = formatCoinByRule5;
    /**
        * a)>10000的时候显示10k
        * b)>=1000000的时候显示1M
        * c)>=1000000000的时候显示1B（1B=1000M=1000000k=10亿）
        * d)向下去整保留两位小数，最多4位。如1.23k , 123.4k , 1234k , 1234M , 9999B。
        */
    function formatCoinByRule6(value) {
        if (value == 0)
            return "0";
        var backStr = "";
        var ge, wan, yi, wanyi;
        if (value < ZERO) {
            backStr = "-";
            value = -value;
        }
        if (value >= ZERO && value <= YI_WAN) {
            backStr += value + "";
        }
        else if (value > YI_WAN && value < BAI_WAN) {
            backStr += utils.getEffectivePoint(value / YI_QIAN, 4) + "K";
        }
        else if (value >= BAI_WAN && value < SHI_YI) {
            backStr += utils.getEffectivePoint(value / BAI_WAN, 4) + "M";
        }
        else if (value >= SHI_YI) {
            backStr += utils.getEffectivePoint(value / SHI_YI, 4) + "B";
        }
        return backStr;
    }
    utils.formatCoinByRule6 = formatCoinByRule6;
    function formatCoinByRule7(value) {
        if (value == 0)
            return "0";
        var backStr = "";
        var ge, wan, yi, wanyi;
        if (value < ZERO) {
            backStr = "-";
            value = -value;
        }
        if (value >= ZERO && value <= SHI_WAN) {
            backStr += value + "";
        }
        else if (value >= SHI_WAN && value < BAI_WAN) {
            backStr += utils.getEffectivePoint(value / YI_QIAN, 4) + "K";
        }
        else if (value >= BAI_WAN && value < SHI_YI) {
            backStr += utils.getEffectivePoint(value / BAI_WAN, 4) + "M";
        }
        else if (value >= SHI_YI) {
            backStr += utils.getEffectivePoint(value / SHI_YI, 4) + "B";
        }
        return backStr;
    }
    utils.formatCoinByRule7 = formatCoinByRule7;
    function truncateToFit(txt, maxWidth, indicator, text) {
        if (maxWidth === void 0) { maxWidth = -1; }
        if (indicator === void 0) { indicator = "..."; }
        if (text === void 0) { text = null; }
        if (text)
            txt.text = text;
        if (maxWidth == -1)
            maxWidth = txt.width;
        if (egret.sys.measureText(txt.text, txt.fontFamily, txt.size, txt.bold, txt.italic) > maxWidth) {
            var s1 = txt.text.slice(0, -1);
            var s2 = s1 + indicator;
            while (s1.length > 1 && egret.sys.measureText(s2, txt.fontFamily, txt.size, txt.bold, txt.italic) > maxWidth) {
                s1 = s1.slice(0, -1);
                s2 = s1 + indicator;
            }
            txt.text = s2;
            return true;
        }
        return false;
    }
    utils.truncateToFit = truncateToFit;
    function truncateToFit2(txt, maxWidth, indicator, text, useNumLines) {
        if (maxWidth === void 0) { maxWidth = -1; }
        if (indicator === void 0) { indicator = "..."; }
        if (text === void 0) { text = null; }
        if (useNumLines === void 0) { useNumLines = true; }
        if (text)
            txt.text = text;
        if (maxWidth == -1)
            maxWidth = txt.width;
        if (!useNumLines) {
            if (txt.textWidth + 5 > maxWidth + 0.00000000000001) {
                var s = txt.text;
                while (s.length > 1 && txt.textWidth + 5 > maxWidth) {
                    s = s.slice(0, -1);
                    txt.text = s + indicator;
                }
                return true;
            }
        }
        else {
            if (txt.numLines > 1) {
                var s = txt.text;
                while (txt.numLines > 1) {
                    s = s.slice(0, -1);
                    txt.text = s + indicator;
                }
                return true;
            }
        }
        return false;
    }
    utils.truncateToFit2 = truncateToFit2;
    /**
     * 格式化数字 10进制到16进制
     */
    function format10_16(value) {
        return "0x" + value.toString(16);
    }
    utils.format10_16 = format10_16;
    /**
     * 日期格式化
     */
    function formatDate(dateSrc, fmt) {
        if (fmt === void 0) { fmt = "yyyy-MM-dd hh:mm:ss"; }
        var o = {
            "M+": dateSrc.getMonth() + 1,
            "d+": dateSrc.getDate(),
            "h+": dateSrc.getHours(),
            "m+": dateSrc.getMinutes(),
            "s+": dateSrc.getSeconds(),
            "q+": Math.floor((dateSrc.getMonth() + 3) / 3),
            "S": dateSrc.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (dateSrc.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    utils.formatDate = formatDate;
    /**
     * 将时间解析成 小时:分钟 的格式
     */
    function getHourMinuteString(time) {
        var second = Math.floor(time / 1000) % 60;
        var minute = Math.floor(time / (1000 * 60)) % 60;
        var hour = Math.floor(time / (1000 * 60 * 60));
        return (hour < 10 ? "0" + hour : "" + hour) + ":" + (minute < 10 ? "0" + minute : "" + minute) + ":" + (second < 10 ? "0" + second : "" + second);
    }
    utils.getHourMinuteString = getHourMinuteString;
    /**
     * 取最多n位有效数字
     */
    function getEffectiveDigit(value, n) {
        var backStr = value.toPrecision(n);
        // 找到小数点后第一个无效数字0
        var dotIndex = backStr.indexOf(".");
        if (dotIndex != -1) {
            var index = backStr.length - 1;
            while (index >= dotIndex && (backStr.charAt(index) == "0" || backStr.charAt(index) == ".")) {
                index--;
            }
            backStr = backStr.substr(0, index + 1);
        }
        return backStr;
    }
    utils.getEffectiveDigit = getEffectiveDigit;
    /**
     * 保留2位小数后，再决定，保留几位有效数字
     */
    function getEffectivePoint(value, n) {
        value = Math.floor(value * 100) / 100;
        var backStr = value.toPrecision(n);
        // 找到小数点后第一个无效数字0
        var dotIndex = backStr.indexOf(".");
        if (dotIndex != -1) {
            var index = backStr.length - 1;
            while (index >= dotIndex && (backStr.charAt(index) == "0" || backStr.charAt(index) == ".")) {
                index--;
            }
            backStr = backStr.substr(0, index + 1);
        }
        return backStr;
    }
    utils.getEffectivePoint = getEffectivePoint;
    /**
     * 去掉文本前后空格
     */
    function trim(value) {
        return value.replace(/(^\s*)|(\s*$)/g, "");
    }
    utils.trim = trim;
    function toGBKString(buffer, byteOffset, byteLength) {
        if ('TextDecoder' in window) {
            var dataView = new DataView(buffer, byteOffset, byteLength);
            var decoder = new window['TextDecoder']('gbk');
            var decodedString = decoder.decode(dataView);
            console.info(decodedString);
            return decodedString;
        }
        else {
            console.error('Your browser does not support the Encoding API.');
        }
    }
    utils.toGBKString = toGBKString;
    function toUTF8String(buffer, byteOffset, byteLength) {
        if ('TextDecoder' in window) {
            var dataView = new DataView(buffer, byteOffset, byteLength);
            var decoder = new window['TextDecoder']('utf-8');
            var decodedString = decoder.decode(dataView);
            console.info(decodedString);
            return decodedString;
        }
        else {
            console.error('Your browser does not support the Encoding API.');
        }
    }
    utils.toUTF8String = toUTF8String;
    function gbkToUTF8String(gbkString) {
        var arr = new egret.ByteArray;
        arr.writeUTFBytes(gbkString);
        return arr.readUTFBytes(arr.bytesAvailable);
    }
    utils.gbkToUTF8String = gbkToUTF8String;
    function toEnglishString(monNumber) {
        var mon = "";
        if (monNumber == 1) {
            mon = "Jan";
        }
        else if (monNumber == 2) {
            mon = "Feb";
        }
        else if (monNumber == 3) {
            mon = "Mar";
        }
        else if (monNumber == 4) {
            mon = "Apr";
        }
        else if (monNumber == 5) {
            mon = "May";
        }
        else if (monNumber == 6) {
            mon = "June";
        }
        else if (monNumber == 7) {
            mon = "July";
        }
        else if (monNumber == 8) {
            mon = "Aug";
        }
        else if (monNumber == 9) {
            mon = "Sept";
        }
        else if (monNumber == 10) {
            mon = "Oct";
        }
        else if (monNumber == 11) {
            mon = "Nov";
        }
        else if (monNumber == 12) {
            mon = "Dec";
        }
        return mon;
    }
    utils.toEnglishString = toEnglishString;
    /**返回正常字符串长度 */
    function SubStringGetTotalIndex(sString) {
        var j = 0;
        var s = sString;
        if (s == "")
            return j;
        for (var i = 0; i < s.length; i++) {
            if (s.substr(i, 1).charCodeAt(0) > 255) {
                j = j + 2;
            }
            else
                j++;
        }
        return j;
    }
    utils.SubStringGetTotalIndex = SubStringGetTotalIndex;
    /**返回中英混合字符串长度 */
    function SubStringGetLength(sString) {
        var j = 0;
        var s = sString;
        if (s == "")
            return j;
        for (var i = 0; i < s.length; i++) {
            if (s.substr(i, 1).charCodeAt(0) > 255) {
                j = j + 1;
            }
            else
                j++;
        }
        return j;
    }
    utils.SubStringGetLength = SubStringGetLength;
    /**字符串中是否为的中文和英文 */
    function IsStrToChinese(str) {
        // var stringFlag = true;
        // for (var i = 0; i < str.length; i++) {
        //     if (str.charCodeAt(i) <= 255) {
        //         stringFlag = false;
        //         break;
        //     }
        // }
        // return stringFlag;
        if (/^[0-9_A-Za-z]+$/.test(str) || /^[\u4e00-\u9fa5]+$/.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    utils.IsStrToChinese = IsStrToChinese;
})(utils || (utils = {}));
//# sourceMappingURL=StringUtil.js.map