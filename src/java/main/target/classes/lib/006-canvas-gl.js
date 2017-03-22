var webGL = false;

if (env_isBrowser) {
    try {
        var canvas = document_createElement('canvas');

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

        webGL =  (!!browser_window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ) );

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


                fingerPrintData.rm+=util_objKeys(webGL).join('');
            } catch (e) {
                fingerPrintData._errs.push(e+'');
            }
        }


    } catch(e) {
        fingerPrintData._errs.push(e+'');
        webGL = false;
    }

}