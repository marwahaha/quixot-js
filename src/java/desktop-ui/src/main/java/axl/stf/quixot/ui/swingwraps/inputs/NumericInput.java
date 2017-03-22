package axl.stf.quixot.ui.swingwraps.inputs;

import axl.stf.quixot.core.uimodel.inputmodels.NumericInputModel;

import javax.swing.*;
import java.awt.*;

public class NumericInput extends JSpinner implements NumericInputModel {



    private String id;

    private SpinnerNumberModel spinnerNumberModel = new SpinnerNumberModel();

    public String getPlaceholder() {
        return placeholder;
    }

    public NumericInput setPlaceholder(String placeholder) {
        this.placeholder = placeholder;
        this.setToolTipText(placeholder);
        return this;
    }

    private String placeholder;

    public NumericInput(){
        setModel(spinnerNumberModel);
    }




    @Override
    public void markAsInvalid() {
       this.setEnabled(false);
       this.setEditable(false);
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
        this.id = id;
    }

    @Override
    public String getInstanceId() {
        return id;
    }

    @Override
    public Object getData() {
        return this.getValue();
    }

    @Override
    public boolean hasValidData() {
        return true;
    }

    @Override
    public NumericInput setMin(int min) {
        spinnerNumberModel.setMinimum(min);
        return this;
    }

    @Override
    public NumericInput setMax(int max) {
        spinnerNumberModel.setMaximum(max);
        return this;
    }

    @Override
    public NumericInput setData(Object value) {
        spinnerNumberModel.setValue(value);
        return this;
    }

    @Override
    public NumericInput setStep(int step) {
        spinnerNumberModel.setStepSize(step);
        return this;
    }
}
