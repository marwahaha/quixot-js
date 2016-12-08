/**
 * @namespace Inject
 * @memberof quixot
 */
quixot.Inject = (function () {
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
        /**
         * Method to insert a javascript tag using a src
         * @memberof quixot.Inject
         * @param {String} scriptSource script source file
         * @param {Method} callback the callback function
         * @param {Boolean} toBottom if true,
         * first it will check for body then for head
         * @return {Object} an object with 2 properties:
         * 'script' = the inserted script object, and 'root' = the container
         */
        js: injectJavascript,
        /**
         * @memberof quixot.Inject
         * @param {String} cssPath path to css
         * @param {Method} callback function to call when css is loaded
         * @return {Object} an object with 2 properties:
         * 'script' = the inserted css object, and 'root' = the container
         */
        css: injectCss,
        /**
         * @memberof quixot.Inject
         * method to remove script tags from dom
         * @param {Array} array, an array of objects with 2 properties:
         * 'script' = the inserted script object, and 'root' = the container
         * @return {Number} default 0
         */
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








