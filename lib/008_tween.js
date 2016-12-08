quixot.Tween = function(start, end, steps, object) {
    var self = this;
    var speed = 100;
    var values = Easing(start, end, steps);
    var count = 0;

    this.onUpdate = function(value, object) {
    };

    this.onComplete = function(object) {
    };

    this.start = function() {
        doAnimate();
    };

    var updateEvent = new UpdateEvent(speed);

    function doAnimate() {
        if (values[count]) {
            count++;
            if (self.onUpdate) {
                self.onUpdate(values[count], object);
            }
            updateEvent.start(doAnimate);
        } else {
            if (self.onComplete) {
                self.onComplete(object);
                updateEvent.stop();
            }
        }
    }
};



quixot.TweenMulti = function(startObjectProps, endObjectProps, steps, object) {
    var self = this;
    var speed = 100;
    if (BrowserDetect.browser === 'Explorer') {
        steps = Math.round(steps / 2);
    }

    var valuesContainer = [];
    var result = {};
    for (var i in startObjectProps) {
        var value = Easing(startObjectProps[i], endObjectProps[i], steps);
        result[i] = startObjectProps[i];
        valuesContainer.push(value);
    }

    var count = 0;
    this.onUpdate = function(object) {
    };
    this.onComplete = function(object) {
    };
    this.start = function() {
        doAnimate();
    };
    var updateEvent = new UpdateEvent(speed);
    var allowUpdate = false;
    function doAnimate() {
        var num = -1;
        count++;
        for (var i in result) {
            num++;
            if (valuesContainer[num][count]) {
                result[i] = valuesContainer[num][count];
                allowUpdate = true;
            } else {
                allowUpdate = false;
            }

        }

        if (allowUpdate) {
            if (self.onUpdate) {
                self.onUpdate(result);
            }
            updateEvent.start(doAnimate);
        } else {
            if (self.onComplete) {
                self.onComplete(result);
            }
        }
    }
};





quixot.Easing = function(firstNumber, secondNumber, steps) {
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



