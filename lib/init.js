/**
 * TODO add this to logger
 */
if(typeof console === 'undefined') {
    console = {};
    if (typeof console.log === 'undefined') {
        console.log = function () {}
    }
}

if(typeof JSON === 'undefined'){
    JSON = {};

    if(typeof JSON.stringify === 'undefined') {
    }
    
}



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
        Util: {
            atos: numberToString,
            serialize: serialize,
            simplify: simplify,
            isPrimitive: isPrimitive,
            isFunction: isFunction,
            objKeys: objKeys,
            isArray: isArray,
            encodeObject: encodeObject,
            stringify: stringify
        },
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








