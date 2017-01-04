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

