package axl.stf.quixot.ui.swingwraps;

import axl.stf.quixot.core.tween.Easing;
import axl.stf.quixot.core.tween.Tween;
import axl.stf.quixot.core.tween.TweenEvent;
import jdk.nashorn.api.scripting.JSObject;

import javax.swing.*;
import java.util.*;
import java.util.Timer;

public class NotificationCenter {



    public static NotificationCenter getInstance() {
        return instance;
    }

    private static final NotificationCenter instance = new NotificationCenter();

    private Timer globalTimer = null;

    private List<Notification> notificationContainer = new ArrayList<>();

    private NotificationCenter(){

    }



    public Notification addNotification(String title, String text){

        return addNotification(title, text, null, null, null, null, null, null);
    }


    public Notification addNotification(String title, String text, String pictureUrl){
        return addNotification(title, text, pictureUrl, null, null, null, null, null);
    }

    public Notification addNotificationNotification(String title, String text, String pictureUrl, Integer lifetime){
        return addNotification(title, text, pictureUrl, lifetime, null, null, null, null);
    }


    public Notification addNotification(String title, String text, String pictureUrl, Integer lifetime, JSObject success){
        return addNotification(title, text, pictureUrl, lifetime, success, null, null, null);
    }


    public Notification addNotification(String title, String text, String pictureUrl,
                            Integer lifetime, JSObject success, JSObject failure){
        return addNotification(title, text, pictureUrl, lifetime, success, failure, null, null);
    }

    public Notification addNotification(String title, String text, String pictureUrl,
                            Integer lifetime, JSObject success, JSObject failure, JSObject click){
        return addNotification(title, text, pictureUrl, lifetime, success, failure, click, null);
    }



    public void dispose(Notification jFrame){
        notificationContainer.remove(jFrame);
        jFrame.setVisible(false);
        jFrame.dispose();
        jFrame = null;
        checkStatus();

    }



    public Notification addNotification(String title, String text, String pictureUrl,
                            Integer lifetime, JSObject success, JSObject failure, JSObject click, JSObject close){


        Notification notification = new Notification(title, text, pictureUrl, lifetime,
               success, failure, click, close);


        int positionX =  (int) java.awt.Toolkit.getDefaultToolkit().getScreenSize().getWidth()
                - notification.getWidth();
        notification.setLocation(positionX, notificationContainer.size() * notification.getHeight() );

        notificationContainer.add(notification);

        checkStatus();
        return notification;
    }



    private void checkStatus() {
        if(notificationContainer.isEmpty()){
            return;
        }

        for (int i = 0; i < notificationContainer.size(); i++){
            Notification n = notificationContainer.get(i);
            double expectY =  n.getHeight() * i;
            n.setLocation((int) n.getLocation().getX(), (int) expectY);
        }
    }
}
