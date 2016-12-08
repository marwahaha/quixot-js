/**
 * @module URL
 * @namespace URL
 * @memberof quixot
 */
quixot.URL = (function() {


    function decodeString(strd) {
        return decodeURIComponent(strd)
    }

    function getVal(val) {
        if(val.indexOf && val.indexOf(',') > -1) {
            return (val+'').split(',')
        }
        if(+val) {
            return parseFloat(val);
        }

        var obj =null;
        try {
            obj = JSON.parse(decodeString(val));
        } catch (ex){
            obj = null;
        } finally {
            if(obj != null) {
                return obj;
            }
        }
        return val+'';

    }

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
            lastPage = arr[0];

            if(arr.length > 1) {
                // console.log(arr);
                var last = arr[1];
                var parts = last.split('&');

                if (parts.length >= 1) {
                    for (var i = 0; i < parts.length; i++) {
                        var keyVal = parts[i].split('=');
                        if (keyVal.length > 1) {
                            response[keyVal[0]] = getVal(keyVal[1]);
                        } else {
                            response[keyVal[0]] = false;
                        }
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
        return decode(url).params;
    }


    function getDomainFromUrl(url){
        url = url + ''; //to avoid indexOf failing
        var domain = (url.indexOf('://') > -1) ? url.split('/')[2] : url.split('/')[0];
        if(domain){
            return domain.split(':')[0];
        }
        return 'localhost';
    }

    function currentDomain() {
        if(typeof document != 'undefined') {
            if(document.domain){
                return document.domain;
            }

            if(document.URL){
                return getDomainFromUrl(document.URL);
            }

        }
        return 'localhost';
    }

    return {
        /**
         * retrieve the parameters from a given url
         * @memberof quixot.URL
         * @param url
         * @returns {Object}
         * @example
         * quixot.URL.getParams("test.html?one=1&two=2")
         * //returns Object {one: 1, two: 2}
         * // same as:
         * quixot.URL.decode("test.html?one=1&two=2").params
         */
        getParams: getParams,
        getDomainFromUrl: getDomainFromUrl,
        currentDomain: currentDomain,
        /**
         * converts an object to a url query model
         * @memberof quixot.URL
         * @param object
         * @returns {String}
         */
        querify: function (object) {
            var cont = [];
            var text = '';
            if (object != null){
                for (var i in object) {
                    if(i && object[i]){
                        cont.push({
                            pp: i,
                            vl: object[i]
                        });
                    }
                }
                for(var j = 0; j < cont.length; j++) {
                    text += cont[j].pp + '=' + cont[j].vl;
                    if(j < cont.length -1) {
                        text+='&';
                    }
                }
                return text;
            }
        },
        decode: decode,
        /**
         * @memberof quixot.URL
         * @returns {String} current path name, as defined by window.location.pathname
         */
        currentPath: function () {
            if(typeof  window != 'undefined' && window.location && window.location.pathname){
                return window.location.pathname
            }
            return '';
        },
        currentSearch: function () {
            if(typeof  window != 'undefined' &&  window.location &&  window.location.search){
                return  window.location.search
            }
            return '';
        },
        currentData: function () {
            if(typeof document != 'undefined'){
                return decode(document.URL);
            }
            return {
                params: {}
            };
        }
    };
})();
