
module utils {

    /**
     * 获取ByteArray对象
     */
    export function getByteArray(endianIsLittle?: boolean, buffer?: ArrayBuffer): egret.ByteArray {
        var byte: egret.ByteArray = new egret.ByteArray(buffer);
        byte.endian = endianIsLittle ? egret.Endian.LITTLE_ENDIAN : egret.Endian.BIG_ENDIAN;
        return byte;
    }

    /**
     * ByteArray转string
     */
    export function byteToString(byte: egret.ByteArray, p: number = 0): string {
        byte.position = p;
        var str = byte.readUTFBytes(byte.bytesAvailable);
        return str;
    }

    /**
     * string转ByteArray
     */
    export function stringToByte(str: string, endianIsLittle: boolean = false): egret.ByteArray {
        var byte = getByteArray(endianIsLittle);
        byte.writeUTFBytes(str);
        return byte;
    }

    /**
	* 加上科学计数的逗号（,）例如：13，034，555，600
	*/
    export function formatCoinByComma(value: number): string {
        var regExp = new RegExp("(?!^)(?=(\\d{3})+(?:$|\\.))", "g");

        var backStr: string = value + "";
        backStr = backStr.replace(regExp, ",");

        return backStr;
    }

    /**
	* 全显示规则（万亿，亿，万，个）
	* XXXX万亿XXXX亿XXXX万XXXX
	* XXXX亿XXXX万XXXX
	*/
    export function formatCoinByAllUnits(value: number): string {
        if (value == 0) return "0";

        var backStr: string = "";
        if (value < 0) {
            backStr = "-";
            value = -value;
        }

        var wanyi = Math.floor(value / YI_WANYI);
        var yi = Math.floor((value % YI_WANYI) / YI_YI);
        var wan = Math.floor((value % YI_YI) / YI_WAN);
        var ge = Math.floor(value % YI_WAN);

        if (wanyi != 0) backStr += wanyi + "万亿";
        if (yi != 0) backStr += yi + "亿";
        if (wan != 0) backStr += wan + "万";
        if (ge != 0) backStr += ge;

        return backStr;
    }

    /**
	* 显示规则一：
	* 万能豆不过万，直接显示数量，如：XXXX；
	* 万能豆过万不过亿，万位以上显示万字，如：XXXX万XXXX(最多8个数字1个汉字)；
	* 万能豆过亿不过万亿，万位以下不再显示，如XXXX亿XXXX万(最多8个数字2个汉字)；
	* 万能豆超过万亿，万亿以下不再显示，如：XXXX万亿(最多6个数字2个汉字)；
	* @param value 要传入的数字
	*/
    export function formatCoinByRule1(value: number): string {
        if (value == 0) return "0";

        var backStr: string = "";

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
            if (wan != 0) backStr += wan + "万";
            if (ge != 0) backStr += ge;
        }
        else if (value >= YI_YI && value < YI_WANYI) {
            yi = Math.floor((value % YI_WANYI) / YI_YI);
            wan = Math.floor((value % YI_YI) / YI_WAN);
            if (yi != 0) backStr += yi + "亿";
            if (wan != 0) backStr += wan + "万";
        }
        else {
            wanyi = Math.floor(value / YI_WANYI);
            backStr += wanyi + "万亿";
        }

