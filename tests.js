var quixot = require('./dist/quixot.1.0.0.beta.min.js');

console.log(quixot.atos('aa'));

var eq = quixot.test.equals;

quixot.atos(5, '123');
eq(quixot.atos('aa'), 'aa');
eq(quixot.atos(123), 'md');
eq(quixot.atos(123456789), 'mdefghij');
eq(quixot.atos({}), '[object Object]');
eq(quixot.atos(0000001), 'b');
eq(quixot.atos('0000001'), 'abcdefb');
eq(quixot.atos('000000'), 'abcdef');
quixot.test.monkey('console.log({any})');
var a = quixot.test.randStr(')#($@');


quixot.test.monkey('console.log({any})', 40);

// console.log(a);