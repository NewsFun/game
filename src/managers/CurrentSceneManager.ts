module manager {
	/**
	 * 场景管理器
	 * @author zxy 
	 * 
	 */
	export class CurrentSceneManager {
		private _sceneMap: any[] = [];

		public addNoteToQueue(callBack: any) {
			this._sceneMap.push(callBack);
		}

		public popNoteFromQueue() {
			var len = this._sceneMap.length;
			if (len === 0) { return false; }

			this._sceneMap.pop();
			return true
		}
	}
}


// 通知节点队列，用于处理界面堆栈



