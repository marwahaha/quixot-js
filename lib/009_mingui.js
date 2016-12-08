quixot._fullscreenmethods = (function () {
    var REQUEST_FULLSCREEN_FUNCS = {
        'requestFullscreen': {
            'change': 'onfullscreenchange',
            'request': 'requestFullscreen',
            'error': 'onfullscreenerror',
            'enabled': 'fullscreenEnabled',
            'cancel': 'exitFullscreen',
            'fullScreenElement': 'fullscreenElement'
        },
        'mozRequestFullScreen': {
            'change': 'onmozfullscreenchange',
            'request': 'mozRequestFullScreen',
            'error': 'onmozfullscreenerror',
            'cancel': 'mozCancelFullScreen',
            'enabled': 'mozFullScreenEnabled',
            'fullScreenElement': 'mozFullScreenElement'
        },
        'webkitRequestFullScreen': {
            'change': 'onwebkitfullscreenchange',
            'request': 'webkitRequestFullScreen',
            'cancel': 'webkitCancelFullScreen',
            'error': 'onwebkitfullscreenerror',
            'fullScreenElement': 'webkitCurrentFullScreenElement'
        },
        'MSRequestFullScreen': {
            'change': 'MSFullscreenChange',
            'request': 'MSRequestFullScreen',
            'cancel': 'MSCancelFullScreen',
            'error': 'MSFullscreenError',
            'fullScreenElement': 'MSCurrentFullScreenElement'
        },
        'msRequestFullScreen': {
            'change': 'msFullscreenChange',
            'request': 'msRequestFullscreen',
            'cancel': 'msExitFullscreen',
            'error': 'msFullscreenError',
            'fullScreenElement': 'msCurrentFullScreenElement'
        }
    };

    var fullScreenMethods = false;

    if(typeof window == 'undefined') {
        return fullScreenMethods;
    }

    var TEST_NODE = document.createElement('div');



    for (var prop in REQUEST_FULLSCREEN_FUNCS) {
        var currentTest = REQUEST_FULLSCREEN_FUNCS[prop];
        for (var item in currentTest) {
            var name = currentTest[item];
            if (document[name]) {
                if (!fullScreenMethods) {
                    fullScreenMethods = {};
                }
                fullScreenMethods[item] = name;
            }

            if (TEST_NODE[name]) {
                if (!fullScreenMethods) {
                    fullScreenMethods = {};
                }
                fullScreenMethods[item] = name;
            }


            if (name in TEST_NODE) {
                if (!fullScreenMethods) {
                    fullScreenMethods = {};
                }
                fullScreenMethods[item] = name;
            }

            if (name in document) {
                if (!fullScreenMethods) {
                    fullScreenMethods = {};
                }
                fullScreenMethods[item] = name;
            }
        }
    }


    return fullScreenMethods;

})();

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








