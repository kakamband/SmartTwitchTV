/*
 * Copyright (c) 2017-2020 Felipe de Leon <fglfgl27@gmail.com>
 *
 * This file is part of SmartTwitchTV <https://github.com/fgl27/SmartTwitchTV>
 *
 * SmartTwitchTV is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SmartTwitchTV is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SmartTwitchTV.  If not, see <https://github.com/fgl27/SmartTwitchTV/blob/master/LICENSE>.
 *
 */

//Spacing for reease maker not trow erros frm jshint
var UserLiveFeed_loadingData = [];
var UserLiveFeed_loadingDataTry = [];
var UserLiveFeed_loadChannelOffsset = 0;
var UserLiveFeed_followerChannels = [];
var UserLiveFeed_maxChannels = 825;
var UserLiveFeed_idObject = [];
var UserLiveFeed_status = [];
var UserLiveFeed_LastPos = [];
var UserLiveFeed_token = null;
var UserLiveFeed_Feedid;
var UserLiveFeed_FocusClass = 'feed_thumbnail_focused';
var UserLiveFeed_PreventHide = false;

var UserLiveFeed_PreloadImgs = [];
var UserLiveFeed_FeedHolderDocId;
var UserLiveFeed_AnimationTimeout = 200;//Same value as user_feed_scroll

var UserLiveFeed_FeedPosY = [];
var UserLiveFeed_itemsCount = [];
var UserLiveFeed_obj = {};
var UserLiveFeed_cell = [];
var UserLiveFeed_cellVisible = [];
var UserLiveFeed_FeedSetPosLast = [];
var UserLiveFeed_lastRefresh = [];
var UserLiveFeed_RefreshId = [];

var UserLiveFeed_ChangeFocusAnimationFast = false;
var UserLiveFeed_ChangeFocusAnimationFinished = [];

var UserLiveFeed_ids = [
    'ulf_thumbdiv',//0
    'ulf_img',//1
    'ulf_title',//2
    'ulf_data'//3
];

var UserLiveFeed_side_ids = [
    'usf_thumbdiv',//0
    'usf_img',//1
    'usf_title',//2
    'usf_data'//3
];

function UserLiveFeed_StartLoad() {
    UserLiveFeed_StartLoadPos(UserLiveFeed_FeedPosX);
}

function UserLiveFeed_StartLoadPos(pos) {
    UserLiveFeed_clearHideFeed();

    UserLiveFeed_CounterDialogRst();
    UserLiveFeed_Showloading(true);
    UserLiveFeedobj_loadDataPrepare(pos);
    UserLiveFeed_obj[pos].load();
}

