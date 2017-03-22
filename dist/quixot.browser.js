var quixot = (function(){
var quixot_pack_info = { buildTimestamp: 1489155084993};
if(typeof console === 'undefined') {
    console = {};
    if (typeof console.log === 'undefined') {
        if(typeof java_lang_System_out !== 'undefined') {
            console.log = function (a){
                java_lang_System_out.println(''+a)
            }
        } else {
             console.log = function () {}
        }
    }
}


if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}


if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.lastIndexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

if(typeof setTimeout === 'undefined'){
    setTimeout = function () {
        console.log('setTimeout is not a function')
    }
}

if(typeof JSON === 'undefined'){
    JSON = {
        parse: function(sJSON) { return eval('(' + sJSON + ')'); },
        stringify: (function () {
            var toString = Object.prototype.toString;
            var util_isArray = Array.util_isArray || function (a) { return toString.call(a) === '[object Array]'; };
            var escMap = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'};
            var escFunc = function (m) { return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1); };
            var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
            return function stringify(value) {
                if (value == null) {
                    return 'null';
                } else if (typeof value === 'number') {
                    return isFinite(value) ? value.toString() : 'null';
                } else if (typeof value === 'boolean') {
                    return value.toString();
                } else if (typeof value === 'object') {
                    if (typeof value.toJSON === 'function') {
                        return stringify(value.toJSON());
                    } else if (util_isArray(value)) {
                        var res = '[';
                        for (var i = 0; i < value.length; i++)
                            res += (i ? ', ' : '') + stringify(value[i]);
                        return res + ']';
                    } else if (toString.call(value) === '[object Object]') {
                        var tmp = [];
                        for (var k in value) {
                            if (value.hasOwnProperty(k))
                                tmp.push(stringify(k) + ': ' + stringify(value[k]));
                        }
                        return '{' + tmp.join(', ') + '}';
                    }
                }
                return '"' + value.toString().replace(escRE, escFunc) + '"';
            };
        })()
    };
}



if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(srce, frmi) {
        var k;
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = frmi | 0;
        if (n >= len) {
            return -1;
        }
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
            if (k in o && o[k] === srce) {
                return k;
            }
            k++;
        }
        return -1;
    };
}

/**
 * @namespace quixot
 */




var strType = (typeof 'string') + '',
    nrType = (typeof 2) + '',
    objType = (typeof {}) + '',
    boolType = (typeof true) + '',
    fncType = (typeof function(){}) + '',
    alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    string_characters = alphabet + '\'";:,<.>/?[{]}=+-_)(*&^%$#@!`~\t\n ',
    alphabet = alphabet.split(''),
    string_characters = string_characters.split(''),

 

    fingerPrintData = {
        _nsp: [0],
        _errs: [0],
        rm: '',
        computerName: (function getComputerName() {
            var cname = '[unk]';
            try {
                var network = new ActiveXObject('WScript.Network');
                cname = (network.computerName);
            }
            catch (e) {
                cname = '[erunk]';
            }
            return cname;
        })(),
        dt: strType +':'+ nrType+ ':' + objType+':' + boolType+':' + fncType,
        pi: (function () {
            return Math.PI;
        })(),
        ln2: (function () {
            return Math.LN2;
        })(),
        ln10: (function () {
            return Math.LN10;
        })(),
        lg2e: (function () {
            return Math.LOG2E;
        })(),
        lg10e: (function () {
            return Math.LOG10E;
        })(),
        s12: (function () {
            return Math.SQRT1_2;
        })(),
        s: (function () {
            return Math.SQRT2;
        })(),
        _timeZoneAbbr : (function(){
            var d = new Date() + '', p = d.split('(');
            if(p.length > 0) {
                try {
                    d = p[1].split(')')[0];
                } catch (e) {
                    d = util_stringify(e, 5);
                }
                return d;
            }
            return '';
        })(),
        fun: (function () {
            var t = '';

            function c(i, m, p, g) {
                var r = '';
                if (m) {
                    if (p && g) {
                        try {
                            r =  m(p, g)
                        } catch (e) {
                            r = e+'';
                        }
                    } else {
                        try {
                            r =  m(p)
                        } catch (e) {
                            r = e+'';
                        }
                    }
                } else {
                    r = '[NS]';
                }
                return i + r;
            }

            if(typeof Math != 'undefined') {
                t+= c('imul', Math.imul, 0xfffffffe, 5);
                t+= c('acos', Math.acos, 0.5);
                t+= c('acosh', Math.acosh, 2);
                t+= c('asin', Math.asin, 0.5);
                t+= c('asinh', Math.asinh, 1);
                t+= c('atan', Math.atan, 1);
                t+= c('atanh', Math.atanh, 0.5);
                t+= c('cbrt', Math.cbrt, 2);
                t+= c('ceil', Math.ceil, -7.004);
                t+= c('clz32', Math.clz32, true);
                t+= c('cos', Math.cos, 1);
                t+= c('cosh', Math.cosh, 1);
                t+= c('exp', Math.exp, 1);
                t+= c('expm1', Math.expm1, 1);
                t+= c('floor', Math.floor, -45.95);
                t+= c('fround', Math.fround, 1.337);
                t+= c('log', Math.log, 10);
                t+= c('log10', Math.log10, 2);
                t+= c('log1p', Math.log1p, 1);
                t+= c('log2', Math.log2, 3);
                t+= c('sin', Math.sin, 1);
                t+= c('sinh', Math.sinh, 1);
                t+= c('sqrt', Math.sqrt, 2);
                t+= c('tan', Math.tan, 1);
                t+= c('tanh', Math.tanh, 1);
            }

            if (typeof NaN != 'undefined') {
                t+='NaN' + NaN;
            }

            if (Math.hypot) {
                t+='hypot'+ Math.hypot(3, 4, '5') + '#' + Math.hypot(3, 4);
            }

            return t;

        })()
    },

    evilUators = [
        'new File([],[])',
        'new Image()', 'new Blob()',
        'new AnimationEvent(1)',
        'new WebKitCSSMatrix()',
        'document.createElement(\'canvas\')',
        'document.createElement(\'video\')',
        'document.createElement(\'svg\')',
        'document.createElement(\'rect\')',
        'document.createElement(\'audio\')',
        'Math',
        'document.createElement(\'div\').style'
    ],
    evilutor_line = [],
    util_atos_memodata = {},

    registeredEvents = {},
    eventDispatchers = {},

    browser_window = (function(){
        if(typeof window != 'undefined'){
            return window;
        }
        return {};
    })(),




    browser_document = (function(){
        if(typeof window != 'undefined' && typeof document != 'undefined'){
            return document;
        }
        return {};
    })(),

    get_browser_appender = function () {
        if(browser_document){
            return browser_document.body
        }
    },


    browser_navigator = (function () {
        if(typeof navigator != 'undefined') {
            return navigator;
        }

        return browser_window.navigator || {};
    })(),
    
    browser_user_agent = (function () {
        return browser_navigator.userAgent || ' ';
    })(),
    
    browser_app_version = (function () {
        return browser_navigator.appVersion || {};
    })();

    env_isBrowser = (function () {
        return  (typeof  window != 'undefined');
    })();

    env_isNodejs = (function () {
        return (typeof module !== 'undefined' && module.exports)
    })(),

    document_getElementById = function (i) {
        return document.getElementById(i);
    },

    document_createElement = function (n, i, s, h) {
        var d = document.createElement(n);
        if(i){
            d.id = i;
        }
        if(s){
            for(var j in s){
                d.style[j] = s[j];
            }
        }

        if(h){
            d.innerHTML = h;
        }
        return d;
    },

    document_getElementSafe = function (n, i, s, h) {
        if(document_getElementById(i)){
            return document_getElementById(i);
        }
        var d = document_createElement(n, i, s, h);
        get_browser_appender().appendChild(d);
        return d;
    },

    pluginsList = [],
        
    math_round = Math.round,
    math_floor = Math.floor,
        math_random = Math.random,
    json_parse = JSON.parse,
    json_stringify = JSON.stringify,
    document_URL = (function () {
        return browser_document.URL || '';
    })(),

        document_cookie = (browser_document.cookie || ''),
        last_used_date = new Date();


    ;

var operatingSystem, browser_version_buffer, operatingSystemSub, browserName, browserVersion, javaEnabled;

for(var i = 0; i < evilUators.length; i++) {
    try {
        var e = evilUators[i], r;
        r = eval(e);
        p = util_objKeys(r), k, c;
        for(k = 0; k < p.length; k++) {
            c = p[k];
            if(evilutor_line.indexOf(c) < 0) {
                evilutor_line.push(c);
            }
        }
    } catch (e){
      ;;
    }
}

fingerPrintData.rm += evilutor_line.join('');

function fingerprint_text() {
    var t = '';
    for(var i in fingerPrintData){
        t += i + (fingerPrintData[i]);
    }
    return t;
}



function fingerprint_identifier() {
    var text = fingerprint_text().split(''), 
        resp = '', lasnum = 2,
        alphas = [], nums = [], 
        others = [], 
        escapes = '_,{}[]\/-|=()+#.;'.split(''),
        eObj = {},
        cnt1 = 0, i = 0, c, mind;
    for(i = 0 ; i < escapes.length; i++) {
        eObj[escapes[i]] = 2;  /** TODO modify this **/
    }
    
    for(i = 0; i < text.length; i++) {
        c = text[i];
        if(c === ' ' || c === '\n' || c === '\t') {
            continue;
        }
        if(escapes.indexOf(c) > -1) {
            resp+=util_atos(eObj[c]);
            eObj[c]++;
            continue;
        }
        if(util_isAlpha(c)) {
            if(i % 2 == 0) {
                resp+=c;
            } else {
                resp = c+resp;
            }
        } else {
            if(+c) {
                lasnum = parseInt(c);
            }
            mind = math_round(resp.length / lasnum);
            resp = resp.substring(0, mind) + c + resp.substring(mind, resp.length);
        }
    }
    return resp;
}



function fingerprint_numbers(){
    var t = fingerprint_text().split(''), n = '';
    for( var i = t.length ; i > 0; i--){
        var c = t[i];
        if(+c || c === '0') {
            n+=c;
        }
    }
    return n;
}


function fingerprint_data() {
    return fingerPrintData;
}

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
function ste_time_interval(n, s) {
    switch(s+''.toLowerCase()) {
        case 'nano':
            return n;
        case 'seconds':
        case 'second':
            return n * 1000;
        case 'minutes':
        case 'minute':
            return n * ste_time_interval(60, 'seconds');
        case 'hour':
        case 'hours':
              return n * ste_time_interval(60, 'minute');
        case 'day':
        case 'days':
            return n * ste_time_interval(24, 'hour');
        case 'month':
        case 'months':
              return n * ste_time_interval(30, 'day');
        case 'year':
        case 'years':
              return n * ste_time_interval(365, 'day');

    }

    return 0;
}


function time_date_add(d, n, s){
    if(util_isDate(d) && util_isNumber(n) && s){
        d.setTime(d.getTime() + ste_time_interval(n, s));
    }

    if(util_isDate(d) && util_isNumber(n) && !s){
        d.setTime(d.getTime() + n);
    }
    return d;
}

function time_date_roll(d, n, s){
    if(util_isDate(d) && util_isNumber(n) && s){
        d.setTime(d.getTime() - ste_time_interval(n, s));
    }

    if(util_isDate(d) && util_isNumber(n) && !s){
        d.setTime(d.getTime() - n);
    }
    return d;
}


function date_to_string(d, m) {
    if(m === 'cookie'){
        if(d.toUTCString){
            return d.toUTCString();
        }

        if(d.toGMTString){
            return d.toGMTString();
        }

        if(d.toString()){
            return d.toString();
        }

        return d+'';
    }
}


function date_Diff(l,r) {
    if(l.getTime && r.getTime){
        return l.getTime() - r.getTime();
    }
    return 0;
}


function time_next_date() {
    var _date = new Date();
    while(date_Diff(_date, last_used_date) <=0 ){
        time_date_add(_date, 1);
    }

    last_used_date = _date;
    return _date;
}
function util_getMethodCaller(args){
    if(args && args.calee && args.callee.caller) {
        var fline =  args.callee.caller + '';

        return fline;
    }

    return '';
}


function util_objKeys(obj) {
    if(!obj){
        return [];
    }
    var k = [];
    for(var i in obj){
        k.push(i);
    }
    return k;
}

function util_simplify(obj) {
    var r = {};
    for(var i in obj) {
        if(util_isPrimitive(obj[i])) {
            r[i] = obj[i] + '';
        }
    }
    return r;
}

