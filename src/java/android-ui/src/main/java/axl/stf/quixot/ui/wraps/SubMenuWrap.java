package axl.stf.quixot.ui.wraps;

import axl.stf.quixot.core.uimodel.ConditionalModel;
import axl.stf.quixot.core.uimodel.GenericModel;
import axl.stf.quixot.core.uimodel.Menu;
import axl.stf.quixot.core.uimodel.SubMenu;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alexandru.Stefan on 3/14/2017.
 */
public class SubMenuWrap implements SubMenu {

    private final String paramText;
    List<MenuWrap> menuList = new ArrayList<MenuWrap>();
    List<SubMenuWrap> subMenuList = new ArrayList<SubMenuWrap>();
    private android.view.SubMenu subMenu;



    public void setEnabled(boolean enabled){
        if(subMenu != null){
            subMenu.getItem().setEnabled(enabled);
        }

    }

    public void setVisible(boolean visible){
        if(subMenu != null){
            subMenu.getItem().setVisible(visible);
        }

    }

    public boolean isVisible(){
        if(subMenu != null){
            return subMenu.getItem().isVisible();
        }
        return false;
    }

    public boolean isEnabled(){
        if(subMenu != null){
            return subMenu.getItem().isEnabled();
        }
        return false;
    }


    public SubMenuWrap(String paramText){
        this.paramText = paramText;
    }

    public android.view.SubMenu getSubMenu() {
        return subMenu;
    }

    public void setSubMenu(android.view.SubMenu subMenu) {
        this.subMenu = subMenu;
    }





    public String getInstanceText() {
        return paramText;
    }

    @Override
    public void verifyConditions() {

    }

    @Override
    public ConditionalModel visibleWhen(String visibleWhenMethodName) {
        return null;
    }

    @Override
    public ConditionalModel enabledWhen(String editableWhenMethodName) {
        return null;
    }



    @Override
    public GenericModel addEventListener(String property, String methodName) {
        return null;
    }

    @Override
    public void removeEventListener(String listener) {

    }

    @Override
    public GenericModel set(String property, String value) {
        return null;
    }

    @Override
    public GenericModel set(String property, double a, double b, double c, double d) {
        return null;
    }


    @Override
    public Object get(String property) {
        return null;
    }

    @Override
    public String getText() {
        return paramText;
    }

    @Override
    public void setText(String text) {

    }

    @Override
    public SubMenu addSubMenu(String text) {
        SubMenuWrap subMenuWrap = new SubMenuWrap(text);

        subMenuList.add(subMenuWrap);


        return subMenuWrap;
    }

    public Menu addMenu(String text, String handler) {
        MenuWrap menu = new MenuWrap(text, handler);
        menuList.add(menu);
        return menu;
    }

    public List<SubMenuWrap> getSubMenuList() {
        return subMenuList;
    }

    public List<MenuWrap> getMenuList() {
        return menuList;
    }


}
