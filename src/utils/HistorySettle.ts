/**处理服务器返回的 历史战绩 的数据 */
module utils {
	export class HistorySettle {
		//原始数据
		private _data: any;
		//时间数组
		private _date_arr: Date[] = [];
		//roomId数组
		private _roomId_arr: number[];
		//整理后的数据
		private _outputData: any[];
		public constructor(data: any) {
			this._data = data;
			this.init();
		}
		private init() {
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
		}
		//房间的创建信息
		public getRoomJoin(index: number): any {
			if (this._outputData) {
				var data = this._outputData[index];
				return data["roomData"]["join" + data["roomId"]];
			}
			return null;
		}
		//房间的结算信息
		public getRoomEnd(index: number): any {
			if (this._outputData) {
				var data = this._outputData[index];
				return data["roomData"]["End" + data["roomId"]];
			}
			return null;
		}
		//房间数
		public get length(): number {
			return this._roomId_arr.length;
		}
		//返回整理后的数据数组,以房间为单位
		public getDataArray(): any[] {
			return this._outputData;
		}
		//总局数,暂不显示
		public get totalRoomsNum(): number {
			return this._outputData.length;
		}
		//总手数,暂不显示
		public get totalHandsNum(): number {
			var sum = 0;
			//功能未实现
			return sum;
		}
		//概况,暂不显示
		public get general(): any {
			var obj = {};
			//局数
			var roomNum: number = this.length;
			//手数
			var handNum: number = 0;
			//盈亏
			var profitNum: number = 0;
			//获胜手数
			var winNum: number = 0;
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
		}
		//大鱼
		public Fish(index): any {
			/**优先判定条件：本局中输的最多的玩家；
			次要判定条件：玩的手数最多；
			补充判定条件：入池牌局数量最多；
			最终判定条件：入座时间较早。 */
			////
			//目前只能根据盈利判断
			var roomData = this._outputData[index]["roomData"];
			var gameList = roomData["End" + this._outputData[index]["roomId"]]["jsonAll"];
			gameList.sort(function (a, b) {
				return a["Chip"] - b["Chip"]
			})
			return gameList[0];
		}
		//鲨鱼
		public Shark(index): any {
			/**优先判定条件：本局中赢的最多的玩家；
			次要判定条件：玩的手数最多；
			补充判定条件：入池牌局数量最多；
			最终判定条件：入座时间较早。 */
			////
			//目前只能根据盈利判断
			var roomData = this._outputData[index]["roomData"];
			var gameList = roomData["End" + this._outputData[index]["roomId"]]["jsonAll"];
			gameList.sort(function (a, b) {
				return b["Chip"] - a["Chip"]
			})
			return gameList[0];
		}
		//土豪
		public Rich(index) {
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
			})
			return gameList[0];
		}
		//把数据输出成 itemrender 能用的形式。
		private makeDataAsArray(): any[] {
			var arr = [];
			var date: Date;
			for (var i = 0; i < this.length; i++) {
				var item_obj = {};
				var d = this.getRoomData(i);
				item_obj["roomData"] = d;
				item_obj["date"] = this._date_arr[i];
				item_obj["roomId"] = this._roomId_arr[i];
				item_obj["profit"] = this.getProfitByIndex(i);
				if (i == 0) {
					item_obj["showDate"] = true;
				} else if (this.isSameDay(this._date_arr[i], this._date_arr[i - 1])) {
					item_obj["showDate"] = false;
				} else {
					item_obj["showDate"] = true;
				}
				//
				if(d["join"+this._roomId_arr[i]]&&d["End"+this._roomId_arr[i]]){
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
		}
		//获取玩家某局的盈利
		private getProfitByIndex(index: number): number {
			var roomData = this.getRoomData(index);
			var sum: number = 0;
			var arr = roomData["roomthing"];
			if (arr) {
				for (var i = 0; i < arr.length; i++) {
					sum += arr[i]["iProfit"];
				}
			}
			return sum;
		}
		//
		private getRoomData(index: number): any {
			if (index < this._roomId_arr.length) {
				var str = this._data["room" + this._roomId_arr[index]];
				return JSON.parse(str);
			}
			return null;
		}
		//
		private isSameDay(day0: Date, day1: Date): boolean {
			return (day0.getFullYear() == day1.getFullYear()) && (day0.getMonth() == day1.getMonth()) && (day0.getDate() == day1.getDate());
		}
	}
}