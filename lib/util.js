(function (root) {
    root.stringify = function (obj) {
        if(!obj) {
            return '{}';
        }
        var objKeys = Object.keys(obj);
        var keyValueArray = new Array();
        for (var i = 0; i < objKeys.length; i++) {
            var keyValueString = '"' + objKeys[i] + '":';
            var objValue = obj[objKeys[i]];
            keyValueString = (typeof objValue == "string") ?
                keyValueString = keyValueString + '"' + objValue + '"' :
                keyValueString = keyValueString +  root.stringify(objValue);
            keyValueArray.push(keyValueString);
        }
        return "{" + keyValueArray.join(",") + "}";
    }

    root.timeZoneAbbr = (function(){
        var d = new Date() + '', parts = d.split('(');
        if(parts.length > 0) {
            d = parts[1].split(')')[0];
            return d;
        }
        return '';
    })();
    
    
})(Jentil);