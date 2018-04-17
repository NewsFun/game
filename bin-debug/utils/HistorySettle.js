var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**处理服务器返回的 历史战绩 的数据 */
var utils;
(function (utils) {
    var HistorySettle = (function () {
        function HistorySettle(data) {
            //时间数组
            this._date_arr = [];
            this._data = data;
            this.init();
        }
        HistorySettle.prototype.init = function () {
            this._roomId_arr = this._data["roomidlist"];
            for (var i = 0; i < this.length; i++) {
                var str = this._data["datelist"][i];
                str = str.replace(/-/g, "/");
                this._date_arr[i] = new Date(str);
            }
            //按时间倒序排列
            this._date_arr.reverse();
            this._roomId_arr.reverse();
            //
            this._outputData = this.makeDataAsArray();
        };
        //房间的创建信息
        HistorySettle.prototype.getRoomJoin = function (index) {
            if (this._outputData) {
                var data = this._outputData[index];
                return data["roomData"]["join" + data["roomId"]];
            }
            return null;
        };
        //房间的结算信息
        HistorySettle.prototype.getRoomEnd = function (index) {
            if (this._outputData) {
                var data = this._outputData[index];
                return data["roomData"]["End" + data["roomId"]];
            }
            return null;
        };
        Object.defineProperty(HistorySettle.prototype, "length", {
            //房间数
            get: function () {
                return this._roomId_arr.length;
            },
            enumerable: true,
            configurable: true
        });
        //返回整理后的数据数组,以房间为单位
        HistorySettle.prototype.getDataArray = function () {
            return this._outputData;
        };
        Object.defineProperty(HistorySettle.prototype, "totalRoomsNum", {
            //总局数,暂不显示
            get: function () {
                return this._outputData.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HistorySettle.prototype, "totalHandsNum", {
            //总手数,暂不显示
            get: function () {
                var sum = 0;
                //功能未实现
                return sum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HistorySettle.prototype, "general", {
            //概况,暂不显示
            get: function () {
                var obj = {};
                //局数
                var roomNum = this.length;
                //手数
                var handNum = 0;
                //盈亏
                var profitNum = 0;
                //获胜手数
                var winNum = 0;
                for (var i = 0; i < this.length; i++) {
                    var roomData = this._outputData[i]["roomData"];
                    var hand_arr = roomData["roomthing"];
                    if (hand_arr) {
                        //数组不为空，表示有参与牌局
                        handNum += hand_arr.length;
                        for (var j = 0; j < hand_arr.length; j++) {
                            profitNum += hand_arr[j]["iProfit"];
                            if (hand_arr[j]["iProfit"] > 0) {
                                //iProfit>0 表示有盈利，即获胜
                                winNum++;
                            }
                        }
                    }
                }
                return obj;
            },
            enumerable: true,
            configurable: true
        });
        //大鱼
        HistorySettle.prototype.Fish = function (index) {
            /**优先判定条件：本局中输的最多的玩家；
            次要判定条件：玩的手数最多；
            补充判定条件：入池牌局数量最多；
            最终判定条件：入座时间较早。 */
            ////
            //目前只能根据盈利判断
            var roomData = this._outputData[index]["roomData"];
            var gameList = roomData["End" + this._outputData[index]["roomId"]]["jsonAll"];
            gameList.sort(function (a, b) {
                return a["Chip"] - b["Chip"];
            });
            return gameList[0];
        };
        //鲨鱼
        HistorySettle.prototype.Shark = function (index) {
            /**优先判定条件：本局中赢的最多的玩家；
            次要判定条件：玩的手数最多；
            补充判定条件：入池牌局数量最多；
            最终判定条件：入座时间较早。 */
            ////
            //目前只能根据盈利判断
            var roomData = this._outputData[index]["roomData"];
            var gameList = roomData["End" + this._outputData[index]["roomId"]]["jsonAll"];
            gameList.sort(function (a, b) {
                return b["Chip"] - a["Chip"];
            });
            return gameList[0];
        };
        //土豪
        HistorySettle.prototype.Rich = function (index) {
            /**
             * 优先判定条件：本局中带入总量最多的玩家；
            次要判定条件：单次带入最多的玩家；
            补充判定条件：入池牌局数量最多；
            最终判定条件：入座时间较早。
             */
            ///目前只判断总带入
            var roomData = this._outputData[index]["roomData"];
            var gameList = roomData["End" + this._outputData[index]["roomId"]]["jsonAll"];
            gameList.sort(function (a, b) {
                return b.GoldTotal - a.GoldTotal;
            });
            return gameList[0];
        };
        //把数据输出成 itemrender 能用的形式。
        HistorySettle.prototype.makeDataAsArray = function () {
            var arr = [];
            var date;
            for (var i = 0; i < this.length; i++) {
                var item_obj = {};
                var d = this.getRoomData(i);
                item_obj["roomData"] = d;
                item_obj["date"] = this._date_arr[i];
                item_obj["roomId"] = this._roomId_arr[i];
                item_obj["profit"] = this.getProfitByIndex(i);
                if (i == 0) {
                    item_obj["showDate"] = true;
                }
                else if (this.isSameDay(this._date_arr[i], this._date_arr[i - 1])) {
                    item_obj["showDate"] = false;
                }
                else {
                    item_obj["showDate"] = true;
                }
                //
                if (d["join" + this._roomId_arr[i]] && d["End" + this._roomId_arr[i]]) {
                    //只有房间信息齐全的时候，才添加到列表（17-09-04）
                    arr.push(item_obj);
                }
            }
            /**
             * roomId:number //房间id
             * roomData:any,//数据
             * date:Date,//日期
             * showDate:bool//是否显示月日
             * profit:number//盈利
             */
            egret.log("整理后的战绩： ", arr);
            return arr;
        };
        //获取玩家某局的盈利
        HistorySettle.prototype.getProfitByIndex = function (index) {
            var roomData = this.getRoomData(index);
            var sum = 0;
            var arr = roomData["roomthing"];
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    sum += arr[i]["iProfit"];
                }
            }
            return sum;
        };
        //
        HistorySettle.prototype.getRoomData = function (index) {
            if (index < this._roomId_arr.length) {
                var str = this._data["room" + this._roomId_arr[index]];
                return JSON.parse(str);
            }
            return null;
        };
        //
        HistorySettle.prototype.isSameDay = function (day0, day1) {
            return (day0.getFullYear() == day1.getFullYear()) && (day0.getMonth() == day1.getMonth()) && (day0.getDate() == day1.getDate());
        };
        return HistorySettle;
    }());
    utils.HistorySettle = HistorySettle;
    __reflect(HistorySettle.prototype, "utils.HistorySettle");
})(utils || (utils = {}));
//# sourceMappingURL=HistorySettle.js.map