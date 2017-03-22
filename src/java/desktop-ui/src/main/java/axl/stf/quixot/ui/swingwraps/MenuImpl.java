package axl.stf.quixot.ui.swingwraps;


import axl.stf.quixot.core.uimodel.ConditionalModel;
import axl.stf.quixot.core.uimodel.Menu;
import jdk.nashorn.api.scripting.JSObject;

import javax.swing.*;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.ArrayList;
import java.util.List;

public class MenuImpl extends JMenu implements Menu<JSObject> {



    List<Menu> submenus = new ArrayList<>();
    private JSObject visibleWhen;
    private JSObject editableWhen;

    @Override
    public Menu addItem(String text, JSObject onclick) {
           MenuItemImpl jMenuItem = new MenuItemImpl();
           jMenuItem.setText(text);
//           jMenuItem.onClick(onclick);
           jMenuItem.addActionListener(actionEvent -> onclick.call(actionEvent, actionEvent.getSource()));
           submenus.add(jMenuItem);
           this.add(jMenuItem, 0);
           return jMenuItem;
    }

    @Override
    public Menu addMenu(String text, JSObject onclick) {
        MenuImpl jMenu = new MenuImpl();
        jMenu.setText(text);
        jMenu.onClick(onclick);
        submenus.add(jMenu);
        this.add(jMenu);
        return jMenu;
    }

    @Override
    public Menu<JSObject> onClick(JSObject onclick) {
        addMouseListener(new MouseListener() {
            @Override
            public void mouseClicked(MouseEvent mouseEvent) {
                onclick.call(mouseEvent, mouseEvent);
            }

            @Override
            public void mousePressed(MouseEvent mouseEvent) {

            }

            @Override
            public void mouseReleased(MouseEvent mouseEvent) {

            }

            @Override
            public void mouseEntered(MouseEvent mouseEvent) {

            }

            @Override
            public void mouseExited(MouseEvent mouseEvent) {

            }
        });
        return this;
    }


    @Override
    public void verifyConditions() {
        System.out.println("menu ["+getText()+"] verify conditions");
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

        for (Menu menuModel: submenus){
            menuModel.verifyConditions();
        }

    }

    @Override
    public ConditionalModel<Menu, JSObject> visibleWhen(JSObject visibleWhen) {
        this.visibleWhen = visibleWhen;
        return this;
    }

    @Override
    public ConditionalModel<Menu, JSObject> enabledWhen(JSObject editableWhen) {
        this.editableWhen = editableWhen;
        return this;
    }







}
