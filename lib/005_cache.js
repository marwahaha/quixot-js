

/**
 * supports browser && nodejs
 * @module Cache
 * @namespace Cache
 * @memberof quixot
 */
quixot.Cache = (function () {


    function getCacheNamed(name) {
        var data = getNodeJsCache();
        if(data[name]){
            return data[name];
        }
        return {};
    }


    function getCachePath() {
        var fs = quixot.require('fs');
        var p = quixot.require('path');
        var path = quixot.Env.homeDir + p.sep + ".cache";
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        path += p.sep + "quixot.cache.json";

        return path;
    }

    function saveNodeJsCache(newdata) {
        var path = getCachePath(), fs = quixot.require('fs');
        var line = fs.readFileSync(path, "utf8");
        var oldData = JSON.parse(line);
        if(newdata){
            var props = 0;
            for(var i in newdata){
                oldData[i] = newdata[i];
                props++;
            }

            if(props > 0){

                console.log('saving' + JSON.stringify(oldData));
                fs.writeFileSync(path, JSON.stringify(oldData));
            }
        }
    }

    function removeNodeJsCache(keyname, slot) {
        var path = getCachePath(), fs = quixot.require('fs');
        var line = fs.readFileSync(path, "utf8");
        var oldData = JSON.parse(line);
        var obj = oldData[keyname];
        delete obj[slot];
        fs.writeFileSync(path, JSON.stringify(oldData));
    }

    function getNodeJsCache() {
        var path = getCachePath(), fs = quixot.require('fs');
        if (!fs.existsSync(path)) {
            var initData = {
                creationDate: new Date(),
                writer: 'quixot'
            };
            fs.writeFileSync(path, JSON.stringify(initData));
            return initData;
        }
        var line = fs.readFileSync(path, "utf8");
        var oldData = JSON.parse(line);
        return oldData;
    }


    function CacheInstance(paramname) {
        var name = 'qch' + (paramname+'');
        name = name.replace(/\?/g, 'î')
            .replace(/=/g, 'ă')
            .replace(/\//g, 'ț')
            .replace(/\./g, '₤')
        ;

        var env = quixot.Env, isBrowser = env.jsEngine.isBrowser;

        var data = (function () {
            var r;
            if(isBrowser) {
                if(typeof localStorage != 'undefined') {
                    r = localStorage.getItem(name);
                }
                if(!r) {
                    r = quixot.Cookie.get(name);
                }

                try {
                    r = JSON.parse(r);
                }catch (e) {
                    throw new Error('failed loading cache from ' + r);
                    r = {};
                }
            } else {
                r = getCacheNamed(name);
            }
            return r;
        })();

        var propKeys = 1;


        this.put = function (slot, object) {
            if(slot && object) {
                if(!data) {
                    data = {};
                }
                data[slot] = object;
            }
            this.save();
        }


        var saveTimeoutId = 0;

        this.remove = function (slot) {
            if(data) {
               delete data[slot];
               if(!isBrowser){
                   console.log('removing ' +  " name = " + name);
                   removeNodeJsCache(name, slot);
               } else{
                   this.save();
               }
            }
        }



        this.save = function () {
            if(!data) {
                return;
            }
            if(isBrowser) {
                clearTimeout(saveTimeoutId);
                console.log(name + 'salvat la ' + new Date())
                if(typeof localStorage != 'undefined') {
                    localStorage.setItem(name, JSON.stringify(data));
                }
                quixot.Cookie.set(name, JSON.stringify(data));

                saveTimeoutId = setTimeout(function () {
                    quixot.Cache.getInstance(paramname).save();
                }, 1000 * 10);
                console.log("saveTimeoutId = " + saveTimeoutId);
            } else {
                var vdata = {};
                vdata[name] = data;
                saveNodeJsCache(vdata);
            }
        }



        this.getData =function () {
            return data;
        }


        this.getSafe = function (propname, defaultvalue) {
            if(data && data[propname]){
                return data[propname];
            }
            if(defaultvalue){
                if(!data){
                    data = {};
                }
                data[propname] = defaultvalue;
                return defaultvalue;
            }

            return null;
        }
    }


    var domain = quixot.URL.currentDomain(),
        path = quixot.URL.currentPath(),
        search = quixot.URL.currentSearch();


    var domainInstance = new CacheInstance(domain),
        pathInstance =  new CacheInstance(path),
        searchInstance = new CacheInstance(search);


    var container = {
        domain: domainInstance,
        path: pathInstance,
        search : searchInstance
    };




    return {
        getInstance: function (instancename) {
            if(!container[instancename]) {
                container[instancename] = new CacheInstance(instancename);
            }
            return container[instancename];
        },

        /**
         * put item in cache
         * @memberof quixot.Cache
         * @param key
         * @param value
         */
        put: function (key, value) {
            domainInstance.put(key, value)
        },

        remove: function (key) {
            domainInstance.remove(key);
        },

        getData: function () {
            return  domainInstance.getData()
        },

        getSafe: function (propname, defaultvalue) {
            return  domainInstance.getSafe(propname, defaultvalue)
        }
    }
})();