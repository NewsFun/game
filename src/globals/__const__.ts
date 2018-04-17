

// 发-牌-器
const SENDCARD_SHOW: boolean = false;

// 详细日志模式
const LOG_SHOW_MORE: boolean = true;

/** 设计尺寸的宽度 */
const DESIGN_WIDTH: number = 1334;
/** 设计尺寸的高度 */
const DESIGN_HEIGHT: number = 750;

// ===================== 调试用 可能会影响逻辑==============
/** 开启龙骨动画 */
const DRAGONBONES_MOTION: boolean = true;
/** 开启Popup动画 */
const POPUP_MOTION: boolean = true;


// ==================== channels ==============
const CHANNEL_CNWAN = 1           //  官方
const CHANNEL_EGRET = 5      //  白鹭平台
const CHANNEL_YSDK = 6       //  微信
const CHANNEL_MYFLY = 666       //  myfly 测试


// ==================== numbers ==============
const QIAN_WANYI = 1000000000000000
const YI_WANYI = 1000000000000
const QIAN_YI = 100000000000
const BAI_YI = 10000000000
const SHI_YI = 1000000000
const YI_YI = 100000000
const QIAN_WAN = 10000000
const BAI_WAN = 1000000
const SHI_WAN = 100000
const YI_WAN = 10000
const YI_QIAN = 1000
const ZERO = 0



// ===================== proto ======================
const PROTO_ACCOUNT = "account_proto";
const PROTO_GATEWAY = "gateway_proto";
const PROTO_CENTER = "center_proto";
const PROTO_TABLE = "table_proto";
const PROTO_GAME_HUNDRED = "game_hundred_proto";
const PROTO_GAME_CLASSIC = "game_classic_proto";

const ACK = 0x200000;
const NTF = 0x800000;

// ===================== sound ==========================
const SOUND_bg_music_loading: string = "bg_music_loading_mp3";//loading 
const SOUND_bg_music_hall: string = "bg_music_hall_mp3";
const SOUND_bg_music_allin: string = "bg_music_allin_mp3";


const SOUND_popup_show: string = "popup_show_mp3";//显示弹窗
const SOUND_popup_hide: string = "popup_hide_mp3";//隐藏弹窗

const SOUND_common_add_coin: string = "common_add_coin_mp3";
const SOUND_common_button: string = "common_button_wav";


const SOUND_game_allin_boy: string = "game_allin_mp3";
const SOUND_game_allin_girl: string = "game_allin_mp3";
const SOUND_game_call_card: string = "game_call_card_mp3";
const SOUND_game_check_card: string = "game_check_card_mp3";
const SOUND_game_deal_card: string = "game_deal_card_mp3";
const SOUND_game_flod_card: string = "game_flod_card_mp3";
const SOUND_game_raise_card: string = "game_call_card_mp3";//加注和 bet, call 的声音，一致。
const SOUND_game_raise_change:string = "game_raise_change_mp3";

const SOUND_game_allin:string = "game_raise_card_mp3";//allin 用长加注声音




const SOUND_game_result_win: string = "game_result_win_mp3";
const SOUND_game_turn_card: string = "game_turn_card_mp3";

const SOUND_game_start: string = "game_start_mp3";
const SOUND_myturn:string = "myturn_mp3";

const SOUND_game_exit:string = "game_exit_mp3";
const SOUND_game_sit_down:string = "game_sit_down_mp3";
const SOUND_game_chip_folding:string = "game_chip_folding_mp3";


const SOUND_think_time:string = "thike_time_mp3";

const SOUND_msg_sound:string = "msg_sound_wav"

const SOUND_bet_over: string = "bet_over_mp3";
const SOUND_rub_over: string = "rub_over_mp3";

const SOUND_registration: string = "registration_success_mp3";
const SOUND_home_btn: any[] = [
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
    { "music": [["", "e4"]] }];






