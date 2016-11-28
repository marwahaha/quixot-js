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
                 console.log(name + '.'+level + ' '+ data.message, data);
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
    

    /**
     * logi=instanceName||ALL
     * level=level||ALL
     * pattern='%s, %m, %d'
     * appender
     */
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
        info: function (message) {
            defaultInstance.log('info', message);
        },
        setDefaultConfig: function(object) {
            for(var i in object) {
                defaultConfiguration[i] = object[i];
            }
        },
        getDefaultConfig: function () {
            return defaultConfiguration;
        },
        trace: function (message) {
            defaultInstance.trace(message);
        },
        error: function(message){
            defaultInstance.log('error', message);
        },
        warn: function (message) {
            defaultInstance.warn(message);
        },
        getLogs: function () {
            return defaultInstance.getLogs();
        },
        getAll: function(){
          return container;
        },
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
        setURLAccessKey: function (p) {
            logoptskey = p;
        }
    }

})();

