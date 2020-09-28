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

//This file holds all 'Android.' function of the app
//Android is the JavascriptInterface or the OSInterface
//In order to port this web app to some other OS one must port some of this OSInterface function
//If a function is Android specific, the feature that it provides may only be needed on a Android device
//Check what the function does and if the new OS provides the function make a new one or find a way to adapt

//public void StopNotificationService()
//Android specific: true
//Allows to stop the notification service from js side
function OSInterface_StopNotificationService() {
    if (Main_IsOn_OSInterface) Android.StopNotificationService();
}

//public void SetNotificationPosition(int position)
//position the position on the screen
//Android specific: true
//Allows to Set Notification Position
function OSInterface_SetNotificationPosition(position) {
    if (Main_IsOn_OSInterface) Android.SetNotificationPosition(position);
}

//public void SetNotificationRepeat(int times)
//times number of time ot repeat
//Android specific: true
//Allows to Set Notification Position
function OSInterface_SetNotificationRepeat(times) {
    if (Main_IsOn_OSInterface) Android.SetNotificationRepeat(times);
}

//public void SetNotificationSinceTime(long time)
//time im ms how long a stream is live
//Android specific: true
//Allows to Set Notification Since time check
function OSInterface_SetNotificationSinceTime(time) {
    if (Main_IsOn_OSInterface) Android.SetNotificationSinceTime(time);
}

//public void RunNotificationService()
//Android specific: true
//Allows to run the notification service once
function OSInterface_RunNotificationService() {
    if (Main_IsOn_OSInterface) Android.RunNotificationService();
}

//public void upNotificationState(boolean Notify)
//Notify  background notification are enable
//Android specific: true
//Allows to stop the notification service from js side
function OSInterface_upNotificationState(Notify) {
    if (Main_IsOn_OSInterface) Android.upNotificationState(Boolean(Notify));
}

//public void SetNotificationLive(boolean Notify)
//Notify  background notification are enable
//Android specific: true
//Set if live notifications are enable
function OSInterface_SetNotificationLive(Notify) {
    if (Main_IsOn_OSInterface) Android.SetNotificationLive(Boolean(Notify));
}

//public void SetNotificationLive(boolean Notify)
//Notify  background notification are enable
//Android specific: true
//Set if live title change notifications are enable
function OSInterface_SetNotificationTitle(Notify) {
    if (Main_IsOn_OSInterface) Android.SetNotificationTitle(Boolean(Notify));
}

//public void SetNotificationLive(boolean Notify)
//Notify  background notification are enable
//Android specific: true
//Set if live game change notifications are enable
function OSInterface_SetNotificationGame(Notify) {
    if (Main_IsOn_OSInterface) Android.SetNotificationGame(Boolean(Notify));
}

//public void SetNotificationLive(boolean Notify)
//Notify  background notification are enable
//Android specific: true
//Set if live games notifications are enable
function OSInterface_SetNotificationGameLive(Notify) {
    if (Main_IsOn_OSInterface) Android.SetNotificationGameLive(Boolean(Notify));
}

//public void Settings_SetPingWarning(boolean warning)
//warning enable or not the warning if ping fail for too long
//Android specific: true
//Allows to enable disable ping ail warning
function OSInterface_Settings_SetPingWarning(warning) {
    if (Main_IsOn_OSInterface) Android.Settings_SetPingWarning(Boolean(warning));
}

//public void SetQuality(int position)
//position = the track position of the track group, the array of current available qualities of the player, -1 equals auto
//Android specific: false
//Allows to change the main player quality
function OSInterface_SetQuality(position) {
    if (Main_IsOn_OSInterface) Android.SetQuality(position);
}

//public void getStreamDataAsync(String token_url, String hls_url, String callback, long checkResult, int position, int ReTryMax, int Timeout)
//token_url = the base token url
//hls_url = the base hls playlist url
//callback = the call back function
//checkResult = a uniq ID number to prevent the callback answer to the wrong request, as this is a Async fun
//position = the position of the arrays that this function uses, arrays of string result and threads
//ReTryMax = the retry quanity in case the http request fails
//Timeout = http request timeout
//Android specific: false
//Allows to get the stream data, that if called from JS will fail do to CORS error
function OSInterface_getStreamDataAsync(token_url, hls_url, callback, checkResult, position, Timeout) {
    Android.getStreamDataAsync(
        token_url,
        hls_url,
        callback,
        checkResult,
        position,
        Timeout
    );
}

