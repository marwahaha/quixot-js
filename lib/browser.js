(function extendWithBrowser(window, quijot) {
    var fingerPrint = quijot.getFingerPrintData();



    var operatingSystem, operatingSystemSub, browserName, browserVersion;




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

    function getBattery() {
        if(navigator.battery) {
            fingerPrint.battery = 'navigator.battery';
        } else if (navigator.webkitBattery) {
            fingerPrint.battery = 'navigator.webkitBattery';
        } else if (navigator.mozBattery) {
            fingerPrint.battery = 'navigator.mozBattery';
        } else {
            fingerPrint.battery = '';
        }

        return navigator.battery || navigator.webkitBattery || navigator.mozBattery||{};
    }

    quijot.battery = getBattery();

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
			var index = dataString.indexOf(versionStringToSearch);
			if (index === -1) {
				return;
			}
			return parseFloat(dataString.substring(index + versionStringToSearch.length + 1));
		}


        function populate() {
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



            //some extra checks are required for newer browsers:

            var extraData = [
                {
                    doMatch: function (uastr) {
                        return uastr.indexOf('OPR') > 1;
                    },
                    getVersion: function(){
                        var parts = getUserAgent().split('OPR');
                        var r = '';
                        if(parts[1]) {
                            var s = parts[1]+'';

                            for(var i = 0; i < s.length; i++) {
                                if(!isNaN(s[i]) || s[i] === '.') {
                                    r+=s[i];
                                }
                                if(s[i] === ' ') {
                                    return (r);
                                }
                            }
                            return (r);
                        }
                        return 'unknown version';
                    },
                    identity: 'Opera'
                }
            ];


            for(var i = 0; i < extraData.length; i++) {
                var rule = extraData[i];
                if(rule.doMatch(getUserAgent())) {
                    browserName = rule.identity;
                    browserVersion = rule.getVersion();
                }
            }





            if(getNavigator().javaEnabled) {
                try {
                    quijot.javaEnabled = getNavigator().javaEnabled();
                    fingerPrint.javaEnabled = true;
                } catch (e) {
                    quijot.javaEnabled = false;
                    fingerPrint.javaEnabled = false;
                }
            }

            quijot.os = {
                name: operatingSystem,
                version: operatingSystemSub
            }

            quijot.browser = {
                name: browserName,
                version: browserVersion,
                is: getIs(),
                has: getHases(),
                get: getGeetters()
            }

            fingerPrint.os = operatingSystem;
            fingerPrint.osSub = operatingSystemSub;
            fingerPrint.br = browserName;
            fingerPrint.brv = browserVersion;

            fingerPrint.screen = quijot.stringify(getScreenInfo());
            fingerPrint.chrome = quijot.stringify(getChrome(), 8);
            fingerPrint.netscape = quijot.stringify(getNetscape(), 4);
            fingerPrint.navigator = JSON.stringify(quijot.simplify(navigator));
            fingerPrint.plugins = quijot.stringify(navigator.plugins, 3);
            fingerPrint.mimeTypes =  quijot.stringify(navigator.mimeTypes, 3);



            fingerPrint.pluginsList = [];
            function scand(object) {
                for(var i in object){
                    var id = (i+object[i]);
                    if(fingerPrint.pluginsList.indexOf(id) == -1) {
                        fingerPrint.pluginsList.push(id);
                        scand(object[i]);
                    }
                }
            }

            scand(navigator.plugins);
            scand(navigator.mimeTypes);

            fingerPrint.pluginsList =  fingerPrint.pluginsList.join(',');



        } //end populate method






        


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

    populate();

    quijot.getFingerPrintData = function () {
        return fingerPrint;
    };

})(window, quixot);


// mathml support
//ActiveX || directx suport
//http://browserspy.dk/math.php
//http://browserspy.dk/svg.php
//http://browserspy.dk/windowsmediaplayer.php
//http://browserspy.dk/openoffice.php
//http://browserspy.dk/soundcard.php
//http://browserspy.dk/quicktime.php
//http://browserspy.dk/realplayer.php




