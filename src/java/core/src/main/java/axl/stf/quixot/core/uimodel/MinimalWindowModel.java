package axl.stf.quixot.core.uimodel;

/**
 * Created by Alexandru.Stefan on 3/16/2017.
 */
public interface MinimalWindowModel extends GenericModel {
    SubMenu addSubMenu(String text);
    Menu addMenu(String text, String handler);
    void setTopMost(boolean topMost);
    void setUndecorated(boolean undecorated);
    void remove();
    int display();
}
