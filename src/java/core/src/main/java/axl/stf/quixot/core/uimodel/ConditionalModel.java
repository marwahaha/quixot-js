
package axl.stf.quixot.core.uimodel;

@Deprecated
public interface ConditionalModel extends GenericModel{
    void verifyConditions();
    ConditionalModel visibleWhen(String visibleWhenMethodName);
    ConditionalModel enabledWhen(String editableWhenMethodName);
}
