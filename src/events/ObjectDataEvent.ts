/**
 * @myfly
 */
module events {
    
    /**
     * 可以携带两个数据的事件
     */
    export class ObjectDataEvent extends egret.Event {
        
        public carryData:any = null;
        
        constructor(type:string, data?:any, carryData?:any)
        {
            super(type, false, false);
            
            this.data = data;
            this.carryData = carryData;
        }
        
    }
}