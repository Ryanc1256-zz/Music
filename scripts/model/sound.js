var Sound = function(track, src){
    var self = this;

    this.parentElem = track;
    this.player = Object.create(WaveSurfer);
    this.track = src;

    this.element = document.createElement('div');
    this.element._id = audiocore.guid++;
    this.element.className = 'sound';
    this.element.style.width = '300px';

    this.wave = document.createElement("div");
    this.wave.className = "waveformat";
    this.element.appendChild( this.wave );

    this.player.init({
        container: this.wave,
        waveColor: 'orange',
        progressColor: '#945df8',
        interact: false,
        hideScrollbar: true,
        height: 61,
        fillParent: true
    });

    this.player.on("ready", function(){
        self.duration = self.player.getDuration();
        self.width = self.duration * 10;
        self.element.style.width = self.width + 'px';
        self.wave.width = self.width;
        self.updatePos();
        self.player.drawBuffer();
    });

    this.player.load( src );

   

   

    

    this.handleLeft = document.createElement('div');
    this.handleRight = document.createElement('div');
    this.handleLeft.className = 'left handle';
    this.handleRight.className = 'right handle';

    this.handleRightCorner = document.createElement('div');
    this.handleLeftCorner = document.createElement('div');
    this.handleLeftCorner.className = 'left handle';
    this.handleRightCorner.className = 'right handle';

    this.handleRight.appendChild(this.handleRightCorner);
    this.handleLeft.appendChild(this.handleLeftCorner);


    this.element.appendChild(this.handleLeft);
    this.element.appendChild(this.handleRight);

    this.element.addEventListener('mousedown', function(e){
        self.clickOffset = e.offsetX;
        self.mousedown = true;
        return false;
    });

    this.handleLeft.addEventListener('mousedown', function(e){
        e.preventDefault();
        e.stopPropagation();
        self.resize = true;
        self.type = 'left';
        //stretch music
    });

    this.handleRight.addEventListener('mousedown', function(e){
        e.preventDefault();
        e.stopPropagation();
        self.resize = true;
        self.type = 'right';
        //stretch music
    });

    this.handleRightCorner.addEventListener('mousedown', function(e){
        e.preventDefault();
        e.stopPropagation();
        //fade music
    });

    this.handleLeftCorner.addEventListener('mousedown', function(e){
        e.preventDefault();
        e.stopPropagation();
        //fade music
    });



    window.addEventListener('mouseup', function(){
        self.mousedown = false;
        self.resize = false;
        self.type = null;
        return false;
    });

    window.addEventListener('mousemove', function(e){
        if (self.mousedown){
            self.element.style.left = (Math.ceil(e.pageX) - 400) - self.clickOffset;
        } else if (self.resize){
            if (self.type == 'left'){
                var beforeLeft = parseInt(self.element.style.left);
                var left = (Math.ceil(e.pageX) - 400);
                self.element.style.left = left;
                self.element.style.width = parseInt(self.element.style.width) + (beforeLeft - left);
            } else if (self.type == 'right'){
                self.element.style.width = (e.pageX - 400) - self.element.offsetLeft;
            }
        }
        self.updatePos();
        return false;
    });
    this.parentElem.element.querySelector('.trackInner').appendChild(this.element);
};

/**
 * Gets the current position of the sound track...
 * @returns {{x: number, y: number}|Sound}
 */
Sound.prototype.getPosition = function(){
    var pos = {
        x: this.element.offsetLeft,
        y: this.element.offsetTop
    };
    return pos || this;
};

/**
 * Updates the position of the element
 * @returns {Sound}
 */
Sound.prototype.updatePos = function(){
    this.xpos =  this.element.offsetLeft;
    return this;
};

/**
 * Sets the time...
 * @param time
 * @returns {Sound}
 */
Sound.prototype.scrub = function(time){
    this.player.currentTime = parseInt(time);
    return this;
};


/**
 * Adds data to the sound track...
 * @param data
 * @returns {Sound}
 */
Sound.prototype.addData = function(data){
    this.data = data;
    return this;
};

/**
 * Play the sounds
 * @returns {Sound}
 */
Sound.prototype.play = function(){
    if ( !this.player.isPlaying() ){
        this.player.play();
    }
   return this;
};

/**
 * Pause the sounds
 * @returns {Sound}
 */
Sound.prototype.pause = function(){
    this.player.pause();
    return this;
};
