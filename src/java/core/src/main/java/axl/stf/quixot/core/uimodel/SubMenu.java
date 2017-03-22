package axl.stf.quixot.core.uimodel;

import java.util.List;

/**
 * Created by Alexandru.Stefan on 3/14/2017.
 */
public interface SubMenu extends ConditionalModel {
    void setText(String text);
    String getText();

    SubMenu addSubMenu(String text);
    Menu addMenu(String text, String handler);
}
