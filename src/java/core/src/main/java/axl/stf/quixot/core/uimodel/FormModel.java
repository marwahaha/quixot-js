package axl.stf.quixot.core.uimodel;

import axl.stf.quixot.core.uimodel.inputmodels.GenericInputModel;


import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface FormModel extends ViewModel {


    GenericInputModel addInput(String type, String name, String binding);

//    List<GenericInputModel> getInputs();

    FormModel addSeparator();

//    FormModel addModel(String id, J object);

    FormModel setSubmit(String ok, String cancel, String reset);
    FormModel setSubmit(String ok, String cancel);
    FormModel setSubmit(String ok);



    FormModel onSubmit(String callback);
    FormModel onError(String callback);

//    Map<String, J> getModels();


    boolean submit();


}
