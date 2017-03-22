package axl.stf.quixot.ui.swingwraps.inputs;

import axl.stf.quixot.core.uimodel.inputmodels.GenericInputModel;

import javax.swing.*;

public class Slider extends JSlider implements GenericInputModel {

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
    public void setInstanceId(String id) {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
    }

    @Override
    public String getInstanceId() {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
    }

    @Override
    public Object getData() {
        return this.getValue();
    }

    @Override
    public boolean hasValidData() {
        return true;
    }


}
