/**
 * platforms.js
**/

define(['config', 'canvas', 'player'], function(config, canvas, player) {
    function Platforms(){
        this.boxes = []

        this.init = function(Collider) {

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

            this.boxes.push({
                x: canvas.canvas.width / 2,
                y: canvas.canvas.height - 250,
                width: 500,
                height: 35
            });
            this.boxes.push({
                x: 400,
                y: canvas.canvas.height - 375,
                width: 100,
                height: 35
            });

            this.boxes.push({
                x: canvas.canvas.width / 5,
                y: canvas.canvas.height - 150,
                width: 150,
                height: 35
            });

            // Ajout des bodies (pour les collisions) en fonction des boxes ci-dessus
            var b;
            for (var i = 0, c = this.boxes.length; i < c; i++) {
                b = this.boxes[i];
                Collider.addBody(b.x, b.y, b.width,b.height);
            }
        }

        this.update = function(){
            
        }

        this.render = function(){

            var b;
             for (var i = 0; i < this.boxes.length; i++) {
                b = this.boxes[i];
                //console.log(b.x, b.y, b.width, b.height);
                canvas.ctx.fillStyle = "cyan";
                canvas.ctx.fillRect(b.x, b.y, b.width, b.height);
                // canvas.ctx.save();
                
            }
        }
    }
    return new Platforms();
});