// 发-牌-器
var SENDCARD_SHOW = false;
// 详细日志模式
var LOG_SHOW_MORE = true;
/** 设计尺寸的宽度 */
var DESIGN_WIDTH = 1334;
/** 设计尺寸的高度 */
var DESIGN_HEIGHT = 750;
// ===================== 调试用 可能会影响逻辑==============
/** 开启龙骨动画 */
var DRAGONBONES_MOTION = true;
/** 开启Popup动画 */
var POPUP_MOTION = true;
// ==================== channels ==============
var CHANNEL_CNWAN = 1; //  官方
var CHANNEL_EGRET = 5; //  白鹭平台
var CHANNEL_YSDK = 6; //  微信
var CHANNEL_MYFLY = 666; //  myfly 测试
// ==================== numbers ==============
var QIAN_WANYI = 1000000000000000;
var YI_WANYI = 1000000000000;
var QIAN_YI = 100000000000;
var BAI_YI = 10000000000;
var SHI_YI = 1000000000;
var YI_YI = 100000000;
var QIAN_WAN = 10000000;
var BAI_WAN = 1000000;
var SHI_WAN = 100000;
var YI_WAN = 10000;
var YI_QIAN = 1000;
var ZERO = 0;
// ===================== proto ======================
var PROTO_ACCOUNT = "account_proto";
var PROTO_GATEWAY = "gateway_proto";
var PROTO_CENTER = "center_proto";
var PROTO_TABLE = "table_proto";
var PROTO_GAME_HUNDRED = "game_hundred_proto";
var PROTO_GAME_CLASSIC = "game_classic_proto";
var ACK = 0x200000;
var NTF = 0x800000;
// ===================== sound ==========================
var SOUND_bg_music_loading = "bg_music_loading_mp3"; //loading 
var SOUND_bg_music_hall = "bg_music_hall_mp3";
var SOUND_bg_music_allin = "bg_music_allin_mp3";
var SOUND_popup_show = "popup_show_mp3"; //显示弹窗
var SOUND_popup_hide = "popup_hide_mp3"; //隐藏弹窗
var SOUND_common_add_coin = "common_add_coin_mp3";
var SOUND_common_button = "common_button_wav";
var SOUND_game_allin_boy = "game_allin_mp3";
var SOUND_game_allin_girl = "game_allin_mp3";
var SOUND_game_call_card = "game_call_card_mp3";
var SOUND_game_check_card = "game_check_card_mp3";
var SOUND_game_deal_card = "game_deal_card_mp3";
var SOUND_game_flod_card = "game_flod_card_mp3";
var SOUND_game_raise_card = "game_call_card_mp3"; //加注和 bet, call 的声音，一致。
var SOUND_game_raise_change = "game_raise_change_mp3";
var SOUND_game_allin = "game_raise_card_mp3"; //allin 用长加注声音
var SOUND_game_result_win = "game_result_win_mp3";
var SOUND_game_turn_card = "game_turn_card_mp3";
var SOUND_game_start = "game_start_mp3";
var SOUND_myturn = "myturn_mp3";
var SOUND_game_exit = "game_exit_mp3";
var SOUND_game_sit_down = "game_sit_down_mp3";
var SOUND_game_chip_folding = "game_chip_folding_mp3";
var SOUND_think_time = "thike_time_mp3";
var SOUND_msg_sound = "msg_sound_wav";
var SOUND_bet_over = "bet_over_mp3";
var SOUND_rub_over = "rub_over_mp3";
var SOUND_registration = "registration_success_mp3";
var SOUND_home_btn = [
    { "music": [["c5", "c4"]] },
    { "music": [["c5", "e4"]] },
    { "music": [["g5", "c4"]] },
    { "music": [["g5", "e4"]] },
    { "music": [["a5", "c4"]] },
    { "music": [["a5", "f4"]] },
    { "music": [["g5", "c4"]] },
    { "music": [["", "e4"]] },
    { "music": [["f5", "c4"]] },
    { "music": [["f5", "f4"]] },
    { "music": [["e5", "c4"]] },
    { "music": [["e5", "e4"]] },
    { "music": [["d5", "b4"]] },
    { "music": [["d5", "f4"]] },
    { "music": [["c5", "c4"]] },
    { "music": [["", "e4"]] },
    { "music": [["g5", "c4"]] },
    { "music": [["g5", "e4"]] },
    { "music": [["f5", "c4"]] },
    { "music": [["f5", "f4"]] },
    { "music": [["e5", "c4"]] },
    { "music": [["e5", "e4"]] },
    { "music": [["d5", "b4"]] },
    { "music": [["", "f4"]] },
    { "music": [["g5", "c4"]] },
    { "music": [["g5", "e4"]] },
    { "music": [["f5", "c4"]] },
    { "music": [["f5", "f4"]] },
    { "music": [["e5", "c4"]] },
    { "music": [["e5", "e4"]] },
    { "music": [["d5", "b4"]] },
    { "music": [["", "f4"]] },
    { "music": [["c5", "c4"]] },
    { "music": [["c5", "e4"]] },
    { "music": [["g5", "c4"]] },
    { "music": [["g5", "e4"]] },
    { "music": [["a5", "c4"]] },
    { "music": [["a5", "f4"]] },
    { "music": [["g5", "c4"]] },
    { "music": [["", "e4"]] },
    { "music": [["f5", "c4"]] },
    { "music": [["f5", "f4"]] },
    { "music": [["e5", "c4"]] },
    { "music": [["e5", "e4"]] },
    { "music": [["d5", "b4"]] },
    { "music": [["d5", "f4"]] },
    { "music": [["c5", "c4"]] },
    { "music": [["", "e4"]] }
];
//# sourceMappingURL=__const__.js.map