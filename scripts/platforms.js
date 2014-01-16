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
            width: 200,
            height: 50
        });
        this.boxes.push({
            x: 0,
            y: canvas.canvas.height - 120,
            width: 50,
            height: 50
        });
        this.boxes.push({
            x: canvas.canvas.width - 200,
            y: 0,
            width: 100,
            height: 50
        });

        this.update = function(){
           
        }

        this.render = function(){

             for (var i = 0; i < this.boxes.length; i++) {
                //console.log(this.boxes[i].x, this.boxes[i].y, this.boxes[i].width, this.boxes[i].height);
                canvas.ctx.fillStyle = "black";
                canvas.ctx.fillRect(this.boxes[i].x, this.boxes[i].y, this.boxes[i].width, this.boxes[i].height);
                canvas.ctx.save();
                
            }
        }
    }
    return new Platforms();
});