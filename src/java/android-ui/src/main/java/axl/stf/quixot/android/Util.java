package axl.stf.quixot.android;

import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.view.MenuItem;
import android.webkit.WebView;

/**
 * Created by Alexandru.Stefan on 3/14/2017.
 */
public class Util {

    public static final int colorFromArgs(Object ... args){
       return Color.rgb((Integer) args[0],
                (Integer) args[1],
                (Integer) args[2] );
    }

    public static synchronized void executeMethodHandler(WebView webView, String methodName, MenuItem event){
        webView.loadUrl("javascript:"+ methodName + "(" + ");");
    }

    public static synchronized void executeMethodHandler(WebView webView, String methodName, Intent event){

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("{");
        stringBuilder.append("\"action\":\""+event.getAction()+"\",");
        stringBuilder.append("\"path\":\""+event.getData().getPath()+"\"");
        stringBuilder.append("}");

        webView.loadUrl("javascript:"+ methodName + "(" +stringBuilder.toString()+ ");");
    }
}
