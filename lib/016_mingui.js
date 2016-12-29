


var _fullscreenmethods = (function () {


   var REQUEST_FULLSCREEN_FUNCS = {
       'requestFullscreen': {
           'change': 'onfullscreenchange',
           'request': 'requestFullscreen',
           'error': 'onfullscreenerror',
           'enabled': 'fullscreenEnabled',
           'cancel': 'exitFullscreen',
           'fullScreenElement': 'fullscreenElement'
       },
       'mozRequestFullScreen': {
           'change': 'onmozfullscreenchange',
           'request': 'mozRequestFullScreen',
           'error': 'onmozfullscreenerror',
           'cancel': 'mozCancelFullScreen',
           'enabled': 'mozFullScreenEnabled',
           'fullScreenElement': 'mozFullScreenElement'
       },
       'webkitRequestFullScreen': {
           'change': 'onwebkitfullscreenchange',
           'request': 'webkitRequestFullScreen',
           'cancel': 'webkitCancelFullScreen',
           'error': 'onwebkitfullscreenerror',
           'fullScreenElement': 'webkitCurrentFullScreenElement'
       },
       'MSRequestFullScreen': {
           'change': 'MSFullscreenChange',
           'request': 'MSRequestFullScreen',
           'cancel': 'MSCancelFullScreen',
           'error': 'MSFullscreenError',
           'fullScreenElement': 'MSCurrentFullScreenElement'
       },
       'msRequestFullScreen': {
           'change': 'msFullscreenChange',
           'request': 'msRequestFullscreen',
           'cancel': 'msExitFullscreen',
           'error': 'msFullscreenError',
           'fullScreenElement': 'msCurrentFullScreenElement'
       }
   };

   var fullScreenMethods = false;

   if(typeof window == 'undefined') {
       return fullScreenMethods;
   }

   var TEST_NODE = document.createElement('div');



   for (var prop in REQUEST_FULLSCREEN_FUNCS) {
       var currentTest = REQUEST_FULLSCREEN_FUNCS[prop];
       for (var item in currentTest) {
           var name = currentTest[item];
           if (document[name]) {
               if (!fullScreenMethods) {
                   fullScreenMethods = {};
               }
               fullScreenMethods[item] = name;
           }

           if (TEST_NODE[name]) {
               if (!fullScreenMethods) {
                   fullScreenMethods = {};
               }
               fullScreenMethods[item] = name;
           }


           if (name in TEST_NODE) {
               if (!fullScreenMethods) {
                   fullScreenMethods = {};
               }
               fullScreenMethods[item] = name;
           }

           if (name in document) {
               if (!fullScreenMethods) {
                   fullScreenMethods = {};
               }
               fullScreenMethods[item] = name;
           }
       }
   }


   return fullScreenMethods;

})();





