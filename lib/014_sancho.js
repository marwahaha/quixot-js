

    var _testing_configuration = {
        debug: true,
        maxListSize: 20,
        strlist : 'abcdefghihklmnopqrstuvxyz',
        logging: logger_defaultConfiguration
    },
    cache_old_val = cache_getInstance('@qtst').getSafe('lup', 1),
        _test_count = 0,
        nodeAssert;;


    try {
        cache_old_val = parseFloat(cache_old_val);
    } catch (e) {
        cache_old_val = new Date().getTime();
    }






    

    function sancho_monkey() {

        var method_list = [], self = this, _evals=[];


        return {
            burden: function (_method) {
                method_list.push(_method);
                return this;
            },

            freeVal: function (strdata, iterations) {
                for(var i = 0; i < iterations; i++){

                    var s = strdata.replace(/{string}/g, '"' + util_random_string() + '"')
                        .replace(/{number}/g, util_randNr());
                    _evals.push(s);
                }
                return this;
            },

            run : function () {
                util_array_each(method_list, function (i, a) {
                    a(self);
                });

                util_array_each(_evals, function (i, a) {
                    eval(a);
                });
                return true;
            }
        }

    }





    if(env_isNodejs){
        try {
            nodeAssert = __require('assert');
        }catch (e){
            nodeAssert = false;
        }
        _testing_configuration.logging.logStack = false;
    }



    function sancho_hasProperty(o, k) {
        _test_count++;
        var r = (typeof o != 'undefined' && typeof o[k] != 'undefined');

        if(r){
            if(_testing_configuration.logging) {
                logger_getInstance('Tests', _testing_configuration.logging)
                    .info(_test_count + ') check if '+ json_stringify(o) +' has property [' + k + '] SUCCESS');
            }
        } else {
            throw new  Error(_test_count + ') check if '+json_stringify(o)+' has property [' + k + '] FAIL');
        }

        return r;
    }



    function sancho_deepEquals(a, b) {
        _test_count++;
        if(nodeAssert && nodeAssert.deepEqual){
            if(_testing_configuration.logging) {
                logger_getInstance('Tests', _testing_configuration.logging)
                    .info(_test_count + ') check deepEquals if ' + a + ' === ' + b);
            }
            nodeAssert.deepEqual(a, b);
        } else {


            if(util_isArray(a) && util_isArray(b)){
                if(a.length === b.length){

                    util_array_each(a, function (i, v) {
                        if(v !== b[i]){
                            throw new  Error(_test_count + ') check if ' + a + ' === ' + b + ' FAIL');
                        }
                    })
                } else {
                    throw new  Error(_test_count + ') check if ' + a + ' === ' + b + ' FAIL');
                }
            }


            if(_testing_configuration.logging) {
                logger_getInstance('Tests', _testing_configuration.logging)
                    .info(_test_count + ') check deepEquals if ' + a + ' === ' + b + ' ] SUCCESS');
            }
        }

        return a === b;
    }




    function sancho_equals(a, b) {
        _test_count++;
        if(nodeAssert){
            if(_testing_configuration.logging) {
                logger_getInstance('Tests', _testing_configuration.logging)
                    .info(_test_count + ') check if ' + a + ' === ' + b);
            }
            nodeAssert(a === b);
        } else {
            if(a == b) {
                if(_testing_configuration.logging) {
                   logger_getInstance('Tests', _testing_configuration.logging)
                        .info(_test_count + ') check if ' + a + ' === ' + b + ' ] SUCCESS');
                }
            }
            else {
                throw new  Error('check if ' + a + ' === ' + b + ' FAIL');
            }
        }


        return a === b;
    }


   
    function sancho_noDuplicates(_param_array) {
        if(!_param_array || !util_isArray(_param_array)){
            throw new  Error('array parameter required');
            return false;
        }
        _test_count++;
        var _copy = _param_array.slice();
        util_array_each(_param_array, function (j, a) {
            var l = 0;
            util_array_each(_copy, function (j, b) {
                if(a === b){
                    l++;
                }
                if(l > 1){
                    throw new  Error('check if ' + _param_array + ' has no duplicates failed at index ' + j +
                        ' [' + a +  '] FAIL');
                    return false;
                }
            })
        });

        if(_testing_configuration.logging) {
            logger_getInstance('Tests', _testing_configuration.logging)
                .info(_test_count + ') check if ' + _param_array + ' has no duplicates ] SUCCESS');
        }

        return true;

    }

    function sancho_hasData(item, message){
        _test_count++;
            if(!message){
                if(typeof arguments != 'undefined') {
                    message = util_getMethodCaller(arguments);
                }
            }

            if(typeof item != 'undefined' && item != '' && item != null){
                if(_testing_configuration.logging) {
                   logger_getInstance('Tests', _testing_configuration.logging)
                        .info(_test_count + ') check if ' + item + ' hasData ('+message+') ] SUCCESS');
                }
                return true;
            }
            throw new  Error(_test_count + ') ' + message + ' FAIL');
            return false;

    }


















    
   

