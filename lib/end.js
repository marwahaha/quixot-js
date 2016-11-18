(function closeLib(window, quijot){

    var fingerPrint = quijot.getFingerPrintData();
    //get computer name for IE
    fingerPrint.computerName = (function getComputerName() {
        var cname = '[unk]';
        try {
            var network = new ActiveXObject('WScript.Network');
            cname = (network.computerName);
            quijot.computerName = cname;
        }
        catch (e) {
            cname = '[erunk]';
            quijot.computerName = false;
        }
        return cname;
    })();





    var evilUators = [
        'new File([],[])',
        'new AnimationEvent(1)',
        'new WebKitCSSMatrix()',
        'document.createElement(\'canvas\')',
        'document.createElement(\'video\')',
        'document.createElement(\'svg\')',

        'document.createElement(\'rect\')',
        'document.createElement(\'audio\')',
        'quixot._getGL()'
    ];

    fingerPrint.jsConstructors = '';
     var line = [];

    for(var i = 0; i < evilUators.length; i++) {
        console.log('about to test the evil bith: ' + evilUators[i]);

       line.push(evilUators[i] );

        try {
            var result = eval(evilUators[i]),
            props = quijot.objKeys(result);

            for(var k = 0; k < props.length; k++) {
                var currentKey = props[k];
                if(line.indexOf(currentKey) < 0) {
                    line.push(currentKey);
                }
            }
        } catch (e){
            console.log(e);
        } finally {
//
        }
    }

    fingerPrint.jsConstructors += line.sort().join(',');

    console.log(line);
   


//    console.log(fingerPrint.jsConstructors);
//

    quijot.evilUators = evilUators;

    quijot.fingerprint = function () {
        var text = '';
        var obj = quixot.getFingerPrintData();

        for(var i in quixot.getFingerPrintData()){
            text += i + (quixot.getFingerPrintData()[i]);
        }
        return text;
    }
})(window, quixot);


