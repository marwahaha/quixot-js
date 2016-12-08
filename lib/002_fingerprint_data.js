

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
    var obj = fingerPrintData; //use ovverideble data
    for(var i in obj){
        text += i + (obj[i]);
    }
    return text;
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