//public void CheckIfIsLiveFeed(String token_url, String hls_url, int Delay_ms, String callback, int x, int y, int ReTryMax, int Timeout)
//token_url = the base token url
//hls_url = the base hls playlist url
//callback = the call back function
//x & y the position of the array that hold the result also used to check the received info can be used by callback 
//Timeout = http request timeout
//Android specific: false
//Allows to get the stream data, that if called from JS will fail do to CORS error
function OSInterface_CheckIfIsLiveFeed(token_url, hls_url, callback, x, y, Timeout) {
    Android.CheckIfIsLiveFeed(
        token_url,
        hls_url,
        callback,
        x,
        y,
        Timeout
    );
}

//public String getStreamData(String token_url, String hls_url, int ReTryMax, int Timeout)
//token_url = the base token url
//hls_url = the base hls playlist url
//ReTryMax = the retry quanity in case the http request fails
//Timeout = http request timeout
//Android specific: false
//Allows to get the stream data, that if called from JS will fail do to CORS error
function OSInterface_getStreamData(token_url, hls_url, Timeout) {
    return Android.getStreamData(
        token_url,
        hls_url,
        Timeout
    );
}

//public String getQualities()
//Android specific: true
//Allows to get the stream data, that if called from JS will fail do to CORS error
function OSInterface_getQualities() {
    return Android.getQualities();
}

//public void GetMethodUrlHeadersAsync(String urlString, int timeout, String postMessage, String Method, String JsonString,
//                                            String callback, long checkResult, int key, int thread)
//urlString = the url to to the http request
//timeout = http request timeout
//postMessage = if is a output message if not null
//Method = http Method 'GET, POST, PUT, DELETE'
//JsonHeadersArray = The stringify array contain the http request headers
//callback = the call back function
//checkResult = a uniq ID number to prevent the callback answer to the wrong request, as this is a Async fun
//key = the return key used by Screens, 0 if not a Screen call
//thread = the thread number to be used there is 4 thread, 0 to 3
//Android specific: false
//Allows to make a http request in a async function on a url that if called from JS will fail do to CORS error
function OSInterface_GetMethodUrlHeadersAsync(urlString, timeout, postMessage, Method, JsonHeadersArray, callback, checkResult, key, thread) {
    Android.GetMethodUrlHeadersAsync(
        urlString,
        timeout,
        postMessage,
        Method,
        JsonHeadersArray,
        callback,
        checkResult,
        key,
        thread
    );
}

//public String mMethodUrlHeaders(String urlString, int timeout, String postMessage, String Method, long checkResult, String JsonHeadersArray)
//urlString = the url to to the http request
//timeout = http request timeout
//postMessage = if is a output message if not null
//Method = http Method 'GET, POST, PUT, DELETE'
//checkResult = a uniq ID number to prevent the callback answer to the wrong request, as this is a Async fun
//JsonHeadersArray = The stringify array contain the http request headers
//callback = the call back function
//Android specific: false
//Allows to make a http request in a sync function on a url that if called from JS will fail do to CORS error
function OSInterface_mMethodUrlHeaders(urlString, timeout, postMessage, Method, checkResult, JsonHeadersArray) {
    return Android.mMethodUrlHeaders(
        urlString,
        timeout,
        postMessage,
        Method,
        checkResult,
        JsonHeadersArray
    );
}

//public void mSwitchPlayerAudio(int position)
//position = the audio position, 2 enables both player audio, 1 only Main player, 0 small player
//Android specific: false
//Allows to change the audio source on PP or 50/50 mode
function OSInterface_mSwitchPlayerAudio(position) {
    if (Main_IsOn_OSInterface) Android.mSwitchPlayerAudio(position);
}

//public void mupdatesizePP(boolean FullScreen)
//FullScreen = if true Main player full size small player will be small in relation to PlayerViewSmallSize[][], if false 50/50 mode
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Allows to change player size on PP mode
function OSInterface_mupdatesizePP(isFullScreen) {
    Android.mupdatesizePP(isFullScreen);
}

