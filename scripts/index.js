var shiftkey = false;
var ctrlkey = false;
var callbacks = [];

function init(){
    //lets add all the cool stuff to the ui
    var sound = document.querySelectorAll('.holder .main .sound .handle');
    for (var i = 0; i < sound.length; i++){
        new volumeTrack(sound[i]);
    }
    new timetrack(document.querySelector('.timetrack'));
    addEvents();
    applyInits();
}

function addEvents() {
    window.addEventListener('keydown', function(e){
        if (e.which == 16){
            shiftkey = true;
        } if (e.which == 17) {
             ctrlkey = true;
        } else {
          if (shiftkey && e.which == 78){
              e.preventDefault();
              e.stopPropagation();
              audiocore.manager.addTrack(new track());
          }
        }
    }, false);

    $(".play").on("click", function(){
        audiocore.player.play();
    });


    window.addEventListener('keyup', function(e){
        if (e.which == 16){
            shiftkey = false;
        } if (e.which == 17) {
            ctrlkey = false;
        }
    }, false);

    window.addEventListener('drop', function(e){
        e.preventDefault();
        e.stopPropagation();
        var files = e.target.files || e.dataTransfer.files;
        for (var i = 0; i < files.length; i++){
            var file = files[i];
            var reader = new FileReader();
                reader.onload = (function(file){
                    return function(res){
                        var dataURL = res.target.result;
                        var track = audiocore.player.getCurrentTrack();
                        track.addSoundToTrack(new Sound(track, dataURL).addData(file));
                    }
                })(file);
                reader.readAsDataURL(file);
        }
    });

    window.addEventListener('dragover', function(e){
        e.preventDefault();
        e.stopPropagation();
    });
    window.addEventListener('dragleave', function(e){
        e.preventDefault();
        e.stopPropagation();
    });
}

function registerInits(cb){
    if (typeof cb == 'function'){
        callbacks.push(cb);
    }
}

function applyInits(){
    var cbLength = callbacks.length;
    for (var i = 0; i < cbLength; i++){
        callbacks[i]();
    }
}

window.audiocore = {
    guid: 0,
    init: init,
    addEvents: addEvents,
    registerInits: registerInits
};
document.addEventListener('DOMContentLoaded', init, false);