// TypeScript file
module scenes {

    export class GameScene extends scenes.BaseScene{
        private cubeBox: eui.Group;

        private itemNum: number = 3;
        private sideNum: number = 6;
        private cubeWidth: number = 200;
        private cFrontList: any[] = [];

        constructor(){
            super();
            this.skinName = "game";
            this.init();
        }
        // 
        private init(){
            console.log("init game page");
            this.initSide("red");
            this.cubeWidth = ~~(this.cubeBox.width/3);
        }
        private initCube(){
            for(let i = 0;i<this.sideNum;i++){
                let side = this.initSide("red");
                this.cFrontList.push(side);
            }
        }
        private initSide(state: string){
            let sideList = [];
            for(let i = 0;i<this.itemNum;i++){
                let list = this.addCubeItem(this.cubeWidth*i, state);
                sideList.push(list);
            }
            return sideList;
        }
        private addCubeItem(iy: number, state: string){
            let itemList = [];
            for(let i = 0;i<this.itemNum;i++){
                let icube = new item.GameItem();
                icube.currentState = state;
                icube.x = this.cubeWidth*i;
                icube.y = iy;
                this.cubeBox.addChild(icube);
                itemList.push(icube);
            }
            return itemList;
        }
    }
}