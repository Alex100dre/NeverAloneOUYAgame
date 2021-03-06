/**
 * canvas.js
**/

define([], function() {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');

	canvas.width = 1280;
	canvas.height = 720;
	// Force le canvas à s'adapter à l'écran
	canvas.style.position = 'absolute';
	canvas.style.top = 0;
	canvas.style.left = 0;
	canvas.style.right = 0;
	canvas.style.bottom = 0;
	canvas.style.backgroundImage = 'url("assets/images/bg1.png")';
	canvas.style.backgroundSize = '100% 100%';

	// Ajout du canvas à la page
	window.document.body.appendChild( canvas );

	return {
		canvas : canvas,
		ctx : ctx
	};
});