function UserLiveFeed_Prepare() {

    var i = 0, len = UserLiveFeedobj_MAX + 1;

    for (i; i < len; i++) {
        UserLiveFeed_obj[i] = {};
        UserLiveFeed_idObject[i] = {};
        UserLiveFeed_itemsCount[i] = 0;
        UserLiveFeed_cell[i] = [];
        UserLiveFeed_cellVisible[i] = 7;
        UserLiveFeed_obj[i].AddCell = UserLiveFeed_FeedAddCellVideo;
        UserLiveFeed_obj[i].before = 3;
        UserLiveFeed_obj[i].IsGame = false;
        UserLiveFeed_obj[i].AddCellsize = 0;
        UserLiveFeed_obj[i].offset = 0;
        UserLiveFeed_obj[i].loadingMore = false;
        UserLiveFeed_obj[i].dataEnded = false;
        UserLiveFeed_obj[i].MaxOffset = 0;
        UserLiveFeed_FeedSetPosLast[i] = 0;
        UserLiveFeed_obj[i].offsettopFontsize = 0;
        UserLiveFeed_lastRefresh[i] = 0;
        UserLiveFeed_loadingData[i] = false;
        UserLiveFeed_loadingDataTry[i] = 0;
        UserLiveFeed_obj[i].checkPreview = true;
        UserLiveFeed_RefreshId[i] = null;
        UserLiveFeed_ChangeFocusAnimationFinished[i] = true;
    }

    //User vod
    UserLiveFeed_obj[UserLiveFeedobj_UserVodPos].load = UserLiveFeedobj_UserVod;
    UserLiveFeed_obj[UserLiveFeedobj_UserVodPos].show = UserLiveFeedobj_ShowUserVod;
    UserLiveFeed_obj[UserLiveFeedobj_UserVodPos].hide = UserLiveFeedobj_HideUserVod;
    UserLiveFeed_obj[UserLiveFeedobj_UserVodPos].div = Main_getElementById('user_vod_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_UserVodPos].HasMore = true;
    UserLiveFeed_obj[UserLiveFeedobj_UserVodPos].Screen = 'preview_user_vod';

    //User vod history
    UserLiveFeed_obj[UserLiveFeedobj_UserVodHistoryPos].load = UserLiveFeedobj_UserVodHistory;
    UserLiveFeed_obj[UserLiveFeedobj_UserVodHistoryPos].show = UserLiveFeedobj_ShowUserVodHistory;
    UserLiveFeed_obj[UserLiveFeedobj_UserVodHistoryPos].hide = UserLiveFeedobj_HideUserVodHistory;
    UserLiveFeed_obj[UserLiveFeedobj_UserVodHistoryPos].div = Main_getElementById('user_vod_history_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_UserVodHistoryPos].Screen = 'preview_user_vod_history';

    //User live
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].load = UserLiveFeedobj_CheckToken;
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].show = UserLiveFeedobj_ShowFeed;
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].hide = UserLiveFeedobj_HideFeed;
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].div = Main_getElementById('user_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_UserLivePos].Screen = 'preview_user_live';

    //User live history
    UserLiveFeed_obj[UserLiveFeedobj_UserHistoryPos].load = UserLiveFeedobj_History;
    UserLiveFeed_obj[UserLiveFeedobj_UserHistoryPos].show = UserLiveFeedobj_ShowHistory;
    UserLiveFeed_obj[UserLiveFeedobj_UserHistoryPos].hide = UserLiveFeedobj_HideHistory;
    UserLiveFeed_obj[UserLiveFeedobj_UserHistoryPos].checkHistory = true;
    UserLiveFeed_obj[UserLiveFeedobj_UserHistoryPos].div = Main_getElementById('user_live_history_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_UserHistoryPos].Screen = 'preview_user_live_history';

    //User Host
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].load = UserLiveFeedobj_UserHost;
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].show = UserLiveFeedobj_ShowUserHost;
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].hide = UserLiveFeedobj_HideUserHost;
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].div = Main_getElementById('user_host_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_UserHostPos].Screen = 'preview_user_host';

    //User a game
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].load = UserLiveFeedobj_CurrentUserAGame;
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].show = UserLiveFeedobj_ShowCurrentUserAGame;
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].hide = UserLiveFeedobj_HideCurrentUserAGame;
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].div = Main_getElementById('user_agames_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].StreamType = 'streams';
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].cell = UserLiveFeedobj_CurrentAGameCell;
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].HasMore = true;
    UserLiveFeed_obj[UserLiveFeedobj_UserAGamesPos].Screen = 'preview_user_agame';

    //a game
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].load = UserLiveFeedobj_CurrentAGame;
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].show = UserLiveFeedobj_ShowCurrentAGame;
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].hide = UserLiveFeedobj_HideCurrentAGame;
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].div = Main_getElementById('agame_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].StreamType = 'streams';
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].cell = UserLiveFeedobj_CurrentUserGameCell;
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].HasMore = true;
    UserLiveFeed_obj[UserLiveFeedobj_AGamesPos].Screen = 'preview_agame';

    //User Games
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].load = UserLiveFeedobj_UserGames;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].show = UserLiveFeedobj_ShowUserGames;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].hide = UserLiveFeedobj_HideUserGames;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].div = Main_getElementById('user_games_scroll');
    UserLiveFeed_cellVisible[UserLiveFeedobj_UserGamesPos] = 10;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].before = 5;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].AddCell = UserLiveFeed_FeedAddCellGame;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].IsGame = true;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].checkPreview = false;
    UserLiveFeed_obj[UserLiveFeedobj_UserGamesPos].Screen = 'preview_user_games';

    //Games
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].load = UserLiveFeedobj_Games;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].show = UserLiveFeedobj_ShowGames;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].hide = UserLiveFeedobj_HideGames;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].div = Main_getElementById('games_scroll');
    UserLiveFeed_cellVisible[UserLiveFeedobj_GamesPos] = 10;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].before = 5;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].AddCell = UserLiveFeed_FeedAddCellGame;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].IsGame = true;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].HasMore = true;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].checkPreview = false;
    UserLiveFeed_obj[UserLiveFeedobj_GamesPos].Screen = 'preview_games';

    //Live
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].load = UserLiveFeedobj_Live;
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].show = UserLiveFeedobj_ShowLive;
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].hide = UserLiveFeedobj_HideLive;
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].div = Main_getElementById('live_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].StreamType = 'streams';
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].cell = UserLiveFeedobj_LiveCell;
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].HasMore = true;
    UserLiveFeed_obj[UserLiveFeedobj_LivePos].Screen = 'preview_live';

    //Current Game
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].load = UserLiveFeedobj_CurrentGame;
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].show = UserLiveFeedobj_ShowCurrentGame;
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].hide = UserLiveFeedobj_HideCurrentGame;
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].div = Main_getElementById('current_game_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].StreamType = 'streams';
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].cell = UserLiveFeedobj_CurrentGameCell;
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].HasMore = true;
    UserLiveFeed_obj[UserLiveFeedobj_CurrentGamePos].Screen = 'preview_current_game';

    //Featured
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].load = UserLiveFeedobj_Featured;
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].show = UserLiveFeedobj_ShowFeatured;
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].hide = UserLiveFeedobj_HideFeatured;
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].div = Main_getElementById('featured_feed_scroll');
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].StreamType = 'featured';
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].cell = UserLiveFeedobj_FeaturedCell;
    UserLiveFeed_obj[UserLiveFeedobj_FeaturedPos].Screen = 'preview_featured';

    if (!AddUser_UserIsSet()) UserLiveFeed_FeedPosX = UserLiveFeedobj_LivePos;

    Main_innerHTML('feed_end_1', STR_FEATURED);
    Main_innerHTML('feed_end_3', STR_LIVE);
    Main_innerHTML('feed_end_4', STR_USER + STR_SPACE + STR_LIVE);
    Main_innerHTML('feed_end_5', STR_LIVE + STR_SPACE + STR_HISTORY);
    Main_innerHTML('feed_end_6', STR_USER + STR_SPACE + STR_LIVE_HOSTS);
    Main_innerHTML('feed_end_8', STR_USER + STR_SPACE + 'VOD');
    Main_innerHTML('feed_end_9', 'VOD ' + STR_HISTORY);
    Main_innerHTML('icon_feed_back', STR_SPACE);

    Sidepannel_ScroolDoc = Main_getElementById('side_panel_holder');
    Sidepannel_SidepannelDoc = Main_getElementById('side_panel');
    UserLiveFeed_FeedHolderDocId = Main_getElementById('user_feed');
    Sidepannel_UpdateThumbDoc = Main_getElementById("feed_thumb_img");
}

function UserLiveFeed_RefreshLive() {
    //Main_Log('UserLiveFeed_RefreshLive');
    if (AddUser_UserIsSet()) {
        UserLiveFeedobj_loadDataPrepare(UserLiveFeedobj_UserLivePos);
        UserLiveFeedobj_CheckToken();
    }
}

function UserLiveFeed_CounterDialogRst() {
    Main_empty('feed_counter');
}

function UserLiveFeed_CounterDialog(pos, total) {
    if (total > 0) Main_textContent('feed_counter', (pos + 1) + '/' + (total));
    else UserLiveFeed_CounterDialogRst();
}

