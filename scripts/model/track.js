var track = function(){
    //lets create the template...
    this.parentElem = document.querySelector('.holder');
    this.element = document.createElement('div');
    this.element.className = "track";
    this.parentElem.appendChild(this.element);
    this.template = new EJS({url: 'templates/track.ejs'}).render();
    this.element.innerHTML += this.template;
    this.sounds = [];
};

track.prototype.addSoundToTrack = function(sound){
    this.sounds.push(sound);
};

track.prototype.play = function(){
	//first we get the current position of the song then play the corrosponding one...
	var currentPos = audiocore.current;

	this.sounds[0].play();
}

