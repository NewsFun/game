var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @myfly
 */
var manager;
(function (manager) {
    /**
     * 游戏声音、音效管理器
     */
    var SoundManager = (function () {
        function SoundManager() {
            this._current_voice = null;
            this._current_music = null;
            this._CACHE = new Object();
            this._playing = new Object();
        }
        Object.defineProperty(SoundManager.prototype, "current_voice", {
            /**
             * 获取当期正在播放的背景音乐
             */
            get: function () {
                return this._current_voice;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "current_music", {
            /**
             * 获取当期正在播放的背景音乐
             */
            get: function () {
                return this._current_music;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "current_music_pos", {
            /**
             * 获取当期正在播放的背景音乐位置
             */
            get: function () {
                var channel = this._playing[this.current_music];
                return (channel) ? channel.position : 0;
            },
            enumerable: true,
            configurable: true
        });
        SoundManager.prototype.getUrlByName = function (name) {
            var tmp = name.split("_");
            var exname = tmp.pop();
            var url = "resource/sound/" + tmp.join("_") + "." + exname;
            return url; //"resource/sound/" + tmp.join("_") + ".mp3";
        };
        SoundManager.prototype.playMusic = function (name, pos, loop) {
            var _this = this;
            if (pos === void 0) { pos = 0; }
            if (loop === void 0) { loop = 0; }
            egret.log("播放背景音乐,name:" + name, "pos:" + pos, "loop：" + loop);
            if (!models.storageProxy().canPlayMusic)
                return;
            if (this._current_music == name)
                return;
            this.stop(this._current_music);
            this._current_music = name;
            if (name == null || name == "")
                return;
            var sound = this._CACHE[name];
            if (!sound)
                sound = RES.getRes(name);
            if (sound) {
                egret.log("开始播放音乐：" + name, "pos:" + pos, "loop:" + loop);
                this._playing[name] = sound.play(pos, (pos == 0) ? loop : 1);
                this._playing[name].addEventListener(egret.Event.SOUND_COMPLETE, function (event) {
                    egret.log("播放音乐完毕，：" + name, "pos:" + pos, "loop:" + loop);
                    if (pos != 0 && loop != 1) {
                        pos = 0;
                        _this._playing[name] = sound.play(pos, (loop == 0) ? 0 : loop - 1);
                    }
                    else {
                        if (_this._current_music == name) {
                            _this._current_music = null;
                            var channel = _this._playing[name];
                            if (channel) {
                                channel.stop();
                                delete _this._playing[name];
                            }
                        }
                    }
                }, this);
            }
            else {
                sound = new egret.Sound();
                sound.load(this.getUrlByName(name));
                sound.addEventListener(egret.Event.COMPLETE, function (event) {
                    egret.log("加载音乐成功：" + name);
                    if (_this._current_music == name) {
                        egret.log("开始播放音乐：" + name, "pos:" + pos, "loop:" + loop);
                        var chanel = sound.play(pos, (pos == 0) ? loop : 1);
                        chanel.volume = 1;
                        _this._playing[name] = chanel;
                        _this._playing[name].addEventListener(egret.Event.SOUND_COMPLETE, function (event) {
                            egret.log("播放音乐完毕，：" + name, "pos:" + pos, "loop:" + loop);
                            if (pos != 0 && loop != 1) {
                                pos = 0;
                                _this._playing[name] = sound.play(0, (loop == 0) ? 0 : loop - 1);
                            }
                            else {
                                if (_this._current_music == name) {
                                    _this._current_music = null;
                                }
                                var channel = _this._playing[name];
                                if (channel) {
                                    channel.stop();
                                    delete _this._playing[name];
                                }
                            }
                        }, _this);
                    }
                    if (egret.Capabilities.runtimeType != egret.RuntimeType.NATIVE || egret.Capabilities.os != "Android") {
                        _this._CACHE[name] = sound;
                    }
                }, this);
                sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                    console.error(name + " Loaded Error !");
                }, this);
            }
        };
        SoundManager.prototype.playVoice = function (name, pos, loop) {
            var _this = this;
            if (pos === void 0) { pos = 0; }
            if (loop === void 0) { loop = 1; }
            if (!models.storageProxy().canPlaySound)
                return;
            if (this._current_voice == name)
                return;
            this.stop(this._current_voice);
            this._current_voice = name;
            if (name == null || name == "")
                return;
            var sound = this._CACHE[name];
            if (!sound)
                sound = RES.getRes(name);
            if (sound) {
                this._playing[name] = sound.play(pos, (pos == 0) ? loop : 1);
                this._playing[name].addEventListener(egret.Event.SOUND_COMPLETE, function (event) {
                    if (pos != 0 && loop != 1) {
                        pos = 0;
                        _this._playing[name] = sound.play(pos, (loop == 0) ? 0 : loop - 1);
                    }
                    else {
                        if (_this._current_voice == name) {
                            _this._current_voice = null;
                        }
                        var channel = _this._playing[name];
                        if (channel) {
                            channel.stop();
                            delete _this._playing[name];
                        }
                    }
                }, this);
            }
            else {
                sound = new egret.Sound();
                sound.load(this.getUrlByName(name));
                sound.addEventListener(egret.Event.COMPLETE, function (event) {
                    if (_this._current_voice == name) {
                        _this._playing[name] = sound.play(pos, (pos == 0) ? loop : 1);
                        _this._playing[name].addEventListener(egret.Event.SOUND_COMPLETE, function (event) {
                            if (pos != 0 && loop != 1) {
                                pos = 0;
                                _this._playing[name] = sound.play(0, (loop == 0) ? 0 : loop - 1);
                            }
                            else {
                                if (_this._current_voice == name) {
                                    _this._current_voice = null;
                                }
                                var channel = _this._playing[name];
                                if (channel) {
                                    channel.stop();
                                    delete _this._playing[name];
                                }
                            }
                        }, _this);
                    }
                    if (egret.Capabilities.runtimeType != egret.RuntimeType.NATIVE || egret.Capabilities.os != "Android") {
                        _this._CACHE[name] = sound;
                    }
                }, this);
                sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                    console.error(name + " Loaded Error !");
                }, this);
            }
        };
        SoundManager.prototype.playEffect = function (name, volume, pos, loop) {
            var _this = this;
            if (volume === void 0) { volume = 1; }
            if (pos === void 0) { pos = 0; }
            if (loop === void 0) { loop = 1; }
            if (name == null || name == "")
                return;
            var sound = this._CACHE[name];
            if (!sound)
                sound = RES.getRes(name);
            if (sound) {
                this._playing[name] = sound.play(pos, (pos == 0) ? loop : 1);
                this._playing[name].addEventListener(egret.Event.SOUND_COMPLETE, function (event) {
                    if (pos != 0 && loop != 1) {
                        pos = 0;
                        _this._playing[name] = sound.play(pos, (loop == 0) ? 0 : loop - 1);
                    }
                    else {
                        var channel = _this._playing[name];
                        channel.volume = volume;
                        if (channel) {
                            // channel.stop();
                            // delete this._playing[name];
                        }
                    }
                }, this);
            }
            else {
                sound = new egret.Sound();
                sound.load(this.getUrlByName(name));
                sound.addEventListener(egret.Event.COMPLETE, function (event) {
                    _this._playing[name] = sound.play(pos, (pos == 0) ? loop : 1);
                    egret.log(_this._playing[name]);
                    _this._playing[name].addEventListener(egret.Event.SOUND_COMPLETE, function (event) {
                        if (pos != 0 && loop != 1) {
                            pos = 0;
                            _this._playing[name] = sound.play(0, (loop == 0) ? 0 : loop - 1);
                        }
                        else {
                            var channel = _this._playing[name];
                            channel.volume = volume;
                            if (channel) {
                                // channel.stop();
                                // delete this._playing[name];
                            }
                        }
                    }, _this);
                    if (egret.Capabilities.runtimeType != egret.RuntimeType.NATIVE || egret.Capabilities.os != "Android") {
                        _this._CACHE[name] = sound;
                    }
                }, this);
                sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                    console.error(name + " Loaded Error !");
                }, this);
            }
        };
        SoundManager.prototype.stop = function (name) {
            if (!name)
                return;
            if (this._current_voice == name) {
                this._current_voice = null;
            }
            if (this._current_music == name) {
                this._current_music = null;
            }
            var channel = this._playing[name];
            if (channel) {
                channel.stop();
                channel = null;
            }
            delete this._playing[name];
        };
        return SoundManager;
    }());
    manager.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "manager.SoundManager");
})(manager || (manager = {}));
//# sourceMappingURL=SoundManager.js.map