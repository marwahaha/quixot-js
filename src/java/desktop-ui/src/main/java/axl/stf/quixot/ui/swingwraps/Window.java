
package axl.stf.quixot.ui.swingwraps;


import axl.stf.quixot.core.uimodel.*;
import axl.stf.quixot.core.uimodel.Menu;
import jdk.nashorn.api.scripting.JSObject;

import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Window extends JFrame implements WindowModel<Window, JSObject> {


    private final EventStack eventStack = new EventStack();
    private Map<Component, String> mapnames = new HashMap<>();
    private List<Component> views = new ArrayList<>();
    private volatile boolean menuAdded = false;
    private BarMenu barMenu;
    private CardLayout layout = new CardLayout();

    public Window() {

        getContentPane().setLayout(layout);

//        this.isEnabled()

//        this.isVisible()
    }




    public int display() {

        this.pack();
        this.setVisible(true);

        this.setDefaultCloseOperation(DISPOSE_ON_CLOSE);

        addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowClosing(java.awt.event.WindowEvent evt) {
                formWindowClosing(evt);
            }
        });

        return 0;
    }

    public int getIntFromString(String value, Integer proportion) {
        int response = 0;
        value = value.trim();
        if (value.endsWith("%")) {
            value = value.substring(0, value.length() - 1).trim();
            try {
                response = Integer.valueOf(value);
            } catch (NumberFormatException ex) {
                response = 0;
            } finally {
                if (proportion != null) {
                    return response * proportion / 100;
                }
            }
        }

        try {
            response = Integer.valueOf(value);
        } catch (NumberFormatException ex) {
            response = 0;
        }

        return response;
    }

    public Window setDimension(int a, int b, String c, String d) {
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        int ci = getIntFromString(c, (int) screenSize.getWidth());
        int di = getIntFromString(d, (int) screenSize.getHeight());

        return setDimension(a, b, ci, di);
    }


    public Window setDimension(int a, int b, int c, int d) {
        setLocation(a, b);

        Dimension e = new Dimension(c, d);

        this.setSize(e);
        this.setMaximumSize(e);
        this.setMinimumSize(e);
        this.setPreferredSize(e);




        return this;
    }

    private void formWindowClosing(java.awt.event.WindowEvent evt) {

    }



    public void remove() {
        setVisible(false);
        dispose();

    }




    @Override
    public WindowModel<Window, JSObject> set(String property, Object ... value) {
        return this;
    }

    @Override
    public Object get(String property) {
        return null;
    }

    @Override
    public Window onClose(JSObject... callbacks) {
        return null;
    }

    @Override
    public Window onResize(JSObject... callbacks) {
        return null;
    }



    @Override
    public Menu addMenu(String text, JSObject callback) {
        if (!menuAdded) {
            barMenu = new BarMenu();
            this.setJMenuBar(barMenu);
            menuAdded = true;
        }
        return barMenu.addItem(text, callback);
    }

    int count = 0;
    @Override
    public int addView(ViewModel viewModel) {
        if(viewModel instanceof Component){
            Component c = (Component) viewModel;
            count++;
            getContentPane().add(c, String.valueOf(count));
        }

        return this.getComponentCount();
    }

    @Override
    public int addView(ViewModel viewModel, String name) {
        if(viewModel instanceof Component){
            Component c = (Component) viewModel;
            count++;
            getContentPane().add(c, name);
        }
        return this.getComponentCount();
    }




    @Override
    public WindowModel showView(int index) {
        layout.show(this.getContentPane(), String.valueOf(index));
        return this;
    }

    @Override
    public WindowModel showView(String index) {
        layout.show(this.getContentPane(), String.valueOf(index));
        return this;
    }



    @Override
    public void setTopMost(boolean topMost) {
        this.setAlwaysOnTop(topMost);
    }

    @Override
    public void verifyConditions() {
        barMenu.verifyConditions();
    }


}
