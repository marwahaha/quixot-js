
var html4_notification_pid = 0,
    html4_buffer = [],
    html4_remove_action = util_random_string() + util_incr(),
    incremental_property = '___qwi' + util_random_string(),
    nww = 200, nwh = 100,
    mnw = math_round(screen_info.width / nww),
    mnh = math_round(screen_info.height / nwh),
    matrix = [];


if(env_isBrowser){
    browser_window[incremental_property] = 0;
}


for(var i = 0; i < mnw; i++){
    for(var j = 0; j < mnh - 1; j++){
        matrix.push([i * nww, j * nwh]);
    }
}

var matrixpid =0;

function style_element(e, o) {
    for (var i in o) {
        e.style[i] = o[i];
    }
}





if(env_isBrowser){
    window[html4_remove_action] = function (itemid) {
        if(document_getElementById(itemid)){
            var item = document_getElementById(itemid);
            if(item.parentNode){
                item.parentNode.removeChild(item);
                for(var i = 0; i < html4_buffer.length; i++){
                    if(html4_buffer[i].id == itemid){
                        html4_buffer.splice(i, 1);
                        setTimeout(function(){
                            html4_rearrange();
                        }, 200)
                    }
                }
            }
        } else {
           html4_rearrange();
        }
    }
}



function replaceItem(item, i){


        var expectedTop = 0.001;
        if(i > 0){
            expectedTop = (i * 84);
        }
        var actualTop = parseFloat(item.style.top.replace('px', ''));
        new Tween(actualTop, expectedTop, 50).onUpdate(function (value) {
             if(+value){
                item.style.top = value + 'px';


             }
        }).start();
}


function html4_rearrange() {
    for(var i = 0; i <  html4_buffer.length; i++) {
        replaceItem(html4_buffer[i].item, i);
    }
}

function html4_notification_build_dom(identifier, title, text, picture, x) {
    html4_notification_pid ++;
   var
        r = document_createElement('div', identifier),
        te = document_createElement('div', 'qntftt'+ html4_notification_pid),
        textElement = document_createElement('div', 'qntftx' + html4_notification_pid),
        w = document_createElement('div', 'qntfw' + html4_notification_pid),
        pictureElement = document_createElement('img', 'qntfim' + html4_notification_pid),
        mxt = (screen_info.height + 200),
        g = ['right', 'left'];

    if(operatingSystem === 'Windows'){
        g = ['left', 'right'];
    }

    style_element(r, {
        position: 'absolute',
        'z-index': '9999999999',
        height: '80px',
        padding: '4px',
        'border-radius' : '2px',
        'box-shadow': '-2px 2px 2px ButtonShadow',
        top: mxt + 'px',
        right: '0px',
        background: 'Menu',
        overflow: 'hidden',
        width: '300px'
    });

    te.innerHTML = '<div style="display: inline; float: '+g[0]+'">' + title
        + '</div><div style="font-weight: bold; display: inline; float: '+g[1]+'; ' +
        'font-size: 12px; font-family: monospace; color: ButtonText; cursor: hand; cursor: pointer" ' +
        'onclick="'+x+'(\''+r.id+'\')">x</div>';

    style_element(te, {'font-family': 'sans-serif', 'font-size': '14px', height: '17px', display: 'block'});
    r.appendChild(te);
    r.appendChild(w);

    var wrapd = '99%';
    if(text){
        textElement.innerHTML = text;
        w.appendChild(textElement);
        style_element(textElement, {'display': 'inline', 'width': '220px', 'font-size': '12px', 'float': 'left'});
    }

    if(picture){
        pictureElement.src = picture;
        w.appendChild(pictureElement);
        style_element(pictureElement, {'display': 'inline', 'width': '54px', 'height': '54px', 'float': 'right'});
    }

    return r;
}

function html4_notification(title, text, picture, lifetime, success, failure, onclick, onclose) {

    if(!env_isBrowser){
        if(failure){
            failure();
        }
        return false;
    }
    var identifier = "qntf" + html4_notification_pid,
        root = html4_notification_build_dom(identifier, title, text, picture, html4_remove_action);
    get_browser_appender().appendChild(root);


    html4_buffer.push({
        id: identifier,
        item: root
    });

    html4_rearrange();


    var action = 'window["'+html4_remove_action + '"](\'' + identifier + '\')';
    root.remove = eval('(function rqmh'+identifier+'(){ return function() { '+action+' }; } )()');

    if(lifetime){
        setTimeout(function () {
            eval(action);
        }, lifetime)
    }

    if(success){
        success(root);
    }
    return root;
};


function html4_window_notification(title, text, picture, lifetime, success, failure, onclick, onclose) {

    if(!env_isBrowser || !getIs().desktop){
        if(failure){
            failure()
        }
        return false;
    }

    matrixpid++;
    if(matrixpid > matrix.length - 1 ){
        matrixpid = 0;
    }
    var expectedTop = matrix[matrixpid][0],
        expectedLeft =  matrix[matrixpid][1],

        a = window.open('', '_blank', 'channelmode=no,menubar=no,status=no,resizable=no,scrollbars=no,location=no,channelmode=no,titlebar=no,toolbar=no,directories=no,fullscreen=no,'
            +  'left='+expectedLeft+',top='+ expectedTop +',width='+nww+',height=' + nwh);

    if(a){
        var pid = util_random_string() + html4_notification_pid,
            closeAction = 'window["' + pid + '"].close();  window[' + incremental_property + ']--;',
            d = a.document;
        html4_notification_pid++;
        window[pid] = a;
        a.remove = 'eval(function rmqwin'+pid+'(){ return function(){ '+closeAction+' } })';

        var root = html4_notification_build_dom('ksk', title, text, picture, '(function(i){window.close();})');
        d.write(root.innerHTML);

        window[incremental_property]++;
        if(lifetime){
            eval('setTimeout(function () { ' + closeAction + '},'+lifetime+');');
        }
        if(success){
            success(a);
        }
        return a;
    }
    if(failure){
        failure()
    }
    return false;
}
