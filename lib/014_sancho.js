

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
           sum = util_atos(randInt()) + ''
                    + util_atos(date.getMilliseconds()) + ''
                    + util_atos(date.getMinutes()) + ''
                    + util_atos(date.getHours()) + ''
                    + util_atos(date.getDay()) + ''
                    + util_atos(date.getDate()) + ''
                    + util_atos(date.getMonth()) + ''
                    + util_atos(date.getFullYear()) + ''
                    + util_atos(date.getYear()) + ''
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
            //         .replace(/{numberList}/g, JSON.util_stringify(randListNr()) )
            //         .replace(/{stringList}/g, JSON.util_stringify(randListString()) )
                    .replace(/{objectList}/g, JSON.stringify(randListObj()) )
            //         .replace(/{object}/g, JSON.util_stringify(randObj()) )
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
    if(env_isNodejs){
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


            if(util_isArray(a) && util_isArray(b)){
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
                        message = util_getMethodCaller(arguments);
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
        var limit = math_round(Math.random()*maxSize) + 1;
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
        var lrand = math_round(Math.random() * 3);
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
       return math_round(randNr(min, max))
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