//public void mupdatesize(boolean FullScreen)
//FullScreen = if true Main player full size small player will be small in relation to PlayerViewSmallSize[][], if false 50/50 mode
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Allows to change player size on PP mode
function OSInterface_mupdatesize(isFullScreen) {
    Android.mupdatesize(Boolean(isFullScreen));
}

//public void SetFullScreenPosition(int mFullScreenPosition)
//mFullScreenPosition = 0 right 1 left
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Allows to change the position of side by side player plus chat
function OSInterface_SetFullScreenPosition(mFullScreenPosition) {
    if (Main_IsOn_OSInterface) Android.SetFullScreenPosition(mFullScreenPosition);
}

//public void SetFullScreenSize(int mFullScreenSize)
//mFullScreenSize = 0, 1, 2, 3, 4
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Allows to change the size of side by side player plus chat
function OSInterface_SetFullScreenSize(mFullScreenPosition) {
    if (Main_IsOn_OSInterface) Android.SetFullScreenSize(mFullScreenPosition);
}

//public void mSetPlayerPosition(int PicturePicturePos)
//PicturePicturePos = The position of the small player
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Changes small player position on the screen
function OSInterface_mSetPlayerPosition(PicturePicturePos) {
    Android.mSetPlayerPosition(PicturePicturePos);
}

//public void mSetPlayerSize(int mPicturePictureSize)
//mPicturePictureSize = The size of the small player
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Changes small player size
function OSInterface_mSetPlayerSize(mPicturePictureSize) {
    Android.mSetPlayerSize(mPicturePictureSize);
}

//public void msetPlayer(boolean surface_view, boolean FullScreen)
//surface_view = surface_view or texture_view
//FullScreen updae updateVideSizePP else updateVideSize
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//changes all player to surface_view or texture_view for PP workaround
function OSInterface_msetPlayer(surface_view, FullScreen) {
    if (Main_IsOn_OSInterface) Android.msetPlayer(surface_view, Boolean(FullScreen));
}

//public void SetBuffer(int who_called, int buffer_size)
//who_called = 0 live, 1 vod, 2 clip
//buffer_size = buffer size in ms
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Change the player starting buffer
function OSInterface_SetBuffer(who_called, buffer_size) {
    if (Main_IsOn_OSInterface) Android.SetBuffer(who_called, buffer_size);
}

//public void mSetlatency(int LowLatency)
//LowLatency... 0 = disable, 2 = enable, 1 enable close as possible of live window
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Changes small player size
var low_latency_array = [0, 2, 1];
function OSInterface_mSetlatency(LowLatency) {
    Android.mSetlatency(low_latency_array[LowLatency]);
}

//public void mSwitchPlayerSize(int mPicturePictureSize)
//mPicturePictureSize = PicturePictureSize sizes are 0 , 1 , 2, of the 
//Array PlayerViewSmallSize[][PicturePictureSize] PicturePictureSize is the width size... 0 50% or 1/2, 1 33% or 1/3, 2 25% or 1/4
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Allows to change small player size
function OSInterface_mSwitchPlayerSize(PicturePictureSize) {
    Android.mSwitchPlayerSize(PicturePictureSize);
}

//public void mSwitchPlayer()
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Allows to change with will be the bigger player on PP mode
function OSInterface_mSwitchPlayer() {
    Android.mSwitchPlayer();
}

//public void mSwitchPlayerPosition(int mPicturePicturePosition)
//mPicturePicturePosition = the small player position on the screen
//Array PlayerViewSmallSize[mPicturePicturePosition][] 8 positions it screen side and corner
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Allows to change the small player position
function OSInterface_mSwitchPlayerPosition(mPicturePicturePosition) {
    Android.mSwitchPlayerPosition(mPicturePicturePosition);
}

//public void RestartPlayer(int who_called, long ResumePosition, int player)
//who_called = 0 live, 1 vod, 2 clip
//ResumePosition =  the position to start the video, if a live this is always 0
//player = the player position, there is several player to do multistream support
//Android specific: true
//Allows to get the stream data, that if called from JS will fail do to CORS error
function OSInterface_RestartPlayer(who_called, ResumePosition, player) {
    if (Main_IsOn_OSInterface) Android.RestartPlayer(who_called, ResumePosition, player);
}

