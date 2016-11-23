quixot.test = (function () {
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
        var sum = quixot.atos(randInt(), config.strlist) + ''
                + quixot.atos(date.getMilliseconds(), config.strlist) + ''
                + quixot.atos(date.getMinutes(), config.strlist) + ''
                + quixot.atos(date.getHours(), config.strlist) + ''
                + quixot.atos(date.getDay(), config.strlist) + ''
                + quixot.atos(date.getDate(), config.strlist) + ''
                + quixot.atos(date.getMonth(), config.strlist) + ''
                + quixot.atos(date.getFullYear(), config.strlist) + ''
                + quixot.atos(date.getYear(), config.strlist) + ''
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

            // var tocalll = strdata.replace(/{string}/g, '"' + randomString()+ '"' )
            //         .replace(/{number}/g, randNr() )
            //         .replace(/{integer}/g, randInt() )
            //         .replace(/{integerList}/g, JSON.stringify(randListInt()) )
            //         .replace(/{numberList}/g, JSON.stringify(randListNr()) )
            //         .replace(/{stringList}/g, JSON.stringify(randListString()) )
            //         .replace(/{objectList}/g, JSON.stringify(randListObj()) )
            //         .replace(/{object}/g, JSON.stringify(randObj()) )
            //         .replace(/{any}/g, randAny() )
            //     ;
            // console.log('prepare ' + tocalll);
            // calls.push(tocalll);


        }

        console.log(calls);

        // setTimeout(function () {
        //
        //
        //     if(config.debug) {
        //         console.log(iterations + 'tocall = ' + tocalll);
        //
        //     }
        //
        //     eval(tocalll);
        //     monkey(strdata, iterations -1);
        // }, 2);

    }

    function equals(a, b) {
        if(config.debug) {
            console.log('check if ' + a + ' === ' + b);
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
        for(var i = 0; i < maxSize; i++) {
            if(getter) {
                arr.push(getter());
            }

        }
        return arr;
    }


    function randListNr(maxSize, maxRand) {
        return randList(maxSize, new function () {
            return randNr(maxRand);
        })
    }


    function randListInt(maxSize, maxRand) {
        return randList(maxSize, new function () {
            return randInt(maxRand);
        });
    }


    function randListString() {
        return randList(maxSize, new function () {
            return randomString();
        });
    }


    function randListObj() {
        return randList(maxSize, new function () {
            return randObj();
        });
    }


    function randAny() {
        var lrand = Math.round(Math.random() * 4);
        switch (lrand) {
            case 0:
                return '"' +randomString()+ '"';
            case 1:
                return randInt();
            case 2:
                return randNr();
            case 3:
                return true;
        }

        return false;
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





    function unique(asfloat) {
        var date = new Date();
        var sum = parseInt(date.getMilliseconds()) + ''
                + parseInt(date.getMinutes()) + ''
                + parseInt(date.getHours()) + ''
                + parseInt(date.getDay()) + '';

        if (asfloat) {
            sum+='.';
        }
        sum+= parseInt(date.getDate()) + ''
                + parseInt(date.getMonth()) + ''
                + parseInt(date.getFullYear()) + ''
                + parseInt(date.getYear()) + ''
            ;
       if(asfloat) {
           return parseFloat(sum);
       }

        return parseInt(sum);
    }


    function randInt(max) {
        if(max) {
            return Math.round(Math.random() * max);
        }
        return unique(false);
    }

    /**
     * always return a new number
     * @returns {*}
     */
    function randNr(max) {
        if(max){
            return (Math.random() * max);
        }
        return unique(true);
    }

    return {
        equals: equals,
        monkey: monkey,
        randNr: randNr,
        randObj: randObj,
        randInt: randInt,
        randList: randList,
        randStr: randomString,
        unique: unique,
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
     quixot.test.monkey('console.log({any})')
     quixot.test.monkey('console.log({string}, {number}, {integer}, {integerList}, {numberList}, {stringList}, {objectList}, {object})')
     */
})();