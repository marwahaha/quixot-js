
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
    if(d.getTime && d.setTime){
        d.setTime(d.getTime() + time_interval(n, s));
    }
    return d;
}

function time_date_roll(d, n, s){
    if(d.getTime && d.setTime){
        d.setTime(d.getTime() - time_interval(n, s));
    }
    return d;
}
