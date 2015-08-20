/**
 * The initialize for the volume track
 * @param element
 */
var volumeTrack = function(element){
    var self = this;
    self.element = element;
    self.mousedown = false;
    element.addEventListener('mousedown', function(e){
        self.mousedown = true;
        self.start = {
            x: e.offsetX,
            y: e.offsetY
        };
    }, false);

    document.addEventListener('mouseup', function(){
        self.mousedown = false;
    }, false);

    element.parentElement.parentElement.addEventListener('mousemove', function(e){
        if (self.mousedown){
            if (e.offsetX <= 100){
                self.element.style.left = e.layerX + '%';
            }
        }
    }, false);
};