function UserLiveFeed_loadDataSuccessFinish(pos) {
    UserLiveFeed_loadingData[pos] = false;
    Screens_Some_Screen_Is_Refreshing = false;
    UserLiveFeed_status[pos] = true;

    var len = UserLiveFeed_cell[pos].length;
    if (len) {
        //Start checking from left to right
        var min = Math.max(0, UserLiveFeed_FeedPosY[pos] - UserLiveFeed_obj[pos].before),
            max = Math.min(len, min + UserLiveFeed_cellVisible[pos]),
            i, j = 0;

        // if less then UserLiveFeed_cellVisible check right to left
        if ((max - min) < UserLiveFeed_cellVisible[pos]) {
            max = len;
            min = Math.max(0, max - UserLiveFeed_cellVisible[pos]);
        }

        for (i = min; i < max; i++) {
            if (UserLiveFeed_cell[pos][i]) {
                UserLiveFeed_obj[pos].div.appendChild(UserLiveFeed_cell[pos][i]);
                UserLiveFeed_cell[pos][i].style.position = '';
                UserLiveFeed_cell[pos][i].style.transition = 'none';
            }
        }

        if (!UserLiveFeed_obj[pos].AddCellsize) {
            var feedtypeNotshow = !Main_isElementShowingWithEle(UserLiveFeed_obj[pos].div);
            //feedShow = UserLiveFeed_isPreviewShowing();

            // if (!feedShow) {
            //     Main_AddClassWitEle(UserLiveFeed_FeedHolderDocId, 'opacity_zero');
            //     UserLiveFeed_Show();
            // }
            if (feedtypeNotshow) {
                Main_AddClassWitEle(UserLiveFeed_obj[pos].div, 'opacity_zero');
                Main_RemoveClassWithEle(UserLiveFeed_obj[pos].div, 'hide');
            }

            //Show screen offseted to calculated Screens_setOffset as display none doesn't allow calculation
            // if (!Main_isScene2DocVisible()) {
            //     Main_AddClassWitEle(Main_Scene2Doc, 'opacity_zero');
            //     Main_showScene2Doc();

            //     UserLiveFeed_obj[pos].AddCellsize =
            //         UserLiveFeed_cell[pos][UserLiveFeed_FeedPosY[pos]].offsetWidth / BodyfontSize;

            //     Main_hideScene2Doc();
            //     Main_RemoveClassWithEle(Main_Scene2Doc, 'opacity_zero');
            // } else {
            UserLiveFeed_obj[pos].AddCellsize =
                UserLiveFeed_cell[pos][UserLiveFeed_FeedPosY[pos]].offsetWidth / BodyfontSize;
            //}

            // if (!feedShow) {
            //     UserLiveFeed_HideAfter();
            //     Main_RemoveClassWithEle(UserLiveFeed_FeedHolderDocId, 'opacity_zero');
            // }
            if (feedtypeNotshow) {
                Main_AddClassWitEle(UserLiveFeed_obj[pos].div, 'hide');
                Main_RemoveClassWithEle(UserLiveFeed_obj[pos].div, 'opacity_zero');
            }
        }

        for (i = min; i < max; i++, j++) {
            if (UserLiveFeed_cell[pos][i]) {
                UserLiveFeed_cell[pos][i].style.transform = 'translateX(' + (j * UserLiveFeed_obj[pos].AddCellsize) + 'em)';
            }
        }
    }

    //Async tasks the show may come after the hide, so re check the hide here
    if (pos !== UserLiveFeed_FeedPosX) UserLiveFeed_obj[pos].div.classList.add('hide');
    else UserLiveFeedobj_SetLastRefresh(pos);

    UserLiveFeed_FeedAddFocus(true, pos, 1);
    UserLiveFeed_SetRefresh(pos);
    UserLiveFeed_Showloading(false);

    if (pos === UserLiveFeedobj_UserLivePos) {
        Main_HideElement('dialog_loading_side_feed');
        Sidepannel_AddFocusFeed(true);
        Sidepannel_SetLastRefresh();
    }

    //Main_Log('UserLiveFeed_loadDataSuccessFinish end');
}

function UserLiveFeed_SetRefresh(pos) {
    if (Settings_Obj_default("auto_refresh_screen") && Settings_Obj_default("auto_refresh_background") &&
        pos !== UserLiveFeedobj_UserVodHistoryPos && pos !== UserLiveFeedobj_UserHistoryPos) {

        UserLiveFeed_CheckRefresh(pos, (Settings_Obj_values("auto_refresh_screen") * 60000));

    } else Main_clearTimeout(UserLiveFeed_RefreshId[pos]);

}

function UserLiveFeed_CheckRefresh(pos, timeout) {

    UserLiveFeed_RefreshId[pos] = Main_setTimeout(
        function() {

            if (Main_isStoped ||
                !UserLiveFeed_loadingData[pos] && !UserLiveFeed_obj[pos].loadingMore &&
                ((!Main_isElementShowingWithEle(UserLiveFeed_obj[pos].div) || !UserLiveFeed_isPreviewShowing()) &&
                    (UserLiveFeedobj_UserLivePos !== pos || !Sidepannel_isShowing()))) {//the screen is not selected

                if (!Screens_Some_Screen_Is_Refreshing) {
                    UserLiveFeed_CounterDialogRst();
                    UserLiveFeedobj_loadDataPrepare(pos);
                    UserLiveFeed_obj[pos].load();
                } else UserLiveFeed_CheckRefresh(pos, 5000);

            } else UserLiveFeed_SetRefresh(pos);

        },
        timeout,
        UserLiveFeed_RefreshId[pos]
    );

}

