
module scenes {

    export class BaseScene extends eui.Component {

        constructor() {
            super();

            this.percentHeight = 100;
            this.percentWidth = 100;
        }

        protected createChildren(): void {
            super.createChildren();
        }

        /**
         * 进入，需要重写
         */
        public onEnter(): void {
            egret.log("你需要重写 onEnter");
        }

        /**
         * 退出，需要重写
         */
        public onExit(): void {
            egret.log("你需要重写 onExit");
        }

        /**
         * 重新加载界面，断线重连时会执行这个函数
         */
        public reloadView(): void {
            // ===
        }

        /**
         * 暂停声音
         */
        public pauseSounds(): void {

        }

        /**
         * 恢复声音
         */
        public resumeSounds(): void {

        }

        /**添加多语言切换事件  */
        protected addLanguageEvent():void{

        }

        /**移除多语言切换事件 */
        protected removeLanguageEvent():void{
            
        }

        protected doLanguage(){

        }
    }
}