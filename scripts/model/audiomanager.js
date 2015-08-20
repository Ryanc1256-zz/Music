(function(){
    var manager = function(){
        this.tracks = [];
    };
    manager.prototype.addTrack = function(track){
        this.tracks.push(track);
    };

    manager.prototype.play = function(){
        for (var i = 0; i < this.tracks.length; i++){
            this.tracks[i].play();
        }
    };

    manager.prototype.stop = function(){

    };

    manager.prototype.pause = function(){

    };

    manager.prototype.removeTrack = function(){

    };
    window.audiocore.manager = new manager();
})();