var HTML4Notification = (function() {

    var defaultDesktopNotification = {
        lifeTime: 5000,
        title: 'Cam4 Chrome notification!',
        text: 'Here is the notification text',
        picture: 'http://edgecast.cam4s.com/web/images/logo.png',
        onclick: function() {
        },
        onclose: function() {
        }
    };

    var currentNotifications = {};



    var notifySettings = {
        updateId: '',
        parent: {},
        rules: {
            'newshow': {
                lifeTime: 30000,
                onInit: function(item, list, callback) {
                    item.style.position = 'absolute';
                    item.style.right = '4px';
                    item.style.top = '1400px';
                    item.style.opacity = '0';
                    //http://stackoverflow.com/questions/18578244/displaying-elements-other-than-fullscreen-element-html5-fullscreen-api
                    item.style['z-index'] = 2147483648;
                    callback();
                },
                onUpdate: function(item, index, list, callback) {
                    console.log('on update ' + index);
                    var itemHeight = (item.offsetHeight + 10 || item.clientHeight + 10 || 100);
                    var tween;
                    var bottomTo = Utils.getPageArgs().window.height - (itemHeight * (index + 1.5) + 10);

                    if (item.style.opacity < .5) {
                        tween = new TweenMulti({opacity: 0, top: 0}, {opacity: 1, top: bottomTo}, 20, item);
                        tween.onUpdate = function(object) {
                            item.style.opacity = object.opacity;
                            item.style.top = object.top + 'px';
                        };
                    }
                    else {
                        var topFrom = Math.floor((item.style.top).replace('px', ''));
                        tween = new TweenMulti({top: topFrom}, {top: bottomTo}, 24, item);
                        tween.onUpdate = function(object) {
                            item.style.top = object.top + 'px';
                        };
                    }

                    tween.onComplete = function() {
                        callback();
                    };
                    tween.start();
                },
                onRemove: function(div, callback) {
                    var tween = new TweenMulti({opacity: 1}, {opacity: 0}, 20, div);
                    tween.onUpdate = function(object) {
                        if (div) {
                            div.style.opacity = object.opacity;
                        }
                    }


                    tween.onComplete = function() {
                        try {
                            document.body.removeChild(div);
                        } catch (ex) {

                        }
                        callback();
                    };

                    tween.start();
                }
            },
            'notification': {
                lifeTime: 5000,
                onInit: function(item, list, callback) {
                    var index = list.length - 1;
                    var lastItem = false;
                    if (list[list.length - 2]) {
                        lastItem = list[list.length - 2];
                    }

                    item.style.position = 'fixed';
                    item.style.opacity = '0';
                    item.style['z-index'] = '999999';


                    document.body.appendChild(item);
                    var itemHeight = $j(item).height() + 10;

                    if (!this._lastRight) {
                        this._lastRight = 1;
                    }
                    if (lastItem) {

                        var lastBottom = parseInt($j('#' + lastItem)[0].style.bottom);
                        item.style.bottom = lastBottom + itemHeight + 'px';
                        item.style.right = this._lastRight + 'px';
                    } else {
                        item.style.bottom = '0px';
                        item.style.right = '0px';
                    }



                    function updateNotifications() {
                        var windowHeight = $j(window).height();
                        var mainList = HTML4Notification.getNotificationList();
                        var thisList = mainList['notification'];
                        var occupiedHeight = 0;
                        var offsetY = 0;
                        var offsetX = 0;


                        function animateFix(i) {
                            if (document.getElementById(thisList[i])) {
                                var citem = document.getElementById(thisList[i]);
                                var itemHeight = $j(citem).height() + 10;
                                var itemWidth = $j(citem).width() + 10;
                                var marginBottom = (offsetX * itemHeight);
                                occupiedHeight += itemHeight;

                                var fromX = parseInt(citem.style.bottom) || 0;
                                var fromY = parseInt(citem.style.right) || 0;

                                var tween = new TweenMulti({x: fromX, y: fromY}, {x: marginBottom, y: offsetY}, 20, {});
                                tween.onUpdate = function(props) {
                                    citem.style.bottom = props.x + 'px';
                                    citem.style.right = props.y + 'px';
//                                    console.log(props);
                                };
                                tween.onComplete = function() {
                                    if (occupiedHeight > (windowHeight - itemHeight)) {

                                        occupiedHeight = 0;
                                        offsetY += itemWidth;
                                        HTML4Notification.rules.notification._lastRight = offsetY;
                                        offsetX = 0;
                                    }
                                    else {
                                        offsetX++;
                                    }

                                    animateFix(i + 1);
                                };
                                tween.start();

                            }
                        }

                        animateFix(0);





                    }

                    if (!Cam4Event.hasEventListener(Cam4Event.WINDOW_RESIZED, 'notificationUpdate')) {
                        Cam4Event.addEventListener(Cam4Event.WINDOW_RESIZED, updateNotifications, 'notificationUpdate');
                    }
                    updateNotifications();



                    this.updateNotifications = updateNotifications;
                    var tween = new TweenMulti({opacity: 0}, {opacity: 1}, 20, item);
                    tween.onUpdate = function(object) {
                        if (item) {
                            item.style.opacity = object.opacity;
                        }
                    };
                    tween.onComplete = function() {
                        callback();
                    };

                    tween.start();

                },
                onUpdate: function(item, index, list, callback) {
                },
                onRemove: function(div, callback) {
                    var tween = new TweenMulti({opacity: 1}, {opacity: 0}, 20, div);
                    var self = this;
                    tween.onUpdate = function(object) {
                        if (div) {
                            div.style.opacity = object.opacity;
                        }
                    };
                    tween.onComplete = function() {
                        callback();
                        try {
                            self.updateNotifications();
                        } catch (ex) {

                        }
                    };

                    tween.start();
                }
            }
        }
    };



    function makeId(uid, styleName) {
        return 'autoNotice' + uid + '_' + styleName;
    }


    function getStyleName(itemName) {
        if (typeof itemName === 'undefined') {
            return '';
        }
        var styleName;
        var itemTemp = itemName.split('_');
        styleName = itemTemp[itemTemp.length - 1];
        return styleName;
    }


    function checkNotification(index, list) {

        if (index < list.length) {
            var itemName = list[index];
            var styleName = getStyleName(itemName);
//            console.log('check notification ' + itemName)
            var settings;
            if (HTML4Notification.rules[styleName]) {
                settings = HTML4Notification.rules[styleName];
            } else {
                checkNotification(index + 1, list);
                return;
            }

            if (document.getElementById(itemName)) {
                settings.onUpdate(document.getElementById(itemName), index, list, function() {
                    HTML4Notification.checkNotification(index + 1, list);
                });
            }

            else {
                HTML4Notification.checkNotification(index + 1, list);
            }

        }

    }

    function addNotification(text, uid, styleName) {

        if (!HTML4Notification.rules[styleName]) {
            styleName = 'newshow';
        }


        if (!currentNotifications[styleName]) {
            currentNotifications[styleName] = [];
        }

        var settings = HTML4Notification.rules[styleName];

        var itemIdName = makeId(uid, styleName);
        if (document.getElementById(itemIdName)) {
            document.body.removeChild(document.getElementById(itemIdName));
        }

        var currentList = currentNotifications[styleName];
        var indx = currentList.indexOf(uid);

        if (indx > -1) {
            currentList.splice(indx, 1);
        }

        if (notifySettings['tid' + uid]) {
            clearTimeout(notifySettings['tid' + uid]);
        }



        notifySettings['tid' + uid] = setTimeout(function() {
            removeNotification(itemIdName, false);
        }, settings.lifeTime);


        var div = document.createElement('div');
        div.innerHTML = text;
        div.id = itemIdName;
        currentList.push(itemIdName);

        settings.onInit(div, currentList, function() {
            if (!document.getElementById(itemIdName)) {
                document.body.appendChild(div);
            }
            checkNotification(0, currentList);
        });

        return div;

    }

    function removeNotification(uid, event) {
        console.log('remove ' + uid);
        if (event) {
            try {
                event.preventDefault();
                event.stopPropagation();
            } catch (ex) {

            }
        }


        var styleName = getStyleName(uid);

        if (!HTML4Notification.rules[styleName] || !currentNotifications[styleName]) {
            return;
        }

        var settings = HTML4Notification.rules[styleName];
        var currentList = currentNotifications[styleName];

        if (currentList.indexOf(uid) > -1) {
            currentList.splice(currentList.indexOf(uid), 1);
        }

        if (document.getElementById(uid)) {
            console.log('removing ' + uid);
            settings.onRemove(document.getElementById(uid), function() {
                if (document.getElementById(uid)) {
                    document.body.removeChild(document.getElementById(uid));
                }
                checkNotification(0, currentList);
            });


        }
    }

    function removeAll(){
        for(var i in currentNotifications){
            for(var j = 0; j < currentNotifications[i].length; j++) {
                var uid = currentNotifications[i][j];
                if (document.getElementById(uid)) {
                    document.body.removeChild(document.getElementById(uid));
                }
            }
        }
        currentNotifications = [];
    }


    return {
        removeNotification: removeNotification,
        addNotification: addNotification,
        checkNotification: checkNotification,
        removeAll: removeAll,
        getSettings: function() {
            return notifySettings;
        },
        getNotificationList: function() {
            return currentNotifications;
        },
        makeId: makeId,
        rules: notifySettings.rules
    };

})();





