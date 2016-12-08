/**
 * @module Logger
 * @namespace Logger
 * @memberof Logger
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



quixot.Logger = (function () {


    var defaultConfiguration = {
         consoleAppender: true,
         consoleFormatter: function (name, level, data) {
             if(level === 'error'){
                 console.error(name + '.'+level + ' '+ data.message, data);
             }
             else if(level === 'warn'){
                 console.warn(name + '.'+level + ' '+ data.message, data);
             }
             else {
                 if(quixot.Env.jsEngine.isBrowser){
                     console.log(name + '.'+level + ' '+ data.message, data);
                 } else {
                     console.log(' [ ' + name + '.'+level + ' '+ data.message + ' ]');
                 }

             }


         },
         fileAppender: true, //TODO for nodejs a model {file: path, level: level}  //  domAppender: false, //{qlog = ?|ALL, level=??|ALL, domPattern: 'String' }

         fileFormatter: function (name, level, data) {
                if(typeof window != 'undefined'){
                    if(window.document&& window.document.body){
                        var div, idn= 'quixotFileAppender';
                        if(document.getElementById(idn)){
                            div = document.getElementById(idn);
                        } else {
                            div = document.createElement('pre');
                            div.id = idn;
                            document.body.appendChild(div);

                        }
                        var txt = name+' '+level+' '+data.timestamp+ ' ' + data.message + '\t' + JSON.stringify(data)+ '\n';
                        div.innerHTML += txt;
                    }
                }
         },

         logStack: true
    }




    var logoptskey = 'logopts';
    

    function getConfigFromUrl() {
        if(logoptskey){
            return quixot.URL.currentData().params[logoptskey];
        }

        return null;
    }


    function LogInstance(name, config) {
        var sessionLogs = {};

        var urlConfig = getConfigFromUrl();

        if(urlConfig){
            var localData = urlConfig[name] || urlConfig['ALL'];

            if(localData){
                for(var i in localData){
                    config[i] = localData[i];
                }
            }

        }



        function getStack(pe) {
            if (pe && pe.stack) {
                return pe.stack.split('\n');
            }
            try {
                throw new Error();
            }
            catch(e) {
                if (e.stack) {
                    return e.stack.split('\n');
                }
            }
        }

        function log(level, message) {

            var localConfig;
            if(config[level]){
                localConfig = config[level];
            } else {
                localConfig = config;
            }

            if(!sessionLogs[level]) {
                sessionLogs[level] = [];
            }



            var stackData = false;
            if(message instanceof Error){
                stackData = getStack(message);
            } else if(config.logStack){
                stackData = getStack()
            }

            var chematoru;

            try {
                chematoru = arguments.callee.caller + '';
            } catch(e) {
                chematoru = e;
            }

            var now = new Date();
            var obj = {
                timestamp: now,
                message: message,
                stack: stackData,
                caller: chematoru
            };
            sessionLogs[level].push(obj);
            
            if(localConfig.consoleAppender) {
                 localConfig.consoleFormatter(name, level, obj);
            }

            if(localConfig.fileAppender){
               localConfig.fileFormatter(name, level, obj);
            }

            return sessionLogs[level];
        }


        function error(message) {
            log('error', message);
        }


        function warn(message) {
            log('warn', message);
        }

        return {
            log: log,
            error: error,
            warn: warn,
            info: function (message) {
                log('info', message);
            },
            trace: function (message) {
                log('trace', message);
            },
            getLogs: function () {
                return sessionLogs;
            }
        }
    }


    var defaultInstance = new LogInstance('quixot', defaultConfiguration);

    var container = {
        'quixot': defaultInstance
    }


    return {
        /**
         * @memberof quixot.Logger
         * @param message
         */
        info: function (message) {
            defaultInstance.log('info', message);
        },
        /**
         * @memberof quixot.Logger
         * @param object
         */
        setDefaultConfig: function(object) {
            for(var i in object) {
                defaultConfiguration[i] = object[i];
            }
        },
        /**
         * @memberof quixot.Logger
         * @returns {Object} defaultConfiguration
         */
        getDefaultConfig: function () {
            return defaultConfiguration;
        },
        /**
         * @memberof quixot.Logger
         * @param message
         */
        trace: function (message) {
            defaultInstance.trace(message);
        },
        /**
         * @memberof quixot.Logger
         * @param message
         */
        error: function(message){
            defaultInstance.log('error', message);
        },
        /**
         * @memberof quixot.Logger
         * @param message {String}
         */
        warn: function (message) {
            defaultInstance.warn(message);
        },
        /**
         * @memberof quixot.Logger
         * @returns {Object} default instance logs
         */
        getLogs: function () {
            return defaultInstance.getLogs();
        },
        /**
         * @memberof quixot.Logger
         * @returns {Object} the container with all logging instances
         */
        getAll: function(){
          return container;
        },
        /**
         * returns a new logger instance
         * @memberof quixot.Logger
         * @param instancename {String} required
         * @param config {Object} logger configuration
         * @returns {Object} the container with all the logger instances
         * @example
         * var myLogger = quixot.Logger.getInstance('TestLogger');
         */
        getInstance: function(instancename, config) {
            var instanceConfig = defaultConfiguration;
            if(config){
                for(var i in config) {
                    instanceConfig[i] = config[i];
                }
            }
            if(!container[instancename]){
                container[instancename] = new LogInstance(instancename, instanceConfig);
            }
            return container[instancename];
        },
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
        setURLAccessKey: function (p) {
            logoptskey = p;
        }
    }

})();

