package axl.stf.quixot.ui.constructors;

import axl.stf.quixot.ui.swingwraps.Window;
import jdk.nashorn.api.scripting.AbstractJSObject;

public class RootContext extends AbstractJSObject {

    @Override
    public boolean isFunction() {
        return true;
    }

    @Override
    public Object call(Object thiz, Object... args) {

        return new Window();
    }

}
