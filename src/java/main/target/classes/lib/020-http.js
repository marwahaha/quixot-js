function http_request(request_method, request_url, request_data, success_callback, failure_callback, request_headers) {
    var x;
    if(typeof window != 'undefined' && window.XMLHttpRequest) {
        x = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            x = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (err) {
            try {
                x = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (err) {
                x = false;
                console.log('xmlhttp failed to init');
                if (failure_callback) {
                    failure_callback(err);
                }
                return {};
            }
        }
    }

    x.onreadystatechange = function() {
        try {
            if (x.readyState == 4 && x.status == 200) {
                if (success_callback)
                    success_callback(x, (x.responseText || x.response));
            } else if (failure_callback){
                failure_callback(x);
            }
        } catch (e) {
            if (failure_callback) {
                failure_callback(e);
            }
        }
    };

    x.onerror = function(e) {
        if (failure_callback) {
            failure_callback(e);
        }
    };


    try {
        x.open(request_method, request_url, true);
        for(var i in request_headers){
            x.setRequestHeader(i, request_headers[i]);
        }
        

        if (request_data) {
            x.send(request_data);
        } else {
            x.send();
        }

    } catch (e){
        if (failure_callback) {
            failure_callback(e);
        }
    }
}


function http_get(request_url, request_data, success_callback, failure_callback, request_headers) {
    return http_request('GET', request_url, url_querify(request_data), success_callback, failure_callback, request_headers);
}

function http_post(request_url, request_data, success_callback, failure_callback, request_headers) {
    return http_request('POST', request_url, url_querify(request_data), success_callback, failure_callback, request_headers);
}

function http_post_x_form(request_url, request_data, success_callback, failure_callback, request_headers) {
    if(!request_headers){
        request_headers = {};
    }
    if(!request_headers['Content-type']){
        request_headers['Content-type'] = 'application/x-www-form-urlencoded';
    }
    return http_post(request_url, request_data, success_callback, failure_callback, request_headers);
}