function UserLiveFeed_CheckRefreshAfterResume() {

    if (Settings_Obj_default("auto_refresh_screen") && Settings_Obj_default("auto_refresh_background")) {

        var i = 0, run = 1, len = (AddUser_UserIsSet() ? UserLiveFeedobj_MAX : UserLiveFeedobj_MAX_No_user) + 1, date = new Date().getTime();

        for (i; i < len; i++) {

            if (UserLiveFeed_lastRefresh[i] &&
                i !== UserLiveFeedobj_UserLivePos && //User live already refresh on resume
                i !== UserLiveFeedobj_UserVodHistoryPos && i !== UserLiveFeedobj_UserHistoryPos && //History screen don' need refresh
                date > (UserLiveFeed_lastRefresh[i] + (Settings_Obj_values("auto_refresh_screen") * 60000))) {

                UserLiveFeed_CheckRefresh(i, run * 5000);
                run++;

            }

        }

    }

}

function UserLiveFeed_GetSize(pos) {
    return UserLiveFeed_itemsCount[pos];
}

function UserLiveFeed_isPreviewShowing() {
    return !Main_A_includes_B(UserLiveFeed_FeedHolderDocId.className, 'user_feed_hide');
}

function UserLiveFeed_Show() {
    Main_RemoveClassWithEle(UserLiveFeed_FeedHolderDocId, 'user_feed_hide');
}

function UserLiveFeed_Hide(PreventcleanQuailities) {
    //return;//return;
    UserLiveFeed_CheckIfIsLiveSTop(PreventcleanQuailities);
    UserLiveFeed_HideAfter();
}

function UserLiveFeed_HideAfter() {
    //return;//return;
    UserLiveFeed_Showloading(false);
    Main_AddClassWitEle(UserLiveFeed_FeedHolderDocId, 'user_feed_hide');
}

function UserLiveFeed_ShowFeed() {
    UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();
}

function UserLiveFeed_ResetFeedId() {
    UserLiveFeed_clearHideFeed();
    if (!UserLiveFeed_PreventHide && !Settings_Obj_default('show_feed_player')) UserLiveFeed_setHideFeed();
}

function UserLiveFeed_clearHideFeed() {
    Main_clearTimeout(UserLiveFeed_Feedid);
}

function UserLiveFeed_setHideFeed() {
    if (UserLiveFeed_isPreviewShowing()) UserLiveFeed_Feedid = Main_setTimeout(UserLiveFeed_Hide, 10000, UserLiveFeed_Feedid);
}

function UserLiveFeed_FeedRefresh() {
    if (!UserLiveFeed_loadingData[UserLiveFeed_FeedPosX] && !UserLiveFeed_obj[UserLiveFeed_FeedPosX].loadingMore) {

        Play_HideWarningMidleDialog();
        UserLiveFeed_clearHideFeed();
        UserLiveFeed_StartLoad();

    }
}

function UserLiveFeed_FeedSetPos(skipAnimation, pos, position) {
    if (UserLiveFeed_FeedSetPosLast[pos] === position) return;

    if (!skipAnimation &&
        UserLiveFeed_ChangeFocusAnimationFinished[pos] && Screens_SettingDoAnimations && !UserLiveFeed_ChangeFocusAnimationFast) {
        UserLiveFeed_ChangeFocusAnimationFinished[pos] = false;
        UserLiveFeed_ChangeFocusAnimationFast = pos === UserLiveFeed_FeedPosX;

        UserLiveFeed_obj[pos].div.style.transition = '';

        Main_setTimeout(
            function() {
                UserLiveFeed_ChangeFocusAnimationFinished[pos] = true;
            },
            UserLiveFeed_AnimationTimeout
        );
    } else {
        UserLiveFeed_obj[pos].div.style.transition = 'none';
    }

    UserLiveFeed_obj[pos].div.style.transform = 'translateX(' + position + "em)";
    UserLiveFeed_FeedSetPosLast[pos] = position;
}

function UserLiveFeed_ResetAddCellsize() {
    var i = 0, len = UserLiveFeedobj_MAX + 1;

    for (i; i < len; i++) {
        UserLiveFeed_obj[i].AddCellsize = 0;
    }
}

function UserLiveFeed_FeedAddFocus(skipAnimation, pos, Adder) {
    var total = UserLiveFeed_GetSize(pos);

    if (!total || !UserLiveFeed_ThumbNull(pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_ids[0])) {
        if (!total && UserLiveFeed_isPreviewShowing()) UserLiveFeed_CheckIfIsLiveSTop();
        UserLiveFeed_ResetFeedId();
        return;
    }

    var add_focus = !Play_isEndDialogVisible() || !Play_EndFocus;
    if (add_focus) {
        Main_AddClass(UserLiveFeed_ids[0] + pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_FocusClass);
    }

    if (!UserLiveFeed_obj[pos].AddCellsize) {
        UserLiveFeed_obj[pos].AddCellsize =
            (Main_getElementById(UserLiveFeed_ids[3] + pos + '_' + UserLiveFeed_FeedPosY[pos]).offsetWidth) / BodyfontSize;
    }

    if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].IsGame) {

        if (UserLiveFeed_FeedPosY[pos] < 5 || total < 9) {
            UserLiveFeed_FeedSetPos((Adder < 0) ? (skipAnimation || UserLiveFeed_FeedPosY[pos] !== 4) : true, pos, 0);
        } else if (UserLiveFeed_FeedPosY[pos] < (total - 4) || total < UserLiveFeed_cellVisible[pos]) {
            UserLiveFeed_FeedSetPos((Adder > 0) ? (skipAnimation || UserLiveFeed_FeedPosY[pos] !== 5) : (true && (total - UserLiveFeed_FeedPosY[pos]) !== 5), pos, -1 * UserLiveFeed_obj[pos].AddCellsize);
        } else {
            UserLiveFeed_FeedSetPos(skipAnimation, pos, -2 * UserLiveFeed_obj[pos].AddCellsize);
        }

    } else {

        if (UserLiveFeed_FeedPosY[pos] < 3 || total < 6) {
            UserLiveFeed_FeedSetPos((Adder < 0) ? (skipAnimation || UserLiveFeed_FeedPosY[pos] !== 2) : true, pos, 0);
        } else if (UserLiveFeed_FeedPosY[pos] < (total - 3) || total < UserLiveFeed_cellVisible[pos]) {
            UserLiveFeed_FeedSetPos((Adder > 0) ? (skipAnimation || UserLiveFeed_FeedPosY[pos] !== 3) : (true && (total - UserLiveFeed_FeedPosY[pos]) !== 4), pos, -1 * UserLiveFeed_obj[pos].AddCellsize);
        } else {
            UserLiveFeed_FeedSetPos(skipAnimation, pos, -2 * UserLiveFeed_obj[pos].AddCellsize);
        }

    }

    if (UserLiveFeed_obj[pos].HasMore) {
        //Load more as the data is getting used
        if (!UserLiveFeed_obj[pos].loadingMore && !UserLiveFeed_obj[pos].dataEnded && ((total - UserLiveFeed_FeedPosY[pos]) < 80)) {
            UserLiveFeed_obj[pos].loadingMore = true;
            UserLiveFeed_obj[pos].load();
        }
    }

    UserLiveFeed_CheckIfIsLiveStart(pos);

    if (pos === UserLiveFeed_FeedPosX) UserLiveFeed_CounterDialog(UserLiveFeed_FeedPosY[pos], UserLiveFeed_itemsCount[pos]);
    UserLiveFeed_ResetFeedId();
}

