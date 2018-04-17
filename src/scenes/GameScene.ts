// TypeScript file
module scenes {

    export class GameScene extends scenes.BaseScene{
        private cubeTop: eui.Group;
        private cubeBack: eui.Group;
        private cubeLeft: eui.Group;
        private cubeRight: eui.Group;
        private cubeFront: eui.Group;
        private cubeBottom: eui.Group;

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
            this.initSide();
            this.cubeWidth = ~~(this.cubeFront.width/3);
        }
        private initCube(){
            for(let i = 0;i<this.sideNum;i++){
                let side = this.initSide();
                this.cFrontList.push(side);
            }
        }
        private initSide(){
            let sideList = [];
            for(let i = 0;i<this.itemNum;i++){
                let list = this.addCubeItem(this.cubeWidth*i);
                sideList.push(list);
            }
            return sideList;
        }
        private addCubeItem(iy: number){
            let itemList = [];
            for(let i = 0;i<this.itemNum;i++){
                let icube = new item.GameItem();
                icube.x = this.cubeWidth*i;
                icube.y = iy;
                this.cubeFront.addChild(icube);
                itemList.push(icube);
            }
            return itemList;
        }
    }
}