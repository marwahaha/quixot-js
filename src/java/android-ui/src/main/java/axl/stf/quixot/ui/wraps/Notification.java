package axl.stf.quixot.ui.wraps;

import android.webkit.WebView;
import android.widget.Toast;

public class Notification {
    private final WebView appView;

    public Notification(WebView appView){
        this.appView = appView;
    }

    public void doEchoTest(String echo){
        Toast toast = Toast.makeText(appView.getContext(), echo, Toast.LENGTH_SHORT);
        toast.show();
    }

}
