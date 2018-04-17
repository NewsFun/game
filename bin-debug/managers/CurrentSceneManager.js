var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var manager;
(function (manager) {
    /**
     * 场景管理器
     * @author zxy
     *
     */
    var CurrentSceneManager = (function () {
        function CurrentSceneManager() {
            this._sceneMap = [];
        }
        CurrentSceneManager.prototype.addNoteToQueue = function (callBack) {
            this._sceneMap.push(callBack);
        };
        CurrentSceneManager.prototype.popNoteFromQueue = function () {
            var len = this._sceneMap.length;
            if (len === 0) {
                return false;
            }
            this._sceneMap.pop();
            return true;
        };
        return CurrentSceneManager;
    }());
    manager.CurrentSceneManager = CurrentSceneManager;
    __reflect(CurrentSceneManager.prototype, "manager.CurrentSceneManager");
})(manager || (manager = {}));
// 通知节点队列，用于处理界面堆栈
//# sourceMappingURL=CurrentSceneManager.js.map