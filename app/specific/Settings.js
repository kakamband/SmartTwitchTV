//Variable initialization
var Settings_cursorY = 0;
var Settings_value = {
    "restor_playback": { //restor_playback
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "clip_auto_play_next": { //clip_auto_play_next
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "keep_panel_info_visible": { //clip_auto_play_next
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "single_click_exit": { //single_click_exit
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "app_animations": { //app_animations
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "show_screen_counter": { //show_screen_counter
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "live_feed_sort": { //show_screen_counter
        "values": ["views", "a-z", "z-a"],
        "defaultValue": 1
    },
    "live_notification": { //buffer_live
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "global_font_offset": { //live notification
        "values": [-3, -2, -1, 0, 1, 2, 3],
        "defaultValue": 4
    },
    "live_notification_time": { //live notification
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "defaultValue": 4
    },
    "buffer_live": { //buffer_live
        "values": [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 5
    },
    "buffer_vod": { //buffer_vod
        "values": [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 8
    },
    "buffer_clip": { //buffer_clip
        "values": [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 5
    },
    "end_dialog_counter": { //end_dialog_counter
        "values": ['disable', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
    },
    "bitrate_main": { //bitrate_main
        "values": ['disable', 11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],
        "defaultValue": 1
    },
    "bitrate_min": { //bitrate_min
        "values": ['disable', 11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],
        "defaultValue": 18
    },
    "videos_animation": { //videos_animation
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "thumb_quality": { //thumbnail quality
        "values": ["very-low", "low", "normal", "high", "very-high"],
        "defaultValue": 3
    },
    "default_quality": { //default player quality Auto or source
        "values": ["Auto", "source"],
        "defaultValue": 1
    },
    "clock_offset": { //clock_offset
        "values": Settings_GenerateClock(),
        "defaultValue": 49
    },
    "content_lang": { //content_lang
        "values": ["All"],
        "set_values": [""],
        "defaultValue": 1
    }
};

function Settings_GenerateClock() {
    var clock = [],
        time = 43200,
        i = 0;

    for (i; i < 48; i++) {
        clock.push("-" + Play_timeS(time));
        time -= 900;
    }

    clock.push(Play_timeS(0));
    time = 900;

    for (i = 0; i < 48; i++) {
        clock.push(Play_timeS(time));
        time += 900;
    }

    return clock;
}

var Settings_value_keys = [];
var Settings_positions_length = 0;
//Variable initialization end

function Settings_init() {
    document.body.addEventListener("keydown", Settings_handleKeyDown, false);
    ScreensObj_SetTopLable(STR_SETTINGS);
    Main_ShowElement('settings_holder');
    Main_ShowElement('label_side_panel');
    Main_HideElement('label_refresh');
    Settings_cursorY = 0;
    Settings_inputFocus(Settings_cursorY);
    Settings_DivOptionChangeLang('content_lang', STR_CONTENT_LANG, Languages_Selected);
}

function Settings_exit() {
    document.body.removeEventListener("keydown", Settings_handleKeyDown);
    Main_HideElement('label_side_panel');
    Main_ShowElement('label_refresh');
    Settings_RemoveinputFocus();
    Main_HideElement('settings_holder');
}

// The order in Settings_SetSettings is the display order
function Settings_SetSettings() {
    var div = '',
        key;

    // General settings title
    div += Settings_DivTitle('general', STR_SETTINGS_GENERAL);

    // Content Language selection
    key = "content_lang";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_CONTENT_LANG_SUMARRY];

    div += Settings_DivOptionWithSummary(key, STR_CONTENT_LANG, '');

    //live_feed_sort
    key = "live_feed_sort";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_VIEWS, STR_A_Z, STR_Z_A];

    div += Settings_DivOptionWithSummary(key, STR_LIVE_FEED_SORT, STR_LIVE_FEED_SORT_SUMMARY);

    //thumb qualityes
    key = "thumb_quality";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH];

    div += Settings_DivOptionWithSummary(key, STR_THUMB_RESOLUTION, STR_THUMB_RESOLUTION_SUMARRY);

    key = "global_font_offset";
    Settings_value_keys.push(key);

    div += Settings_DivOptionWithSummary(key, STR_GLOBAL_FONT, STR_GLOBAL_FONT_SUMMARY);

    //Player restore playback
    key = "restor_playback";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionWithSummary(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMARRY);

    // Videos
    key = "videos_animation";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_VIDEOS_ANIMATION);

    key = "app_animations";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_APP_ANIMATIONS);

    key = "clip_auto_play_next";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_AUTO_PLAY_NEXT);

    key = "live_notification";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_NOW_LIVE_SHOW);

    key = "live_notification_time";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_NOW_DURATION);

    // Clock offset
    key = "clock_offset";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_CLOCK_OFFSET);

    // show_screen_counter
    key = "show_screen_counter";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];
    div += Settings_DivOptionNoSummary(key, STR_SCREEN_COUNTER);

    // Player settings title
    div += Settings_DivTitle('play', STR_SETTINGS_PLAYER);

    key = "keep_panel_info_visible";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_KEEP_INFO_VISIBLE);

    key = "single_click_exit";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionWithSummary(key, STR_SINGLE_EXIT, STR_SINGLE_EXIT_SUMMARY);

    // end_dialog_counter
    key = "end_dialog_counter";
    Settings_value_keys.push(key);
    Settings_value[key].values[0] = STR_END_DIALOG_DISABLE;

    div += Settings_DivOptionWithSummary(key, STR_END_DIALOG_SETTINGS, STR_END_DIALOG_SETTINGS_SUMMARY);

    //Player restore playback
    key = "default_quality";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_AUTO, STR_SOURCE];

    div += Settings_DivOptionWithSummary(key, STR_DEF_QUALITY, STR_DEF_QUALITY_SUMARRY);

    // Player buffer title/summary
    div += '<div id="setting_title_bandwidth" class="settings_title">' + STR_PLAYER_BITRATE + '</div>' +
        '<div id="setting_title_bandwidth_summary" class="settings_summary">' + STR_PLAYER_BITRATE_SUMARRY + '</div>';

    // Player buffer live
    key = "bitrate_main";
    Settings_value_keys.push(key);

    for (var i = 1; i < Settings_value[key].values.length; i++) {
        Settings_value[key].values[i] = Settings_value[key].values[i] + " Mbps";
    }
    Settings_value[key].values[0] = STR_PLAYER_BITRATE_UNLIMITED;

    div += Settings_DivOptionNoSummary(key, STR_PLAYER_BITRATE_MAIN);

    // Player buffer vod
    key = "bitrate_min";
    Settings_value_keys.push(key);
    Settings_value[key].values = Settings_value.bitrate_main.values;
    Settings_value[key].values[0] = STR_PLAYER_BITRATE_UNLIMITED;

    div += Settings_DivOptionWithSummary(key, STR_PLAYER_BITRATE_SMALL, STR_PLAYER_BITRATE_SMALL_SUMARRY);
    Settings_SetBitRate(0);

    // Player buffer title/summary
    div += '<div id="setting_title_buffers" class="settings_title">' + STR_SETTINGS_BUFFER_SIZE + '</div>' +
        '<div id="setting_title_buffers_summary" class="settings_summary">' + STR_SETTINGS_BUFFER_SIZE_SUMMARY + '</div>';

    // Player buffer live
    key = "buffer_live";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_SETTINGS_BUFFER_LIVE);

    // Player buffer vod
    key = "buffer_vod";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_SETTINGS_BUFFER_VOD);

    // Player buffer clip
    key = "buffer_clip";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_SETTINGS_BUFFER_CLIP);

    Main_innerHTML("settings_main", div);
    Settings_positions_length = Settings_value_keys.length;
    Languages_SetSettings();
}

