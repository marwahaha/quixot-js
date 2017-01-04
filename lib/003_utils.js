
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

}