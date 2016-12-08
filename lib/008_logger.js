





    var logger_defaultConfiguration = {
         consoleAppender: true,
         consoleFormatter: function (name, level, data) {
             if(level === 'error'){
                 console.error(name + '.'+level + ' '+ data.message, data);
             }
             else if(level === 'warn'){
                 console.warn(name + '.'+level + ' '+ data.message, data);
             }
             else {
                 if(__isbrowser()){
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




    var logger_options_key = 'logopts';
    

    function logger_getConfigFromUrl() {
        if(logger_options_key){
            return url_current_params()[logger_options_key];
        }

        return null;
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


    function LogInstance(name, config) {
        var sessionLogs = {};

        var urlConfig = logger_getConfigFromUrl();

        if(urlConfig){
            var localData = urlConfig[name] || urlConfig['ALL'];

            if(localData){
                for(var i in localData){
                    config[i] = localData[i];
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


    var defaultLoggerInstance = new LogInstance('quixot', logger_defaultConfiguration);

    var logger_container = {
        'quixot': defaultLoggerInstance
    };

    function logger_getInstance(instancename, config) {
        var instanceConfig = logger_defaultConfiguration;
        if(config){
            for(var i in config) {
                instanceConfig[i] = config[i];
            }
        }
        if(!logger_container[instancename]){
            logger_container[instancename] = new LogInstance(instancename, instanceConfig);
        }
        return logger_container[instancename];
    }
    

    
    function logger_setoptkey(p) {
        logger_options_key = p;
    }
    
    function logger_getContainer() {
        return logger_container;
    }