function Settings_DivTitle(key, string) {
    return '<div id="setting_title_' + key + '" class="settings_section">' + string + '</div>';
}

function Settings_DivOptionNoSummary(key, string) {
    return '<div id="' + key + '_div" class="settings_div"><div id="' +
        key + '_name" class="settings_name">' + string + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedeline settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';
}

function Settings_DivOptionWithSummary(key, string_title, string_summary) {
    return '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' +
        string_title + '<div id="' + key + '_summary" class="settings_summary" style="font-size: 65%;">' + string_summary + '</div></div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedeline settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';
}

function Settings_DivOptionChangeLang(key, string_title, string_summary) {
    Main_innerHTML(key + '_name', string_title +
        '<div id="' + key + '_summary" class="settings_summary" style="font-size: 65%;">' + string_summary + '</div>');
}

// The order in Settings_SetStrings doesnot matter
function Settings_SetStrings() {
    var key = '';

    //General settings
    Main_textContent('setting_title_general', STR_SETTINGS_GENERAL);

    // Clock offset
    key = "clock_offset";
    Main_textContent(key + '_name', STR_CLOCK_OFFSET);

    key = "show_screen_counter";
    Main_textContent(key + '_name', STR_SCREEN_COUNTER);

    // Content Language selection
    key = "content_lang";
    Main_textContent(key + '_name', STR_CONTENT_LANG);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_value[key].values = [STR_CONTENT_LANG_SUMARRY];

    key = "live_feed_sort";
    Settings_DivOptionChangeLang(key, STR_LIVE_FEED_SORT, STR_LIVE_FEED_SORT_SUMMARY);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_value[key].values = [STR_VIEWS, STR_A_Z, STR_Z_A];

    //Player settings
    Main_textContent('setting_title_play', STR_SETTINGS_PLAYER);

    // Player buffer title/summary
    Main_textContent('setting_title_bandwidth', STR_PLAYER_BITRATE);
    Main_textContent('setting_title_bandwidth_summary', STR_PLAYER_BITRATE_SUMARRY);

    key = "bitrate_main";
    Main_textContent(key + '_name', STR_PLAYER_BITRATE_MAIN);
    Settings_value[key].values[0] = STR_DISABLE;
    key = "bitrate_min";
    Settings_DivOptionChangeLang(key, STR_PLAYER_BITRATE_SMALL, STR_PLAYER_BITRATE_SMALL_SUMARRY);
    Settings_value[key].values[0] = STR_DISABLE;

    // Player buffer title/summary
    Main_textContent('setting_title_buffers', STR_SETTINGS_BUFFER_SIZE);
    Main_textContent('setting_title_buffers_summary', STR_SETTINGS_BUFFER_SIZE_SUMMARY);

    key = "buffer_live";
    Main_textContent(key + '_name', STR_SETTINGS_BUFFER_LIVE);
    key = "buffer_vod";
    Main_textContent(key + '_name', STR_SETTINGS_BUFFER_VOD);
    key = "buffer_clip";
    Main_textContent(key + '_name', STR_SETTINGS_BUFFER_CLIP);

    //Player restore
    key = "restor_playback";
    Settings_DivOptionChangeLang(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMARRY);
    Settings_value[key].values = [STR_YES, STR_NO];

    //Thumb quality
    key = "thumb_quality";
    Settings_DivOptionChangeLang(key, STR_THUMB_RESOLUTION, STR_THUMB_RESOLUTION_SUMARRY);
    Settings_value[key].values = [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH];

    key = "global_font_offset";
    Settings_DivOptionChangeLang(key, STR_GLOBAL_FONT, STR_GLOBAL_FONT_SUMMARY);

    //Player restore
    key = "default_quality";
    Settings_DivOptionChangeLang(key, STR_DEF_QUALITY, STR_DEF_QUALITY_SUMARRY);
    Settings_value[key].values = [STR_AUTO, STR_SOURCE];

    // Chat size
    key = "end_dialog_counter";
    Settings_DivOptionChangeLang(key, STR_END_DIALOG_SETTINGS, STR_END_DIALOG_SETTINGS_SUMMARY);
    Settings_value[key].values[0] = STR_END_DIALOG_DISABLE;

    // Videos
    key = "videos_animation";
    Main_textContent(key + '_name', STR_VIDEOS_ANIMATION);
    Settings_value[key].values = [STR_YES, STR_NO];

    key = "clip_auto_play_next";
    Main_textContent(key + '_name', STR_AUTO_PLAY_NEXT);
    Settings_value[key].values = [STR_NO, STR_YES];

    key = "live_notification";
    Main_textContent(key + '_name', STR_NOW_LIVE_SHOW);
    Settings_value[key].values = [STR_NO, STR_YES];

    key = "live_notification_time";
    Main_textContent(key + '_name', STR_NOW_DURATION);

    key = "keep_panel_info_visible";
    Main_textContent(key + '_name', STR_KEEP_INFO_VISIBLE);
    Settings_value[key].values = [STR_NO, STR_YES];

    key = "single_click_exit";
    Settings_DivOptionChangeLang(key, STR_SINGLE_EXIT, STR_SINGLE_EXIT_SUMMARY);
    Settings_value[key].values = [STR_NO, STR_YES];

    key = "app_animations";
    Main_textContent(key + '_name', STR_APP_ANIMATIONS);
    Settings_value[key].values = [STR_NO, STR_YES];

    for (key in Settings_value)
        if (Settings_value.hasOwnProperty(key))
            Main_textContent(key, Settings_Obj_values(key));

    Languages_SetLang();
}

