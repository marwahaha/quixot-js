package axl.stf.quixot.ui.swingwraps;

import axl.stf.quixot.core.uimodel.*;
import axl.stf.quixot.core.uimodel.inputmodels.GenericInputModel;
import axl.stf.quixot.ui.swingwraps.inputs.SubmitButton;
import jdk.nashorn.api.scripting.JSObject;

import javax.swing.*;
import java.awt.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;

public class SwingForm extends JPanel implements FormModel<JPanel, JSObject> {

   private final GridLayout gridLayout = new GridLayout(1, 0);
    List<GenericInputModel> inputModels = new ArrayList<>();
    Map<String, JSObject> models = new HashMap<>();
    private FormAction formAction =FormAction.DELETE;



    public SwingForm(){
        gridLayout.setColumns(0);
        gridLayout.setHgap(0);
        gridLayout.setVgap(0);
        gridLayout.setRows(1);
        setLayout(gridLayout);
    }

    protected void updateLayout(){
        ((GridLayout) this.getLayout()).setRows(getComponentCount());
        this.revalidate();
        this.repaint();
    }



    @Override
    public GenericInputModel addInput(String type, String name, String instanceId) {
       DesktopModelConstructor desktopModelConstructor = new DesktopModelConstructor();
       GenericInputModel genericInputModel = desktopModelConstructor.getByString(type);

        if(genericInputModel != null && genericInputModel instanceof Component){
            inputModels.add(genericInputModel);
            genericInputModel.setName(name);
            genericInputModel.setInstanceId(instanceId);
            add((Component) genericInputModel);
            updateLayout();
        }
        return genericInputModel;
    }

    @Override
    public FormModel addSeparator() {
        add(new JSeparator());
        updateLayout();
        return this;
    }

    @Override
    public FormModel setSubmit(String ok, String cancel, String reset) {
        if (ok != null && (cancel==null && reset== null)){
            SubmitButton submitButton = new SubmitButton();
            submitButton.setParentForm(this);
            submitButton.setConfirmText(ok);
            add(submitButton);
            updateLayout();
        }
        return this;
    }

    @Override
    public FormModel setSubmit(String ok, String cancel) {
        return setSubmit(ok,cancel, null);
    }

    @Override
    public FormModel setSubmit(String ok) {
        return setSubmit(ok,null, null);
    }

    @Override
    public List<GenericInputModel> getInputs() {
        return inputModels;
    }

    @Override
    public FormModel addModel(String id, JSObject object) {
        models.put(id, object);
        return this;
    }

    List<JSObject> submitCalls = new ArrayList<>();

    @Override
    public FormModel onSubmit(JSObject callback) {
        submitCalls.add(callback);
        return this;
    }

    @Override
    public Map<String, JSObject> getModels() {
        return models;
    }


    @Override
    public boolean submit() {

//
        for (GenericInputModel genericInputModel: getInputs()) {

            String instanceId = genericInputModel.getInstanceId();
            String instanceFieldName = genericInputModel.getName();
            Object model = getModels().get(instanceId);

            if (genericInputModel.isVisible() &&
                    genericInputModel.isEditable() &&
                    genericInputModel.hasValidData()){
                try {
                    if(model instanceof jdk.nashorn.api.scripting.ScriptObjectMirror){
                        jdk.nashorn.api.scripting.ScriptObjectMirror som = ((jdk.nashorn.api.scripting.ScriptObjectMirror) model);
                        som.setMember(instanceFieldName, genericInputModel.getData());
                    } else {
                        Field modif =  model.getClass().getDeclaredField(instanceFieldName);
                        if(!modif.isAccessible()) {
                            modif.setAccessible(true);
                        }
                        modif.set(model, genericInputModel.getData());
                    }
                } catch (NoSuchFieldException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            } else if (!genericInputModel.hasValidData()){
                genericInputModel.markAsInvalid();
            }

        }



        for (Map.Entry<String, JSObject> entry: getModels().entrySet()){
            for (JSObject callback: submitCalls){
                callback.call(null, entry.getKey(), entry.getValue());
            }
        }
        return false;
    }



    @Override
    public Component add(Component component) {
        Component c = super.add(component);
        updateLayout();
        return c;
    }



    @Override
    public void verifyConditions() {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
    }

    @Override
    public ConditionalModel<JPanel, JSObject> visibleWhen(JSObject visibleWhen) {
        return null;
    }

    @Override
    public ConditionalModel<JPanel, JSObject> enabledWhen(JSObject editableWhen) {
        return null;
    }


    @Override
    public SwingForm set(String property, Object value) {
        return this;
    }

    @Override
    public Object get(String property) {
        return null;
    }
}
