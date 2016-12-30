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
            var _ia = Array._ia || function (a) { return toString.call(a) === '[object Array]'; };
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
                    } else if (_ia(value)) {
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
var quixot = (function(){



var $S = (typeof 'string') + '',
    $N = (typeof 2) + '',
    $O = (typeof {}) + '',
    $B = (typeof true) + '',
    $F = (typeof function(){}) + '',
    $A = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    string_characters = $A + '\'";:,<.>/?[{]}=+-_)(*&^%$#@!`~\t\n ',
    $A = $A.split(''),
    string_characters = string_characters.split(''),

 

    $F = {
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
        dt: $S +':'+ $N+ ':' + $O+':' + $B+':' + $F,
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
                    d = _usa(e, 5);
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

    $eU = [
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
    $eI = [],
    _uat_memodata = {},

    registeredEvents = {},
    eventDispatchers = {},

    $bw = (function(){
        if(typeof window != 'undefined'){
            return window;
        }
        return {};
    })(),

    $bd = (function(){
        if(typeof window != 'undefined' && typeof document != 'undefined'){
            return document;
        }
        return {};
    })(),

    _gba = function () {
        if($bd){
            return $bd.body
        }
    },


    $bn = (function () {
        if(typeof navigator != 'undefined') {
            return navigator;
        }

        return $bw.navigator || {};
    })(),
    
    $bu = (function () {
        return $bn.userAgent || ' ';
    })(),
    
    $bv = (function () {
        return $bn.appVersion || {};
    })();

    $eb = (function () {
        return  (typeof  window != 'undefined');
    })();

    $en = (function () {
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
        _gba().appendChild(d);
        return d;
    }

    $p = [],
        
    _mr = Math.round,
    _mf = Math.floor,
    json_parse = JSON.parse,
        json_stringify = JSON.stringify


    ;

var $W, $bb, $K, $BN, $bV, javaEnabled;

for(var i = 0; i < $eU.length; i++) {
    try {
        var e = $eU[i], r;
        r = eval(e);
        p = _ok(r), k, c;
        for(k = 0; k < p.length; k++) {
            c = p[k];
            if($eI.indexOf(c) < 0) {
                $eI.push(c);
            }
        }
    } catch (e){
      ;;
    }
}

$F.rm += $eI.join('');

function _ft() {
    var t = '';
    for(var i in $F){
        t += i + ($F[i]);
    }
    return t;
}



function _fi() {
    var text = _ft().split(''), 
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
            resp+=_uat(eObj[c]);
            eObj[c]++;
            continue;
        }
        if(_uiac(c)) {
            if(i % 2 == 0) {
                resp+=c;
            } else {
                resp = c+resp;
            }
        } else {
            if(+c) {
                lasnum = parseInt(c);
            }
            mind = _mr(resp.length / lasnum);
            resp = resp.substring(0, mind) + c + resp.substring(mind, resp.length);
        }
    }
    return resp;
}



function _fn(){
    var t = _ft().split(''), n = '';
    for( var i = t.length ; i > 0; i--){
        var c = t[i];
        if(+c || c === '0') {
            n+=c;
        }
    }
    return n;
}


function _fd() {
    return $F;
}

function _gmc(args){
    if(args && args.calee && args.callee.caller) {
        var fline =  args.callee.caller + '';

        return fline;
    }

    return '';
}


function _ok(obj) {
    if(!obj){
        return [];
    }
    var k = [];
    for(var i in obj){
        k.push(i);
    }
    return k;
}

function _us(obj) {
    var r = {};
    for(var i in obj) {
        if(_uip(obj[i])) {
            r[i] = obj[i] + '';
        }
    }
    return r;
}

function _uss(obj, stackno,
                   zeroval, trueval, falseval,
                   functval, doubleQuotes, comma, twodots,
                   r1, r2, d1, d2, stackexit){

    if(!stackno ) {
        stackno = 3;
    }

    if(obj === 0) {
        return zeroval;
    }

    if(typeof obj === $N) {
        return ''+obj;
    }
    if(!obj) {
        return falseval;
    }
    if(obj === true) {
        return trueval;
    }
    if(_uip(obj)) {
        return doubleQuotes + obj + doubleQuotes;
    }

    if(_uif(obj)) {
        return functval;
    }

    if(_ia(obj)) {
        var r = r1;
        for(var i = 0; i < obj.length; i++) {
            r += _uss(obj[i], stackno,
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

    var keys = _ok(obj);
    var r = d1, n = 0;
    for (var j in obj) {
        n++;
        var value = _uss(obj[j], stackno -1,
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


function _eo(obj, stackno) {
    return _uss(obj, stackno, '','','','','','','','','','','','','');
}


function _usa(obj, stackno) {
    return _uss(obj, stackno, 0, 'true', 'false', '"[funct]"', '"', ',', ':', '[', ']', '{', '}', '[stack]');
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

function _sgp(){
    return window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
}


function _uip(d){
    return (typeof d === $S || typeof d === $N || typeof d === $B);
}


function _uif(d){
    return typeof d === $F;
}

function _ia(d){
    return Array.isArray(d);
}

function _uiac(c){
    return $A.indexOf(c) > -1;
}

function _uat(numval, strlist, zval) {
    
    if(!zval) {
        zval = 0;
    }

    if(!strlist) {
        strlist = $A;
    }

    if(_uip(strlist)){
        strlist = strlist.split('');
    }

    
    var response, pid = numval + '' + strlist.join('') + zval+'';
    if(_uat_memodata[pid]) {
        return _uat_memodata[pid];
    }


    if(strlist.length === 1) {
        response = new Array(numval.length).join(strlist[0]);
        _uat_memodata[pid] = response;
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
            response = strlist[zval] + _uat(rest, strlist, zval+1);
            _uat_memodata[pid] = response;
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
            response = _uat(response, strlist, zval);
        }

        if(rest) {
            rest = _uat(rest, strlist, zval);
            response+=rest;
        }
        _uat_memodata[pid] = response;
        return response;
    }



    var varFloat = parseFloat(numval);


    if(varFloat < strlist.length) {
        if(varFloat % 1 == 0) {
            response = strlist[parseInt(varFloat)];
            _uat_memodata[pid] = response;
            return response;
        } else {
            var rest = varFloat % 1;
            if(rest < 1) {
                rest *= 10;
            }
            response = _uat(_mf(varFloat), strlist, zval) + _uat(rest, strlist, zval);
            _uat_memodata[pid] = response;
            return response;
        }
    }
    if(varFloat % 1 == 0) {
        if(varFloat < 10) {
            response = _uat(1, strlist, zval ) + _uat(varFloat - 1, strlist, zval);
            _uat_memodata[pid] = response;
            return response;

        }
        response = _uat(_mf(varFloat / 10), strlist, zval ) + _uat(varFloat % 10, strlist, zval);
        _uat_memodata[pid] = response;

        return response;
    }

    rest = varFloat % 1;
    if(rest < 1) {
        rest*=10;
    }
    response = _uat(_mf(varFloat), strlist, zval) + _uat(rest, strlist, zval);
    _uat_memodata[pid] = response;
    return response;
}


function _shx(integer) {
    var str = parseInt(integer).toString(16);
    return str.length === 1 ? '0' + str : str;
}


function _rtx(r, g, b) {
    return '#' + _shx(r) + _shx(g) + _shx(b);
}


function _rtxShift(r, g, b) {
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

function time_interval(n, s) {
    switch(s+''.toLowerCase()) {
        case 'nano':
            return n;
        case 'seconds':
        case 'second':
            return n * 1000;
        case 'minutes':
        case 'minute':
            return n * time_interval(60, 'seconds');
        case 'hour':
        case 'hours':
              return n * time_interval(60, 'minute');
        case 'day':
        case 'days':
            return n * time_interval(24, 'hour');
        case 'month':
        case 'months':
              return n * time_interval(30, 'day');
        case 'year':
        case 'years':
              return n * time_interval(365, 'day');

    }

    return 0;
}


function time_date_add(d, n, s){
    if(d.getTime && d.setTime){
        d.setTime(d.getTime() + time_interval(n, s));
    }
    return d;
}

function time_date_roll(d, n, s){
    if(d.getTime && d.setTime){
        d.setTime(d.getTime() - time_interval(n, s));
    }
    return d;
}
function _ed(eventName) {
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
        if (typeof uidName === $F) {
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
    if ($bw.cancelAnimationFrame) {
        $bw.cancelAnimationFrame(i);
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




function requestAnimationFrame(callback, delay) {
    var type = 'unknown', thisLoop =  new Date().getTime(), fps, timeoutId;
    if(!delay){
        delay = 30;
    }
    if($bw.requestAnimationFrame){
        type = 'requestAnimationFrame';
        timeoutId = $bw.requestAnimationFrame(callback);
    }
    else if($bw.mozRequestAnimationFrame){
        type = 'mozRequestAnimationFrame';
        timeoutId = $bw.mozRequestAnimationFrame(callback);
    }
    else if($bw.msRequestAnimationFrame){
        type = 'msRequestAnimationFrame';
        timeoutId = $bw.msRequestAnimationFrame(callback);
    }
    else if($bw.webkitRequestAnimationFrame){
        type = 'webkitRequestAnimationFrame';
        timeoutId = $bw.webkitRequestAnimationFrame(callback);
    }
    else if($bw.oRequestAnimationFrame){
        type = 'oRequestAnimationFrame';
        timeoutId = $bw.oRequestAnimationFrame(callback);
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

    _ed('quixot_event_appointment_done');

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

if ($bd.createElement) {
    try {
        var canvas = $bd.createElement('canvas');

        if(canvas.getContext('webgl')) {
            $F.webgctx = 'webgl';
        } else if (canvas.getContext('experimental-webgl')){
            $F.webgctx = 'experimental-webgl';
        }

        try {
            $F.canvasData = canvas.toDataURL("image/jpeg")+'';
            $F.canvasDataPNG = canvas.toDataURL();
        }catch (e) {
            $F.canvasData = 'np';
        }

        webGL =  (!!$bw.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ) );

        if(webGL) {
            try {


                var dbgRenderInfo = webGL.getExtension("WEBGL_debug_renderer_info");
                $F.glURWG  =
                    webGL.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);

                $F.glUVGL  =
                    webGL.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);

                $F.glVR  =
                    webGL.getParameter(webGL.VERSION);

                $F.glSLV  =
                    webGL.getParameter(webGL.SHADING_LANGUAGE_VERSION);
                $F.glVND  =
                    webGL.getParameter(webGL.VENDOR);


                $F.rm+=_ok(webGL).join('');
            } catch (e) {
                $F._errs.push(e+'');
            }
        }


    } catch(e) {
        $F._errs.push(e+'');
        webGL = false;
    }

}
var requirememo = {};



function __require(modulename) {
    if ($en) {
        if (requirememo[modulename]) {
            return requirememo[modulename];
        }
        $ldi.info(modulename);
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
function _udURI(strd) {
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
        obj = json_parse(_udURI(val));
    } catch (ex){
        obj = null;
    } finally {
        if(obj != null) {
            return obj;
        }
    }
    return val+'';

}



function _ud(url){
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



function _ucp() {
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
    return _ud(url).params;
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
    if($bd.domain){
        return $bd.domain;
    }
    if($bd.URL){
        return url_getDomainFromUrl($bd.URL);
    }
    return 'localhost';
}


function url_current_path() {
    if($bw.location && $bw.location.pathname){
        return $bw.location.pathname
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
}


    function _ldda(n, l, d) {
        if(!$eb){
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




    var logger_defaultConfiguration = {
         consoleAppender: true,
         consoleFormatter: function (name, level, data) {
                if(!$eb){
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


         },
         fileAppender: true, //TODO for nodejs a model {file: path, level: level}  //  domAppender: false, //{qlog = ?|ALL, level=??|ALL, domPattern: 'String' }

         fileFormatter: _ldda,

         logStack: true
    }




    var logger_options_key = 'logopts';
    

    function logger_getConfigFromUrl() {
        if(logger_options_key){
            return _ucp()[logger_options_key];
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


    var $ldi = new LogInstance('quixot', logger_defaultConfiguration),
        
    logger_container = {
        'quixot': $ldi
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
        isNodeJs: $en,
        isBrowser: $eb
    },
    javaEnabled: false,
    tempDir: '',
    homeDir: false,
    javaPath: false
};

if(typeof process != 'undefined' && process.env){
    for(var i in process.env){
        envData[i] = process.env[i];
        $F['process_env' + i] = process.env[i];
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
            if ($bw.screen) {
                if($bw.screen.width) {
                    width = $bw.screen.width;
                }

                if($bw.screen.height) {
                    height = $bw.screen.height;
                }

                if($bw.screen.availHeight) {
                    availHeight = $bw.screen.availHeight;
                }

                if($bw.screen.availWidth	) {
                    availWidth = $bw.screen.availWidth	;
                }

                if($bw.screen.colorDepth	) {
                    colorDepth	= $bw.screen.colorDepth	;
                }

                if($bw.screen.pixelDepth	) {
                    pixelDepth	 = $bw.screen.pixelDepth	;
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

    if($en){

        var nos = __require('os');
        console.log(nos);
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
        var oldData = JSON.parse(line);
        if(oldData && newdata){
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


    function CacheInstance(paramname, _lifetime) {
        var name = 'qch' + (paramname+'');
        name = name.replace(/\?/g, '')
            .replace(/=/g, '')
            .replace(/\//g, '')
            .replace(/\./g, '')
        ;



        var data = (function () {
            var r;
            if($eb) {

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
               if(!$eb){
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
            if($eb) {
                clearTimeout(saveTimeoutId);

                if(typeof localStorage != 'undefined') {

                    try {
                         localStorage.setItem(name, JSON.stringify(data));
                    } catch(ex) {
                        setCookie(name, JSON.stringify(data));
                    }
                } else {
                    setCookie(name, JSON.stringify(data));
                }
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


function getCacheInstance(_instanceName, _lifetime) {
        if(!cacheContainer[_instanceName]) {
            cacheContainer[_instanceName] = new CacheInstance(_instanceName, _lifetime);
        }
        return cacheContainer[_instanceName];
}





    var browser_searched_data = [
        {s: $bu, u: 'iCab', v: 'iCab', i: 'iCab'},
        {s: $bu, u: 'rekonq', v: 'rekonq', i: 'Rekonq'},
        {s: $bu, u: 'Midori', v: 'Midori', i: 'Midori'},
        {s: $bu, u: 'Arora', v: 'Arora', i: 'Arora'},
        {s: $bu, u: 'Stainless', v: 'Stainless', i: 'Stainless'},
        {s: $bu, u: 'Epiphany',v: 'Epiphany', i: 'Epiphany'},
        {s: $bu, u: 'K-Meleon', v: 'K-Meleon', i: 'K-Meleon'},
        {s: $bn.vendor, u: 'Camino', i: 'Camino'},
        {s: $bu, u: 'Maxthon', v: 'Maxthon', i: 'Maxthon'},
        {s: $bu, u: 'SeaMonkey', v: 'SeaMonkey', i: 'SeaMonkey'},
        {s: $bu, u: 'Edge', i: 'Edge', v: 'Edge'},

        {s: $bu, u: 'Chrome', i: 'Chrome'},
        {s: $bu, u: 'OmniWeb', v: 'OmniWeb/', i: 'OmniWeb'},
        {s: $bn.vendor, u: 'Apple', i: 'Safari', v: 'Version'},
        {prop: $bw.opera, i: 'Opera', v: 'Version'},
        {s: $bn.vendor, u: 'KDE', i: 'Konqueror'},
        {s: $bu, u: 'Firefox', i: 'Firefox'},
        {s: $bu, u: 'Netscape', i: 'Netscape'},
        {s: $bu, u: 'MSIE', i: 'Explorer', v: 'MSIE'},
        {s: $bu, u: 'Gecko', i: 'Mozilla', v: 'rv'},

        /**
         * for older netscapes:(4-)
         */
        {s: $bu, u: 'Mozilla', i: 'Netscape', v: 'Mozilla'}
    ];


    var browser_searched_os = [
        {s: $bn.platform, u: 'Win', i: 'Windows'},
        {s: $bn.platform, u: 'Mac', i: 'Mac'},
        {s: $bu, u: 'iPhone', i: 'iPhone'},
        {s: $bu, u: 'iPad', i: 'iPad'},
        {s: $bu, u: 'Android', i: 'Android'},
        {s: $bn.platform, u: 'Linux', i: 'Linux'}
    ];



    


  
    function searchString(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].s;
            if(!dataString) {
                continue;
            }
            var dataProp = data[i].prop;
            $bb = data[i].v || data[i].i;
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
        var index = dataString.indexOf($bb);
        if (index === -1) {
            return;
        }
        return parseFloat(dataString.substring(index + $bb.length + 1));
    }



    function fingerprint_scan(o) {
        if(!o) {
            return;
        }
        for(var i in o){
            var id = (i+o[i]);
            if($p.indexOf(id) == -1) {
                $p.push(id);
                fingerprint_scan(o[i]);
            }
        }
    }


    $W = searchString(browser_searched_os) || 'an unknown OS';

    if ($W === 'Linux') {  //check for specific linux flavours
        if($bu.toLowerCase().indexOf('ubuntu')) {
            $K = 'Ubuntu';
        }
    }

    if($W === 'Windows') {    //check for specific windows flavours
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test($bu)){
            if (RegExp["$1"] == "NT"){
                switch(RegExp["$2"]){
                    case "5.0":
                        $K= "2000";
                        break;
                    case "5.1":
                        $K = "XP";
                        break;
                    case "6.0":
                        $K = "Vista";
                        break;
                    default:
                        $K = "NT";
                        break;
                }
            } else if (RegExp["$1"] == "9x"){
                $K = "ME";
            } else {
                $K = RegExp["$1"];
            }
        }
    }

    $BN = searchString(browser_searched_data) || 'An unknown browser';
    $bV = searchVersion($bu) || searchVersion($bv) || 'an unknown version';

    //check for ie11 number
    var isAtLeastIE11 = !!($bu.match(/Trident/) && !$bu.match(/MSIE/));
    if (isAtLeastIE11) {
        $BN = 'Explorer';
        var isIE11 = !!($bu.match(/Trident/) && $bu.match(/11/));
        if (isIE11) {
            $bV = 11;
        }
    }

    //fix number for some chrome versions and detect chromium
    if ($BN === 'Chrome') {
        if ($bu.toLowerCase().indexOf('chromium') > -1) {
            $BN = 'Chromium';
        }
        if($bV === 'an unknown version') {
            var version = $bu || $bv;
            version = version.split('Chrome');
            if (version[1]) {
                var matches = version[1].match(/\d+/);
                if (matches[0]) {
                    $bV = parseInt(matches[0]);
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
        var p = $bu.split(s);
        if(p[1]) {
            return util_extract_first_number(p[1] + '');
        }
         return 'unknown version';
    }

    //some extra checks are required for newer browsers:

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
        if(o.dM($bu)) {
            $BN = o.i;
            $bV = o.gV();
        }
    });




    if($bn.javaEnabled) {
        try {
           envData.javaEnabled = $bn.javaEnabled();
        } catch (e) {
           envData.javaEnabled = false;
        }
    }


    fingerprint_scan($bn.plugins);
    fingerprint_scan($bn.mimeTypes);




    function getIs() {

        return {
            iPod: ( $bu.indexOf("iPod") > -1),
            iPhone : ( $bu.indexOf("iPhone") > -1),
            nokiaN :( $bu.indexOf("NokiaN") > -1),
            wii : ($bu.indexOf("Wii") > -1),
            ps: ( /playstation/i.test($bu) ),
            xpSP2: ($bu.indexOf('SV1') !== -1),
            iPhoneiPod: ( $bu.match(/iPhone|iPod/i) ),
            iPhoneiPadiPod: ( $bu.match(/iPhone|iPad|iPod/i) ),
            desktop: ( !$bu.match(/iPhone|iPad|android/i) ),
            android: ( $bu.match(/android/i) ),
            winPhone: ( /IEMobile/.test($bu) ),
            chromeCRIOS: ( $bu.match(/chrome|crios/i) ),
            iOS: (/iPad|iPhone|iPod/.test($bu) && !MSStream  ),
            iPad: ( $bu.match(/iPad/i) ),
            firefox: ( $bu.match(/firefox/i) ),
            phoneDevice:( $bu.match(/iPhone|android/i) ),
            iOS7: ( $bu.match(/.*CPU.*OS 7_\d/i) ),
            iPhoneSafari: ( function(){
                var safari = !!$bw.safari, iPhone = /iPhone/i.test($bu);
                return !!(iPhone && safari);
            })(),
            tabletAndroidFirefox: (/(?:Android; Tablet).*(?:Firefox\/)/i.test($bu) ),
            msie: (function(){
                var ua = $bu;
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
            chrome: $bw.chrome
        }
    }


    function getGeetters() {
        return {
            firefoxVersion: (function(version) {
                return ($bu.toLowerCase().indexOf('firefox/' + version) !== -1);
            })(),
            androidVersion: (function() {
                var match = $bu.match(/Android\s([0-9\.]*)/);
                return match ? match[1] : false;
            })(),
            iPadVersion: ($bu.match(/(?:iPad);.*CPU.*(?:OS (.*)_)\d/i) )
        }
    }


    if(!os_info.name){
         os_info.name = $W;
    }

    if(!os_info.version){
        os_info.version = $K;
    }




    $F.plugins = $p.sort().join('');
    $F.screen = _eo(screen_info);
    $F.chrome = _eo($bw.chrome, 8);
    $F.netscape = _eo($bw.netscape, 4);
    $F.navigator = _eo(_us($bn));
    $F.plugins = _eo($bn.plugins, 3);
    $F.mimeTypes =  _eo($bn.mimeTypes, 3);


    var testingCfg = {
        debug: true,
        maxListSize: 20,
        strlist : 'abcdefghihklmnopqrstuvxyz',
        logging: logger_defaultConfiguration
    },
    uniqueVal = getCacheInstance('@qtst').getSafe('lup', 1);


    try {
        uniqueVal = parseFloat(uniqueVal);
    } catch (e) {
        uniqueVal = new Date().getTime();
    }






    function util_random_string(){
        var date = new Date(),
           sum = _uat(randInt()) + ''
                    + _uat(date.getMilliseconds()) + ''
                    + _uat(date.getMinutes()) + ''
                    + _uat(date.getHours()) + ''
                    + _uat(date.getDay()) + ''
                    + _uat(date.getDate()) + ''
                    + _uat(date.getMonth()) + ''
                    + _uat(date.getFullYear()) + ''
                    + _uat(date.getYear()) + ''
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
            console.log(randNr() + util_random_string() + randInt());

            console.log(randListInt());

             var tocalll = strdata.replace(/{string}/g, '"' + util_random_string()+ '"' )
            //         .replace(/{number}/g, randNr() )
                    .replace(/{integer}/g, randInt() )
                    .replace(/{integerList}/g, JSON.stringify(randListInt()) )
            //         .replace(/{numberList}/g, JSON._usa(randListNr()) )
            //         .replace(/{stringList}/g, JSON._usa(randListString()) )
                    .replace(/{objectList}/g, JSON.stringify(randListObj()) )
            //         .replace(/{object}/g, JSON._usa(randObj()) )
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
    if($en){
        try {
            nodeAssert = __require('assert');
        }catch (e){
            nodeAssert = false;
        }
        testingCfg.logging.logStack = false;
    }



    function deepEquals(a, b) {

        if(nodeAssert && nodeAssert.deepEqual){
            if(testingCfg.logging) {
                logger_getInstance('Tests', testingCfg.logging)
                    .info('check deepEquals if ' + a + ' === ' + b);
            }
            nodeAssert.deepEqual(a, b);
        } else {


            if(_ia(a) && _ia(b)){
                if(a.length === b.length){

                    util_array_each(a, function (i, v) {
                        if(v !== b[i]){
                            throw new  Error('check if ' + a + ' === ' + b + ' ---> FAIL');
                        }
                    })
                } else {
                    throw new  Error('check if ' + a + ' === ' + b + ' ---> FAIL');
                }
            }


            if(testingCfg.logging) {
                logger_getInstance('Tests', testingCfg.logging)
                    .info('check deepEquals if ' + a + ' === ' + b + ' ] SUCCESS');
            }
        }

        return a === b;
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
                        message = _gmc(arguments);
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
        var limit = _mr(Math.random()*maxSize) + 1;
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
        return randList(maxSize, util_random_string);
    }


    function randListObj(maxSize) {
        if(!maxSize){
            maxSize = testingCfg.maxListSize;
        }
        return randList(maxSize, randObj);
    }


    function randAny() {
        var lrand = _mr(Math.random() * 3);
        switch (lrand) {
            case 0:
                return '"' +util_random_string()+ '"';
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
            obj[util_random_string()] = randAny();
        }

        return obj;
    }





    
    function util_incr(asfloat) {
        if (asfloat) {
            uniqueVal+=0.01;
        } else {
            uniqueVal = parseInt(uniqueVal+1);
        }
        getCacheInstance('@qtst').put('lup', uniqueVal);
        return uniqueVal;
    }
    

    function randInt(min, max) {
       return _mr(randNr(min, max))
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
        return util_incr();
    }


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





var h4i = 0,
    h4b = [],
    h4ra = util_random_string() + util_incr(),
    $i4 = '___qwi' + util_random_string(),
    nww = 200, nwh = 100,
    mnw = _mr(screen_info.width / nww),
    mnh = _mr(screen_info.height / nwh),
    matrix = [];


if($eb){
    $bw[$i4] = 0;
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





if($eb){
    window[h4ra] = function (itemid) {
        if(document_getElementById(itemid)){
            var item = document_getElementById(itemid);
            if(item.parentNode){
                item.parentNode.removeChild(item);
                for(var i = 0; i < h4b.length; i++){
                    if(h4b[i].id == itemid){
                        h4b.splice(i, 1);
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
    for(var i = 0; i <  h4b.length; i++) {
        replaceItem(h4b[i].item, i);
    }
}

function html4_notification_build_dom(identifier, title, text, picture, x) {
    h4i ++;
   var
        r = document_createElement('div', identifier),
        te = document_createElement('div', 'qntftt'+ h4i),
        textElement = document_createElement('div', 'qntftx' + h4i),
        w = document_createElement('div', 'qntfw' + h4i),
        pictureElement = document_createElement('img', 'qntfim' + h4i),
        mxt = (screen_info.height + 200)
        g = ['right', 'left'];

    if($W === 'Windows'){
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

    if(!$eb){
        if(failure){
            failure();
        }
        return false;
    }
    var identifier = "qntf" + h4i,
        root = html4_notification_build_dom(identifier, title, text, picture, h4ra);
    _gba().appendChild(root);


    h4b.push({
        id: identifier,
        item: root
    });

    html4_rearrange();


    var action = 'window["'+h4ra + '"](\'' + identifier + '\')';

    root.remove = eval('(function __rmhtml4_'+identifier+'(){ return function() { '+action+' }; } )()');

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

    if(!$eb || !getIs().desktop){
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
        var pid = util_random_string() + h4i,
            closeAction = 'window["' + pid + '"].close();  window[' + $i4 + ']--;',
            d = a.document;
        h4i++;
        window[pid] = a;
        a.remove = 'eval(function __rmvwin_'+pid+'(){ return function(){ '+closeAction+' } })';

        var root = html4_notification_build_dom('ksk', title, text, picture, '(function(i){window.close();})');
        d.write(root.innerHTML);

        window[$i4]++;
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
}//code for chrome:

//code for firefox

var isHttpOrHttps = (function () {
    if($eb && document.URL) {
        var protocol = _ud(document.URL).protocol;
        return protocol === 'http' || protocol === 'https';
    }
    return false;
})();


function _html5notification(title, text, picture, lifetime, success, failure, onclick, onclose){


    if(!$eb || !isHttpOrHttps){
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

    if (window.webkitNotifications && $BN != 'Safari') {
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

    if($eb){
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

        requestAnimationFrame(function () {
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
                }, onclick, onclose);
            }, onclick, onclose);
        }, onclick, onclose);
    }, onclick, onclose);
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
        /*construct a new RTCPeerConnection*/
        var pc = new RTCPeerConnection(servers, mediaConstraints);

        function handleCandidate(candidate) {
            /*match just the IP address*/
            var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
            var ip_addr = ip_regex.exec(candidate)[1];
            /*remove duplicates*/
            if (ip_dups[ip_addr] === undefined) {
                callback(ip_addr);
            }
            ip_dups[ip_addr] = true;
        }

        /*listen for candidate events*/
        pc.onicecandidate = function (ice) {
            //skip non-candidate events
            if (ice.candidate) {
                handleCandidate(ice.candidate.candidate);
            }
        };
        /*create a bogus data channel*/
        pc.createDataChannel("");
        /*create an offer sdp*/
        pc.createOffer(function (result) {
            //trigger the stun server request
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
}, controller_logger = logger_getInstance('dulcineea');





var controller_dom_parser = function (o) {
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
        }
    }
}

var controller_options_html = {
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

/**
 * converts a string into a list of valid JSON callers
 * @param {String} input
 * @returns {Array}
 * @example
 * dulcineea.compiler.extract('a.b.c'); //returns ['a', 'b', 'c']
 */
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


function _execute_js(_input_string, _input_object) {
    return _execute_recursive(extract_callers(_input_string), _input_object);
}

function _execute_recursive(_input_list, _input_object) {
    if(_input_list.length === 0){
        return _input_object;
    }
    var _key = util_strip_quotes(_input_list[0]);
    



    var _temporary_response = _input_object[_key];

    if(_input_list.length > 1){
        return _execute_recursive(_input_list.splice(1, _input_list.length -1), _temporary_response);
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
    })

    console.log(p);
}

/**
input model: {prop: key}
n = name
i = input to fetch

*/
function controller_constructor(n, i, o) {

    var v = o.fetch(i);

    controller_logger.info(n);
    controller_logger.info(v);
    
   // setInterval(function () {
        util_array_each(v,function (i, d) {
            console.log(i, d)
        });
    // }, 1000)
}

function controller_dom_init(e) {
    util_array_each(e, function (i, o) {
        if(o.id){
            controller_constructor(o.id, o, controller_options_html);
        }

    })
}

//controller_dom_init(document.getElementsByClassName('controller-new'));
function gog_extend_feature(e) {
    console.log(e)
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
            })

            if(st.length > 0){
                txt+=' style="' + st.join(';')+'"';
            }

            txt+='>';

            util_array_each(c, function (i, o) {
                txt+=o.getContent();
            })


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
var quixot_pack_info = {version: "1.0.2", buildDate: "1483095405330"};
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
        data: _fd,
        /**
         *  @method identifier
         *  @memberof quixot.Fingerprint
         *  @returns {String} The unique fingerprint identifier
         */
        identifier: _fi,

        /**
         * @memberof quixot.Fingerprint
         * @method text
         * @returns {String} the text to compose the identifier
         */
        text: _ft,
        /**
         * @method numbers
         * @memberof quixot.Fingerprint
         * @returns {String} the numbers from text()
         */
        numbers: _fn
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
        dispatch: _ed,
        /**
         * check if a provided listener exist using declared or autogenerated "uidName" from "addListener"
         * @method hasListener
         * @memberof quixot.Event
         * @param eventName {String} required
         * @param uidName {String} optional, if provided when listener was added
         * @returns {Boolean} true if the listener exist
         */
        hasListener: hasEventListener,

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
        addListener: addEventListener,

        /**
         * remove a registered event listener
         * @method removeListener
         * @memberof quixot.Event
         * @param eventName {String} name of the event to be removed
         * @param uidName {String} optional. If not provided default function to string will be used
         * @returns {boolean} true if the listener is removed, false if listener does not exist anymore
         */
        removeListener: removeEventListener,
        /**
         * retrieve all registered events and dispacthers
         * @method getAll
         * @memberof quixot.Event
         * @returns {Object}
         */
        getAll: getAllEvents,

        /**
         * appoint a method. If the environment is browser the appointment will be done via "requestAnimationFrame". <br />
         * For NodeJS, method "setImmediate" will be used, so the "id" property of the result will be an object.
         * @method appoint
         * @memberof quixot.Event
         * @param callback {Function} required
         * @param delay  {Number} optional, used only for setTimeout
         * @returns {Object} containing 2 properties: "type" => a string describing the used method for appointment (mozRequestAnimationFrame|setImmediate|setTimeout|nothing_found)
         * and an "id" => the data return by the method. <br /> This can be used as parameter for  "dropAppoint".
         */
        appoint: requestAnimationFrame,


        /**
         * cancel an appoint. Usage of this method should be avoided, since further changes on "appoint" method might
         * return undroppable callbacks.
         * @method dropAppoint
         * @memberof quixot.Event
         * @param id {Object|Number} required
         * @returns {Boolean} false if "id" is not provided or is invalud
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
         * @returns {String} For any invalid input, default return value is "localhost"
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
        decode: _ud,
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
        currentParams: _ucp
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
             * @method info
             * @memberof quixot.Logger
             * @param message {Object}
             */
            info: function (message) {
                $ldi.log('info', message);
            },
            /**
             * @method setDefaultConfig
             * @memberof quixot.Logger
             * @param config {Object}
             */
            setDefaultConfig: function(object) {
                for(var i in object) {
                    logger_defaultConfiguration[i] = object[i];
                }
            },
            /**
             * @method getDefaultConfig
             * @memberof quixot.Logger
             * @returns {Object} logger_defaultConfiguration
             */
            getDefaultConfig: function () {
                return logger_defaultConfiguration;
            },
            /**
             * @method trace
             * @memberof quixot.Logger
             * @param message {Object}
             */
            trace: function (message) {
                $ldi.trace(message);
            },
            /**
             * @method error
             * @memberof quixot.Logger
             * @param message {Object}
             */
            error: function(message){
                $ldi.log('error', message);
            },
            /**
             * @method warn
             * @memberof quixot.Logger
             * @param message {Object}
             */
            warn: function (message) {
                $ldi.warn(message);
            },
            /**
             * @method getLogs
             * @memberof quixot.Logger
             * @returns {Object} default instance logs
             */
            getLogs: function () {
                return $ldi.getLogs();
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
             */
            getInstance: logger_getInstance,
            /**
             * set the value for accessing logger configuration from URL.
             * If is set to ``` false```, no configuartion can
             * be changed by using URL parameters
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
     * @namespace Cookie
     * @memberof quixot
     */
    Cookie: {
        /**
         * @method getc
         * @memberof quixot.Cookie
         * @param name {String}
         * @returns {String}
         */
        getc: getCookie,

        /**
         * create a new cookie
         * @method setc
         * @memberof quixot.Cookie
         * @param name {String}
         * @param value {String}
         * @param expires {Date|Number}
         * @param path {String}
         * @param domain {String}
         * @param secure {Boolean}
         * @returns {string}
         */
        setc: setCookie,

        /**
         * delete cookie
         * @method drop
         * @memberof quixot.Cookie
         * @param name {String}
         * @param path {String}
         * @param domain {String}
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
        atos: _uat,

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
        stringToHex: _shx,
        rgbToHex: _rtx,
        rgbToHexShift: _rtxShift,
        serialize: _uss,
        simplify: _us,
        isPrimitive: _uip,
        isFunction: _uif,
        _ok: _ok,
        isArray: _ia,
        encodeObject: _eo,
        stringify: _usa,
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
             * @function
             * @memberof quixot.Cache
             * @param key {String}
             * @param value {String|Number}
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
        performance: _sgp,

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
        name: $BN,
        version: $bV,
        searchedData: browser_searched_data,
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
         deepEquals: deepEquals,
         hasData: hasData,
         donkey: monkey,
         config: testingCfg
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
         * @function
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
        interval: time_interval,
        dateAdd: time_date_add,
        dateRoll: time_date_roll
    },
    GOG: gog_root,

    /**
     * Dulcineea - a legacy code friendly MVC
     * @namespace Dulcineea
     * @memberof quixot
     */
    Dulcineea: {
        compiler: {
            execute: _execute_js,
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
            return _uat_memodata;
        },
        wGL: function () {
            return  webGL;
        }
    }


}

})();



if(typeof module !='undefined') {
  module.exports = quixot;
}