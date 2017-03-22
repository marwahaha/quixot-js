package axl.stf.quixot.core.datatypes.logicmodels;

import java.lang.reflect.Field;

public interface EditableLogic {
    boolean isEditable(Object agent, Field field, Object instance, Object value);
}
