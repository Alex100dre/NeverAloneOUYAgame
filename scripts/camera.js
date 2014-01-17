/**
 * player.js
**/

define(['canvas'], function(canvas) {
	
	function Camera()
	{
		this.x = 0;
		this.y = 0;
		this.width = canvas.canvas.width;
		this.height = canvas.canvas.height;

		this.changePosition = function(x, y) {
			this.x = x;
			this.y = y;
		};

		this.render = function() {
			/*canvas.ctx.strokeStyle = 'red';
			canvas.ctx.strokeRect(this.x, this.y, this.width, this.height);*/
		};
	}

	return new Camera;
});