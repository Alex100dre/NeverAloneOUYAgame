/**
 * player.js
**/

define(['input','config', 'canvas'], function(input, config, canvas) {
	function Player() {
		this.width = 170.5;
		this.height = 180;
		this.x = window.innerWidth*.5 - this.width*.5;
		this.y = window.innerHeight - 180;
		this.speed = 2;
		this.speedRun = 5;
		this.velX = 0;
		this.velY = 0;
		this.jumping= false;
		this.canJump = true;
		this.personality = 0;         //0 = peureux, 1 = sadique, 2 = paranoiaque
		this.canChangePersonality = true;

		/*====animation======*/
		this.persoSprite = new Image();
		this.persoSprite.src = 'assets/images/player.png';
		this.etapeSprite = {nb:6, x : 0, y : 0, width : 266.5, height : 281}; //width/height = largeur/hauteur d'une étape du sprite (le sprite est divisé en 6 étapes de 266.5/201) x/y= position de l'etape exemple etape 1 = x:0,y:0, étape 2 = x:266.5, y:0 etc...
		this.frame=0;
		this.speedS=1.5;
		this.sens = 0;
		this.lastUpdateTime = 0; 
		this.acDelta = 0; 
		this.msPerFrame = 50; 

		this.init = function() {
			
			// this.life = this_life;
		}; 

		this.update = function() {
			if (input.gamepad.connected)
				this.characterGamepadController();
			else 
				console.log('Gamepad non connecté ...');
			/******/
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
			    }
			this.animPerso();

		};

		
		// Gère les contrôles utilisateur au gamepad
		this.characterGamepadController = function() {
			// gauche/droite JOYSTICK
			if(this.personality == 0 && input.gamepad.U && !this.jumping)
				this.velX += input.gamepad.joystickLeft.axeX * this.speedRun;
			else
				this.velX += input.gamepad.joystickLeft.axeX * this.speed;

			if(input.gamepad.joystickLeft.axeX > 0){
				this.sens = 1;
			}else if(input.gamepad.joystickLeft.axeX < 0){
				this.sens = -1;
			}

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

		this.animPerso = function(){
			if(input.gamepad.joystickLeft.axeX > 0){
				var delta = Date.now() - this.lastUpdateTime; 
				console.log(this.acDelta +' / '+ (Date.now() - this.lastUpdateTime));
				if (this.acDelta > this.msPerFrame) {
					// if (this.sens && this.frame%((7/this.speed)|0)==0){
						 this.acDelta = 0;
					this.etapeSprite.x+=this.etapeSprite.width;
					if(this.etapeSprite.x >= this.etapeSprite.width*this.etapeSprite.nb){
						this.etapeSprite.x = 0;
					}
				}else{
			        this.acDelta += delta;
			    }
			    this.lastUpdateTime = Date.now();
			}
		}

		this.render = function() {
			canvas.ctx.clearRect(0,0, this.width, this.height);
			if(this.personality == 0)
				canvas.ctx.fillStyle = "red";
			else if(this.personality == 1)
				canvas.ctx.fillStyle = "blue";
			else if(this.personality == 2){
				canvas.ctx.fillStyle = "green";
			}

			//canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
			canvas.ctx.drawImage(this.persoSprite, this.etapeSprite.x, this.etapeSprite.y, this.etapeSprite.width, this.etapeSprite.height, this.x, this.y, this.width, this.height);

		}
	}
	return new Player();
});