//public void StartAuto(String uri, String mainPlaylistString, int who_called, long ResumePosition, int player)
//uri =  the url of the playlist or the clip
//mainPlaylistString = the stringify version of the url playlist content
//who_called = 0 live, 1 vod, 2 clip
//ResumePosition =  the position to start the video, if a live this is always 0
//player = the player position, there is several player to do multistream support
//Android specific: false in the OS has multi player supports Samsung TV for example don't have
//Sets mediaSources and start the player
function OSInterface_StartAuto(uri, mainPlaylistString, who_called, ResumePosition, player) {
    Android.StartAuto(
        uri,
        mainPlaylistString,
        who_called,
        ResumePosition,
        player
    );
}

//public void mhideSystemUI()
//Android specific: true
//hides android SystemUI on a phone, top bar and sw navigation keys
function OSInterface_mhideSystemUI() {
    Android.mhideSystemUI();
}

//public void UpdateUserId(String id, String name, String refresh_token)
//id =  the user id
//name =  the user name
//Android specific: true
//Sets the user id used by the notification services
function OSInterface_UpdateUserId(user) {
    if (Main_IsOn_OSInterface)
        if (user) {
            Android.UpdateUserId(
                user.id,
                user.name ? encodeURIComponent(user.name) : user.name,
                user.refresh_token ? user.refresh_token : null
            );
        } else {
            Android.UpdateUserId(
                null,
                null,
                null
            );
        }
}

//public void setAppIds(String client_id, String client_secret, String redirect_uri)
//client_id client_secret redirect_uri from add_code
//Android specific: true
//Set app id and etc related
function OSInterface_setAppIds(client_id, client_secret, redirect_uri) {
    if (Main_IsOn_OSInterface)
        Android.setAppIds(
            client_id,
            client_secret ? client_secret : null,
            redirect_uri
        );
}

//public void BackupFile(String file, String file_content)
//file =  the file name and or path
//file_content = the file content
//Android specific: true
//Backups user array and user history to a file
function OSInterface_BackupFile(file, file_content) {
    Android.BackupFile(file, file_content);
}

//public String mPageUrl()
//Android specific: true
//return the apk main url
function OSInterface_mPageUrl() {
    return Android.mPageUrl();
}

//public void clearCookie()
//Android specific: true
//Clears saved cookies to prevent show a already logged authentication page, as the app has multi users cookies are automatic saved after a login
function OSInterface_clearCookie() {
    if (Main_IsOn_OSInterface) Android.clearCookie();
}

//public long getsavedtime()
//Android specific: false
//returns mResumePosition to be used after the app has stopped, because the app was minimized or user changed apps
function OSInterface_getsavedtime() {
    return Android.getsavedtime();
}

//public long gettime()
//Android specific: false
//returns PlayerCurrentPosition valued used to show vod/clip position and sync vod/clip chat and video
function OSInterface_gettime() {
    return Main_IsOn_OSInterface ? Android.gettime() : 0;
}

//public long gettimepreview()
//Android specific: false
//returns PlayerCurrentPosition valued used to show vod/clip position and sync vod/clip chat and video
function OSInterface_gettimepreview() {
    return Main_IsOn_OSInterface ? Android.gettimepreview() : 0;
}

//public void stopVideo(int who_called)
//who_called = 0 live, 1 vod, 2 clip
//Android specific: false
//Allows to stop the player when the user chooses to end the playback
function OSInterface_stopVideo() {
    Android.stopVideo();
}

//public void mClearSmallPlayer()
//Android specific: false
//Clears the SmallPlayer
function OSInterface_mClearSmallPlayer() {
    Android.mClearSmallPlayer();
}

//public void mseekTo(long position)
//position in ms to seek to
//Android specific: false
//Allows to seek to a position
function OSInterface_mseekTo(position) {
    Android.mseekTo(position);
}

//public void PlayPauseChange()
//Android specific: false
//Allows to change the playback state, if playing pauses and vice versa
function OSInterface_PlayPauseChange() {
    Android.PlayPauseChange();
}

//public void PlayPause(boolean state)
//state the playback state
//Android specific: false
//Allows to set the playback state
function OSInterface_PlayPause(state) {
    Android.PlayPause(Boolean(state));
}

//public String getversion()
//Android specific: true
//Allows to get app version
function OSInterface_getversion() {
    return Android.getversion();
}

