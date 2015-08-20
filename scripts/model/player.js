var player = function(){
    this.currentPos = 0;
    this.eq = document.getElementById('backing');
    this.eq.width = 422;
    this.eq.height = 62;
    this.trackPosInd = document.querySelector('.track');
    this.workingTrack = 0;
};

player.prototype.play = function(){
    var self = this;
    this.timer = setInterval(function(){
        self.updatePos();
    }, 50);
};

player.prototype.updatePos = function(){
    var pos = this.trackPosInd.offsetLeft;
    var getAllTracks = audiocore.manager.tracks;
    for (var i = 0; i < getAllTracks.length; i++){
        var sounds = getAllTracks[i].sounds;
        for (var s = 0; s < sounds.length; s++){
            var currentSound = sounds[s];
            if ((pos >= currentSound.xpos) && ((currentSound.xpos + currentSound.width) >= pos)){
                //sweet spot!!
                currentSound.play();
            } else {
                currentSound.pause();
            }
        }
    }
   // this.trackPosInd.style.left = parseInt(this.trackPosInd.style.left) + 1;
};

player.prototype.stop = function(){

};

player.prototype.pause = function(){

};


player.prototype.getCurrentTrack = function(){
  return window.audiocore.manager.tracks[this.workingTrack];
};

player.prototype.soundBars = function(){
    var ctx = this.eq.getContext('2d');
        ctx.fillStyle = "#EAF3BA";
        for (var i = 0; i < 10; i++){
            ctx.fillRect((10 * i) + 2, 30, 12, 40);
        }
    return this;
};

audiocore.registerInits(function(){
    audiocore.player = new player();
});