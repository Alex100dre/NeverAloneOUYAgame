/**
 * game.js
**/

define(['config','player', 'canvas', 'input'], function(config, player, canvas, input) {
	function Game() {
		this.init = function() {
			player.init();
			
		};

		this.update = function() {
			input.updateGamepadsButtons();
			player.update();
		};

		this.render = function() {
			canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

			player.render();
		};
	}
	return new Game();
});