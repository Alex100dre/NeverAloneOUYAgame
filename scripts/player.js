/**
 * player.js
**/

define(['input','config', 'canvas'], function(input, config, canvas) {
	function Player() {
		this.x = window.innerWidth/2;
		this.y = window.innerHeight - 180;
		this.width = 80;
		this.height = 180;
		this.speed= 10;
		this.velX= 0;
		this.velY= 0;
		this.jumping= false;
		this.canJump = true;
		this.personality = 0;         //0 = peureux, 1 = sadique, 2 = paranoiaque
		this.canChangePersonality = true;

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
			        console.log('dessous')
			    }

		};

		
		// Gère les contrôles utilisateur au gamepad
		this.characterGamepadController = function() {
			// gauche/droite JOYSTICK
			this.x += input.gamepad.joystickLeft.axeX * this.speed;
			this.direction = Math.atan2( input.gamepad.joystickLeft.axeX ) || this.direction;

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
	        if(this.personality == 0 ){
	          this.jumping = true;
	          this.velY = - this.speed*1.5;
	        }else{
	          this.jumping = true;
	          this.velY = - this.speed*0.9;
	        }
	      
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

			canvas.ctx.fillRect(this.x, this.y, this.width, this.height);

		}
	}
	return new Player();
});