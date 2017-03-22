package axl.stf.quixot.core.datatypes.logicmodels;

import java.lang.reflect.Field;

public interface VisibilityLogic {
    boolean isVisible(Object agent, Field field, Object instance, Object value);
}
