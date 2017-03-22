/**
 * NATO-LOGFS : NCI Agency
 * This source file is the property of the NATO Communications and Information (NCI) Agency, on behalf of NATO.
 * It may not be copied, modified, reused or distributed without the express permission of the NCI Agency.
 * Full terms and conditions are described in LICENSE.TXT, which is part of this software package.
 * Date :  3/8/2016
 * All rights reserved.
 */
package axl.stf.quixot.ui.swingwraps.inputs;

import axl.stf.quixot.core.uimodel.FormModel;
import axl.stf.quixot.core.uimodel.inputmodels.submitmodels.ConfirmButtonsModel;
import axl.stf.quixot.core.uimodel.inputmodels.GenericSubmitButton;
import axl.stf.quixot.core.uimodel.inputmodels.submitmodels.SubmitButtonModel;

import javax.swing.*;

public class ConfirmButtons extends JPanel implements ConfirmButtonsModel {
    JButton okBtn = new JButton();


    public ConfirmButtons(){
        this.setLayout(new java.awt.GridLayout());

        add(okBtn);
        okBtn.setText("OK");

        JButton cancelBtn = new JButton();
        add(cancelBtn);
        cancelBtn.setText("Cancel");
    }

    @Override
    public SubmitButtonModel setConfirmText(String text) {
        okBtn.setText(text);
        return this;
    }



    @Override
    public FormModel getParentForm() {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
    }

    @Override
    public GenericSubmitButton setParentForm(FormModel parentForm) {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
    }
}