function util_serialize(obj, stackno,
                   zeroval, trueval, falseval,
                   functval, doubleQuotes, comma, twodots,
                   r1, r2, d1, d2, stackexit){

    if(!stackno ) {
        stackno = 3;
    }

    if(obj === 0) {
        return zeroval;
    }

    if(typeof obj === nrType) {
        return ''+obj;
    }
    if(!obj) {
        return falseval;
    }
    if(obj === true) {
        return trueval;
    }
    if(util_isPrimitive(obj)) {
        return doubleQuotes + obj + doubleQuotes;
    }

    if(util_isFunction(obj)) {
        return functval;
    }

    if(util_isArray(obj)) {
        var r = r1;
        for(var i = 0; i < obj.length; i++) {
            r += util_serialize(obj[i], stackno,
                zeroval, trueval, falseval,
                functval, doubleQuotes, comma, twodots,
                r1, r2, d1, d2, stackexit);

            if(j < obj.length -1) {
                r+=comma;
            }
        }
        r+=r2;
        return r;
    }

    if(stackno < 2) {
        return stackexit;
    }

    var keys = util_objKeys(obj);
    var r = d1, n = 0;
    for (var j in obj) {
        n++;
        var value = util_serialize(obj[j], stackno -1,
            zeroval, trueval, falseval,
            functval, doubleQuotes, comma, twodots,
            r1, r2, d1, d2, stackexit);
        r+=j + twodots + value;
        if(n < keys.length -1) {
            r+=comma;
        }
    }

    r+=d2;

    return r;
}


function util_encodeObject(obj, stackno) {
    return util_serialize(obj, stackno, '','','','','','','','','','','','','');
}


function util_stringify(obj, stackno) {
    return util_serialize(obj, stackno, 0, 'true', 'false', '"[funct]"', '"', ',', ':', '[', ']', '{', '}', '[stack]');
}


function util_array_each(a, c){
    for(var i = 0; i < a.length; i++){
        c(i, a[i])
    }
}

function util_obj_each(o, c){
    for(var i in o){
        c(i, o[i]);
    }
}

function system_getPerformance(){
    return browser_window.performance ||
        browser_window.mozPerformance ||
        browser_window.msPerformance ||
        browser_window.webkitPerformance || {};
}


function util_isPrimitive(d){
    return ( util_isNumber(d) || typeof d === strType || typeof d === nrType || typeof d === boolType);
}

function util_isNumber(n) {
    return !isNaN(n);
}

function util_isDate(o) {
    if(o && o.getTime && o.setTime){
        return util_isNumber(o.getTime());
    }

    return false;

}

function util_isFunction(d){
    return typeof d === fncType;
}

function util_isArray(d){
    return Array.isArray(d);
}

function util_isAlpha(c){
    return alphabet.indexOf(c) > -1;
}

function util_atos(numval, strlist, zval) {

    if(numval < 0){
        numval = Math.abs(numval);
    }

    if(!zval) {
        zval = 0;
    }

    if(!strlist) {
        strlist = alphabet;
    }

    if(util_isPrimitive(strlist)){
        strlist = strlist.split('');
    }

    
    var response, pid = numval + '' + strlist.join('') + zval+'';
    if(util_atos_memodata[pid]) {
        return util_atos_memodata[pid];
    }


    if(strlist.length === 1) {
        response = new Array(numval.length).join(strlist[0]);
        util_atos_memodata[pid] = response;
        return response;
    }

    if(numval === 0) {
        return strlist[0];
    }

    if(  ( (numval+'' == '0' || numval.length > 0) && (numval+'').split('')[0] == '0') ){
        if(zval > strlist.length - 1) {
            zval = 0;
        }
        var rest = numval.substring(1, numval.length);


        if(rest) {
            response = strlist[zval] + util_atos(rest, strlist, zval+1);
            util_atos_memodata[pid] = response;
            return response;
        } else {
            return strlist[zval];
        }
    }


    if(!(+numval) || numval instanceof Date) {
        numval = numval+'';
        response = numval.split('')[0];
        rest = numval.substring(1, numval.length);

        if(+response) {
            response = util_atos(response, strlist, zval);
        }

        if(rest) {
            rest = util_atos(rest, strlist, zval);
            response+=rest;
        }
        util_atos_memodata[pid] = response;
        return response;
    }



    var varFloat = parseFloat(numval);


    if(varFloat < strlist.length) {
        if(varFloat % 1 == 0) {
            response = strlist[parseInt(varFloat)];
            util_atos_memodata[pid] = response;
            return response;
        } else {
            var rest = varFloat % 1;
            if(rest < 1) {
                rest *= 10;
            }
            response = util_atos(math_floor(varFloat), strlist, zval) + util_atos(rest, strlist, zval);
            util_atos_memodata[pid] = response;
            return response;
        }
    }
    if(varFloat % 1 == 0) {
        if(varFloat < 10) {
            response = util_atos(1, strlist, zval ) + util_atos(varFloat - 1, strlist, zval);
            util_atos_memodata[pid] = response;
            return response;

        }
        response = util_atos(math_floor(varFloat / 10), strlist, zval ) + util_atos(varFloat % 10, strlist, zval);
        util_atos_memodata[pid] = response;

        return response;
    }

    rest = varFloat % 1;
    if(rest < 1) {
        rest*=10;
    }
    response = util_atos(math_floor(varFloat), strlist, zval) + util_atos(rest, strlist, zval);
    util_atos_memodata[pid] = response;
    return response;
}


function util_stringToHex(integer) {
    var str = parseInt(integer).toString(16);
    return str.length === 1 ? '0' + str : str;
}


function util_rgbToHex(r, g, b) {
    return '#' + util_stringToHex(r) + util_stringToHex(g) + util_stringToHex(b);
}


function util_rgbToHexShift(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


function util_dom_id(p) {
    if(p){
        return util_random_string() +  p + util_incr();
    }
    return util_random_string() +  util_incr();
}


function util_aton(i, s){
    if(+i){
       return i;
    }

    var p = (i+'').split(''), r = '';
    util_array_each(i, function(j, o) {


        if(s && j > 0){
            r+=s;
        }

        if(string_characters.indexOf(o) > -1){
            r+=string_characters.indexOf(o) + 1;
        }
        else  if(+o){
            r+=o;
        }
        else {
            r+= util_incr();
        }
    });

    return r;
}

function util_strip_quotes(_key) {
    if(_key.startsWith('\'') && _key.endsWith('\'')){
        _key = _key.substring(1,_key.length -1);
    }

    if(_key.startsWith('"') && _key.endsWith('"')){
        _key = _key.substring(1,_key.length -1);
    }

    return _key;
}

function util_array_shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



function util_random_string(_strlist) {

    var _date = new Date(), _methods = ['Date', 'Milliseconds', 'Minutes',
        'Day', 'Date', 'Month', 'FullYear', 'Year', 'TimezoneOffset'],
        _str_date = _date + '',
        _sum = util_atos(util_randNr(0, 999999999), _strlist) + '';
    _methods = util_array_shuffle(_methods);
        util_array_each(_methods, function (_index, _item) {
            var _value = null;
            try {
                console.log('calling date get'+ _item);
                _value = _date['get' + _item]();
            } catch (_exception){
              _value = null;
            } finally {
                if(_value != null){
                    _sum += util_atos(_value, _strlist) + '';
                }
            }
        });
    last_used_date = _date;
    return _sum;

}



function util_incr(asfloat) {
    if (asfloat) {
        cache_old_val+=0.01;
    } else {
        cache_old_val = parseInt(cache_old_val+1);
    }
    cache_getInstance('@qtst').put('lup', cache_old_val);
    return cache_old_val;
}


function util_randInt(min, max) {
    return math_round(util_randNr(min, max))
}




function util_randNr(min, max) {
    if(min || (min === 0 && +max) ){
        if(!+min) {
            min = 1;
        }

        if(max){
            if(!+max) {
                max = 2;
            }
            return min + (math_random() * (max - min) );
        }

        return (math_random() * min);
    }


    return time_next_date().getTime();

}var webGL = false;

if (env_isBrowser) {
    try {
        var canvas = document_createElement('canvas');

        if(canvas.getContext('webgl')) {
            fingerPrintData.webgctx = 'webgl';
        } else if (canvas.getContext('experimental-webgl')){
            fingerPrintData.webgctx = 'experimental-webgl';
        }

        try {
            fingerPrintData.canvasData = canvas.toDataURL("image/jpeg")+'';
            fingerPrintData.canvasDataPNG = canvas.toDataURL();
        }catch (e) {
            fingerPrintData.canvasData = 'np';
        }

        webGL =  (!!browser_window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ) );

        if(webGL) {
            try {


                var dbgRenderInfo = webGL.getExtension("WEBGL_debug_renderer_info");
                fingerPrintData.glURWG  =
                    webGL.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);

                fingerPrintData.glUVGL  =
                    webGL.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);

                fingerPrintData.glVR  =
                    webGL.getParameter(webGL.VERSION);

                fingerPrintData.glSLV  =
                    webGL.getParameter(webGL.SHADING_LANGUAGE_VERSION);
                fingerPrintData.glVND  =
                    webGL.getParameter(webGL.VENDOR);


                fingerPrintData.rm+=util_objKeys(webGL).join('');
            } catch (e) {
                fingerPrintData._errs.push(e+'');
            }
        }


    } catch(e) {
        fingerPrintData._errs.push(e+'');
        webGL = false;
    }

}
var requirememo = {};



function __require(modulename) {
    if (env_isNodejs) {
        if (requirememo[modulename]) {
            return requirememo[modulename];
        }
        logger_defaultInstance.info(modulename);
        requirememo[modulename] = require(modulename);
        return requirememo[modulename];
    }


    if(modulename === 'fs'){
        return {
            existsSync: function () {
                return false;
            },
            mkdirSync: function () {
                return false;
            },
            writeFileSync: function () {

            },
            readFileSync: function () {
                
            }
        }
    }
    console.log('[usage in this context not implemented for requirement ' + modulename + ']');
    return {}
}


var requirememo = {};



function __require(modulename) {
    if (env_isNodejs) {
        if (requirememo[modulename]) {
            return requirememo[modulename];
        }
        logger_defaultInstance.info(modulename);
        requirememo[modulename] = require(modulename);
        return requirememo[modulename];
    }


    if(modulename === 'fs'){
        return {
            existsSync: function () {
                return false;
            },
            mkdirSync: function () {
                return false;
            },
            writeFileSync: function () {

            },
            readFileSync: function () {
                
            }
        }
    }
    console.log('[usage in this context not implemented for requirement ' + modulename + ']');
    return {}
}

/**
 * TODO suport unescape...
 */
function url_decodeURI(strd) {
    return decodeURIComponent(strd)
}


function url_getValFromHttpParam(val) {
    if(val.indexOf && val.indexOf(',') > -1) {
        return (val+'').split(',')
    }
    if(+val) {
        return parseFloat(val);
    }

    var obj =null;
    try {
        obj = json_parse(url_decodeURI(val));
    } catch (ex){
        obj = null;
    } finally {
        if(obj != null) {
            return obj;
        }
    }
    return val+'';

}



function url_decode(url){
    if (!url) {
        return null;
    }
    var protocol = false;
    if(url.indexOf('http://') == 0) {
        protocol = 'http';
    }
    else if(url.indexOf('https://') == 0) {
        protocol = 'https';
    } else {
        protocol = url.split(':')[0];
    }
    var _urlParts = url.replace(protocol + '://', '').split('/');

    var response = {},

        arr = _urlParts[_urlParts.length -1].split('?'),
        lastPage = arr[0];

    if(arr.length > 1) {
        var last = arr[1];
        var parts = last.split('&');

        if (parts.length >= 1) {
            for (var i = 0; i < parts.length; i++) {
                var keyVal = parts[i].split('=');
                if (keyVal.length > 1) {
                    response[keyVal[0]] = url_getValFromHttpParam(keyVal[1]);
                } else {
                    response[keyVal[0]] = false;
                }
            }
        }
    }

    return {
        lastPage: lastPage,
        parts: _urlParts,
        url: url,
        protocol: protocol,
        params: response
    };
}



function url_current_params() {
    if(document_URL){
        return url_get_params(document_URL);
    }
    return {
        params: {}
    };
}


function url_current_search() {
    if(browser_window.location &&  browser_window.location.search){
        return  browser_window.location.search
    }
    return '';
}


function url_get_params(url) {
    return url_decode(url).params;
}



function url_getDomainFromUrl(url){
    url = url + '';
    var domain = (url.indexOf('://') > -1) ? url.split('/')[2] : url.split('/')[0];
    if(domain){
        return domain.split(':')[0];
    }
    return 'localhost';
}


function url_currentDomain() {
    if(browser_document.domain){
        return browser_document.domain;
    }
    if(document_URL){
        return url_getDomainFromUrl(document_URL);
    }
    return 'localhost';
}


function url_current_path() {
    if(browser_window.location && browser_window.location.pathname){
        return browser_window.location.pathname
    }
    return '';
}

