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
        var sum = q.atos(randInt(), config.strlist) + ''
                + q.atos(date.getMilliseconds(), config.strlist) + ''
                + q.atos(date.getMinutes(), config.strlist) + ''
                + q.atos(date.getHours(), config.strlist) + ''
                + q.atos(date.getDay(), config.strlist) + ''
                + q.atos(date.getDate(), config.strlist) + ''
                + q.atos(date.getMonth(), config.strlist) + ''
                + q.atos(date.getFullYear(), config.strlist) + ''
                + q.atos(date.getYear(), config.strlist) + ''
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


    function randListString() {
        return randList(config.maxListSize, randomString);
    }


    function randListObj() {
        return randList(config.maxListSize, randObj);
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

    function getNum(str) {
        var nums = str.split('');
        var sum = 0;
        for (var i = 0; i < str.length; i++) {
            if(+str[i]) {
                sum+= parseInt(str[i]);
            }
        }

        console.log(sum);
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

    return {
        equals: equals,
        monkey: monkey,
        randNr: randNr,
        randObj: randObj,
        randInt: randInt,
        randList: randList,
        randListObj:randListObj,
        randListStr: randListString,
        randStr: randomString,
        incr: incr,
        randAny: randAny,
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