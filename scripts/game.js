/**
 * game.js
**/

define(['config','player', 'canvas', 'input', 'platforms'], function(config, player, canvas, input, platforms) {
	function Game() {
		this.init = function() {
			player.init();
			
		};

		this.update = function() {
			input.updateGamepadsButtons();
			player.update();
			platforms.update();
		};

		this.render = function() {
			canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

			player.render();
			platforms.render();
		};
	}
	return new Game();
});