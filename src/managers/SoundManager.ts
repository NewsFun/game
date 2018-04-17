/**
 * @myfly
 */
module manager {

    /**
     * 游戏声音、音效管理器
     */
    export class SoundManager {

        private _current_voice: string = null;

        /**
         * 获取当期正在播放的背景音乐
         */
        public get current_voice(): string {
            return this._current_voice;
        }

        private _current_music: string = null;

        /**
         * 获取当期正在播放的背景音乐
         */
        public get current_music(): string {
            return this._current_music;
        }

        /**
         * 获取当期正在播放的背景音乐位置
         */
        public get current_music_pos(): number {
            var channel: egret.SoundChannel = this._playing[this.current_music];
            return (channel) ? channel.position : 0;
        }

        private _CACHE: Object = new Object();

        private _playing: Object = new Object();

        constructor() {
        }

        public getUrlByName(name: string): string {
            var tmp: string[] = name.split("_");
            var exname = tmp.pop();
            var url = "resource/sound/" + tmp.join("_") + "." + exname;
            return url;//"resource/sound/" + tmp.join("_") + ".mp3";
        }

        public playMusic(name: string, pos: number = 0, loop: number = 0): void {
            egret.log("播放背景音乐,name:" + name, "pos:" + pos, "loop：" + loop);
            if (!models.storageProxy().canPlayMusic) return;

            if (this._current_music == name) return;

            this.stop(this._current_music);

            this._current_music = name;

            if (name == null || name == "") return;

            var sound: egret.Sound = this._CACHE[name];

            if (!sound) sound = RES.getRes(name);

            if (sound) {
                egret.log("开始播放音乐：" + name, "pos:" + pos, "loop:" + loop);
                this._playing[name] = sound.play(pos, (pos == 0) ? loop : 1);
                this._playing[name].addEventListener(egret.Event.SOUND_COMPLETE, (event: egret.Event) => {
                    egret.log("播放音乐完毕，：" + name, "pos:" + pos, "loop:" + loop);
                    if (pos != 0 && loop != 1) {
                        pos = 0;
                        this._playing[name] = sound.play(pos, (loop == 0) ? 0 : loop - 1);
                    } else {
                        if (this._current_music == name) {
                            this._current_music = null;
                            var channel: egret.SoundChannel = this._playing[name];
                            if (channel) {
                                channel.stop();
                                delete this._playing[name];
                            }
                        }
                    }
                }, this)
            } else {
                sound = new egret.Sound();
                sound.load(this.getUrlByName(name));
                sound.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                    egret.log("加载音乐成功：" + name);
                    if (this._current_music == name) {
                        egret.log("开始播放音乐：" + name, "pos:" + pos, "loop:" + loop);
                        var chanel: egret.SoundChannel = sound.play(pos, (pos == 0) ? loop : 1);
                        chanel.volume = 1;
                        this._playing[name] = chanel;

                        this._playing[name].addEventListener(egret.Event.SOUND_COMPLETE, (event: egret.Event) => {
                            egret.log("播放音乐完毕，：" + name, "pos:" + pos, "loop:" + loop);
                            if (pos != 0 && loop != 1) {
                                pos = 0;
                                this._playing[name] = sound.play(0, (loop == 0) ? 0 : loop - 1);
                            } else {
                                if (this._current_music == name) {
                                    this._current_music = null;
                                }
                                var channel: egret.SoundChannel = this._playing[name];
                                if (channel) {
                                    channel.stop();
                                    delete this._playing[name];
                                }
                            }
                        }, this)

                    }

                    if (egret.Capabilities.runtimeType != egret.RuntimeType.NATIVE || egret.Capabilities.os != "Android") {
                        this._CACHE[name] = sound;
                    }
                }, this);