function Settings_SetDefautls() {
    for (var key in Settings_value) {
        Settings_value[key].defaultValue = Main_getItemInt(key, Settings_value[key].defaultValue);
        Settings_value[key].defaultValue -= 1;
        if (Settings_value[key].defaultValue > Settings_Obj_length(key)) Settings_value[key].defaultValue = 0;
    }
    Settings_SetBuffers(0);
    Settings_SetClock();
    Main_SetThumb();
    if (!Settings_Obj_default("app_animations")) Settings_SetAnimations();
    Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    PlayClip_All_Forced = Settings_Obj_default("clip_auto_play_next");
    UserLiveFeed_Notify = Settings_Obj_default("live_notification");
    UserLiveFeed_NotifyTimeout = Settings_Obj_values("live_notification_time") * 1000;
    Play_Status_Always_On = Settings_Obj_default("keep_panel_info_visible");
    Play_SingleClickExit = Settings_Obj_default("single_click_exit");
    Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
    Settings_ShowCounter(Settings_Obj_default("show_screen_counter"));
}

function Settings_Obj_values(key) {
    return Settings_value[key].values[Settings_Obj_default(key)];
}

//function Settings_Obj_set_values(key) {
//    return Settings_value[key].set_values[Settings_Obj_default(key)];
//}

function Settings_Obj_default(key) {
    return Settings_value[key].defaultValue;
}

