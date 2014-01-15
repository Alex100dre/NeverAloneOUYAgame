/**
 * player.js
**/

define(['config', 'canvas', 'player'], function(config, canvas, player) {
	var resolutionX = 640, resolutionY = 480;
	var scrollX = 0, scrollY = 0;

	init = function(){

	};

	folowPlayer = function(){	
		// Scroll horizontally if required
		if (player.x + this.scrollX > this.resolutionX / 2 && player.velX > 0)
			this.scrollX -= Math.floor(player.velX);
		if (PlayerX + this.scrollX < this.resolutionX / 2 && player.velX < 0)
			this.scrollX -= Math.floor(player.velX);
		if (this.scrollX > 0)
			this.scrollX = 0;
		if (this.scrollX - this.resolutionX < -MapWidth * 32)
			this.scrollX = (-MapWidth * 32) + this.resolutionX;
	}

	return new Camera();
});