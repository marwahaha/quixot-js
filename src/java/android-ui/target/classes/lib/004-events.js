
function event_dispatch(eventName) {
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


function event_hasEventListener(eventName, uidName) {
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


function event_addEventListener(eventName, callback, uidName) {
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


function event_removeEventListener(eventName, uidName) {
    if (registeredEvents[eventName]) {
        return false;
    }

    if (uidName) {
        if (typeof uidName === fncType) {
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
    return true;
}


function removeAnimationFrame(i) {
    if(!i){
        return false;
    }
    if (browser_window.cancelAnimationFrame) {
        browser_window.cancelAnimationFrame(i);
    }



    if(typeof clearTimeout != 'undefined'){
        try{
            clearTimeout(i);
        } catch (ex){
        }
    }


        if(typeof clearImmediate != 'undefined'){
            try{
                clearImmediate(i);
            } catch (ex){
            }
        }


    return true;
}




function event_appoint(callback, delay) {
    var type = 'unknown', thisLoop =  new Date().getTime(), fps, timeoutId;
    if(!delay){
        delay = 30;
    }
    if(browser_window.requestAnimationFrame){
        type = 'requestAnimationFrame';
        timeoutId = browser_window.requestAnimationFrame(callback);
    }
    else if(browser_window.mozRequestAnimationFrame){
        type = 'mozRequestAnimationFrame';
        timeoutId = browser_window.mozRequestAnimationFrame(callback);
    }
    else if(browser_window.msRequestAnimationFrame){
        type = 'msRequestAnimationFrame';
        timeoutId = browser_window.msRequestAnimationFrame(callback);
    }
    else if(browser_window.webkitRequestAnimationFrame){
        type = 'webkitRequestAnimationFrame';
        timeoutId = browser_window.webkitRequestAnimationFrame(callback);
    }
    else if(browser_window.oRequestAnimationFrame){
        type = 'oRequestAnimationFrame';
        timeoutId = browser_window.oRequestAnimationFrame(callback);
    }
    else if(typeof setImmediate != 'undefined'){
        timeoutId = setImmediate(callback, 30);
        type = 'setImmediate';
    }
    else if(typeof setTimeout != 'undefined'){
        timeoutId = setTimeout(callback, 30);
        type = 'setTimeout';
    }
    else {
        type = 'nothing_found';
        callback();
    }

    event_dispatch('quixot_event_appointment_done');

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