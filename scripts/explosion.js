define(['canvas', 'IM', 'IIG'], function(canvas, IM, IIG) {
	function Explosion( params ) {
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.img = IM.getInstance('assets/images/explosion');
		this.width = this.img.width;
		this.height = this.img.height;

		this.img.animation = new IIG.Animation({
			sWidth : 256,
			sHeight : 256,
			sy : 0,
			iterations : 1,
			animByFrame : 1
		});
	};

	function ExplosionManager() {

		this.explosionsList = [];

		this.add = function(x, y) {
			// Instantiation du nouvel ennemi
			var explosion = new Explosion({});

			explosion.x = x - explosion.img.animation.sWidth*.5;
			explosion.y = y - explosion.img.animation.sHeight*.5;

			this.explosionsList.push(explosion);
			// console.log('pushed new el');
		};

		this.update = function() {
			// Parcours du tableau d'explosions
			var e;
			for (var i = 0, c = this.explosionsList.length; i < c; i++) {
				e = this.explosionsList[i];

				// i === 0 && console.log('je suis un fruit');

				if (e.img.animationDestroyed) {
					this.explosionsList.splice(i, 1);
					c--;
				}
			}

			// console.log(this.explosionsList.length);
		};

		this.render = function() {
			// Parcours du tableau d'explosions
			var e;
			for (var i = 0, c = this.explosionsList.length; i < c; i++) {
				e = this.explosionsList[i];

				IM.drawImage(canvas.ctx, e.img, e.x, e.y);
			}
		};

	};

	return new ExplosionManager();
});