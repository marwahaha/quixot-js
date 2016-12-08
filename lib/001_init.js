/**
 * @namespace quixot
 */
var quixot = (function(context){

    var strType = (typeof 'string') + '',
        nrType = (typeof 2) + '',
        objType = (typeof {}) + '',
        boolType = (typeof true) + '',
        fncType = (typeof function(){}) + '',
        alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');;





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
     *
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




   var registeredEvents = {}, eventDispatchers = {};
    
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
                }
            }
        }

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



    var requirememo = {};

    function __isnodejs() {
        return (typeof module !== 'undefined' && module.exports);
    }

    function __log(messaage) {
        if(quixot && quixot.Logger){
            quixot.Logger.getInstance('quixot_init').info(messaage);
        }
    }

    function __require(modulename) {
        if (__isnodejs()) {
            if (requirememo[modulename]) {
                return requirememo[modulename];
            }
            __log(modulename);
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
            getAll: function () {
                return {
                    events: registeredEvents,
                    dispatchers: eventDispatchers
                };
            },

            /**
             * appoint a method. It uses animationFrame or setTimeout, or direct call if none of the
             * above exists
             * @memberof quixot.Event
             * @param callback {Function} required
             * @param delay  {Number} optional, used only for setTimeout
             * @returns {Object}
             */
            appoint: function (callback, delay) {
                var type = 'unknown', thisLoop =  new Date().getTime(), fps, timeoutId;
                if(!delay){
                    delay = 30;
                }
                if(context.requestAnimationFrame){
                    type = 'requestAnimationFrame';
                    timeoutId = context.requestAnimationFrame(callback);
                }
                else if(context.mozRequestAnimationFrame){
                    type = 'mozRequestAnimationFrame';
                    timeoutId = context.mozRequestAnimationFrame(callback);
                }
                else if(context.msRequestAnimationFrame){
                    type = 'msRequestAnimationFrame';
                    timeoutId = context.msRequestAnimationFrame(callback);
                }
                else if(context.webkitRequestAnimationFrame){
                    type = 'webkitRequestAnimationFrame';
                    timeoutId = context.webkitRequestAnimationFrame(callback);
                }
                else if(context.oRequestAnimationFrame){
                    type = 'oRequestAnimationFrame';
                    timeoutId = context.oRequestAnimationFrame(callback);
                }
                else if(typeof setTimeout != 'undefined'){
                    timeoutId = setTimeout(callback, 30);
                    type = 'setTimeout';
                } else {
                    type = 'nothing found';
                    callback();
                }

               quixot.Event.dispatch(quixot.Event.APPOINTMENT_DONE);

                return {
                    type: type,
                    id: timeoutId
                };
            },


            /**
             * @memberof quixot.Event
             * @param id
             */
            dropAppoint: function (id) {
                if (context.cancelAnimationFrame) {
                    context.cancelAnimationFrame(id);
                } else {
                    clearTimeout(id);
                }
            }
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
            stringToHex: function(integer) {
                var str = parseInt(integer).toString(16);
                return str.length === 1 ? '0' + str : str;
            },
            rgbToHex: function(r, g, b) {
                return '#' + ColorUtils.stringToHex(r) + ColorUtils.stringToHex(g) + ColorUtils.stringToHex(b);
            },
            rgbToHexShift: function(r, g, b) {
                return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            },
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
             * @example
             *  quixot.Util.incr(true); // 30.07000000000001
             *  quixot.Util.incr();    // 31
             */
            incr: function (asfloat) {

            },
            /**
             * if no parameters are provided a quixot.Util.incr() value will be returned
             * @memberof quixot.Util
             * @param min
             * @param max
             * @returns {Number}
             */
            randNr: function (min, max) {

            }
        },
        /**
         * returns data related to current context
         * @memberof quixot
         */
        context: function () {
            return quixot_context;
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
        Env: (function () {
                var isBrowser = (typeof  window != 'undefined'),

                    data = {
                        jsEngine: {
                            isNodeJs: __isnodejs(),
                            isBrowser: isBrowser
                        },
                        javaEnabled: false,
                        tempDir: '',
                        homeDir: '',
                        javaPath: false
                    };

            if(typeof process != 'undefined' && process.env){
                for(var i in process.env){
                    data[i] = process.env[i];
                    fingerPrintData['process_env' + i] = process.env[i];
                }
                var p = __require('path');
                data.homeDir = (process.env.HOME || process.env.USERPROFILE);
                data.tempDir = (process.env.TEMP || process.env.TMP || process.env.APPDATA);

                if(process.env.JRE_HOME){
                    data.javaEnabled = true;
                    data.javaPath = process.env.JRE_HOME + p.sep + 'bin' + p.sep + 'java';
                }
                else if(process.env.JAVA_HOME){
                    data.javaEnabled = true;
                    data.javaPath = process.env.JAVA_HOME + p.sep + 'bin' + p.sep + 'java';
                }


            }
            return data;
        })(),

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

})(quixot_context);






if(typeof module !='undefined') {
    module.exports = quixot;
}




