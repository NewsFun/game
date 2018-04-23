// TypeScript file
module scenes {

    export class GameScene extends scenes.BaseScene{
        private cubeBox: eui.Group;

        private itemNum: number = 3;
        private sideNum: number = 6;
        private cubeWidth: number = 200;
        private cubeList: any[] = [];
        private sideColor: any[] = ["red", "green", "blue", "black", "white", "orange"];

        constructor(){
            super();
            this.skinName = "game";
            this.init();
        }
        // 
        private init(){
            console.log("init game page");
            this.cubeWidth = ~~(this.cubeBox.width/3);
            this.initCube().addCubeItem();
        }
        private addCubeItem(){
            this.cubeList.forEach((e, i)=>{
                this.cubeBox.addChild(e);
            });
        }
        private initCube(){
            for(let i = 0;i<this.sideNum;i++){
                let state = this.sideColor[i];
                this.initSide(state);
            }
            return this;
        }
        private initSide(state: string){
            for(let i = 0;i<this.itemNum;i++){
                this.createCubeItem(this.cubeWidth*i, state);
            }
        }
        private createCubeItem(iy: number, state: string){
            for(let i = 0;i<this.itemNum;i++){
                let icube = new item.GameItem();
                icube.currentState = state;
                icube.x = this.cubeWidth*i;
                icube.y = iy;
                this.cubeList.push(icube);
            }
        }
    }
}