//public boolean getdebug()
//Android specific: true
//Allows to get the app debug state
function OSInterface_getdebug() {
    return Android.getdebug();
}

//public void requestWr()
//Android specific: true
//Runs only once, this functions check for storage access and request the user to give the permission
function OSInterface_requestWr() {
    Android.requestWr();
}

//public boolean HasBackupFile(String file)
//file =  the file path to check
//Android specific: true
//Check if the file exist before restore it
function OSInterface_HasBackupFile(file) {
    return Android.HasBackupFile(file);
}

//public String RestoreBackupFile(String file)
//file =  the file path to restore
//Android specific: true
//Check if the file exist before restore it
function OSInterface_RestoreBackupFile(file) {
    return Android.RestoreBackupFile(file);
}

//public boolean canBackupFile()
//Android specific: true
//Check if storage access is available
function OSInterface_canBackupFile() {
    return Android.canBackupFile();
}

//public String getDevice()
//Android specific: true
//Returns Build.MODEL
function OSInterface_getDevice() {
    return Android.getDevice();
}

//public String getManufacturer()
//Android specific: true
//Returns Build.MANUFACTURER
function OSInterface_getManufacturer() {
    return Android.getManufacturer();
}

//public int getSDK()
//Android specific: true
//Returns Build.VERSION.SDK_INT
function OSInterface_getSDK() {
    return Android.getSDK();
}

//public boolean deviceIsTV()
//Android specific: true
//Returns true if device is a TV
function OSInterface_deviceIsTV() {
    return Android.deviceIsTV();
}

//public void keyEvent(int key, int keyaction)
//key = the key value
//keyaction =  the key action up down etc
//Android specific: true
//Sends a key event
function OSInterface_keyEvent(key, keyaction) {
    Android.keyEvent(key, keyaction);
}

//public void SetSmallPlayerBandwidth(int Bitrate)
//Bitrate = set mainPlayerBitrate, if 0 the value will be set to Integer.MAX_VALUE
//Android specific: true
//Sets small player max Bitrate
function OSInterface_SetSmallPlayerBitrate(Bitrate) {
    if (Main_IsOn_OSInterface) Android.SetSmallPlayerBitrate(Bitrate);
}

//public void SetSmallPlayerBandwidth(int Bitrate)
//Bitrate = set PP_PlayerBitrate, if 0 the value will be set to Integer.MAX_VALUE
//Android specific: true
//Sets Big player max Bitrate
function OSInterface_SetMainPlayerBitrate(Bitrate) {
    if (Main_IsOn_OSInterface) Android.SetMainPlayerBitrate(Bitrate);
}

//public String getcodecCapabilities(String CodecType)
//CodecType = avc vp9 a codec type
//Android specific: true
//Returns the codecCapabilities for that codec type
function OSInterface_getcodecCapabilities(CodecType) {
    return Android.getcodecCapabilities(CodecType);
}

//public void setBlackListMediaCodec(String CodecList)
//CodecType = avc vp9 a codec type
//Android specific: true
//Returns the codecCapabilities for that codec type
function OSInterface_setBlackListMediaCodec(CodecList) {
    Android.setBlackListMediaCodec(CodecList);
}

//public void mshowLoading(boolean show)
//show = show or not
//Android specific: true
//Shows a spinning ProgressBar
function OSInterface_mshowLoading(show) {
    Android.mshowLoading(Boolean(show));
}

//public String getWebviewVersion()
//Android specific: true
//returns the webview version
function OSInterface_getWebviewVersion() {
    return Android.getWebviewVersion();
}

//public void mclose(boolean close)
//close = close == true close else minimize
//Android specific: true
//closes or minimize the app
function OSInterface_mclose(close) {
    Android.mclose(Boolean(close));
}

//public void mloadUrl(String url)
//url = the url to open
//Android specific: true
//opens a url on the main webview of the apk
function OSInterface_mloadUrl(url) {
    Android.mloadUrl(url);
}

//public boolean isAccessibilitySettingsOn()
//Android specific: true
//Checks is a Accessibility service is enable
function OSInterface_isAccessibilitySettingsOn() {
    return Android.isAccessibilitySettingsOn();
}

//public void LongLog(String log)
//Android specific: true
//Logs to logcat the console.log of the app
function OSInterface_LongLog(log) {
    if (Main_IsOn_OSInterface) Android.LongLog(log);
}

