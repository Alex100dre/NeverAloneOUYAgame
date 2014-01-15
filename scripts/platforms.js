/**
 * platforms.js
**/

define(['config', 'canvas', 'player'], function(config, canvas, player) {
    function Platforms(){
        this.boxes = []

        // dimensions
        this.boxes.push({
            x: 0,
            y: 0,
            width: 10,
            height: canvas.canvas.height
        });
        this.boxes.push({
            x: 0,
            y: canvas.canvas.height - 2,
            width: canvas.canvas.width,
            height: 50
        });
        this.boxes.push({
            x: canvas.canvas.width - 10,
            y: 0,
            width: 50,
            height: canvas.canvas.height
        });

        this.update = function(){
           
        }

        this.render = function(){

             for (var i = 0; i < this.boxes.length; i++) {
                console.log(this.boxes[i].x, this.boxes[i].y, this.boxes[i].width, this.boxes[i].height);
                
                canvas.ctx.rect(this.boxes[i].x, this.boxes[i].y, this.boxes[i].width, this.boxes[i].height);
                
            }
        }
    }
    return new Platforms();
});