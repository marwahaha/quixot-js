//code for chrome:

//code for firefox

var isHttpOrHttps = (function () {
    if(document && document.URL) {
        var protocol = url_decode(document.URL).protocol;
        return protocol === 'http' || protocol === 'https';
    }
    return false;
})();


function _html5notification(title, text, picture, lifetime, success, failure, onclick, onclose){


    if(!__isbrowser() || !isHttpOrHttps){
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
            // currentNotification.onclick = settings.onclick;
            // currentNotification.onclose = settings.onclose;

            currentNotification.show();
        }

        else {
            currentNotification = new Notification(title, {body: text, icon: picture});
            // currentNotification.onclick = settings.onclick;
            // currentNotification.onclose = settings.onclose;
        }

        if(currentNotification){
            console.log(currentNotification);
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


function cross_notify(title, text, picture, lifetime, success, failure, onclick, onclose) {
    _html5notification(title, text, picture, lifetime, success, function () {
        _html4Winotification(title, text, picture, lifetime, success, function () {
            _html4notification(title, text, picture, lifetime, success, function () {
                console.log('TODO');
            }, onclick, onclose);
        }, onclick, onclose);
    }, onclick, onclose);
}


