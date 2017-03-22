package axl.stf.quixot.core.uimodel.inputmodels;

import axl.stf.quixot.core.uimodel.FormModel;

public interface GenericSubmitButton
//        extends GenericInputModel
{

    FormModel getParentForm();
    GenericSubmitButton setParentForm(FormModel parentForm);
}
