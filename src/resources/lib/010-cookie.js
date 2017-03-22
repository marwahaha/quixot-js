


    function getCookie(name) {
        if(typeof document == 'undefined'){
            return;
        }
        document_cookie = document.cookie;

        function getCookieValue(offset) {
            var endstr = document_cookie.indexOf(';', offset);
            if (endstr == -1) {
                endstr = document_cookie.length;
            }
            return unescape(document_cookie.substring(offset, endstr));
        }

        var arg = name + "=",
            alen = arg.length,
            clen = document_cookie.length,
            i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document_cookie.substring(i, j) == arg)
                return getCookieValue(j);
            i = document_cookie.indexOf(" ", i) + 1;
            if (i === 0)
                break;
        }

        return null;
    }

    function updateCookie(name, value, p_expires, p_path, p_domain, p_secure) {
        deleteCookie(name, p_path, p_domain);
        cookie_setCookie(name, value, p_expires, p_path, p_domain, p_secure);
    }


    function cookie_setCookie(name, value, p_expires, p_path, p_domain, p_secure) {


        
        var expires = p_expires ? p_expires : null;

        if (typeof expires == nrType) {
            expires = time_date_add(new Date(), expires);
        }

        var path = p_path ? p_path : null;
        var domain = p_domain ? p_domain : null;
        var secure = p_secure ? p_secure : false;

        var cookieSuffix = ((expires === null) ? "" : ("; expires=" + (date_to_string(expires, 'cookie')))) +
            ((path === null) ? "" : ("; path=" + path)) +
            ((domain === null) ? "" : ("; domain=" + domain)) +
            ((secure === true) ? "; secure" : "");


        var cookieStr = name + "=" + escape(value) + cookieSuffix;

        if(env_isBrowser){
            document.cookie = cookieStr;
        }

        return cookieStr;

    }


    function deleteCookie(name, p_path, p_domain) {
        return cookie_setCookie(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), p_path, p_domain);
    }


   

