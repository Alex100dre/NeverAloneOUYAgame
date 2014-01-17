/**
 * stage.js
**/

define(['canvas', 'IM', 'camera'], function(canvas, IM, camera) {
	
	var Stage = function(o) {
		if ('object' !== typeof o) throw new Error('o must be an object');
		if (!o.hasOwnProperty('backgrounds')) throw new Error('o.backgrounds must be specified');
		if (!o.hasOwnProperty('platforms')) throw new Error('o.platforms must be specified');

		this.backgrounds = o.backgrounds;
		this.backgroundImages = [];
		this.platforms = o.platforms;
		this.position = {
			x : 0,
			y : 0
		};
		/*this.width = o.backgrounds.length * canvas.canvas.width;
		this.height = canvas.canvas.height;*/
		this.img;
	};

	Stage.prototype.init = function(Collider) {
		Collider.resetBodies();
        // Ajout des bodies (pour les collisions) en fonction des plates-forme
        var b;
        for (var i = 0, c = this.platforms.length; i < c; i++) {
            b = this.platforms[i];
            Collider.addBody(b.x, b.y, b.width, b.height);
        }

        // Récupération des instances images
        for (var i = 0, c = this.backgrounds.length; i < c; i++) {
            b = this.backgrounds[i];
            this.backgroundImages[i] = IM.getInstance(b);
        }

        // Image de test
        this.img = IM.getInstance('assets/images/bg1');
        this.width =  this.img.width;
        this.height =  this.img.height;
	};

	Stage.prototype.update = function() {
		
	};

	Stage.prototype.render = function() {
		canvas.ctx.drawImage(this.img.data, this.position.x - camera.x, this.position.y);
	};

	return Stage;

});