var quixot = (function(context){

    var strType = (typeof 'string') + '',
        nrType = (typeof 2) + '',
        objType = (typeof {}) + '',
        boolType = (typeof true) + '',
        fncType = (typeof function(){}) + '',
        alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');;




    /**
     * initial fingerprint data
     * @type {{_nsp: number[], _errs: number[], pi, ln2, ln10, log2e, log10e, sqrt1_2, sqrt, fun}}
     */
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

            if (context.NaN) {
                txt+='NaN' + NaN;
            }

            if (Math.hypot) {
                txt+='hypot'+ Math.hypot(3, 4, '5') + '#' + Math.hypot(3, 4);
            }

            return txt;

        })()
    };


    /**
     * TODO add this to logger
     */
    if(!context.console) {
        context.console = {};
        if (!context.console.log) {
            context.console.log = function () {}
        }

    }
    if (!context.Object.keys) {
        context.Object.keys = function(obj) {
            var keys = [];
            for (var i in obj) {
                if (obj[i]) {
                    keys.push(i);
                }
            }
            return keys;
        };
        fingerPrintData._nsp.push('Object.keys');
    }


    /**
     * TODO perform a better search here
     */
    fingerPrintData._timeZoneAbbr = (function(){
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
    })();


    var webGL = false;

    if (context.document) {
        try {
            var canvas = context.document.createElement('canvas');


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

            webGL =  (!!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ) );

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



    //TODO improve this
    function numberToString(numval, strlist, zval) {


        if(!zval) {
            zval = 0;
        }

        if(!strlist) {
            strlist = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }


        var response, pid = numval + '' + strlist + zval+'';
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

        if(  ( (numval+'' == '0' || numval.length > 0) && numval[0] == '0') ){
            if(zval > strlist.length - 1) {
                zval = 0;
            }
            var rest = numval.substring(1, numval.length);


            if(rest) {
                response = strlist[zval] + numberToString(rest, strlist, zval+1);
                memodata[pid] = response;

                return response;
            } else {
                return strlist[zval];
            }
        }


        if(!(+numval) || numval instanceof Date) {
            numval = numval+''; //force
            response = numval[0];
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



    function getFingerprintIdentifier() {
        var text = getFingerPrintText();
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
        var text = getFingerPrintText(), nums = '';

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
    }


    

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
            console.log(e);
        } finally {

        }
    }

    fingerPrintData.registeredMethods += line.join('');



    function getFingerPrintText() {
        var text = '';

        var obj = quixot.Fingerprint.data(); //use ovverideble data

        for(var i in obj){
            text += i + (obj[i]);
        }
        return text;
    }






    return {
        Fingerprint: {
            data: getFingerPrintData,
            identifier: getFingerprintIdentifier,
            text: getFingerPrintText,
            numbers: getFingerprintNumbers
        },
        atos: numberToString,
        serialize: serialize,
        simplify: simplify,
        isPrimitive: isPrimitive,
        isFunction: isFunction,
        objKeys: objKeys,
        isArray: isArray,
        encodeObject: encodeObject,
        stringify: stringify,
        _performance: getPerformance,
        _getmemodata: function () {
            return memodata;
        },
        _getGL: function(){
            return webGL;
        }
    }

})(
    (function () {
        if(typeof window != 'undefined') {
            return window;
        }

        if(typeof GLOBAL != 'undefined') {
            return GLOBAL;
        }
        return {};
    })()
);


if(typeof module !='undefined') {
    module.exports = quixot;
}







quixot.Logger = (function () {



    function LogInstance(name) {

        var sessionLogs = {
            // debug: [],
            // error: [],
            // info: [],
            // trace: [],
            // fine: [],
            // finest: []
        };

        var config = {};

        function getStack() {
            try {
                throw new Error();
            }
            catch(e) {
                if (e.stack) {
                    return e.stack.split('\n');
                }
            }
        }

        function log(level, message) {

            if(!level) {
                level = 'info';
            }

            if(!sessionLogs[level]) {
                sessionLogs[level] = [];
            }

            sessionLogs[level].push({
                message: message,
                stack: getStack(),
                caller: arguments.callee.caller
            });


        }


        return {
            log: log,
            getLogs: function () {
                return sessionLogs;
            }
        }


    }


    var defaultInstance = new LogInstance('quixot');
    

    return {
        log: function (level, message) {
                defaultInstance.log(level, message);
        },
        getLogs: function () {
            return defaultInstance.getLogs();
        }
    }

})();

quixot.Logger.log('debug', 'asdasd');/**
 * Created by alexstf on 1/8/16 for cam4.
 * Used to decode url format into object
 */

