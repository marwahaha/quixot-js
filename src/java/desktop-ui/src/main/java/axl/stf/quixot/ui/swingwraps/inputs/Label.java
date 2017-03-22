package axl.stf.quixot.ui.swingwraps.inputs;

import axl.stf.quixot.core.uimodel.inputmodels.GenericInputModel;

import javax.swing.*;

public class Label extends JLabel implements GenericInputModel {



    @Override
    public void markAsInvalid() {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
    }

    @Override
    public void setEditable(boolean editable) {
        this.setEnabled(editable);
    }

    @Override
    public boolean isEditable() {
        return this.isEnabled();
    }

    @Override
    public void setInstanceId(String instanceId) {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
    }

    @Override
    public String getInstanceId() {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
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