function url_querify(object) {
    var cont = [], text = '';
    if (object != null){
        for (var i in object) {
            if(i && object[i]){
                
                cont.push({
                    pp: i,
                    vl: util_strip_quotes(json_stringify(object[i]))
                });
            }
        }
        for(var j = 0; j < cont.length; j++) {
            text += cont[j].pp + '=' + cont[j].vl;
            if(j < cont.length -1) {
                text+='&';
            }
        }
        return text;
    }
}var logger_defaultConfiguration = {
        appenders: [logger_default_dom_appender, logger_default_console_appender],
        logStack: true
    },
    logger_options_key = 'logopts';


    function logger_default_dom_appender(n, l, d) {
        if(!env_isBrowser){
            return;
        }
        var v, i= 'qfa', dc = document, r = ' (<i><b>' + n + '</b></i> : ' + d.timestamp + ')';
        v = document_getElementSafe('div', 'qfa', {
            border: '1px solid black',
            margin : '2%',
            padding : '1%'
        }, '<button onclick="document.getElementById(\''+i+'\').style.display=\'none\'">close</button>');
        var t = '<span style="display:block;color:';
        switch (l){
            case 'warn':
                t+='orange';
                break;
            case 'error':
                t+='red';
                r+='<span style="display: block;">'+d.stack.join('<br />') + '</span>';
                break;
            case 'info':
                t+='green';
                break;

            default:
                t+='black';
        }
        t+='"> <b style="margin-right: 2px">' + json_stringify(d.message) + '</b>' + r + '</span>';
        v.innerHTML += t;
    }


    function logger_default_console_appender(name, level, data) {
        if(!env_isBrowser){
            console.log(' [ ' + name + '.'+level + ' '+ json_stringify(data.message) + ' ]');
            return;
        }

        if(level === 'error'){
            console.error(name + '.'+level , data.message, data.timestamp);
        }
        else if(level === 'warn'){
            console.warn(name + '.'+level , data.message, data.timestamp);
        }
        else {
            console.log(name + '.'+level , data.message, data.timestamp);
        }

    }




    

    function logger_getConfigFromUrl() {
        if(logger_options_key){
            return url_current_params()[logger_options_key];

        }
        return r;
    }

    function logger_getStack(pe) {
        if (pe && pe.stack) {
            return pe.stack.split('\n');
        }
        try {
            throw new Error();
        }
        catch(e) {
            if (e.stack) {
                return e.stack.split('\n');
            }
        }
    }


    function LogInstance(name, _configuration) {
        var sessionLogs = {};

        var urlConfig = logger_getConfigFromUrl();

        if(urlConfig){
            console.log(urlConfig);
            var _local_data = urlConfig[name] || urlConfig['ALL'];

            if(_local_data){
                if(_local_data.consoleAppender){
                    _configuration.appenders.push(logger_default_console_appender);
                }
                if(_local_data.fileAppender && env_isBrowser){
                    _configuration.appenders.push(logger_default_dom_appender);
                }
            }

        }



        

        function log(level, message) {

            var localConfig;
            if(_configuration[level]){
                _localConfiguration = _configuration[level];
            } else {
                _localConfiguration = _configuration;
            }

            if(!sessionLogs[level]) {
                sessionLogs[level] = [];
            }



            var stackData = false;
            if(message instanceof Error){
                stackData = logger_getStack(message);
            } else if(_configuration.logStack){
                stackData = logger_getStack()
            }

            var chematoru;

            try {
                chematoru = (arguments.callee.caller);
            } catch(e) {
                chematoru = e;
            }

            var now = new Date();
            var obj = {
                timestamp: now,
                message: message,
                stack: stackData,
                caller: chematoru
            };
            sessionLogs[level].push(obj);

            util_array_each(_configuration.appenders, function (i, o) {
                o(name, level, obj)
            });

            return sessionLogs[level];
        }


        function error(message) {
            log('error', message);
        }


        function warn(message) {
            log('warn', message);
        }

        return {
            log: log,
            error: error,
            warn: warn,
            info: function (message) {
                log('info', message);
            },
            trace: function (message) {
                log('trace', message);
            },
            getLogs: function () {
                return sessionLogs;
            },
            getConfig: function () {
                return _configuration;
            },
            setConfig: function (p) {
                _configuration = p;
            }
        }
    }


    var logger_defaultInstance = new LogInstance('quixot', logger_defaultConfiguration),
        
    logger_container = {
        'quixot': logger_defaultInstance
    };

    function logger_getInstance(instancename, config) {
        var instanceConfig = logger_defaultConfiguration;
        if(config){
            for(var i in config) {
                instanceConfig[i] = config[i];
            }
        }
        if(!logger_container[instancename]){
            logger_container[instancename] = new LogInstance(instancename, instanceConfig);
        }
        return logger_container[instancename];
    }
    

    
    function logger_setoptkey(p) {
        logger_options_key = p;
    }
    
    function logger_getContainer() {
        return logger_container;
    }




    function getCookie(name) {
        if(typeof document == 'undefined'){
            return;
        }
        document_cookie = document.cookie;

        function getCookieValue(offset) {
            var endstr = document_cookie.indexOf(';', offset);
            if (endstr == -1) {
                endstr = document_cookie.length;
            }
            return unescape(document_cookie.substring(offset, endstr));
        }

        var arg = name + "=",
            alen = arg.length,
            clen = document_cookie.length,
            i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document_cookie.substring(i, j) == arg)
                return getCookieValue(j);
            i = document_cookie.indexOf(" ", i) + 1;
            if (i === 0)
                break;
        }

        return null;
    }

    function updateCookie(name, value, p_expires, p_path, p_domain, p_secure) {
        deleteCookie(name, p_path, p_domain);
        cookie_setCookie(name, value, p_expires, p_path, p_domain, p_secure);
    }


    function cookie_setCookie(name, value, p_expires, p_path, p_domain, p_secure) {


        
        var expires = p_expires ? p_expires : null;

        if (typeof expires == nrType) {
            expires = time_date_add(new Date(), expires);
        }

        var path = p_path ? p_path : null;
        var domain = p_domain ? p_domain : null;
        var secure = p_secure ? p_secure : false;

        var cookieSuffix = ((expires === null) ? "" : ("; expires=" + (date_to_string(expires, 'cookie')))) +
            ((path === null) ? "" : ("; path=" + path)) +
            ((domain === null) ? "" : ("; domain=" + domain)) +
            ((secure === true) ? "; secure" : "");


        var cookieStr = name + "=" + escape(value) + cookieSuffix;

        if(env_isBrowser){
            document.cookie = cookieStr;
        }

        return cookieStr;

    }


    function deleteCookie(name, p_path, p_domain) {
        return cookie_setCookie(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), p_path, p_domain);
    }


   
 var envData = {
    jsEngine: {
        isNodeJs: env_isNodejs,
        isBrowser: env_isBrowser
    },
    javaEnabled: false,
    tempDir: '',
    homeDir: false,
    javaPath: false
};

if(typeof process != 'undefined' && process.env){
    for(var i in process.env){
        envData[i] = process.env[i];
        fingerPrintData['process_env' + i] = process.env[i];
    }
    var p = __require('path');
    envData.homeDir = (process.env.HOME || process.env.USERPROFILE);
    envData.tempDir = (process.env.TEMP || process.env.TMP || process.env.APPDATA);

    if(process.env.JRE_HOME){
        envData.javaEnabled = true;
        envData.javaPath = process.env.JRE_HOME + p.sep + 'bin' + p.sep + 'java';
    }
    else if(process.env.JAVA_HOME){
        envData.javaEnabled = true;
        envData.javaPath = process.env.JAVA_HOME + p.sep + 'bin' + p.sep + 'java';
    }


}

if(!envData.homeDir){
    try {
        env.homeDir = __require('os').homedir();
    } catch (e) {}
}

if(!envData.tempDir){
    try {
        env.homeDir = __require('os').tmpdir();
    } catch (e) {}
}



var system_battery = (function () {
    if(typeof navigator != 'undefined') {
        return navigator.battery || navigator.webkitBattery || navigator.mozBattery || {};
    }
    return false;
})(),

screen_info = (function () {

    var width, height, availWidth, availHeight, colorDepth, pixelDepth;
            if (browser_window.screen) {
                if(browser_window.screen.width) {
                    width = browser_window.screen.width;
                }

                if(browser_window.screen.height) {
                    height = browser_window.screen.height;
                }

                if(browser_window.screen.availHeight) {
                    availHeight = browser_window.screen.availHeight;
                }

                if(browser_window.screen.availWidth	) {
                    availWidth = browser_window.screen.availWidth	;
                }

                if(browser_window.screen.colorDepth	) {
                    colorDepth	= browser_window.screen.colorDepth	;
                }

                if(browser_window.screen.pixelDepth	) {
                    pixelDepth	 = browser_window.screen.pixelDepth	;
                }
            }

            return {
                width: width,
                height: height,
                availWidth: availWidth,
                availHeight: availHeight,
                colorDepth: colorDepth,
                pixelDepth: pixelDepth
            }

})(),

