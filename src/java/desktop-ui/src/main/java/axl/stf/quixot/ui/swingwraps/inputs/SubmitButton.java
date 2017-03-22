
package axl.stf.quixot.ui.swingwraps.inputs;

import axl.stf.quixot.core.uimodel.FormModel;
import axl.stf.quixot.core.uimodel.inputmodels.GenericSubmitButton;
import axl.stf.quixot.core.uimodel.inputmodels.submitmodels.SubmitButtonModel;

import javax.swing.*;

public class SubmitButton extends JButton implements SubmitButtonModel {

    private FormModel parentForm;

    @Override
    public SubmitButton setConfirmText(String text) {
        this.setText(text);
        this.addActionListener(actionEvent -> getParentForm().submit());
        return this;
    }



    @Override
    public FormModel getParentForm() {
        return parentForm;
    }

    @Override
    public GenericSubmitButton setParentForm(FormModel parentForm) {
        this.parentForm = parentForm;

        return this;
    }
}
