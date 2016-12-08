if(typeof quixot === 'undefined'){
    quixot = require('./dist/quixot.js');
}


// console.log(quixot);
//
// console.log(quixot.Util.atos('aa'));

var eq = quixot.Sancho.equals;

quixot.Util.atos(5, '123');
eq(quixot.Util.atos('aa'), 'aa');
eq(quixot.Util.atos(123), 'md');
eq(quixot.Util.atos(123456789), 'mdefghij');
eq(quixot.Util.atos({}), '[object Object]');
eq(quixot.Util.atos(0000001), 'b');
eq(quixot.Util.atos('0000001'), 'abcdefb');
eq(quixot.Util.atos('000000'), 'abcdef');
quixot.Cache.put("key", 'some_value')
eq(quixot.Cache.getSafe("key", null), 'some_value');

quixot.Cache.remove('key');

eq(quixot.Cache.getSafe("key", 'nu_exista'), 'nu_exista');
quixot.Sancho.donkey('console.log({any})');
//var a = quixot.Util.randStr(')#($@');

console.log(quixot.Env.javaPath);




//quixot.Test.monkey('console.log({any})', 40);

// console.log(a);