var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * @myfly
 */
var manager;
(function (manager) {
    /**
     * 事件管理器
     */
    var EventManager = (function (_super) {
        __extends(EventManager, _super);
        function EventManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._listenerData = [];
            return _this;
        }
        EventManager.prototype.addListener = function (dispatcher, type, listener, thisObject, useCapture, priority) {
            var evtData = new ListenerData();
            evtData.dispatcher = dispatcher;
            evtData.type = type;
            evtData.listener = listener;
            evtData.thisObject = thisObject;
            evtData.useCapture = useCapture;
            evtData.priority = priority;
            evtData.addListener();
            this._listenerData.push(evtData);
        };
        EventManager.prototype.addListenerUnique = function (dispatcher, type, listener, thisObject, useCapture, priority) {
            this.removeListener(dispatcher, type, false);
            var evtData = new ListenerData();
            evtData.dispatcher = dispatcher;
            evtData.type = type;
            evtData.listener = listener;
            evtData.thisObject = thisObject;
            evtData.useCapture = useCapture;
            evtData.priority = priority;
            evtData.addListener();
            this._listenerData.push(evtData);
        };
        EventManager.prototype.removeListener = function (dispatcher, type, onlyFirst) {
            if (onlyFirst === void 0) { onlyFirst = true; }
            for (var i = 0, iLen = this._listenerData.length; i < iLen; i++) {
                var element = this._listenerData[i];
                if (element.dispatcher == dispatcher) {
                    if (!type || type == element.type) {
                        element.removeListener();
                        element.clear();
                        this._listenerData.splice(i, 1);
                        i--;
                        iLen--;
                        if (onlyFirst)
                            break;
                    }
                }
            }
        };
        EventManager.prototype.removeListenerByThisObject = function (thisObject) {
            for (var i = 0, iLen = this._listenerData.length; i < iLen; i++) {
                var element = this._listenerData[i];
                if (element.thisObject == thisObject) {
                    element.removeListener();
                    element.clear();
                    this._listenerData.splice(i, 1);
                    i--;
                    iLen--;
                }
            }
        };
        EventManager.prototype.removeAllListener = function () {
            for (var i = 0, iLen = this._listenerData.length; i < iLen; i++) {
                var element = this._listenerData[i];
                element.removeListener();
                element.clear();
            }
            this._listenerData.length = 0;
        };
        return EventManager;
    }(egret.EventDispatcher));
    manager.EventManager = EventManager;
    __reflect(EventManager.prototype, "manager.EventManager");
    var ListenerData = (function () {
        function ListenerData() {
            this.clear();
        }
        ListenerData.prototype.clear = function () {
            this.dispatcher = null;
            this.type = "";
            this.listener = null;
            this.thisObject = null;
        };
        ListenerData.prototype.addListener = function () {
            if (this.dispatcher && this.listener && this.type != "") {
                this.dispatcher.addEventListener(this.type, this.listener, this.thisObject, this.useCapture, this.priority);
            }
        };
        ListenerData.prototype.removeListener = function () {
            if (this.dispatcher && this.listener && this.type != "") {
                this.dispatcher.removeEventListener(this.type, this.listener, this.thisObject, this.useCapture);
            }
        };
        return ListenerData;
    }());
    __reflect(ListenerData.prototype, "ListenerData");
})(manager || (manager = {}));
//# sourceMappingURL=EventManager.js.map