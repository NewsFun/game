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
// TypeScript file
var item;
(function (item) {
    var GameItem = (function (_super) {
        __extends(GameItem, _super);
        function GameItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "gameItem";
            return _this;
        }
        GameItem.prototype.init = function () {
        };
        return GameItem;
    }(item.BaseItem));
    item.GameItem = GameItem;
    __reflect(GameItem.prototype, "item.GameItem");
})(item || (item = {}));
//# sourceMappingURL=GameItem.js.map