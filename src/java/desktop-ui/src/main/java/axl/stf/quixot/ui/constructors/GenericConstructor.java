package axl.stf.quixot.ui.constructors;

import jdk.nashorn.api.scripting.AbstractJSObject;

public class GenericConstructor extends AbstractJSObject{

    private final Class<?> t;

    public GenericConstructor(Class<?> t){
        this.t = t;
    }
    @Override
    public boolean isFunction() {
        return true;
    }

    @Override
    public Object call(Object thiz, Object... args) {
        try {
            return t.newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return null;
    }
}
