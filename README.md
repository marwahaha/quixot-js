<h1>quixot-js</h1>


<h3><code>Logger</code></h3>

<h4><code>setURLAccessKey(name)</code></h4>
<h5>set the value for accessing logger configuration from URL.
If is set to <code>false</code>, no configuartion can
be changed by using URL parameters</h5>
<ul> Params:
    <li> [name {String} required, the key name] </li>
</ul>

Usage:
<pre>
/*
this will allow you to put the following query param into url:
http://localhost/mypage?customKey={"ALL":{"consoleAppender":true}}
*/
quixot.Logger.setURLAccessKey('customKey');
</pre>



<h4><code>getInstance(name, config, callback)</code></h4>
<h5 href="#logInstance">returns a new logger instance </h5>

<ul> Params:
    <li> [name {String} required, the name of the instance] </li>
    <li> [config {Object} optional] - configuration data, default will be <code>defaultConfig</code> </li>
</ul>

Usage:
<pre>
  var myLogger = quixot.Logger.getInstance('TestLogger');
</pre>



<h4 id="logInstance"><code>LogInstance {private access}</code></h4>
Usage:
<pre>
    myLogger.log('info', 'some message');
    myLogger.error('error occured');     /* myLogger.log('error', 'error occured'); */
    myLogger.info('info data');          /* myLogger.log('info', 'info data'); */
    quixot.Logger.warn('warning');       /* quixot.Logger.getInstance('quixot').log('warn', '111111') */
    quixot.Logger.trace('bla-bla-bla');   /*quixot.Logger.getInstance('quixot').log('warn', '111111')*/
</pre>


<h5>realtime browser customer support (use case sample)</h5>
1. Create a urlAccessKey:
<pre>quixot.Logger.setURLAccessKey('mySecretKey');</pre>
2. Create a logger instance with no appenders and use it in your webpage:
<pre>
  var log4CustomerSupport = quixot.Logger.getInstance('log4CustomerSupport', {consoleAppender: false, fileAppender: false});
  log4CustomerSupport.trace('this log happens client side');
  log4CustomerSupport.trace('and client could see stored data');
  log4CustomerSupport.trace('by calling in console');
  log4CustomerSupport.trace('quixot.Logger.getInstance(\'log4CustomerSupport\').getLogs().trace');
</pre>
3. ask your customer to access the webpage using the following query param:
<code> http://domain/custompage?mySecretKey={"log4CustomerSupport":{"fileAppender":true}}</code>
to view all logs of that specific logger or <code>mySecretKey={"log4CustomerSupport":{"info": {"fileAppender":true}} }</code>
to display on screen only info messages for <code>log4CustomerSupport</code>
or <code>mySecretKey={"ALL":{"fileAppender":true}}</code> to view all logs

<h3><code>Util</code></h3>
<h4><code>atos(data, String)</code></h4>
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
<h4><code>incr(asfloat)</code></h4>
<h5>increments an unique number</h5>
<ul> Params:
    <li> [asfloat {Boolean} optional] </li>
</ul>
Usage:
<pre>
    quixot.Util.incr(true); /*30.07000000000001*/
    quixot.Util.incr();     /*31*/
</pre>


<h3><code>Fingerprint</code></h3>
<h4>main purpose of <code>fingerprint</code> instance is to provide an unique identifier for a given operating system/browser</h4>
<ul> Methods:
    <li> <code>data()</code>       - returns the full scanned properties </li>
    <li> <code>text()</code>       - returns the text to compose the fingerprint</li>
    <li> <code>numbers()</code>    - returns numbers from text() </li>
    <li> <code>identifier()</code> - returns the unique identifier </li>
</ul>

<h5>browser scanned features</h5>
<ul>
    <li>
         abreviated time zone
    </li>
    <li>
        unsupported javascript engine features, like Object.keys
    </li>
    <li>
        <code>Math</code> functions and constants (<code>imul</code> support match only for newer browsers)
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
        the <code> evilUtors </code>  are a set of evaluable strings meant to return sensitive information
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




















