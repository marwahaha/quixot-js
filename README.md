#quixot-js
######the missing javascript library

[![N|Solid](https://raw.githubusercontent.com/alex2stf/quixot-js/master/dali_quixote_great_expectations.png)](https://github.com/alex2stf?tab=repositories)

*quixot.js mission is to provide a set of stable cross-platform and cross-engine features*



<a name="quixot"></a>

## quixot : <code>object</code>
**Kind**: global namespace

* [quixot](#quixot) : <code>object</code>
    * [.require](#quixot.require)
    * [.Inject](#quixot.Inject) : <code>object</code>
        * [.js](#quixot.Inject.js) ⇒ <code>Object</code>
        * [.css](#quixot.Inject.css) ⇒ <code>Object</code>
    * [.Fingerprint](#quixot.Fingerprint) : <code>object</code>
        * [.data()](#quixot.Fingerprint.data) ⇒ <code>Object</code>
        * [.identifier()](#quixot.Fingerprint.identifier) ⇒ <code>String</code>
        * [.text()](#quixot.Fingerprint.text) ⇒ <code>String</code>
        * [.numbers()](#quixot.Fingerprint.numbers) ⇒ <code>String</code>
    * [.Event](#quixot.Event) : <code>object</code>
        * [.APPOINTMENT_DONE](#quixot.Event.APPOINTMENT_DONE)
        * [.hasListener](#quixot.Event.hasListener) ⇒ <code>Boolean</code>
        * [.addListener](#quixot.Event.addListener) ⇒ <code>Object</code>
        * [.removeListener](#quixot.Event.removeListener) ⇒ <code>boolean</code>
        * [.getAll](#quixot.Event.getAll) ⇒ <code>Object</code>
        * [.appoint](#quixot.Event.appoint) ⇒ <code>Object</code>
        * [.dropAppoint](#quixot.Event.dropAppoint) ⇒ <code>Boolean</code>
        * [.dispatch(name)](#quixot.Event.dispatch) ⇒ <code>Number</code>
    * [.URL](#quixot.URL) : <code>object</code>
        * [.getParams](#quixot.URL.getParams) ⇒ <code>Object</code>
        * [.querify](#quixot.URL.querify) ⇒ <code>String</code>
        * [.currentPath](#quixot.URL.currentPath) ⇒ <code>String</code>
        * [.currentSearch](#quixot.URL.currentSearch) ⇒ <code>String</code>
    * [.Logger](#quixot.Logger) : <code>object</code>
        * [.getAll](#quixot.Logger.getAll) ⇒ <code>Object</code>
        * [.getInstance](#quixot.Logger.getInstance) ⇒ <code>Object</code>
        * [.setURLAccessKey](#quixot.Logger.setURLAccessKey)
        * [.info(message)](#quixot.Logger.info)
        * [.setDefaultConfig(object)](#quixot.Logger.setDefaultConfig)
        * [.getDefaultConfig()](#quixot.Logger.getDefaultConfig) ⇒ <code>Object</code>
        * [.trace(message)](#quixot.Logger.trace)
        * [.error(message)](#quixot.Logger.error)
        * [.warn(message)](#quixot.Logger.warn)
        * [.getLogs()](#quixot.Logger.getLogs) ⇒ <code>Object</code>
    * [.Cookie](#quixot.Cookie) : <code>object</code>
        * [.getc](#quixot.Cookie.getc) ⇒ <code>String</code>
        * [.setc](#quixot.Cookie.setc) ⇒ <code>string</code>
        * [.drop](#quixot.Cookie.drop)
    * [.Util](#quixot.Util) : <code>object</code>
        * [.atos(data, mapping, zval)](#quixot.Util.atos) ⇒ <code>String</code>
        * [.incr(asfloat)](#quixot.Util.incr) ⇒ <code>Number</code>
        * [.randNr(min, max)](#quixot.Util.randNr) ⇒ <code>Number</code>
    * [.Cache](#quixot.Cache) : <code>object</code>
        * [.put(key, value)](#quixot.Cache.put)
    * [.Env](#quixot.Env) : <code>object</code>
    * [.System](#quixot.System) : <code>object</code>
        * [.os](#quixot.System.os) : <code>object</code>
    * [.Sancho](#quixot.Sancho) : <code>object</code>

<a name="quixot.require"></a>

### quixot.require
require safe support: cached node js requirements <br />
TODO support for http://requirejs.org/

**Kind**: static property of <code>[quixot](#quixot)</code>
<a name="quixot.Inject"></a>

### quixot.Inject : <code>object</code>
**Kind**: static namespace of <code>[quixot](#quixot)</code>

* [.Inject](#quixot.Inject) : <code>object</code>
    * [.js](#quixot.Inject.js) ⇒ <code>Object</code>
    * [.css](#quixot.Inject.css) ⇒ <code>Object</code>

<a name="quixot.Inject.js"></a>

#### Inject.js ⇒ <code>Object</code>
Method to insert a javascript tag using a src

**Kind**: static property of <code>[Inject](#quixot.Inject)</code>
**Returns**: <code>Object</code> - an object with 2 properties:
'script' = the inserted script object, and 'root' = the container

| Param | Type | Description |
| --- | --- | --- |
| scriptSource | <code>String</code> | script source file |
| callback | <code>Method</code> | the callback function |
| toBottom | <code>Boolean</code> | if true, first it will check for body then for head |

<a name="quixot.Inject.css"></a>

#### Inject.css ⇒ <code>Object</code>
**Kind**: static property of <code>[Inject](#quixot.Inject)</code>
**Returns**: <code>Object</code> - an object with 2 properties:
'script' = the inserted css object, and 'root' = the container

| Param | Type | Description |
| --- | --- | --- |
| cssPath | <code>String</code> | path to css |
| callback | <code>Method</code> | function to call when css is loaded |

<a name="quixot.Fingerprint"></a>

### quixot.Fingerprint : <code>object</code>
**Kind**: static namespace of <code>[quixot](#quixot)</code>

* [.Fingerprint](#quixot.Fingerprint) : <code>object</code>
    * [.data()](#quixot.Fingerprint.data) ⇒ <code>Object</code>
    * [.identifier()](#quixot.Fingerprint.identifier) ⇒ <code>String</code>
    * [.text()](#quixot.Fingerprint.text) ⇒ <code>String</code>
    * [.numbers()](#quixot.Fingerprint.numbers) ⇒ <code>String</code>

<a name="quixot.Fingerprint.data"></a>

#### Fingerprint.data() ⇒ <code>Object</code>
**Kind**: static method of <code>[Fingerprint](#quixot.Fingerprint)</code>
**Returns**: <code>Object</code> - the full scanned properties
<a name="quixot.Fingerprint.identifier"></a>

#### Fingerprint.identifier() ⇒ <code>String</code>
**Kind**: static method of <code>[Fingerprint](#quixot.Fingerprint)</code>
**Returns**: <code>String</code> - The unique fingerprint identifier
<a name="quixot.Fingerprint.text"></a>

#### Fingerprint.text() ⇒ <code>String</code>
**Kind**: static method of <code>[Fingerprint](#quixot.Fingerprint)</code>
**Returns**: <code>String</code> - the text to compose the identifier
<a name="quixot.Fingerprint.numbers"></a>

#### Fingerprint.numbers() ⇒ <code>String</code>
**Kind**: static method of <code>[Fingerprint](#quixot.Fingerprint)</code>
**Returns**: <code>String</code> - the numbers from text()
<a name="quixot.Event"></a>

### quixot.Event : <code>object</code>
**Kind**: static namespace of <code>[quixot](#quixot)</code>

* [.Event](#quixot.Event) : <code>object</code>
    * [.APPOINTMENT_DONE](#quixot.Event.APPOINTMENT_DONE)
    * [.hasListener](#quixot.Event.hasListener) ⇒ <code>Boolean</code>
    * [.addListener](#quixot.Event.addListener) ⇒ <code>Object</code>
    * [.removeListener](#quixot.Event.removeListener) ⇒ <code>boolean</code>
    * [.getAll](#quixot.Event.getAll) ⇒ <code>Object</code>
    * [.appoint](#quixot.Event.appoint) ⇒ <code>Object</code>
    * [.dropAppoint](#quixot.Event.dropAppoint) ⇒ <code>Boolean</code>
    * [.dispatch(name)](#quixot.Event.dispatch) ⇒ <code>Number</code>

<a name="quixot.Event.APPOINTMENT_DONE"></a>

#### Event.APPOINTMENT_DONE
**Kind**: static property of <code>[Event](#quixot.Event)</code>
**Properties**

| Type |
| --- |
| <code>String</code> |

<a name="quixot.Event.hasListener"></a>

#### Event.hasListener ⇒ <code>Boolean</code>
check if a provided listener exist

**Kind**: static property of <code>[Event](#quixot.Event)</code>
**Returns**: <code>Boolean</code> - true if the listener exist

| Param | Description |
| --- | --- |
| eventName | required |
| uidName | optional, if provided when listener was added |

<a name="quixot.Event.addListener"></a>

#### Event.addListener ⇒ <code>Object</code>
register an event listener

**Kind**: static property of <code>[Event](#quixot.Event)</code>
**Returns**: <code>Object</code> - The current registered event listeners

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | required |
| callback | <code>function</code> | required |
| uidName | <code>String</code> | an optional unique identifier for the method, to be used when removing the event handler |

**Example**
```js
quixot.addEventListener('whenMyJobIsCompleted', function(){
     console.log('finished');
}, 'myUniqeId');
```
<a name="quixot.Event.removeListener"></a>

#### Event.removeListener ⇒ <code>boolean</code>
remove a registered event listener

**Kind**: static property of <code>[Event](#quixot.Event)</code>

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | name of the event to be removed |
| uidName | <code>String</code> | optional. If not provided default function to string will be used |

<a name="quixot.Event.getAll"></a>

#### Event.getAll ⇒ <code>Object</code>
retrieve all registered events and dispacthers

**Kind**: static property of <code>[Event](#quixot.Event)</code>
<a name="quixot.Event.appoint"></a>

#### Event.appoint ⇒ <code>Object</code>
appoint a method. It uses animationFrame or setTimeout, or direct call if none of the
above exists

**Kind**: static property of <code>[Event](#quixot.Event)</code>

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | required |
| delay | <code>Number</code> | optional, used only for setTimeout |

<a name="quixot.Event.dropAppoint"></a>

#### Event.dropAppoint ⇒ <code>Boolean</code>
**Kind**: static property of <code>[Event](#quixot.Event)</code>
**Returns**: <code>Boolean</code> - false if "id" is not provided

| Param | Description |
| --- | --- |
| id | required |

<a name="quixot.Event.dispatch"></a>

#### Event.dispatch(name) ⇒ <code>Number</code>
**Kind**: static method of <code>[Event](#quixot.Event)</code>
**Returns**: <code>Number</code> - -1 if error occurs, 0 if no event is registered, > 0 as length of
                  registered events for specified name

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | required |

<a name="quixot.URL"></a>

### quixot.URL : <code>object</code>
**Kind**: static namespace of <code>[quixot](#quixot)</code>

* [.URL](#quixot.URL) : <code>object</code>
    * [.getParams](#quixot.URL.getParams) ⇒ <code>Object</code>
    * [.querify](#quixot.URL.querify) ⇒ <code>String</code>
    * [.currentPath](#quixot.URL.currentPath) ⇒ <code>String</code>
    * [.currentSearch](#quixot.URL.currentSearch) ⇒ <code>String</code>

<a name="quixot.URL.getParams"></a>

#### URL.getParams ⇒ <code>Object</code>
retrieve the parameters from a given url

**Kind**: static property of <code>[URL](#quixot.URL)</code>

| Param |
| --- |
| url |

**Example**
```js
quixot.URL.getParams("test.html?one=1&two=2")
//returns Object {one: 1, two: 2}
// same as:
quixot.URL.decode("test.html?one=1&two=2").params
```
<a name="quixot.URL.querify"></a>

#### URL.querify ⇒ <code>String</code>
converts an object to a url query model

**Kind**: static property of <code>[URL](#quixot.URL)</code>

| Param |
| --- |
| object |

<a name="quixot.URL.currentPath"></a>

#### URL.currentPath ⇒ <code>String</code>
**Kind**: static property of <code>[URL](#quixot.URL)</code>
**Returns**: <code>String</code> - current path name, as defined by window.location.pathname
<a name="quixot.URL.currentSearch"></a>

#### URL.currentSearch ⇒ <code>String</code>
**Kind**: static property of <code>[URL](#quixot.URL)</code>
**Returns**: <code>String</code> - current search name, as defined by window.location.search
<a name="quixot.Logger"></a>

### quixot.Logger : <code>object</code>
**Kind**: static namespace of <code>[quixot](#quixot)</code>
**Example**
```js
var myLogger = quixot.Logger.getInstance('TestLogger');
  myLogger.log('info', 'some message');
  myLogger.error('error occured');     //produces the same as
  myLogger.log('error', 'error occured');
  myLogger.info('info data');          //produces the same as
  myLogger.log('info', 'info data');
  quixot.Logger.warn('warning');        //produces the same as
  quixot.Logger.getInstance('quixot').log('warn', '111111');
  quixot.Logger.trace('bla-bla-bla');   ///produces the same as
  quixot.Logger.getInstance('quixot').log('warn', '111111');
```

* [.Logger](#quixot.Logger) : <code>object</code>
    * [.getAll](#quixot.Logger.getAll) ⇒ <code>Object</code>
    * [.getInstance](#quixot.Logger.getInstance) ⇒ <code>Object</code>
    * [.setURLAccessKey](#quixot.Logger.setURLAccessKey)
    * [.info(message)](#quixot.Logger.info)
    * [.setDefaultConfig(object)](#quixot.Logger.setDefaultConfig)
    * [.getDefaultConfig()](#quixot.Logger.getDefaultConfig) ⇒ <code>Object</code>
    * [.trace(message)](#quixot.Logger.trace)
    * [.error(message)](#quixot.Logger.error)
    * [.warn(message)](#quixot.Logger.warn)
    * [.getLogs()](#quixot.Logger.getLogs) ⇒ <code>Object</code>

<a name="quixot.Logger.getAll"></a>

#### Logger.getAll ⇒ <code>Object</code>
**Kind**: static property of <code>[Logger](#quixot.Logger)</code>
**Returns**: <code>Object</code> - the logger_container with all logging instances
<a name="quixot.Logger.getInstance"></a>

#### Logger.getInstance ⇒ <code>Object</code>
returns a new logger instance

**Kind**: static property of <code>[Logger](#quixot.Logger)</code>
**Returns**: <code>Object</code> - the logger_container with all the logger instances

| Param | Type | Description |
| --- | --- | --- |
| instancename | <code>String</code> | required |
| config | <code>Object</code> | logger configuration |

**Example**
```js
var myLogger = quixot.Logger.getInstance('TestLogger');
```
<a name="quixot.Logger.setURLAccessKey"></a>

#### Logger.setURLAccessKey
set the value for accessing logger configuration from URL.
If is set to ``` false```, no configuartion can
be changed by using URL parameters

**Kind**: static property of <code>[Logger](#quixot.Logger)</code>

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | required |

**Example**
```js
//this will allow you to put the following query param into url:
//http://localhost/mypage?customKey={"ALL":{"consoleAppender":true}}
quixot.Logger.setURLAccessKey('customKey');
```
<a name="quixot.Logger.info"></a>

#### Logger.info(message)
**Kind**: static method of <code>[Logger](#quixot.Logger)</code>

| Param |
| --- |
| message |

<a name="quixot.Logger.setDefaultConfig"></a>

#### Logger.setDefaultConfig(object)
**Kind**: static method of <code>[Logger](#quixot.Logger)</code>

| Param |
| --- |
| object |

<a name="quixot.Logger.getDefaultConfig"></a>

#### Logger.getDefaultConfig() ⇒ <code>Object</code>
**Kind**: static method of <code>[Logger](#quixot.Logger)</code>
**Returns**: <code>Object</code> - logger_defaultConfiguration
<a name="quixot.Logger.trace"></a>

#### Logger.trace(message)
**Kind**: static method of <code>[Logger](#quixot.Logger)</code>

| Param |
| --- |
| message |

<a name="quixot.Logger.error"></a>

#### Logger.error(message)
**Kind**: static method of <code>[Logger](#quixot.Logger)</code>

| Param |
| --- |
| message |

<a name="quixot.Logger.warn"></a>

#### Logger.warn(message)
**Kind**: static method of <code>[Logger](#quixot.Logger)</code>

| Param | Type |
| --- | --- |
| message | <code>String</code> |

<a name="quixot.Logger.getLogs"></a>

#### Logger.getLogs() ⇒ <code>Object</code>
**Kind**: static method of <code>[Logger](#quixot.Logger)</code>
**Returns**: <code>Object</code> - default instance logs
<a name="quixot.Cookie"></a>

### quixot.Cookie : <code>object</code>
**Kind**: static namespace of <code>[quixot](#quixot)</code>

* [.Cookie](#quixot.Cookie) : <code>object</code>
    * [.getc](#quixot.Cookie.getc) ⇒ <code>String</code>
    * [.setc](#quixot.Cookie.setc) ⇒ <code>string</code>
    * [.drop](#quixot.Cookie.drop)

<a name="quixot.Cookie.getc"></a>

#### Cookie.getc ⇒ <code>String</code>
**Kind**: static property of <code>[Cookie](#quixot.Cookie)</code>

| Param |
| --- |
| name |

<a name="quixot.Cookie.setc"></a>

#### Cookie.setc ⇒ <code>string</code>
create a new cookie

**Kind**: static property of <code>[Cookie](#quixot.Cookie)</code>

| Param |
| --- |
| name |
| value |
| p_expires |
| p_path |
| p_domain |
| p_secure |

<a name="quixot.Cookie.drop"></a>

#### Cookie.drop
delete cookie

**Kind**: static property of <code>[Cookie](#quixot.Cookie)</code>

| Param |
| --- |
| name |
| p_path |
| p_domain |

<a name="quixot.Util"></a>

### quixot.Util : <code>object</code>
**Kind**: static namespace of <code>[quixot](#quixot)</code>

* [.Util](#quixot.Util) : <code>object</code>
    * [.atos(data, mapping, zval)](#quixot.Util.atos) ⇒ <code>String</code>
    * [.incr(asfloat)](#quixot.Util.incr) ⇒ <code>Number</code>
    * [.randNr(min, max)](#quixot.Util.randNr) ⇒ <code>Number</code>

<a name="quixot.Util.atos"></a>

#### Util.atos(data, mapping, zval) ⇒ <code>String</code>
encode any type of javascript data type (specially numbers) to string

**Kind**: static method of <code>[Util](#quixot.Util)</code>

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Number</code> &#124; <code>String</code> &#124; <code>Date</code> &#124; <code>Object</code> &#124; <code>Array</code> &#124; <code>function</code> | required |
| mapping | <code>String</code> | optional a string whose characters will be used for encoding |
| zval | <code>Number</code> | the value for 0, used for encoding duplicated numeric characters |

**Example**
```js
quixot.atos(123456789); // "mdefghij"
 quixot.atos(000000); // "a"
 quixot.atos('000000'); // "abcdef"
 quixot.atos('000000', '!@#$%^&*()+='); // "!@#$%^"
```
<a name="quixot.Util.incr"></a>

#### Util.incr(asfloat) ⇒ <code>Number</code>
increments an unique number (old value is cached)

**Kind**: static method of <code>[Util](#quixot.Util)</code>
**Returns**: <code>Number</code> - positive integer

| Param | Type | Description |
| --- | --- | --- |
| asfloat | <code>Boolean</code> | optional |

**Example**
```js
quixot.Util.incr(true); // 30.07000000000001
quixot.Util.incr();    // 31
```
<a name="quixot.Util.randNr"></a>

#### Util.randNr(min, max) ⇒ <code>Number</code>
if no parameters are provided a quixot.Util.incr() value will be returned

**Kind**: static method of <code>[Util](#quixot.Util)</code>
**Returns**: <code>Number</code> - as float

| Param | Description |
| --- | --- |
| min | limit range if "max" is not provided |
| max | limit range |

**Example**
```js
quixot.Util.randNr(3); // will generate numbers betwen 0 and 3, like 0.6573690931544247
quixot.Util.randNr(2, 4); // will generate numbers betwen 2 and 4, like 2.3124963172024833
quixot.Util.randNr(-5); // will generate numbers betwen -5 and 0, like -4.3664502906423195
```
<a name="quixot.Cache"></a>

### quixot.Cache : <code>object</code>
supports browser && nodejs

**Kind**: static namespace of <code>[quixot](#quixot)</code>
<a name="quixot.Cache.put"></a>

#### Cache.put(key, value)
put item in cache

**Kind**: static method of <code>[Cache](#quixot.Cache)</code>

| Param |
| --- |
| key |
| value |

<a name="quixot.Env"></a>

### quixot.Env : <code>object</code>
contains data related to enviroment:

**Kind**: static namespace of <code>[quixot](#quixot)</code>
**Example**
```js
quixot.Env.jsEngine.isBrowser; //true if script is running in browser
quixot.Env.jsEngine.isNodeJs;  //true if script is running in node js
quixot.Env.javaEnabled;        //true if java is enabled in browser,
                                            // or if a path to JAVA_HOME exist is operating system enviroment
quixot.Env.tempDir             //path to operating system temporary directory
quixot.Env.homeDir             //path to operating system user home directory
quixot.Env.javaPath            //path to java binary (java.exe || java)
```
<a name="quixot.System"></a>

### quixot.System : <code>object</code>
system information (browser|nodejs)

**Kind**: static namespace of <code>[quixot](#quixot)</code>
<a name="quixot.System.os"></a>

#### System.os : <code>object</code>
operating system info

**Kind**: static namespace of <code>[System](#quixot.System)</code>
**Example**
```js
quixot.System.os.name; // returns the operating system generic name
                                  // nodejs support is provided via os.type if exists otherwise via
                                  // os.platform. Result may be "Windows|Mac|Linux"
           quixot.System.version  // returns operatinng system version
                                  // result may vary based on scanned features
                                  // browsers will return data based on user agent, nodejs
                                  // or other engines may provide content via 'os.release'
```
<a name="quixot.Sancho"></a>

### quixot.Sancho : <code>object</code>
the unit testing namespace

**Kind**: static namespace of <code>[quixot](#quixot)</code>




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


preview html test page:
http://htmlpreview.github.io/?https://github.com/alex2stf/quixot-js/blob/master/tests.html