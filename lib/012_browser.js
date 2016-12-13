
    function getWindow() {
        if(typeof window != 'undefined') {
            return window;
        }
        return {};
    }

    function getNavigator() {
        if(typeof navigator != 'undefined') {
            return navigator;
        }

        return getWindow().navigator || {};
    }

    function getChrome() {
            return getWindow().chrome;
    }

    function getNetscape() {
        return getWindow().netscape;
    }

    function getAppVersion() {
        return getNavigator().appVersion || {};
    }

    function getUserAgent() {
        return getNavigator().userAgent || ' ';
    }

    var dataBrowser = [
        {string: getUserAgent(), subString: 'iCab', versionSearch: 'iCab', identity: 'iCab'},
        {string: getUserAgent(), subString: 'rekonq', versionSearch: 'rekonq', identity: 'Rekonq'},
        {string: getUserAgent(), subString: 'Midori', versionSearch: 'Midori', identity: 'Midori'},
        {string: getUserAgent(), subString: 'Arora', versionSearch: 'Arora', identity: 'Arora'},
        {string: getUserAgent(), subString: 'Stainless', versionSearch: 'Stainless', identity: 'Stainless'},
        {string: getUserAgent(), subString: 'Epiphany',versionSearch: 'Epiphany', identity: 'Epiphany'},
        {string: getUserAgent(), subString: 'K-Meleon', versionSearch: 'K-Meleon', identity: 'K-Meleon'},
        {string: getNavigator().vendor, subString: 'Camino', identity: 'Camino'},
        {string: getUserAgent(), subString: 'Maxthon', versionSearch: 'Maxthon', identity: 'Maxthon'},
        {string: getUserAgent(), subString: 'SeaMonkey', versionSearch: 'SeaMonkey', identity: 'SeaMonkey'},
        {string: getUserAgent(), subString: 'Edge', identity: 'Edge', versionSearch: 'Edge'},

        {string: getUserAgent(), subString: 'Chrome', identity: 'Chrome'},
        {string: getUserAgent(), subString: 'OmniWeb', versionSearch: 'OmniWeb/', identity: 'OmniWeb'},
        {string: getNavigator().vendor, subString: 'Apple', identity: 'Safari', versionSearch: 'Version'},
        {prop: getWindow().opera, identity: 'Opera', versionSearch: 'Version'},
        {string: getNavigator().vendor, subString: 'iCab', identity: 'iCab'},
        {string: getNavigator().vendor, subString: 'KDE', identity: 'Konqueror'},
        {string: getUserAgent(), subString: 'Firefox', identity: 'Firefox'},
        {string: getUserAgent(), subString: 'Netscape', identity: 'Netscape'},
        {string: getUserAgent(), subString: 'MSIE', identity: 'Explorer', versionSearch: 'MSIE'},
        {string: getUserAgent(), subString: 'Gecko', identity: 'Mozilla', versionSearch: 'rv'},
        // for older Netscapes (4-)
        {string: getUserAgent(), subString: 'Mozilla', identity: 'Netscape', versionSearch: 'Mozilla'}
    ];


    var dataOS = [
        {string: getNavigator().platform, subString: 'Win', identity: 'Windows'},
        {string: getNavigator().platform, subString: 'Mac', identity: 'Mac'},
        {string: getUserAgent(), subString: 'iPhone', identity: 'iPhone'},
        {string: getUserAgent(), subString: 'iPad', identity: 'iPad'},
        {string: getUserAgent(), subString: 'Android', identity: 'Android'},
        {string: getNavigator().platform, subString: 'Linux', identity: 'Linux'}
    ];



    


    var versionStringToSearch = '';
    function searchString(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            if(!dataString) {
                continue;
            }
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
        if(!dataString || !dataString.indexOf) {
            return '';
        }
        var index = dataString.indexOf(versionStringToSearch);
        if (index === -1) {
            return;
        }
        return parseFloat(dataString.substring(index + versionStringToSearch.length + 1));
    }

    var operatingSystem, operatingSystemSub, browserName, browserVersion, javaEnabled = false, pluginsList = [];

    function scand(object) {
        if(!object) {
            return;
        }
        for(var i in object){
            var id = (i+object[i]);
            if(pluginsList.indexOf(id) == -1) {
                pluginsList.push(id);
                scand(object[i]);
            }
        }
    }


    operatingSystem = searchString(dataOS) || 'an unknown OS';

    if (operatingSystem === 'Linux') {  //check for specific linux flavours
        if(getUserAgent().toLowerCase().indexOf('ubuntu')) {
            operatingSystemSub = 'Ubuntu';
        }
    }

    if(operatingSystem === 'Windows') {    //check for specific windows flavours
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
           envData.javaEnabled = getNavigator().javaEnabled();
        } catch (e) {
           envData.javaEnabled = false;
        }
    }


    scand(getNavigator().plugins);
    scand(getNavigator().mimeTypes);




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
                var safari = !!getWindow().safari, iPhone = /iPhone/i.test(getUserAgent());
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


    if(!os_info.name){
         os_info.name = operatingSystem;
    }

    if(!os_info.version){
        os_info.version = operatingSystemSub;
    }




    fingerPrintData.plugins = pluginsList.sort().join('');
    fingerPrintData.screen = encodeObject(screen_info);
    fingerPrintData.chrome = encodeObject(getChrome(), 8);
    fingerPrintData.netscape = encodeObject(getNetscape(), 4);
    fingerPrintData.navigator = encodeObject(simplify(getNavigator()));
    fingerPrintData.plugins = encodeObject(getNavigator().plugins, 3);
    fingerPrintData.mimeTypes =  encodeObject(getNavigator().mimeTypes, 3);

