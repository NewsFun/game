// TypeScript file
/**
 * 坐标转换
 *
 */
var utils;
(function (utils) {
    //播放序列动画//png,json,moviename
    function playMovie(tex_png, tex_json, moviename) {
        var mytexture = RES.getRes(tex_json);
        var mydata = RES.getRes(tex_png);
        var mcDataFactory = new egret.MovieClipDataFactory(mytexture, mydata);
        var role = new egret.MovieClip(mcDataFactory.generateMovieClipData());
        return role;
    }
    utils.playMovie = playMovie;
})(utils || (utils = {}));
//# sourceMappingURL=CoordinateUtil.js.map