var _num = 0;
function test_HTML4Notifications() {
    _num++;
    var data = {
        username: 'test' + '-testUser' + 'C$UID',
        time: 20000,
        imageLink: 'http://alex.cam4.com/images/logo.png',
        title: '' + _num
    };
    Cam4Notifications.uid++;
    data.lifeTime = Cam4Notifications.deltas.notificationLifetime;
    var html = '<div class="browser-notification ' + Cam4Notifications.getStyle() + '" onclick="window.open(\'/' + data.title + '\',\'_blank\'); Utils.removeNotification(' + Cam4Notifications.uid + ')">';
    html += '<div class="br-right">';
    html += '<span class="br-title">';
    html += '<span class="br-name">CAM4 - ' + data.title + '</span><span class="br-dismiss" onclick="Utils.removeNotification(' + Cam4Notifications.uid + ', event);" >X</span>';
    html += '</span>';
    html += '<span class="br-text">';
    html += data.text;
    html += '</span>';
    html += '</div>';
    html += '<div class="br-left">';
    html += '<img src="' + data.picture + '"/>';
    html += '</div>';
    html += '</div>';
    return HTML4Notification.addNotification(html, Cam4Notifications.uid, 'notification');
}


var ToolTip = (function() {

    var generatedTooltips = [];

    function on(event, text, settings) {

        var defaultSettings = {
            offsetX: 10,
            offsetY: 0,
            backgroundColor: '#000',
            color: '#FFF',
            className: 'tooltip',
            width: 'auto',
            maxWidth: '150px',
            padding: '10px',
            'font-size': '12px'
        };
        if (settings) {
            defaultSettings = Utils.mergeObjects(defaultSettings, settings);
        }



        var toolTip = document.createElement('div');
        var pagePoint = {x: 0, y: 0};
        if (typeof event === 'string') {
            var item = document.getElementById(event);
            pagePoint.x = Utils.getOffset(item).left;
            pagePoint.y = Utils.getOffset(item).top;
        }

        else if (event.domElement) {
            pagePoint.x = Utils.getOffset(event.domElement).left;
            pagePoint.y = Utils.getOffset(event.domElement).top;
        }

        else if (event) {

            if (event.pageX) {
                pagePoint.x = event.pageX;
            } else if (event.clientX) {
                pagePoint.x = event.clientX +
                    document.body.scrollLeft +
                    document.documentElement.scrollLeft;
            }

            if (event.pageY) {
                pagePoint.y = event.pageY;
            } else if (event.clientY) {
                pagePoint.y = event.clientY +
                    document.body.scrollTop +
                    document.documentElement.scrollTop;
            }

        } else {
            return false;
        }


        $j(toolTip).css({
            position: 'absolute',
            'z-index': '9999',
            width: defaultSettings.width,
            height: 'auto',
            padding: defaultSettings.padding,
            backgroundColor: defaultSettings.backgroundColor,
            left: (defaultSettings.left) || (pagePoint.x + defaultSettings.offsetX + 'px'),
            top: (defaultSettings.top) || (pagePoint.y + defaultSettings.offsetY + 'px'),
            color: defaultSettings.color,
            'border-radius': '2px',
            '-moz-border-radius': '2px',
            '-webkit-border-radius': '2px',
            'font-size': defaultSettings['font-size'],
            maxWidth: defaultSettings.maxWidth,
            opacity: '1'
        });
        if (text) {
            toolTip.innerHTML = text;
        }



        toolTip.setAttribute('id', 'autogenTooltip' +
            Math.round(Math.random() * 100));
        toolTip.setAttribute('class', defaultSettings.className);
        var parent = document.body;
        parent.appendChild(toolTip);
        var tooltipObject = {
            root: parent,
            child: toolTip
        };
        Utils.lastTooltip = tooltipObject;
        generatedTooltips.push(tooltipObject);
        return tooltipObject;
    }

    function removeAll() {
        for (var i = 0; i < generatedTooltips.length; i++) {
            var tooltipobject = generatedTooltips[i];
            try {
                tooltipobject.root.removeChild(tooltipobject.child);
            } catch (ex) {

            }
        }
    }

    return {
        on: on,
        removeAll: removeAll,
        getAll: function() {
            return generatedTooltips;
        }
    };
})();


