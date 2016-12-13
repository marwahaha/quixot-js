

    var testingCfg = {
        debug: true,
        maxListSize: 20,
        strlist : 'abcdefghihklmnopqrstuvxyz',
        logging: logger_defaultConfiguration
    }






    function randomString(){
        var date = new Date();
        maxrand.str ++;
        var sum = numberToString(randInt(), testingCfg.strlist) + ''
                + numberToString(date.getMilliseconds(), testingCfg.strlist) + ''
                + numberToString(date.getMinutes(), testingCfg.strlist) + ''
                + numberToString(date.getHours(), testingCfg.strlist) + ''
                + numberToString(date.getDay(), testingCfg.strlist) + ''
                + numberToString(date.getDate(), testingCfg.strlist) + ''
                + numberToString(date.getMonth(), testingCfg.strlist) + ''
                + numberToString(date.getFullYear(), testingCfg.strlist) + ''
                + numberToString(date.getYear(), testingCfg.strlist) + ''
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
            console.log(randNr() + randomString() + randInt());

            console.log(randListInt());

             var tocalll = strdata.replace(/{string}/g, '"' + randomString()+ '"' )
            //         .replace(/{number}/g, randNr() )
                    .replace(/{integer}/g, randInt() )
                    .replace(/{integerList}/g, JSON.stringify(randListInt()) )
            //         .replace(/{numberList}/g, JSON.stringify(randListNr()) )
            //         .replace(/{stringList}/g, JSON.stringify(randListString()) )
                    .replace(/{objectList}/g, JSON.stringify(randListObj()) )
            //         .replace(/{object}/g, JSON.stringify(randObj()) )
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
    if(__isnodejs()){
        try {
            nodeAssert = __require('assert');
        }catch (e){
            nodeAssert = false;
        }
        testingCfg.logging.logStack = false;
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
                        message = __getCaller(arguments);
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
        var limit = Math.round(Math.random()*maxSize) + 1;
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
        return randList(maxSize, randomString);
    }


    function randListObj(maxSize) {
        if(!maxSize){
            maxSize = testingCfg.maxListSize;
        }
        return randList(maxSize, randObj);
    }


    function randAny() {
        var lrand = Math.round(Math.random() * 3);
        switch (lrand) {
            case 0:
                return '"' +randomString()+ '"';
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
            obj[randomString()] = randAny();
        }

        return obj;
    }


    var uniqueVal = getCacheInstance('@qtst').getSafe('lup', 1);
    try {
        uniqueVal = parseFloat(uniqueVal);
    } catch (e) {
        uniqueVal = new Date().getTime();
    }


    
    function incr(asfloat) {
        if (asfloat) {
            uniqueVal+=0.01;
        } else {
            uniqueVal = parseInt(uniqueVal+1);
        }
        getCacheInstance('@qtst').put('lup', uniqueVal);
        return uniqueVal;
    }
    

    function randInt(min, max) {
       return Math.round(randNr(min, max))
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
        return incr();
    }





//    randNr = randNr,
//    randInt = randInt,
//    randList = randList,
//    randListStr = randListString,
//    randListObj = randListObj;
//    incr = incr;
//    randStr = randomString,
//    randAny = randAny,
//    randObj = randObj;