//public void getVideoStatus(boolean showLatency)
//Android specific: true
//request the video status dropped frames, buffer size etc
function OSInterface_getVideoStatus(showLatency) {
    Android.getVideoStatus(Boolean(showLatency));
}

//public void getVideoQuality(int who_called)
//who_called = 0 live 1 vod
//Android specific: true
//request the video quality for the auto playback
function OSInterface_getVideoQuality(who_called) {
    Android.getVideoQuality(who_called);
}

//public void DisableMultiStream()
//Android specific: true
//Disables MultiStream
function OSInterface_DisableMultiStream() {
    Android.DisableMultiStream();
}

//public void StartMultiStream(int position, String uri, String mainPlaylistString)
//position = position of the player
//uri = uri of the playlist
//mainPlaylistString = main Playlist String
//Android specific: true
//Start MultiStream at position
function OSInterface_StartMultiStream(position, uri, mainPlaylistString) {
    Android.StartMultiStream(position, uri, mainPlaylistString);
}

//public void EnableMultiStream(boolean MainBig, int offset)
//MainBig = MainBig mode if true the main player is bigger
//offset = is the player position offset on the screen, one can click left right to change with will be the main player, the offset determines the position of it player
//mainPlaylistString = main Playlist String
//Android specific: true
//Start MultiStream and allows to change its mode
function OSInterface_EnableMultiStream(MainBig, offset) {
    Android.EnableMultiStream(Boolean(MainBig), offset);
}

//public void setPlaybackSpeed(float speed)
//speed = the playback speed
//Android specific: true
//Allows to change the playback speed
function OSInterface_setPlaybackSpeed(speed) {
    if (Main_IsOn_OSInterface) Android.setPlaybackSpeed(speed);
}

//public void OpenExternal(String url)
//url = the url of the video
//Android specific: true
//Allows to open current video on a external player
function OSInterface_OpenExternal(url) {
    Android.OpenExternal(url);
}

//public void SetPreviewSize(int mPreviewSize)
//mPreviewSize = the Preview Size
//Android specific: true
//Allows to change the player preview size
function OSInterface_SetPreviewSize(mPreviewSize) {
    if (Main_IsOn_OSInterface) Android.SetPreviewSize(mPreviewSize);
}

//public void SetPreviewAudio(int volume)
//volume = the volume of others player
//Android specific: true
//Allows the preview player volume
function OSInterface_SetPreviewAudio(volume) {
    if (Main_IsOn_OSInterface) Android.SetPreviewAudio(volume);
}

//public void SetPreviewAudio(int volume)
//volume = the volume of others player
//Android specific: true
//Allows to lower others player volume when preview player is showing
function OSInterface_SetPreviewOthersAudio(volume) {
    if (Main_IsOn_OSInterface) Android.SetPreviewOthersAudio(volume);
}

//public void mSetPlayerAudioMulti(int position)
//position = the player position to enable the audio 0 to 3, 4 all player enable
//Android specific: true
//Allows to set with player will produce audio
function OSInterface_mSetPlayerAudioMulti(position) {
    if (Main_IsOn_OSInterface) Android.mSetPlayerAudioMulti(position);
}

//public boolean IsMainNotMain()
//Android specific: true
//boolean if true the main player is not the original main player and a change is needed to prevent odd behavior when changing multistream players positon
function OSInterface_IsMainNotMain() {
    return Android.IsMainNotMain();
}

//public void PrepareForMulti(String uri, String mainPlaylistString)
//uri =  the url of the playlist or the clip
//mainPlaylistString = the stringify version of the url playlist content
//Android specific: true
//If IsMainNotMain fix player position
function OSInterface_PrepareForMulti(uri, mainPlaylistString) {
    Android.PrepareForMulti(uri, mainPlaylistString);
}

//public void StartFeedPlayer(String uri, String mainPlaylistString, int position, long resumePosition, boolean isVod)
//uri =  the url of the playlist or the clip
//mainPlaylistString = the stringify version of the url playlist content
//position = position of the player on the screen
//resumePosition = the postion to start the vod
//Android specific: true
//Start MultiStream at position
function OSInterface_StartFeedPlayer(uri, mainPlaylistString, position, resumePosition, isVod) {
    Android.StartFeedPlayer(uri, mainPlaylistString, position, resumePosition, Boolean(isVod));
}

