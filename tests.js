if(typeof quixot === 'undefined'){
    quixot = require('./dist/quixot.js');
}

//load Sancho unit testing tools
var Sancho = quixot.Sancho, eq = Sancho.equals;


var myLogger = quixot.Logger.getInstance('myLogger', false, function (data) {
             console.log('my logger custom callback');
});
myLogger.log('info', 'info level log');
eq(myLogger.getLogs().info.length, 1);
myLogger.log('custom_level', 'some custom log');
eq(myLogger.getLogs().info.length, 1)
eq(myLogger.getLogs().custom_level.length, 1)
myLogger.warn('custom warn message');
eq(myLogger.getLogs().warn.length, 1);
myLogger.error('error message');
eq(myLogger.getLogs().error.length, 1);



quixot.Logger.setURLAccessKey('mySecretKey');

var log4CustomerSupport = quixot.Logger.getInstance('log4CustomerSupport', {consoleAppender: false, fileAppender: false});

log4CustomerSupport.trace('this log happens client side');
log4CustomerSupport.trace('and client could see stored data');
log4CustomerSupport.trace('by calling in console');
log4CustomerSupport.trace('quixot.Logger.getInstance(\'log4CustomerSupport\').getLogs().trace');

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

eq(quixot.Cache.getSafe("key", 'does_not_exist_anymore'), 'does_not_exist_anymore');
quixot.Sancho.donkey('console.log({any} + \"any\");');
//var a = quixot.Util.randStr(')#($@');

//Sancho.hasData(quixot.Env.javaPath);
Sancho.hasData(quixot.System.os.name);
Sancho.hasData(quixot.System.os.version);

var img = 'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-0/p118x118/15380632_604271709773684_2169990880710390381_n.jpg?oh=0c50a6c045ecded702c53527bcb7e14e&oe=58B6E4A7';

for(var i = 0; i < 5; i++){
  var a =  quixot.Mingui.notify('Lorem ipsum' + i, 'Lorem ipsum ' + i + ' doloret sit amet. Big bag texxxt :)', img, (i+1) * 1000);
}