
###### realtime browser customer support (use case sample)

* Create a urlAccessKey:
```
quixot.Logger.setURLAccessKey('mySecretKey');
```

* Create a logger instance with no appenders and use it in your webpage:
```
  var log4CustomerSupport = quixot.Logger.getInstance('log4CustomerSupport', {consoleAppender: false, fileAppender: false});
  log4CustomerSupport.trace('this log happens client side');
  log4CustomerSupport.trace('and client could see stored data');
  log4CustomerSupport.trace('by calling in console');
  log4CustomerSupport.trace('quixot.Logger.getInstance(\'log4CustomerSupport\').getLogs().trace');
```

* ask your customer to access the webpage using the following query param: ```http://domain/custompage?mySecretKey={"log4CustomerSupport":{"fileAppender":true}}``` to view all logs of that specific logger or use ```mySecretKey={"log4CustomerSupport":{"info": {"fileAppender":true}} }``` to display on screen only info messages for ```log4CustomerSupport```. You can also use ```mySecretKey={"ALL":{"fileAppender":true}} ``` to view all logs



###### browser scanned features in fingerprint detection
* abreviated time zone
* ```Math``` functions and static values
* computer name (for older IE versions retrieved via ActiveX)
* installed plugins and supported mime types  based on the recursive depth scan
* webgl support, version , vendor, renderer
* empty canvas dataUrl, both .png and .jpeg format
* chrome, netscape specific properties
* screen info (width, height, colorDepth, pixelRation)
* browser supported css properties
* unique property names of supported javascript features (check the .evilUtors) property
* the ```evilUtors```  are a set of evaluable strings meant to return sensitive information about browser and javascript engine