quixot.URL = (function() {


    function decode(url){
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
                console.log(arr);
                var last = arr[1];
                var parts = last.split('&');

                if (parts.length >= 1) {
                    for (var i = 0; i < parts.length; i++) {
                        var keyVal = parts[i].split('=');
                        if (keyVal.length > 1) {
                            var val = keyVal[1];
                            if(val.indexOf && val.indexOf(',') > -1) {
                                val = (val+'').split(',')
                            }
                            if(+val) {
                                val= parseFloat(val);
                            }
                            response[keyVal[0]] = val;
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

    function getParams(url) {
        console.log(decode(url));
        return decode(url).params;
    }


    function getDomainFromUrl(url){
        url = url + ''; //to avoid indexOf failing
        var domain = (url.indexOf('://') > -1) ? url.split('/')[2] : url.split('/')[0];
        if(domain){
            return domain.split(':')[0];
        }
        return 'localhost';
    }

    function currentDomain() {
        if(typeof document != 'undefined') {
            if(document.domain){
                return document.domain;
            }

            if(document.URL){
                return getDomainFromUrl(document.URL);
            }

        }
        return 'localhost';
    }

    return {
        getParams: getParams,
        getDomainFromUrl: getDomainFromUrl,
        currentDomain: currentDomain,
        decode: decode,
        currentPath: function () {
            return window.location.pathname
        },
        currentSearch: function () {
            return window.location.search
        },
        currentData: function () {
            return decode(document.URL);
        }
    };
})();quixot.Cookie = (function(){
    function getCookie(name) {

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


    return {
        get: getCookie,
        set: setCookie,
        drop: deleteCookie
    }
})();//require urldecoder
quixot.Cache = (function () {


    function CacheInstance(paramname) {
        var name = 'qch' + (paramname+'');
        name = name.replace(/\?/g, 'î')
            .replace(/=/g, 'ă')
            .replace(/\//g, 'ț')
            .replace(/\./g, '₤')
        ;



        var data = (function () {
            var r;

            if(typeof localStorage != 'undefined') {
                r = localStorage.getItem(name);
                // console.log('load' + r + ' for ' + name);
            }

            if(!r) {
                r = quixot.Cookie.get(name);
            }

            try {
                r = JSON.parse(r);
            }catch (e) {
                throw new Error('failed loading cache from ' + r);
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


        this.remove = function (slot) {
            if(data) {
                delete data[slot];
            }
        }


        this.save = function () {
            if(!data) {
                return;
            }
            // console.log('save cache [' + name + ' at ' + new Date());
            if(typeof localStorage != 'undefined') {
                localStorage.setItem(name, JSON.stringify(data));
            }

            quixot.Cookie.set(name, JSON.stringify(data));
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
        }
    }


    var domain = quixot.URL.currentDomain(),
        path = quixot.URL.currentPath(),
        search = quixot.URL.currentSearch();


    var domainInstance = new CacheInstance(domain),
        pathInstance =  new CacheInstance(path),
        searchInstance = new CacheInstance(search);


    var container = {
        domain: domainInstance,
        path: pathInstance,
        search : searchInstance
    };


    function saveAllInStorage() {
        for(var i in container) {
            container[i].save();
        }

        setTimeout(saveAllInStorage, 1000);
    }

    saveAllInStorage();

    return {
        getInstance: function (instancename) {
            if(!container[instancename]) {
                container[instancename] = new CacheInstance(instancename);
            }
            return container[instancename];
        },

        put: function (key, value) {
            domainInstance.put(key, value)
        },

        getData: function () {
            return  domainInstance.getData()
        }
    }
})();
//
//get the IP addresses associated with an account

/**
 * http://stackoverflow.com/questions/37169701/get-current-machine-ip-in-js-no-third-party-services
 * @param callback
 */
quixot.getIPs = function(callback){

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


quixot.getIPs(function (ip) {
});var quixot = quixot || {};




quixot.System = {
    battery: (function () {
        if(typeof navigator != 'undefined') {
            return navigator.battery || navigator.webkitBattery || navigator.mozBattery || {};
        }
        return false;
    })(),

    screen: (function () {

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

    os: {}
}


quixot.Browser = (function () {

    var fingerPrintData = {};

    if(typeof quixot != 'undefined' && typeof quixot.fingerprint != 'undefined' && typeof quixot.fingerprint.data != 'undefined') {
        fingerPrintData = quixot.fingerprint.data();
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
    /**
     * the order of this list is very important for backward complatibility
     * @type {*[]}
     */
    var dataBrowser = [
        {string: getNavigator().userAgent, subString: 'iCab', versionSearch: 'iCab', identity: 'iCab'},
        {string: getNavigator().userAgent, subString: 'rekonq', versionSearch: 'rekonq', identity: 'Rekonq'},
        {string: getNavigator().userAgent, subString: 'Midori', versionSearch: 'Midori', identity: 'Midori'},
        {string: getNavigator().userAgent, subString: 'Arora', versionSearch: 'Arora', identity: 'Arora'},
        {string: getNavigator().userAgent, subString: 'Stainless', versionSearch: 'Stainless', identity: 'Stainless'},
        {string: getNavigator().userAgent, subString: 'Epiphany',versionSearch: 'Epiphany', identity: 'Epiphany'},
        {string: getNavigator().userAgent, subString: 'K-Meleon', versionSearch: 'K-Meleon', identity: 'K-Meleon'},
        {string: getNavigator().vendor, subString: 'Camino', identity: 'Camino'},
        {string: getNavigator().userAgent, subString: 'Maxthon', versionSearch: 'Maxthon', identity: 'Maxthon'},
        {string: getNavigator().userAgent, subString: 'SeaMonkey', versionSearch: 'SeaMonkey', identity: 'SeaMonkey'},
        {string: getNavigator().userAgent, subString: 'Edge', identity: 'Edge', versionSearch: 'Edge'},

        {string: getNavigator().userAgent, subString: 'Chrome', identity: 'Chrome'},
        {string: getNavigator().userAgent, subString: 'OmniWeb', versionSearch: 'OmniWeb/', identity: 'OmniWeb'},
        {string: getNavigator().vendor, subString: 'Apple', identity: 'Safari', versionSearch: 'Version'},
        {prop: getWindow().opera, identity: 'Opera', versionSearch: 'Version'},
        {string: getNavigator().vendor, subString: 'iCab', identity: 'iCab'},
        {string: getNavigator().vendor, subString: 'KDE', identity: 'Konqueror'},
        {string: getNavigator().userAgent, subString: 'Firefox', identity: 'Firefox'},
        {string: getNavigator().userAgent, subString: 'Netscape', identity: 'Netscape'},
        {string: getNavigator().userAgent, subString: 'MSIE', identity: 'Explorer', versionSearch: 'MSIE'},
        {string: getNavigator().userAgent, subString: 'Gecko', identity: 'Mozilla', versionSearch: 'rv'},
        // for older Netscapes (4-)
        {string: getNavigator().userAgent, subString: 'Mozilla', identity: 'Netscape', versionSearch: 'Mozilla'},
    ];


    var dataOS = [
        {string: getNavigator().platform, subString: 'Win', identity: 'Windows'},
        {string: getNavigator().platform, subString: 'Mac', identity: 'Mac'},
        {string: getNavigator().userAgent, subString: 'iPhone', identity: 'iPhone'},
        {string: getNavigator().userAgent, subString: 'iPad', identity: 'iPad'},
        {string: getNavigator().userAgent, subString: 'Android', identity: 'Android'},
        {string: getNavigator().platform, subString: 'Linux', identity: 'Linux'}
    ];



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
        if(typeof getNavigator().userAgent != 'undefined') {
            return getNavigator().userAgent;
        }
        return getNavigator().userAgent || ' ';
    }


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
            javaEnabled = getNavigator().javaEnabled();
        } catch (e) {
            javaEnabled = false;
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


    quixot.System.os.name = operatingSystem;
    quixot.System.os.version = operatingSystemSub;


    fingerPrintData.plugins = pluginsList.sort().join('');
    fingerPrintData.screen = quixot.encodeObject(quixot.System.screen);
    fingerPrintData.chrome = quixot.encodeObject(getChrome(), 8);
    fingerPrintData.netscape = quixot.encodeObject(getNetscape(), 4);
    fingerPrintData.navigator = quixot.encodeObject(quixot.simplify(getNavigator()));
    fingerPrintData.plugins = quixot.encodeObject(getNavigator().plugins, 3);
    fingerPrintData.mimeTypes =  quixot.encodeObject(getNavigator().mimeTypes, 3);


    quixot.Fingerprint.data = function () {
        return fingerPrintData;
    }

    return {
        name: browserName,
        version: browserVersion,
        is: getIs(),
        has: getHases(),
        get: getGeetters()
    }
})();





// mathml support
//ActiveX || directx suport
//http://browserspy.dk/math.php
//http://browserspy.dk/svg.php
//http://browserspy.dk/windowsmediaplayer.php
//http://browserspy.dk/openoffice.php
//http://browserspy.dk/soundcard.php
//http://browserspy.dk/quicktime.php
//http://browserspy.dk/realplayer.php



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