//public void StartFeedPlayer(String uri, String mainPlaylistString, , int top, int right, int bottom, int left)
//uri =  the url of the playlist or the clip
//mainPlaylistString = the stringify version of the url playlist content
//Android specific: true
//Start MultiStream at position
function OSInterface_StartSidePanelPlayer(uri, mainPlaylistString) {
    Android.StartSidePanelPlayer(
        uri,
        mainPlaylistString
    );
}

//public void SetPlayerViewSidePanel(int bottom, int web_height)
//bottom = the position from the bottom
//web_height = the screen width size
//Android specific: true
//Start MultiStream at position
function OSInterface_SetPlayerViewFeedBottom(bottom, web_height) {
    Android.SetPlayerViewFeedBottom(
        bottom,
        parseInt(web_height)
    );
}

//public void SetPlayerViewSidePanel(int top, int right, int left, int web_height)
//uri =  the url of the playlist or the clip
//mainPlaylistString = the stringify version of the url playlist content
//bottom, right, left = 'side_panel_feed_thumb'.getBoundingClientRect()
//Android specific: true
//Start MultiStream at position
function OSInterface_SetPlayerViewSidePanel(bottom, right, left, web_height) {

    if (Main_IsOn_OSInterface) Android.SetPlayerViewSidePanel(
        bottom,
        right,
        left,
        parseInt(web_height)
    );

}

//public void StartScreensPlayer(String uri, String mainPlaylistString, ResumePosition, float bottom, float right, float left, int web_height, int who_called)
//uri =  the url of the playlist or the clip
//mainPlaylistString = the stringify version of the url playlist content
//ResumePosition position to start the vod
//top, right, left = 'side_panel_feed_thumb'.getBoundingClientRect()
//who_called 1 live 2 vod 3 clip
//Android specific: true
//Start MultiStream at position
function OSInterface_StartScreensPlayer(uri, mainPlaylistString, ResumePosition, bottom, right, left, web_height, who_called) {

    Android.StartScreensPlayer(
        uri,
        mainPlaylistString,
        ResumePosition,
        bottom,
        right,
        left,
        parseInt(web_height),
        who_called,
        Settings_Obj_default('preview_screen_sizes') === 1
    );

}

//public void StartScreensPlayer(float bottom, float right, float left, int web_height, int who_called)
//uri =  the url of the playlist or the clip
//mainPlaylistString = the stringify version of the url playlist content
//top, right, left = 'side_panel_feed_thumb'.getBoundingClientRect()
//who_called 1 live 2 vod 3 clip
//Android specific: true
//Start MultiStream at position
function OSInterface_ScreenPlayerRestore(bottom, right, left, web_height, who_called) {

    if (Main_IsOn_OSInterface) Android.ScreenPlayerRestore(
        bottom,
        right,
        left,
        parseInt(web_height),
        who_called,
        Settings_Obj_default('preview_screen_sizes') === 1
    );

}

//public void ClearFeedPlayer()
//Android specific: true
//Clear the side panel or small player over the live feed play removes it from the screen
function OSInterface_ClearFeedPlayer() {
    Android.ClearFeedPlayer();
}

//public void ClearFeedPlayer()
//Android specific: true
//Clear the side panel or small player over the live feed play removes it from the screen
function OSInterface_ClearSidePanelPlayer() {
    Android.ClearSidePanelPlayer();
}

//public void SidePanelPlayerRestore()
//Android specific: true
//restores the main player as side panel player
function OSInterface_SidePanelPlayerRestore() {
    if (Main_IsOn_OSInterface) Android.SidePanelPlayerRestore();
}

//public void SetFeedPosition(int position)
//position the position on the screen
//Android specific: true
//Clear the side panel or small player over the live feed play removes it from the screen
function OSInterface_SetFeedPosition(position) {
    Android.SetFeedPosition(position);
}

//public void mshowLoadingBottom(boolean show)
//show =  show or hide
//Android specific: true
//Shows a spinning ProgressBar over live feed
function OSInterface_mshowLoadingBottom(show) {
    Android.mshowLoadingBottom(show);
}

//public void KeyboardCheckAndHIde()
//Android specific: true
//Checks and hide the on screen keyboard if a hw keyboard is connected to the devices
function OSInterface_KeyboardCheckAndHIde() {
    Android.KeyboardCheckAndHIde();
}

