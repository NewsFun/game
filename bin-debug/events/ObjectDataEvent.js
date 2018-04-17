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
var events;
(function (events) {
    /**
     * 可以携带两个数据的事件
     */
    var ObjectDataEvent = (function (_super) {
        __extends(ObjectDataEvent, _super);
        function ObjectDataEvent(type, data, carryData) {
            var _this = _super.call(this, type, false, false) || this;
            _this.carryData = null;
            _this.data = data;
            _this.carryData = carryData;
            return _this;
        }
        return ObjectDataEvent;
    }(egret.Event));
    events.ObjectDataEvent = ObjectDataEvent;
    __reflect(ObjectDataEvent.prototype, "events.ObjectDataEvent");
})(events || (events = {}));
//# sourceMappingURL=ObjectDataEvent.js.map