function UserLiveFeed_CheckVod() {
    if (UserLiveFeed_obj[UserLiveFeed_FeedPosX].checkHistory) {

        var doc = Main_getElementById(UserLiveFeed_ids[3] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]);

        if (doc) {
            var data = JSON.parse(doc.getAttribute(Main_DataAttribute));
            var index = Main_history_Exist('live', data[7]);

            if (index > -1) {

                if (Main_A_includes_B(Main_getElementById(UserLiveFeed_ids[1] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).src, 's3_vods')) {
                    return false;
                }

            }
        }
    }
    return true;
}

function UserLiveFeed_CheckIfIsLiveGetPos(position) {
    if (position > 2) {
        var size = UserLiveFeed_GetSize(UserLiveFeed_FeedPosX) - 1;
        if (size > 4) {
            position = position < (size - 2) ? 2 : (4 - (size - position));
        } else if (size > 3) {
            position = position < (size - 1) ? 2 : (4 - (size - position));
        } else if (size > 2) {
            position = position < size ? 2 : 3;
        }
    }
    return position;
}

function UserLiveFeed_CheckIfIsLiveSTop(PreventcleanQuailities) {
    Main_clearTimeout(UserLiveFeed_LoadPreviewId);

    if (Main_IsOn_OSInterface) {

        OSInterface_ClearFeedPlayer();
        if (Play_PreviewId && !PreventcleanQuailities) Play_CheckIfIsLiveCleanEnd();

    }
    Play_HideWarningMidleDialog();
}

var UserLiveFeed_LoadPreviewId;
function UserLiveFeed_CheckIfIsLiveStart(pos) {

    if (!Main_isStoped && pos === UserLiveFeed_FeedPosX && (!Play_isEndDialogVisible() || !Play_EndFocus) &&
        Settings_Obj_default('show_feed_player') &&
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].checkPreview &&
        (!Play_MultiEnable || !Settings_Obj_default("disable_feed_player_multi")) &&
        UserLiveFeed_isPreviewShowing() && UserLiveFeed_CheckVod()) {

        var obj = Play_CheckLiveThumb(false, true);

        if (obj) {
            var id;

            if (UserLiveFeed_FeedPosX >= UserLiveFeedobj_UserVodPos) id = obj[7];
            else id = obj[14];

            if (!Play_PreviewId || !Main_A_equals_B(id, Play_PreviewId)) {

                UserLiveFeed_LoadPreviewId = Main_setTimeout(
                    function() {

                        UserLiveFeed_CheckIfIsLive(obj);

                    },
                    DefaultPreviewDelay + Settings_Obj_values('show_feed_player_delay'),
                    UserLiveFeed_LoadPreviewId
                );

            } else if (Play_PreviewId) {//Refreshing the screen

                OSInterface_SetFeedPosition(UserLiveFeed_CheckIfIsLiveGetPos(UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]));

            }
        }

    }

}

function UserLiveFeed_CheckIfIsLive(obj) {

    Play_CheckIfIsLiveCleanEnd();

    if (!Main_IsOn_OSInterface) return;

    var id, token, link;

    if (UserLiveFeed_FeedPosX >= UserLiveFeedobj_UserVodPos) {//vod

        id = obj[7];
        token = Play_vod_token;
        link = Play_vod_links;

    } else {//live

        id = obj[6];
        token = Play_live_token;
        link = Play_live_links;
    }

    OSInterface_CheckIfIsLiveFeed(
        token.replace('%x', id),
        link.replace('%x', id),
        "UserLiveFeed_CheckIfIsLiveResult",
        UserLiveFeed_FeedPosX,
        (UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] % 100),
        NewDefaultHttpGetTimeout
    );
}

