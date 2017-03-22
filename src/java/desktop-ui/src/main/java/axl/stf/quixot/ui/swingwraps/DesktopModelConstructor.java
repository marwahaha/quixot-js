package axl.stf.quixot.ui.swingwraps;

import axl.stf.quixot.core.uimodel.FormModel;
import axl.stf.quixot.core.uimodel.MinGUI;
import axl.stf.quixot.core.uimodel.WindowModel;
import axl.stf.quixot.core.uimodel.inputmodels.NumericInputModel;
import axl.stf.quixot.core.uimodel.inputmodels.submitmodels.SubmitButtonModel;
import axl.stf.quixot.core.uimodel.inputmodels.TextFieldModel;

public class DesktopModelConstructor extends MinGUI {

    @Override
    public WindowModel window(Object... args) {
        return new Window();
    }

    @Override
    public FormModel form() {
        return new SwingForm();
    }

    @Override
    public NumericInputModel numericInput() {
        return new axl.stf.quixot.ui.swingwraps.inputs.NumericInput();
    }

    @Override
    public SubmitButtonModel submitButton() {
        return new axl.stf.quixot.ui.swingwraps.inputs.SubmitButton();
    }

    @Override
    public TextFieldModel textField() {
        return new axl.stf.quixot.ui.swingwraps.inputs.TextField();
    }
}
