package axl.stf.quixot.core.datatypes.annotations;

import axl.stf.quixot.core.datatypes.logicmodels.DefaultEditable;
import axl.stf.quixot.core.datatypes.logicmodels.EditableLogic;
import axl.stf.quixot.core.datatypes.logicmodels.VisibilityLogic;
import axl.stf.quixot.core.datatypes.logicmodels.DefaultVisibility;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface NumericInput {
    int max() default 100;
    int min() default 0;

    int step() default 1;


    Class<? extends VisibilityLogic> visibility() default DefaultVisibility.class;
    Class<? extends EditableLogic> editable() default DefaultEditable.class;


    String placeholder() default "";
    int value() default 0;
}