function Settings_Obj_length(key) {
    return Settings_value[key].values.length - 1;
}

function Settings_inputFocus(position) {
    var key = Settings_value_keys[Settings_cursorY];
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_Setarrows(position);
    Settings_ScrollTable();
}

function Settings_RemoveinputFocus() {
    var key = Settings_value_keys[Settings_cursorY];
    document.getElementById(key + "arrow_left").style.opacity = "0";
    document.getElementById(key + "arrow_right").style.opacity = "0";
    Main_RemoveClass(key, 'settings_value_focus');
    Main_RemoveClass(key + '_div', 'settings_div_focus');
}

function Settings_ChangeSettigs(position) {
    var key = Settings_value_keys[position];
    Main_setItem(key, Settings_Obj_default(key) + 1);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_Setarrows(position);
    Settings_SetDefault(position);
}

function Settings_Setarrows(position) {
    var key = Settings_value_keys[position];

    if (!Settings_Obj_length(key)) return;

    var currentValue = Settings_Obj_default(key);
    var maxValue = Settings_Obj_length(key);

    if (currentValue > 0 && currentValue < maxValue) {
        document.getElementById(key + "arrow_left").style.opacity = "1";
        document.getElementById(key + "arrow_right").style.opacity = "1";
    } else if (currentValue === maxValue) {
        document.getElementById(key + "arrow_left").style.opacity = "1";
        document.getElementById(key + "arrow_right").style.opacity = "0.2";
    } else {
        document.getElementById(key + "arrow_left").style.opacity = "0.2";
        document.getElementById(key + "arrow_right").style.opacity = "1";
    }
}

