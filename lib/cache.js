//require urldecoder
quixot.Cache = (function () {


    function CacheInstance(paramname) {
        var name = 'qch' + (paramname+'');
        name = name.replace(/\?/g, 'î')
            .replace(/=/g, 'ă')
            .replace(/\//g, 'ț')
            .replace(/\./g, '₤')
        ;



        var data = (function () {
            var r;

            if(typeof localStorage != 'undefined') {
                r = localStorage.getItem(name);
                // console.log('load' + r + ' for ' + name);
            }

            if(!r) {
                r = quixot.Cookie.get(name);
            }

            try {
                r = JSON.parse(r);
            }catch (e) {
                throw new Error('failed loading cache from ' + r);
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


        this.remove = function (slot) {
            if(data) {
                delete data[slot];
            }
        }


        this.save = function () {
            if(!data) {
                return;
            }
            // console.log('save cache [' + name + ' at ' + new Date());
            if(typeof localStorage != 'undefined') {
                localStorage.setItem(name, JSON.stringify(data));
            }

            quixot.Cookie.set(name, JSON.stringify(data));
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

        }


    }


    var domain = quixot.URL.currentDomain(),
        path = quixot.URL.currentPath(),
        search = quixot.URL.currentSearch();
    var urlInfo = quixot.URL.decode(document.URL);

    var domainInstance = new CacheInstance(domain),
        pathInstance =  new CacheInstance(path),
        searchInstance = new CacheInstance(search);


    var container = {
        domain: domainInstance,
        path: pathInstance,
        search : searchInstance
    };


    function saveAllInStorage() {
        for(var i in container) {
            container[i].save();
        }

        setTimeout(saveAllInStorage, 1000);
    }

    saveAllInStorage();

    return {
        getInstance: function (instancename) {
            if(!container[instancename]) {
                container[instancename] = new CacheInstance(instancename);
            }
           return container[instancename];
        },

        put: function (key, value) {
            domainInstance.put(key, value)
        },

        getData: function () {
            return  domainInstance.getData()
        }
    }
})();