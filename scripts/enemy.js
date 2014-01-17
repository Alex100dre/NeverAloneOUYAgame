/**
 * enemy.js
**/

define(['config', 'IM', 'canvas','IIG','input','camera','player'], function(config, IM, canvas, IIG, input,camera,player) {
	
	function Enemy(params){
		//SPRITES

		//STAND UP
		this.img 	= IM.getInstance('assets/images/sprites/monstre/standUp');
		this.img.animation = new IIG.Animation({
			sWidth: 150,
			sHeight: 150,
			animByFrame :10
		});
		this.x 		= 500;
		this.y 		= canvas.canvas.height - this.img.height;
		this.type   = null;

		this.direction	= {
			x: (canvas.canvas.width*.5) - (this.width*.5),			 
			y: (canvas.canvas.height - this.height - 115)
		}

	
		this.width 	= this.img.animation.sWidth;
		this.height = this.img.animation.sHeight;

	};

	function EnemyManager() {
		this.enemiesList = [];
		this.Collider;

		this.add = function(params){
			// Instantiation du nouvel ennemi
			var enemy = new Enemy(params);
			this.enemiesList.push(enemy);
		};

		this.init = function(Collider){
			this.Collider = Collider;

			this.add({
				images : IM.getInstance('assets/images/sprites/monstre/standUp'),
				animation : new IIG.Animation({
					sWidth: 300,
					sHeight: 300,
					animByFrame :3
				}),
				y: canvas.canvas.height - 195,
				type: 'chien'
			});

			this.add({
				images : IM.getInstance('assets/images/sprites/monstre/standUp'),
				animation : new IIG.Animation({
					sWidth: 300,
					sHeight: 300,
					animByFrame :3
				}),
				x: canvas.canvas.width - 256,
				y: canvas.canvas.height - 195,
				type: 'chien'
			});

			var p;
			for (var i = 0, c = this.enemiesList.length; i < c; i++) {
				p = this.enemiesList[i];
				Collider.addBody(p.x, p.y, p.width, p.height);
			};
		};

		this.fire = function(){
			projectiles.add(this.x , this.y , this.direction);
		};

		this.update = function() {
			// Parcours du tableau d'ennemis
			var e;
			for (var i = 0, c = this.enemiesList.length; i < c; i++) {
				e = this.enemiesList[i];


				
			}
		};

		this.render = function() {
			// Parcours du tableau d'ennemis
			var e;
			for (var i = 0, c = this.enemiesList.length; i < c; i++) {
				e = this.enemiesList[i];
				IM.drawImage(canvas.ctx, e.img, e.x - camera.x, e.y);

				if(e.type == 'kalash'){
					// Si l'ennemi est à l'écran, alors il tire.
					if(e.x >= camera.x && e.x <= (camera.x + canvas.canvas.width)){
						console.log('coucou !');
					}
					/*if(e.img.animation.sx == 195){
						console.log('shot mother fucker');
						// projectiles à envoyer
					}*/
				}

			}
		};

	};

	return new EnemyManager();

});