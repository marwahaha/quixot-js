function system_notification(title, text, picture, lifetime, success, failure, onclick, onclose) {

    if(env_isBrowser){
        if(failure){
            failure();
        }
        return false;
    }





    if( envData.javaEnabled && envData.javaPath ){
        var exec = __require('child_process');

        if(!exec){
            if(failure){
                failure();
            }
            return false;
        }

        event_appoint(function () {
            var args = ['-jar',
            '"' + __dirname + '/jentil-cabaret-1.0-jar-with-dependencies.jar"',
            '--notify',
            '"' +title+'"',
                '"' +text+'"',
                '"' + picture + '"', parseInt(lifetime)];
            var command = '"' + envData.javaPath + '" ' + args.join(' ');
            console.log(command);
            exec.exec(command);
        }, 0);



    } else if (failure){
        failure();
    }



}



function cross_notify(title, text, picture, lifetime, success, failure, onclick, onclose) {
    _html5notification(title, text, picture, lifetime, success, function () {
        html4_window_notification(title, text, picture, lifetime, success, function () {
            html4_notification(title, text, picture, lifetime, success, function () {
                system_notification(title, text, picture, lifetime, success, function () {
                    console.log('TODO');
                }, onclick, onclose);
            }, onclick, onclose);
        }, onclick, onclose);
    }, onclick, onclose);
}




