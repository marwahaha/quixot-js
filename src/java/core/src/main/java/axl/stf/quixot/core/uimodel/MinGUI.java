package axl.stf.quixot.core.uimodel;

import axl.stf.quixot.core.uimodel.inputmodels.GenericInputModel;
import axl.stf.quixot.core.uimodel.inputmodels.NumericInputModel;
import axl.stf.quixot.core.uimodel.inputmodels.submitmodels.SubmitButtonModel;
import axl.stf.quixot.core.uimodel.inputmodels.TextFieldModel;

import java.util.Properties;

public abstract class MinGUI {

    public abstract WindowModel window(Object ... args);
    public abstract FormModel form();
    public abstract NumericInputModel numericInput();
    public abstract SubmitButtonModel submitButton();
    public abstract TextFieldModel textField();
    public abstract String nativeNotification(String title, String text, String image, int lifeTime,
                                     String successCallback, String failureCallback, String clickHandler, String closeHandler);



    public Properties getSysInfo(){
        return System.getProperties();
    }

    public GenericInputModel getByString(String name){
//        switch (name){
//            case "number":
//                return numericInput();
//            case "text":
//                return textField();
//        }
        if("number".equals(name)) {
            return numericInput();
        }

        if("textField".equals(name) || "text".equals(name)) {
            return textField();
        }
        return null;
    }
}
