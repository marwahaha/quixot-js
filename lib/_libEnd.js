
return {
    /**
     * @namespace Fingerprint
     * @memberof quixot
     */
    Fingerprint: {
        /**
         *
         * @method data
         * @memberof quixot.Fingerprint
         * @returns {Object} the full scanned properties
         */
        data: getFingerPrintData,
        /**
         *  @method identifier
         *  @memberof quixot.Fingerprint
         *  @returns {String} The unique fingerprint identifier
         */
        identifier: getFingerprintIdentifier,

        /**
         * @memberof quixot.Fingerprint
         * @method text
         * @returns {String} the text to compose the identifier
         */
        text: getFingerPrintText,
        /**
         * @method numbers
         * @memberof quixot.Fingerprint
         * @returns {String} the numbers from text()
         */
        numbers: getFingerprintNumbers
    },

    /**
     * @namespace Event
     * @memberof quixot
     */
    Event: {
        /**
         *  @property {String}
         *  @memberof quixot.Event
         */
        APPOINTMENT_DONE: 'quixot_event_appointment_done',
        /**
         * @method dispatch
         * @memberof quixot.Event
         * @param name {String} required
         * @returns {Number} -1 if error occurs, 0 if no event is registered, > 0 as length of
         *                   registered events for specified name
         */
        dispatch: dispatch,
        /**
         * check if a provided listener exist
         * @memberof quixot.Event
         * @param eventName required
         * @param uidName optional, if provided when listener was added
         * @returns {Boolean} true if the listener exist
         */
        hasListener: hasEventListener,

        /**
         * register an event listener
         * @memberof quixot.Event
         * @param eventName {String} required
         * @param callback {Function} required
         * @param uidName {String} an optional unique identifier for the method,
         * to be used when removing the event handler
         * @example
         * quixot.addEventListener('whenMyJobIsCompleted', function(){
             *      console.log('finished');
             * }, 'myUniqeId');
         * @returns {Object} The current registered event listeners
         */
        addListener: addEventListener,

        /**
         * remove a registered event listener
         * @memberof quixot.Event
         * @param eventName {String} name of the event to be removed
         * @param uidName {String} optional. If not provided default function to string will be used
         * @returns {boolean}
         */
        removeListener: removeEventListener,
        /**
         * retrieve all registered events and dispacthers
         * @memberof quixot.Event
         * @returns {Object}
         */
        getAll: getAllEvents,

        /**
         * appoint a method. It uses animationFrame or setTimeout, or direct call if none of the
         * above exists
         * @memberof quixot.Event
         * @param callback {Function} required
         * @param delay  {Number} optional, used only for setTimeout
         * @returns {Object}
         */
        appoint: requestAnimationFrame,


        /**
         * @memberof quixot.Event
         * @param id required
         * @returns {Boolean} false if "id" is not provided
         */
        dropAppoint: removeAnimationFrame
    },
    /**
     * @namespace URL
     * @memberof quixot
     */
    URL: {
        /**
         * retrieve the parameters from a given url
         * @memberof quixot.URL
         * @param url
         * @returns {Object}
         * @example
         * quixot.URL.getParams("test.html?one=1&two=2")
         * //returns Object {one: 1, two: 2}
         * // same as:
         * quixot.URL.decode("test.html?one=1&two=2").params
         */
        getParams: url_get_params,
        getDomainFromUrl: url_getDomainFromUrl,
        currentDomain: url_currentDomain,
        /**
         * converts an object to a url query model
         * @memberof quixot.URL
         * @param object
         * @returns {String}
         */
        querify: url_querify,
        decode: url_decode,
        /**
         * @memberof quixot.URL
         * @returns {String} current path name, as defined by window.location.pathname
         */
        currentPath: url_current_path,
        /**
         * @memberof quixot.URL
         * @returns {String} current search name, as defined by window.location.search
         */
        currentSearch: url_current_search,
        currentParams: url_current_params
    },

    /**
     * @namespace Logger
     * @memberof quixot
     * @example
     *   var myLogger = quixot.Logger.getInstance('TestLogger');
     *   myLogger.log('info', 'some message');
     *   myLogger.error('error occured');     //produces the same as
     *   myLogger.log('error', 'error occured');
     *   myLogger.info('info data');          //produces the same as
     *   myLogger.log('info', 'info data');
     *   quixot.Logger.warn('warning');        //produces the same as
     *   quixot.Logger.getInstance('quixot').log('warn', '111111');
     *   quixot.Logger.trace('bla-bla-bla');   ///produces the same as
     *   quixot.Logger.getInstance('quixot').log('warn', '111111');
     */
    Logger : {
            /**
             * @memberof quixot.Logger
             * @param message
             */
            info: function (message) {
                defaultLoggerInstance.log('info', message);
            },
            /**
             * @memberof quixot.Logger
             * @param object
             */
            setDefaultConfig: function(object) {
                for(var i in object) {
                    logger_defaultConfiguration[i] = object[i];
                }
            },
            /**
             * @memberof quixot.Logger
             * @returns {Object} logger_defaultConfiguration
             */
            getDefaultConfig: function () {
                return logger_defaultConfiguration;
            },
            /**
             * @memberof quixot.Logger
             * @param message
             */
            trace: function (message) {
                defaultLoggerInstance.trace(message);
            },
            /**
             * @memberof quixot.Logger
             * @param message
             */
            error: function(message){
                defaultLoggerInstance.log('error', message);
            },
            /**
             * @memberof quixot.Logger
             * @param message {String}
             */
            warn: function (message) {
                defaultLoggerInstance.warn(message);
            },
            /**
             * @memberof quixot.Logger
             * @returns {Object} default instance logs
             */
            getLogs: function () {
                return defaultLoggerInstance.getLogs();
            },
            /**
             * @memberof quixot.Logger
             * @returns {Object} the logger_container with all logging instances
             */
            getAll: logger_getContainer,
            /**
             * returns a new logger instance
             * @memberof quixot.Logger
             * @param instancename {String} required
             * @param config {Object} logger configuration
             * @returns {Object} the logger_container with all the logger instances
             * @example
             * var myLogger = quixot.Logger.getInstance('TestLogger');
             */
            getInstance: logger_getInstance,
            /**
             * set the value for accessing logger configuration from URL.
             * If is set to ``` false```, no configuartion can
             * be changed by using URL parameters
             * @memberof quixot.Logger
             * @param name {String} required
             * @example
             * //this will allow you to put the following query param into url:
             * //http://localhost/mypage?customKey={"ALL":{"consoleAppender":true}}
             * quixot.Logger.setURLAccessKey('customKey');
             */
            setURLAccessKey: logger_setoptkey
    },
    /**
     * @namespace Cookie
     * @memberof quixot
     */
    Cookie: {
        /**
         * @memberof quixot.Cookie
         * @param name
         * @returns {String}
         */
        getc: getCookie,

        /**
         * create a new cookie
         * @memberof quixot.Cookie
         * @param name
         * @param value
         * @param p_expires
         * @param p_path
         * @param p_domain
         * @param p_secure
         * @returns {string}
         */
        setc: setCookie,

        /**
         * delete cookie
         * @memberof quixot.Cookie
         * @param name
         * @param p_path
         * @param p_domain
         */
        drop: deleteCookie
    },

    /**
     * @namespace Util
     * @memberof quixot
     */
    Util: {
        /**
         * encode any type of javascript data type (specially numbers) to string
         * @method atos
         * @memberof quixot.Util
         * @param data {Number|String|Date|Object|Array|Function} required
         * @param mapping {String} optional a string whose characters will be used for encoding
         * @param zval {Number} the value for 0, used for encoding duplicated numeric characters
         * @returns {String}
         * @example
         *  quixot.atos(123456789); // "mdefghij"
         *  quixot.atos(000000); // "a"
         *  quixot.atos('000000'); // "abcdef"
         *  quixot.atos('000000', '!@#$%^&*()+='); // "!@#$%^"
         */
        atos: numberToString,
        stringToHex: stringToHex,
        rgbToHex: rgbToHex,
        rgbToHexShift: rgbToHexShift,
        serialize: serialize,
        simplify: simplify,
        isPrimitive: isPrimitive,
        isFunction: isFunction,
        objKeys: objKeys,
        isArray: isArray,
        encodeObject: encodeObject,
        stringify: stringify,
        /**
         * increments an unique number (old value is cached)
         * @memberof quixot.Util
         * @param asfloat {Boolean} optional
         * @returns {Number} positive integer
         * @example
         * quixot.Util.incr(true); // 30.07000000000001
         * quixot.Util.incr();    // 31
         */
        incr: function (asfloat) {},
        /**
         * if no parameters are provided a quixot.Util.incr() value will be returned
         * @memberof quixot.Util
         * @param min limit range if "max" is not provided
         * @param max limit range
         * @returns {Number} as float
         * @example
         * quixot.Util.randNr(3); // will generate numbers betwen 0 and 3, like 0.6573690931544247
         * quixot.Util.randNr(2, 4); // will generate numbers betwen 2 and 4, like 2.3124963172024833
         * quixot.Util.randNr(-5); // will generate numbers betwen -5 and 0, like -4.3664502906423195
         */
        randNr: function (min, max) {}
    },
    /**
     * supports browser && nodejs
     * @module Cache
     * @namespace Cache
     * @memberof quixot
     */
    Cache: {
            getInstance: getCacheInstance,

            /**
             * put item in cache
             * @memberof quixot.Cache
             * @param key
             * @param value
             */
            put: function (key, value) {
                domainCacheInstance.put(key, value)
            },

            remove: function (key) {
                domainCacheInstance.remove(key);
            },

            getData: function () {
                return  domainCacheInstance.getData()
            },

            getSafe: function (propname, defaultvalue) {
                return  domainCacheInstance.getSafe(propname, defaultvalue)
            }
    },
    /**
     * contains data related to enviroment:
     * @namespace Env
     * @memberof quixot
     * @example
     * quixot.Env.jsEngine.isBrowser; //true if script is running in browser
     * quixot.Env.jsEngine.isNodeJs;  //true if script is running in node js
     * quixot.Env.javaEnabled;        //true if java is enabled in browser,
     *                                             // or if a path to JAVA_HOME exist is operating system enviroment
     * quixot.Env.tempDir             //path to operating system temporary directory
     * quixot.Env.homeDir             //path to operating system user home directory
     * quixot.Env.javaPath            //path to java binary (java.exe || java)
     */
    Env: envData,

    /**
     * system information (browser|nodejs)
     * @namespace System
     * @memberof quixot
     */
    System: {

        battery: system_battery,
        screen: screen_info,

        /**
         * operating system info
         * @memberof quixot.System
         * @namespace os
         * @example
         * quixot.System.os.name; // returns the operating system generic name
                                  // nodejs support is provided via os.type if exists otherwise via
                                  // os.platform. Result may be "Windows|Mac|Linux"
           quixot.System.version  // returns operatinng system version
                                  // result may vary based on scanned features
                                  // browsers will return data based on user agent, nodejs
                                  // or other engines may provide content via 'os.release'
         */
        os: os_info
    },


    Browser: {
        name: browserName,
        version: browserVersion,
        is: getIs(),
        has: getHases(),
        get: getGeetters()
    },

    /**
     * the unit testing namespace
     * @namespace Sancho
     * @memberof quixot
     */
    Sancho : {
         equals: equals,
         hasData: hasData,
         donkey: monkey,
         config: testingCfg
    },

    Tween: Tween,
    Easing: Easing,
    rearrange: rearrangehtml4,
    
    Mingui: {
        notify: function (title, text, picture, lifetime, href) {
            return _html4notification(title, text, picture, lifetime, href);
        }
    },

    /**
     * require safe support: cached node js requirements <br />
     * TODO support for http://requirejs.org/
     * @memberof quixot
     */
    require: __require,
    _performance: getPerformance,
    _getmemodata: function () {
        return memodata;
    },
    _getGL: function(){
        return webGL;
    }
}

})();


if(typeof module !='undefined') {
  module.exports = quixot;
}