function Settings_SetDefault(position) {
    position = Settings_value_keys[position];

    if (position === "videos_animation") Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    else if (position === "clip_auto_play_next") PlayClip_All_Forced = Settings_Obj_default("clip_auto_play_next");
    else if (position === "live_notification") UserLiveFeed_Notify = Settings_Obj_default("live_notification");
    else if (position === "live_notification_time") UserLiveFeed_NotifyTimeout = Settings_Obj_values("live_notification_time") * 1000;
    else if (position === "keep_panel_info_visible") Play_Status_Always_On = Settings_Obj_default("keep_panel_info_visible");
    else if (position === "single_click_exit") Play_SingleClickExit = Settings_Obj_default("single_click_exit");
    else if (position === "app_animations") Settings_SetAnimations();
    else if (position === "buffer_live") Settings_SetBuffers(1);
    else if (position === "buffer_vod") Settings_SetBuffers(2);
    else if (position === "buffer_clip") Settings_SetBuffers(3);
    else if (position === "end_dialog_counter") Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
    else if (position === "default_quality") Play_SetQuality();
    else if (position === "thumb_quality") Main_SetThumb();
    else if (position === "global_font_offset") calculateFontSize();
    else if (position === "show_screen_counter") Settings_ShowCounter(Settings_Obj_default("show_screen_counter"));
    else if (position === "clock_offset") {
        Settings_SetClock();
        Main_updateclock();
    } else if (position === "bitrate_main") Settings_SetBitRate(1);
    else if (position === "bitrate_min") Settings_SetBitRate(2);
}

function Settings_SetAnimations() {
    var classes = ['screen_holder',
            'screen_holder_channel',
            'screen_holder_switch',
            'screen_holder_user',
            'screen_holder_user',
            'screen_holder_games',
            'animate_height_transition_channel',
            'animate_height_transition_games',
            'animate_height_transition',
            'side_panel_holder_ani',
            'scenefeed_background',
            'user_feed_notify',
            'user_feed_scroll_ani',
            'side_panel_fix',
            'side_panel_movel',
            'side_panel'
        ],
        animate = Settings_Obj_default("app_animations"),
        mtransition = animate ? '' : 'none';

    classes.forEach(
        function(classe) {
            Array.from(document.getElementsByClassName(classe)).forEach(
                function(ele) {
                    ele.style.transition = mtransition;
                }
            );
        }
    );

    UserLiveFeed_FeedRemoveFocus();

    Array.from(document.getElementsByClassName(Main_classThumb)).forEach(
        function(ele) {
            ele.classList.remove(Main_classThumb);
        }
    );

    Main_classThumb = animate ? 'stream_thumbnail_focused' : 'stream_thumbnail_focused_no_ani';
    UserLiveFeed_FocusClass = animate ? 'feed_thumbnail_focused' : 'feed_thumbnail_focused_no_ani';
    Screens_SettingDoAnimations = animate;
}

function Settings_ShowCounter(show) {
    if (show) Main_ShowElement('dialog_counter_text');
    else Main_HideElement('dialog_counter_text');
}

function Settings_SetBitRate(whocall) {
    if (Main_IsNotBrowser) {
        if (!whocall) {
            Settings_SetBitRateMain();
            Settings_SetBitRateMin();
        } else if (whocall === 1) Settings_SetBitRateMain();
        else if (whocall === 2) Settings_SetBitRateMin();
    }
}

function Settings_SetBitRateMain() {
    var value;

    if (Settings_Obj_default("bitrate_main") > 0)
        value = parseInt(Settings_Obj_values("bitrate_main").split(" ")[0] * 1000000);
    else value = 0;

    try {
        Android.SetMainPlayerBandwidth(value);
    } catch (e) {}
}

function Settings_SetBitRateMin() {
    var value;

    if (Settings_Obj_default("bitrate_min") > 0)
        value = parseInt(Settings_Obj_values("bitrate_min").split(" ")[0] * 1000000);
    else value = 0;

    try {
        Android.SetSmallPlayerBandwidth(value);
    } catch (e) {}
}

