

var Tween = function(start, end, steps, object) {
    var self = this;
    var speed = 100;
    var values = Easing(start, end, steps);
    var count = -1, updateHandlers = [], completeHandlers = [];

//console.log(start, end, steps, values)
    function onUpdate(method) {
        updateHandlers.push(method);
        return this;
    }

    function onComplete(method) {
        completeHandlers.push(method);
        return this;
    }

    function doAnimate() {
        if (count <= values.length) {
            count++;
            for(var i = 0; i < updateHandlers.length; i++){
                updateHandlers[i](values[count]);
            }
            requestAnimationFrame(function () {
                doAnimate();
            }, 10)
            // console.log('calling = ' + values[count], updateHandlers[0].toString());
        } else {
            for(var i = 0; i < completeHandlers.length; i++){
                completeHandlers[i]();
            }
        }
        return this;
    }


    return {
        start: doAnimate,
        onUpdate: onUpdate,
        onComplete: onComplete
    }


};


var Easing = function(firstNumber, secondNumber, steps) {
    if (firstNumber === 0) {
        firstNumber = .001;
    }

    var arai = new Array();
    var fixunit = secondNumber - firstNumber;
    var unit = fixunit / steps;
    for (var i = 0; i < steps + 1; i++) {
        arai.push(firstNumber.toFixed(4));
        firstNumber += unit;
    }

    return arai;
};



