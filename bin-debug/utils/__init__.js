var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var utils;
(function (utils) {
    function log(message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        optionalParams.unshift(message);
        egret.log.apply(null, optionalParams);
    }
    utils.log = log;
    /**
     * 获取资源
     */
    function getAsset(source, compFunc, thisObject, type) {
        if (type === void 0) { type = RES.ResourceItem.TYPE_IMAGE; }
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, type);
        }
    }
    utils.getAsset = getAsset;
    // 获取用户登录信息 focus=1 强制更新
    function login(focus) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = models.storageProxy().user_id;
                        egret.log("登陆，用户user_id", user_id);
                        if (!(!user_id || focus == 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, getCode()];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        // result = await platform.wxCheckSession();
                        // if (result.code == 200) {
                        //     result = { "code": 200, "data": "" };
                        // }
                        // else {
                        //     result = await getCode()
                        // }
                        result = { "code": 200, "data": "" };
                        _a.label = 3;
                    case 3: return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(result);
                        })];
                }
            });
        });
    }
    utils.login = login;
    // 获取用户code
    function getCode() {
        return __awaiter(this, void 0, void 0, function () {
            var result1, result2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform.wxLogin()];
                    case 1:
                        result1 = _a.sent();
                        return [4 /*yield*/, getOpenId(result1.data.code)];
                    case 2:
                        result2 = _a.sent();
                        egret.log("收到的user_id", result2);
                        if (result2.data.userId) {
                            models.storageProxy().user_id = result2.data.userId;
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(result2);
                            })];
                }
            });
        });
    }
    utils.getCode = getCode;
    // 根据code获取用户openid
    function getOpenId(code) {
        return __awaiter(this, void 0, void 0, function () {
            var data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {};
                        data.code = code;
                        data.userId = models.storageProxy().user_id;
                        return [4 /*yield*/, platform.request("POST", {
                                action: "getUserInfo",
                                data: data
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    }
    utils.getOpenId = getOpenId;
    // 获取用户信息并上传
    function saveUserInfo() {
        return __awaiter(this, void 0, void 0, function () {
            var _this, user_id, result1, data, result2_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        user_id = models.storageProxy().user_id;
                        if (!user_id) {
                            console.log("错误:user_id为空");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, platform.wxGetUserInfo()];
                    case 1:
                        result1 = _a.sent();
                        if (!(result1.code < 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, platform.wxOpenSetting()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, saveUserInfo()];
                    case 3:
                        data = {};
                        data.userId = user_id;
                        data.nickname = result1.data.nickName;
                        data.gender = result1.data.gender;
                        data.avatarUrl = result1.data.avatarUrl;
                        data.country = result1.data.country;
                        data.city = result1.data.city;
                        data.province = result1.data.province;
                        return [4 /*yield*/, platform.request("POST", {
                                action: 'updateUserInfo',
                                data: data
                            })];
                    case 4:
                        result2_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(result2_1);
                            })];
                }
            });
        });
    }
    utils.saveUserInfo = saveUserInfo;
    // 播放音符
    function playMusic(musicname, volume) {
        var audio = platform.createInnerAudioContext();
        audio.src = 'resource/mp3/' + musicname + '.mp3';
        audio.volume = volume;
        audio.play();
        audio.onEnded(function () {
            audio.destroy();
        });
    }
    utils.playMusic = playMusic;
})(utils || (utils = {}));
//# sourceMappingURL=__init__.js.map