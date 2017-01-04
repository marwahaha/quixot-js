
    function getCacheNamed(name) {
        var data = getNodeJsCache();
        if(data[name]){
            return data[name];
        }
        return {};
    }


    function getCachePath() {
        var fs = __require('fs');
        var p = __require('path');
        var path = envData.homeDir + p.sep + ".cache";
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        path += p.sep + "quixot.cache.json";

        return path;
    }

    function saveNodeJsCache(newdata) {
        var path = getCachePath(), fs = __require('fs');
        var line = fs.readFileSync(path, "utf8");
        var oldData = JSON.parse(line);
        if(oldData && newdata){
            var props = 0;
            for(var i in newdata){
                oldData[i] = newdata[i];
                props++;
            }

            if(props > 0){
                fs.writeFileSync(path, json_stringify(oldData));
            }
        }
    }

    function removeNodeJsCache(keyname, slot) {
        var path = getCachePath(), fs = __require('fs');
        var line = fs.readFileSync(path, "utf8");
        var oldData = JSON.parse(line);
        var obj = oldData[keyname];
        delete obj[slot];
        fs.writeFileSync(path, json_stringify(oldData));
    }

    function getNodeJsCache() {
        var path = getCachePath(), fs = __require('fs');
        if (!fs.existsSync(path)) {
            var initData = {
                creationDate: new Date(),
                writer: 'quixot'
            };
            fs.writeFileSync(path, json_stringify(initData));
            return initData;
        }
        var line = fs.readFileSync(path, "utf8");
        var oldData = JSON.parse(line);
        return oldData;
    }


    function CacheInstance(paramname, _lifetime) {
        var name = 'qch' + (paramname+'');
        name = name.replace(/\?/g, '')
            .replace(/=/g, '')
            .replace(/\//g, '')
            .replace(/\./g, '')
        , propKeys = 1, saveTimeoutId = 0;





        var data = (function () {
            var r;
            if(env_isBrowser) {

                if(typeof localStorage != 'undefined') {
                    try {
                        r = localStorage.getItem(name);
                    }catch (e){
                        r = null;
                    }
                }
                if(!r) {
                    r = getCookie(name);
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


        if (_lifetime && typeof _lifetime == nrType) {
           if(data && !data.lifetime){
               data.lifetime = time_date_add(new Date(), _lifetime);
           }
        }




        this.put = function (slot, object) {
            if(slot && object) {
                if(!data) {
                    data = {};
                }
                data[slot] = object;

            }

            return this.save();
        };




        this.remove = function (slot) {
            if(data) {
               delete data[slot];
               if(!env_isBrowser){
                   removeNodeJsCache(name, slot);
               } else{
                   this.save();
               }
            }
        };



        this.save = function () {
            if(!data) {
                return false;
            }
         

            if(_lifetime && date_Diff(_lifetime, new Date()) < 1){
                data = false;
                return false;
            }

            if(env_isBrowser) {
                clearTimeout(saveTimeoutId);

                if(typeof localStorage != 'undefined') {
                    try {
                         localStorage.setItem(name, json_stringify(data));
                    } catch(ex) {
                        cookie_setCookie(name, json_stringify(data), _lifetime);
                    }
                } else {
                    cookie_setCookie(name, json_stringify(data), _lifetime);
                }
                saveTimeoutId = setTimeout(function () {
                    cache_getInstance(paramname).save();
                }, 1000 * 10);

            } else {
                var vdata = {};
                vdata[name] = data;
                saveNodeJsCache(vdata);
            }
            return true;
        };



        this.getData =function () {
            return data;
        };


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
        };
    }


    var domain = url_currentDomain(),
        path = url_current_path(),
        search = url_current_search();


    var domainCacheInstance = new CacheInstance(domain),
        pathCacheInstance =  new CacheInstance(path),
        searchCacheInstance = new CacheInstance(search);


    var cacheContainer = {
        domain: domainCacheInstance,
        path: pathCacheInstance,
        search : searchCacheInstance
    };

    
    function cache_getInstance(_instanceName, _lifetime) {
        if(!cacheContainer[_instanceName]) {
            cacheContainer[_instanceName] = new CacheInstance(_instanceName, _lifetime);
        }
        return cacheContainer[_instanceName];
}



