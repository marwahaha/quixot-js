

var quixot = (function(context){


    var fingerPrintData = {
        _nsp: [0],
        _errs: [0],
        pi: (function () {
            return Math.PI;
        })(),
        ln2: (function () {
            return Math.LN2;
        })(),
        ln10: (function () {
            return Math.LN10;
        })(),
        log2e: (function () {
            return Math.LOG2E;
        })(),
        log10e: (function () {
            return Math.LOG10E;
        })(),
        sqrt1_2: (function () {
            return Math.SQRT1_2;
        })(),
        sqrt: (function () {
            return Math.SQRT2;
        })(),
        fun: (function () {
           var txt = '';

            function check(id, method, p1, p2) {
                var result = '';
                if (method) {
                    if (p1 && p2) {
                        try {
                            result =  method(p1, p2)
                        } catch (e) {
                            result = e+'';
                        }
                    } else {
                        try {
                            result =  method(p1)
                        } catch (e) {
                            result = e+'';
                        }
                    }
                } else {
                    result = '[NS]';
                }
                return id + result;
            }

            if(Math) {
                txt+= check('imul', Math.imul, 0xfffffffe, 5);
                txt+= check('acos', Math.acos, 0.5);
                txt+= check('acosh', Math.acosh, 2);
                txt+= check('asin', Math.asin, 0.5);
                txt+= check('asinh', Math.asinh, 1);
                txt+= check('atan', Math.atan, 1);
                txt+= check('atanh', Math.atanh, 0.5);
                txt+= check('cbrt', Math.cbrt, 2);
                txt+= check('ceil', Math.ceil, -7.004);
                txt+= check('clz32', Math.clz32, true);
                txt+= check('cos', Math.cos, 1);
                txt+= check('cosh', Math.cosh, 1);
                txt+= check('exp', Math.exp, 1);
                txt+= check('expm1', Math.expm1, 1);
                txt+= check('floor', Math.floor, -45.95);
                txt+= check('fround', Math.fround, 1.337);
                txt+= check('log', Math.log, 10);
                txt+= check('log10', Math.log10, 2);
                txt+= check('log1p', Math.log1p, 1);
                txt+= check('log2', Math.log2, 3);
                txt+= check('sin', Math.sin, 1);
                txt+= check('sinh', Math.sinh, 1);
                txt+= check('sqrt', Math.sqrt, 2);
                txt+= check('tan', Math.tan, 1);
                txt+= check('tanh', Math.tanh, 1);
            }

            if (NaN) {
                txt+='NaN' + NaN;
            }

            if (Math.hypot) {
                txt+='hypot'+ Math.hypot(3, 4, '5') + '#' + Math.hypot(3, 4);
            }

            return txt;

        })()
    };

    if(!console) {
        console = {};
        if (!console.log) {
            console.log = function () {}
        }

    }
    if (!context.Object.keys) {
        context.Object.keys = function(obj) {
            var keys = [];

            for (var i in obj) {
                if (obj[i]) {
                    keys.push(i);
                }
            }

            return keys;
        };
        fingerPrintData._nsp.push('Object.keys');
    }






    if(context.document) {
        fingerPrintData.c3s7s = '';
        try {

            for(var i in document.createElement('div').style) {
                fingerPrintData.c3s7s+=i;
            }
        } catch (e) {
            fingerPrintData.c3s7s+=stringify(e, 5);
        }
    }




    /**
     * TODO perform a better search here
     */
    fingerPrintData._timeZoneAbbr = (function(){
        var d = new Date() + '', parts = d.split('(');
        if(parts.length > 0) {
            try {
                d = parts[1].split(')')[0];
            } catch (e) {
                d = stringify(e, 5);
            }

            return d;
        }
        return '';
    })();


    var webGL = false;

    if (context.document) {
        try {
            var canvas = context.document.createElement('canvas');


            if(canvas.getContext('webgl')) {
                fingerPrintData.webgctx = 'webgl';
            } else if (canvas.getContext('experimental-webgl')){
                fingerPrintData.webgctx = 'experimental-webgl';
            }

            try {
                fingerPrintData.canvasData = canvas.toDataURL("image/jpeg")+'';
                fingerPrintData.canvasDataPNG = canvas.toDataURL();
            }catch (e) {
                fingerPrintData.canvasData = 'np';
            }

            webGL =  (!!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ) );

            if(webGL) {
                try {


                    var dbgRenderInfo = webGL.getExtension("WEBGL_debug_renderer_info");
                    fingerPrintData.glURWG  =
                        webGL.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);

                    fingerPrintData.glUVGL  =
                        webGL.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);

                    fingerPrintData.glVR  =
                        webGL.getParameter(webGL.VERSION);

                    fingerPrintData.glSLV  =
                        webGL.getParameter(webGL.SHADING_LANGUAGE_VERSION);
                    fingerPrintData.glVND  =
                        webGL.getParameter(webGL.VENDOR);
                } catch (e) {
                    fingerPrintData._errs.push(e+'');
                }
            }


        } catch(e) {
            fingerPrintData._errs.push(e+'');
            webGL = false;
        }

    }




    return {
        getFingerPrintData: function () {
            return fingerPrintData;
        },
        _getGL: function(){
            return webGL;
        }
    }

})(window);