//public void hideKeyboardFrom()
//Android specific: true
//Hides the on screen keyboard
function OSInterface_hideKeyboardFrom() {
    Android.hideKeyboardFrom();
}

function OSInterface_AvoidClicks(Avoid) {
    if (Main_IsOn_OSInterface) Android.AvoidClicks(Avoid);
}

function OSInterface_initbodyClickSet() {
    if (Main_IsOn_OSInterface) Android.initbodyClickSet();
}

//public void SetKeysOpacity(float Opacity)
//The keys Opacity
//Android specific: true
//Allows to run the notification service once
function OSInterface_SetKeysOpacity(Opacity) {
    if (Main_IsOn_OSInterface) Android.SetKeysOpacity(Opacity);
}

//public void SetKeysPosition(float Opacity)
//The keys Opacity
//Android specific: true
//Allows to run the notification service once
function OSInterface_SetKeysPosition(Position) {
    if (Main_IsOn_OSInterface) Android.SetKeysPosition(Position);
}

//public void SetCheckSource(float Opacity)
//mCheckSource cenable disable
//Android specific: true
//Allows to reset back to auto playback if is with source enable and lagging
function OSInterface_SetCheckSource(mCheckSource) {
    if (Main_IsOn_OSInterface) Android.SetCheckSource(mCheckSource);
}

//public void showToast(String toast)
//position player position
//volume the player volume
//Android specific: true
//Allows to control individual player volume
function OSInterface_showToast(toast) {//Not be used
    if (Main_IsOn_OSInterface) Android.showToast(toast);
}

//public void mCheckRefreshToast(String type)
//position player position
//volume the player volume
//Android specific: true
//Allows to control individual player volume
function OSInterface_mCheckRefreshToast(type) {//Not be used
    if (Main_IsOn_OSInterface) Android.mCheckRefreshToast(type);
}

//public void mCheckRefresh()
//Android specific: true
//returns the webview version
function OSInterface_mCheckRefresh() {
    if (Main_IsOn_OSInterface) {
        Android.mCheckRefresh(2);
        Android.mCheckRefresh(5);
    }
}

//public String GetLastIntentObj()
//Android specific: true
//returns the webview version
function OSInterface_GetLastIntentObj() {
    if (Main_IsOn_OSInterface) return Android.GetLastIntentObj();

    return null;
}

//public void upDateLang(String id)
//id =  the user id
//Android specific: true
//Sets the user id used by the notification services
function OSInterface_upDateLang(lang) {
    if (Main_IsOn_OSInterface) Android.upDateLang(lang);
}

//public void getLatency(String callback)
//Android specific: true
//Get live stream latency to the streamer
function OSInterface_getLatency(chat_number) {
    if (Main_IsOn_OSInterface) Android.getLatency(chat_number);

}

//public void mKeepScreenOn(boolean keepOn)
//Android specific: true
//Allows to control if the screen will be on or not from js side
function OSInterface_mKeepScreenOn(keepOn) {//Not be used
    if (Main_IsOn_OSInterface) Android.mKeepScreenOn(Boolean(keepOn));
}

//public void getDuration()
//String callback = the fun to receive the value
//Android specific: true
//Runs only once, this functions check for storage access and request the user to give the permission
// function OSInterface_getDuration(callback) {
//     Android.getDuration(callback);
// }

//public boolean isKeyboardConnected()
//Android specific: true
//informs if a hw Keyboard is connected to the devices
// function OSInterface_isKeyboardConnected() {//Not be used
//     return Android.isKeyboardConnected();
// }

//public boolean showKeyboardFrom()
//Android specific: true
//force show sw Keyboard
// function OSInterface_showKeyboardFrom() {//Not be used
//     Android.showKeyboardFrom();
// }

//public boolean getPlaybackState()
//Android specific: true
//return the playback state
// function OSInterface_getPlaybackState() {//Not be used
//     return Android.getPlaybackState();
// }

//public void mSetAudio(int position, float volume)
//position player position
//volume the player volume
//Android specific: true
//Allows to control individual player volume
// function OSInterface_mSetAudio(position, volume) {//Not be used
//     Android.mSetAudio(position, volume);
// }
