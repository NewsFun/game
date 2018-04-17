/** 
* 平台数据接口。
* 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
* 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
* 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
*/
declare interface Platform {
    wxGetUserInfo(): Promise<any>;
    wxLogin(): Promise<any>;
    request(method, param): Promise<any>;
    createInnerAudioContext();
    wxOpenSetting(): Promise<any>;
    wxrequestMidasPayment(data, callback): Promise<any>;
    getFriendCloudStorage(array: any[]): Promise<any>;
    wxshareAppMessage(title): Promise<any>;
    wxCheckSession(): Promise<any>;
    getOpenDataContext();

}
class DebugPlatform implements Platform {
    async wxGetUserInfo() {
    }
    async wxLogin() {
    }
    async request(method, param) {
    }
    async createInnerAudioContext() {
    }
    async wxOpenSetting() {
    }
    async wxrequestMidasPayment(data, callback) {
    }
    async getFriendCloudStorage(array: any[]) {
    }
    async wxshareAppMessage(title) {
    }
    async wxCheckSession() {
    }
    async getOpenDataContext(){
        
    }
}
if (!window.platform) {
    window.platform = new DebugPlatform();
}
declare let platform: Platform;
declare interface Window {
    platform: Platform
}

