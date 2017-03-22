
package axl.stf.quixot.ui.swingwraps;


import axl.stf.quixot.core.uimodel.ConditionalModel;
import axl.stf.quixot.core.uimodel.Menu;
import jdk.nashorn.api.scripting.JSObject;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;

public class BarMenu extends JMenuBar implements Menu<JSObject> {


    private final EventStack eventStack = new EventStack();


    List<MenuImpl> menus = new ArrayList<>();
    private JSObject _visibleWhen;
    private JSObject _editableWhen;

    @Override
    public MenuImpl addItem(String text, JSObject onclick) {
        MenuImpl jMenu = new MenuImpl();
        jMenu.setText(text);
        if(onclick != null){
            jMenu.onClick(onclick);
        }
        menus.add(jMenu);
        this.add(jMenu);
        return jMenu;
    }

    @Override
    public Menu addMenu(String text, JSObject onclick) {
        MenuImpl jMenu = new MenuImpl();
        jMenu.setText(text);
        jMenu.onClick(onclick);
        menus.add(jMenu);
        this.add(jMenu);
        return jMenu;
    }

    @Override
    public Menu<JSObject> onClick(final JSObject onclick) {
        return this;
    }


    @Override
    public void verifyConditions() {
        System.out.println("bar menue verify conditions");
        for (MenuImpl menu: menus){
            menu.verifyConditions();
        }
    }

    @Override
    public void setText(String text) {

    }

    @Override
    public String getText() {
        return null;
    }

    @Override
    public ConditionalModel<Menu, JSObject> visibleWhen(JSObject visibleWhen) {
        return null;
    }

    @Override
    public ConditionalModel<Menu, JSObject> enabledWhen(JSObject editableWhen) {
        return null;
    }








}
