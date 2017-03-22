
var Inject = (function () {
    function injectJavascript(scriptSource, callback, toBottom) {
        var thisIsReady = false;
        var script = document.createElement('script');
        script.async = 'async';
        script.type = 'text/javascript';
        script.onreadystatechange = function() {
            if (this.readyState == 'complete') {
                if (!thisIsReady) {
                    thisIsReady = true;
                    if (callback) {
                        callback({
                            status: 'ok',
                            path: scriptSource
                        });
                    }
                }
            }
        };
        script.onload = function() {
            if (!thisIsReady) {
                thisIsReady = true;
                callback({
                    status: 'ok',
                    path: scriptSource
                });
            }
        };
        script.onerror = function(err) {
            if (!thisIsReady) {
                thisIsReady = true;
                callback({
                    status: 'error',
                    path: scriptSource
                });
            }
        };
        script.src = scriptSource;
        var root = (document.getElementsByTagName('head')[0] ||
        document.body ||
        document.documentElement);
        if (toBottom) {
            root = (document.body ||
            document.documentElement ||
            document.getElementsByTagName('head')[0]);
        }

        root.appendChild(script);
        return {
            script: script,
            root: root
        };
    }



    function injectCss(cssPath, callback) {
        var fileref = document.createElement('link');
        fileref.setAttribute('rel', 'stylesheet');
        fileref.setAttribute('type', 'text/css');
        fileref.setAttribute('href', cssPath);
        var thisIsReady = false;
        fileref.onreadystatechange = function() {
            if (this.readyState == 'complete') {
                if (!thisIsReady) {
                    thisIsReady = true;
                    if (callback)
                        callback('ok');
                }
            }
        };
        fileref.onload = function() {
            if (!thisIsReady) {
                thisIsReady = true;
                if (callback)
                    callback('ok');
            }
        };
        fileref.onerror = function(err) {
            if (!thisIsReady) {
                thisIsReady = true;
                if (callback) {
                    callback('failed');
                }
            }
        };
        var root = (document.getElementsByTagName('head')[0] ||
        document.body ||
        document.documentElement);
        root.appendChild(fileref);
        return {
            script: fileref,
            root: root
        };
    }




    function removeJavascriptNodes(array) {
        for (var i = 0; i < array.length; i++) {
            array[i].root.removeChild(array[i].script);
            array.splice(i, 1);
        }
        return 0;
    }

    return {

        js: injectJavascript,

        css: injectCss,

        drop: removeJavascriptNodes,
        
        scripts: function (list, callback) {
            var max = list.length, min = 0;

            for(var i = 0; i< list.length; i++){
                console.log(list[i]);
                var citem = list[i];
                if(citem.indexOf('js') > -1) {
                    injectJavascript(citem, function (data) {
                        console.log('loaded ' + data);
                        min ++;
                        if(min === max){
                            callback();
                        }
                    }, true)
                }
            }
        }
    }
})();








