package axl.stf.quixot.ui.wraps;

import axl.stf.quixot.core.uimodel.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alexandru.Stefan on 3/14/2017.
 */
public class MenuBarContainer {

    private List<MenuWrap> menuList = new ArrayList<MenuWrap>();
    private List<SubMenuWrap> subMenuList = new ArrayList<SubMenuWrap>();


    public List<SubMenuWrap> getSubMenuList() {
        return subMenuList;
    }

    public List<MenuWrap> getMenuList() {
        return menuList;
    }

    public MenuWrap addMenu(String text, String handler) {
        MenuWrap menu = new MenuWrap(text, handler);
        menuList.add(menu);
        return menu;
    }

    public SubMenuWrap addSubMenu(String text){
        SubMenuWrap subMenuWrap = new SubMenuWrap(text);
        subMenuList.add(subMenuWrap);
        return subMenuWrap;
    }


}
