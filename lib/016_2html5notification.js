function _html4notification_chrome(title, text, picture, lifetime, href){

    if(!__isbrowser()){
            return false;
    }


}



var HTML5Notification = (function() {


    var defaultDesktopNotification = {
        lifeTime: 5000,
        title: 'notification!',
        text: 'Here is the notification text',
        picture: 'logo.png',
        onclick: function() {
        },
        onclose: function() {
        }
    };


    var _currentNotification = {};
    var _timeoutId = false;


    function setDesktopNotification(unique, settings) {
        if (!settings) {
            settings = defaultDesktopNotification;
        } else {
            for (var i in defaultDesktopNotification) {
                if (!settings[i]) {
                    settings[i] = defaultDesktopNotification[i];
                }
            }
        }

        var currentNotification;

        function closeNotification() {
            if (currentNotification) {
                try {
                    currentNotification.cancel();
                } catch (ex) {
                }

                try {
                    currentNotification.close();
                } catch (ex) {
                }
            }
        }




        function makeChromeNotification() {
            currentNotification = window.webkitNotifications.createNotification(
                settings.picture,
                settings.title,
                settings.text
            );
            currentNotification.onclick = settings.onclick;
            currentNotification.onclose = settings.onclose;

            currentNotification.show();
            if (unique) {
                _currentNotification = currentNotification;
            }
        }


        function makeFirefoxNotification() {
            currentNotification = new Notification(settings.title, {body: settings.text, icon: settings.picture});
            currentNotification.onclick = settings.onclick;
            currentNotification.onclose = settings.onclose;
            if (unique) {
                _currentNotification = currentNotification;
            }
        }

        if (_timeoutId) {
            clearTimeout(_timeoutId);
        }
        if (unique) {
            _timeoutId = setTimeout(closeNotification, settings.lifeTime);
        } else {
            setTimeout(closeNotification, settings.lifeTime);
        }


        //code for chrome:
        if (window.webkitNotifications && BrowserDetect.browser != 'Safari') {
            if (unique) {
                closeNotification();
            }

            var havePermission = window.webkitNotifications.checkPermission();
            if (havePermission == 0) {
                makeChromeNotification();
                return 'success';
            } else if (havePermission == 1) {
                window.webkitNotifications.requestPermission();
                return 'pending-approval';
            } else {
                window.webkitNotifications.requestPermission();
                return 'failed';
            }
        }
        //code for firefox
        else if (("Notification" in window)) {
            if (unique) {
                closeNotification();
            }
            if (Notification.permission === "granted") {
                makeFirefoxNotification();
                return 'success';
            }
            else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function(permission) {
                    if (!('permission' in Notification)) {
                        Notification.permission = permission;
                    }
                    if (permission === "granted") {
                        makeFirefoxNotification();
                    }
                });
                return 'pending-approval';
            }
            return 'failed';
        }
        return 'failed';
    }



    return {
        setDesktopNotification: setDesktopNotification
    };

})();