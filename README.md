#quixot-js

## Logger

### setURLAccessKey(name)
set the value for accessing logger configuration from URL.
If is set to ``` false```, no configuartion can
be changed by using URL parameters

Params:
* [name {String} required, the key name]

Usage:
```
/*
this will allow you to put the following query param into url:
http://localhost/mypage?customKey={"ALL":{"consoleAppender":true}}
*/
quixot.Logger.setURLAccessKey('customKey');
```

### getInstance(name, config, callback)
returns a new logger instance

Params:
* [name {String} required, the name of the instance] </li>
* [config {Object} optional] - configuration data, default will be ```defaultConfig</code> </li>

Usage:
```
  var myLogger = quixot.Logger.getInstance('TestLogger');
```

### LogInstance {private access}
Usage:
```
    myLogger.log('info', 'some message');
    myLogger.error('error occured');     /* myLogger.log('error', 'error occured'); */
    myLogger.info('info data');          /* myLogger.log('info', 'info data'); */
    quixot.Logger.warn('warning');       /* quixot.Logger.getInstance('quixot').log('warn', '111111') */
    quixot.Logger.trace('bla-bla-bla');   /*quixot.Logger.getInstance('quixot').log('warn', '111111')*/
```

###### realtime browser customer support (use case sample)

* Create a urlAccessKey:
```quixot.Logger.setURLAccessKey('mySecretKey');```

* Create a logger instance with no appenders and use it in your webpage:
```
  var log4CustomerSupport = quixot.Logger.getInstance('log4CustomerSupport', {consoleAppender: false, fileAppender: false});
  log4CustomerSupport.trace('this log happens client side');
  log4CustomerSupport.trace('and client could see stored data');
  log4CustomerSupport.trace('by calling in console');
  log4CustomerSupport.trace('quixot.Logger.getInstance(\'log4CustomerSupport\').getLogs().trace');
```

* ask your customer to access the webpage using the following query param: ```http://domain/custompage?mySecretKey={"log4CustomerSupport":{"fileAppender":true}}``` to view all logs of that specific logger or use ```mySecretKey={"log4CustomerSupport":{"info": {"fileAppender":true}} }``` to display on screen only info messages for ```log4CustomerSupport```. You can also use ```mySecretKey={"ALL":{"fileAppender":true}} ``` to view all logs

## Util
### ```atos(data, String)```
encode any type of javascript data type (specially numbers) to string

Params:
* [data {Number|String|Date|Object|Array|Function} required]
* [string {String} optional] - a string whose characters will be used for encoding
Usage:
```
    quixot.atos(123456789); /*"mdefghij"*/
    quixot.atos(000000); /*"a"*/
    quixot.atos('000000'); /*"abcdef"*/
    quixot.atos('000000', '!@#$%^&*()+='); /*"!@#$%^"*/
```
### ```incr(mode)```
increments an unique number (old value is cached)

Params:
* [asfloat {Boolean} optional]
Usage:
```
    quixot.Util.incr(true); /*30.07000000000001*/
    quixot.Util.incr();     /*31*/
```


## Fingerprint
provide an unique identifier for a given operating system/browser

Methods:
* ```data()``` - returns the full scanned properties
* ```text()```     - returns the text to compose the fingerprint
* ```numbers()```  - returns numbers from text()
* ```identifier()``` - returns the unique identifier


###### browser scanned features
* abreviated time zone
* unsupported javascript engine features, like Object.keys
* ```Math``` functions and constants (```imul</code> support match only for newer browsers)
* computer name (for IE versions retrieved via ActiveX)
* installed plugins and supported mime types  based on the recursive depth scan
* webgl support, version , vendor, renderer
* empty canvas dataUrl, both .png and .jpeg format
* chrome, netscape specific properties
* screen info (width, height, colorDepth, pixelRation)
* browser supported css properties
* unique property names of supported javascript features (check the .evilUtors) property
* the ```evilUtors```  are a set of evaluable strings meant to return sensitive information about browser and javascript engine