os_info = (function () {
    if(typeof process != 'undefined'){
        var isWin = /^win/.test(process.platform + '');
        if(isWin && envData.javaPath){
            envData.javaPath += '.exe';
        }
    }

    if(env_isNodejs){
        var nos = __require('os');
        return {
            name: ( nos.type ? nos.type() : ( nos.platform ? nos.platform() : '') ),
            version: (nos.release ? nos.release() : '')
        }
    }
    return {}
})();

    function getCacheNamed(name) {
        var data = getNodeJsCache();
        if(data[name]){
            return data[name];
        }
        return {};
    }


    function getCachePath() {
        var fs = __require('fs');
        var p = __require('path');
        var path = envData.homeDir + p.sep + ".cache";
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        path += p.sep + "quixot.cache.json";

        return path;
    }

    function saveNodeJsCache(newdata) {
        var path = getCachePath(), fs = __require('fs');
        var line = fs.readFileSync(path, "utf8");
        var oldData;
        try {
            oldData  = JSON.parse(line);
        }catch (ex){
            print('jvm err');
            return;
        }

        if(oldData && newdata){
            var props = 0;
            for(var i in newdata){
                oldData[i] = newdata[i];
                props++;
            }

            if(props > 0){
                fs.writeFileSync(path, json_stringify(oldData));
            }
        }
    }

    function removeNodeJsCache(keyname, slot) {
        var path = getCachePath(), fs = __require('fs');
        var line = fs.readFileSync(path, "utf8");
        var oldData = JSON.parse(line);
        var obj = oldData[keyname];
        delete obj[slot];
        fs.writeFileSync(path, json_stringify(oldData));
    }

    function getNodeJsCache() {
        var path = getCachePath(), fs = __require('fs');
        if (!fs.existsSync(path)) {
            var initData = {
                creationDate: new Date(),
                writer: 'quixot'
            };
            fs.writeFileSync(path, json_stringify(initData));
            return initData;
        }
        var line = fs.readFileSync(path, "utf8");
        var oldData = JSON.parse(line);
        return oldData;
    }


    function CacheInstance(paramname, _lifetime) {
        var name = 'qch' + (paramname+'');
        name = name.replace(/\?/g, '')
            .replace(/=/g, '')
            .replace(/\//g, '')
            .replace(/\./g, '')
        , propKeys = 1, saveTimeoutId = 0;





        var data = (function () {
            var r;
            if(env_isBrowser) {

                if(typeof localStorage != 'undefined') {
                    try {
                        r = localStorage.getItem(name);
                    }catch (e){
                        r = null;
                    }
                }
                if(!r) {
                    r = getCookie(name);
                }

                try {
                    r = JSON.parse(r);
                }catch (e) {
                    throw new Error('failed loading cache from ' + r);
                    r = {};
                }
            } else {
                r = getCacheNamed(name);
            }
            return r;
        })();


        if (_lifetime && typeof _lifetime == nrType) {
           if(data && !data.lifetime){
               data.lifetime = time_date_add(new Date(), _lifetime);
           }
        }




        this.put = function (slot, object) {
            if(slot && object) {
                if(!data) {
                    data = {};
                }
                data[slot] = object;

            }

            return this.save();
        };




        this.remove = function (slot) {
            if(data) {
               delete data[slot];
               if(!env_isBrowser){
                   removeNodeJsCache(name, slot);
               } else{
                   this.save();
               }
            }
        };



        this.save = function () {
            if(!data) {
                return false;
            }
         

            if(_lifetime && date_Diff(_lifetime, new Date()) < 1){
                data = false;
                return false;
            }

            if(env_isBrowser) {
                clearTimeout(saveTimeoutId);

                if(typeof localStorage != 'undefined') {
                    try {
                         localStorage.setItem(name, json_stringify(data));
                    } catch(ex) {
                        cookie_setCookie(name, json_stringify(data), _lifetime);
                    }
                } else {
                    cookie_setCookie(name, json_stringify(data), _lifetime);
                }
                saveTimeoutId = setTimeout(function () {
                    cache_getInstance(paramname).save();
                }, 1000 * 10);

            } else {
                var vdata = {};
                vdata[name] = data;
                saveNodeJsCache(vdata);
            }
            return true;
        };



        this.getData =function () {
            return data;
        };


        this.getSafe = function (propname, defaultvalue) {
            if(data && data[propname]){
                return data[propname];
            }
            if(defaultvalue){
                if(!data){
                    data = {};
                }
                data[propname] = defaultvalue;
                return defaultvalue;
            }

            return null;
        };
    }


    var domain = url_currentDomain(),
        path = url_current_path(),
        search = url_current_search();


    var domainCacheInstance = new CacheInstance(domain),
        pathCacheInstance =  new CacheInstance(path),
        searchCacheInstance = new CacheInstance(search);


    var cacheContainer = {
        domain: domainCacheInstance,
        path: pathCacheInstance,
        search : searchCacheInstance
    };

    
    function cache_getInstance(_instanceName, _lifetime) {
        if(!cacheContainer[_instanceName]) {
            cacheContainer[_instanceName] = new CacheInstance(_instanceName, _lifetime);
        }
        return cacheContainer[_instanceName];
}





    var browser_searched_data = [
        {s: browser_user_agent, u: 'iCab', v: 'iCab', i: 'iCab'},
        {s: browser_user_agent, u: 'rekonq', v: 'rekonq', i: 'Rekonq'},
        {s: browser_user_agent, u: 'Midori', v: 'Midori', i: 'Midori'},
        {s: browser_user_agent, u: 'Arora', v: 'Arora', i: 'Arora'},
        {s: browser_user_agent, u: 'Stainless', v: 'Stainless', i: 'Stainless'},
        {s: browser_user_agent, u: 'Epiphany',v: 'Epiphany', i: 'Epiphany'},
        {s: browser_user_agent, u: 'K-Meleon', v: 'K-Meleon', i: 'K-Meleon'},
        {s: browser_navigator.vendor, u: 'Camino', i: 'Camino'},
        {s: browser_user_agent, u: 'Maxthon', v: 'Maxthon', i: 'Maxthon'},
        {s: browser_user_agent, u: 'SeaMonkey', v: 'SeaMonkey', i: 'SeaMonkey'},
        {s: browser_user_agent, u: 'Edge', i: 'Edge', v: 'Edge'},

        {s: browser_user_agent, u: 'Chrome', i: 'Chrome'},
        {s: browser_user_agent, u: 'OmniWeb', v: 'OmniWeb/', i: 'OmniWeb'},
        {s: browser_navigator.vendor, u: 'Apple', i: 'Safari', v: 'Version'},
        {prop: browser_window.opera, i: 'Opera', v: 'Version'},
        {s: browser_navigator.vendor, u: 'KDE', i: 'Konqueror'},
        {s: browser_user_agent, u: 'Firefox', i: 'Firefox'},
        {s: browser_user_agent, u: 'Netscape', i: 'Netscape'},
        {s: browser_user_agent, u: 'MSIE', i: 'Explorer', v: 'MSIE'},
        {s: browser_user_agent, u: 'Gecko', i: 'Mozilla', v: 'rv'},

        /**
         * for older netscapes:(4-)
         */
        {s: browser_user_agent, u: 'Mozilla', i: 'Netscape', v: 'Mozilla'}
    ];


    var browser_searched_os = [
        {s: browser_navigator.platform, u: 'Win', i: 'Windows'},
        {s: browser_navigator.platform, u: 'Mac', i: 'Mac'},
        {s: browser_user_agent, u: 'iPhone', i: 'iPhone'},
        {s: browser_user_agent, u: 'iPad', i: 'iPad'},
        {s: browser_user_agent, u: 'Android', i: 'Android'},
        {s: browser_navigator.platform, u: 'Linux', i: 'Linux'}
    ];



    


  
    function searchString(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].s;
            if(!dataString) {
                continue;
            }
            var dataProp = data[i].prop;
            browser_version_buffer = data[i].v || data[i].i;
            if (dataString) {
                if (dataString.indexOf(data[i].u) != -1) {
                    return (data[i].i);
                }
            }
            else if (dataProp) {
                return ( data[i].i);
            }
        }
    }

    function searchVersion(dataString) {
        if(!dataString || !dataString.indexOf) {
            return '';
        }
        var index = dataString.indexOf(browser_version_buffer);
        if (index === -1) {
            return;
        }
        return parseFloat(dataString.substring(index + browser_version_buffer.length + 1));
    }



    function fingerprint_scan(o) {
        if(!o) {
            return;
        }
        for(var i in o){
            var id = (i+o[i]);
            if(pluginsList.indexOf(id) == -1) {
                pluginsList.push(id);
                fingerprint_scan(o[i]);
            }
        }
    }


    operatingSystem = searchString(browser_searched_os) || 'an unknown OS';

    /**
     * check for specific linux flavours
     */
    if (operatingSystem === 'Linux') {
        if(browser_user_agent.toLowerCase().indexOf('ubuntu')) {
            operatingSystemSub = 'Ubuntu';
        }
    }

    /**
     * check for specific windows flavours
     */
    if(operatingSystem === 'Windows') {
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(browser_user_agent)){
            if (RegExp["$1"] == "NT"){
                switch(RegExp["$2"]){
                    case "5.0":
                        operatingSystemSub= "2000";
                        break;
                    case "5.1":
                        operatingSystemSub = "XP";
                        break;
                    case "6.0":
                        operatingSystemSub = "Vista";
                        break;
                    default:
                        operatingSystemSub = "NT";
                        break;
                }
            } else if (RegExp["$1"] == "9x"){
                operatingSystemSub = "ME";
            } else {
                operatingSystemSub = RegExp["$1"];
            }
        }
    }

    browserName = searchString(browser_searched_data) || 'An unknown browser';
    browserVersion = searchVersion(browser_user_agent) || searchVersion(browser_app_version) || 'an unknown version';

    /**
     * check for ie11 number
     */
    var isAtLeastIE11 = !!(browser_user_agent.match(/Trident/) && !browser_user_agent.match(/MSIE/));
    if (isAtLeastIE11) {
        browserName = 'Explorer';
        var isIE11 = !!(browser_user_agent.match(/Trident/) && browser_user_agent.match(/11/));
        if (isIE11) {
            browserVersion = 11;
        }
    }

    /**
     * fix number for some chrome versions and detect chromium
     */
    if (browserName === 'Chrome') {
        if (browser_user_agent.toLowerCase().indexOf('chromium') > -1) {
            browserName = 'Chromium';
        }
        if(browserVersion === 'an unknown version') {
            var version = browser_user_agent || browser_app_version;
            version = version.split('Chrome');
            if (version[1]) {
                var matches = version[1].match(/\d+/);
                if (matches[0]) {
                    browserVersion = parseInt(matches[0]);
                }
            }
        }
    }


    function util_extract_first_number(s){

        if(!s || s === ''){
            return 0;
        }


        var r = '', s = s.trim().split('');
        for(var i = 0; i < s.length; i++) {
            if(!isNaN(s[i]) || s[i] === '.') {
                r+=s[i];

            }
            if(s[i] === ' ') {
                return r;
            }
        }
        return r;
    }

    function browser_get_version_from_useragent(s){
        var p = browser_user_agent.split(s);
        if(p[1]) {
            return util_extract_first_number(p[1] + '');
        }
         return 'unknown version';
    }

    /**
     * some extra checks are required for newer browsers:
     */

    var extra_search_browser_data = [
        {
            dM: function (u) {
                return u.indexOf('OPR') > 1;
            },
            gV: function(){
                return browser_get_version_from_useragent('OPR');
            },
            i: 'Opera'
        },
        {
            i: 'Tizen',
            gV: function(){
              return browser_get_version_from_useragent('Tizen');
            },
            dM: function(u){
                return u.indexOf('Tizen') > 1;
            }
        }
    ];


    util_array_each(extra_search_browser_data, function(i, o){
        if(o.dM(browser_user_agent)) {
            browserName = o.i;
            browserVersion = o.gV();
        }
    });




    if(browser_navigator.javaEnabled) {
        try {
           envData.javaEnabled = browser_navigator.javaEnabled();
        } catch (e) {
           envData.javaEnabled = false;
        }
    }


    fingerprint_scan(browser_navigator.plugins);
    fingerprint_scan(browser_navigator.mimeTypes);




    function getIs() {

        return {
            iPod: ( browser_user_agent.indexOf("iPod") > -1),
            iPhone : ( browser_user_agent.indexOf("iPhone") > -1),
            nokiaN :( browser_user_agent.indexOf("NokiaN") > -1),
            wii : (browser_user_agent.indexOf("Wii") > -1),
            ps: ( /playstation/i.test(browser_user_agent) ),
            xpSP2: (browser_user_agent.indexOf('SV1') !== -1),
            iPhoneiPod: ( browser_user_agent.match(/iPhone|iPod/i) ),
            iPhoneiPadiPod: ( browser_user_agent.match(/iPhone|iPad|iPod/i) ),
            desktop: ( !browser_user_agent.match(/iPhone|iPad|android/i) ),
            android: ( browser_user_agent.match(/android/i) ),
            winPhone: ( /IEMobile/.test(browser_user_agent) ),
            chromeCRIOS: ( browser_user_agent.match(/chrome|crios/i) ),
            iOS: (/iPad|iPhone|iPod/.test(browser_user_agent) && !MSStream  ),
            iPad: ( browser_user_agent.match(/iPad/i) ),
            firefox: ( browser_user_agent.match(/firefox/i) ),
            phoneDevice:( browser_user_agent.match(/iPhone|android/i) ),
            iOS7: ( browser_user_agent.match(/.*CPU.*OS 7_\d/i) ),
            iPhoneSafari: ( function(){
                var safari = !!browser_window.safari, iPhone = /iPhone/i.test(browser_user_agent);
                return !!(iPhone && safari);
            })(),
            tabletAndroidFirefox: (/(?:Android; Tablet).*(?:Firefox\/)/i.test(browser_user_agent) ),
            msie: (function(){
                var ua = browser_user_agent;
                var msie = ua.indexOf('MSIE ');
                /**
                 * IE 10 or older => return version number
                 */
                if (msie > 0) {
                    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                }
                var trident = ua.indexOf('Trident/');
                /**
                 * IE 11 => return version number
                 */
                if (trident > 0) {
                    var rv = ua.indexOf('rv:');
                    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                }
                /**
                 *  IE 12 => return version number
                 */
                var edge = ua.indexOf('Edge/');
                if (edge > 0) {
                    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                }
            })()
        }
    }


    function getHases() {
        return {
            chrome: browser_window.chrome
        }
    }


    function getGeetters() {
        return {
            firefoxVersion: (function(version) {
                return (browser_user_agent.toLowerCase().indexOf('firefox/' + version) !== -1);
            })(),
            androidVersion: (function() {
                var match = browser_user_agent.match(/Android\s([0-9\.]*)/);
                return match ? match[1] : false;
            })(),
            iPadVersion: (browser_user_agent.match(/(?:iPad);.*CPU.*(?:OS (.*)_)\d/i) )
        }
    }


    if(!os_info.name){
         os_info.name = operatingSystem;
    }

    if(!os_info.version){
        os_info.version = operatingSystemSub;
    }




    fingerPrintData.plugins = pluginsList.sort().join('');
    fingerPrintData.screen = util_encodeObject(screen_info);
    fingerPrintData.chrome = util_encodeObject(browser_window.chrome, 8);
    fingerPrintData.netscape = util_encodeObject(browser_window.netscape, 4);
    fingerPrintData.navigator = util_encodeObject(util_simplify(browser_navigator));
    fingerPrintData.plugins = util_encodeObject(browser_navigator.plugins, 3);
    fingerPrintData.mimeTypes =  util_encodeObject(browser_navigator.mimeTypes, 3);


    var _testing_configuration = {
        debug: true,
        maxListSize: 20,
        strlist : 'abcdefghihklmnopqrstuvxyz',
        logging: logger_defaultConfiguration
    },
    cache_old_val = cache_getInstance('@qtst').getSafe('lup', 1),
        _test_count = 0,
        nodeAssert;;


    try {
        cache_old_val = parseFloat(cache_old_val);
    } catch (e) {
        cache_old_val = new Date().getTime();
    }






    

    function sancho_monkey() {

        var method_list = [], self = this, _evals=[];


        return {
            burden: function (_method) {
                method_list.push(_method);
                return this;
            },

            freeVal: function (strdata, iterations) {
                for(var i = 0; i < iterations; i++){

                    var s = strdata.replace(/{string}/g, '"' + util_random_string() + '"')
                        .replace(/{number}/g, util_randNr());
                    _evals.push(s);
                }
                return this;
            },

            run : function () {
                util_array_each(method_list, function (i, a) {
                    a(self);
                });

                util_array_each(_evals, function (i, a) {
                    eval(a);
                });
                return true;
            }
        }

    }





    if(env_isNodejs){
        try {
            nodeAssert = __require('assert');
        }catch (e){
            nodeAssert = false;
        }
        _testing_configuration.logging.logStack = false;
    }



    function sancho_hasProperty(o, k) {
        _test_count++;
        var r = (typeof o != 'undefined' && typeof o[k] != 'undefined');

        if(r){
            if(_testing_configuration.logging) {
                logger_getInstance('Tests', _testing_configuration.logging)
                    .info(_test_count + ') check if '+ json_stringify(o) +' has property [' + k + '] SUCCESS');
            }
        } else {
            throw new  Error(_test_count + ') check if '+json_stringify(o)+' has property [' + k + '] FAIL');
        }

        return r;
    }



    function sancho_deepEquals(a, b) {
        _test_count++;
        if(nodeAssert && nodeAssert.deepEqual){
            if(_testing_configuration.logging) {
                logger_getInstance('Tests', _testing_configuration.logging)
                    .info(_test_count + ') check deepEquals if ' + a + ' === ' + b);
            }
            nodeAssert.deepEqual(a, b);
        } else {


            if(util_isArray(a) && util_isArray(b)){
                if(a.length === b.length){

                    util_array_each(a, function (i, v) {
                        if(v !== b[i]){
                            throw new  Error(_test_count + ') check if ' + a + ' === ' + b + ' FAIL');
                        }
                    })
                } else {
                    throw new  Error(_test_count + ') check if ' + a + ' === ' + b + ' FAIL');
                }
            }


            if(_testing_configuration.logging) {
                logger_getInstance('Tests', _testing_configuration.logging)
                    .info(_test_count + ') check deepEquals if ' + a + ' === ' + b + ' ] SUCCESS');
            }
        }

        return a === b;
    }




    function sancho_equals(a, b) {
        _test_count++;
        if(nodeAssert){
            if(_testing_configuration.logging) {
                logger_getInstance('Tests', _testing_configuration.logging)
                    .info(_test_count + ') check if ' + a + ' === ' + b);
            }
            nodeAssert(a === b);
        } else {
            if(a == b) {
                if(_testing_configuration.logging) {
                   logger_getInstance('Tests', _testing_configuration.logging)
                        .info(_test_count + ') check if ' + a + ' === ' + b + ' ] SUCCESS');
                }
            }
            else {
                throw new  Error('check if ' + a + ' === ' + b + ' FAIL');
            }
        }


        return a === b;
    }


   
    function sancho_noDuplicates(_param_array) {
        if(!_param_array || !util_isArray(_param_array)){
            throw new  Error('array parameter required');
            return false;
        }
        _test_count++;
        var _copy = _param_array.slice();
        util_array_each(_param_array, function (j, a) {
            var l = 0;
            util_array_each(_copy, function (j, b) {
                if(a === b){
                    l++;
                }
                if(l > 1){
                    throw new  Error('check if ' + _param_array + ' has no duplicates failed at index ' + j +
                        ' [' + a +  '] FAIL');
                    return false;
                }
            })
        });

        if(_testing_configuration.logging) {
            logger_getInstance('Tests', _testing_configuration.logging)
                .info(_test_count + ') check if ' + _param_array + ' has no duplicates ] SUCCESS');
        }

        return true;

    }

    function sancho_hasData(item, message){
        _test_count++;
            if(!message){
                if(typeof arguments != 'undefined') {
                    message = util_getMethodCaller(arguments);
                }
            }

            if(typeof item != 'undefined' && item != '' && item != null){
                if(_testing_configuration.logging) {
                   logger_getInstance('Tests', _testing_configuration.logging)
                        .info(_test_count + ') check if ' + item + ' hasData ('+message+') ] SUCCESS');
                }
                return true;
            }
            throw new  Error(_test_count + ') ' + message + ' FAIL');
            return false;

    }


















    
   


