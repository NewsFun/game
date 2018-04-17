/**
 * @myfly
 */
module manager {

    /**
     * 事件管理器
     */
    export class EventManager extends egret.EventDispatcher  {

        private _listenerData: ListenerData[] = [];

        public addListener(dispatcher: egret.IEventDispatcher, type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {
            var evtData = new ListenerData();

            evtData.dispatcher = dispatcher;
            evtData.type = type;
            evtData.listener = listener;
            evtData.thisObject = thisObject;
            evtData.useCapture = useCapture;
            evtData.priority = priority;

            evtData.addListener();

            this._listenerData.push(evtData);
        }

        public addListenerUnique(dispatcher: egret.IEventDispatcher, type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {
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
        }

        public removeListener(dispatcher: egret.IEventDispatcher, type?: string, onlyFirst: boolean = true): void {
            for (var i = 0, iLen = this._listenerData.length; i < iLen; i++) {
                var element = this._listenerData[i];
                if (element.dispatcher == dispatcher) {
                    if (!type || type == element.type) {
                        element.removeListener();
                        element.clear();
                        this._listenerData.splice(i, 1);
                        i--;
                        iLen--;
                        if (onlyFirst) break;
                    }
                }
            }
        }

        public removeListenerByThisObject(thisObject: any): void {
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
        }

        public removeAllListener(): void {
            for (var i = 0, iLen = this._listenerData.length; i < iLen; i++) {
                var element = this._listenerData[i];

                element.removeListener();
                element.clear();
            }
            this._listenerData.length = 0;
        }
    }

    class ListenerData {

        public dispatcher: egret.IEventDispatcher;
        public type: string;
        public listener: Function;
        public thisObject: any;
        public useCapture: boolean;
        public priority: number;

        public constructor() {
            this.clear();
        }

        public clear(): void {
            this.dispatcher = null;
            this.type = "";
            this.listener = null;
            this.thisObject = null;
        }

        public addListener(): void {
            if (this.dispatcher && this.listener && this.type != "") {
                this.dispatcher.addEventListener(this.type, this.listener, this.thisObject, this.useCapture, this.priority);
            }
        }

        public removeListener(): void {
            if (this.dispatcher && this.listener && this.type != "") {
                this.dispatcher.removeEventListener(this.type, this.listener, this.thisObject, this.useCapture);
            }
        }

    }

}