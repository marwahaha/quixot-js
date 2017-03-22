package axl.stf.quixot.ui.wraps;

import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import android.view.Menu;
import axl.stf.quixot.android.QuixotActivityWindow;
import axl.stf.quixot.core.uimodel.*;
import axl.stf.quixot.core.uimodel.inputmodels.NumericInputModel;
import axl.stf.quixot.core.uimodel.inputmodels.TextFieldModel;
import axl.stf.quixot.core.uimodel.inputmodels.submitmodels.SubmitButtonModel;

import java.awt.*;

/**
 * Created by Alexandru.Stefan on 3/10/2017.
 */
public class MinGUIAndroid extends MinGUI{


    private Bundle savedInstanceState;
    private Menu menu;


    private final WebViewEngine webViewEngine;
    private final QuixotActivityWindow quixotActivity;


    public MinGUIAndroid(WebViewEngine webView, QuixotActivityWindow quixotActivity) {
        this.webViewEngine = webView;
        this.quixotActivity = quixotActivity;
    }

    public QuixotActivityWindow window(Object... args) {
        return quixotActivity;
    }

    @Override
    public WebViewForm form() {
        return new WebViewForm(webViewEngine);
    }


    public String nativeNotification(String title, String text, String image, int lifeTime,
                                  String successCallback, String failureCallback, String clickHandler, String closeHandler){
        return quixotActivity.createNotification(title, text, image, lifeTime, successCallback, failureCallback, clickHandler, closeHandler);
    }

    @Override
    public NumericInputModel numericInput() {
        return null;
    }

    @Override
    public SubmitButtonModel submitButton() {
        return null;
    }

    @Override
    public TextFieldModel textField() {
        return null;
    }


}
