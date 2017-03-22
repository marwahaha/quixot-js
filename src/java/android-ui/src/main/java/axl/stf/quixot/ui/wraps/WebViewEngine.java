package axl.stf.quixot.ui.wraps;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.util.Log;
import android.view.Gravity;
import android.webkit.*;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import axl.stf.quixot.android.QuixotActivityWindow;

import static android.widget.AbsoluteLayout.LayoutParams.*;
//import static  android.widget.LinearLayout.LayoutParams;

public class WebViewEngine extends WebView {

    private final QuixotActivityWindow context;
    private StringBuffer  stringBuilder = new StringBuffer ();
    public static final int FILECHOOSER_RESULTCODE = 34;

    private static final String TAG = "QuixotMingui-WebEngine";

    private  boolean attachedToWindow = false;


    public void evalMethod(String methodName){
        eval(methodName + "()");
    }

    public void eval(String jsScript){

        if (!attachedToWindow){
            Log.v(TAG, "promise\n"+ jsScript);
            stringBuilder.append(jsScript);
        }
        else {
            Log.v(TAG, "eval\n"+ jsScript);
            execute(jsScript);
        }

    }

    private void execute(final String s){
        final WebView webView = this;
        this.post(new Runnable() {
            @Override
            public void run() {
                webView.loadUrl("javascript:"+s+";");
            }
        });
    }


    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        attachedToWindow = false;
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        this.addJavascriptInterface(new MinGUIAndroid(this, context), "Mingui");
        final String content = "javascript:"+stringBuilder.toString()+";";
        Log.d(TAG, "onAttachedToWindow\n"+ content);
        execute(content);
        attachedToWindow = true;
    }



    public WebViewEngine(final QuixotActivityWindow context) {
        super(context);
        this.context = context;
//        context.setContentView(this);

//        Button btnTag = new Button(context);
//        btnTag.setText("Button");
//        btnTag.setId(1);
//        this.addView(btnTag);

        this.getSettings().setJavaScriptEnabled(true);
        this.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.CUPCAKE) {
            this.getSettings().setAllowFileAccess(true);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
            this.getSettings().setAllowContentAccess(true);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            this.getSettings().setAllowFileAccessFromFileURLs(true);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            this.getSettings().setAllowUniversalAccessFromFileURLs(true);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.ECLAIR_MR1) {
            this.getSettings().setAppCacheEnabled(true);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.CUPCAKE) {
            this.getSettings().setBuiltInZoomControls(true);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.ECLAIR) {
            this.getSettings().setGeolocationEnabled(true);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.ECLAIR_MR1) {
            this.getSettings().setDomStorageEnabled(true);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.FROYO) {
            getSettings().setBlockNetworkLoads(false);
        }

        getSettings().setBlockNetworkImage(false);




        this.setWebChromeClient(new WebChromeClient() {

            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.FROYO) {
                        Toast.makeText(context, consoleMessage.message() + " at line:" +consoleMessage.lineNumber(), Toast.LENGTH_LONG).show();
                    }
                    return super.onConsoleMessage(consoleMessage);
            }


            public void openFileChooser( ValueCallback<Uri> uploadMsg, String acceptType ) {
                Log.d(TAG, "openFileChooser 3.0+");
                Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType("image/*");
                context.startActivityForResult( Intent.createChooser( i, "File Chooser" ), FILECHOOSER_RESULTCODE );
            }

            public void openFileChooser(ValueCallback<Uri> uploadMsg ) {
                Log.d(TAG, "openFileChooser < 3.0");
                openFileChooser(uploadMsg, "" );
            }

            public void openFileChooser(ValueCallback < Uri > uploadMsg, String acceptType, String capture) {
                Log.d(TAG, "openFileChooser no-args");
                openFileChooser(uploadMsg);
            }
        });

        this.setWebViewClient(new WebViewClient(){
            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                super.onReceivedError(view, errorCode, description, failingUrl);
                Toast.makeText(context, failingUrl + description , Toast.LENGTH_LONG).show();
            }
        });
    }













    public void init(){
        this.getSettings().setJavaScriptEnabled(true);
        this.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        LinearLayout linLayout = new LinearLayout(context);
        linLayout.setOrientation(LinearLayout.VERTICAL);



        // specifying vertical orientation
        linLayout.setOrientation(LinearLayout.VERTICAL);
        // creating LayoutParams
//        LayoutParams linLayoutParam = new LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, MATCH_PARENT);
//        // set LinearLayout as a root element of the screen
//
//        context.setContentView(linLayout, linLayoutParam);
//        LayoutParams lpView = new LayoutParams(WRAP_CONTENT, WRAP_CONTENT);

        TextView tv = new TextView(context);
        tv.setText("TextView");
//        tv.setLayoutParams(lpView);
//        linLayout.addView(tv);
//
//        Button btn = new Button(context);
//        btn.setText("Button");
//        linLayout.addView(btn, lpView);


        LinearLayout.LayoutParams leftMarginParams = new LinearLayout.LayoutParams(
                WRAP_CONTENT, WRAP_CONTENT);
        leftMarginParams.leftMargin = 50;

        Button btn1 = new Button(context);
        btn1.setText("Button1");
        linLayout.addView(btn1, leftMarginParams);


        LinearLayout.LayoutParams rightGravityParams = new LinearLayout.LayoutParams(
                WRAP_CONTENT, WRAP_CONTENT);
        rightGravityParams.gravity = Gravity.RIGHT;

        Button btn2 = new Button(context);
        btn2.setText("Button2");
        linLayout.addView(btn2, rightGravityParams);

    }






}
