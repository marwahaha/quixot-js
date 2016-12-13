

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
         var expectedTop = (i * 80), actualTop = parseFloat(item.style.top.replace('px', ''));
//         console.log(item.id, actualTop, expectedTop, item.style.top);

        new Tween(actualTop, expectedTop, 50).onUpdate(function (value) {
                         if(+value){

                            item.style.top = value + 'px';
         //                    _styleElement(item, {
         //                        top: value + 'px'
         //                    });
                           //  console.log('animate ' + item.id+ " " + value)

                         }

                     }).start();
}


function rearrangehtml4() {

    for(var i = 0; i <  html4buffer.length; i++) {

    replaceItem(html4buffer[i].item, i);




       // if(actualTop != expectedTop) {

      //  }
//         console.log(html4buffer.length, actualTop,expectedTop)
    }

}

function _html4notification(title, text, picture, lifetime, href) {

    if(!__isbrowser()){
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

    root.remove = eval('(function rnmd'+identifier+'(){ console.log("removing"); return function() { '+action+' }; } )()');
    return root;
};


function _html4Winotification(title, text, picture, lifetime, href) {

    if(!__isbrowser() || !getIs().desktop){
        return false;
    }

    var position = 'left=0,top=10,width=200,height=100';
    var a = window.open('', '_blank', 'channelmode=yes,menubar=no,status=no,resizable=no,scrollbars=no,location=no,channelmode=no,titlebar=no,toolbar=no,directories=no,fullscreen=no,'+ position)

    if(a){
        var d = a.document;
        d.write(title + text);
    }

    return a;
}


