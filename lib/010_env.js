 var envData = {
    jsEngine: {
        isNodeJs: env_isNodejs,
        isBrowser: env_isBrowser
    },
    javaEnabled: false,
    tempDir: '',
    homeDir: false,
    javaPath: false
};

if(typeof process != 'undefined' && process.env){
    for(var i in process.env){
        envData[i] = process.env[i];
        fingerPrintData['process_env' + i] = process.env[i];
    }
    var p = __require('path');
    envData.homeDir = (process.env.HOME || process.env.USERPROFILE);
    envData.tempDir = (process.env.TEMP || process.env.TMP || process.env.APPDATA);

    if(process.env.JRE_HOME){
        envData.javaEnabled = true;
        envData.javaPath = process.env.JRE_HOME + p.sep + 'bin' + p.sep + 'java';
    }
    else if(process.env.JAVA_HOME){
        envData.javaEnabled = true;
        envData.javaPath = process.env.JAVA_HOME + p.sep + 'bin' + p.sep + 'java';
    }


}

if(!envData.homeDir){
    try {
        env.homeDir = __require('os').homedir();
    } catch (e) {}
}

if(!envData.tempDir){
    try {
        env.homeDir = __require('os').tmpdir();
    } catch (e) {}
}



var system_battery = (function () {
    if(typeof navigator != 'undefined') {
        return navigator.battery || navigator.webkitBattery || navigator.mozBattery || {};
    }
    return false;
})(),

screen_info = (function () {

    var width, height, availWidth, availHeight, colorDepth, pixelDepth;
            if (browser_window.screen) {
                if(browser_window.screen.width) {
                    width = browser_window.screen.width;
                }

                if(browser_window.screen.height) {
                    height = browser_window.screen.height;
                }

                if(browser_window.screen.availHeight) {
                    availHeight = browser_window.screen.availHeight;
                }

                if(browser_window.screen.availWidth	) {
                    availWidth = browser_window.screen.availWidth	;
                }

                if(browser_window.screen.colorDepth	) {
                    colorDepth	= browser_window.screen.colorDepth	;
                }

                if(browser_window.screen.pixelDepth	) {
                    pixelDepth	 = browser_window.screen.pixelDepth	;
                }
            }

            return {
                width: width,
                height: height,
                availWidth: availWidth,
                availHeight: availHeight,
                colorDepth: colorDepth,
                pixelDepth: pixelDepth
            }

})(),

os_info = (function () {
    if(typeof process != 'undefined'){
        var isWin = /^win/.test(process.platform + '');
        if(isWin && envData.javaPath){
            envData.javaPath += '.exe';
        }
    }

    if(env_isNodejs){

        var nos = __require('os');
        console.log(nos);
        return {
            name: ( nos.type ? nos.type() : ( nos.platform ? nos.platform() : '') ),
            version: (nos.release ? nos.release() : '')
        }
    }
    return {}
})();

