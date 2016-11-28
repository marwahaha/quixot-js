var quixot = require('./dist/quixot.js');
console.log(quixot);

console.log(quixot.Util.atos('aa'));

var eq = quixot.Test.equals;

quixot.Util.atos(5, '123');
eq(quixot.Util.atos('aa'), 'aa');
eq(quixot.Util.atos(123), 'md');
eq(quixot.Util.atos(123456789), 'mdefghij');
eq(quixot.Util.atos({}), '[object Object]');
eq(quixot.Util.atos(0000001), 'b');
eq(quixot.Util.atos('0000001'), 'abcdefb');
eq(quixot.Util.atos('000000'), 'abcdef');
quixot.Test.monkey('console.log({any})');
//var a = quixot.Util.randStr(')#($@');


//quixot.Test.monkey('console.log({any})', 40);

// console.log(a);