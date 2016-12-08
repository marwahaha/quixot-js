quixot.http = {
    method: {
        post: 'POST',
        get: 'GET'
    },

    send: function(options) {

        var xmlhttp;
        var method = 'post';
        if (options.method) {
            method = options.method;
        }

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (err) {
                try {
                    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (ex) {
                    xmlhttp = false;
                    console.log('xmlhttp failed to init');
                    if (options.onexception) {
                        options.onexception(ex);
                    }
                }
            }
        }

        xmlhttp.onreadystatechange = function() {
            try {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    if (options.success)
                        options.success((xmlhttp.responseText ||
                        xmlhttp.response), xmlhttp);
                } else {
                    if (options.onerror)
                        options.onerror(xmlhttp);
                }
            } catch (ex) {
               
                if (options.onexception) {
                    options.onexception(ex);
                }
            }
        };
        xmlhttp.onerror = function(err) {
            if (options.onerror) {
                options.onerror(err);
            }
        };
        try {
            xmlhttp.open(method, options.url, true);
            try {
                if (method === AjaxSender.method.post) {
                    xmlhttp.setRequestHeader('Content-type',
                        'application/x-www-form-urlencoded');
                }
            } catch (ex) {
                console.log(ex);
                if (options.onexception) {
                    options.onexception(ex);
                }
            }
        } catch (ex) {
            console.log(ex);
            if (options.onexception) {
                options.onexception(ex);
            }
        }



        try {
            if (options.data) {
                xmlhttp.send(options.data);
            } else {
                xmlhttp.send();
            }
        } catch (exception) {
            console.log(exception);
            if (options.onexception) {
                options.onexception(exception);
            }
        }

        return 0;
    }
};
