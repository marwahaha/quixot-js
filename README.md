#quixot-js



#### Logger

###### setURLAccessKey(name)
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



###### getInstance(name, config, callback)
returns a new logger instance

Params:
* [name {String} required, the name of the instance] </li>
* [config {Object} optional] - configuration data, default will be ```defaultConfig</code> </li>


Usage:
```
  var myLogger = quixot.Logger.getInstance('TestLogger');
```



###### LogInstance {private access}
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
* ask your customer to access the webpage using the following query param:
```
http://domain/custompage?mySecretKey={"log4CustomerSupport":{"fileAppender":true}}
```
to view all logs of that specific logger or
```
mySecretKey={"log4CustomerSupport":{"info": {"fileAppender":true}} }
```
to display on screen only info messages for ```log4CustomerSupport```
or
```
mySecretKey={"ALL":{"fileAppender":true}}
```
to view all logs

#### Util
<h4>```atos(data, String)</code></h4>
<h5>encode any type of javascript data type (specially numbers) to string </h5>
<ul> Params:
    <li> [data {Number|String|Date|Object|Array|Function} required] </li>
    <li> [string {String} optional] - a string whose characters will be used for encoding </li>
</ul>
Usage:
<pre>
    quixot.atos(123456789); /*"mdefghij"*/
    quixot.atos(000000); /*"a"*/
    quixot.atos('000000'); /*"abcdef"*/
    quixot.atos('000000', '!@#$%^&*()+='); /*"!@#$%^"*/
</pre>
<h4>```incr(asfloat)</code></h4>
<h5>increments an unique number</h5>
<ul> Params:
    <li> [asfloat {Boolean} optional] </li>
</ul>
Usage:
<pre>
    quixot.Util.incr(true); /*30.07000000000001*/
    quixot.Util.incr();     /*31*/
</pre>


#### Fingerprint
provide an unique identifier for a given operating system/browser
Methods:
* ```data()``` - returns the full scanned properties
* ```text()```     - returns the text to compose the fingerprint
* ```numbers()```  - returns numbers from text()
* ```identifier()``` - returns the unique identifier


<h5>browser scanned features</h5>
<ul>
    <li>
         abreviated time zone
    </li>
    <li>
        unsupported javascript engine features, like Object.keys
    </li>
    <li>
        ```Math</code> functions and constants (```imul</code> support match only for newer browsers)
    </li>
    <li>
        computer name (for IE versions retrieved via ActiveX)
    </li>
    <li>
        installed plugins and supported mime types
        based on the recursive depth scan
    </li>
    <li>
        webgl support, version , vendor, renderer
    </li>
    <li>
        empty canvas dataUrl, both .png and .jpeg format
    </li>
    <li>
        chrome, netscape specific properties
    </li>
    <li>
       screen info (width, height, colorDepth, pixelRation)
    </li>
    <li>
        browser supported css properties
    </li>
    <li>
        unique property names of supported javascript features
        (check the .evilUtors) property
    </li>
    <li>
        the ``` evilUtors </code>  are a set of evaluable strings meant to return sensitive information
        about browser and javascript engine
    </li>
</ul>










<h4 style="font-family: monospace; font-size: 12px; margin: 0px; padding: 0px">registered tests:</h4>
<table style="font-family: monospace; font-size: 12px; margin: 0px; padding: 0px">
<tr>
    <td>
        os/browser
    </td>

    <td>
        details:
    </td>
</tr>

<tr>
    <td>
       Windows	Chrome	55
    </td>

    <td>
       Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.28 Safari/537.36
    </td>
</tr>


<tr>
    <td>
       Windows	Explorer 11
    </td>

    <td>
      Mozilla/5.0 (Windows NT 6.1; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko (computer name detected)
    </td>
</tr>

<tr>
    <td>
       Ubuntu Netscape 5 (Browser)
    </td>

    <td>
        Mozilla/5.0 (Linux; Ubuntu 14.04) AppleWebKit/537.36 Chromium/35.0.1870.2 Safari/537.36
     </td>
</tr>


<tr>
    <td>
       Ubuntu Epiphany 3.18
    </td>

    <td>
       Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/602.1 (KHTML, like Gecko) Version/8.0 Safari/602.1 Ubuntu/16.04 (3.18.5-0ubuntu1) Epiphany/3.18.5
     </td>
</tr>


<tr>
    <td>
       Ubuntu Firefox 40.0
    </td>

    <td>
         Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36
     </td>
</tr>


<tr>
    <td>
       Ubuntu Chromium 53.0.2785.143
    </td>

    <td>
        (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36
    </td>
</tr>

</table>




















