/**
 * player.js
**/

define(['IIG', 'IM', 'input','config', 'canvas', 'camera', 'CharacterController'], function(IIG, IM, input, config, canvas, camera, CharacterController) {
	function Player() {
		// this.width = 170.5;
		// this.height = 180;
		// this.x = window.innerWidth*.5 - this.width*.5;
		// this.y = window.innerHeight - 180;
		this.speed = 4;
		this.speedRun = 15;
		this.velX = 0;
		this.velY = 0;
		this.jumping= false;
		this.canJump = true;
		this.personality = 0;         //0 = peureux, 1 = sadique, 2 = paranoiaque
		this.canChangePersonality = true;

		this.Controller;
		this.stage;

		this.sprites = {};

		this.init = function(Collider, Stage) {

			this.stage = Stage;

			// Sprites du perso :
			// =============================================================================================

			// STAND UP 
			this.sprites.standUp = IM.getInstance('assets/images/sprites/player/standUp');
			this.sprites.standUp.animation = new IIG.Animation({
				sWidth : 133,
				sHeight : 155,
				animByFrame : 30
			});
			// WALK 
			this.sprites.walk = IM.getInstance('assets/images/sprites/player/walk');
			this.sprites.walk.animation = new IIG.Animation({
				sWidth : 133,
				sHeight : 155,
				animByFrame : 6
			});
			//RUN
			this.sprites.run = IM.getInstance('assets/images/sprites/player/run');
			this.sprites.run.animation = new IIG.Animation({
				sWidth : 133,
				sHeight : 155,
				animByFrame : 6
			});
			//JUMP
			this.sprites.jump = IM.getInstance('assets/images/sprites/player/jump');
			this.sprites.jump.animation = new IIG.Animation({
				sWidth : 133,
				sHeight : 155,
				animByFrame : 6
			});
			//PUNCH
			this.sprites.punch = IM.getInstance('assets/images/sprites/player/punch');
			this.sprites.punch.animation = new IIG.Animation({
				sWidth : 133,
				sHeight : 155,
				animByFrame : 6
			});
			// =============================================================================================
			
			// this.etapeSprite = {nb:6, x : 0, y : 0, width : 266.5, height : 281}; //width/height = largeur/hauteur d'une étape du sprite (le sprite est divisé en 6 étapes de 266.5/201) x/y= position de l'etape exemple etape 1 = x:0,y:0, étape 2 = x:266.5, y:0 etc...
			this.frame=0;
			this.speedS=1.5;
			this.sens = 1;
			this.lastUpdateTime = 0;
			this.acDelta = 0; 
			this.msPerFrame = 50;

			this.Controller = new CharacterController({
				x : 0,
				y : 0,
				width : 45,
				height : 147,
				velocityX : 0,
				velocityY : 0,
				speedMove : this.speed,
				gravity : 1,
				Collider : Collider
			});
		};

		this.update = function() {

			// console.log(this.Controller);

			// Update du CharacterController et de toute la physique à l'intérieur
			// if (input.gamepad.joystickLeft.axeX !== 0)
			// 	this.Controller.velocity.x += input.gamepad.joystickLeft.axeX;

			this.Controller.update();

			this.cameraLookAtPlayer();

			// changement d'état R2
			if ( (input.gamepad.r2 || input.gamepad.l2) && this.canChangePersonality){
				this.canChangePersonality = false;
		      	this.changePersonality(input.gamepad.l2, input.gamepad.r2);
		    }
			if( !input.gamepad.r2 && !input.gamepad.l2 && !this.canChangePersonality)
				this.canChangePersonality = true;

			// Bind des inputs
			this.Controller.bindKey('right', input.gamepad.joystickLeft.axeX > 0);
			this.Controller.bindKey('left', input.gamepad.joystickLeft.axeX < 0);
			this.Controller.bindKey('jump', input.gamepad.O);

			if (this.personality === 0 && input.gamepad.U) {
				this.Controller.speedMove = this.speedRun;
				this.Controller.gravity = .6;
			} else {
				this.Controller.speedMove = this.speed;
				this.Controller.gravity = 1;
			}

			if(input.gamepad.joystickLeft.axeX > 0){
				this.sens = 1;
			}else if(input.gamepad.joystickLeft.axeX < 0){
				this.sens = -1;
			}

			// Changement de direction du joueur (gauche/droite) ?
			// if (input.gamepad.joystickLeft.axeX > 0) { // droite
			// 	this.persoSprite.animation.sy = 0;
			// }
			// if (input.gamepad.joystickLeft.axeX < 0) { // gauche
			// 	this.persoSprite.animation.sy = 155;
			// }

			/*====== animation ======*/
			this.chooseSprite();
			/*if (input.gamepad.connected)
				this.characterGamepadController();
			else 
				console.log('Gamepad non connecté ...');
			//=======
		    this.velX *= config.friction;

		    this.velY += config.gravity;
		  
		    this.x += this.velX;
		    this.y += this.velY;
		    //console.log(this.y>canvas.canvas.height);
		    if (this.x >= canvas.canvas.width-this.width) {
		        this.x = canvas.canvas.width-this.width;
		    } else if (this.x <= 0) {
		        this.x = 0;
		    }
		  
		    if(this.y >= canvas.canvas.height - this.height){
		        this.y = canvas.canvas.height - this.height;
		        this.jumping = false;
		        // console.log('dessous')
		    }*/

			// this.animPerso();
		};

		this.cameraLookAtPlayer = function() {
			camera.changePosition(this.Controller.position.x - camera.width/4, 0);
			// Avoid camera to exit map's dimensions
			if (camera.y < 0)									camera.y = 0;
			if (camera.y + camera.height > this.stage.height)	camera.y = this.stage.height - camera.height;
			if (camera.x < 0)									camera.x = 0;
			if (camera.x + camera.width > this.stage.width)		camera.x = this.stage.width - camera.width;
		};

		
		// Gère les contrôles utilisateur au gamepad
		this.characterGamepadController = function() {
			// gauche/droite JOYSTICK
			if(this.personality == 0 && input.gamepad.U && !this.jumping)
				this.velX += input.gamepad.joystickLeft.axeX * this.speedRun;
			else
				this.velX += input.gamepad.joystickLeft.axeX * this.speed;


			

			//this.direction = Math.atan2( input.gamepad.joystickLeft.axeX ) || this.direction;

			// changement d'état R2
			if ( (input.gamepad.r2 || input.gamepad.l2) && this.canChangePersonality){
				this.canChangePersonality = false;
		      	this.changePersonality(input.gamepad.l2, input.gamepad.r2);
		    }
			if( !input.gamepad.r2 && !input.gamepad.l2 && !this.canChangePersonality)
				this.canChangePersonality = true;

			if (input.gamepad.O  && this.canJump) {
				console.log('jump !')
				this.canJump = false;
		        this.jump();
		    }

		    if(!input.gamepad.O  && !this.canJump){
		    	this.canJump= true;
		    }
		}
		this.chooseSprite = function (){
			//PEUR
			if(this.personality == 0){
				if(input.gamepad.joystickLeft.axeX == 0){
					if(this.sens == 1){
						this.persoSprite = this.sprites.standUp;
						this.persoSprite.animation.sy = this.persoSprite.animation.sHeight*2;
					}else if(this.sens == -1){
						this.persoSprite = this.sprites.standUp;
						this.persoSprite.animation.sy = this.persoSprite.animation.sHeight*3;
					}
				}else if(input.gamepad.joystickLeft.axeX > 0 && !input.gamepad.U){
					this.persoSprite = this.sprites.walk;
					this.persoSprite.animation.sy = this.persoSprite.animation.sHeight*2;
				}else if(input.gamepad.joystickLeft.axeX < 0 && !input.gamepad.U){
					this.persoSprite = this.sprites.walk;
					this.persoSprite.animation.sy = this.persoSprite.animation.sHeight*3;
				}else if (input.gamepad.joystickLeft.axeX > 0 && input.gamepad.U){
					this.persoSprite = this.sprites.run;
					this.persoSprite.animation.sy = 0;
				}else if (input.gamepad.joystickLeft.axeX < 0 && input.gamepad.U){
					this.persoSprite = this.sprites.run;
					this.persoSprite.animation.sy = this.persoSprite.animation.sHeight;
				}
				if(this.jumping){
					this.persoSprite = this.sprites.jump;
					this.persoSprite.animation.sy = this.persoSprite.animation.sHeight*3;
				}
			}

			//COLERE
			if(this.personality == 1){
				if(input.gamepad.joystickLeft.axeX == 0){
					if(this.sens == 1){
						this.persoSprite = this.sprites.standUp;
						this.persoSprite.animation.sy = this.persoSprite.animation.sHeight*4;
					}else if(this.sens == -1){
						this.persoSprite = this.sprites.standUp;
						this.persoSprite.animation.sy = this.persoSprite.animation.sHeight*5;
					}
				}else if(input.gamepad.joystickLeft.axeX > 0 ){
					this.persoSprite = this.sprites.walk;
					this.persoSprite.animation.sy = this.persoSprite.animation.sHeight*4;
				}else if(input.gamepad.joystickLeft.axeX < 0 ){
					this.persoSprite = this.sprites.walk;
					this.persoSprite.animation.sy = this.persoSprite.animation.sHeight*5;
				}
				 if ( input.gamepad.U ){
					if(this.sens == 1){

						this.persoSprite = this.sprites.punch;
						this.persoSprite.animation.sy = 0;
					}else if(this.sens == -1){
						this.persoSprite = this.sprites.punch;
						this.persoSprite.animation.sy = this.persoSprite.animation.sHeight;
					}
				}
				if(this.jumping){
					this.persoSprite = this.sprites.jump;
					this.persoSprite.animation.sy = this.persoSprite.animation.sHeight*4;
				}
			}
			//PARANOIA
			if(this.personality == 2){
				if(input.gamepad.joystickLeft.axeX == 0){
					if(this.sens == 1){
						this.persoSprite = this.sprites.standUp;
						this.persoSprite.animation.sy = 0;
					}else if(this.sens == -1){
						this.persoSprite = this.sprites.standUp;
						this.persoSprite.animation.sy = this.persoSprite.animation.sHeight;
					}
				}else if(input.gamepad.joystickLeft.axeX > 0 && !input.gamepad.U){
					this.persoSprite = this.sprites.walk;
					this.persoSprite.animation.sy = 0;
				}else if(input.gamepad.joystickLeft.axeX < 0 && !input.gamepad.U){
					this.persoSprite = this.sprites.walk;
					this.persoSprite.animation.sy = this.persoSprite.animation.sHeight;
				}else if (input.gamepad.joystickLeft.axeX > 0 && input.gamepad.U){
					this.persoSprite = this.sprites.run;
					this.persoSprite.animation.sy = 0;
				}else if (input.gamepad.joystickLeft.axeX < 0 && input.gamepad.U){
					this.persoSprite = this.sprites.run;
					this.persoSprite.animation.sy = this.persoSprite.animation.sHeight;
				}
				if(this.jumping){
					this.persoSprite = this.sprites.jump;
					this.persoSprite.animation.sy = 0;
				}
			}
		}
		this.changePersonality = function(l2, r2){
			if(r2) {
				this.personality ++;
		        if(this.personality > 2){
		          this.personality = 0;
		        }
	    	} else if(l2) {
	    		this.personality --;
		        if(this.personality < 0){
		          this.personality = 2;
		        }
	    	}
	        console.log(this.personality);
		}

		this.jump = function(){
			
	      if(!this.jumping){
	        if(this.personality == 0 && input.gamepad.U ){
	          this.jumping = true;
	          this.velY = - this.speedRun*2.5;
	        }else{
	          this.jumping = true;
	          this.velY = - this.speed*4;
	        }
	      
	      }
		}

		

		this.render = function() {
			canvas.ctx.clearRect(0,0, this.width, this.height);
			// if(this.personality == 0)
			// 	canvas.ctx.fillStyle = "red";
			// else if(this.personality == 1)
			// 	canvas.ctx.fillStyle = "blue";
			// else if(this.personality == 2){
			// 	canvas.ctx.fillStyle = "green";
			//}

			// canvas.ctx.drawImage(this.persoSprite, this.etapeSprite.x, this.etapeSprite.y, this.etapeSprite.width, this.etapeSprite.height, this.x, this.y, this.width, this.height);
			IM.drawImage(canvas.ctx,
				this.persoSprite,
				this.Controller.position.x - 44 - camera.x,
				this.Controller.position.y - 8 - camera.y
			);

			//this.debugPlayer();
		}

		this.debugPlayer = function() {
			canvas.ctx.strokeStyle = 'fuchsia';
			canvas.ctx.strokeRect(this.Controller.position.x - camera.x, this.Controller.position.y, this.Controller.width, this.Controller.height);
		}
	}
	return new Player();
});