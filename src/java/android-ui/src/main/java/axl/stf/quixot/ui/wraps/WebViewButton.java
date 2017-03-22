package axl.stf.quixot.ui.wraps;

import axl.stf.quixot.core.uimodel.GenericModel;
import axl.stf.quixot.core.uimodel.inputmodels.GenericInputModel;

/**
 * Created by Alexandru.Stefan on 3/17/2017.
 */
public class WebViewButton implements GenericInputModel {
    @Override
    public String getId() {
        return null;
    }

    @Override
    public void setId(String id) {

    }

    @Override
    public GenericModel set(String property, String value) {
        return null;
    }

    @Override
    public GenericModel set(String property, double a, double b, double c, double d) {
        return null;
    }

    @Override
    public Object get(String property) {
        return null;
    }

    @Override
    public GenericModel addEventListener(String property, String methodName) {
        return null;
    }

    @Override
    public void removeEventListener(String listener) {

    }

    @Override
    public boolean isVisible() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    @Override
    public void setVisible(boolean visible) {

    }

    @Override
    public void setEnabled(boolean enabled) {

    }

    @Override
    public void setValid(boolean valid) {

    }

    @Override
    public boolean isValid() {
        return false;
    }
}
