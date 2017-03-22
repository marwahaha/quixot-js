package axl.stf.quixot.android;

import android.app.*;
import android.app.Notification;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import axl.stf.quixot.core.cli.QuixotCompiler;
import axl.stf.quixot.core.uimodel.*;
import axl.stf.quixot.ui.wraps.MenuBarContainer;
import axl.stf.quixot.ui.wraps.SubMenuWrap;
import axl.stf.quixot.ui.wraps.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class QuixotActivityWindow extends Activity implements WindowModel {


    public static final String TAG = "QuixotMingui-Activity";

    private MenuBarContainer menuBarContainer = new MenuBarContainer();
    private List<String> clicks = new ArrayList<String>();
    private Map<String, ViewModel> map = new HashMap<String, ViewModel>();
    int countViews = 0;
    private WebViewEngine webView;
    private android.view.Menu rootMenu;
    private MinGUIAndroid minGUIAndroid;
    private int notificationId = 0;

    public QuixotActivityWindow(){


    }

    public WebViewEngine getWebView() {
        return webView;
    }

    public android.view.Menu getRootMenu() {
        return rootMenu;
    }

    protected synchronized void populate(final android.view.Menu androidMenu,
                            final List<MenuWrap> menus,
                            final List<SubMenuWrap> subMenus){

        Log.d("populate", "size: " + menus.size() + " &" + subMenus.size());

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                for (final MenuWrap localMenuModel: menus){
                    final MenuItem menuItem = androidMenu.add(localMenuModel.getText());
                    localMenuModel.setMenuItem(menuItem);
                    menuItem.setOnMenuItemClickListener(new MenuItem.OnMenuItemClickListener() {
                        @Override
                        public boolean onMenuItemClick(MenuItem event) {
                            Util.executeMethodHandler(webView, localMenuModel.getClickHandler(), event);
                            return false;
                        }
                    });
                }

                for (SubMenuWrap subMenuModel: subMenus){
                    android.view.SubMenu subMenu = androidMenu.addSubMenu(subMenuModel.getText());
                    subMenuModel.setSubMenu(subMenu);
                    populate(subMenu, subMenuModel.getMenuList(), subMenuModel.getSubMenuList());
                }
            }
        });

    }

    @Override
    public boolean onCreateOptionsMenu(android.view.Menu menu) {
        this.rootMenu = menu;
        Log.d(TAG, "onCreateOptionsMenu");
        populate(menu,  menuBarContainer.getMenuList(), menuBarContainer.getSubMenuList());
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.v(TAG, "onCreateActivity");
        webView = new WebViewEngine(this);


            String c = new QuixotCompiler().getTestContent();
            Log.v(TAG, "init: "+c);
            webView.eval(c);




        setContentView(webView);




    }

    @Override
    public void onBackPressed() {
        moveTaskToBack(true);
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == WebViewEngine.FILECHOOSER_RESULTCODE){
            Log.d(TAG, "CHOOSE FILE" + data.getData().getPath());
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public QuixotActivityWindow set(String property, String value) {
        Log.d("SET", property);
        if(value != null){
            if("background".equals(property)) {
                Log.d("VAL", String.valueOf(value));
                webView.setBackgroundColor(Color.BLUE);
            }
        }
        return this;
    }

    @Override
    public GenericModel set(String property, double a, double b, double c, double d) {
        if(Props.background(property)){
            webView.setBackgroundColor(Color.argb((int) d, (int) a, (int) b, (int) c));
        }

        return this;
    }

    @Override
    public QuixotActivityWindow addEventListener(String property, String methodName) {
        if(Props.clickEvent(property)){
            clicks.add(methodName);
        }
        return this;
    }

    @Override
    public void removeEventListener(String listener) {

    }

    @Override
    public Object get(String property) {
        return null;
    }

    @Override
    public boolean isVisible() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public void setEnabled(boolean enabled) {
        Log.d("QUIXOT", "method not supported");
    }

    public synchronized MenuWrap addMenu(final String text, final String handler) {
        final MenuWrap menuWrap = menuBarContainer.addMenu(text, handler);

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (rootMenu != null){
                    MenuItem menuItem = rootMenu.add(text);
                    menuWrap.setMenuItem(menuItem);
                    menuItem.setOnMenuItemClickListener(new MenuItem.OnMenuItemClickListener() {
                        @Override
                        public boolean onMenuItemClick(MenuItem evt) {
                            Util.executeMethodHandler(webView, handler, evt);
                            return false;
                        }
                    });
                }
            }
        });

        return menuWrap;
    }

    public synchronized SubMenuWrap addSubMenu(final String text){
       final SubMenuWrap subMenuWrap = menuBarContainer.addSubMenu(text);

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if(rootMenu != null){
                    android.view.SubMenu subMenu = rootMenu.addSubMenu(text);
                    subMenuWrap.setSubMenu(subMenu);
                }
            }
        });

        return subMenuWrap;
    }

    @Override
    public void remove() {

    }

    @Override
    public int display() {
        return 0;
    }


    @Override
    protected void onNewIntent(Intent intent) {

        Log.d(TAG, intent.getStringExtra("quixot-native-notification"));
        if("click".equals(intent.getStringExtra("quixot-native-notification"))){
            NotifCNT notifCNT = notifMap.get(intent.getStringExtra("quixot-native-notification-id"));
            webView.evalMethod(notifCNT.getClickHandler());
        } else if ("dismiss".equals(intent.getStringExtra("quixot-native-notification"))){
            NotifCNT notifCNT = notifMap.get(intent.getStringExtra("quixot-native-notification-id"));
            webView.evalMethod(notifCNT.getCloseHandler());
        }

    }


    Map<String, NotifCNT> notifMap = new HashMap<String, NotifCNT>();


    private PendingIntent buildNotificationIntent(String id, String extra){
        Intent intent = new Intent(this, QuixotActivityWindow.class);
        intent.putExtra("quixot-native-notification", extra);
        intent.putExtra("quixot-native-notification-id", id);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

        return pIntent;
    }


    public String createNotification(String title, String text, String image, int lifeTime,
                                     String successCallback, String failureCallback, String clickHandler, String closeHandler) {
        // Prepare intent which is triggered if the
        // notification is selected
        notificationId++;

        String id = Build.DEVICE.trim() +
                String.valueOf(notificationId) +
                String.valueOf(Build.VERSION.SDK_INT);


        notifMap.put(id, new NotifCNT(successCallback, failureCallback, clickHandler, closeHandler));

        Log.d(TAG, id + " = notificationId");


        URL url = null;
        try {
            url = new URL(image);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        Bitmap bmp = null;//BitmapFactory.decodeResource(getResources());

        try {
            bmp = BitmapFactory.decodeStream(url.openConnection().getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }


        Log.d(TAG, R.drawable.icon + " e id");

        Log.d(TAG, "createNotification");



        PendingIntent pIntent =  buildNotificationIntent(id, "click");
        PendingIntent deleteIntent =  buildNotificationIntent(id, "dismiss");

        Notification noti;
        NotificationManager notificationManager =
                (NotificationManager) getSystemService(NOTIFICATION_SERVICE);;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            noti = new Notification.Builder(this)
                    .setContentTitle(title)
                    .setContentText(text)
                    .setSubText("   ")
                    .setSmallIcon(R.drawable.icon)
                    .setLargeIcon(bmp)
                    .setPriority(99)
                    .addAction(R.drawable.icon, text, pIntent)
                    .setContentIntent(pIntent)
                    .setDeleteIntent(deleteIntent)
                    .build();

            noti.number+=1;
            noti.flags |= Notification.FLAG_AUTO_CANCEL;
            Log.d(TAG, "JELLY BEAN");
        } else {
            noti = new Notification(R.drawable.icon, title, System.currentTimeMillis());
            Log.d(TAG, "more");
        }


        noti.number += 1;
        notificationManager.notify(0, noti);

        return  id;
    }

    @Override
    public void setTopMost(boolean topMost) {

    }

    @Override
    public void setUndecorated(boolean undecorated) {

    }

    @Override
    public String addView(ViewModel component) {
        String name;
        if (component.getId() != null){
            name = component.getId();
        } else {
            countViews++;
            name = String.valueOf(countViews);
            component.setId(name);
        }
        Log.v(TAG, "adding view "  + name);
        map.put(name, component);
        return name;
    }

    @Override
    public String addView(ViewModel component, String name) {
        map.put(name, component);
        if(!component.getId().equals(name)){
            component.setId(name);
        }
        Log.v(TAG, "adding view with name"  + name);
        return name;
    }

    @Override
    public WindowModel showView(String index) {
        map.get(index).setVisible(true);
        return this;
    }

    @Override
    public ViewModel getViewByName(String name) {
        return map.get(name);
    }


//    MinGUIAndroid minGUIAndroid;
//    public QuixotActivityWindow(){
//        minGUIAndroid = new MinGUIAndroid(this);
//        minGUIAndroid.registerEval("Some string to be executed");
//    }
//
//    @Override
//    public boolean onCreateOptionsMenu(Menu rootMenu) {
//        minGUIAndroid.onCreateOptionsMenu(rootMenu);
//
//        SubMenu menuItem = rootMenu.add("SOME MENU");
//        rootMenu.add("SOME MENU 2");
//        rootMenu.add("SOME MENU 3");
//
//        rootMenu.addSubMenu("SUBMENU 1").addSubMenu("sub sub rootMenu 1");
//        rootMenu.addSubMenu("SUBMENU 2");
//
//        return super.onCreateOptionsMenu(rootMenu);
//    }
//
//    @Override
//    public void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        minGUIAndroid.onCreate(savedInstanceState);
//
//
//
//
//
//
//
////        webView.addJavascriptInterface();
//
////        webView.getSettings().setPluginState(WebSettings.PluginState.ON);
//
//
//
//        // creating LinearLayout
////        LinearLayout linLayout = new LinearLayout(this);
////        // specifying vertical orientation
////        linLayout.setOrientation(LinearLayout.VERTICAL);
////        // creating LayoutParams
////        LayoutParams linLayoutParam = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
////        // set LinearLayout as a root element of the screen
////        setContentView(linLayout, linLayoutParam);
////
////        LayoutParams lpView = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
////
////        TextView tv = new TextView(this);
////        tv.setText("TextView");
////        tv.setLayoutParams(lpView);
////        linLayout.addView(tv);
////
////        Button btn = new Button(this);
////        btn.setText("Button");
////        linLayout.addView(btn, lpView);
////
////
////        LinearLayout.LayoutParams leftMarginParams = new LinearLayout.LayoutParams(
////                LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
////        leftMarginParams.leftMargin = 50;
////
////        Button btn1 = new Button(this);
////        btn1.setText("Button1");
////        linLayout.addView(btn1, leftMarginParams);
////
////
////        LinearLayout.LayoutParams rightGravityParams = new LinearLayout.LayoutParams(
////                LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
////        rightGravityParams.gravity = Gravity.RIGHT;
////
////        Button btn2 = new Button(this);
////        btn2.setText("Button2");
////        linLayout.addView(btn2, rightGravityParams);
//
//    }
}
