package axl.stf.quixot.ui.wraps;

import android.graphics.Color;
import android.util.Log;
import axl.stf.quixot.android.QuixotActivityWindow;
import axl.stf.quixot.core.uimodel.FormModel;
import axl.stf.quixot.core.uimodel.GenericModel;
import axl.stf.quixot.core.uimodel.Props;
import axl.stf.quixot.core.uimodel.inputmodels.GenericInputModel;

import java.util.Locale;

/**
 * Created by Alexandru.Stefan on 3/16/2017.
 */
public class WebViewForm implements FormModel {

    private static final String TAG = "QuixotMingui-Form";
    private final WebViewEngine engine;
    private int inputs = 0;

    private volatile boolean attached = false;
    private String id;

    public WebViewForm(WebViewEngine engine){
        this.engine = engine;

        Log.d(TAG, "created");
        engine.eval("console.log('native form constructor called')");
    }

    @Override
    public WebViewForm set(String property, String value) {
        Log.d(TAG, property + " = " + value);
        if (Props.background(property)){
            engine.eval("style_dom_element('form"+getId()+"', 'background', '"+value+"')");
        }

        return this;
    }

    @Override
    public GenericModel set(String property, double a, double b, double c, double d) {
        Log.d(TAG, property + " = " + a);
        return this;
    }




    @Override
    public GenericModel addEventListener(String property, String methodName) {
        return null;
    }

    @Override
    public void removeEventListener(String listener) {

    }


    @Override
    public Object get(String property) {
        return null;
    }

    @Override
    public boolean isVisible() {
        return false;
    }


    protected String getInitContent(){
        return "create_dom_element('form"+getId()+"', 'div', '"+getId()+"', 'form')";
    }


    protected String attachToDomContent(){
        return "attach_dom_element('form"+getId()+"')";
    }

    @Override
    public void setVisible(boolean visible) {
        if(!attached){
            engine.eval(getInitContent());
            engine.eval(attachToDomContent());
        } else {
            engine.eval("style_dom_element('form"+getId()+"', 'display', 'block')");
        }

    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    @Override
    public void setEnabled(boolean enabled) {

    }

    @Override
    public GenericInputModel addInput(String type, String name, String binding) {

        inputs++;

        return null;
    }

    @Override
    public FormModel addSeparator() {
        return null;
    }

    @Override
    public FormModel setSubmit(String ok, String cancel, String reset) {
        return null;
    }

    @Override
    public FormModel setSubmit(String ok, String cancel) {
        return null;
    }

    @Override
    public FormModel setSubmit(String ok) {
        return null;
    }

    @Override
    public FormModel onSubmit(String callback) {
        return this;
    }

    @Override
    public FormModel onError(String errorCallback) {
        return null;
    }

    @Override
    public boolean submit() {
        return false;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }
}
