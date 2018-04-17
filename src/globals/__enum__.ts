

enum ServerLoginResult {
    /** 未赋值 */
    UNDEFINED = -1,
    /**登陆成功 */
    SUCCESS = 0,
    /** 证书过期 */
    CERT_EXPIRED = 1,
    /** 证书无效 */
    CERT_INVALID = 2,
    /** 没有设置显示名 */
    DISPLAY_NAME_NOT_SET = 3,
    /** 没有找到对应的用户 */
    USER_NOT_FOUND = 4,
    /** 服务器维护中 */
    SERVER_MAINTENANCE = 5,
    /** 未知错误 */
    UNKNOWN = 99,
}

enum ServerCloseReason {
    /** 未赋值 */
    UNDEFINED = -1,
    /** 服务器维护 */
    SERVER_MAINTENANCE = 1,
    /** 不知道 */
    UNKNOWN = 2,
    /** 重复登陆 */
    MULTI_LOGON = 3,
    /** 返回大厅，正常断开 */
    BACK_HALL = 4,
    /** 登出 */
    LOGOUT = 5,
}