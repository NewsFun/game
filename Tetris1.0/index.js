/**
 * Created by BOBO on 14-11-12.
 */
window.onload = function gameWorld(){
    function Tetris(){
        this._row = 9;
        this._line = 16;
        this._pieType = 6;
        this._gameBox = document.getElementById('gameBox');
    }
    Tetris.prototype = {
        init:function(){
            this.axis();
        },
        axis:function(){//页面生成
            for(var l = 0;l<this._line;l++){
                for(var r = 0;r<this._row;r++){
                    var _brick = document.createElement('div');
                    _brick.id = 'l'+l+'_r'+r;
                    _brick.className = '';
                    _brick.x = r;
                    _brick.y = l;
                    this._gameBox.appendChild(_brick);
                }
            }
        },
        makePie:function(){//方砖类型生成
            var _pieType = [
                [ [ [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 3 ] ] ],//口

                [ [ [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 0, 6 ] ],
                    [ [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ] ] ],//一

                [ [ [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 2, 4 ] ],
                  [ [ 1, 3 ], [ 1, 4 ], [ 0, 4 ], [ 0, 5 ] ] ],//S

                [ [ [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 1, 5 ] ],
                  [ [ 1, 3 ], [ 2, 3 ], [ 0, 4 ], [ 1, 4 ] ] ],//Z

                [ [ [ 0, 3 ], [ 1, 3 ], [ 0, 4 ], [ 0, 5 ] ],
                  [ [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 2, 4 ] ],
                  [ [ 0, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ] ],
                  [ [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 5 ] ] ],//7

                [ [ [ 0, 3 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ] ],
                  [ [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 0, 4 ] ],
                  [ [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 5 ] ],
                  [ [ 2, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ] ] ],//L

                [ [ [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 0, 4 ] ],
                  [ [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 1, 4 ] ],
                  [ [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 1, 4 ] ],
                  [ [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 1, 3 ] ] ],//丁
                [ [ [ 3, 0] ] ]
            ];
            var _randomType = Math.round(Math.random()*this._pieType);
            return _pieType[_randomType];
        },
        paintColor:function(pie, colorClass){//上色
            for(var i = 0;i<pie.length;i++){
                var _brick = document.getElementById('l'+pie[i][0]+'_r'+pie[i][1]);
                if(_brick) _brick.className = colorClass;
            }
        },
        loseColor:function(pie){//去色
            for(var i = 0;i<pie.length;i++){
                var _brick = document.getElementById('l'+pie[i][0]+'_r'+pie[i][1]);
                if(_brick) _brick.className = '';
            }
        },
        nextPie:function(pieArray){//下落
            var _array = pieArray;
            for(var i = 0;i<_array.length;i++){
                for(var j = 0;j<_array[i].length;j++){
                    _array[i][j][0]++;
                }
            }
            return _array;
        },
        moveLeft:function(pieArray, pie){//左移
            var  _array = pieArray;
            var _minx = this.mostValue(pie).minx;
            for(var i = 0;i<_array.length;i++){
                for(var j = 0;j<_array[i].length;j++){
                    if(_minx>0) _array[i][j][1]--;
                }
            }
            return _array;
        },
        moveRight:function(pieArray, pie){//右移
            var  _array = pieArray;
            var _maxx = this.mostValue(pie).maxx;
            for(var i = 0;i<_array.length;i++){
                for(var j = 0;j<_array[i].length;j++){
                    if(_maxx<this._row-1) _array[i][j][1]++;
                }
            }
            return _array;
        },
        mostValue:function(pie){//求最值
            var _minx = this._row, _maxx = 0, _miny = this._line, _maxy = 0;
            for(var i = 0;i<pie.length;i++){
                _minx = (_minx > pie[i][1])? pie[i][1] : _minx;
                _maxx = (_maxx < pie[i][1])? pie[i][1] : _maxx;
                _miny = (_miny > pie[i][0])? pie[i][0] : _miny;
                _maxy = (_maxy < pie[i][0])? pie[i][0] : _maxy;
            }
            return {minx:_minx, maxx:_maxx, miny:_miny, maxy:_maxy}
        },
        reachBottom:function(pie){//判断是否到达底部
            var _polling = false;
            for(var i = 0;i<pie.length;i++){
                var _brick = document.getElementById('l'+(pie[i][0]+1)+'_r'+pie[i][1]);
                if(_brick){
                    _polling = (_brick.className == 'jam')? true:(_polling||false);
                }else{
                    _polling = true;
                }

            }
            return _polling;
        },
        wallOfRight:function(pie){//是否可右移
            var _polling = false;
            for(var i = 0;i<pie.length;i++){
                var _brick = document.getElementById('l'+pie[i][0]+'_r'+(pie[i][1]+1));
                if(_brick)
                    _polling = (_brick.className == 'jam')? true:(_polling||false);
            }
            return _polling;
        },
        wallOfLeft:function(pie){//是否可左移
            var _polling = false;
            for(var i = 0;i<pie.length;i++){
                var _brick = document.getElementById('l'+pie[i][0]+'_r'+(pie[i][1]-1));
                if(_brick)
                    _polling = (_brick.className == 'jam')? true:(_polling||false);
            }
            return _polling;
        },
        checkFull:function(miny, maxy){//判断是否满行
            for(var i = miny;i<=maxy;i++){
                for(var j = 0;j<this._row;j++){
                    var _brick = document.getElementById('l'+i+'_r'+j);
                    if(_brick.className != 'jam') break;
                    if(j > this._row-2) this._puff(i);
                }
            }
        },
        _puff:function(lineNum){//消除满行
            for(var i = 0;i<this._row;i++){
                document.getElementById('l'+lineNum+'_r'+i).className = '';
            }
            this._fallDown(lineNum);
        },
        _fallDown:function(lineNum){//满行以上下落
            console.info(lineNum);
            var _last = [], _next = [];
            var _jams = this._gameBox.getElementsByTagName('div');

            for(var j = 0;j<_jams.length;j++){
                var _y = _jams[j].y, _x = _jams[j].x;
                if(_y < lineNum && _jams[j].className == 'jam'){
                    _last.push([_y, _x]);
                    _next.push([_y+1, _x]);
                }
            }
            this.loseColor(_last);
            this.paintColor(_next, 'jam');
        },
        gameOver:function(){//游戏结束
            alert('game over!');
        },
        help:function(){
            alert('是谁在召唤我');
        }
    }

    var _clock = 800, _pie = [], typeNum = 0, _typeNum = 0, _mostValue, _flag = false, _time = 0;

    var els = new Tetris();//创建对象
    els.axis();//初始化页面，生成网格

    var pieType = els.makePie();
    _pie = pieType[typeNum];

    process();

    function process(){
        els.paintColor(_pie, 'pie');

        var gameClock = setTimeout(function(){
            els.loseColor(_pie);
            var _reachFoot = els.reachBottom(_pie);//是否到底

            if(_reachFoot){
                els.paintColor(_pie, 'jam');//变色
                _mostValue = els.mostValue(_pie);
                els.checkFull(_mostValue.miny, _mostValue.maxy);//判断是否有满行的

                if(_mostValue.miny<1){//方块溢出
                    clearTimeout(gameClock);//终止延时
                    els.gameOver();//游戏结束
                }else{//重新加载
                    _time ++;
                    pieType = els.makePie();//重新生成方块
                    typeNum = 0;
                    _pie = pieType[typeNum];
                    process();
                }

            }else{
                pieType = els.nextPie(pieType);//下落
                process();
            }
        },_clock);

    }

    (document.documentElement || document.body).onkeydown = function key(e){
        switch ((window.event||e).keyCode){
            case 65://A
            case 37://左键
                var _leftWall = els.wallOfLeft(_pie);
                if(_leftWall) break;
                els.loseColor(_pie);
                pieType = els.moveLeft(pieType, _pie);
                els.paintColor(_pie, 'pie');
                break;
            case 87://W
            case 38://上键
                els.loseColor(_pie);
                _typeNum ++;
                typeNum = _typeNum%pieType.length;
                _pie = pieType[typeNum];
                els.paintColor(_pie, 'pie');
                break;
            case 68://D
            case 39://右键
                var _rightWall = els.wallOfRight(_pie);
                if(_rightWall) break;
                els.loseColor(_pie);
                pieType = els.moveRight(pieType, _pie);
                els.paintColor(_pie, 'pie');
                break;
            case 83://S
            case 40://下贱
                _clock = 400;//没事儿别乱摁，摁了就变不回去了
                break;
            case 72://彩蛋
                els.help();
                break;
            default : break;
        }
    }

}