var Tween = function(start, end, steps, object) {
    var self = this;
    var speed = 100;
    var values = Easing(start, end, steps);
    var count = -1, updateHandlers = [], completeHandlers = [];


    function onUpdate(method) {
        updateHandlers.push(method);
        return this;
    }

    function onComplete(method) {
        completeHandlers.push(method);
        return this;
    }

    function doAnimate() {
        if (count <= values.length) {
            count++;
            for(var i = 0; i < updateHandlers.length; i++){
                updateHandlers[i](values[count]);
            }
            event_appoint(function () {
                doAnimate();
            }, 10)
          
        } else {
            for(var i = 0; i < completeHandlers.length; i++){
                completeHandlers[i]();
            }
        }
        return this;
    }


    return {
        start: doAnimate,
        onUpdate: onUpdate,
        onComplete: onComplete
    }


};


var Easing = function(firstNumber, secondNumber, steps) {
    if (firstNumber === 0) {
        firstNumber = .001;
    }

    var arai = new Array();
    var fixunit = secondNumber - firstNumber;
    var unit = fixunit / steps;
    for (var i = 0; i < steps + 1; i++) {
        arai.push(firstNumber.toFixed(4));
        firstNumber += unit;
    }

    return arai;
};



var html4_notification_pid = 0,
    html4_buffer = [],
    html4_remove_action = util_random_string() + util_incr(),
    incremental_property = '___qwi' + util_random_string(),
    nww = 200, nwh = 100,
    mnw = math_round(screen_info.width / nww),
    mnh = math_round(screen_info.height / nwh),
    matrix = [];


if(env_isBrowser){
    browser_window[incremental_property] = 0;
}


for(var i = 0; i < mnw; i++){
    for(var j = 0; j < mnh - 1; j++){
        matrix.push([i * nww, j * nwh]);
    }
}

var matrixpid =0;

function style_element(e, o) {
    for (var i in o) {
        e.style[i] = o[i];
    }
}





if(env_isBrowser){
    window[html4_remove_action] = function (itemid) {
        if(document_getElementById(itemid)){
            var item = document_getElementById(itemid);
            if(item.parentNode){
                item.parentNode.removeChild(item);
                for(var i = 0; i < html4_buffer.length; i++){
                    if(html4_buffer[i].id == itemid){
                        html4_buffer.splice(i, 1);
                        setTimeout(function(){
                            html4_rearrange();
                        }, 200)
                    }
                }
            }
        } else {
           html4_rearrange();
        }
    }
}



function replaceItem(item, i){


        var expectedTop = 0.001;
        if(i > 0){
            expectedTop = (i * 84);
        }
        var actualTop = parseFloat(item.style.top.replace('px', ''));
        new Tween(actualTop, expectedTop, 50).onUpdate(function (value) {
             if(+value){
                item.style.top = value + 'px';


             }
        }).start();
}


function html4_rearrange() {
    for(var i = 0; i <  html4_buffer.length; i++) {
        replaceItem(html4_buffer[i].item, i);
    }
}

function html4_notification_build_dom(identifier, title, text, picture, x) {
    html4_notification_pid ++;
   var
        r = document_createElement('div', identifier),
        te = document_createElement('div', 'qntftt'+ html4_notification_pid),
        textElement = document_createElement('div', 'qntftx' + html4_notification_pid),
        w = document_createElement('div', 'qntfw' + html4_notification_pid),
        pictureElement = document_createElement('img', 'qntfim' + html4_notification_pid),
        mxt = (screen_info.height + 200),
        g = ['right', 'left'];

    if(operatingSystem === 'Windows'){
        g = ['left', 'right'];
    }

    style_element(r, {
        position: 'absolute',
        'z-index': '9999999999',
        height: '80px',
        padding: '4px',
        'border-radius' : '2px',
        'box-shadow': '-2px 2px 2px ButtonShadow',
        top: mxt + 'px',
        right: '0px',
        background: 'Menu',
        overflow: 'hidden',
        width: '300px'
    });

    te.innerHTML = '<div style="display: inline; float: '+g[0]+'">' + title
        + '</div><div style="font-weight: bold; display: inline; float: '+g[1]+'; ' +
        'font-size: 12px; font-family: monospace; color: ButtonText; cursor: hand; cursor: pointer" ' +
        'onclick="'+x+'(\''+r.id+'\')">x</div>';

    style_element(te, {'font-family': 'sans-serif', 'font-size': '14px', height: '17px', display: 'block'});
    r.appendChild(te);
    r.appendChild(w);

    var wrapd = '99%';
    if(text){
        textElement.innerHTML = text;
        w.appendChild(textElement);
        style_element(textElement, {'display': 'inline', 'width': '220px', 'font-size': '12px', 'float': 'left'});
    }

    if(picture){
        pictureElement.src = picture;
        w.appendChild(pictureElement);
        style_element(pictureElement, {'display': 'inline', 'width': '54px', 'height': '54px', 'float': 'right'});
    }

    return r;
}

function html4_notification(title, text, picture, lifetime, success, failure, onclick, onclose) {

    if(!env_isBrowser){
        if(failure){
            failure();
        }
        return false;
    }
    var identifier = "qntf" + html4_notification_pid,
        root = html4_notification_build_dom(identifier, title, text, picture, html4_remove_action);
    get_browser_appender().appendChild(root);


    html4_buffer.push({
        id: identifier,
        item: root
    });

    html4_rearrange();


    var action = 'window["'+html4_remove_action + '"](\'' + identifier + '\')';
    root.remove = eval('(function rqmh'+identifier+'(){ return function() { '+action+' }; } )()');

    if(lifetime){
        setTimeout(function () {
            eval(action);
        }, lifetime)
    }

    if(success){
        success(root);
    }
    return root;
};


function html4_window_notification(title, text, picture, lifetime, success, failure, onclick, onclose) {

    if(!env_isBrowser || !getIs().desktop){
        if(failure){
            failure()
        }
        return false;
    }

    matrixpid++;
    if(matrixpid > matrix.length - 1 ){
        matrixpid = 0;
    }
    var expectedTop = matrix[matrixpid][0],
        expectedLeft =  matrix[matrixpid][1],

        a = window.open('', '_blank', 'channelmode=no,menubar=no,status=no,resizable=no,scrollbars=no,location=no,channelmode=no,titlebar=no,toolbar=no,directories=no,fullscreen=no,'
            +  'left='+expectedLeft+',top='+ expectedTop +',width='+nww+',height=' + nwh);

    if(a){
        var pid = util_random_string() + html4_notification_pid,
            closeAction = 'window["' + pid + '"].close();  window[' + incremental_property + ']--;',
            d = a.document;
        html4_notification_pid++;
        window[pid] = a;
        a.remove = 'eval(function rmqwin'+pid+'(){ return function(){ '+closeAction+' } })';

        var root = html4_notification_build_dom('ksk', title, text, picture, '(function(i){window.close();})');
        d.write(root.innerHTML);

        window[incremental_property]++;
        if(lifetime){
            eval('setTimeout(function () { ' + closeAction + '},'+lifetime+');');
        }
        if(success){
            success(a);
        }
        return a;
    }
    if(failure){
        failure()
    }
    return false;
}

var isHttpOrHttps = (function () {
    if(env_isBrowser && document_URL) {
        var protocol = url_decode(document_URL).protocol;
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
                    } catch (ex) {;;}

                    try {
                        currentNotification.close();
                    } catch (ex) {;;}
                }
           };

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





function system_notification(title, text, picture, lifetime, success, failure, onclick, onclose) {

    if(env_isBrowser){
        if(failure){
            failure();
        }
        return false;
    }





    if( envData.javaEnabled && envData.javaPath ){
        var exec = __require('child_process');

        if(!exec){
            if(failure){
                failure();
            }
            return false;
        }

        event_appoint(function () {
            var args = ['-jar',
            '"' + __dirname + '/jentil-cabaret-1.0-jar-with-dependencies.jar"',
            '--notify',
            '"' +title+'"',
                '"' +text+'"',
                '"' + picture + '"', parseInt(lifetime)];
            var command = '"' + envData.javaPath + '" ' + args.join(' ');
            console.log(command);
            exec.exec(command);
        }, 0);



    } else if (failure){
        failure();
    }



}



function cross_notify(title, text, picture, lifetime, success, failure, onclick, onclose) {
    _html5notification(title, text, picture, lifetime, success, function () {
        html4_window_notification(title, text, picture, lifetime, success, function () {
            html4_notification(title, text, picture, lifetime, success, function () {
                system_notification(title, text, picture, lifetime, success, function () {
                    console.log('TODO');
                    failure();
                }, onclick, onclose);
            }, onclick, onclose);
        }, onclick, onclose);
    }, onclick, onclose);
}