                sound.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
                    console.error(name + " Loaded Error !");
                }, this);
            }
        }

        public playVoice(name: string, pos: number = 0, loop: number = 1): void {
            if (!models.storageProxy().canPlaySound) return;

            if (this._current_voice == name) return;

            this.stop(this._current_voice);

            this._current_voice = name;

            if (name == null || name == "") return;

            var sound: egret.Sound = this._CACHE[name];

            if (!sound) sound = RES.getRes(name);

            if (sound) {
                this._playing[name] = sound.play(pos, (pos == 0) ? loop : 1);
                this._playing[name].addEventListener(egret.Event.SOUND_COMPLETE, (event: egret.Event) => {
                    if (pos != 0 && loop != 1) {
                        pos = 0;
                        this._playing[name] = sound.play(pos, (loop == 0) ? 0 : loop - 1);
                    } else {
                        if (this._current_voice == name) {
                            this._current_voice = null;
                        }
                        var channel: egret.SoundChannel = this._playing[name];
                        if (channel) {
                            channel.stop();
                            delete this._playing[name];
                        }
                    }
                }, this)
            } else {
                sound = new egret.Sound();
                sound.load(this.getUrlByName(name));
                sound.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                    if (this._current_voice == name) {
                        this._playing[name] = sound.play(pos, (pos == 0) ? loop : 1);
                        this._playing[name].addEventListener(egret.Event.SOUND_COMPLETE, (event: egret.Event) => {
                            if (pos != 0 && loop != 1) {
                                pos = 0;
                                this._playing[name] = sound.play(0, (loop == 0) ? 0 : loop - 1);
                            } else {
                                if (this._current_voice == name) {
                                    this._current_voice = null;
                                }
                                var channel: egret.SoundChannel = this._playing[name];
                                if (channel) {
                                    channel.stop();
                                    delete this._playing[name];
                                }
                            }
                        }, this)
                    }

                    if (egret.Capabilities.runtimeType != egret.RuntimeType.NATIVE || egret.Capabilities.os != "Android") {
                        this._CACHE[name] = sound;
                    }
                }, this);

                sound.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
                    console.error(name + " Loaded Error !");
                }, this);
            }
        }

        public playEffect(name: string, volume: number = 1, pos: number = 0, loop: number = 1): void {

            if (name == null || name == "") return;

            var sound: egret.Sound = this._CACHE[name];

            if (!sound) sound = RES.getRes(name);

            if (sound) {
                this._playing[name] = sound.play(pos, (pos == 0) ? loop : 1);
                this._playing[name].addEventListener(egret.Event.SOUND_COMPLETE, (event: egret.Event) => {
                    if (pos != 0 && loop != 1) {
                        pos = 0;
                        this._playing[name] = sound.play(pos, (loop == 0) ? 0 : loop - 1);
                    } else {
                        var channel: egret.SoundChannel = this._playing[name];
                        channel.volume = volume;
                        if (channel) {
                            // channel.stop();
                            // delete this._playing[name];
                        }
                    }
                }, this)
            } else {
                sound = new egret.Sound();
                sound.load(this.getUrlByName(name));
                sound.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                    this._playing[name] = sound.play(pos, (pos == 0) ? loop : 1);
                    egret.log(this._playing[name]);
                    this._playing[name].addEventListener(egret.Event.SOUND_COMPLETE, (event: egret.Event) => {
                        if (pos != 0 && loop != 1) {
                            pos = 0;
                            this._playing[name] = sound.play(0, (loop == 0) ? 0 : loop - 1);
                        } else {
                            var channel: egret.SoundChannel = this._playing[name];
                            channel.volume = volume;
                            if (channel) {
                                // channel.stop();
                                // delete this._playing[name];
                            }
                        }
                    }, this)

                    if (egret.Capabilities.runtimeType != egret.RuntimeType.NATIVE || egret.Capabilities.os != "Android") {
                        this._CACHE[name] = sound;
                    }
                }, this);

                sound.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
                    console.error(name + " Loaded Error !");
                }, this);
            }
        }

        public stop(name: string): void {
            if (!name) return;

            if (this._current_voice == name) {
                this._current_voice = null;
            }
            if (this._current_music == name) {
                this._current_music = null;
            }
            var channel: egret.SoundChannel = this._playing[name];
            if (channel) {
                channel.stop();
                channel = null;
            }
            delete this._playing[name];
        }

    }

}