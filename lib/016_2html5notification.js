//code for chrome:

//code for firefox

var isHttpOrHttps = (function () {
    if(env_isBrowser && document.URL) {
        var protocol = url_decode(document.URL).protocol;
        return protocol === 'http' || protocol === 'https';
    }
    return false;
})();


function _html5notification(title, text, picture, lifetime, success, failure, onclick, onclose){


    if(!env_isBrowser || !isHttpOrHttps){
        if(failure){
            failure();
        }
        return false;
    }



    var currentNotification = null;

    function doNotification() {
        if(window.webkitNotifications) {
            currentNotification = window.webkitNotifications.createNotification(
                picture, title, text
            );
            currentNotification.show();
        }

        else {
            currentNotification = new Notification(title, {body: text, icon: picture});

        }

        if(currentNotification) {
            currentNotification.onclick = onclick;
            currentNotification.onclose = onclose;
            currentNotification.remove = function () {
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
            if(lifetime){
                setTimeout(currentNotification.remove, lifetime);
            }

        }
    }

    if (window.webkitNotifications && browserName != 'Safari') {
        var havePermission = window.webkitNotifications.checkPermission();

        if (havePermission == 0) {
            doNotification();
        }  else {
            havePermission = window.webkitNotifications.requestPermission();
            if (havePermission == 0) {
                doNotification();
            } else if(failure){
                failure();
            }
        }
    }

    else if (('Notification' in window)) {
        if (Notification.permission === "granted") {
            doNotification();
        }
        else {
            Notification.requestPermission(function(permission) {
                if (permission === "granted") {
                    doNotification();
                } else  if(failure){
                    failure();
                }
            });
        }
    }
}






