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
var item;
(function (item) {
    /**
     * 桌子列表项
     * @author myfly
     */
    var BaseItem = (function (_super) {
        __extends(BaseItem, _super);
        function BaseItem() {
            var _this = _super.call(this) || this;
            _this._data = null;
            _this._itemIndex = -1;
            _this._selected = false;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onItemClick, _this);
            return _this;
        }
        Object.defineProperty(BaseItem.prototype, "data", {
            /**
             * 读取条目数据
             */
            get: function () {
                return this._data;
            },
            /**
             * 设置条目数据
             */
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseItem.prototype, "itemIndex", {
            get: function () {
                return this._itemIndex;
            },
            set: function (value) {
                this._itemIndex = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseItem.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                this._selected = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseItem.prototype, "owner", {
            get: function () {
                return this.parent;
            },
            enumerable: true,
            configurable: true
        });
        BaseItem.prototype.onItemClick = function (e) {
        };
        return BaseItem;
    }(eui.Component));
    item.BaseItem = BaseItem;
    __reflect(BaseItem.prototype, "item.BaseItem", ["eui.IItemRenderer", "eui.UIComponent", "egret.DisplayObject"]);
})(item || (item = {}));
//# sourceMappingURL=BaseItem.js.map