package axl.stf.quixot.ui.swingwraps.inputs;

import axl.stf.quixot.core.uimodel.inputmodels.GenericInputModel;

import javax.swing.*;
import java.awt.*;

public class PasswordInput extends JPasswordField implements GenericInputModel {

    public PasswordInput(){
        JLabel jLabel = new JLabel();
        this.add(jLabel);
        jLabel.setText("PLACEHOLDER");
    }


    @Override
    protected void paintComponent(java.awt.Graphics g) {
        super.paintComponent(g);

        if(getText().isEmpty() && ! (FocusManager.getCurrentKeyboardFocusManager().getFocusOwner() == this)){
            Graphics2D g2 = (Graphics2D)g.create();
            g2.setBackground(Color.gray);
            g2.setFont(getFont().deriveFont(Font.ITALIC));
            g2.drawString("zip", 5, 10); //figure out x, y from font's FontMetrics and size of component.
            g2.dispose();
        }
    }



    @Override
    public void markAsInvalid() {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
    }

    @Override
    public void setInstanceId(String instanceId) {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
    }

    @Override
    public String getInstanceId() {
        throw new Error("ABSTRACT METHOD NOT IMPLEMENTED");
    }

    @Override
    public Object getData() {
        return this.getText();
    }

    @Override
    public boolean hasValidData() {
        return true;
    }
}
