package axl.stf.quixot.core.datatypes.logicmodels;

import java.lang.reflect.Field;

public class DefaultVisibility implements VisibilityLogic {
    @Override
    public boolean isVisible(Object agent, Field field, Object instance, Object value) {
        return true;
    }
}
