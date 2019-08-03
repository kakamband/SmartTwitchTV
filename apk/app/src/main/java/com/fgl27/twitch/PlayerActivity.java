//adapt part of the player from https://github.com/yuliskov/SmartYouTubeTV

package com.fgl27.twitch;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.Toast;

import com.fgl27.twitch.helpers.HVTHandler;
import com.fgl27.twitch.helpers.Tools;
import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.DefaultRenderersFactory;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.extractor.Extractor;
import com.google.android.exoplayer2.extractor.ExtractorsFactory;
import com.google.android.exoplayer2.extractor.mp4.Mp4Extractor;
import com.google.android.exoplayer2.mediacodec.MediaCodecRenderer.DecoderInitializationException;
import com.google.android.exoplayer2.mediacodec.MediaCodecUtil.DecoderQueryException;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.ProgressiveMediaSource;
import com.google.android.exoplayer2.source.dash.DashMediaSource;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.source.smoothstreaming.SsMediaSource;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.ui.PlayerView;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.util.Util;

public class PlayerActivity extends Activity {
    private static final String TAG = PlayerActivity.class.getName();

    public static int[] BUFFER_SIZE = {4000, 4000, 4000, 4000};//Default, live, vod, clips

    private PlayerView simpleExoPlayerView;
    public static SimpleExoPlayer player;
    private DataSource.Factory dataSourceFactory;

    private DefaultTrackSelector trackSelector;
    private boolean shouldAutoPlay;

    //private int mResumeWindow;
    private long mResumePosition;

    public static String url;
    private MediaSource mediaSourceAuto = null;
    private MediaSource TempmediaSourceAuto;

    private ImageView spinner;
    private Animation rotation;

    private WebView mwebview;
    private boolean onCreateReady;
    private boolean alredystarted;
    private boolean loadingcanshow;
    public int mwhocall = 1;
    private int heightDefault = 0;
    private int mwidthDefault = 0;
    private int heightChat = 0;
    private int mwidthChat = 0;

