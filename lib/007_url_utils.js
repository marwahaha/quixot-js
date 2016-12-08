//TODO suport unescape...
function _decodeURIString(strd) {
    return decodeURIComponent(strd)
}


function getValFromHttpParam(val) {
    if(val.indexOf && val.indexOf(',') > -1) {
        return (val+'').split(',')
    }
    if(+val) {
        return parseFloat(val);
    }

    var obj =null;
    try {
        obj = JSON.parse(_decodeURIString(val));
    } catch (ex){
        obj = null;
    } finally {
        if(obj != null) {
            return obj;
        }
    }
    return val+'';

}



function url_decode(url){
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
                    response[keyVal[0]] = getValFromHttpParam(keyVal[1]);
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



function url_current_params() {
    if(typeof document != 'undefined'){
        return url_get_params(document.URL);
    }
    return {
        params: {}
    };
}


function url_current_search() {
    if(typeof  window != 'undefined' &&  window.location &&  window.location.search){
        return  window.location.search
    }
    return '';
}


function url_get_params(url) {
    return url_decode(url).params;
}


function url_getDomainFromUrl(url){
    url = url + ''; //to avoid indexOf failing
    var domain = (url.indexOf('://') > -1) ? url.split('/')[2] : url.split('/')[0];
    if(domain){
        return domain.split(':')[0];
    }
    return 'localhost';
}

function url_currentDomain() {
    if(typeof document != 'undefined') {
        if(document.domain){
            return document.domain;
        }
        if(document.URL){
            return url_getDomainFromUrl(document.URL);
        }
    }
    return 'localhost';
}


function url_current_path() {
    if(typeof  window != 'undefined' && window.location && window.location.pathname){
        return window.location.pathname
    }
    return '';
}

function url_querify(object) {
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
}