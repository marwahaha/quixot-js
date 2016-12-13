function __isnodejs() {
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