var UserLiveFeed_CheckIfIsLiveResultThumb;
var UserLiveFeed_PreviewOffset = 0;
function UserLiveFeed_CheckIfIsLiveResult(StreamData, x, y) {//Called by Java

    if (!Main_isStoped && UserLiveFeed_isPreviewShowing() &&
        (!Play_isEndDialogVisible() || !Play_EndFocus) &&
        UserLiveFeed_FeedPosX === x && (UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] % 100) === y) {

        var doc = Main_getElementById(UserLiveFeed_ids[3] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]);

        if (StreamData && doc) {

            var StreamDataObj = JSON.parse(StreamData),
                StreamInfo = JSON.parse(doc.getAttribute(Main_DataAttribute)),
                isVod = UserLiveFeed_FeedPosX >= UserLiveFeedobj_UserVodPos,
                error;

            Play_PreviewId = StreamInfo[14];

            if (Play_MultiEnable) {

                for (var i = 0; i < Play_MultiArray_length; i++) {

                    if (Play_MultiArray[i].data.length > 0 && Main_A_equals_B(Play_MultiArray[i].data[14], Play_PreviewId)) return;

                }

            }

            if (StreamDataObj.status === 200) {

                Play_PreviewURL = StreamDataObj.url;
                Play_PreviewResponseText = StreamDataObj.responseText;
                UserLiveFeed_PreviewOffset = 0;

                if (!UserLiveFeed_CheckIfIsLiveResultThumb) {

                    //Make sure transition has ended to calculate rect
                    UserLiveFeed_FeedHolderDocId.style.transition = 'none';

                    var Rect = Main_getElementById(UserLiveFeed_ids[1] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]).parentElement.getBoundingClientRect();
                    OSInterface_SetPlayerViewFeedBottom(
                        Rect.bottom,
                        window.innerHeight
                    );
                    UserLiveFeed_CheckIfIsLiveResultThumb = true;

                    if (Settings_Obj_default("app_animations")) {
                        Main_ready(function() {
                            UserLiveFeed_FeedHolderDocId.style.transition = '';
                        });
                    }

                }

                if (isVod) {//vod

                    Play_PreviewId = StreamInfo[7];
                    var UserIsSet = AddUser_UserIsSet();

                    if (Settings_Obj_default('vod_dialog') < 2) {

                        //Check if the vod exist in the history
                        var VodIdex = UserIsSet ? Main_history_Exist('vod', Play_PreviewId) : -1;
                        UserLiveFeed_PreviewOffset = (VodIdex > -1) ?
                            Main_values_History_data[AddUser_UsernameArray[0].id].vod[VodIdex].watched : 0;

                        //Check if the vod saved position is bigger then 0 means thisvod was already watched
                        if (!UserLiveFeed_PreviewOffset) {

                            VodIdex = UserIsSet ? Main_history_Find_Vod_In_Live(Play_PreviewId) : -1;

                            if (VodIdex > -1) {

                                UserLiveFeed_PreviewOffset =
                                    ((Main_values_History_data[AddUser_UsernameArray[0].id].live[VodIdex].date - (new Date(StreamInfo[12]).getTime())) / 1000);
                            }

                        }
                    }

                } else Play_PreviewId = StreamInfo[14];

                OSInterface_StartFeedPlayer(
                    Play_PreviewURL,
                    Play_PreviewResponseText,
                    UserLiveFeed_CheckIfIsLiveGetPos(UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]),
                    UserLiveFeed_PreviewOffset * 1000,
                    isVod
                );

                if (UserLiveFeed_PreviewOffset) {
                    Play_showWarningMidleDialog(
                        STR_SHOW_VOD_PLAYER_WARNING + STR_SPACE + Play_timeMs(UserLiveFeed_PreviewOffset * 1000),
                        2000
                    );
                }

                Main_EventPreview(
                    'Preview_player',
                    StreamInfo[6],
                    StreamInfo[3],
                    isVod ? StreamInfo[9] : (StreamInfo[16] ? 'HOSTING' : StreamInfo[15]),
                    UserLiveFeed_obj[UserLiveFeed_FeedPosX].Screen
                );

                return;

            } else {

                error = StreamInfo[6] + STR_SPACE + Play_CheckIfIsLiveGetEror(StreamDataObj, isVod);

            }

            Play_showWarningMidleDialog(error, 0);
        }

    }

}

function UserLiveFeed_FeedAddCellAnimated(pos, x, x_plus, x_plus_offset, for_in, for_out, for_offset, eleRemovePos, right) {
    UserLiveFeed_ChangeFocusAnimationFinished[pos] = false;
    UserLiveFeed_ChangeFocusAnimationFast = true;

    if (right) UserLiveFeed_obj[pos].div.appendChild(UserLiveFeed_cell[pos][x + x_plus]);
    else UserLiveFeed_obj[pos].div.insertBefore(UserLiveFeed_cell[pos][x + x_plus], UserLiveFeed_obj[pos].div.childNodes[0]);

    UserLiveFeed_cell[pos][x + x_plus].style.transform = 'translateX(' + (x_plus_offset * UserLiveFeed_obj[pos].AddCellsize) + 'em)';

    Main_ready(function() {
        for (var i = for_in; i < for_out; i++) {
            if (UserLiveFeed_cell[pos][x + i]) {
                if (UserLiveFeed_cell[pos][x + i]) UserLiveFeed_cell[pos][x + i].style.transition = '';
                UserLiveFeed_cell[pos][x + i].style.transform = 'translateX(' + (UserLiveFeed_obj[pos].AddCellsize * (for_offset + i)) + 'em)';
            }
        }

        Main_setTimeout(
            function() {
                UserLiveFeed_RemoveElement(UserLiveFeed_cell[pos][x + eleRemovePos]);
                UserLiveFeed_ChangeFocusAnimationFinished[pos] = true;
            },
            Screens_ScrollAnimationTimeout
        );
    });
}

function UserLiveFeed_FeedAddCellNotAnimated(pos, x, x_plus, for_in, for_out, for_offset, eleRemovePos, right) {

    if (right) UserLiveFeed_obj[pos].div.appendChild(UserLiveFeed_cell[pos][x + x_plus]);
    else UserLiveFeed_obj[pos].div.insertBefore(UserLiveFeed_cell[pos][x + x_plus], UserLiveFeed_obj[pos].div.childNodes[0]);

    for (var i = for_in; i < for_out; i++) {
        if (UserLiveFeed_cell[pos][x + i]) {
            UserLiveFeed_cell[pos][x + i].style.transition = 'none';
            UserLiveFeed_cell[pos][x + i].style.transform = 'translateX(' + (UserLiveFeed_obj[pos].AddCellsize * (for_offset + i)) + 'em)';
        }
    }

    UserLiveFeed_RemoveElement(UserLiveFeed_cell[pos][x + eleRemovePos]);
}

function UserLiveFeed_RemoveElement(ele) {
    if (ele) ele.remove();
}

