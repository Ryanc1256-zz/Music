/**
 * Does all the initialising of the timetrack
 * @param element
 */
var timetrack = function(element){
    this.element = element;
    this.handle = this.element.children[0];
    this.handle.style.left = 372;
    this.addEvents();
};

timetrack.prototype.addEvents = function(){
    var self = this;
    this.element.addEventListener('click', function(e){
        self.changePos({x: e.offsetX, y: e.offsetY});
    }, false);

    this.handle.addEventListener('mousedown', function(e){
        self.mousedown = true;
        self.mouseoffset = e.offsetX;
    }, false);

    window.addEventListener('mouseup', function(){
        self.mousedown = false;
    }, false);

    window.addEventListener('mousemove', function(e){
        if (self.mousedown){
            self.handle.style.left = e.pageX - self.mouseoffset;
        }
    }, false);
};

/**
 * Cahnges the position of the handle...
 * @param pos
 * @returns {timetrack}
 */
timetrack.prototype.changePos = function(pos){
    var middle = this.handle.offsetWidth / 2;
    if (pos){
        this.handle.style.left = ((pos.x - middle) - 1) + 'px'; //minus 1 due to a tiny offset
    } else {
        //pos will be a int to increment the track a bit...
        this.handle.style.left = parseInt(this.handle.style.left) + pos + 'px';
    }
    return this;
};