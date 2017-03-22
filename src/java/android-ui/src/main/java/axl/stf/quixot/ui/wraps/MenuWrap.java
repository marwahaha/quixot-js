package axl.stf.quixot.ui.wraps;

import android.view.MenuItem;
import axl.stf.quixot.core.uimodel.ConditionalModel;
import axl.stf.quixot.core.uimodel.GenericModel;
import axl.stf.quixot.core.uimodel.Menu;
import axl.stf.quixot.core.uimodel.SubMenu;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alexandru.Stefan on 3/14/2017.
 */
public class MenuWrap implements Menu {

    private final String paramText;
    private final String instanceHandler;

    public MenuItem getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(MenuItem menuItem) {
        this.menuItem = menuItem;
    }

    private MenuItem menuItem;


    public MenuWrap(String paramText, String instanceHandler){
        this.paramText = paramText;
        this.instanceHandler = instanceHandler;
    }

    public String getInstanceText() {
        return paramText;
    }

    public String getClickHandler() {
        return instanceHandler;
    }

    public synchronized void setEnabled(boolean enabled){
        if(menuItem != null){
            menuItem.setEnabled(enabled);
        }
    }

    public synchronized void setVisible(boolean visible){
        if(menuItem != null){
            menuItem.setVisible(visible);
        }
    }

    public synchronized boolean isVisible(){
        if(menuItem != null){
            return menuItem.isVisible();
        }
        return false;
    }

    public synchronized boolean isEnabled(){
        if(menuItem != null){
            return menuItem.isEnabled();
        }
        return false;
    }

    @Override
    public void verifyConditions() {

    }

    @Override
    public String getText() {
        return paramText;
    }

    @Override
    public void setText(String text) {

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
    public ConditionalModel visibleWhen(String visibleWhenMethodName) {
        return null;
    }

    @Override
    public ConditionalModel enabledWhen(String editableWhenMethodName) {
        return null;
    }
}
