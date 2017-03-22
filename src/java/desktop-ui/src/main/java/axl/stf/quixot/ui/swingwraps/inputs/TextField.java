
package axl.stf.quixot.ui.swingwraps.inputs;

import axl.stf.quixot.core.uimodel.inputmodels.GenericInputModel;
import axl.stf.quixot.core.uimodel.inputmodels.TextFieldModel;

import javax.swing.*;

public class TextField extends JTextField implements TextFieldModel {


    private String instanceId;

    @Override
    public void markAsInvalid() {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
    }

    @Override
    public void setInstanceId(String instanceId) {
        this.instanceId = instanceId;
    }

    @Override
    public String getInstanceId() {
        return instanceId;
    }

    @Override
    public Object getData() {
        return this.getText();
    }

    @Override
    public boolean hasValidData() {
        return true;
    }
}
