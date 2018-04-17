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
var scenes;
(function (scenes) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this) || this;
            _this.itemNum = 3;
            _this.sideNum = 6;
            _this.cubeWidth = 600;
            _this.cubeList = [];
            _this.skinName = "game";
            _this.init();
            return _this;
        }
        // 
        Game.prototype.init = function () {
            console.log("init game page");
            this.initSide();
            this.cubeWidth = this.cube.width;
        };
        Game.prototype.initCube = function () {
            for (var i = 0; i < this.sideNum; i++) {
                var side = this.initSide();
                this.cubeList.push(side);
            }
        };
        Game.prototype.initSide = function () {
            var sideList = [];
            for (var i = 0; i < this.itemNum; i++) {
                var list = this.addCubeItem(200 * i);
                sideList.push(list);
            }
            return sideList;
        };
        Game.prototype.addCubeItem = function (iy) {
            var itemList = [];
            for (var i = 0; i < this.itemNum; i++) {
                var icube = new item.GameItem();
                icube.x = 200 * i;
                icube.y = iy;
                this.cube.addChild(icube);
                itemList.push(icube);
            }
            return itemList;
        };
        return Game;
    }(scenes.BaseScene));
    scenes.Game = Game;
    __reflect(Game.prototype, "scenes.Game");
})(scenes || (scenes = {}));
//# sourceMappingURL=Game.js.map