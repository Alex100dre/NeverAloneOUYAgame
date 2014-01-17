/**
 * game.js
**/

define(['IM', 'config','player', 'camera', 'canvas', 'input', 'Stage', 'Collider', 'enemy'], function(IM, config, player, camera, canvas, input, Stage, Collider, enemy) {
	function Game() {
		this.canPause =  true;
		this.isPaused =  false;

		this.stage;
		this.currentStageID = 0; // 1er stage

		this.Collider;

		this.init = function() {
			// Création du Collider
			this.Collider = new Collider();
			this.Collider.defineArea(0, 0, 1280*12.8, canvas.canvas.height);

			this.stage = new Stage({
				backgrounds : config.stages[this.currentStageID].backgrounds,
				platforms : config.stages[this.currentStageID].platforms
			});
			// On passe le Collider aux plate-formes (pour ajouter des bodies)
			this.stage.init(this.Collider);

			// On passe le Collider au player (pour qu'il puisse s'y cogner :))
			player.init(this.Collider, this.stage);

			//On passe le Collider aux enemies
			enemy.init(this.Collider);
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
				IM.update();
				this.stage.update();
				player.update();
				enemy.update();
			}

		   input.updateGamepadsButtons();
		};

		this.render = function() {
			canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

			this.stage.render();
			camera.render();
			player.render();
			enemy.render();
			// platforms.render();
			this.Collider.debugBodies(canvas.ctx);
		};
	}
	return new Game();
});