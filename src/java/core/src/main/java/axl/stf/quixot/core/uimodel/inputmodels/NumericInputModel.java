package axl.stf.quixot.core.uimodel.inputmodels;

import axl.stf.quixot.core.datatypes.annotations.NumericInput;

public interface NumericInputModel extends GenericInputModel {



    NumericInputModel setMin(int min);
    NumericInputModel setMax(int max);
    NumericInputModel setData(Object value);
    NumericInputModel setStep(int step);

    NumericInputModel setPlaceholder(String placeholder);
    String getPlaceholder();

}
