
function time_interval(n, s) {
    switch(s+''.toLowerCase()) {
        case 'nano':
            return n;
        case 'seconds':
        case 'second':
            return n * 1000;
        case 'minutes':
        case 'minute':
            return n * time_interval(60, 'seconds');
        case 'hour':
        case 'hours':
              return n * time_interval(60, 'minute');
        case 'day':
        case 'days':
            return n * time_interval(24, 'hour');
        case 'month':
        case 'months':
              return n * time_interval(30, 'day');
        case 'year':
        case 'years':
              return n * time_interval(365, 'day');

    }

    return 0;
}


function time_date_add(d, n, s){
    if(util_isDate(d) && util_isNumber(n) && s){
        d.setTime(d.getTime() + time_interval(n, s));
    }

    if(util_isDate(d) && util_isNumber(n) && !s){
        d.setTime(d.getTime() + n);
    }
    return d;
}

function time_date_roll(d, n, s){
    if(util_isDate(d) && util_isNumber(n) && s){
        d.setTime(d.getTime() - time_interval(n, s));
    }

    if(util_isDate(d) && util_isNumber(n) && !s){
        d.setTime(d.getTime() - n);
    }
    return d;
}


function date_to_string(d, m) {
    if(m === 'cookie'){
        if(d.toUTCString){
            return d.toUTCString();
        }

        if(d.toGMTString){
            return d.toGMTString();
        }

        if(d.toString()){
            return d.toString();
        }

        return d+'';
    }
}


function date_Diff(l,r) {
    if(l.getTime && r.getTime){
        return l.getTime() - r.getTime();
    }
    return 0;
}


function time_next_date() {
    var _date = new Date();
    while(date_Diff(_date, last_used_date) <=0 ){
        time_date_add(_date, 1);
    }

    last_used_date = _date;
    return _date;
}