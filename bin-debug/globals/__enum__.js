var ServerLoginResult;
(function (ServerLoginResult) {
    /** 未赋值 */
    ServerLoginResult[ServerLoginResult["UNDEFINED"] = -1] = "UNDEFINED";
    /**登陆成功 */
    ServerLoginResult[ServerLoginResult["SUCCESS"] = 0] = "SUCCESS";
    /** 证书过期 */
    ServerLoginResult[ServerLoginResult["CERT_EXPIRED"] = 1] = "CERT_EXPIRED";
    /** 证书无效 */
    ServerLoginResult[ServerLoginResult["CERT_INVALID"] = 2] = "CERT_INVALID";
    /** 没有设置显示名 */
    ServerLoginResult[ServerLoginResult["DISPLAY_NAME_NOT_SET"] = 3] = "DISPLAY_NAME_NOT_SET";
    /** 没有找到对应的用户 */
    ServerLoginResult[ServerLoginResult["USER_NOT_FOUND"] = 4] = "USER_NOT_FOUND";
    /** 服务器维护中 */
    ServerLoginResult[ServerLoginResult["SERVER_MAINTENANCE"] = 5] = "SERVER_MAINTENANCE";
    /** 未知错误 */
    ServerLoginResult[ServerLoginResult["UNKNOWN"] = 99] = "UNKNOWN";
})(ServerLoginResult || (ServerLoginResult = {}));
var ServerCloseReason;
(function (ServerCloseReason) {
    /** 未赋值 */
    ServerCloseReason[ServerCloseReason["UNDEFINED"] = -1] = "UNDEFINED";
    /** 服务器维护 */
    ServerCloseReason[ServerCloseReason["SERVER_MAINTENANCE"] = 1] = "SERVER_MAINTENANCE";
    /** 不知道 */
    ServerCloseReason[ServerCloseReason["UNKNOWN"] = 2] = "UNKNOWN";
    /** 重复登陆 */
    ServerCloseReason[ServerCloseReason["MULTI_LOGON"] = 3] = "MULTI_LOGON";
    /** 返回大厅，正常断开 */
    ServerCloseReason[ServerCloseReason["BACK_HALL"] = 4] = "BACK_HALL";
    /** 登出 */
    ServerCloseReason[ServerCloseReason["LOGOUT"] = 5] = "LOGOUT";
})(ServerCloseReason || (ServerCloseReason = {}));
//# sourceMappingURL=__enum__.js.map