function Settings_SetBuffers(whocall) {
    if (!whocall) {
        Play_Buffer = Settings_Obj_values("buffer_live") * 1000;
        PlayVod_Buffer = Settings_Obj_values("buffer_vod") * 1000;
        PlayClip_Buffer = Settings_Obj_values("buffer_clip") * 1000;
        if (Main_IsNotBrowser) {
            Android.SetBuffer(1, Play_Buffer);
            Android.SetBuffer(2, PlayVod_Buffer);
            Android.SetBuffer(3, PlayClip_Buffer);
        }
    } else if (whocall === 1) {
        Play_Buffer = Settings_Obj_values("buffer_live") * 1000;
        if (Main_IsNotBrowser) Android.SetBuffer(1, Play_Buffer);
    } else if (whocall === 2) {
        PlayVod_Buffer = Settings_Obj_values("buffer_vod") * 1000;
        if (Main_IsNotBrowser) Android.SetBuffer(2, PlayVod_Buffer);
    } else if (whocall === 3) {
        PlayClip_Buffer = Settings_Obj_values("buffer_clip") * 1000;
        if (Main_IsNotBrowser) Android.SetBuffer(3, PlayClip_Buffer);
    }
}

//function Settings_CheckLang(lang) {
//    if (lang.indexOf('en_') !== -1) Settings_value.general_lang.defaultValue = 0;
//    else if (lang.indexOf('it_') !== -1) Settings_value.general_lang.defaultValue = 1;
//    else if (lang.indexOf('pt_') !== -1) Settings_value.general_lang.defaultValue = 2;
//}

//function Settings_SetLang(lang) {
//    if (lang.indexOf('en_') !== -1) en_USLang();
//else if (lang.indexOf('it_') !== -1) it_ITLang();
//else if (lang.indexOf('pt_') !== -1) pt_BRLang();
//    DefaultLang();
//    Main_SetStringsMain(false);
//    Main_SetStringsSecondary();
//}

function Settings_SetClock() {
    var time = Settings_Obj_default("clock_offset");
    Main_ClockOffset = time < 48 ? (48 - time) * -900000 : (time - 48) * 900000;
}

var Settings_CurY = 0;

function Settings_ScrollTable() {
    var doc;
    if (Settings_CurY < Settings_cursorY && Settings_cursorY === 12) {
        doc = document.getElementById('settings_scroll');
        doc.scrollTop = doc.scrollHeight;
        if (Settings_Obj_default("app_animations")) {
            var position = doc.scrollTop;
            doc.scrollTop = 0;
            scrollTo(doc, position, 450);
        }
    } else if (Settings_CurY > Settings_cursorY && Settings_cursorY === 11) {
        doc = document.getElementById('settings_scroll');
        if (Settings_Obj_default("app_animations")) scrollTo(doc, 0, 450);
        else doc.scrollTop = 0;
    }

    Settings_CurY = Settings_cursorY;
}

function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 3;

    var animateScroll = function() {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

function Settings_handleKeyDown(event) {
    var key;
    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Settings_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            key = Settings_value_keys[Settings_cursorY];
            if (Settings_Obj_default(key) > 0) {
                Settings_value[key].defaultValue -= 1;
                Settings_ChangeSettigs(Settings_cursorY);
            }
            break;
        case KEY_RIGHT:
            key = Settings_value_keys[Settings_cursorY];
            if (Settings_Obj_default(key) < Settings_Obj_length(key)) {
                Settings_value[key].defaultValue += 1;
                Settings_ChangeSettigs(Settings_cursorY);
            }
            break;
        case KEY_UP:
            if (Settings_cursorY > 0) {
                Settings_RemoveinputFocus();
                Settings_cursorY--;
                Settings_inputFocus(Settings_cursorY);
            }
            break;
        case KEY_DOWN:
            if (Settings_cursorY < (Settings_positions_length - 1)) {
                Settings_RemoveinputFocus();
                Settings_cursorY++;
                Settings_inputFocus(Settings_cursorY);
            }
            break;
        case KEY_ENTER:
            if (!Settings_cursorY) Languages_init();
            break;
        default:
            break;
    }
}