function UserLiveFeed_FeedAddCellVideo(Adder, pos, x) {
    if (Adder > 0) { // right
        if (x > 3 && UserLiveFeed_cell[pos][x + 3]) {

            if (UserLiveFeed_ChangeFocusAnimationFinished[pos] && pos === UserLiveFeed_FeedPosX &&
                Screens_SettingDoAnimations && !UserLiveFeed_ChangeFocusAnimationFast) { //If with animation

                UserLiveFeed_FeedAddCellAnimated(
                    pos,
                    x,
                    3,  //x_plus
                    6,  //x_plus_offset
                    -3, //for_in
                    3,  //for_out
                    3,  //for_offset
                    -4, //eleRemovePos
                    1   //right?
                );

            } else {

                UserLiveFeed_FeedAddCellNotAnimated(
                    pos,
                    x,
                    3,  //x_plus
                    -3, //for_in
                    4,  //for_out
                    3,  //for_offset
                    -4, //eleRemovePos
                    1   //right?
                );

            }
        }

    } else { // Left
        if (x > 2 && UserLiveFeed_cell[pos].length > (x + 3)) {

            if (UserLiveFeed_ChangeFocusAnimationFinished[pos] && pos === UserLiveFeed_FeedPosX &&
                Screens_SettingDoAnimations && !UserLiveFeed_ChangeFocusAnimationFast) { //If with animation

                UserLiveFeed_FeedAddCellAnimated(
                    pos,
                    x,
                    -3, //x_plus
                    0, //x_plus_offset
                    -3, //for_in
                    4,  //for_out
                    3,  //for_offset
                    4,  //eleRemovePos
                    0   //right?
                );

            } else {

                UserLiveFeed_FeedAddCellNotAnimated(
                    pos,
                    x,
                    -3, //x_plus
                    -3, //for_in
                    5,  //for_out
                    3,  //for_offset
                    4,  //eleRemovePos
                    0   //right?
                );

            }
        }
    }

}

function UserLiveFeed_FeedAddCellGame(Adder, pos, x) {
    if (Adder > 0) { // right
        if (x > 5 && UserLiveFeed_cell[pos][x + 4]) {

            if (UserLiveFeed_ChangeFocusAnimationFinished[pos] && pos === UserLiveFeed_FeedPosX &&
                Screens_SettingDoAnimations && !UserLiveFeed_ChangeFocusAnimationFast) { //If with animation

                UserLiveFeed_FeedAddCellAnimated(
                    pos,
                    x,
                    4,  //x_plus
                    9,  //x_plus_offset
                    -5, //for_in
                    4,  //for_out
                    5,  //for_offset
                    -6, //eleRemovePos
                    1   //right?
                );

            } else {

                UserLiveFeed_FeedAddCellNotAnimated(
                    pos,
                    x,
                    4,  //x_plus
                    -5, //for_in
                    5,  //for_out
                    5,  //for_offset
                    -6,  //eleRemovePos
                    1   //right?
                );

            }
        }
    } else { // Left
        if (x > 4 && UserLiveFeed_cell[pos].length > (x + 4)) {

            if (UserLiveFeed_ChangeFocusAnimationFinished[pos] && pos === UserLiveFeed_FeedPosX &&
                Screens_SettingDoAnimations && !UserLiveFeed_ChangeFocusAnimationFast) { //If with animation

                UserLiveFeed_FeedAddCellAnimated(
                    pos,
                    x,
                    -5, //x_plus
                    0, //x_plus_offset
                    -5, //for_in
                    5,  //for_out
                    5,  //for_offset
                    5,  //eleRemovePos
                    0   //right?
                );

            } else {

                UserLiveFeed_FeedAddCellNotAnimated(
                    pos,
                    x,
                    -5,  //x_plus
                    -5, //for_in
                    6,  //for_out
                    5,  //for_offset
                    5,  //eleRemovePos
                    0   //right?
                );

            }
        }
    }

}

function UserLiveFeed_FeedRemoveFocus(pos) {
    UserLiveFeed_CheckIfIsLiveSTop();

    if (UserLiveFeed_ThumbNull(pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_ids[0]))
        Main_RemoveClass(UserLiveFeed_ids[0] + pos + '_' + UserLiveFeed_FeedPosY[pos], UserLiveFeed_FocusClass);
}

function UserLiveFeed_ThumbNull(y, thumbnail) {
    return Main_getElementById(thumbnail + y) !== null;
}

function UserLiveFeed_SetFeedPicText() {
    Main_innerHTML(
        'icon_feed_refresh',
        '<div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-refresh" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_REFRESH + ':' + STR_HOLD_UP + STR_SPACE + STR_SPACE + '</div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-pp" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block;">' + STR_SPACE + STR_PICTURE_LIVE_FEED + '</div>'
    );
}

