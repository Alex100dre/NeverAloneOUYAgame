/**
 * game.js
**/

define(['config','player', 'canvas', 'input', 'platforms'], function(config, player, canvas, input, platforms) {
	function Game() {
		this.canPause =  true;
		this.isPaused =  false;

		this.init = function() {
			player.init();
			
		};

		this.update = function() {
			if(input.gamepad.start && this.canPause){
			    this.canPause = false;
			    this.isPaused = !this.isPaused;
			    console.log('proute');
			}

			if (!input.gamepad.start) {
				this.canPause = true;
			}

			if(this.isPaused === false){
				player.update();
				platforms.update();
			}

		   input.updateGamepadsButtons();
		};

		this.render = function() {
			canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

			player.render();
			platforms.render();
		};
	}
	return new Game();
});