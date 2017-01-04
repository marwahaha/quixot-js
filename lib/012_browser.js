


    var browser_searched_data = [
        {s: browser_user_agent, u: 'iCab', v: 'iCab', i: 'iCab'},
        {s: browser_user_agent, u: 'rekonq', v: 'rekonq', i: 'Rekonq'},
        {s: browser_user_agent, u: 'Midori', v: 'Midori', i: 'Midori'},
        {s: browser_user_agent, u: 'Arora', v: 'Arora', i: 'Arora'},
        {s: browser_user_agent, u: 'Stainless', v: 'Stainless', i: 'Stainless'},
        {s: browser_user_agent, u: 'Epiphany',v: 'Epiphany', i: 'Epiphany'},
        {s: browser_user_agent, u: 'K-Meleon', v: 'K-Meleon', i: 'K-Meleon'},
        {s: browser_navigator.vendor, u: 'Camino', i: 'Camino'},
        {s: browser_user_agent, u: 'Maxthon', v: 'Maxthon', i: 'Maxthon'},
        {s: browser_user_agent, u: 'SeaMonkey', v: 'SeaMonkey', i: 'SeaMonkey'},
        {s: browser_user_agent, u: 'Edge', i: 'Edge', v: 'Edge'},

        {s: browser_user_agent, u: 'Chrome', i: 'Chrome'},
        {s: browser_user_agent, u: 'OmniWeb', v: 'OmniWeb/', i: 'OmniWeb'},
        {s: browser_navigator.vendor, u: 'Apple', i: 'Safari', v: 'Version'},
        {prop: browser_window.opera, i: 'Opera', v: 'Version'},
        {s: browser_navigator.vendor, u: 'KDE', i: 'Konqueror'},
        {s: browser_user_agent, u: 'Firefox', i: 'Firefox'},
        {s: browser_user_agent, u: 'Netscape', i: 'Netscape'},
        {s: browser_user_agent, u: 'MSIE', i: 'Explorer', v: 'MSIE'},
        {s: browser_user_agent, u: 'Gecko', i: 'Mozilla', v: 'rv'},

        /**
         * for older netscapes:(4-)
         */
        {s: browser_user_agent, u: 'Mozilla', i: 'Netscape', v: 'Mozilla'}
    ];


    var browser_searched_os = [
        {s: browser_navigator.platform, u: 'Win', i: 'Windows'},
        {s: browser_navigator.platform, u: 'Mac', i: 'Mac'},
        {s: browser_user_agent, u: 'iPhone', i: 'iPhone'},
        {s: browser_user_agent, u: 'iPad', i: 'iPad'},
        {s: browser_user_agent, u: 'Android', i: 'Android'},
        {s: browser_navigator.platform, u: 'Linux', i: 'Linux'}
    ];



    


  
    function searchString(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].s;
            if(!dataString) {
                continue;
            }
            var dataProp = data[i].prop;
            browser_version_buffer = data[i].v || data[i].i;
            if (dataString) {
                if (dataString.indexOf(data[i].u) != -1) {
                    return (data[i].i);
                }
            }
            else if (dataProp) {
                return ( data[i].i);
            }
        }
    }

    function searchVersion(dataString) {
        if(!dataString || !dataString.indexOf) {
            return '';
        }
        var index = dataString.indexOf(browser_version_buffer);
        if (index === -1) {
            return;
        }
        return parseFloat(dataString.substring(index + browser_version_buffer.length + 1));
    }



    function fingerprint_scan(o) {
        if(!o) {
            return;
        }
        for(var i in o){
            var id = (i+o[i]);
            if(pluginsList.indexOf(id) == -1) {
                pluginsList.push(id);
                fingerprint_scan(o[i]);
            }
        }
    }


    operatingSystem = searchString(browser_searched_os) || 'an unknown OS';

    /**
     * check for specific linux flavours
     */
    if (operatingSystem === 'Linux') {
        if(browser_user_agent.toLowerCase().indexOf('ubuntu')) {
            operatingSystemSub = 'Ubuntu';
        }
    }

    /**
     * check for specific windows flavours
     */
    if(operatingSystem === 'Windows') {
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(browser_user_agent)){
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

    browserName = searchString(browser_searched_data) || 'An unknown browser';
    browserVersion = searchVersion(browser_user_agent) || searchVersion(browser_app_version) || 'an unknown version';

    /**
     * check for ie11 number
     */
    var isAtLeastIE11 = !!(browser_user_agent.match(/Trident/) && !browser_user_agent.match(/MSIE/));
    if (isAtLeastIE11) {
        browserName = 'Explorer';
        var isIE11 = !!(browser_user_agent.match(/Trident/) && browser_user_agent.match(/11/));
        if (isIE11) {
            browserVersion = 11;
        }
    }

    /**
     * fix number for some chrome versions and detect chromium
     */
    if (browserName === 'Chrome') {
        if (browser_user_agent.toLowerCase().indexOf('chromium') > -1) {
            browserName = 'Chromium';
        }
        if(browserVersion === 'an unknown version') {
            var version = browser_user_agent || browser_app_version;
            version = version.split('Chrome');
            if (version[1]) {
                var matches = version[1].match(/\d+/);
                if (matches[0]) {
                    browserVersion = parseInt(matches[0]);
                }
            }
        }
    }


    function util_extract_first_number(s){

        if(!s || s === ''){
            return 0;
        }


        var r = '', s = s.trim().split('');
        for(var i = 0; i < s.length; i++) {
            if(!isNaN(s[i]) || s[i] === '.') {
                r+=s[i];

            }
            if(s[i] === ' ') {
                return r;
            }
        }
        return r;
    }

    function browser_get_version_from_useragent(s){
        var p = browser_user_agent.split(s);
        if(p[1]) {
            return util_extract_first_number(p[1] + '');
        }
         return 'unknown version';
    }

    /**
     * some extra checks are required for newer browsers:
     */

    var extra_search_browser_data = [
        {
            dM: function (u) {
                return u.indexOf('OPR') > 1;
            },
            gV: function(){
                return browser_get_version_from_useragent('OPR');
            },
            i: 'Opera'
        },
        {
            i: 'Tizen',
            gV: function(){
              return browser_get_version_from_useragent('Tizen');
            },
            dM: function(u){
                return u.indexOf('Tizen') > 1;
            }
        }
    ];


    util_array_each(extra_search_browser_data, function(i, o){
        if(o.dM(browser_user_agent)) {
            browserName = o.i;
            browserVersion = o.gV();
        }
    });




    if(browser_navigator.javaEnabled) {
        try {
           envData.javaEnabled = browser_navigator.javaEnabled();
        } catch (e) {
           envData.javaEnabled = false;
        }
    }


    fingerprint_scan(browser_navigator.plugins);
    fingerprint_scan(browser_navigator.mimeTypes);




    function getIs() {

        return {
            iPod: ( browser_user_agent.indexOf("iPod") > -1),
            iPhone : ( browser_user_agent.indexOf("iPhone") > -1),
            nokiaN :( browser_user_agent.indexOf("NokiaN") > -1),
            wii : (browser_user_agent.indexOf("Wii") > -1),
            ps: ( /playstation/i.test(browser_user_agent) ),
            xpSP2: (browser_user_agent.indexOf('SV1') !== -1),
            iPhoneiPod: ( browser_user_agent.match(/iPhone|iPod/i) ),
            iPhoneiPadiPod: ( browser_user_agent.match(/iPhone|iPad|iPod/i) ),
            desktop: ( !browser_user_agent.match(/iPhone|iPad|android/i) ),
            android: ( browser_user_agent.match(/android/i) ),
            winPhone: ( /IEMobile/.test(browser_user_agent) ),
            chromeCRIOS: ( browser_user_agent.match(/chrome|crios/i) ),
            iOS: (/iPad|iPhone|iPod/.test(browser_user_agent) && !MSStream  ),
            iPad: ( browser_user_agent.match(/iPad/i) ),
            firefox: ( browser_user_agent.match(/firefox/i) ),
            phoneDevice:( browser_user_agent.match(/iPhone|android/i) ),
            iOS7: ( browser_user_agent.match(/.*CPU.*OS 7_\d/i) ),
            iPhoneSafari: ( function(){
                var safari = !!browser_window.safari, iPhone = /iPhone/i.test(browser_user_agent);
                return !!(iPhone && safari);
            })(),
            tabletAndroidFirefox: (/(?:Android; Tablet).*(?:Firefox\/)/i.test(browser_user_agent) ),
            msie: (function(){
                var ua = browser_user_agent;
                var msie = ua.indexOf('MSIE ');
                /**
                 * IE 10 or older => return version number
                 */
                if (msie > 0) {
                    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                }
                var trident = ua.indexOf('Trident/');
                /**
                 * IE 11 => return version number
                 */
                if (trident > 0) {
                    var rv = ua.indexOf('rv:');
                    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                }
                /**
                 *  IE 12 => return version number
                 */
                var edge = ua.indexOf('Edge/');
                if (edge > 0) {
                    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                }
            })()
        }
    }


    function getHases() {
        return {
            chrome: browser_window.chrome
        }
    }


    function getGeetters() {
        return {
            firefoxVersion: (function(version) {
                return (browser_user_agent.toLowerCase().indexOf('firefox/' + version) !== -1);
            })(),
            androidVersion: (function() {
                var match = browser_user_agent.match(/Android\s([0-9\.]*)/);
                return match ? match[1] : false;
            })(),
            iPadVersion: (browser_user_agent.match(/(?:iPad);.*CPU.*(?:OS (.*)_)\d/i) )
        }
    }


    if(!os_info.name){
         os_info.name = operatingSystem;
    }

    if(!os_info.version){
        os_info.version = operatingSystemSub;
    }




    fingerPrintData.plugins = pluginsList.sort().join('');
    fingerPrintData.screen = util_encodeObject(screen_info);
    fingerPrintData.chrome = util_encodeObject(browser_window.chrome, 8);
    fingerPrintData.netscape = util_encodeObject(browser_window.netscape, 4);
    fingerPrintData.navigator = util_encodeObject(util_simplify(browser_navigator));
    fingerPrintData.plugins = util_encodeObject(browser_navigator.plugins, 3);
    fingerPrintData.mimeTypes =  util_encodeObject(browser_navigator.mimeTypes, 3);

