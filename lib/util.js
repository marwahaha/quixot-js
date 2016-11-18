(function extend1(window, quijot){
    var fingerPrint = quijot.getFingerPrintData();

    var strType = (typeof 'string') + '',
        nrType = (typeof 2) + '',
        objType = (typeof {}) + '',
        boolType = (typeof true) + '',
        fncType = (typeof function(){}) + '';





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


    function stringify(obj, stackno) {

        if(!stackno ) {
            stackno = 3;
        }



        if(obj === 0) {
            return '0';
        }

        if(typeof obj === nrType) {
            return ''+obj;
        }
        if(!obj) {
            return 'false';
        }
        if(obj === true) {
            return 'true';
        }
        if(isPrimitive(obj)) {
            return '"' + obj + '"';
        }

        if(isFunction(obj)) {
            return '"[funct]"';
        }

        if(isArray(obj)) {
            var r = '[';
            for(var i = 0; i < obj.length; i++) {
                r += stringify(obj[i], stackno);

                if(j < obj.length -1) {
                    r+=','
                }
            }
            r+=']';
            return r;
        }

        if(stackno < 2) {
            return '[stack]';
        }

        var keys = objKeys(obj);
        var r = '{', n = 0;
        for (var j in obj) {
            n++;
            var value = stringify(obj[j], stackno -1);
            r+=j + ':' + value;
            if(n < keys.length -1) {
                r+=',';
            }
        }

        r+='}';

        return r;
    }

    quijot.stringify = stringify;

    fingerPrint.dataTypes = strType +':'+ nrType+ ':' + objType+':' + boolType+':' + fncType;
    

    function isPrimitive(d){
        return (typeof d === strType || typeof d === nrType || typeof d === boolType);
    }

    function isFunction(d){
        return typeof d === fncType;
    }


    function isArray(d){
        return Array.isArray(d);
    }

    quijot.getFingerPrintData = function () {
        return fingerPrint;
    };

    quijot.isPrimitive = isPrimitive;
    quijot.isFunction = isFunction;
    quijot.isArray = isArray;
    quijot.objKeys = objKeys;
    quijot.simplify = simplify;

})(window, quixot);