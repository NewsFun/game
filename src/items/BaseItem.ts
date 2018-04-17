module item {
    /**
     * 桌子列表项
     * @author myfly
     */
    export class BaseItem extends eui.Component implements eui.IItemRenderer {

        public _data: any = null;
        public _itemIndex: number = -1;
        public _selected: boolean = false;
        
        constructor() {
            super();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemClick, this);
        }
        /**
         * 设置条目数据
         */
        public set data(value: any) {
            
        }
        /** 
         * 读取条目数据
         */
        public get data(): any {
            return this._data;
        }

        public set itemIndex(value: number) {
            this._itemIndex = value;
        }

        public get itemIndex(): number {
            return this._itemIndex;
        }

        public set selected(value: boolean) {
            this._selected = value;
        }

        public get selected(): boolean {
            return this._selected;
        }

        public get owner(): eui.DataGroup {
            return <eui.DataGroup>this.parent;
        }

        public onItemClick(e: egret.TouchEvent): void {

        }
    }
}