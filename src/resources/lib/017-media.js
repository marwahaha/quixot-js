


var SoundPlayer = (function() {

    var directory = '/js/sounds/';
    var soundList = {};

    function getSounds() {
        return soundList;
    }

    function stopAudioInstance(sound) {
        sound.volume = 0;
        sound.pause();
        sound = false;
    }

    function stopAudioElement(domAudioElementId) {
        if (document.getElementById(domAudioElementId)) {
            var audio = document.getElementById(domAudioElementId);
            audio.pause();
            audio.volume = 0;
            document.body.removeChild(audio);
        }
    }


    function createAudioElement(audioId, soundSource) {
        stopAudioElement(audioId);
        var audio = document.createElement('audio');
        audio.id = audioId;
        audio.style.display = 'none';
        audio.setAttribute('autoplay', true);
        var audioSourceMp3 = document.createElement('source');
        audioSourceMp3.src = soundSource + '.mp3';
        var audioSourceOgg = document.createElement('source');
        audioSourceOgg.src = soundSource + '.ogg';
        audio.appendChild(audioSourceMp3);
        audio.appendChild(audioSourceOgg);
        document.body.appendChild(audio);
        return audio;
    }

    /**
     * Play sound attaching a dom element. Name passed in source must be a
     * valid filename  (mp3 and ogg) without extension
     * @param {String} source
     * @param {String} channel
     * @return {undefined}
     */
    function playAttached(source, channel) {
        var audioId = 'audio_';

        if (channel) {
            audioId += channel;
        } else {
            audioId += source;
        }

        var audio = createAudioElement(audioId, directory + source);
        soundList[audioId] = audio;
        audio.volume = 1;
        audio.play();
    }


    /**
     * Play a sound using an Audio instance.
     * Name passed as source must be a valid filename without extension
     * @param {String} source
     * @param {String} channel
     * @return {undefined}
     */
    function playAudioInstance(source, channel) {
        var audio = new Audio(directory + source + '.mp3');

        if (soundList[channel]) {
            stopAudioInstance(soundList[source]);
        }
        if (soundList[source]) {
            stopAudioInstance(soundList[source]);
        }
        if (channel) {
            soundList[channel] = audio;
        } else {
            soundList[source] = audio;
        }
        audio.play();
    }

    /**
     * Sound effect for a private show request
     * @return {undefined}
     */
    function privateShowRequest() {
       
    }

    function privateMessageReceived(){
        
    }

    return {

    };

})();





