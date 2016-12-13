var registeredEvents = {}, eventDispatchers = {},
browserWindow = (function(){
    if(typeof window != 'undefined'){
        return window;
    }
    return {};
})(),
browserDocument = (function(){
    if(typeof window != 'undefined' && typeof document != 'undefined'){
        return document;
    }
    return {};
})();




function dispatch(eventName) {
    if (!eventDispatchers[eventName]) {
        eventDispatchers[eventName] = 1;
    } else {
        eventDispatchers[eventName] = eventDispatchers[eventName] + 1;
    }

    var gargs = arguments;
    var rargs = [];
    for (var a = 1; a < gargs.length; a++) {
        rargs.push(gargs[a]);
    }
    if (registeredEvents[eventName]) {
        for (var i = 0; i < registeredEvents[eventName].length; i++) {
            try {
                registeredEvents[eventName][i].method.apply(null, rargs);
            } catch (ex) {
                console.log('unable to dispatch ', eventName, ' with args ', rargs, ex);
                return -1;
            }
        }
        return registeredEvents[eventName].length;
    }

    return 0
}


function hasEventListener(eventName, uidName) {
    if (!registeredEvents[eventName]) {
        return false;
    }

    if (uidName) {
        uidName = uidName + '';
        for (var i = 0; i < registeredEvents[eventName].length; i++) {
            if (registeredEvents[eventName][i].uid === uidName) {
                return true;
            }
        }
    }
    return false;
}


function addEventListener(eventName, callback, uidName) {
    if (!uidName) {
        uidName = callback + '';
    }

    if (!registeredEvents[eventName]) {
        registeredEvents[eventName] = [];
    }
    registeredEvents[eventName].push({
        method: callback,
        uid: uidName
    });
    return registeredEvents;
}


function removeEventListener(eventName, uidName) {
    if (registeredEvents[eventName]) {
        return false;
    }

    if (uidName) {
        if (typeof uidName === 'function') {
            uidName = uidName + '';
        }
        for (var i = 0; i < registeredEvents[eventName].length; i++) {
            if (registeredEvents[eventName][i].uid === uidName) {
                registeredEvents[eventName].splice(i, 1);
            }
        }
    } else {
        registeredEvents[eventName] = [];
    }
}


function removeAnimationFrame(id) {
    if(!id){
        return false;
    }
    if (browserWindow.cancelAnimationFrame) {
        browserWindow.cancelAnimationFrame(id);
    } else {
        clearTimeout(id);
    }
    return true;
}




function requestAnimationFrame(callback, delay) {
    var type = 'unknown', thisLoop =  new Date().getTime(), fps, timeoutId;
    if(!delay){
        delay = 30;
    }
    if(browserWindow.requestAnimationFrame){
        type = 'requestAnimationFrame';
        timeoutId = browserWindow.requestAnimationFrame(callback);
    }
    else if(browserWindow.mozRequestAnimationFrame){
        type = 'mozRequestAnimationFrame';
        timeoutId = browserWindow.mozRequestAnimationFrame(callback);
    }
    else if(browserWindow.msRequestAnimationFrame){
        type = 'msRequestAnimationFrame';
        timeoutId = browserWindow.msRequestAnimationFrame(callback);
    }
    else if(browserWindow.webkitRequestAnimationFrame){
        type = 'webkitRequestAnimationFrame';
        timeoutId = browserWindow.webkitRequestAnimationFrame(callback);
    }
    else if(browserWindow.oRequestAnimationFrame){
        type = 'oRequestAnimationFrame';
        timeoutId = browserWindow.oRequestAnimationFrame(callback);
    }
    else if(typeof setTimeout != 'undefined'){
        timeoutId = setTimeout(callback, 30);
        type = 'setTimeout';
    } else {
        type = 'nothing found';
        callback();
    }

    dispatch('quixot_event_appointment_done');

    return {
        type: type,
        id: timeoutId
    };
}


function getAllEvents() {
    return {
        events: registeredEvents,
        dispatchers: eventDispatchers
    }
}