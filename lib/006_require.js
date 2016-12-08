
var requirememo = {};



function __require(modulename) {
    if (__isnodejs()) {
        if (requirememo[modulename]) {
            return requirememo[modulename];
        }
        defaultLoggerInstance.info(modulename);
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

            }
        }
    }
    console.log('[usage in this context not implemented for requirement ' + modulename + ']');
    return {}
}


