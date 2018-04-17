module utils {


    /**
     * 判断能不能联网
     */
    export function isNetWorkOk(): boolean {
        // 有兼容性，
        var navigator: Navigator;
        return navigator && navigator.onLine;
    }

}