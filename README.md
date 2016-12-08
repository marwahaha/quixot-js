#quixot-js
######the missing javascript library

[![N|Solid](https://raw.githubusercontent.com/alex2stf/quixot-js/master/dali_quixote_great_expectations.png)](https://github.com/alex2stf?tab=repositories)

*quixot.js mission is to provide a set of stable cross-platform and cross-engine features*

## Objects

<dl>
<dt><a href="#quixot">quixot</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="quixot_context"></a>

## quixot_context
fixers for any js engine

**Kind**: global variable
<a name="quixot"></a>

## quixot : <code>object</code>
**Kind**: global namespace

* [quixot](#quixot) : <code>object</code>
    * [.require](#quixot.require)
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
        * [.dispatch()](#quixot.Event.dispatch)
        * [.getAll()](#quixot.Event.getAll) ⇒ <code>Object</code>
        * [.appoint(callback, delay)](#quixot.Event.appoint) ⇒ <code>Object</code>
        * [.dropAppoint(id)](#quixot.Event.dropAppoint)
    * [.Util](#quixot.Util) : <code>object</code>
        * [.atos(data, mapping, zval)](#quixot.Util.atos) ⇒ <code>String</code>
        * [.incr(asfloat)](#quixot.Util.incr)
        * [.randNr(min, max)](#quixot.Util.randNr) ⇒ <code>Number</code>
    * [.Env](#quixot.Env) : <code>object</code>
    * [.URL](#quixot.URL) : <code>object</code>
        * [.getParams](#quixot.URL.getParams) ⇒ <code>Object</code>
        * [.querify(object)](#quixot.URL.querify) ⇒ <code>String</code>
        * [.currentPath()](#quixot.URL.currentPath) ⇒ <code>String</code>
    * [.Cookie](#quixot.Cookie) : <code>object</code>
        * [.get](#quixot.Cookie.get) ⇒ <code>String</code>
        * [.set](#quixot.Cookie.set) ⇒ <code>string</code>
        * [.drop](#quixot.Cookie.drop)
    * [.Cache](#quixot.Cache) : <code>object</code>
        * [.put(key, value)](#quixot.Cache.put)
    * [.Sancho](#quixot.Sancho) : <code>object</code>
    * [.Inject](#quixot.Inject) : <code>object</code>
        * [.js](#quixot.Inject.js) ⇒ <code>Object</code>
        * [.css](#quixot.Inject.css) ⇒ <code>Object</code>
    * [.context()](#quixot.context)

<a name="quixot.require"></a>

### quixot.require
require safe support: cached node js requirements <br />
TODO support for http://requirejs.org/

**Kind**: static property of <code>[quixot](#quixot)</code>
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
    * [.dispatch()](#quixot.Event.dispatch)
    * [.getAll()](#quixot.Event.getAll) ⇒ <code>Object</code>
    * [.appoint(callback, delay)](#quixot.Event.appoint) ⇒ <code>Object</code>
    * [.dropAppoint(id)](#quixot.Event.dropAppoint)

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

<a name="quixot.Event.dispatch"></a>

#### Event.dispatch()
**Kind**: static method of <code>[Event](#quixot.Event)</code>
<a name="quixot.Event.getAll"></a>

#### Event.getAll() ⇒ <code>Object</code>
retrieve all registered events and dispacthers

**Kind**: static method of <code>[Event](#quixot.Event)</code>
<a name="quixot.Event.appoint"></a>

#### Event.appoint(callback, delay) ⇒ <code>Object</code>
appoint a method. It uses animationFrame or setTimeout, or direct call if none of the
above exists

**Kind**: static method of <code>[Event](#quixot.Event)</code>

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | required |
| delay | <code>Number</code> | optional, used only for setTimeout |

<a name="quixot.Event.dropAppoint"></a>

#### Event.dropAppoint(id)
**Kind**: static method of <code>[Event](#quixot.Event)</code>

| Param |
| --- |
| id |

<a name="quixot.Util"></a>

### quixot.Util : <code>object</code>
**Kind**: static namespace of <code>[quixot](#quixot)</code>

* [.Util](#quixot.Util) : <code>object</code>
    * [.atos(data, mapping, zval)](#quixot.Util.atos) ⇒ <code>String</code>
    * [.incr(asfloat)](#quixot.Util.incr)
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

#### Util.incr(asfloat)
increments an unique number (old value is cached)

**Kind**: static method of <code>[Util](#quixot.Util)</code>

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

| Param |
| --- |
| min |
| max |

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
<a name="quixot.URL"></a>

### quixot.URL : <code>object</code>
**Kind**: static namespace of <code>[quixot](#quixot)</code>

* [.URL](#quixot.URL) : <code>object</code>
    * [.getParams](#quixot.URL.getParams) ⇒ <code>Object</code>
    * [.querify(object)](#quixot.URL.querify) ⇒ <code>String</code>
    * [.currentPath()](#quixot.URL.currentPath) ⇒ <code>String</code>

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

#### URL.querify(object) ⇒ <code>String</code>
converts an object to a url query model

**Kind**: static method of <code>[URL](#quixot.URL)</code>

| Param |
| --- |
| object |

<a name="quixot.URL.currentPath"></a>

#### URL.currentPath() ⇒ <code>String</code>
**Kind**: static method of <code>[URL](#quixot.URL)</code>
**Returns**: <code>String</code> - current path name, as defined by window.location.pathname
<a name="quixot.Cookie"></a>

### quixot.Cookie : <code>object</code>
**Kind**: static namespace of <code>[quixot](#quixot)</code>

* [.Cookie](#quixot.Cookie) : <code>object</code>
    * [.get](#quixot.Cookie.get) ⇒ <code>String</code>
    * [.set](#quixot.Cookie.set) ⇒ <code>string</code>
    * [.drop](#quixot.Cookie.drop)

<a name="quixot.Cookie.get"></a>

#### Cookie.get ⇒ <code>String</code>
**Kind**: static property of <code>[Cookie](#quixot.Cookie)</code>

| Param |
| --- |
| name |

<a name="quixot.Cookie.set"></a>

#### Cookie.set ⇒ <code>string</code>
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

<a name="quixot.Sancho"></a>

### quixot.Sancho : <code>object</code>
the unit testing namespace

**Kind**: static namespace of <code>[quixot](#quixot)</code>
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

<a name="quixot.context"></a>

### quixot.context()
returns data related to current context

**Kind**: static method of <code>[quixot](#quixot)</code>



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
