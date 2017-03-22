package axl.stf.quixot.ui.swingwraps;

import axl.stf.quixot.core.uimodel.Menu;
import jdk.nashorn.api.scripting.JSObject;

import javax.swing.*;

public class MenuItemImpl extends JMenuItem implements Menu<JSObject> {
    private final EventStack eventStack = new EventStack();
    private JSObject visibleWhen;
    private JSObject editableWhen;
    private JSObject onclick;

    @Override
    public Menu addItem(String text, JSObject onclick) {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");

    }

    @Override
    public Menu addMenu(String text, JSObject onclick) {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
    }


    @Override
    public Menu<JSObject> onClick(JSObject onclick) {
        this.onclick = onclick;
        addActionListener(actionEvent -> onclick.call(actionEvent, actionEvent));
        return this;
    }


    @Override
    public void verifyConditions() {
        System.out.println("menu item ["+getText()+"] verify conditions");
        if (visibleWhen != null){
            try {
                setVisible((Boolean) visibleWhen.call(null));
            } catch (Exception ex){
                ex.printStackTrace();
            }
        }
        if (editableWhen != null){
            try {
                setEnabled((Boolean) editableWhen.call(null));
            } catch (Exception ex){
                ex.printStackTrace();
            }
        }
    }

    @Override
    public MenuItemImpl visibleWhen(JSObject visibleWhen) {
        this.visibleWhen = visibleWhen;
        return this;
    }

    @Override
    public MenuItemImpl enabledWhen(JSObject editableWhen) {
        this.editableWhen = editableWhen;
        return this;
    }


}
