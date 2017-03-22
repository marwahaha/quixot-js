package axl.stf.quixot.ui.swingwraps;

import jdk.nashorn.api.scripting.JSObject;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.net.URL;
import java.util.*;
import java.util.Timer;

public class Notification extends JFrame {

    private static final Color PRIMARY_COLOR;
    private static final Color TEXT_COLOR;

    static {
        System.out.println("jv style required for ... " + System.getProperty("os.name"));
        String osname = System.getProperty("os.name");
        if("Windows 10".equals(osname)){
            PRIMARY_COLOR = new Color(31, 63, 155);
            TEXT_COLOR = new Color(255, 255, 255);
        } else {
            PRIMARY_COLOR = java.awt.SystemColor.controlShadow;
            TEXT_COLOR = SystemColor.controlText;
        }

    }

    private  JTextArea textArea;
    private  String title;
    private  String text;
    private  String pictureURL;
    private  Integer lifetime;
    private  JSObject success;
    private  JSObject failure;
    private  JSObject onclick;
    private  JSObject onclose;
    private JLabel icon;
    private JLabel textLabel;
    private JLabel closeBtn;
    private Integer id = 0;

    public Notification(String title, String text, String pictureURL, Integer lifetime,
                        JSObject success, JSObject failure, JSObject onclick, JSObject onclose) {

        this.title = title;
        this.text = text;
        this.pictureURL = pictureURL;
        this.lifetime = lifetime;
        this.success = success;
        this.failure = failure;
        this.onclick = onclick;
        this.onclose = onclose;

        display();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    protected void display(){



        int height = 100;
        int width = height * 5;
        int diff = height / 10;
        int padding = diff / 2;
        Dimension windowDimension = new Dimension(width, height);
        Rectangle iconBounds = new Rectangle(padding, padding, height-padding, height-padding * 2);
        Rectangle closeBtnBounds = new Rectangle(width - diff - padding, padding, diff, diff);
        Rectangle titleBounds = new Rectangle(height + padding, padding, width - height - padding, diff + padding);
        Rectangle textAreaBounds = new Rectangle(
                height + padding,
                diff + padding + padding ,
                width - height - padding - padding,
                height - diff - padding - padding - padding );
        textArea = new javax.swing.JTextArea();
        closeBtn = new javax.swing.JLabel();
        icon = new javax.swing.JLabel();
        textLabel = new javax.swing.JLabel();
        textLabel.setForeground(TEXT_COLOR);
        JScrollPane jScrollPane1 = new JScrollPane();


        closeBtn.setForeground(TEXT_COLOR);
        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle(title);
        setAutoRequestFocus(false);
        setBackground(PRIMARY_COLOR);
        setEnabled(true);
        setFocusable(false);
        setForeground(new java.awt.Color(153, 255, 255));
        setIconImages(null);
        setName(title); // NOI18N
        setUndecorated(true);

        setSize(windowDimension);
        setPreferredSize(windowDimension);
        setMaximumSize(windowDimension);
        setMinimumSize(windowDimension);
        getContentPane().setBackground(PRIMARY_COLOR);

        textArea.setForeground(TEXT_COLOR);
        textArea.setDisabledTextColor(TEXT_COLOR);

        textArea.setFont(textArea.getFont().deriveFont(textArea.getFont().getStyle() | java.awt.Font.BOLD, textArea.getFont().getSize()+2));

        getContentPane().setLayout(null);


        setAlwaysOnTop(true);

        closeBtn.setFont(textLabel.getFont().deriveFont(13f));
        textLabel.setFont(textLabel.getFont().deriveFont(13f));
        closeBtn.setHorizontalAlignment(javax.swing.SwingConstants.RIGHT);
        closeBtn.setText("X");
        closeBtn.setBounds(closeBtnBounds);
        closeBtn.setBackground(PRIMARY_COLOR);
        getContentPane().add(closeBtn);

        icon.setBackground(PRIMARY_COLOR);
        icon.setText(title);
        icon.setBounds(iconBounds);



        if(pictureURL != null) {
            BufferedImage img = null;
            Image dimg = null;
            try {
                URL imageURL = new URL(pictureURL);
                img = ImageIO.read(imageURL);
                dimg = img.getScaledInstance(90, 90, Image.SCALE_SMOOTH);
            } catch (Exception ex) {
                dimg = null;
            } finally {
                if(dimg != null){
                    icon.setIcon(new ImageIcon(dimg));
                } else {
                    setDefault(icon, "/img/don-quixote-2.jpg");
                }
            }
        } else {
            setDefault(icon, "/img/don-quixote-1.jpg");
        }


        getContentPane().add(icon);


        textLabel.setText(title);
        textLabel.setBounds(titleBounds);
        getContentPane().add(textLabel);

        textArea.setColumns(10);
        textArea.setRows(2);
        textArea.setBackground(PRIMARY_COLOR);


        textArea.setOpaque(false);
        textArea.setEditable(true);
        textArea.setBorder(null);
        textArea.setEnabled(false);


        textArea.setText(text);

        jScrollPane1.setViewportView(textArea);
        jScrollPane1.setOpaque(false);

        jScrollPane1.setBorder(null);
        jScrollPane1.getViewport().setOpaque(false);
        jScrollPane1.getViewport().setBackground(PRIMARY_COLOR);
        jScrollPane1.setBounds(textAreaBounds);
        getContentPane().add(jScrollPane1);


        closeBtn.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                closeBtnMouseClicked(evt);
            }
        });

        closeBtn.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));

        getAccessibleContext().setAccessibleDescription("DESC");


        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        pack();
        setVisible(true);
    }

    private void closeBtnMouseClicked(java.awt.event.MouseEvent evt) {
       remove();
    }


    private void setDefault(JLabel iconLabel, String res){
        try{
            iconLabel.setIcon(new ImageIcon(getClass().getResource(res)));
        } catch (Exception ex){

        }
    }




    public void remove(){
        NotificationCenter.getInstance().dispose(this);
        this.setOpacity(0.5f);
    }

}
