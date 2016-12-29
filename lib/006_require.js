
var requirememo = {};



function __require(modulename) {
    if (env_isNodejs) {
        if (requirememo[modulename]) {
            return requirememo[modulename];
        }
        logger_defaultInstance.info(modulename);
        requirememo[modulename] = require(modulename);
        return requirememo[modulename];
    }


    if(modulename === 'fs'){
        return {
            existsSync: function () {
                return false;
            },
            mkdirSync: function () {
                return false;
            },
            writeFileSync: function () {

            },
            readFileSync: function () {
                
            }
        }
    }
    console.log('[usage in this context not implemented for requirement ' + modulename + ']');
    return {}
}


