var controller_data_types = {
    text: {
        valid: function (i) {
            return true;
        }
    },

    number: {
        valid: function (i) {
            return true;
        }
    }
},

controller_logger = logger_getInstance('dulcineea'),

controller_dom_parser = function (o) {
    var c = o.tagName, n, v, t;
    if(c){
        c = c.toLowerCase();
        if(o.getAttribute){
            n = o.getAttribute('name');
            v = o.getAttribute('value');
            t = o.getAttribute('type');
        }
        if(!n){
            n = o.id;
        }

        if(!t && c === 'textarea' ){
            t = 'text';
        }

        if(!v){
            v = o.innerHTML;
        }

        return {
            name: n, value: v, type: t
        };
    }
},

controller_options_html = {
    fetch: function (o) {
        var r = [];
        if(o && o.childNodes){
            for(var j = 0; j < o.childNodes.length; j++){
               var c = o.childNodes[j],
                   s = (controller_dom_parser(o.childNodes[j]));
                if(s){
                    r.push(s);
                }
            }
        }

        return r;
    }    
}

;


function extract_callers(input_string) {
    if(!input_string){
        return [];
    }
    var _point_buffer = input_string.trim().split('.'), _response = [];

    for(var i = 0; i < _point_buffer.length; i++){
        var _sub_arrays = _point_buffer[i].split('[');
        for(var j = 0; j < _sub_arrays.length; j++){
            var _sub_sub = _sub_arrays[j].split(']');
            for(var k = 0; k < _sub_sub.length; k++){
                if(_sub_sub[k]){
                    _response.push(_sub_sub[k]);
                }
            }
        }
    }


    return _response;


}

function execute_js(_input_string, _input_object) {
    return execute_recursive(extract_callers(_input_string), _input_object);
}

function execute_recursive(_input_list, _input_object) {
    if(_input_list.length === 0){
        return _input_object;
    }
    var _key = util_strip_quotes(_input_list[0]),
        _temporary_response = _input_object[_key];

    if(_input_list.length > 1){
        return execute_recursive(_input_list.splice(1, _input_list.length -1), _temporary_response);
    }
    return _temporary_response;
}


function template_replace(t, o) {
    var p = t + '';
    console.log(p);
    util_array_each(t.match(/{{(.*?)}}/g), function(i, s) {
         var n = s.substring(2, s.length - 2);
         p = p.replace(s, eval.call(n, o));
         console.log(i, s)
    });

    console.log(p);
}

/**
 *
 * annotations model: {prop: key}
 * n = name
 * i = annotations to fetch
 * @param n
 * @param i
 * @param o
 */
function controller_constructor(n, i, o) {

    var v = o.fetch(i);

    controller_logger.info(n);
    controller_logger.info(v);
    
        util_array_each(v,function (i, d) {
            console.log(i, d)
        });
}

function controller_dom_init(e) {
    util_array_each(e, function (i, o) {
        if(o.id){
            controller_constructor(o.id, o, controller_options_html);
        }

    })
}

/**
 * controller_dom_init(document.getElementsByClassName('controller-new'));
 */

