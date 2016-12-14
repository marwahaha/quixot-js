

function _styleElement(element, obj) {
    for(var i in obj){
        element.style[i] = obj[i];
    }
}

var _html4notification_pid = 0;


function _getAppender() {
    return document.body;
}

var html4buffer = [];
var __html4notifyRemove = randomString() + incr();

if(__isbrowser()){

    window[__html4notifyRemove] = function (itemid) {

        if(document.getElementById(itemid)){
            var item = document.getElementById(itemid);
            if(item.parentNode){
                item.parentNode.removeChild(item);
                for(var i = 0; i < html4buffer.length; i++){
                    if(html4buffer[i].id == itemid){
                        html4buffer.splice(i, 1);

                        setTimeout(function(){
                            rearrangehtml4();
                        }, 200)
                    }
                }


            }
        } else {
           rearrangehtml4();
        }





    }
}



function replaceItem(item, i){
       var expectedTop = (i * 80) + 5, actualTop = parseFloat(item.style.top.replace('px', ''));
        new Tween(actualTop, expectedTop, 50).onUpdate(function (value) {
             if(+value){
                item.style.top = value + 'px';
             }

        }).start();
}


function rearrangehtml4() {
    for(var i = 0; i <  html4buffer.length; i++) {
        replaceItem(html4buffer[i].item, i);
    }
}

function _html4notification(title, text, picture, lifetime, success, failure, onclick, onclose) {

    if(!__isbrowser()){
        if(failure){
            failure();
        }
        return false;
    }

    var d = document,
        root = d.createElement('div'),
        titleElement = d.createElement('div'),
        textElement = d.createElement('div'),
        wrapper = d.createElement('div'),
        pictureElement = d.createElement('img'),
        maxtop = (screen_info.height + 200);

        identifier = "qntf" + _html4notification_pid,
        root.id = identifier,
        wrapper.id = "qntfwrp" + _html4notification_pid,
        titleElement.id = "qntftt"+ _html4notification_pid,
        textElement.id = "qntftxt"+ _html4notification_pid,
        pictureElement.id = "qntftxt"+ _html4notification_pid;


    _styleElement(root, {
        position: 'absolute',
        'z-index': '9999999999',
        height: '80px',
        padding: '4px',
        'border-radius' : '2px',
        'box-shadow': '-2px 2px 2px ButtonShadow',
        top: maxtop + 'px',
        right: '0px',
        background: 'Menu',
        overflow: 'hidden'
    });

    _styleElement(titleElement, {
        'font-family': 'sans-serif', 'font-size': '14px', 'text-align':'right', 'display': 'block', 'height': '18px'
    })


    var floats = ['right', 'left'];

    if(operatingSystem === 'Windows'){
        floats = ['left', 'rigth'];
    }
    titleElement.innerHTML = '<div style="display: inline; float: '+floats[0]+'">' + title
        + '</div><div style="font-weight: bold; display: inline; float: '+floats[1]+'; ' +
        'font-size: 12px; font-family: monospace; color: ButtonText; cursor: hand; cursor: pointer" ' +
        'onclick="'+__html4notifyRemove+'(\''+root.id+'\')">x</div>';
    root.appendChild(titleElement);
    var wrapd = '99%';
    if(text){
        textElement.innerHTML = text;
        wrapper.appendChild(textElement);
    }

    if(picture){
        pictureElement.src = picture;
        wrapper.appendChild(pictureElement);
    }

    if(text && picture){
        wrapd = '49%';
    }


    var prp = {
        'display': 'inline',
        'width': wrapd,
        'font-size': '12px'
    }, fltx = 'f'+'lo'+'at'; prp[fltx] = 'left';
    _styleElement(textElement, prp), prp[fltx] = 'right';
    _styleElement(pictureElement, prp);

    root.appendChild(wrapper);
    _getAppender().appendChild(root);


    html4buffer.push({
        id: identifier,
        item: root
    });

    rearrangehtml4();

    _html4notification_pid++;
      var action = 'window["'+__html4notifyRemove + '"](\'' + identifier + '\')';

    root.remove = eval('(function __rmhtml4_'+identifier+'(){ return function() { '+action+' }; } )()');

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

var incrprop = '___qwincrprop' + randomString(),
    nww = 200, nwh = 100,
    mnw = Math.round(screen_info.width / nww),
    mnh = Math.round(screen_info.height / nwh),
    mnmax = mnw > mnh ? mnv : mnh,
    matrix = [];



window[incrprop] = 0;

for(var i = 0; i < mnw; i++){
    for(var j = 0; j < mnh - 1; j++){
        matrix.push([i * nww, j * nwh]);
    }
}

var matrixpid =0;






function _html4Winotification(title, text, picture, lifetime, success, failure, onclick, onclose) {

    if(!__isbrowser() || !getIs().desktop){
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
        var pid = randomString() + _html4notification_pid,
            closeAction = 'window["' + pid + '"].close();  window[' + incrprop + ']--;',
            d = a.document;
        _html4notification_pid++;
        window[pid] = a;
        a.remove = 'eval(function __rmvwin_'+pid+'(){ return function(){ '+closeAction+' } })';


        d.write(title + text);

        window[incrprop]++;
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


