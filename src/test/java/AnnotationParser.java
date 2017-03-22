import axl.stf.quixot.core.datatypes.annotations.NumericInput;
import axl.stf.quixot.core.datatypes.logicmodels.VisibilityLogic;
import axl.stf.quixot.core.uimodel.FormModel;
import axl.stf.quixot.core.uimodel.MinGUI;
import axl.stf.quixot.core.uimodel.WindowModel;
import axl.stf.quixot.core.uimodel.inputmodels.NumericInputModel;
import axl.stf.quixot.ui.swingwraps.DesktopModelConstructor;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;

public class AnnotationParser {

    protected boolean isValid(Annotation annotation){
        return annotation instanceof NumericInput;
    }

    public void scan(Object o) {

        MinGUI minGUIConstructor = new DesktopModelConstructor();

        WindowModel window = minGUIConstructor.window();

        FormModel formModel = minGUIConstructor.form();

//        formModel.setFormAction(FormAction.PUT);

        window.addView(formModel);
//        window.set("x", 200).set("y", 200).set("width", "50%").set("height", "50%");
        window.set("dimension", 200, 200, "50%", "50%");


//        formModel.addModelGeneric("myInstance", o);



        for (Field f: o.getClass().getDeclaredFields()){
            for (Annotation annotation: f.getDeclaredAnnotations()){
                if (annotation instanceof NumericInput){

                    NumericInput ni = (NumericInput) annotation;
                    Class c = ni.visibility();


                    try {


                        f.setAccessible(true);

                        System.out.println("VISIBLE??");
                        System.out.println("EDITABLE??");

                        NumericInputModel numericInputModel =
                                (NumericInputModel) formModel.addInput("number", "number", "myInstance");


                        VisibilityLogic visibilityLogic = (VisibilityLogic) c.newInstance();
                        numericInputModel.setData(f.get(o));
                        numericInputModel.setMin(ni.min())
                                .setMax(ni.max())
                                .setData(ni.value())
                                .setStep(ni.step());
                        numericInputModel.setVisible(
                            visibilityLogic.isVisible(null, f, o, f.get(o))
                        );

                        numericInputModel.setEditable(true);




                        System.out.println("VALUE = " + f.get(o));
//                        ;
                    } catch (InstantiationException e) {
                        e.printStackTrace();
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    }

                }
            }
        }


        formModel.addSeparator();
        formModel.setSubmit("ok");












        window.display();
    }
}
