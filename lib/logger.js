quixot.Logger = (function () {



    function LogInstance(name) {

        var sessionLogs = {
            // debug: [],
            // error: [],
            // info: [],
            // trace: [],
            // fine: [],
            // finest: []
        };

        var config = {};

        function getStack() {
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

            if(!level) {
                level = 'info';
            }

            if(!sessionLogs[level]) {
                sessionLogs[level] = [];
            }

            sessionLogs[level].push({
                message: message,
                stack: getStack(),
                caller: arguments.callee.caller
            });


        }


        return {
            log: log,
            getLogs: function () {
                return sessionLogs;
            }
        }


    }


    var defaultInstance = new LogInstance('quixot');
    

    return {
        log: function (level, message) {
                defaultInstance.log(level, message);
        },
        getLogs: function () {
            return defaultInstance.getLogs();
        }
    }

})();

quixot.Logger.log('debug', 'asdasd');