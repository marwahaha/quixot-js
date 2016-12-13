/**
 * fixers for any js engine
 */



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
            var isArray = Array.isArray || function (a) { return toString.call(a) === '[object Array]'; };
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
                    } else if (isArray(value)) {
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
    Array.prototype.indexOf = function(searchElement, fromIndex) {

        var k;

        // 1. Let o be the result of calling ToObject passing
        //    the this value as the argument.
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let lenValue be the result of calling the Get
        //    internal method of o with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = o.length >>> 0;

        // 4. If len is 0, return -1.
        if (len === 0) {
            return -1;
        }

        // 5. If argument fromIndex was passed let n be
        //    ToInteger(fromIndex); else let n be 0.
        var n = fromIndex | 0;

        // 6. If n >= len, return -1.
        if (n >= len) {
            return -1;
        }

        // 7. If n >= 0, then Let k be n.
        // 8. Else, n<0, Let k be len - abs(n).
        //    If k is less than 0, then let k be 0.
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 9. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the
            //    HasProperty internal method of o with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            //    i.  Let elementK be the result of calling the Get
            //        internal method of o with the argument ToString(k).
            //   ii.  Let same be the result of applying the
            //        Strict Equality Comparison Algorithm to
            //        searchElement and elementK.
            //  iii.  If same is true, return k.
            if (k in o && o[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}/**
 * @namespace quixot
 */
var quixot = (function(){





var strType = (typeof 'string') + '',
    nrType = (typeof 2) + '',
    objType = (typeof {}) + '',
    boolType = (typeof true) + '',
    fncType = (typeof function(){}) + '',
    alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');


var fingerPrintData = {
    _nsp: [0],
    _errs: [0],
    registeredMethods: '',
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
    dataTypes: strType +':'+ nrType+ ':' + objType+':' + boolType+':' + fncType,
    pi: (function () {
        return Math.PI;
    })(),
    ln2: (function () {
        return Math.LN2;
    })(),
    ln10: (function () {
        return Math.LN10;
    })(),
    log2e: (function () {
        return Math.LOG2E;
    })(),
    log10e: (function () {
        return Math.LOG10E;
    })(),
    sqrt1_2: (function () {
        return Math.SQRT1_2;
    })(),
    sqrt: (function () {
        return Math.SQRT2;
    })(),
    _timeZoneAbbr : (function(){
        var d = new Date() + '', parts = d.split('(');
        if(parts.length > 0) {
            try {
                d = parts[1].split(')')[0];
            } catch (e) {
                d = stringify(e, 5);
            }

            return d;
        }
        return '';
    })(),
    fun: (function () {
        var txt = '';

        function check(id, method, p1, p2) {
            var result = '';
            if (method) {
                if (p1 && p2) {
                    try {
                        result =  method(p1, p2)
                    } catch (e) {
                        result = e+'';
                    }
                } else {
                    try {
                        result =  method(p1)
                    } catch (e) {
                        result = e+'';
                    }
                }
            } else {
                result = '[NS]';
            }
            return id + result;
        }

        if(typeof Math != 'undefined') {
            txt+= check('imul', Math.imul, 0xfffffffe, 5);
            txt+= check('acos', Math.acos, 0.5);
            txt+= check('acosh', Math.acosh, 2);
            txt+= check('asin', Math.asin, 0.5);
            txt+= check('asinh', Math.asinh, 1);
            txt+= check('atan', Math.atan, 1);
            txt+= check('atanh', Math.atanh, 0.5);
            txt+= check('cbrt', Math.cbrt, 2);
            txt+= check('ceil', Math.ceil, -7.004);
            txt+= check('clz32', Math.clz32, true);
            txt+= check('cos', Math.cos, 1);
            txt+= check('cosh', Math.cosh, 1);
            txt+= check('exp', Math.exp, 1);
            txt+= check('expm1', Math.expm1, 1);
            txt+= check('floor', Math.floor, -45.95);
            txt+= check('fround', Math.fround, 1.337);
            txt+= check('log', Math.log, 10);
            txt+= check('log10', Math.log10, 2);
            txt+= check('log1p', Math.log1p, 1);
            txt+= check('log2', Math.log2, 3);
            txt+= check('sin', Math.sin, 1);
            txt+= check('sinh', Math.sinh, 1);
            txt+= check('sqrt', Math.sqrt, 2);
            txt+= check('tan', Math.tan, 1);
            txt+= check('tanh', Math.tanh, 1);
        }

        if (typeof NaN != 'undefined') {
            txt+='NaN' + NaN;
        }

        if (Math.hypot) {
            txt+='hypot'+ Math.hypot(3, 4, '5') + '#' + Math.hypot(3, 4);
        }

        return txt;

    })()
};


/**
 * the EVILUATORS!!!!
 * @type {string[]}
 */
var evilUators = [
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
];



var line = [],  memodata = {};

for(var i = 0; i < evilUators.length; i++) {
    try {
        var evaluator = evilUators[i], result;
        result = eval(evaluator);
        props = objKeys(result);
        for(var k = 0; k < props.length; k++) {
            var currentKey = props[k];
            if(line.indexOf(currentKey) < 0) {
                line.push(currentKey);
            }
        }
    } catch (e){
      ;;
    }
}

fingerPrintData.registeredMethods += line.join('');



function getFingerPrintText() {
    var text = '';
    var obj = fingerPrintData; //use ovverideble data
    for(var i in obj){
        text += i + (obj[i]);
    }
    return text;
}



function getFingerprintIdentifier() {
    var text = getFingerPrintText().split('');
    var resp = '';
    var lasnum = 2;
    var alphas = [], nums = [], others = [];
    var escapes = '_,{}[]\/-|=()+#.;'.split('');
    var eObj = {};
    for(var i = 0 ; i < escapes.length; i++) {
        eObj[escapes[i]] = 2;  //TODO modify this
    }

    var cnt1 = 0;
    for(var i = 0; i < text.length; i++) {
        var c = text[i];
        if(c=== ' ' || c === '\n' || c === '\t') {
            continue;
        }
        if(escapes.indexOf(c) > -1) {
            resp+=numberToString(eObj[c]);
            eObj[c]++;
            continue;
        }
        if(isAlpha(c)) {
            if(i % 2 == 0) {
                resp+=c;
            } else {
                resp = c+resp;
            }
        } else {
            if(+c) {
                lasnum = parseInt(c);
            }
            var mind = Math.round(resp.length / lasnum);
            resp = resp.substring(0, mind) + c + resp.substring(mind, resp.length);
        }
    }
    return resp;
}



function getFingerprintNumbers(){
    var text = getFingerPrintText().split(''), nums = '';

    for( var i = text.length ; i > 0; i--){
        var c = text[i];
        if(+c || c === '0') {
            nums+=c;
        }
    }
    return nums;
}



function isValidFingerprintNumber(strdata) {
    return strdata == '0' || strdata.length > 1;
}function __isnodejs() {
    return (typeof module !== 'undefined' && module.exports);
}


function __getCaller(args){
    if(args && args.calee && args.callee.caller) {
        var fline =  args.callee.caller + '';

        return fline;
    }

    return '';
}

function __isbrowser() {
    return  (typeof  window != 'undefined');
}

var isBrowser = __isbrowser();

function objKeys(obj) {
    if(!obj){
        return [];
    }
    var keys = [];
    for(var i in obj){
        keys.push(i);
    }
    return keys;
}

function simplify(obj) {
    var r = {};
    for(var i in obj) {
        if(isPrimitive(obj[i])) {
            r[i] = obj[i] + '';
        }
    }
    return r;
}

function serialize(obj, stackno,
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
    if(isPrimitive(obj)) {
        return doubleQuotes + obj + doubleQuotes;
    }

    if(isFunction(obj)) {
        return functval;
    }

    if(isArray(obj)) {
        var r = r1;
        for(var i = 0; i < obj.length; i++) {
            r += serialize(obj[i], stackno,
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

    var keys = objKeys(obj);
    var r = d1, n = 0;
    for (var j in obj) {
        n++;
        var value = serialize(obj[j], stackno -1,
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


function encodeObject(obj, stackno) {
    return serialize(obj, stackno, '','','','','','','','','','','','','');
}


function stringify(obj, stackno) {
    return serialize(obj, stackno, 0, 'true', 'false', '"[funct]"', '"', ',', ':', '[', ']', '{', '}', '[stack]');
}



/**
 * TODO for nodejs
 * @returns {*|{}}
 */
function getPerformance(){
    return window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
}


function isPrimitive(d){
    return (typeof d === strType || typeof d === nrType || typeof d === boolType);
}

/**
 * TODO improve this
 * @param d
 * @returns {boolean}
 */
function isFunction(d){
    return typeof d === fncType;
}


/**
 * TODO improve this
 * @param d
 * @returns {boolean}
 */
function isArray(d){
    return Array.isArray(d);
}

function getFingerPrintData() {
    return fingerPrintData;
}

function isAlpha(c){
    return alphabet.indexOf(c) > -1;
}

function numberToString(numval, strlist, zval) {



    if(!zval) {
        zval = 0;
    }

    if(!strlist) {
        strlist = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    }

    if(isPrimitive(strlist)){
        strlist = strlist.split('');
    }





    var response, pid = numval + '' + strlist.join('') + zval+'';
    if(memodata[pid]) {
        return memodata[pid];
    }


    if(strlist.length === 1) {
        response = new Array(numval.length).join(strlist[0]);
        memodata[pid] = response;
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
            response = strlist[zval] + numberToString(rest, strlist, zval+1);
            memodata[pid] = response
            return response;
        } else {
            return strlist[zval];
        }
    }


    if(!(+numval) || numval instanceof Date) {
        numval = numval+''; //force
        response = numval.split('')[0];
        rest = numval.substring(1, numval.length);

        if(+response) {
            response = numberToString(response, strlist, zval);
        }

        if(rest) {
            rest = numberToString(rest, strlist, zval);
            response+=rest;
        }
        memodata[pid] = response;
        return response;
    }



    var varFloat = parseFloat(numval);


    if(varFloat < strlist.length) {
        if(varFloat % 1 == 0) {
            response = strlist[parseInt(varFloat)];
            memodata[pid] = response;
            return response;
        } else {
            var rest = varFloat % 1;
            if(rest < 1) {
                rest *= 10;
            }
            response = numberToString(Math.floor(varFloat), strlist, zval) + numberToString(rest, strlist, zval);
            memodata[pid] = response;
            return response;
        }
    }
    if(varFloat % 1 == 0) {
        if(varFloat < 10) {
            response = numberToString(1, strlist, zval ) + numberToString(varFloat - 1, strlist, zval);
            memodata[pid] = response;
            return response;

        }
        response = numberToString(Math.floor(varFloat / 10), strlist, zval ) + numberToString(varFloat % 10, strlist, zval);
        memodata[pid] = response;

        return response;
    }

    rest = varFloat % 1;
    if(rest < 1) {
        rest*=10;
    }
    response = numberToString(Math.floor(varFloat), strlist, zval) + numberToString(rest, strlist, zval);
    memodata[pid] = response;
    return response;
}


function stringToHex(integer) {
    var str = parseInt(integer).toString(16);
    return str.length === 1 ? '0' + str : str;
}


function rgbToHex(r, g, b) {
    return '#' + stringToHex(r) + stringToHex(g) + stringToHex(b);
}


function rgbToHexShift(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}





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
}var webGL = false;

if (browserDocument.createElement) {
    try {
        var canvas = browserDocument.createElement('canvas');

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

        webGL =  (!!browserWindow.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ) );

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


                fingerPrintData.registeredMethods+=objKeys(webGL).join('');
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
    if (__isnodejs()) {
        if (requirememo[modulename]) {
            return requirememo[modulename];
        }
        defaultLoggerInstance.info(modulename);
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

            }
        }
    }
    console.log('[usage in this context not implemented for requirement ' + modulename + ']');
    return {}
}

//TODO suport unescape...
function _decodeURIString(strd) {
    return decodeURIComponent(strd)
}


function getValFromHttpParam(val) {
    if(val.indexOf && val.indexOf(',') > -1) {
        return (val+'').split(',')
    }
    if(+val) {
        return parseFloat(val);
    }

    var obj =null;
    try {
        obj = JSON.parse(_decodeURIString(val));
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
        // console.log(arr);
        var last = arr[1];
        var parts = last.split('&');

        if (parts.length >= 1) {
            for (var i = 0; i < parts.length; i++) {
                var keyVal = parts[i].split('=');
                if (keyVal.length > 1) {
                    response[keyVal[0]] = getValFromHttpParam(keyVal[1]);
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
    if(typeof document != 'undefined'){
        return url_get_params(document.URL);
    }
    return {
        params: {}
    };
}


function url_current_search() {
    if(typeof  window != 'undefined' &&  window.location &&  window.location.search){
        return  window.location.search
    }
    return '';
}


function url_get_params(url) {
    return url_decode(url).params;
}


function url_getDomainFromUrl(url){
    url = url + ''; //to avoid indexOf failing
    var domain = (url.indexOf('://') > -1) ? url.split('/')[2] : url.split('/')[0];
    if(domain){
        return domain.split(':')[0];
    }
    return 'localhost';
}

function url_currentDomain() {
    if(typeof document != 'undefined') {
        if(document.domain){
            return document.domain;
        }
        if(document.URL){
            return url_getDomainFromUrl(document.URL);
        }
    }
    return 'localhost';
}


function url_current_path() {
    if(typeof  window != 'undefined' && window.location && window.location.pathname){
        return window.location.pathname
    }
    return '';
}

function url_querify(object) {
    var cont = [];
    var text = '';
    if (object != null){
        for (var i in object) {
            if(i && object[i]){
                cont.push({
                    pp: i,
                    vl: object[i]
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
}





    var logger_defaultConfiguration = {
         consoleAppender: true,
         consoleFormatter: function (name, level, data) {
                if(!__isbrowser()){
                    console.log(' [ ' + name + '.'+level + ' '+ data.message + ' ]');
                    return;
                }

             if(level === 'error'){
                 console.error(name + '.'+level + ' '+ data.message, data);
             }
             else if(level === 'warn'){
                 console.warn(name + '.'+level + ' '+ data.message, data);
             }
             else {

                     console.log(name + '.'+level + ' '+ data.message, data);


             }


         },
         fileAppender: true, //TODO for nodejs a model {file: path, level: level}  //  domAppender: false, //{qlog = ?|ALL, level=??|ALL, domPattern: 'String' }

         fileFormatter: function (name, level, data) {
                if(typeof window != 'undefined'){
                    if(window.document&& window.document.body){
                        var div, idn= 'quixotFileAppender';
                        if(document.getElementById(idn)){
                            div = document.getElementById(idn);
                        } else {
                            div = document.createElement('pre');
                            div.id = idn;
                            document.body.appendChild(div);

                        }
                        var txt = name+' '+level+' '+data.timestamp+ ' ' + data.message + '\t' + JSON.stringify(data)+ '\n';
                        div.innerHTML += txt;
                    }
                }
         },

         logStack: true
    }




    var logger_options_key = 'logopts';
    

    function logger_getConfigFromUrl() {
        if(logger_options_key){
            return url_current_params()[logger_options_key];
        }

        return null;
    }

    function getStack(pe) {
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


    function LogInstance(name, config) {
        var sessionLogs = {};

        var urlConfig = logger_getConfigFromUrl();

        if(urlConfig){
            var localData = urlConfig[name] || urlConfig['ALL'];

            if(localData){
                for(var i in localData){
                    config[i] = localData[i];
                }
            }

        }



        

        function log(level, message) {

            var localConfig;
            if(config[level]){
                localConfig = config[level];
            } else {
                localConfig = config;
            }

            if(!sessionLogs[level]) {
                sessionLogs[level] = [];
            }



            var stackData = false;
            if(message instanceof Error){
                stackData = getStack(message);
            } else if(config.logStack){
                stackData = getStack()
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
            
            if(localConfig.consoleAppender) {
                 localConfig.consoleFormatter(name, level, obj);
            }

            if(localConfig.fileAppender){
               localConfig.fileFormatter(name, level, obj);
            }

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
            }
        }
    }


    var defaultLoggerInstance = new LogInstance('quixot', logger_defaultConfiguration);

    var logger_container = {
        'quixot': defaultLoggerInstance
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

        function getCookieValue(offset) {
            var endstr = document.cookie.indexOf(';', offset);
            if (endstr == -1) {
                endstr = document.cookie.length;
            }
            return unescape(document.cookie.substring(offset, endstr));
        }

        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg)
                return getCookieValue(j);
            i = document.cookie.indexOf(" ", i) + 1;
            if (i === 0)
                break;
        }

        return null;
    }

    function updateCookie(name, value, p_expires, p_path, p_domain, p_secure) {
        deleteCookie(name, p_path, p_domain);
        setCookie(name, value, p_expires, p_path, p_domain, p_secure);
    }


    function setCookie(name, value, p_expires, p_path, p_domain, p_secure) {

        if(typeof document == 'undefined'){
            return;
        }
        
        var expires = p_expires ? p_expires : null;

        if (typeof expires == 'number') {
            var now = new Date();
            var nowToInt = +now;
            var overToInt = nowToInt + expires;
            expires = new Date(overToInt);
        }

        var path = p_path ? p_path : null;
        var domain = p_domain ? p_domain : null;
        var secure = p_secure ? p_secure : false;

        var cookieSuffix = ((expires === null) ? "" : ("; expires=" + (expires.toUTCString() || expires.toGMTString() || expires.toString()))) +
            ((path === null) ? "" : ("; path=" + path)) +
            ((domain === null) ? "" : ("; domain=" + domain)) +
            ((secure === true) ? "; secure" : "");


        var cookieStr = name + "=" + escape(value) + cookieSuffix;


        document.cookie = cookieStr;

        return cookieStr;

    }


    function deleteCookie(name, p_path, p_domain) {
        setCookie(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), p_path, p_domain);
    }


   
 var envData = {
    jsEngine: {
        isNodeJs: __isnodejs(),
        isBrowser: isBrowser
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


            if (typeof window != 'undefined' && window.screen) {
                if(window.screen.width) {
                    width = window.screen.width;
                }

                if(window.screen.height) {
                    height = window.screen.height;
                }

                if(window.screen.availHeight) {
                    availHeight = window.screen.availHeight;
                }

                if(window.screen.availWidth	) {
                    availWidth	 = window.screen.availWidth	;
                }

                if(window.screen.colorDepth	) {
                    colorDepth	 = window.screen.colorDepth	;
                }

                if(window.screen.pixelDepth	) {
                    pixelDepth	 = window.screen.pixelDepth	;
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

    if(__isnodejs()){

        var nos = __require('os');
        console.log(nos);
        return {
            name: ( nos.type ? nos.type() : ( nos.platform ? nos.platform() : '') ),
            version: (nos.release ? nos.release() : '')
        }
    }
    return {}
})()
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
        var oldData = JSON.parse(line);
        if(newdata){
            var props = 0;
            for(var i in newdata){
                oldData[i] = newdata[i];
                props++;
            }

            if(props > 0){

                console.log('saving' + JSON.stringify(oldData));
                fs.writeFileSync(path, JSON.stringify(oldData));
            }
        }
    }

    function removeNodeJsCache(keyname, slot) {
        var path = getCachePath(), fs = __require('fs');
        var line = fs.readFileSync(path, "utf8");
        var oldData = JSON.parse(line);
        var obj = oldData[keyname];
        delete obj[slot];
        fs.writeFileSync(path, JSON.stringify(oldData));
    }

    function getNodeJsCache() {
        var path = getCachePath(), fs = __require('fs');
        if (!fs.existsSync(path)) {
            var initData = {
                creationDate: new Date(),
                writer: 'quixot'
            };
            fs.writeFileSync(path, JSON.stringify(initData));
            return initData;
        }
        var line = fs.readFileSync(path, "utf8");
        var oldData = JSON.parse(line);
        return oldData;
    }


    function CacheInstance(paramname) {
        var name = 'qch' + (paramname+'');
        name = name.replace(/\?/g, 'î')
            .replace(/=/g, 'ă')
            .replace(/\//g, 'ț')
            .replace(/\./g, '₤')
        ;



        var data = (function () {
            var r;
            if(isBrowser) {
                if(typeof localStorage != 'undefined') {
                    r = localStorage.getItem(name);
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

        var propKeys = 1;


        this.put = function (slot, object) {
            if(slot && object) {
                if(!data) {
                    data = {};
                }
                data[slot] = object;
            }
            this.save();
        }


        var saveTimeoutId = 0;

        this.remove = function (slot) {
            if(data) {
               delete data[slot];
               if(!isBrowser){
                   removeNodeJsCache(name, slot);
               } else{
                   this.save();
               }
            }
        }



        this.save = function () {
            if(!data) {
                return;
            }
            if(isBrowser) {
                clearTimeout(saveTimeoutId);

                if(typeof localStorage != 'undefined') {
                    localStorage.setItem(name, JSON.stringify(data));
                }
                setCookie(name, JSON.stringify(data));

                saveTimeoutId = setTimeout(function () {
                    getCacheInstance(paramname).save();
                }, 1000 * 10);

            } else {
                var vdata = {};
                vdata[name] = data;
                saveNodeJsCache(vdata);
            }
        }



        this.getData =function () {
            return data;
        }


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
        }
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


function getCacheInstance(instancename) {
                if(!cacheContainer[instancename]) {
                    cacheContainer[instancename] = new CacheInstance(instancename);
                }
                return cacheContainer[instancename];
}



    function getWindow() {
        if(typeof window != 'undefined') {
            return window;
        }
        return {};
    }

    function getNavigator() {
        if(typeof navigator != 'undefined') {
            return navigator;
        }

        return getWindow().navigator || {};
    }

    function getChrome() {
            return getWindow().chrome;
    }

    function getNetscape() {
        return getWindow().netscape;
    }

    function getAppVersion() {
        return getNavigator().appVersion || {};
    }

    function getUserAgent() {
        return getNavigator().userAgent || ' ';
    }

    var dataBrowser = [
        {string: getUserAgent(), subString: 'iCab', versionSearch: 'iCab', identity: 'iCab'},
        {string: getUserAgent(), subString: 'rekonq', versionSearch: 'rekonq', identity: 'Rekonq'},
        {string: getUserAgent(), subString: 'Midori', versionSearch: 'Midori', identity: 'Midori'},
        {string: getUserAgent(), subString: 'Arora', versionSearch: 'Arora', identity: 'Arora'},
        {string: getUserAgent(), subString: 'Stainless', versionSearch: 'Stainless', identity: 'Stainless'},
        {string: getUserAgent(), subString: 'Epiphany',versionSearch: 'Epiphany', identity: 'Epiphany'},
        {string: getUserAgent(), subString: 'K-Meleon', versionSearch: 'K-Meleon', identity: 'K-Meleon'},
        {string: getNavigator().vendor, subString: 'Camino', identity: 'Camino'},
        {string: getUserAgent(), subString: 'Maxthon', versionSearch: 'Maxthon', identity: 'Maxthon'},
        {string: getUserAgent(), subString: 'SeaMonkey', versionSearch: 'SeaMonkey', identity: 'SeaMonkey'},
        {string: getUserAgent(), subString: 'Edge', identity: 'Edge', versionSearch: 'Edge'},

        {string: getUserAgent(), subString: 'Chrome', identity: 'Chrome'},
        {string: getUserAgent(), subString: 'OmniWeb', versionSearch: 'OmniWeb/', identity: 'OmniWeb'},
        {string: getNavigator().vendor, subString: 'Apple', identity: 'Safari', versionSearch: 'Version'},
        {prop: getWindow().opera, identity: 'Opera', versionSearch: 'Version'},
        {string: getNavigator().vendor, subString: 'iCab', identity: 'iCab'},
        {string: getNavigator().vendor, subString: 'KDE', identity: 'Konqueror'},
        {string: getUserAgent(), subString: 'Firefox', identity: 'Firefox'},
        {string: getUserAgent(), subString: 'Netscape', identity: 'Netscape'},
        {string: getUserAgent(), subString: 'MSIE', identity: 'Explorer', versionSearch: 'MSIE'},
        {string: getUserAgent(), subString: 'Gecko', identity: 'Mozilla', versionSearch: 'rv'},
        // for older Netscapes (4-)
        {string: getUserAgent(), subString: 'Mozilla', identity: 'Netscape', versionSearch: 'Mozilla'}
    ];


    var dataOS = [
        {string: getNavigator().platform, subString: 'Win', identity: 'Windows'},
        {string: getNavigator().platform, subString: 'Mac', identity: 'Mac'},
        {string: getUserAgent(), subString: 'iPhone', identity: 'iPhone'},
        {string: getUserAgent(), subString: 'iPad', identity: 'iPad'},
        {string: getUserAgent(), subString: 'Android', identity: 'Android'},
        {string: getNavigator().platform, subString: 'Linux', identity: 'Linux'}
    ];



    


    var versionStringToSearch = '';
    function searchString(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            if(!dataString) {
                continue;
            }
            var dataProp = data[i].prop;
            versionStringToSearch = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1) {
                    return (data[i].identity);
                }
            }
            else if (dataProp) {
                return ( data[i].identity);
            }
        }
    }

    function searchVersion(dataString) {
        if(!dataString || !dataString.indexOf) {
            return '';
        }
        var index = dataString.indexOf(versionStringToSearch);
        if (index === -1) {
            return;
        }
        return parseFloat(dataString.substring(index + versionStringToSearch.length + 1));
    }

    var operatingSystem, operatingSystemSub, browserName, browserVersion, javaEnabled = false, pluginsList = [];

    function scand(object) {
        if(!object) {
            return;
        }
        for(var i in object){
            var id = (i+object[i]);
            if(pluginsList.indexOf(id) == -1) {
                pluginsList.push(id);
                scand(object[i]);
            }
        }
    }


    operatingSystem = searchString(dataOS) || 'an unknown OS';

    if (operatingSystem === 'Linux') {  //check for specific linux flavours
        if(getUserAgent().toLowerCase().indexOf('ubuntu')) {
            operatingSystemSub = 'Ubuntu';
        }
    }

    if(operatingSystem === 'Windows') {    //check for specific windows flavours
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(getUserAgent())){
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

    browserName = searchString(dataBrowser) || 'An unknown browser';
    browserVersion = searchVersion(getUserAgent()) || searchVersion(getAppVersion()) || 'an unknown version';

    //check for ie11 number
    var isAtLeastIE11 = !!(getUserAgent().match(/Trident/) && !getUserAgent().match(/MSIE/));
    if (isAtLeastIE11) {
        browserName = 'Explorer';
        var isIE11 = !!(getUserAgent().match(/Trident/) && getUserAgent().match(/11/));
        if (isIE11) {
            browserVersion = 11;
        }
    }

    //fix number for some chrome versions and detect chromium
    if (browserName === 'Chrome') {
        if (getUserAgent().toLowerCase().indexOf('chromium') > -1) {
            browserName = 'Chromium';
        }
        if(browserVersion === 'an unknown version') {
            var version = getUserAgent() || getAppVersion();
            version = version.split('Chrome');
            if (version[1]) {
                var matches = version[1].match(/\d+/);
                if (matches[0]) {
                    browserVersion = parseInt(matches[0]);
                }
            }
        }
    }


    //some extra checks are required for newer browsers:

    var extraData = [
        {
            doMatch: function (uastr) {
                return uastr.indexOf('OPR') > 1;
            },
            getVersion: function(){
                var parts = getUserAgent().split('OPR');
                var r = '';
                if(parts[1]) {
                    var s = parts[1]+'';

                    for(var i = 0; i < s.length; i++) {
                        if(!isNaN(s[i]) || s[i] === '.') {
                            r+=s[i];
                        }
                        if(s[i] === ' ') {
                            return (r);
                        }
                    }
                    return (r);
                }
                return 'unknown version';
            },
            identity: 'Opera'
        }
    ];


    for(var i = 0; i < extraData.length; i++) {
        var rule = extraData[i];
        if(rule.doMatch(getUserAgent())) {
            browserName = rule.identity;
            browserVersion = rule.getVersion();
        }
    }


    if(getNavigator().javaEnabled) {
        try {
           envData.javaEnabled = getNavigator().javaEnabled();
        } catch (e) {
           envData.javaEnabled = false;
        }
    }


    scand(getNavigator().plugins);
    scand(getNavigator().mimeTypes);




    function getIs() {

        return {
            iPod: ( getUserAgent().indexOf("iPod") > -1),
            iPhone : ( getUserAgent().indexOf("iPhone") > -1),
            nokiaN :( getUserAgent().indexOf("NokiaN") > -1),
            wii : (getUserAgent().indexOf("Wii") > -1),
            ps: ( /playstation/i.test(getUserAgent()) ),
            xpSP2: (getUserAgent().indexOf('SV1') !== -1),
            iPhoneiPod: ( getUserAgent().match(/iPhone|iPod/i) ),
            iPhoneiPadiPod: ( getUserAgent().match(/iPhone|iPad|iPod/i) ),
            desktop: ( !getUserAgent().match(/iPhone|iPad|android/i) ),
            android: ( getUserAgent().match(/android/i) ),
            winPhone: ( /IEMobile/.test(getUserAgent()) ),
            chromeCRIOS: ( getUserAgent().match(/chrome|crios/i) ),
            iOS: (/iPad|iPhone|iPod/.test(getUserAgent()) && !MSStream  ),
            iPad: ( getUserAgent().match(/iPad/i) ),
            firefox: ( getUserAgent().match(/firefox/i) ),
            phoneDevice:( getUserAgent().match(/iPhone|android/i) ),
            iOS7: ( getUserAgent().match(/.*CPU.*OS 7_\d/i) ),
            iPhoneSafari: ( function(){
                var safari = !!getWindow().safari, iPhone = /iPhone/i.test(getUserAgent());
                return !!(iPhone && safari);
            })(),
            tabletAndroidFirefox: (/(?:Android; Tablet).*(?:Firefox\/)/i.test(getUserAgent()) ),
            msie: (function(){
                var ua = getUserAgent();
                var msie = ua.indexOf('MSIE ');
                if (msie > 0) { // IE 10 or older => return version number
                    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                }
                var trident = ua.indexOf('Trident/');
                if (trident > 0) { // IE 11 => return version number
                    var rv = ua.indexOf('rv:');
                    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                }
                var edge = ua.indexOf('Edge/');
                if (edge > 0) { // IE 12 => return version number
                    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                }
            })()
        }
    }


    function getHases() {
        return {
            chrome: getChrome()
        }
    }


    function getGeetters() {
        return {
            firefoxVersion: (function(version) {
                return (getUserAgent().toLowerCase().indexOf('firefox/' + version) !== -1);
            })(),
            androidVersion: (function() {
                var match = getUserAgent().match(/Android\s([0-9\.]*)/);
                return match ? match[1] : false;
            })(),
            iPadVersion: (getUserAgent().match(/(?:iPad);.*CPU.*(?:OS (.*)_)\d/i) )
        }
    }


    if(!os_info.name){
         os_info.name = operatingSystem;
    }

    if(!os_info.version){
        os_info.version = operatingSystemSub;
    }




    fingerPrintData.plugins = pluginsList.sort().join('');
    fingerPrintData.screen = encodeObject(screen_info);
    fingerPrintData.chrome = encodeObject(getChrome(), 8);
    fingerPrintData.netscape = encodeObject(getNetscape(), 4);
    fingerPrintData.navigator = encodeObject(simplify(getNavigator()));
    fingerPrintData.plugins = encodeObject(getNavigator().plugins, 3);
    fingerPrintData.mimeTypes =  encodeObject(getNavigator().mimeTypes, 3);


    var testingCfg = {
        debug: true,
        maxListSize: 20,
        strlist : 'abcdefghihklmnopqrstuvxyz',
        logging: logger_defaultConfiguration
    }






    function randomString(){
        var date = new Date();
        maxrand.str ++;
        var sum = numberToString(randInt(), testingCfg.strlist) + ''
                + numberToString(date.getMilliseconds(), testingCfg.strlist) + ''
                + numberToString(date.getMinutes(), testingCfg.strlist) + ''
                + numberToString(date.getHours(), testingCfg.strlist) + ''
                + numberToString(date.getDay(), testingCfg.strlist) + ''
                + numberToString(date.getDate(), testingCfg.strlist) + ''
                + numberToString(date.getMonth(), testingCfg.strlist) + ''
                + numberToString(date.getFullYear(), testingCfg.strlist) + ''
                + numberToString(date.getYear(), testingCfg.strlist) + ''
            ;

        return sum;

    }

    function monkey(strdata, iterations) {
        // console.log('prepare ' + iterations);
        // // if(!iterations) {
        //     return;
        // }

        var calls = [];
        for(var i = 0 ; i < iterations; i++) {
            console.log('prepare ' + i);
            console.log(randNr() + randomString() + randInt());

            console.log(randListInt());

             var tocalll = strdata.replace(/{string}/g, '"' + randomString()+ '"' )
            //         .replace(/{number}/g, randNr() )
                    .replace(/{integer}/g, randInt() )
                    .replace(/{integerList}/g, JSON.stringify(randListInt()) )
            //         .replace(/{numberList}/g, JSON.stringify(randListNr()) )
            //         .replace(/{stringList}/g, JSON.stringify(randListString()) )
                    .replace(/{objectList}/g, JSON.stringify(randListObj()) )
            //         .replace(/{object}/g, JSON.stringify(randObj()) )
                     .replace(/{any}/g, randAny() )
            //     ;
            // console.log('prepare ' + tocalll);
             calls.push(tocalll);


            eval(tocalll);

        }

        console.log(calls);

//         setTimeout(function () {
//
//
//             if(testingCfg.debug) {
//                 console.log(iterations + 'tocall = ' + tocalll);
//
//             }
//
//             eval(tocalll);
//             monkey(strdata, iterations -1);
//         }, 2);

    }


    var nodeAssert;
    if(__isnodejs()){
        try {
            nodeAssert = __require('assert');
        }catch (e){
            nodeAssert = false;
        }
        testingCfg.logging.logStack = false;
    }




    function equals(a, b) {

        if(nodeAssert){
            if(testingCfg.logging) {
                logger_getInstance('Tests', testingCfg.logging)
                    .info('check if ' + a + ' === ' + b);
            }
            nodeAssert(a === b);
        } else {
            if(a == b) {
                if(testingCfg.logging) {
                   logger_getInstance('Tests', testingCfg.logging)
                        .info('check if ' + a + ' === ' + b + ' ] SUCCESS');
                }
            }
            else {
                throw new  Error('check if ' + a + ' === ' + b + ' ---> FAIL');
            }
        }


        return a === b;
    }

        function hasData(item, message){

                if(!message){
                    if(typeof arguments != 'undefined') {
                        message = __getCaller(arguments);
                    }
                }

                if(typeof item != 'undefined' && item != '' && item != null){
                    if(testingCfg.logging) {
                       logger_getInstance('Tests', testingCfg.logging)
                            .info('check if ' + item + ' hasData ('+message+') ] SUCCESS');
                    }
                    return true;
                }
                throw new  Error(message + '---> FAIL');
                return false;

        }

    var maxrand = {
        nr: 1.5,
        intg: 10,
        str: 1,
        obj: 1,
        arr: 1
    }


    function randList(maxSize, getter) {
        var arr = [];
        var limit = Math.round(Math.random()*maxSize) + 1;
        for(var i = 0; i < limit; i++) {
            if(getter) {
                arr.push(getter());
            }
        }
        return arr;
    }


    function randListNr(maxSize, maxRand) {
        return randList(maxSize, function () {
            return randNr(maxRand);
        })
    }


    function randListInt(maxSize, maxRand) {
        return randList(maxSize, function () {
            return randInt();
        });
    }


    function randListString(maxSize) {
        if(!maxSize){
            maxSize = testingCfg.maxListSize;
        }
        return randList(maxSize, randomString);
    }


    function randListObj(maxSize) {
        if(!maxSize){
            maxSize = testingCfg.maxListSize;
        }
        return randList(maxSize, randObj);
    }


    function randAny() {
        var lrand = Math.round(Math.random() * 3);
        switch (lrand) {
            case 0:
                return '"' +randomString()+ '"';
            case 1:
                return randInt();
            case 2:
                return randNr();
        }

        return randInt();
    }


    function randObj() {
        maxrand.obj += 1;
        var lmax = randInt(maxrand.obj);

        var obj = {};
        for(var i = 0; i < maxrand.obj; i++) {
            obj[randomString()] = randAny();
        }

        return obj;
    }


    var uniqueVal = getCacheInstance('@qtst').getSafe('lup', 1);
    try {
        uniqueVal = parseFloat(uniqueVal);
    } catch (e) {
        uniqueVal = new Date().getTime();
    }


    
    function incr(asfloat) {
        if (asfloat) {
            uniqueVal+=0.01;
        } else {
            uniqueVal = parseInt(uniqueVal+1);
        }
        getCacheInstance('@qtst').put('lup', uniqueVal);
        return uniqueVal;
    }
    

    function randInt(min, max) {
       return Math.round(randNr(min, max))
    }



    
    function randNr(min, max) {
        if(min){
            if(!+min) {
                min = 1;
            }

            if(max){
                if(!+max) {
                    max = 2;
                }
                return min + (Math.random() * (max - min) );
            }

            return (Math.random() * min);
        }
        return incr();
    }





//    randNr = randNr,
//    randInt = randInt,
//    randList = randList,
//    randListStr = randListString,
//    randListObj = randListObj;
//    incr = incr;
//    randStr = randomString,
//    randAny = randAny,
//    randObj = randObj;




var Tween = function(start, end, steps, object) {
    var self = this;
    var speed = 100;
    var values = Easing(start, end, steps);
    var count = -1, updateHandlers = [], completeHandlers = [];

//console.log(start, end, steps, values)
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
            requestAnimationFrame(function () {
                doAnimate();
            }, 10)
            // console.log('calling = ' + values[count], updateHandlers[0].toString());
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














function _styleElement(element, obj) {
    for(var i in obj){
        element.style[i] = obj[i];
    }
}

var _html4notification_pid = 0;


function _getAppender() {
    return document.body;
}

var html4buffer = [];
var __html4notifyRemove = randomString() + incr();

if(__isbrowser()){

    window[__html4notifyRemove] = function (itemid) {

        if(document.getElementById(itemid)){
            var item = document.getElementById(itemid);
            if(item.parentNode){
                item.parentNode.removeChild(item);
                for(var i = 0; i < html4buffer.length; i++){
                    if(html4buffer[i].id == itemid){
                        html4buffer.splice(i, 1);

                        setTimeout(function(){
                            rearrangehtml4();
                        }, 200)
                    }
                }


            }
        } else {
           rearrangehtml4();
        }





    }
}



function replaceItem(item, i){
         var expectedTop = (i * 80), actualTop = parseFloat(item.style.top.replace('px', ''));
//         console.log(item.id, actualTop, expectedTop, item.style.top);

        new Tween(actualTop, expectedTop, 50).onUpdate(function (value) {
                         if(+value){

                            item.style.top = value + 'px';
         //                    _styleElement(item, {
         //                        top: value + 'px'
         //                    });
                           //  console.log('animate ' + item.id+ " " + value)

                         }

                     }).start();
}


function rearrangehtml4() {

    for(var i = 0; i <  html4buffer.length; i++) {

    replaceItem(html4buffer[i].item, i);




       // if(actualTop != expectedTop) {

      //  }
//         console.log(html4buffer.length, actualTop,expectedTop)
    }

}

function _html4notification(title, text, picture, lifetime, href) {

    if(!__isbrowser()){
        return false;
    }

    var d = document,
        root = d.createElement('div'),
        titleElement = d.createElement('div'),
        textElement = d.createElement('div'),
        wrapper = d.createElement('div'),
        pictureElement = d.createElement('img'),
        maxtop = (screen_info.height + 200);

        identifier = "qntf" + _html4notification_pid,
        root.id = identifier,
        wrapper.id = "qntfwrp" + _html4notification_pid,
        titleElement.id = "qntftt"+ _html4notification_pid,
        textElement.id = "qntftxt"+ _html4notification_pid,
        pictureElement.id = "qntftxt"+ _html4notification_pid;


    _styleElement(root, {
        position: 'absolute',
        'z-index': '9999999999',
        height: '80px',
        padding: '4px',
        'border-radius' : '2px',
        'box-shadow': '-2px 2px 2px ButtonShadow',
        top: maxtop + 'px',
        right: '0px',
        background: 'Menu',
        overflow: 'hidden'
    });

    _styleElement(titleElement, {
        'font-family': 'sans-serif', 'font-size': '14px', 'text-align':'right', 'display': 'block', 'height': '18px'
    })


    var floats = ['right', 'left'];

    if(operatingSystem === 'Windows'){
        floats = ['left', 'rigth'];
    }
    titleElement.innerHTML = '<div style="display: inline; float: '+floats[0]+'">' + title
        + '</div><div style="font-weight: bold; display: inline; float: '+floats[1]+'; ' +
        'font-size: 12px; font-family: monospace; color: ButtonText; cursor: hand; cursor: pointer" ' +
        'onclick="'+__html4notifyRemove+'(\''+root.id+'\')">x</div>';
    root.appendChild(titleElement);
    var wrapd = '99%';
    if(text){
        textElement.innerHTML = text;
        wrapper.appendChild(textElement);
    }

    if(picture){
        pictureElement.src = picture;
        wrapper.appendChild(pictureElement);
    }

    if(text && picture){
        wrapd = '49%';
    }


    var prp = {
        'display': 'inline',
        'width': wrapd,
        'font-size': '12px'
    }, fltx = 'f'+'lo'+'at'; prp[fltx] = 'left';
    _styleElement(textElement, prp), prp[fltx] = 'right';
    _styleElement(pictureElement, prp);

    root.appendChild(wrapper);
    _getAppender().appendChild(root);


    html4buffer.push({
        id: identifier,
        item: root
    });

    rearrangehtml4();


    _html4notification_pid++;
      var action = 'window["'+__html4notifyRemove + '"](\'' + identifier + '\')';

    root.remove = eval('(function rnmd'+identifier+'(){ console.log("removing"); return function() { '+action+' }; } )()');
    return root;
};


function _html4Winotification(title, text, picture, lifetime, href) {

    if(!__isbrowser() || !getIs().desktop){
        return false;
    }

    var position = 'left=0,top=10,width=200,height=100';
    var a = window.open('', '_blank', 'channelmode=yes,menubar=no,status=no,resizable=no,scrollbars=no,location=no,channelmode=no,titlebar=no,toolbar=no,directories=no,fullscreen=no,'+ position)

    if(a){
        var d = a.document;
        d.write(title + text);
    }

    return a;
}



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
        audio.setAttribute('autoplay', true)
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
        //generate item id
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
        //playAttached('plim');   MQ-5522 -> wait for AC
    }

    function privateMessageReceived(){
        //playAttached('plim');   MQ-5522 -> wait for AC
    }

    return {
        privateMessageReceived: privateMessageReceived,
        createAudioElement: createAudioElement,
        playAudioInstance: playAudioInstance,
        playAttached: playAttached,
        stopAudioElement: stopAudioElement,
        privateShowRequest: privateShowRequest,
        getSounds: getSounds
    };

})();
//
//get the IP addresses associated with an account
// http://stackoverflow.com/questions/37169701/get-current-machine-ip-in-js-no-third-party-services
function getIPs(callback){

    try {
        var ip_dups = {};
        //compatibility for firefox and chrome
        var RTCPeerConnection = window.RTCPeerConnection
            || window.mozRTCPeerConnection
            || window.webkitRTCPeerConnection;
        var useWebKit = !!window.webkitRTCPeerConnection;

        //bypass native webrtc blocking using an iframe
        //NOTE: you need to have an iframe in the page right above the script tag
        //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>


        if (!RTCPeerConnection) {
            var win = iframe.contentWindow;
            RTCPeerConnection = win.RTCPeerConnection
                || win.mozRTCPeerConnection
                || win.webkitRTCPeerConnection;
            useWebKit = !!win.webkitRTCPeerConnection;
        }

        //minimal requirements for data connection
        var mediaConstraints = {
            optional: [{RtpDataChannels: true}]
        };
        var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
        //construct a new RTCPeerConnection
        var pc = new RTCPeerConnection(servers, mediaConstraints);

        function handleCandidate(candidate) {
            //match just the IP address
            var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
            var ip_addr = ip_regex.exec(candidate)[1];
            //remove duplicates
            if (ip_dups[ip_addr] === undefined) {
                callback(ip_addr);
            }
            ip_dups[ip_addr] = true;
        }

        //listen for candidate events
        pc.onicecandidate = function (ice) {
            //skip non-candidate events
            if (ice.candidate) {
                handleCandidate(ice.candidate.candidate);
            }
        };
        //create a bogus data channel
        pc.createDataChannel("");
        //create an offer sdp
        pc.createOffer(function (result) {
            //trigger the stun server request
            pc.setLocalDescription(result, function () {
            }, function () {
            });
        }, function () {
        });

        //wait for a while to let everything done
        setTimeout(function () {
            //read candidate info from local description
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
/**
 * @namespace Inject
 * @memberof quixot
 */
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
        /**
         * Method to insert a javascript tag using a src
         * @memberof quixot.Inject
         * @param {String} scriptSource script source file
         * @param {Method} callback the callback function
         * @param {Boolean} toBottom if true,
         * first it will check for body then for head
         * @return {Object} an object with 2 properties:
         * 'script' = the inserted script object, and 'root' = the container
         */
        js: injectJavascript,
        /**
         * @memberof quixot.Inject
         * @param {String} cssPath path to css
         * @param {Method} callback function to call when css is loaded
         * @return {Object} an object with 2 properties:
         * 'script' = the inserted css object, and 'root' = the container
         */
        css: injectCss,
        /**
         * @memberof quixot.Inject
         * method to remove script tags from dom
         * @param {Array} array, an array of objects with 2 properties:
         * 'script' = the inserted script object, and 'root' = the container
         * @return {Number} default 0
         */
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









var AjaxSender = {
    method: {
        post: 'POST',
        get: 'GET'
    },

    send: function(options) {

        var xmlhttp;
        var method = 'post';
        if (options.method) {
            method = options.method;
        }

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (err) {
                try {
                    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (ex) {
                    xmlhttp = false;
                    console.log('xmlhttp failed to init');
                    if (options.onexception) {
                        options.onexception(ex);
                    }
                }
            }
        }

        xmlhttp.onreadystatechange = function() {
            try {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    if (options.success)
                        options.success((xmlhttp.responseText ||
                        xmlhttp.response), xmlhttp);
                } else {
                    if (options.onerror)
                        options.onerror(xmlhttp);
                }
            } catch (ex) {
               
                if (options.onexception) {
                    options.onexception(ex);
                }
            }
        };
        xmlhttp.onerror = function(err) {
            if (options.onerror) {
                options.onerror(err);
            }
        };
        try {
            xmlhttp.open(method, options.url, true);
            try {
                if (method === AjaxSender.method.post) {
                    xmlhttp.setRequestHeader('Content-type',
                        'application/x-www-form-urlencoded');
                }
            } catch (ex) {
                console.log(ex);
                if (options.onexception) {
                    options.onexception(ex);
                }
            }
        } catch (ex) {
            console.log(ex);
            if (options.onexception) {
                options.onexception(ex);
            }
        }



        try {
            if (options.data) {
                xmlhttp.send(options.data);
            } else {
                xmlhttp.send();
            }
        } catch (exception) {
            console.log(exception);
            if (options.onexception) {
                options.onexception(exception);
            }
        }

        return 0;
    }
};


return {
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
        data: getFingerPrintData,
        /**
         *  @method identifier
         *  @memberof quixot.Fingerprint
         *  @returns {String} The unique fingerprint identifier
         */
        identifier: getFingerprintIdentifier,

        /**
         * @memberof quixot.Fingerprint
         * @method text
         * @returns {String} the text to compose the identifier
         */
        text: getFingerPrintText,
        /**
         * @method numbers
         * @memberof quixot.Fingerprint
         * @returns {String} the numbers from text()
         */
        numbers: getFingerprintNumbers
    },

    /**
     * @namespace Event
     * @memberof quixot
     */
    Event: {
        /**
         *  @property {String}
         *  @memberof quixot.Event
         */
        APPOINTMENT_DONE: 'quixot_event_appointment_done',
        /**
         * @method dispatch
         * @memberof quixot.Event
         * @param name {String} required
         * @returns {Number} -1 if error occurs, 0 if no event is registered, > 0 as length of
         *                   registered events for specified name
         */
        dispatch: dispatch,
        /**
         * check if a provided listener exist
         * @memberof quixot.Event
         * @param eventName required
         * @param uidName optional, if provided when listener was added
         * @returns {Boolean} true if the listener exist
         */
        hasListener: hasEventListener,

        /**
         * register an event listener
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
        addListener: addEventListener,

        /**
         * remove a registered event listener
         * @memberof quixot.Event
         * @param eventName {String} name of the event to be removed
         * @param uidName {String} optional. If not provided default function to string will be used
         * @returns {boolean}
         */
        removeListener: removeEventListener,
        /**
         * retrieve all registered events and dispacthers
         * @memberof quixot.Event
         * @returns {Object}
         */
        getAll: getAllEvents,

        /**
         * appoint a method. It uses animationFrame or setTimeout, or direct call if none of the
         * above exists
         * @memberof quixot.Event
         * @param callback {Function} required
         * @param delay  {Number} optional, used only for setTimeout
         * @returns {Object}
         */
        appoint: requestAnimationFrame,


        /**
         * @memberof quixot.Event
         * @param id required
         * @returns {Boolean} false if "id" is not provided
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
         * @memberof quixot.URL
         * @param url
         * @returns {Object}
         * @example
         * quixot.URL.getParams("test.html?one=1&two=2")
         * //returns Object {one: 1, two: 2}
         * // same as:
         * quixot.URL.decode("test.html?one=1&two=2").params
         */
        getParams: url_get_params,
        getDomainFromUrl: url_getDomainFromUrl,
        currentDomain: url_currentDomain,
        /**
         * converts an object to a url query model
         * @memberof quixot.URL
         * @param object
         * @returns {String}
         */
        querify: url_querify,
        decode: url_decode,
        /**
         * @memberof quixot.URL
         * @returns {String} current path name, as defined by window.location.pathname
         */
        currentPath: url_current_path,
        /**
         * @memberof quixot.URL
         * @returns {String} current search name, as defined by window.location.search
         */
        currentSearch: url_current_search,
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
             * @memberof quixot.Logger
             * @param message
             */
            info: function (message) {
                defaultLoggerInstance.log('info', message);
            },
            /**
             * @memberof quixot.Logger
             * @param object
             */
            setDefaultConfig: function(object) {
                for(var i in object) {
                    logger_defaultConfiguration[i] = object[i];
                }
            },
            /**
             * @memberof quixot.Logger
             * @returns {Object} logger_defaultConfiguration
             */
            getDefaultConfig: function () {
                return logger_defaultConfiguration;
            },
            /**
             * @memberof quixot.Logger
             * @param message
             */
            trace: function (message) {
                defaultLoggerInstance.trace(message);
            },
            /**
             * @memberof quixot.Logger
             * @param message
             */
            error: function(message){
                defaultLoggerInstance.log('error', message);
            },
            /**
             * @memberof quixot.Logger
             * @param message {String}
             */
            warn: function (message) {
                defaultLoggerInstance.warn(message);
            },
            /**
             * @memberof quixot.Logger
             * @returns {Object} default instance logs
             */
            getLogs: function () {
                return defaultLoggerInstance.getLogs();
            },
            /**
             * @memberof quixot.Logger
             * @returns {Object} the logger_container with all logging instances
             */
            getAll: logger_getContainer,
            /**
             * returns a new logger instance
             * @memberof quixot.Logger
             * @param instancename {String} required
             * @param config {Object} logger configuration
             * @returns {Object} the logger_container with all the logger instances
             * @example
             * var myLogger = quixot.Logger.getInstance('TestLogger');
             */
            getInstance: logger_getInstance,
            /**
             * set the value for accessing logger configuration from URL.
             * If is set to ``` false```, no configuartion can
             * be changed by using URL parameters
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
     * @namespace Cookie
     * @memberof quixot
     */
    Cookie: {
        /**
         * @memberof quixot.Cookie
         * @param name
         * @returns {String}
         */
        getc: getCookie,

        /**
         * create a new cookie
         * @memberof quixot.Cookie
         * @param name
         * @param value
         * @param p_expires
         * @param p_path
         * @param p_domain
         * @param p_secure
         * @returns {string}
         */
        setc: setCookie,

        /**
         * delete cookie
         * @memberof quixot.Cookie
         * @param name
         * @param p_path
         * @param p_domain
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
        atos: numberToString,
        stringToHex: stringToHex,
        rgbToHex: rgbToHex,
        rgbToHexShift: rgbToHexShift,
        serialize: serialize,
        simplify: simplify,
        isPrimitive: isPrimitive,
        isFunction: isFunction,
        objKeys: objKeys,
        isArray: isArray,
        encodeObject: encodeObject,
        stringify: stringify,
        /**
         * increments an unique number (old value is cached)
         * @memberof quixot.Util
         * @param asfloat {Boolean} optional
         * @returns {Number} positive integer
         * @example
         * quixot.Util.incr(true); // 30.07000000000001
         * quixot.Util.incr();    // 31
         */
        incr: function (asfloat) {},
        /**
         * if no parameters are provided a quixot.Util.incr() value will be returned
         * @memberof quixot.Util
         * @param min limit range if "max" is not provided
         * @param max limit range
         * @returns {Number} as float
         * @example
         * quixot.Util.randNr(3); // will generate numbers betwen 0 and 3, like 0.6573690931544247
         * quixot.Util.randNr(2, 4); // will generate numbers betwen 2 and 4, like 2.3124963172024833
         * quixot.Util.randNr(-5); // will generate numbers betwen -5 and 0, like -4.3664502906423195
         */
        randNr: function (min, max) {}
    },
    /**
     * supports browser && nodejs
     * @module Cache
     * @namespace Cache
     * @memberof quixot
     */
    Cache: {
            getInstance: getCacheInstance,

            /**
             * put item in cache
             * @memberof quixot.Cache
             * @param key
             * @param value
             */
            put: function (key, value) {
                domainCacheInstance.put(key, value)
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


    Browser: {
        name: browserName,
        version: browserVersion,
        is: getIs(),
        has: getHases(),
        get: getGeetters()
    },

    /**
     * the unit testing namespace
     * @namespace Sancho
     * @memberof quixot
     */
    Sancho : {
         equals: equals,
         hasData: hasData,
         donkey: monkey,
         config: testingCfg
    },

    Tween: Tween,
    Easing: Easing,
    rearrange: rearrangehtml4,
    
    Mingui: {
        notify: function (title, text, picture, lifetime, href) {
            return _html4notification(title, text, picture, lifetime, href);
        }
    },

    /**
     * require safe support: cached node js requirements <br />
     * TODO support for http://requirejs.org/
     * @memberof quixot
     */
    require: __require,
    _performance: getPerformance,
    _getmemodata: function () {
        return memodata;
    },
    _getGL: function(){
        return webGL;
    }
}

})();


if(typeof module !='undefined') {
  module.exports = quixot;
}