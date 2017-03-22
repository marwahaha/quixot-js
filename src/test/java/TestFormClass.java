import axl.stf.quixot.core.datatypes.annotations.NumericInput;
import axl.stf.quixot.core.datatypes.logicmodels.VisibilityLogic;

import java.lang.reflect.Field;


public class TestFormClass implements VisibilityLogic {

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    @NumericInput(visibility = TestFormClass.class,
            min = 4, max = 300, step = 2,
            value = 5, placeholder = "this is a number input with   min = 4, max = 300, step = 2,  value = 5")
    private int number = 400;


    @Override
    public boolean isVisible(Object agent, Field field, Object instance, Object value) {
        return true;
    }

    @Override
    public String toString() {
        return String.valueOf(number) + " &&& ";
    }
}
