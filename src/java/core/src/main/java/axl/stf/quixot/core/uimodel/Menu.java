package axl.stf.quixot.core.uimodel;

public interface Menu extends ConditionalModel{
    String getClickHandler();
    void verifyConditions();
    void setText(String text);
    String getText();
}
