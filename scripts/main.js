/**
 * main.js
**/
require.config({
	paths : {
		'IIG' : '../lib/IIG'
	},
	shim : {
		'IIG' : {
			exports : 'IIG',
			deps : []
		}
	}
});

require(['game', 'config', 'IM'], function(game, config, IM) {
	//player
	IM.add('assets/images/sprites/player/standUp.png');
	IM.add('assets/images/sprites/player/walk.png');
	IM.add('assets/images/sprites/player/run.png');
	IM.add('assets/images/sprites/player/jump.png');
	IM.add('assets/images/sprites/player/punch.png');
	//monster
	IM.add('assets/images/sprites/monstre/standUp.png');
	//level
	IM.add('assets/images/levels/0/1.jpg');
	IM.add('assets/images/levels/0/2.jpg');
	IM.add('assets/images/levels/0/3.jpg');
	IM.add('assets/images/levels/0/4.jpg');
	IM.add('assets/images/bg1.jpg');

	IM.loadAll(function() {
		game.init();

		// Premier appel pour entrer dans la boucle de jeu infinie
		requestAnimFrame(GameLoop);
	});

	// Boucle de jeu
	var delta = 0;
	function GameLoop( t ) {
		config.TIMING = t;

		game.update();
		game.render();

		delta = t;

		requestAnimFrame(GameLoop);
	}

});

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function rand(min, max) {
	return Math.random() * (max - min) + min;
}
function randi(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
function collide(a, b) {

	var ax = a.x || a.position.x;
	var ay = a.y || a.position.y;
	var bx = b.x || b.position.x;
	var by = b.y || b.position.y;

	return !(bx >= ax + a.width // Trop à droite
				|| bx + b.width <= ax // Trop à gauche
				|| by >= ay + a.height // Trop en bas
				|| by + b.height <= ay) // Trop en haut
}
