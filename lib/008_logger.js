var logger_defaultConfiguration = {
        appenders: [logger_default_dom_appender, logger_default_console_appender],
        logStack: true
    },
    logger_options_key = 'logopts';


    function logger_default_dom_appender(n, l, d) {
        if(!env_isBrowser){
            return;
        }
        var v, i= 'qfa', dc = document, r = ' (<i><b>' + n + '</b></i> : ' + d.timestamp + ')';
        v = document_getElementSafe('div', 'qfa', {
            border: '1px solid black',
            margin : '2%',
            padding : '1%'
        }, '<button onclick="document.getElementById(\''+i+'\').style.display=\'none\'">close</button>');
        var t = '<span style="display:block;color:';
        switch (l){
            case 'warn':
                t+='orange';
                break;
            case 'error':
                t+='red';
                r+='<span style="display: block;">'+d.stack.join('<br />') + '</span>';
                break;
            case 'info':
                t+='green';
                break;

            default:
                t+='black';
        }
        t+='"> <b style="margin-right: 2px">' + json_stringify(d.message) + '</b>' + r + '</span>';
        v.innerHTML += t;
    }


    function logger_default_console_appender(name, level, data) {
        if(!env_isBrowser){
            console.log(' [ ' + name + '.'+level + ' '+ json_stringify(data.message) + ' ]');
            return;
        }

        if(level === 'error'){
            console.error(name + '.'+level , data.message, data.timestamp);
        }
        else if(level === 'warn'){
            console.warn(name + '.'+level , data.message, data.timestamp);
        }
        else {
            console.log(name + '.'+level , data.message, data.timestamp);
        }

    }




    

    function logger_getConfigFromUrl() {
        if(logger_options_key){
            return url_current_params()[logger_options_key];

        }
        return r;
    }

    function logger_getStack(pe) {
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


    function LogInstance(name, _configuration) {
        var sessionLogs = {};

        var urlConfig = logger_getConfigFromUrl();

        if(urlConfig){
            console.log(urlConfig);
            var _local_data = urlConfig[name] || urlConfig['ALL'];

            if(_local_data){
                if(_local_data.consoleAppender){
                    _configuration.appenders.push(logger_default_console_appender);
                }
                if(_local_data.fileAppender && env_isBrowser){
                    _configuration.appenders.push(logger_default_dom_appender);
                }
            }

        }



        

        function log(level, message) {

            var localConfig;
            if(_configuration[level]){
                _localConfiguration = _configuration[level];
            } else {
                _localConfiguration = _configuration;
            }

            if(!sessionLogs[level]) {
                sessionLogs[level] = [];
            }



            var stackData = false;
            if(message instanceof Error){
                stackData = logger_getStack(message);
            } else if(_configuration.logStack){
                stackData = logger_getStack()
            }

            var chematoru;

            try {
                chematoru = (arguments.callee.caller);
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

            util_array_each(_configuration.appenders, function (i, o) {
                o(name, level, obj)
            });

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
            },
            getConfig: function () {
                return _configuration;
            },
            setConfig: function (p) {
                _configuration = p;
            }
        }
    }


    var logger_defaultInstance = new LogInstance('quixot', logger_defaultConfiguration),
        
    logger_container = {
        'quixot': logger_defaultInstance
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


