quixot.Test = (function (q) {
    var config = {
        debug: true,
        maxListSize: 20,
        strlist : 'abcdefghihklmnopqrstuvxyz'
    }


    var memoData = {
        strings: [],
        objects: [],
    };

    function randStrExist(value) {
        return memoData.strings.indexOf(value+'') > -1
    }


    function saveStr(value) {
        return memoData.strings.push(value+'');
    }

    function randomString(){
        var date = new Date();
        maxrand.str ++;
        var sum = q.Util.atos(randInt(), config.strlist) + ''
                + q.Util.atos(date.getMilliseconds(), config.strlist) + ''
                + q.Util.atos(date.getMinutes(), config.strlist) + ''
                + q.Util.atos(date.getHours(), config.strlist) + ''
                + q.Util.atos(date.getDay(), config.strlist) + ''
                + q.Util.atos(date.getDate(), config.strlist) + ''
                + q.Util.atos(date.getMonth(), config.strlist) + ''
                + q.Util.atos(date.getFullYear(), config.strlist) + ''
                + q.Util.atos(date.getYear(), config.strlist) + ''
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
//             if(config.debug) {
//                 console.log(iterations + 'tocall = ' + tocalll);
//
//             }
//
//             eval(tocalll);
//             monkey(strdata, iterations -1);
//         }, 2);

    }

    function equals(a, b) {

        if(a == b) {
            if(config.debug) {
                console.log('check if ' + a + ' === ' + b + ' ---> SUCCESS');
            }
        }
        else {

            throw new  Error('check if ' + a + ' === ' + b + ' ---> FAIL');

        }
        return a === b;
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
            maxSize = config.maxListSize;
        }
        return randList(maxSize, randomString);
    }


    function randListObj(maxSize) {
        if(!maxSize){
            maxSize = config.maxListSize;
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






    var uniqueVal = q.Cache.getInstance('@qtst').getSafe('lup', 1);
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
        q.Cache.getInstance('@qtst').put('lup', uniqueVal);
        return uniqueVal;
    }
    

    function randInt(min, max) {
       return Math.round(randNr(min, max))
    }

    /**
     * always return a new number
     * @returns {*}
     */
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


    q.Util.randNr = randNr,
    q.Util.randInt = randInt,
    q.Util.randList = randList,
    q.Util.randListStr = randListString,
    q.Util.randListObj = randListObj,
    q.Util.incr = incr,
    q.Util.randStr = randomString,
    q.Util.randAny = randAny,
    q.Util.randObj = randObj;



    return {
        equals: equals,
        monkey: monkey,
        config: config,
        _memo: function () {
            return {
                data: memoData,
                max: maxrand
            };
        }
    }

    /**

     quixot.test.monkey('console.log({string}, {number}, {integer}, {integerList}, {numberList}, {stringList}, {objectList}, {object})')
     */
})(quixot);