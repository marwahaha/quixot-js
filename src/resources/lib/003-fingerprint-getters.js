
for(var i = 0; i < evilUators.length; i++) {
    try {
        var e = evilUators[i], r;
        r = eval(e);
        p = util_objKeys(r), k, c;
        for(k = 0; k < p.length; k++) {
            c = p[k];
            if(evilutor_line.indexOf(c) < 0) {
                evilutor_line.push(c);
            }
        }
    } catch (e){
      ;;
    }
}

fingerPrintData.rm += evilutor_line.join('');

function fingerprint_text() {
    var t = '';
    for(var i in fingerPrintData){
        t += i + (fingerPrintData[i]);
    }
    return t;
}



function fingerprint_identifier() {
    var text = fingerprint_text().split(''), 
        resp = '', lasnum = 2,
        alphas = [], nums = [], 
        others = [], 
        escapes = '_,{}[]\/-|=()+#.;'.split(''),
        eObj = {},
        cnt1 = 0, i = 0, c, mind;
    for(i = 0 ; i < escapes.length; i++) {
        eObj[escapes[i]] = 2;  /** TODO modify this **/
    }
    
    for(i = 0; i < text.length; i++) {
        c = text[i];
        if(c === ' ' || c === '\n' || c === '\t') {
            continue;
        }
        if(escapes.indexOf(c) > -1) {
            resp+=util_atos(eObj[c]);
            eObj[c]++;
            continue;
        }
        if(util_isAlpha(c)) {
            if(i % 2 == 0) {
                resp+=c;
            } else {
                resp = c+resp;
            }
        } else {
            if(+c) {
                lasnum = parseInt(c);
            }
            mind = math_round(resp.length / lasnum);
            resp = resp.substring(0, mind) + c + resp.substring(mind, resp.length);
        }
    }
    return resp;
}



function fingerprint_numbers(){
    var t = fingerprint_text().split(''), n = '';
    for( var i = t.length ; i > 0; i--){
        var c = t[i];
        if(+c || c === '0') {
            n+=c;
        }
    }
    return n;
}


function fingerprint_data() {
    return fingerPrintData;
}

