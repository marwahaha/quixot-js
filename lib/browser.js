/**
 * identifiers:
 * error messages
 * @type {{agent, getPerformance, scan, webGL, line, os, name, version}}
 */
Jentil.browser = (function(){

    var operatingSystem, operatingSystemSub, browserName, browserVersion, debugLine = '', idline = '';

    var strType = (typeof 'string') + '',
        nrType = (typeof 2) + '',
        objType = (typeof {}) + '',
        boolType = (typeof true) + '',
        fncType = (typeof function(){}) + '';

    function isPrimitive(d){
        return typeof d === strType || typeof d === nrType || typeof d === boolType;
    }

    function deepScan(object, prefix, skipvalue){
        if(!object) {
            return;
        }
        for(var i in object) {
            idline+='\n'+i + ' ';
            if (isPrimitive(object[i])) {
                debugLine += '\n['+ prefix+ '] ' +i;
                debugLine +='=' + object[i];

                if(!skipvalue) {
                    idline+=object[i];
                }

            } else if(typeof object[i] === fncType) {
                debugLine += '\n['+prefix +'] m:' + i;
            } else  {

                debugLine += '\n['+prefix +' (' + i + ')]';
                debugLine +=':' + Jentil.stringify(object[i]);
                if(!skipvalue) {
                    idline+=Jentil.stringify(object[i])
                }
            }
        }
    }


    /**
     * the order of this list is very important for backward complatibility
     * @type {*[]}
     */
   var dataBrowser = [
        {string: navigator.userAgent, subString: 'iCab', versionSearch: 'iCab', identity: 'iCab'},
        {string: navigator.userAgent, subString: 'rekonq', versionSearch: 'rekonq', identity: 'Rekonq'},
        {string: navigator.userAgent, subString: 'Midori', versionSearch: 'Midori', identity: 'Midori'},
        {string: navigator.userAgent, subString: 'Arora', versionSearch: 'Arora', identity: 'Arora'},
        {string: navigator.userAgent, subString: 'Stainless', versionSearch: 'Stainless', identity: 'Stainless'},
        {string: navigator.userAgent, subString: 'Epiphany',versionSearch: 'Epiphany', identity: 'Epiphany'},
        {string: navigator.userAgent, subString: 'K-Meleon', versionSearch: 'K-Meleon', identity: 'K-Meleon'},
        {string: navigator.vendor, subString: 'Camino', identity: 'Camino'},
        {string: navigator.userAgent, subString: 'Maxthon', versionSearch: 'Maxthon', identity: 'Maxthon'},
        {string: navigator.userAgent, subString: 'SeaMonkey', versionSearch: 'SeaMonkey', identity: 'SeaMonkey'},
        {string: navigator.userAgent, subString: 'Edge', identity: 'Edge', versionSearch: 'Edge'},
        {string: navigator.userAgent, subString: 'Chrome', identity: 'Chrome'},
        {string: navigator.userAgent, subString: 'OmniWeb', versionSearch: 'OmniWeb/', identity: 'OmniWeb'},
        {string: navigator.vendor, subString: 'Apple', identity: 'Safari', versionSearch: 'Version'},
        {prop: window.opera, identity: 'Opera', versionSearch: 'Version'},
        {string: navigator.vendor, subString: 'iCab', identity: 'iCab'},
        {string: navigator.vendor, subString: 'KDE', identity: 'Konqueror'},
        {string: navigator.userAgent, subString: 'Firefox', identity: 'Firefox'},
        {string: navigator.userAgent, subString: 'Netscape', identity: 'Netscape'},
        {string: navigator.userAgent, subString: 'MSIE', identity: 'Explorer', versionSearch: 'MSIE'},
        {string: navigator.userAgent, subString: 'Gecko', identity: 'Mozilla', versionSearch: 'rv'},
        // for older Netscapes (4-)
        {string: navigator.userAgent, subString: 'Mozilla', identity: 'Netscape', versionSearch: 'Mozilla'},

    ];


    var dataOS = [
        {string: navigator.platform, subString: 'Win', identity: 'Windows'},
        {string: navigator.platform, subString: 'Mac', identity: 'Mac'},
        {string: navigator.userAgent, subString: 'iPhone', identity: 'iPhone'},
        {string: navigator.userAgent, subString: 'iPad', identity: 'iPad'},
        {string: navigator.userAgent, subString: 'Android', identity: 'Android'},
        {string: navigator.platform, subString: 'Linux', identity: 'Linux'}
    ];

    
    function getScreenInfo() {
        var r = {};
        if (window && window.screen) {
            if(window.screen.width) {
                r.width = window.screen.width;
            }

            if(window.screen.height) {
                r.height = window.screen.height;
            }

            if(window.screen.availHeight) {
                r.availHeight = window.screen.availHeight;
            }

            if(window.screen.availWidth	) {
                r.availWidth	 = window.screen.availWidth	;
            }

            if(window.screen.colorDepth	) {
                r.colorDepth	 = window.screen.colorDepth	;
            }

            if(window.screen.pixelDepth	) {
                r.pixelDepth	 = window.screen.pixelDepth	;
            }
        }

        return r;
    }

    function getChrome() {
        return window.chrome;
    }

    function getNetscape() {
        return window.netscape;
    }

    function getPerformance(){
        return window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
    }

    function getPlatform() {
        return navigator.platform;
    }

    function getPlugins() {
        return navigator.plugins;
    }

    function getMimeTypes() {
        return navigator.mimeTypes;
    }

    function getAppVersion() {
        return navigator.appVersion;
    }

    function  getBattery() {
        return navigator.battery||navigator.webkitBattery||navigator.mozBattery||{};
    }

    function getNavigator() {
        if(window && window.navigator) {
            return window.navigator;
        }
    }

    function getUserAgent() {
        if(window && window.navigator) {
            return window.navigator.userAgent;
        }
        return '';
    }



    var versionStringToSearch = '';
    function searchString(data) {

        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            // console.log("dataString", dataString);
            // console.log("dataProp", dataProp);
            versionStringToSearch = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1) {
                    return (data[i].identity);
                }
            }
            else if (dataProp) {
                return ( data[i].identity);
            }
        }
    }

		function searchVersion(dataString) {
			console.log("searchVersion in string ", dataString, versionStringToSearch);
			var index = dataString.indexOf(versionStringToSearch);
			if (index === -1) {
				return;
			}
			return parseFloat(dataString.substring(index + versionStringToSearch.length + 1));
		}




        function init(callback) {
            populate();
            if(callback) {
                callback();
            }
        }

        function populate() {
            debugLine = Jentil.timeZoneAbbr + '\n', idline = debugLine;
            debugLine += Jentil.data.ips.join(',') + '\n' + Jentil.data.jseng.nosupport.join(',') + '\n';
            idline+=Jentil.data.ips.join(',') + Jentil.data.jseng.nosupport.join(',') + '\n';;
            operatingSystem = searchString(dataOS) || 'an unknown OS';
            //check for specific linux flavour
            if (operatingSystem === 'Linux') {
                if(getUserAgent().toLowerCase().indexOf('ubuntu')) {
                    operatingSystemSub = 'Ubuntu';
                }
            }

            //check windows version
            if(operatingSystem === 'Windows') {
                if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(getUserAgent())){
                    if (RegExp["$1"] == "NT"){
                        switch(RegExp["$2"]){
                            case "5.0":
                                operatingSystemSub= "2000";
                                break;
                            case "5.1":
                                operatingSystemSub = "XP";
                                break;
                            case "6.0":
                                operatingSystemSub = "Vista";
                                break;
                            default:
                                operatingSystemSub = "NT";
                                break;
                        }
                    } else if (RegExp["$1"] == "9x"){
                        operatingSystemSub = "ME";
                    } else {
                        operatingSystemSub = RegExp["$1"];
                    }
                }
            }

            browserName = searchString(dataBrowser) || 'An unknown browser';
            browserVersion = searchVersion(getUserAgent()) || searchVersion(getAppVersion()) || 'an unknown version';

            //check for ie11 number
            var isAtLeastIE11 = !!(getUserAgent().match(/Trident/) && !getUserAgent().match(/MSIE/));
            if (isAtLeastIE11) {
                browserName = 'Explorer';
                var isIE11 = !!(getUserAgent().match(/Trident/) && getUserAgent().match(/11/));
                if (isIE11) {
                    browserVersion = 11;
                }
            }

            //fix number for some chrome versions and detect chromium
            if (browserName === 'Chrome') {
                if (getUserAgent().toLowerCase().indexOf('chromium') > -1) {
                    browserName = 'Chromium';
                }
                if(browserVersion === 'an unknown version') {
                    var version = getUserAgent() || getAppVersion();
                    version = version.split('Chrome');
                    if (version[1]) {
                        var matches = version[1].match(/\d+/);
                        if (matches[0]) {
                            browserVersion = parseInt(matches[0]);
                        }
                    }
                }
            }

            //get computer name for IE
            var computerName = (function getComputerName() {
                var cname = '[unk]';
                try {
                    var network = new ActiveXObject('WScript.Network');
                    cname = (network.computerName);
                }
                catch (e) {
                    cname = '[err ' + e + ']';
                }
                return cname;
            })();

            var javaEnabled = false;
            if(getNavigator().javaEnabled) {
                try {
                    javaEnabled = getNavigator().javaEnabled();
                } catch (e) {
                    javaEnabled = false;
                }
            }

            debugLine += operatingSystem + '\t\t' + operatingSystemSub + '\t' + browserName + '\t' + browserVersion;
            debugLine += '\n[computerName]:' + computerName;
            idline+=operatingSystem+operatingSystemSub+browserName+browserVersion+computerName;


            deepScan(getScreenInfo(), 'screen');

            deepScan(getNavigator(), 'navigator');

            var mimeTypes = getMimeTypes(), plugins = getPlugins(), performance = getPerformance(), battery=getBattery();;

            deepScan(mimeTypes, 'mimeTypes');
            for(var i in mimeTypes) {
                deepScan(mimeTypes[i], 'mimeTypes_' + i);
            }
            deepScan(plugins, 'plugins');
            for(var i in plugins) {
                deepScan(plugins[i], 'plugins_' + i );
            }
            deepScan(performance, 'performance');
            deepScan(performance.memory, 'memory', true);
            deepScan(performance.timing, 'timing', true); //skip value scan for timing, since will affect the uid generation

            deepScan(battery, 'battery', true); //tested on firefox
            deepScan(getNavigator().serviceWorker, 'serviceWorker', true); //tested on firefox, chrome
            deepScan(getNavigator().mediaDevices, 'mediaDevices'); //tested on firefox, chrome

            deepScan(getChrome(), 'chrome'); //tested on firefox, chrome
            deepScan(getNetscape(), 'netscape'); //tested on firefox, chrome



            //get webGL info
            var gl = webGL();
            if(gl) {

                try {
                    var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info"),
                        a = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
                        debugLine += '\n[gl UNMASKED_RENDERER_WEBGL] ' + a;
                        idline+='\n' + a;

                        b = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
                        debugLine += '\n[gl UNMASKED_VENDOR_WEBGL] ' + b;
                        idline+='\n'+b;

                        c = (gl.getParameter(gl.VERSION));
                        debugLine += '\n[gl VERSION]' +c;
                        idline+='\n'+c;

                        d = (gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
                        debugLine += '\n[gl SHADING_LANGUAGE_VERSION] ' +d;
                        idline+='\n'+d;

                        e = (gl.getParameter(gl.VENDOR));
                        debugLine += '\n[gl VENDOR] ' +e;
                        idline+='\n'+e;

                    console.log(gl);
                } catch (e) {
                    debugLine+='\n[glerr (' + e + ')]';
                    idline+=e+'';
                }
            }

        } //end populate method




        function webGL() {
            try{
                var canvas = document.createElement('canvas');
                return !! window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') );
            }catch(e) {
                Jentil.data.errs.push(e);
                return false;
            }
        };



    function getIs() {

        return {
            iPod: ( getUserAgent().indexOf("iPod") > -1),
            iPhone : ( getUserAgent().indexOf("iPhone") > -1),
            nokiaN :( getUserAgent().indexOf("NokiaN") > -1),
            wii : (getUserAgent().indexOf("Wii") > -1),
            ps: ( /playstation/i.test(getUserAgent()) ),
            xpSP2: (getUserAgent().indexOf('SV1') !== -1),
            iPhoneiPod: ( getUserAgent().match(/iPhone|iPod/i) ),
            iPhoneiPadiPod: ( getUserAgent().match(/iPhone|iPad|iPod/i) ),
            desktop: ( !getUserAgent().match(/iPhone|iPad|android/i) ),
            android: ( getUserAgent().match(/android/i) ),
            winPhone: ( /IEMobile/.test(getUserAgent()) ),
            chromeCRIOS: ( getUserAgent().match(/chrome|crios/i) ),
            iOS: (/iPad|iPhone|iPod/.test(getUserAgent()) && !MSStream  ),
            iPad: ( getUserAgent().match(/iPad/i) ),
            firefox: ( getUserAgent().match(/firefox/i) ),
            phoneDevice:( getUserAgent().match(/iPhone|android/i) ),
            iOS7: ( getUserAgent().match(/.*CPU.*OS 7_\d/i) ),
            iPhoneSafari: ( function(){
                var safari = !!window.safari, iPhone = /iPhone/i.test(navigator.userAgent);
                return !!(iPhone && safari);
            })(),
            tabletAndroidFirefox: (/(?:Android; Tablet).*(?:Firefox\/)/i.test(getUserAgent()) ),
            msie: (function(){
                var ua = getUserAgent();
                var msie = ua.indexOf('MSIE ');
                if (msie > 0) { // IE 10 or older => return version number
                    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                }
                var trident = ua.indexOf('Trident/');
                if (trident > 0) { // IE 11 => return version number
                    var rv = ua.indexOf('rv:');
                    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                }
                var edge = ua.indexOf('Edge/');
                if (edge > 0) { // IE 12 => return version number
                    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                }
            })()
        }
    }


    function getHases() {
        return {
            chrome: getChrome()
        }
    }


    function getGeetters() {
        return {
            firefoxVersion: (function(version) {
                return (getUserAgent().toLowerCase().indexOf('firefox/' + version) !== -1);
            })(),
            androidVersion: (function() {
                var match = getUserAgent().match(/Android\s([0-9\.]*)/);
                return match ? match[1] : false;
            })(),
            iPadVersion: (getUserAgent().match(/(?:iPad);.*CPU.*(?:OS (.*)_)\d/i) )
        }
    }

    init();

    return {
        getPerformance: getPerformance,
        init: init,
        webGL: webGL,
        debugLine: function(){
            return debugLine;
        },
        os: function () {
            return {
                name: operatingSystem,
                version: operatingSystemSub
            }
        },
        name: function () {
            return browserName;
        },
        version: function () {
            return browserVersion;
        },
        getId: function () {
            return idline;
        },

        fingerprint: function () {
            init();
            return idline.replace(/\s/g, '');
        },
        is: getIs(),
        has: getHases(),
        get: getGeetters()
    }

})();


// mathml support
//ActiveX || directx suport
//http://browserspy.dk/math.php
//http://browserspy.dk/svg.php
//http://browserspy.dk/windowsmediaplayer.php
//http://browserspy.dk/openoffice.php
//http://browserspy.dk/soundcard.php
//http://browserspy.dk/quicktime.php
//http://browserspy.dk/realplayer.php




