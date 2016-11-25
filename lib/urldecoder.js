/**
 * Created by alexstf on 1/8/16 for cam4.
 * Used to decode url format into object
 */

quixot.URL = (function() {


    function decode(url){
        if (!url) {
            return null;
        }
        var protocol = false;
        if(url.indexOf('http://') == 0) {
            protocol = 'http';
        }
        else if(url.indexOf('https://') == 0) {
            protocol = 'https';
        } else {
            protocol = url.split(':')[0];
        }
        var _urlParts = url.replace(protocol + '://', '').split('/');

        var response = {},

            arr = _urlParts[_urlParts.length -1].split('?'),
            lastPage = arr[0],
            last = arr[1];

            var parts = last.split('&');

            if (parts.length >= 1) {
                for (var i = 0; i < parts.length; i++) {
                    var keyVal = parts[i].split('=');
                    if (keyVal.length > 1) {
                        var val = keyVal[1];
                        if(val.indexOf && val.indexOf(',') > -1) {
                            val = (val+'').split(',')
                        }
                        if(+val) {
                            val= parseFloat(val);
                        }
                        response[keyVal[0]] = val;
                    } else {
                        response[keyVal[0]] = false;
                    }
                }
            }
        return {
            lastPage: lastPage,
            parts: _urlParts,
            url: url,
            protocol: protocol,
            params: response
        };
    }

    function getParams(url) {
        console.log(decode(url));
        return decode(url).params;
    }


    function getDomainFromUrl(url){
        url = url + ''; //to avoid indexOf failing
        var domain = (url.indexOf('://') > -1) ? url.split('/')[2] : url.split('/')[0];
        return domain.split(':')[0];
    }

    function currentDomain() {
        return document.domain || getDomainFromUrl(document.URL);
    }

    return {
        getParams: getParams,
        getDomainFromUrl: getDomainFromUrl,
        currentDomain: currentDomain,
        decode: decode,
        currentPath: function () {
            return window.location.pathname
        },
        currentSearch: function () {
            return window.location.search
        }
    };
})();