        return backStr;
    }

    /**
	* 显示规则二：
	* 主要用于筹码显示，最多千万级，X千万、XXX万、XXXX
	* @param value 要传入的数字
	*/
    export function formatCoinByRule2(value: number): string {
        if (value == 0) return "0";

        var backStr: string = "";

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
            if (wan != 0) backStr += wan + "万";
        }
        else {
            qianwan = Math.floor(value / QIAN_WAN);
            if (qianwan != 0) backStr += qianwan + "千万";
        }

        return backStr;
    }

    /**
	* 显示规则三：四个有效数字
	* 筹码显示，xxxx万、xx.xx万、xxxx亿、xx.xx亿等
	* @param value 要传入的数字
	*/
    export function formatCoinByRule3(value: number): string {
        if (value == 0) return "0";

        var backStr: string = "";

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

    /**
     * 显示规则4：只处理千，万，10万，其他的不处理
     * 用户经典模式叫倍的数字显示，100、1千123、1万123、10万124、100000000
     */
    export function formatCoinByRule4(value: number): string {
        if (value == 0) return "0";

        var backStr: string = "";

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
            if (ge > 0) backStr += ge;
        }
        else if (value >= YI_WAN && value < BAI_WAN) {
            backStr += Math.floor(value / YI_WAN) + "万";
            ge = value % YI_WAN;
            if (ge > 0) backStr += ge;
        }
        else {
            backStr += value;
        }

        return backStr;
    }

    /**
    * a)>=1000的时候显示1k
    * b)>=1000000的时候显示1M
    * c)>=1000000000的时候显示1B（1B=1000M=1000000k=10亿）
    * d)向下去整保留两位小数，最多4位。如1.23k , 123.4k , 1234k , 1234M , 9999B。
    */
    export function formatCoinByRule5(value: number): string {


        if (value == 0) return "0";

        var backStr: string = "";

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

    /**
        * a)>10000的时候显示10k
        * b)>=1000000的时候显示1M
        * c)>=1000000000的时候显示1B（1B=1000M=1000000k=10亿）
        * d)向下去整保留两位小数，最多4位。如1.23k , 123.4k , 1234k , 1234M , 9999B。
        */
    export function formatCoinByRule6(value: number): string {


        if (value == 0) return "0";

        var backStr: string = "";

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

    export function formatCoinByRule7(value: number): string {


        if (value == 0) return "0";

        var backStr: string = "";

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
        else if (value >= SHI_YI){
            backStr += utils.getEffectivePoint(value / SHI_YI, 4) + "B";
        }
        return backStr;
    }

    export function truncateToFit(txt: egret.TextField, maxWidth: number = -1, indicator: string = "...", text: string = null): boolean {
        if (text) txt.text = text;
        if (maxWidth == -1) maxWidth = txt.width;

        if (egret.sys.measureText(txt.text, txt.fontFamily, txt.size, txt.bold, txt.italic) > maxWidth) {
            var s1: string = txt.text.slice(0, -1);
            var s2: string = s1 + indicator;

            while (s1.length > 1 && egret.sys.measureText(s2, txt.fontFamily, txt.size, txt.bold, txt.italic) > maxWidth) {
                s1 = s1.slice(0, -1);
                s2 = s1 + indicator;
            }

            txt.text = s2;
            return true;
        }

        return false;
    }

    export function truncateToFit2(txt: egret.TextField, maxWidth: number = -1, indicator: string = "...", text: string = null, useNumLines = true): boolean {
        if (text) txt.text = text;
        if (maxWidth == -1) maxWidth = txt.width;

        if (!useNumLines) {
            if (txt.textWidth + 5 > maxWidth + 0.00000000000001) {
                var s: string = txt.text;

                while (s.length > 1 && txt.textWidth + 5 > maxWidth) {
                    s = s.slice(0, -1);
                    txt.text = s + indicator;
                }
                return true;
            }
        }
        else {
            if (txt.numLines > 1) {
                var s: string = txt.text;

                while (txt.numLines > 1) {
                    s = s.slice(0, -1);
                    txt.text = s + indicator;
                }
                return true;
            }
        }

        return false;
    }

    /**
     * 格式化数字 10进制到16进制
     */
    export function format10_16(value: number): string {
        return "0x" + value.toString(16);
    }

    /**
     * 日期格式化
     */
    export function formatDate(dateSrc: Date, fmt: string = "yyyy-MM-dd hh:mm:ss"): string {
        var o = {
            "M+": dateSrc.getMonth() + 1, //月份 
            "d+": dateSrc.getDate(), //日 
            "h+": dateSrc.getHours(), //小时 
            "m+": dateSrc.getMinutes(), //分 
            "s+": dateSrc.getSeconds(), //秒 
            "q+": Math.floor((dateSrc.getMonth() + 3) / 3), //季度 
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

    /**
     * 将时间解析成 小时:分钟 的格式
     */
    export function getHourMinuteString(time: number): string {
        var second = Math.floor(time / 1000) % 60;
        var minute = Math.floor(time / (1000 * 60)) % 60;
        var hour = Math.floor(time / (1000 * 60 * 60));

        return (hour < 10 ? "0" + hour : "" + hour) + ":" + (minute < 10 ? "0" + minute : "" + minute) + ":" + (second < 10 ? "0" + second : "" + second);
    }

    /**
     * 取最多n位有效数字
     */
    export function getEffectiveDigit(value: number, n: number): string {
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

    /**
     * 保留2位小数后，再决定，保留几位有效数字
     */
    export function getEffectivePoint(value: number, n: number): string {
        value = Math.floor(value * 100) / 100

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

    /**
     * 去掉文本前后空格
     */
    export function trim(value: string): string {
        return value.replace(/(^\s*)|(\s*$)/g, "");
    }

    export function toGBKString(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number): string {
        if ('TextDecoder' in window) {
            var dataView = new DataView(buffer, byteOffset, byteLength);
            var decoder = new window['TextDecoder']('gbk');
            var decodedString = decoder.decode(dataView);
            console.info(decodedString);
            return decodedString;
        } else {
            console.error('Your browser does not support the Encoding API.');
        }
    }
    export function toUTF8String(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number): string {
        if ('TextDecoder' in window) {
            var dataView = new DataView(buffer, byteOffset, byteLength);
            var decoder = new window['TextDecoder']('utf-8');
            var decodedString = decoder.decode(dataView);
            console.info(decodedString);
            return decodedString;
        } else {
            console.error('Your browser does not support the Encoding API.');
        }
    }

    export function gbkToUTF8String(gbkString: string, ): string {

        var arr: egret.ByteArray = new egret.ByteArray;
        arr.writeUTFBytes(gbkString);
        return arr.readUTFBytes(arr.bytesAvailable);

    }

    export function toEnglishString(monNumber: number): string {
        var mon: string = ""

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

    /**返回正常字符串长度 */
    export function SubStringGetTotalIndex(sString: string) {
        var j = 0;
        var s = sString;
        if (s == "") return j;
        for (var i = 0; i < s.length; i++) {
            if (s.substr(i, 1).charCodeAt(0) > 255) {
                j = j + 2;
            }
            else j++
        }
        return j;
    }

    /**返回中英混合字符串长度 */
    export function SubStringGetLength(sString: string) {
        var j = 0;
        var s = sString;
        if (s == "") return j;
        for (var i = 0; i < s.length; i++) {
            if (s.substr(i, 1).charCodeAt(0) > 255) {
                j = j + 1;
            }
            else j++
        }
        return j;
    }

    /**字符串中是否为的中文和英文 */
    export function IsStrToChinese(str: string) {
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
}