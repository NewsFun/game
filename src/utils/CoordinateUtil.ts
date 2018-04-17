// TypeScript file
/**
 * 坐标转换
 * 
 */
module utils {
    
    //播放序列动画//png,json,moviename
    export function playMovie(tex_png: string, tex_json: string, moviename: string): egret.MovieClip {
        var mytexture = RES.getRes(tex_json);
        var mydata = RES.getRes(tex_png);
        var mcDataFactory = new egret.MovieClipDataFactory(mytexture, mydata);
        var role: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData());
        return role;
    }
}