function UserLiveFeed_Unset() {
    Main_IconLoad('icon_feed_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_HOLD_UP);
}

function UserLiveFeed_SetMulti() {
    Main_IconLoad('icon_feed_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_HOLD_UP + STR_MULTI_TITLE);
}

function UserLiveFeed_SetHoldUp() {
    Main_IconLoad('icon_feed_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_HOLD_UP + STR_FEED_END_DIALOG);
}

function UserLiveFeed_KeyRightLeft(Adder) {
    UserLiveFeed_ResetFeedId();

    if (UserLiveFeed_ChangeFocusAnimationFinished[UserLiveFeed_FeedPosX] && !UserLiveFeed_loadingData[UserLiveFeed_FeedPosX]) {
        var NextPos = UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] + Adder;
        if (NextPos > (UserLiveFeed_GetSize(UserLiveFeed_FeedPosX) - 1) || NextPos < 0) return;

        UserLiveFeed_FeedRemoveFocus(UserLiveFeed_FeedPosX);
        UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX] = NextPos;
        UserLiveFeed_FeedAddFocus(false, UserLiveFeed_FeedPosX, Adder);

        UserLiveFeed_obj[UserLiveFeed_FeedPosX].AddCell(Adder, UserLiveFeed_FeedPosX, NextPos);
    }
}

function UserLiveFeed_KeyUpDown(Adder) {
    UserLiveFeed_ResetFeedId();

    if (UserLiveFeed_ChangeFocusAnimationFinished[UserLiveFeed_FeedPosX]) {

        var NextPos = UserLiveFeed_FeedPosX + Adder,
            userSet = AddUser_UserIsSet();

        if (NextPos > (userSet ? UserLiveFeedobj_MAX : UserLiveFeedobj_MAX_No_user)) {
            NextPos = UserLiveFeedobj_CurrentAGameEnable ? 0 : 1;
            if (!userSet) Play_showWarningMidleDialog(STR_NOKUSER_WARN, 1000);
        } else if (NextPos < (UserLiveFeedobj_CurrentAGameEnable ? 0 : 1)) {
            NextPos = userSet ? UserLiveFeedobj_MAX : UserLiveFeedobj_MAX_No_user;
            if (!userSet) Play_showWarningMidleDialog(STR_NOKUSER_WARN, 1000);
        }

        //If current game is empty, skip current game screen
        if (NextPos === UserLiveFeedobj_CurrentGamePos && !Play_data.data[3] && Play_data.data[3] === '') {
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
            UserLiveFeed_FeedPosX = NextPos;
            UserLiveFeed_KeyUpDown(Adder);
            return;
        }

        //If in user games skip one as next is user a game
        if (UserLiveFeed_FeedPosX === UserLiveFeedobj_UserGamesPos && Adder === 1) {
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
            UserLiveFeed_FeedPosX = NextPos;
            UserLiveFeed_KeyUpDown(Adder);
            return;
        }

        //If in user vod and user a game is not enable skip one as next is user a game
        if (UserLiveFeed_FeedPosX === UserLiveFeedobj_UserVodPos && !UserLiveFeedobj_CurrentUserAGameEnable && Adder === -1) {
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
            UserLiveFeed_FeedPosX = NextPos;
            UserLiveFeed_KeyUpDown(Adder);
            return;
        }

        //If in user a game and user a game is enable skip one as next is user games
        if (UserLiveFeed_FeedPosX === UserLiveFeedobj_UserAGamesPos && UserLiveFeedobj_CurrentUserAGameEnable && Adder === -1) {
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
            UserLiveFeed_FeedPosX = NextPos;
            UserLiveFeed_KeyUpDown(Adder);
            return;
        }

        //If in a game skip one as next is featured
        if (UserLiveFeed_FeedPosX === UserLiveFeedobj_AGamesPos && Adder === 1) {
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
            UserLiveFeed_FeedPosX = NextPos;
            UserLiveFeed_KeyUpDown(Adder);
            return;
        }

        UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
        UserLiveFeed_FeedPosX = NextPos;

        if (UserLiveFeed_FeedPosX === UserLiveFeedobj_UserGamesPos && UserLiveFeedobj_CurrentUserAGameEnable) {
            UserLiveFeed_FeedPosX = UserLiveFeedobj_UserAGamesPos;
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();
            return;
        } else if (UserLiveFeed_FeedPosX === UserLiveFeedobj_GamesPos && UserLiveFeedobj_CurrentAGameEnable) {
            UserLiveFeed_FeedPosX = UserLiveFeedobj_AGamesPos;
            UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();
            return;
        }

        Main_AddClass('icon_feed_back', 'opacity_zero');
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();
    }
}

function UserLiveFeed_KeyEnter(pos) {
    var doc;
    if (pos === UserLiveFeedobj_UserGamesPos) {
        doc = Main_getElementById(UserLiveFeed_ids[3] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]);
        if (doc !== null) UserLiveFeedobj_CurrentUserAGameNameEnter = JSON.parse(doc.getAttribute(Main_DataAttribute))[0];

        if (doc === null || Main_A_equals_B(UserLiveFeedobj_CurrentUserAGameNameEnter, '')) {
            Play_showWarningMidleDialog(STR_NO_GAME, 1000);
            return;
        }
        UserLiveFeedobj_CurrentUserAGameEnable = true;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
        UserLiveFeed_FeedPosX = UserLiveFeedobj_UserAGamesPos;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();

    } else if (pos === UserLiveFeedobj_UserAGamesPos) {

        Main_AddClass('icon_feed_back', 'opacity_zero');
        UserLiveFeedobj_CurrentUserAGameEnable = false;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
        UserLiveFeed_FeedPosX = UserLiveFeedobj_UserGamesPos;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();

    } else if (pos === UserLiveFeedobj_GamesPos) {
        doc = Main_getElementById(UserLiveFeed_ids[3] + UserLiveFeed_FeedPosX + '_' + UserLiveFeed_FeedPosY[UserLiveFeed_FeedPosX]);
        if (doc !== null) UserLiveFeedobj_CurrentAGameNameEnter = JSON.parse(doc.getAttribute(Main_DataAttribute))[0];

        if (doc === null || Main_A_equals_B(UserLiveFeedobj_CurrentAGameNameEnter, '')) {
            Play_showWarningMidleDialog(STR_NO_GAME, 1000);
            return;
        }

        UserLiveFeedobj_CurrentAGameEnable = true;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
        UserLiveFeed_FeedPosX = UserLiveFeedobj_AGamesPos;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();

    } else if (pos === UserLiveFeedobj_AGamesPos) {

        Main_AddClass('icon_feed_back', 'opacity_zero');
        UserLiveFeedobj_CurrentAGameEnable = false;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].hide();
        UserLiveFeed_FeedPosX = UserLiveFeedobj_GamesPos;
        UserLiveFeed_obj[UserLiveFeed_FeedPosX].show();

    }
    UserLiveFeed_ResetFeedId();
}

function UserLiveFeed_Showloading(show) {
    if (Main_IsOn_OSInterface) {
        OSInterface_mshowLoadingBottom(show);
    } else {
        if (show) Main_ShowElement('dialog_loading_feed');
        else Main_HideElement('dialog_loading_feed');
    }
}
