package axl.stf.quixot.core.datatypes.logicmodels;

import java.lang.reflect.Field;

public class DefaultEditable implements EditableLogic {
    @Override
    public boolean isEditable(Object agent, Field field, Object instance, Object value) {
        return true;
    }
}