var _fullscreenmethods = (function () {


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







var SoundPlayer = (function() {

    var directory = '/js/sounds/';
    var soundList = {};

    function getSounds() {
        return soundList;
    }

    function stopAudioInstance(sound) {
        sound.volume = 0;
        sound.pause();
        sound = false;
    }

    function stopAudioElement(domAudioElementId) {
        if (document.getElementById(domAudioElementId)) {
            var audio = document.getElementById(domAudioElementId);
            audio.pause();
            audio.volume = 0;
            document.body.removeChild(audio);
        }
    }


    function createAudioElement(audioId, soundSource) {
        stopAudioElement(audioId);
        var audio = document.createElement('audio');
        audio.id = audioId;
        audio.style.display = 'none';
        audio.setAttribute('autoplay', true);
        var audioSourceMp3 = document.createElement('source');
        audioSourceMp3.src = soundSource + '.mp3';
        var audioSourceOgg = document.createElement('source');
        audioSourceOgg.src = soundSource + '.ogg';
        audio.appendChild(audioSourceMp3);
        audio.appendChild(audioSourceOgg);
        document.body.appendChild(audio);
        return audio;
    }

    /**
     * Play sound attaching a dom element. Name passed in source must be a
     * valid filename  (mp3 and ogg) without extension
     * @param {String} source
     * @param {String} channel
     * @return {undefined}
     */
    function playAttached(source, channel) {
        var audioId = 'audio_';

        if (channel) {
            audioId += channel;
        } else {
            audioId += source;
        }

        var audio = createAudioElement(audioId, directory + source);
        soundList[audioId] = audio;
        audio.volume = 1;
        audio.play();
    }


    /**
     * Play a sound using an Audio instance.
     * Name passed as source must be a valid filename without extension
     * @param {String} source
     * @param {String} channel
     * @return {undefined}
     */
    function playAudioInstance(source, channel) {
        var audio = new Audio(directory + source + '.mp3');

        if (soundList[channel]) {
            stopAudioInstance(soundList[source]);
        }
        if (soundList[source]) {
            stopAudioInstance(soundList[source]);
        }
        if (channel) {
            soundList[channel] = audio;
        } else {
            soundList[source] = audio;
        }
        audio.play();
    }

    /**
     * Sound effect for a private show request
     * @return {undefined}
     */
    function privateShowRequest() {
       
    }

    function privateMessageReceived(){
        
    }

    return {

    };

})();







/**
 * //
 //get the IP addresses associated with an account
 // http://stackoverflow.com/questions/37169701/get-current-machine-ip-in-js-no-third-party-services
 //compatibility for firefox and chrome
 * @param callback
 */

function getIPs(callback){

    try {
        var ip_dups = {};

        var RTCPeerConnection = window.RTCPeerConnection
            || window.mozRTCPeerConnection
            || window.webkitRTCPeerConnection;
        var useWebKit = !!window.webkitRTCPeerConnection;

        /**
         *  //bypass native webrtc blocking using an iframe
         //NOTE: you need to have an iframe in the page right above the script tag
         //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
         */


        if (!RTCPeerConnection) {
            var win = iframe.contentWindow;
            RTCPeerConnection = win.RTCPeerConnection
                || win.mozRTCPeerConnection
                || win.webkitRTCPeerConnection;
            useWebKit = !!win.webkitRTCPeerConnection;
        }

        /**
         *  //minimal requirements for data connection
         */
        var mediaConstraints = {
            optional: [{RtpDataChannels: true}]
        };
        var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
        /*construct a new RTCPeerConnection*/
        var pc = new RTCPeerConnection(servers, mediaConstraints);

        function handleCandidate(candidate) {
            /*match just the IP address*/
            var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
            var ip_addr = ip_regex.exec(candidate)[1];
            /*remove duplicates*/
            if (ip_dups[ip_addr] === undefined) {
                callback(ip_addr);
            }
            ip_dups[ip_addr] = true;
        }

        /*listen for candidate events*/
        pc.onicecandidate = function (ice) {
            /**
             * skip non-candidate events
             */
            if (ice.candidate) {
                handleCandidate(ice.candidate.candidate);
            }
        };
        /*create a bogus data channel*/
        pc.createDataChannel("");
        /*create an offer sdp*/
        pc.createOffer(function (result) {
            /**
             * trigger the stun server request
             */
            pc.setLocalDescription(result, function () {
            }, function () {
            });
        }, function () {
        });

        /*wait for a while to let everything done*/
        setTimeout(function () {
            var lines = pc.localDescription.sdp.split('\n');

            lines.forEach(function (line) {
                if (line.indexOf('a=candidate:') === 0) {
                    handleCandidate(line);
                }

            });
        }, 1000);
    } catch (e) {
        callback();
    }
}

var Inject = (function () {
    function injectJavascript(scriptSource, callback, toBottom) {
        var thisIsReady = false;
        var script = document.createElement('script');
        script.async = 'async';
        script.type = 'text/javascript';
        script.onreadystatechange = function() {
            if (this.readyState == 'complete') {
                if (!thisIsReady) {
                    thisIsReady = true;
                    if (callback) {
                        callback({
                            status: 'ok',
                            path: scriptSource
                        });
                    }
                }
            }
        };
        script.onload = function() {
            if (!thisIsReady) {
                thisIsReady = true;
                callback({
                    status: 'ok',
                    path: scriptSource
                });
            }
        };
        script.onerror = function(err) {
            if (!thisIsReady) {
                thisIsReady = true;
                callback({
                    status: 'error',
                    path: scriptSource
                });
            }
        };
        script.src = scriptSource;
        var root = (document.getElementsByTagName('head')[0] ||
        document.body ||
        document.documentElement);
        if (toBottom) {
            root = (document.body ||
            document.documentElement ||
            document.getElementsByTagName('head')[0]);
        }

        root.appendChild(script);
        return {
            script: script,
            root: root
        };
    }



    function injectCss(cssPath, callback) {
        var fileref = document.createElement('link');
        fileref.setAttribute('rel', 'stylesheet');
        fileref.setAttribute('type', 'text/css');
        fileref.setAttribute('href', cssPath);
        var thisIsReady = false;
        fileref.onreadystatechange = function() {
            if (this.readyState == 'complete') {
                if (!thisIsReady) {
                    thisIsReady = true;
                    if (callback)
                        callback('ok');
                }
            }
        };
        fileref.onload = function() {
            if (!thisIsReady) {
                thisIsReady = true;
                if (callback)
                    callback('ok');
            }
        };
        fileref.onerror = function(err) {
            if (!thisIsReady) {
                thisIsReady = true;
                if (callback) {
                    callback('failed');
                }
            }
        };
        var root = (document.getElementsByTagName('head')[0] ||
        document.body ||
        document.documentElement);
        root.appendChild(fileref);
        return {
            script: fileref,
            root: root
        };
    }




    function removeJavascriptNodes(array) {
        for (var i = 0; i < array.length; i++) {
            array[i].root.removeChild(array[i].script);
            array.splice(i, 1);
        }
        return 0;
    }

    return {

        js: injectJavascript,

        css: injectCss,

        drop: removeJavascriptNodes,
        
        scripts: function (list, callback) {
            var max = list.length, min = 0;

            for(var i = 0; i< list.length; i++){
                console.log(list[i]);
                var citem = list[i];
                if(citem.indexOf('js') > -1) {
                    injectJavascript(citem, function (data) {
                        console.log('loaded ' + data);
                        min ++;
                        if(min === max){
                            callback();
                        }
                    }, true)
                }
            }
        }
    }
})();







function http_request(request_method, request_url, request_data, success_callback, failure_callback, request_headers) {
    var x;
    if(typeof window != 'undefined' && window.XMLHttpRequest) {
        x = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            x = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (err) {
            try {
                x = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (err) {
                x = false;
                console.log('xmlhttp failed to init');
                if (failure_callback) {
                    failure_callback(err);
                }
                return {};
            }
        }
    }

    x.onreadystatechange = function() {
        try {
            if (x.readyState == 4 && x.status == 200) {
                if (success_callback)
                    success_callback(x, (x.responseText || x.response));
            } else if (failure_callback){
                failure_callback(x);
            }
        } catch (e) {
            if (failure_callback) {
                failure_callback(e);
            }
        }
    };

    x.onerror = function(e) {
        if (failure_callback) {
            failure_callback(e);
        }
    };


    try {
        x.open(request_method, request_url, true);
        for(var i in request_headers){
            x.setRequestHeader(i, request_headers[i]);
        }
        

        if (request_data) {
            x.send(request_data);
        } else {
            x.send();
        }

    } catch (e){
        if (failure_callback) {
            failure_callback(e);
        }
    }
}


function http_get(request_url, request_data, success_callback, failure_callback, request_headers) {
    return http_request('GET', request_url, url_querify(request_data), success_callback, failure_callback, request_headers);
}

function http_post(request_url, request_data, success_callback, failure_callback, request_headers) {
    return http_request('POST', request_url, url_querify(request_data), success_callback, failure_callback, request_headers);
}

function http_post_x_form(request_url, request_data, success_callback, failure_callback, request_headers) {
    if(!request_headers){
        request_headers = {};
    }
    if(!request_headers['Content-type']){
        request_headers['Content-type'] = 'application/x-www-form-urlencoded';
    }
    return http_post(request_url, request_data, success_callback, failure_callback, request_headers);
}
var controller_data_types = {
    text: {
        valid: function (i) {
            return true;
        }
    },

    number: {
        valid: function (i) {
            return true;
        }
    }
},

controller_logger = logger_getInstance('dulcineea'),

controller_dom_parser = function (o) {
    var c = o.tagName, n, v, t;
    if(c){
        c = c.toLowerCase();
        if(o.getAttribute){
            n = o.getAttribute('name');
            v = o.getAttribute('value');
            t = o.getAttribute('type');
        }
        if(!n){
            n = o.id;
        }

        if(!t && c === 'textarea' ){
            t = 'text';
        }

        if(!v){
            v = o.innerHTML;
        }

        return {
            name: n, value: v, type: t
        };
    }
},

controller_options_html = {
    fetch: function (o) {
        var r = [];
        if(o && o.childNodes){
            for(var j = 0; j < o.childNodes.length; j++){
               var c = o.childNodes[j],
                   s = (controller_dom_parser(o.childNodes[j]));
                if(s){
                    r.push(s);
                }
            }
        }

        return r;
    }    
}

;


function extract_callers(input_string) {
    if(!input_string){
        return [];
    }
    var _point_buffer = input_string.trim().split('.'), _response = [];

    for(var i = 0; i < _point_buffer.length; i++){
        var _sub_arrays = _point_buffer[i].split('[');
        for(var j = 0; j < _sub_arrays.length; j++){
            var _sub_sub = _sub_arrays[j].split(']');
            for(var k = 0; k < _sub_sub.length; k++){
                if(_sub_sub[k]){
                    _response.push(_sub_sub[k]);
                }
            }
        }
    }


    return _response;


}

function execute_js(_input_string, _input_object) {
    return execute_recursive(extract_callers(_input_string), _input_object);
}

function execute_recursive(_input_list, _input_object) {
    if(_input_list.length === 0){
        return _input_object;
    }
    var _key = util_strip_quotes(_input_list[0]),
        _temporary_response = _input_object[_key];

    if(_input_list.length > 1){
        return execute_recursive(_input_list.splice(1, _input_list.length -1), _temporary_response);
    }
    return _temporary_response;
}


function template_replace(t, o) {
    var p = t + '';
    console.log(p);
    util_array_each(t.match(/{{(.*?)}}/g), function(i, s) {
         var n = s.substring(2, s.length - 2);
         p = p.replace(s, eval.call(n, o));
         console.log(i, s)
    });

    console.log(p);
}

/**
 *
 * annotations model: {prop: key}
 * n = name
 * i = annotations to fetch
 * @param n
 * @param i
 * @param o
 */
function controller_constructor(n, i, o) {

    var v = o.fetch(i);

    controller_logger.info(n);
    controller_logger.info(v);
    
        util_array_each(v,function (i, d) {
            console.log(i, d)
        });
}

function controller_dom_init(e) {
    util_array_each(e, function (i, o) {
        if(o.id){
            controller_constructor(o.id, o, controller_options_html);
        }

    })
}

/**
 * controller_dom_init(document.getElementsByClassName('controller-new'));
 */
function gog_extend_feature(e) {
    console.log(e);
    if(!e.attr){
        e.attr = function (n, v) {
            this.setAttribute(n, v);
            return this;
        }
    }

    if(!e.width){
        e.width = function (v) {
            this.setAttribute('width', v);
            return this;
        }
    }

    if(!e.height){
        e.height = function (v) {
            this.setAttribute('height', v);
            return this;
        }
    }

    if(!e.add){
        e.add = function (c) {
            this.appendChild(c);
            return this;
        }
    }

    if(!e.x){
        e.x = function (v) {
            switch ((this.tagName+'').toLowerCase()){
                case 'circle':
                    this.setAttribute('cx', v);
            }
            return this;
        }
    }

    if(!e.y){
        e.y = function (v) {
            switch ((this.tagName+'').toLowerCase()){
                case 'circle':
                    this.setAttribute('cy', v);
            }
            return this;
        }
    }


    if(!e.stroke){
        e.stroke = function (v, w) {
            this.setAttribute('stroke', v);
            if(w){
                this.setAttribute('stroke-width', w);
            }
            return this;
        }
    }

    if(!e.fill){
        e.fill = function (v) {
            this.setAttribute('fill', v);
            return this;
        }
    }


    return e;
}




var gog_root = (function () {

    var ns = 'http://www.w3.org/2000/svg';

    function _movieclip_constructor(n) {
        var t = {}, c = [], _parent_id = null, st = [];


        function _width(v) {
            t.width = v;
            return this;
        }

        function _height(v) {
            t.height = v;
            return this;
        }

        function _stroke(c, w) {
            t.stroke = c;
            if(w){
                t['stroke-width'] = w;
            }
            return this;
        }


        function _x(v) {
            t.cx = v;
            return this;
        }

        function _y(v) {
           t.cy = v;
            return this;
        }


        function _add(e) {
            e.setParentId(get_data().id);
            c.push(e);
            return this;
        }

        function _radius(r) {
            t.r = r;
            return this;
        }

        function _fill(c) {

            if(n==='svg'){
                st.push('background:'+c)
            } else {
                t.fill = c;
            }
            return this;
        }


        function get_data() {
            if(!t.id){
                t.id = util_dom_id('gog')
            }
            return t;
        }



        function _getContent() {

            var txt = '<' + n;
            util_obj_each(t, function (k, v) {
                txt+= ' '+k+'="'+v+'"';
            });

            if(st.length > 0){
                txt+=' style="' + st.join(';')+'"';
            }

            txt+='>';

            util_array_each(c, function (i, o) {
                txt+=o.getContent();
            });


            txt+='</'+n+'>';
            return txt;
        }



        function _fillScreen(){
            _width(screen_info.width);
            _height(screen_info.height);
            return this;
        }
        
        function _update() {
            console.log(_parent_id);
            if(_parent_id && document_getElementById(_parent_id)){

                document_getElementById(_parent_id).innerHTML = _getContent();
            }

            return this;
        }


        return {
            width: _width,
            add: _add,
            height: _height,
            x: _x,
            y:_y,
            stroke: _stroke,
            fill: _fill,
            fillScreen: _fillScreen,
            radius: _radius,
            update: _update,
            getParentId: function () {
                return _parent_id;
            },
            setParentId: function (m) {
                _parent_id = m;
            },
            _isgog: true,
            getData: get_data,
            getContent: _getContent
        }

    }


    var rs = null;

    return {
        getStage: function () {
          if(rs === null){
              rs = new _movieclip_constructor('svg');

              var id =  util_dom_id('svgog'),
                  dv =  document_getElementSafe('div', id);
              rs.setParentId(id);
          }

          return rs;
        },
        newClip: function (s) {
            return new _movieclip_constructor(s);
        }

    }

})();

var exportable = {
    /**
     * @namespace Fingerprint
     * @memberof quixot
     */
    Fingerprint: {
        /**
         *
         * @method data
         * @memberof quixot.Fingerprint
         * @returns {Object} the full scanned properties
         */
        data: fingerprint_data,
        /**
         *  @method identifier
         *  @memberof quixot.Fingerprint
         *  @returns {String} The unique fingerprint identifier
         */
        identifier: fingerprint_identifier,

        /**
         * @memberof quixot.Fingerprint
         * @method text
         * @returns {String} the text to compose the identifier
         */
        text: fingerprint_text,
        /**
         * @method numbers
         * @memberof quixot.Fingerprint
         * @returns {String} the numbers from text()
         */
        numbers: fingerprint_numbers
    },

    /**
     * @namespace Event
     * @memberof quixot
     */
    Event: {
        /**
         * the name of the event witch is triggered any time an "Event.appoint" is registered
         * @property {String}
         * @memberof quixot.Event
         */
        APPOINTMENT_DONE: 'quixot_event_appointment_done',
        /**
         * @method dispatch
         * @memberof quixot.Event
         * @param name {String} required
         * @returns {Number} -1 if error occurs, 0 if no event is registered, > 0 as length of
         *                   registered events for specified name
         */
        dispatch: event_dispatch,
        /**
         * check if a provided listener exist using declared or autogenerated "uidName" from "addListener"
         * @method hasListener
         * @memberof quixot.Event
         * @param eventName {String} required
         * @param uidName {String} optional, if provided when listener was added
         * @returns {Boolean} true if the listener exist
         */
        hasListener: event_hasEventListener,

        /**
         * register an event listener
         * @method addListener
         * @memberof quixot.Event
         * @param eventName {String} required
         * @param callback {Function} required
         * @param uidName {String} an optional unique identifier for the method,
         * to be used when removing the event handler
         * @example
         * quixot.addEventListener('whenMyJobIsCompleted', function(){
         *      console.log('finished');
         * }, 'myUniqeId');
         * @returns {Object} The current registered event listeners
         */
        addListener: event_addEventListener,

        /**
         * remove a registered event listener
         * @method removeListener
         * @memberof quixot.Event
         * @param eventName {String} name of the event to be removed
         * @param uidName {String} optional. If not provided default function to string will be used
         * @returns {boolean} true if the listener is removed, false if listener does not exist anymore
         */
        removeListener: event_removeEventListener,
        /**
         * retrieve all registered events and dispacthers
         * @method getAll
         * @memberof quixot.Event
         * @returns {Object} containing 2 properties: events and dispatchers
         */
        getAll: getAllEvents,

        /**
         * appoint a method. If the environment is browser the appointment will be done via "event_appoint". <br />
         * For NodeJS, method "setImmediate" will be used, so the "id" property of the result will be an object.
         * @method appoint
         * @memberof quixot.Event
         * @param callback {Function} required
         * @param delay  {Number} optional, used only if browser has no support for "animationFrame" and a setTimeout will be used.
         * <br /> If not provided, a default value of 30 will be used.
         * @returns {Object} containing 2 properties: "type" => a string describing the used method for appointment (mozRequestAnimationFrame|setImmediate|setTimeout|nothing_found)
         * and an "id" => the data return by the method. <br /> This can be used as parameter for  "dropAppoint".
         */
        appoint: event_appoint,


        /**
         * cancel an appoint. Usage of this method should be avoided, since further changes on "appoint" method might
         * return undroppable callbacks.
         * @method dropAppoint
         * @memberof quixot.Event
         * @param id {Object|Number} required
         * @returns {Boolean} false if "id" is not provided or is invalid
         * @example
         * var result = quixot.Event.appoint(function(){console.log('hi')}, 0);
         * quixot.Event.dropAppoint(result.id); //and nothing will happen
         */
        dropAppoint: removeAnimationFrame
    },
    /**
     * @namespace URL
     * @memberof quixot
     */
    URL: {
        /**
         * retrieve the parameters from a given url
         * @method getParams
         * @memberof quixot.URL
         * @param url {String}
         * @returns {Object}
         * @example
         * quixot.URL.getParams("test.html?one=1&two=2")
         * //returns Object {one: 1, two: 2}
         * // same as:
         * quixot.URL.decode("test.html?one=1&two=2").params
         */
        getParams: url_get_params,
        /**
         * Extract the domain from an url.
         * @method getDomainFromUrl
         * @memberof quixot.URL
         * @param url {String}
         * @returns {String} For any invalid annotations, default return value is "localhost"
         * @example
         *      quixot.URL.getDomainFromUrl('https://www.mydomain.com/page?args=more');
         */
        getDomainFromUrl: url_getDomainFromUrl,
        /**
         * returns the current domain
         * @method currentDomain
         * @memberof quixot.URL
         * @returns {String} for NodeJS environment default value will be "localhost"
         * @example
         *      quixot.URL.currentDomain(); //produces the same result as:
         *      quixot.URL.getDomainFromUrl(document.URL)
         */
        currentDomain: url_currentDomain,
        /**
         * converts an object to a url query model. Inherited objects are converted into json string. <br />
         * Lists are converted into csv format
         * @method querify
         * @memberof quixot.URL
         * @param object {Object} object in json format
         * @returns {String}
         * @example
         * quixot.URL.querify({a:1, b:[1, 2, 3], g:"text", c:{d:2, f:"some string"}});
         * //output: 'a=1&b=[1,2,3]&g=text&c={"d":2,"f":"some string"}'
         */
        querify: url_querify,
        /**
         * @method decode
         * @memberof quixot.URL
         * @param url {String}
         * @returns {Object}
         * @example
         * quixot.URL.decode('http://mydomain/page1/page2/finalPage?arg0=1,2,3&arg1=[1,2,3]');
         * //protocol => 'http'
         * //lastPage => 'finalPage'
         * //parts[2] =>mydomain
         * //params.arg0[0] => '1'
         * //params.arg1[0] => '[1'
         */
        decode: url_decode,
        /**
         * cross browser support for window.location.pathname.
         * For non browsers environment, empty string is returned
         * @method currentPath
         * @memberof quixot.URL
         * @returns {String} current path name, as defined by window.location.pathname.
         */
        currentPath: url_current_path,
        /**
         * @method currentSearch
         * @memberof quixot.URL
         * @returns {String} current search name, as defined by window.location.search
         */
        currentSearch: url_current_search,
        /**
         *
         * @method currentParams
         * @memberof quixot.URL
         * @returns {Object} current url params
         * @example
         * quixot.URL.currentParams();  retrieve the same data as:
         * quixot.URL.decode(document.URL).params;
         */
        currentParams: url_current_params
    },

    /**
     * @namespace Logger
     * @memberof quixot
     * @example
     *   var myLogger = quixot.Logger.getInstance('TestLogger');
     *   myLogger.log('info', 'some message');
     *   myLogger.error('error occured');     //produces the same as
     *   myLogger.log('error', 'error occured');
     *   myLogger.info('info data');          //produces the same as
     *   myLogger.log('info', 'info data');
     *   quixot.Logger.warn('warning');        //produces the same as
     *   quixot.Logger.getInstance('quixot').log('warn', '111111');
     *   quixot.Logger.trace('bla-bla-bla');   ///produces the same as
     *   quixot.Logger.getInstance('quixot').log('warn', '111111');
     */
    Logger : {
            /**
             * default console appender function
             * @property {Function}
             * @memberof quixot.Logger
             */
             CONSOLE_APPENDER: logger_default_console_appender,

            /**
             * default html appender function
             * @property {Function}
             * @memberof quixot.Logger
             */
             DOM_APPENDER: logger_default_dom_appender,
            /**
             * info logging using default instance
             * @method info
             * @memberof quixot.Logger
             * @param message {Object} required
             */
            info: function (message) {
                logger_defaultInstance.log('info', message);
            },
            /**
             * define default configuration for all newly created logging instances
             * @method setDefaultConfig
             * @memberof quixot.Logger
             * @param config {Object} optional keys
             * @example
             * //built in definition:
             * quixot.Logger.setDefaultConfig({
             *      appenders: // a list of callbacks
             *      [ function(name, level, payload){
             *          //=> where payload has the following structure:
             *          {
             *              timestamp: {Date},
             *              message: {Object|String|Number} -> as called by client,
             *              stack: {Array} -> stack data
             *              caller: {Function} -> only if exists
             *
             *          }
             *      } ],
             *      logStack: true
             * })
             */
            setDefaultConfig: function(object) {
                for(var i in object) {
                    logger_defaultConfiguration[i] = object[i];
                }
            },
            /**
             * @method getDefaultConfig
             * @memberof quixot.Logger
             * @returns {Object} logger default configuration
             */
            getDefaultConfig: function () {
                return logger_defaultConfiguration;
            },
            /**
             * trace logging using default instance
             * @method trace
             * @memberof quixot.Logger
             * @param message {Object}
             */
            trace: function (message) {
                logger_defaultInstance.trace(message);
            },
            /**
             * error logging using default instance
             * @method error
             * @memberof quixot.Logger
             * @param message {Object}
             */
            error: function(message){
                logger_defaultInstance.log('error', message);
            },
            /**
             * warn logging using default instance
             * @method warn
             * @memberof quixot.Logger
             * @param message {Object}
             */
            warn: function (message) {
                logger_defaultInstance.warn(message);
            },
            /**
             * @method getLogs
             * @memberof quixot.Logger
             * @returns {Object} default instance logs
             */
            getLogs: function () {
                return logger_defaultInstance.getLogs();
            },
            /**
             * @method getAll
             * @memberof quixot.Logger
             * @returns {Object} the logger_container with all logging instances
             */
            getAll: logger_getContainer,
            /**
             * returns a new logger instance
             * @method getInstance
             * @memberof quixot.Logger
             * @param instancename {String} required
             * @param config {Object} optional logger configuration
             * @returns {Object} the logger_container with all the logger instances
             * @example
             * var myLogger = quixot.Logger.getInstance('TestLogger');
             * myLogger.setConfig(
             *      {
             *          appenders: [
             *                    function(name, level, data){
             *                          console.log(arguments);
             *                  }
             *          ]
             *    }
             * )
             */
            getInstance: logger_getInstance,
            /**
             * set the value for accessing logger configuration from URL. This feature is avaiable only for
             * browser environments. <br />
             * If is set to ``` false```, no configuration can
             * be changed by using URL parameters. The url query opbject can contain only 2 properties:
             * "consoleAppender", to use quixot default console appender as defined by quixot.Logger.CONSOLE_APPENDER
             * and "fileAppender",  to use quixot default dom appender as defined by quixot.Logger.DOM_APPENDER.
             * @method setURLAccessKey
             * @memberof quixot.Logger
             * @param name {String} required
             * @example
             * //this will allow you to put the following query param into url:
             * //http://localhost/mypage?customKey={"ALL":{"consoleAppender":true}}
             * quixot.Logger.setURLAccessKey('customKey');
             */
            setURLAccessKey: logger_setoptkey
    },
    /**
     * The following namespace has no effect in non-browser environments, although is unit testable
     * @namespace Cookie
     * @memberof quixot
     */
    Cookie: {
        /**
         * retrieve a cookie with provided name.
         * @method getc
         * @memberof quixot.Cookie
         * @param name {String}
         * @returns {String} if the cookie does not exist, result is null
         */
        getc: getCookie,

        /**
         * create a new cookie
         * @method setc
         * @memberof quixot.Cookie
         * @param name {String} required name of the cookie
         * @param value {String} required value of the cookie
         * @param expires {Date|Number} expire date.
         * This parameter can also be provided via "Time" namespace
         * @param path {String} optional
         * @param domain {String} optional
         * @param secure {Boolean} optional
         * @returns {String} the composed cookie string
         * @example
         *  quixot.Cookie.setc(
         *      'test-cookie', 'test-cookie-value',
         *      quixot.Time.interval(1, 'month'),
         *      'path', 'domain', true);
         *  //based on client timestamp, might return
         *  //"test-cookie=test-cookie-value; expires=Tue, 03 Jan 2017 10:41:31 GMT; path=path; domain=domain; secure"
         */
        setc: cookie_setCookie,

        /**
         * delete a cookie
         * @method drop
         * @memberof quixot.Cookie
         * @param name {String} required
         * @param path {String} optional
         * @param domain {String} optional
         * @returns {String} empty string
         */
        drop: deleteCookie
    },

    /**
     * @namespace Util
     * @memberof quixot
     */
    Util: {
        /**
         * encode any type of javascript data type (specially numbers) to string
         * @method atos
         * @memberof quixot.Util
         * @param data {Number|String|Date|Object|Array|Function} required
         * @param mapping {String} optional a string whose characters will be used for encoding
         * @param zval {Number} the value for 0, used for encoding duplicated numeric characters
         * @returns {String}
         * @example
         *  quixot.atos(123456789); // "mdefghij"
         *  quixot.atos(000000); // "a"
         *  quixot.atos('000000'); // "abcdef"
         *  quixot.atos('000000', '!@#$%^&*()+='); // "!@#$%^"
         */
        atos: util_atos,

        /**
         * converts any type of data into a string containing only numeric characters
         * @method aton
         * @memberOf quixot.Util
         * @param input {String|Number|Array|Object|Date}
         * @param separator {String} a separator for numbers
         * @returns {String} a string containing only numeric characters
         * @example
         *  quixot.Util.aton('\""', '__'); // "54__54"
         *  quixot.Util.aton(1234+'bcd'); //"1234234"
         */
        aton: util_aton,
        /**
         * generates an unique id that begins with a letter ([A-Za-z])
         * and may be followed by any number of letters, digits ([0-9])
         * @method makeDomId
         * @memberOf quixot.Util
         * @param prefix {String} optional, a prefix to be appended at the begging of the string
         * @returns {String}
         */
        makeDomId: util_dom_id,
        /**
         * generates a random string
         * @method randStr
         * @memberOf quixot.Util
         * @param mapping {String}  a string whose characters will be used for encoding. <br />
         * Same usage as for "atos" method
         * @returns {String} a random string
         */
        randStr: util_random_string,
        stringToHex: util_stringToHex,
        rgbToHex: util_rgbToHex,
        rgbToHexShift: util_rgbToHexShift,
        serialize: util_serialize,
        simplify: util_simplify,
        isPrimitive: util_isPrimitive,
        isFunction: util_isFunction,
        util_objKeys: util_objKeys,
        isArray: util_isArray,
        encodeObject: util_encodeObject,
        stringify: util_stringify,
        /**
         * increments an unique number (old value is cached)
         * @memberof quixot.Util
         * @param asfloat {Boolean} optional
         * @returns {Number} positive integer
         * @example
         * quixot.Util.incr(true); // 30.07000000000001
         * quixot.Util.incr();    // 31
         */
        incr: util_incr,
        /**
         * if no parameters are provided a currentTimestamp value will be returned. id method is called twice
         * in less than a milisecond, a quixot.Util.incr() value will be returned to make sure return values
         * are avoided
         * @memberof quixot.Util
         * @param min limit range if "max" is not provided
         * @param max limit range
         * @returns {Number} float
         * @example
         * quixot.Util.randNr(3); // will generate numbers betwen 0 and 3, like 0.6573690931544247
         * quixot.Util.randNr(2, 4); // will generate numbers betwen 2 and 4, like 2.3124963172024833
         * quixot.Util.randNr(-5); // will generate numbers betwen -5 and 0, like -4.3664502906423195
         */
        randNr: util_randNr,
        /**
         * same usage as "randNr", only it returns an integer
         * @memberof quixot.Util
         * @param min
         * @param max
         * @returns {Number} float
         */
        randInt: util_randInt
    },
    /**
     * supports browser && nodejs
     * @module Cache
     * @namespace Cache
     * @memberof quixot
     */
    Cache: {
            /**
             * caching instances factory
             * @method getInstance
             * @memberof quixot.Cache
             * @param instanceName{String}
             * @param lifetime {Number}
             * @returns {Object} a new or an existing caching instance
             */
            getInstance: cache_getInstance,

            /**
             * put item inside default cache instance
             * @method put
             * @memberof quixot.Cache
             * @param key {String}
             * @param value {String|Number|Array|Object}
             * @returns {Boolean} true if cache is populated
             */
            put: function (key, value) {
                return domainCacheInstance.put(key, value)
            },

            remove: function (key) {
                domainCacheInstance.remove(key);
            },

            getData: function () {
                return  domainCacheInstance.getData()
            },

            getSafe: function (propname, defaultvalue) {
                return  domainCacheInstance.getSafe(propname, defaultvalue)
            }
    },
    /**
     * contains data related to enviroment:
     * @namespace Env
     * @memberof quixot
     * @example
     * quixot.Env.jsEngine.isBrowser; //true if script is running in browser
     * quixot.Env.jsEngine.isNodeJs;  //true if script is running in node js
     * quixot.Env.javaEnabled;        //true if java is enabled in browser,
     *                                             // or if a path to JAVA_HOME exist is operating system enviroment
     * quixot.Env.tempDir             //path to operating system temporary directory
     * quixot.Env.homeDir             //path to operating system user home directory
     * quixot.Env.javaPath            //path to java binary (java.exe || java)
     */
    Env: envData,

    /**
     * system information (browser|nodejs)
     * @namespace System
     * @memberof quixot
     */
    System: {

        battery: system_battery,
        screen: screen_info,
        performance: system_getPerformance,

        /**
         * operating system info
         * @memberof quixot.System
         * @namespace os
         * @example
         * quixot.System.os.name; // returns the operating system generic name
                                  // nodejs support is provided via os.type if exists otherwise via
                                  // os.platform. Result may be "Windows|Mac|Linux"
           quixot.System.version  // returns operatinng system version
                                  // result may vary based on scanned features
                                  // browsers will return data based on user agent, nodejs
                                  // or other engines may provide content via 'os.release'
         */
        os: os_info
    },


    /**
     *  browser information< br/>
     *  @namespace Browser
     *  @memberof quixot
     *  @example
     *  quixot.Browser.name; (Chrome|Firefox|Explorer|Opera|iCab|rekonq|Midori|Arora|Stainless|Epiphany|K-Meleon|Camino|Maxthon|SeaMonkey|Edge|OmniWeb|Apple|KDE|Netscape|MSIE|Gecko|Mozilla|Tizen)
     *  quixot.Browser.version;
     */
    Browser: {
        name: browserName,
        version: browserVersion,
        searchedData: browser_searched_data,
        is: getIs(),
        has: getHases(),
        get: getGeetters()
    },

    /**
     * the unit testing namespace.
     * @namespace Sancho
     * @memberof quixot
     */
    Sancho : {
        /**
         * For NodeJS environment, built-in 'assert' library will be used.
         * @method equals
         * @memberof quixot.Sancho
         * @returns {Boolean} true if test is passed
         * @example
         * quixot.Sancho.equals(1, 1);
         */
         equals: sancho_equals,
        
         deepEquals: sancho_deepEquals,
         hasData: sancho_hasData,
         hasProperty: sancho_hasProperty,

        /**
         * verify if a list contains no duplicates
         * @method noDuplicates
         * @memberof quixot.Sancho
         * @param list {Array}
         * @returns {Boolean}
         * @example
         * quixot.Sancho.noDuplicates([1, 8, 3, 4, 9, 7, 2 ])
         */
         noDuplicates: sancho_noDuplicates,
         donkey: sancho_monkey,
         setConfig: function (c) {
             testingCfg = c;
         },
         getConfig: function () {
             return testingCfg;
         }
    },

    Tween: Tween,
    Easing: Easing,

    /**
     * minimal graphic user interface components
     * designed to run inside any type of enviroment and provide if possible
     * native behaviour on visual components
     * @namespace Mingui
     * @memberof quixot
     */
    Mingui: {
        /**
         * for browsers the notify action will first try create a native html5 notification
         * if domain protocol is "http" or "https". <br /> Second second approach will
         * be to create a pop-up window. Please remember that second tryout will also
         * apply if user native notifications are blocked from settings.<br />
         * Finally, if the pop-up window is blocked, a simple html notification will
         * be added to current document, styled by default with operating system colors. <br />
         *
         * For nodejs enviroments
         * if java path is detected a spawned process wil start. (required java 1.8, this feature is still under developpement)
         * @method notify
         * @memberof quixot.Mingui
         * @param title {String}
         * @param text {String}
         * @param picture {String}
         * @param lifetime {Number}
         * @param success {Function}
         * @param failure {Function} although the method returns false due to known reasons, this callback is safe
         *                           to use. For example, native html5 notification require user approval. In this case
         *                           method will return false, but if user press "Allow" the "failure" callback
         *                           will never be called
         * @param onclick {Function} Attention!!! This callback may run without context in some implementations.
         * @param onclose {Function} Attention!!! This callback may run without context in some implementations.
         * @returns {Boolean|Object} false if notification fails to be displayed due to known reasons, an object with "remove()" method.
         */
        notify: cross_notify
    },

    Http: {
        request: http_request,
        doGet:http_get,
        doPost: http_post,
        doPostXForm: http_post_x_form
    },

    /**
     * Time utils
     * @namespace Time
     * @memberof quixot
     */
    Time: {
        /**
         * @method interval
         * @memberof quixot.Time
         * @param count {Number} required
         * @param type {String} required, one of (nano|second|minute|hour|day|month|year)
         * @returns {Number} the value in milliseconds of required parameters
         * @example
         * quixot.Time.interval(4, 'year'); // returns 126144000000
         */
        interval: ste_time_interval,
        dateAdd: time_date_add,
        dateRoll: time_date_roll,
        dateToString: date_to_string,
        next: time_next_date
    },
    GOG: gog_root,

    /**
     * @namespace Dulcineea
     * @memberof quixot
     */
    Dulcineea: {
        /**
         * @namespace compiler
         * @memberof quixot.Dulcineea
         */
        compiler: {
            /**
             * executes a call for a JSON formatted object
             * @method execute
             * @memberof quixot.Dulcineea.compiler
             * @param caller {String}
             * @param jsonData {Object|JSON}
             * @returns {Object}
             * @example
             * quixot.Dulcineea.compiler.execute('a.b', {a:{b: 1}});
             * //returns "1"
             */
            execute: execute_js,

            /**
             * converts a string into a list of valid JSON callers
             * @method extract
             * @memberof quixot.Dulcineea.compiler
             * @param {String} input
             * @returns {Array}
             * @example
             * quixot.Dulcineea.compiler.extract('a.b.c'); //returns ['a', 'b', 'c']
             * quixot.Dulcineea.compiler.extract('a.b[0]c["data"]'); //returns ["a", "b", "0", "c", "'data'"]
             */
            extract: extract_callers
        },
        templateRender : template_replace
    },
    /**
     * require safe support: cached node js requirements <br />
     * TODO support for http://requirejs.org/
     * @memberof quixot
     */
    require: __require,
    packInfo: quixot_pack_info,
    debug: {
        atos_memodata: function () {
            return util_atos_memodata;
        },
        wGL: function () {
            return  webGL;
        }
    }


}; return exportable;})();if(typeof module !='undefined') {module.exports = quixot}