    public Handler myHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (!onCreateReady) {
            onCreateReady = true;
            setContentView(R.layout.activity_player);
            url = "file:///android_asset/temp.mp4";

            myHandler = new Handler(Looper.getMainLooper());

            dataSourceFactory =
                    new DefaultDataSourceFactory(
                            this, Util.getUserAgent(this, this.getString(R.string.app_name)));

            spinner = findViewById(R.id.spinner);
            rotation = AnimationUtils.loadAnimation(this, R.anim.rotation);

            hideLoading();

            simpleExoPlayerView = findViewById(R.id.player_view);
            shouldAutoPlay = false;

            initializeWebview();
        }
    }

    private void initializePlayer() {
        if (player != null) {
            player.setPlayWhenReady(shouldAutoPlay);
            releasePlayer();
        }
        if (shouldAutoPlay) {
            showLoading(true);


            trackSelector = new DefaultTrackSelector();
            trackSelector.setParameters(new DefaultTrackSelector.ParametersBuilder().build());

            player = ExoPlayerFactory.newSimpleInstance(
                    this,
                    new DefaultRenderersFactory(this),
                    trackSelector,
                    Tools.getLoadControl(BUFFER_SIZE[mwhocall]));

            simpleExoPlayerView.setPlayer(player);

            player.addListener(PlayerEvent());
            player.setPlayWhenReady(true);

            //We are sekking from js or the updateResumePosition() saved the postion onStop
            if (mResumePosition > 0 && mwhocall > 1) {
                player.seekTo(mResumePosition);
            }

            player.prepare(mediaSourceAuto != null ? mediaSourceAuto : buildMediaSource(Uri.parse(url)), false, true);
        } else {
            //Reset player background to a empty black screen
            player = ExoPlayerFactory.newSimpleInstance(this);
            simpleExoPlayerView.setPlayer(player);

            player.setPlayWhenReady(false);
            player.prepare(buildMediaSource(Uri.parse(url)), false, true);

            releasePlayer();
            clearResumePosition();
            hideLoading();
        }
    }

    private void PreinitializePlayer(MediaSource mediaSource, String videoAddress, int whocall, long position, boolean mshouldAutoPlay) {

        mediaSourceAuto = mediaSource;
        PlayerActivity.url = videoAddress;
        shouldAutoPlay = mshouldAutoPlay;
        mwhocall = whocall;
        //We are sekking from js
        if (position > 0) mResumePosition = position;

        initializePlayer();
    }

    private void releasePlayer() {
        if (player != null) {
            shouldAutoPlay = player.getPlayWhenReady();
            player.release();
            player = null;
            trackSelector = null;
        }
        hideLoading();
    }

    private void hideLoading() {
        loadingcanshow = false;
        spinner.setVisibility(View.GONE);
        spinner.clearAnimation();
    }

    private void updatesize(boolean sizechat) {
        if (heightDefault == 0) {
            heightDefault = simpleExoPlayerView.getHeight();
            mwidthDefault = simpleExoPlayerView.getWidth();

            heightChat = (int) (heightDefault * 0.75);
            mwidthChat = (int) (mwidthDefault * 0.75);
        }

        if (sizechat)
            simpleExoPlayerView.setLayoutParams(new FrameLayout.LayoutParams(mwidthChat, heightChat, Gravity.CENTER_VERTICAL));
        else
            simpleExoPlayerView.setLayoutParams(new FrameLayout.LayoutParams(mwidthDefault, heightDefault, Gravity.TOP));
    }

    private void showLoading(boolean runnow) {
        if (runnow) showLoading();
        else {
            //Add a delay to prevent "short blink" ladings, can happen sporadic or right before STATE_ENDED
            myHandler.postDelayed(() -> {
                if (loadingcanshow) showLoading();
            }, 650);
        }
    }

    private void showLoading() {
        if (spinner.getVisibility() != View.VISIBLE) {
            // The duration of the spin is 1s, reset every show to use the spin as a performance counter
            // to know how much time takes to load
            spinner.startAnimation(rotation);
            spinner.setVisibility(View.VISIBLE);
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        if (player == null && shouldAutoPlay && mwebview != null && alredystarted) {
            mwebview.loadUrl("javascript:Play_CheckResume()");
        }
        alredystarted = true;
    }

    //This function is called when overview key is pressed
    @Override
    public void onPause() {
        super.onPause();
    }

    //This function is called when home key is pressed
    @Override
    public void onStop() {
        super.onStop();
        updateResumePosition();
        releasePlayer();
    }

    //This function is called when TV wakes up
    @Override
    public void onStart() {
        super.onStart();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        releasePlayer();
    }

    private void closeThis() {
        finishAndRemoveTask();
    }

    private void minimizeThis() {
        this.moveTaskToBack(true);
    }

    //https://android-developers.googleblog.com/2009/12/back-and-other-hard-keys-three-stories.html
    @Override
    public boolean onKeyLongPress(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            closeThis();
            return true;
        }
        return super.onKeyLongPress(keyCode, event);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && event.isTracking()
                && !event.isCanceled()) {
            // if the call key is being released, AND we are tracking
            // it from an initial key down, AND it is not canceled,
            // then handle it.
            mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_1));
            mwebview.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_1));
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            // this tells the framework to start tracking for
            // a long press and eventual key up.  it will only
            // do so if this is the first down (not a repeat).
            event.startTracking();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    private void clearResumePosition() {
        //mResumeWindow = C.INDEX_UNSET;
        mResumePosition = C.TIME_UNSET;
    }

    private void updateResumePosition() {
        if (player == null) {
            return;
        }

        //mResumeWindow = player.getCurrentWindowIndex();
        mResumePosition = player.isCurrentWindowSeekable() ? Math.max(0, player.getCurrentPosition()) : C.TIME_UNSET;
    }

    private MediaSource buildMediaSource(Uri uri) {
        @C.ContentType int type = Util.inferContentType(uri);
        switch (type) {
            case C.TYPE_HLS:
                return new HlsMediaSource.Factory(dataSourceFactory)
                        .setAllowChunklessPreparation(true).createMediaSource(uri);
            case C.TYPE_OTHER:
                return new ProgressiveMediaSource.Factory(dataSourceFactory, new Mp4ExtractorsFactory()).createMediaSource(uri);
            case C.TYPE_DASH:
                return new DashMediaSource.Factory(dataSourceFactory).createMediaSource(uri);
            case C.TYPE_SS:
                return new SsMediaSource.Factory(dataSourceFactory).createMediaSource(uri);
            default:
                throw new IllegalStateException("Unsupported type: " + type);
        }
    }

    //https://exoplayer.dev/shrinking.html
    private class Mp4ExtractorsFactory implements ExtractorsFactory {
        @Override
        public Extractor[] createExtractors() {
            return new Extractor[]{new Mp4Extractor()};
        }
    }

    private void initializeWebview() {
        mwebview = findViewById(R.id.WebView);
        mwebview.setBackgroundColor(Color.TRANSPARENT);
        WebSettings websettings = mwebview.getSettings();
        websettings.setJavaScriptEnabled(true);
        websettings.setDomStorageEnabled(true);

        websettings.setAllowFileAccess(true);
        websettings.setAllowContentAccess(true);
        websettings.setAllowFileAccessFromFileURLs(true);
        websettings.setAllowUniversalAccessFromFileURLs(true);
        websettings.setCacheMode(WebSettings.LOAD_NO_CACHE);

        mwebview.clearCache(true);
        mwebview.clearHistory();

        //To load page from assets
        //mwebview.loadUrl("file:///android_asset/index.html");
        //To load page from githubio
        mwebview.loadUrl("https://fgl27.github.io/SmartTwitchTV/release/index.min.html");

        mwebview.addJavascriptInterface(new WebAppInterface(this), "Android");

        mwebview.setWebViewClient(new WebViewClient() {
            @SuppressWarnings("unused")//called by JS
            public void onConsoleMessage(String message, int lineNumber, String sourceID) {
                Log.d(TAG, message + " -- From line " +
                        lineNumber + " of " +
                        sourceID);
            }
        });
        mwebview.requestFocus();
    }

    public class WebAppInterface {
        final Context mwebContext;

        /**
         * Instantiate the interface and set the context
         */
        WebAppInterface(Context context) {
            mwebContext = context;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mshowLoading(boolean show) {
            myHandler.post(() -> {
                if (show) showLoading(true);
                else hideLoading();
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mclose(boolean close) {
            myHandler.post(() -> {
                if (close) closeThis();
                else minimizeThis();
            });
        }

        /**
         * Show a toast from the web page
         */
        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void showToast(String toast) {
            myHandler.post(() -> Toast.makeText(mwebContext, toast, Toast.LENGTH_SHORT).show());
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void mupdatesize(boolean sizechat) {
            myHandler.post(() -> updatesize(sizechat));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void startVideo(String videoAddress, int whocall) {
            myHandler.post(() -> PreinitializePlayer(null, videoAddress, whocall, -1, true));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void startVideoOffset(String videoAddress, int whocall, long position) {
            myHandler.post(() -> PreinitializePlayer(null, videoAddress, whocall, position, true));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void SetAuto(String url) {
            //The token expires in 15 min so we need to set the mediaSource in case we use it in the future
            TempmediaSourceAuto = buildMediaSource(Uri.parse(url));
            Log.d(TAG, "SetAuto url = " + url);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void StartAuto(int whocall, long position) {
            myHandler.post(() -> PreinitializePlayer(TempmediaSourceAuto, "", whocall, position, true));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void stopVideo(int whocall) {
            myHandler.post(() -> PreinitializePlayer(null, "file:///android_asset/temp.mp4", mwhocall, -1, false));
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public long getsavedtime() {
            return mResumePosition;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public long gettime() {
            HVTHandler.RunnableResult<Long> result = HVTHandler.post(myHandler, new HVTHandler.RunnableValue<Long>() {
                @Override
                public void run() {
                    if (PlayerActivity.player != null) value = PlayerActivity.player.getCurrentPosition();
                    else value = 0L;
                }
            });
            return result.get();
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public int getAndroid() {
            return 1;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String mreadUrl(String urlString, int timeout, int HeaderQuantity, String access_token) {
            return Tools.prerun(urlString, timeout, HeaderQuantity, access_token, false);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String mreadUrl(String urlString, int timeout, int HeaderQuantity, String access_token, boolean post) {
            return Tools.prerun(urlString, timeout, HeaderQuantity, access_token, post);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void play(boolean play) {
            myHandler.post(() -> {
                if (PlayerActivity.player != null) PlayerActivity.player.setPlayWhenReady(play);
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public boolean getPlaybackState() {
            HVTHandler.RunnableResult<Boolean> result = HVTHandler.post(myHandler, new HVTHandler.RunnableValue<Boolean>() {
                @Override
                public void run() {
                    if (PlayerActivity.player != null) value = PlayerActivity.player.getPlayWhenReady();
                    else value = false;
                }
            });
            return result.get();
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void setPlaybackSpeed(float value) {
            myHandler.post(() -> {
                if (PlayerActivity.player != null) PlayerActivity.player.setPlaybackParameters(new PlaybackParameters(value, 1.0f));
            });
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void SetBuffer(int whocall, int value) {
            BUFFER_SIZE[whocall] = Math.min(value, 15000);
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String getversion() {
            return BuildConfig.VERSION_NAME;
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public void clearCookie() {
            CookieManager.getInstance().removeAllCookies(null);
            CookieManager.getInstance().flush();
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public boolean misCodecSupported() {
            return Tools.isCodecSupported("vp9");
        }

        @SuppressWarnings("unused")//called by JS
        @JavascriptInterface
        public String getVideoQuality() {
            HVTHandler.RunnableResult<String> result = HVTHandler.post(myHandler, new HVTHandler.RunnableValue<String>() {
                @Override
                public void run() {
                    if (PlayerActivity.player != null) value = Tools.mgetVideoQuality(PlayerActivity.player);
                    else value = null;
                }
            });
            return result.get();
        }
    }

    private Player.EventListener PlayerEvent() {
        return new Player.EventListener() {

            @Override
            public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
                if (playWhenReady) {
                    switch (playbackState) {
                        case Player.STATE_IDLE:
                            break;
                        case Player.STATE_BUFFERING:
                            loadingcanshow = true;
                            showLoading(false);
                            break;
                        case Player.STATE_READY:
                            hideLoading();
                            if (player != null) {
                                myHandler.post(() -> mwebview.loadUrl("javascript:Play_UpdateDuration(" +
                                        mwhocall + "," + player.getDuration() + ")"));
                            }
                            break;
                        case Player.STATE_ENDED:
                            hideLoading();
                            myHandler.post(() -> mwebview.loadUrl("javascript:Play_PannelEndStart(" + mwhocall + ")"));
                            break;
                        default:
                            break;
                    }
                } else {
                    hideLoading();
                }
            }

            @Override
            public void onPlayerError(ExoPlaybackException e) {
                String errorString = null;

                if (e.type == ExoPlaybackException.TYPE_RENDERER) {
                    Exception cause = e.getRendererException();
                    if (cause instanceof DecoderInitializationException) {
                        // Special case for decoder initialization failures.
                        DecoderInitializationException decoderInitializationException = (DecoderInitializationException) cause;
                        if (decoderInitializationException.decoderName == null) {
                            if (decoderInitializationException.getCause() instanceof DecoderQueryException) {
                                errorString = getString(R.string.error_querying_decoders);
                            } else if (decoderInitializationException.secureDecoderRequired) {
                                errorString = getString(R.string.error_no_secure_decoder, decoderInitializationException.mimeType);
                            } else {
                                errorString = getString(R.string.error_no_decoder, decoderInitializationException.mimeType);
                            }
                        } else {
                            errorString = getString(R.string.error_instantiating_decoder, decoderInitializationException.decoderName);
                        }
                    }
                }

                if (errorString != null) {
                    Toast.makeText(PlayerActivity.this, errorString, Toast.LENGTH_SHORT).show();
                }

                if (Tools.isBehindLiveWindow(e)) clearResumePosition();
                else updateResumePosition();

                initializePlayer();
            }
        };
    }
}
