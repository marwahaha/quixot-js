


    function getCookie(name) {
        if(typeof document == 'undefined'){
            return;
        }

        function getCookieValue(offset) {
            var endstr = document.cookie.indexOf(';', offset);
            if (endstr == -1) {
                endstr = document.cookie.length;
            }
            return unescape(document.cookie.substring(offset, endstr));
        }

        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg)
                return getCookieValue(j);
            i = document.cookie.indexOf(" ", i) + 1;
            if (i === 0)
                break;
        }

        return null;
    }

    function updateCookie(name, value, p_expires, p_path, p_domain, p_secure) {
        deleteCookie(name, p_path, p_domain);
        setCookie(name, value, p_expires, p_path, p_domain, p_secure);
    }


    function setCookie(name, value, p_expires, p_path, p_domain, p_secure) {

        if(typeof document == 'undefined'){
            return;
        }
        
        var expires = p_expires ? p_expires : null;

        if (typeof expires == 'number') {
            var now = new Date();
            var nowToInt = +now;
            var overToInt = nowToInt + expires;
            expires = new Date(overToInt);
        }

        var path = p_path ? p_path : null;
        var domain = p_domain ? p_domain : null;
        var secure = p_secure ? p_secure : false;

        var cookieSuffix = ((expires === null) ? "" : ("; expires=" + (expires.toUTCString() || expires.toGMTString() || expires.toString()))) +
            ((path === null) ? "" : ("; path=" + path)) +
            ((domain === null) ? "" : ("; domain=" + domain)) +
            ((secure === true) ? "; secure" : "");


        var cookieStr = name + "=" + escape(value) + cookieSuffix;


        document.cookie = cookieStr;

        return cookieStr;

    }


    function deleteCookie(name, p_path, p_domain) {
        return setCookie(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), p_path, p_domain);
    }


   

