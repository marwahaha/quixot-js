var Jentil = Jentil ? Jentil : {};


Jentil.data = {
    ips: [],
    errs: [],
    jseng: {
        nosupport: []
    }
};


if(!console) {
    console = {};
    if (!console.log) {
        console.log = function () {}
    }
    
}
if (!Object.keys) {
    Object.keys = function(obj) {
        var keys = [];

        for (var i in obj) {
            if (obj[i]) {
                keys.push(i);
            }
        }

        return keys;
    };
    Jentil.data.jseng.nosupport.push('Object.keys');
}