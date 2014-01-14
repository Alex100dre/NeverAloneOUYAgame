/**
 * canvas.js
**/

define([], function() {
	width = window.innerWidth;
	height = window.innerHeight;
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');

	canvas.width = this.width;
	canvas.height = this.height;
	// Force le canvas à s'adapter à l'écran
	canvas.style.position = 'absolute';
	canvas.style.top = 0;
	canvas.style.left = 0;
	canvas.style.right = 0;
	canvas.style.bottom = 0;
	canvas.style.backgroundColor = '#000';

	// Ajout du canvas à la page
	window.document.body.appendChild( canvas );

	return {
		canvas : canvas,
		ctx : ctx
	};
});