function triangle(pos, velocity, angle, color, bounds, Speed) {
  this.position = pos;
  this.vel = velocity;
  this.angle = angle;
  this.color = color;
  this.bounds = bounds;
  this.maxSpeed = Speed;
  this.hasMoved = true;
}
triangle.create = function(x, y, angle, color, bounds, Speed){
	var vel = new Vector(0.0, 0.0);
	return new triangle(new Vector(x,y), vel, angle, color,bounds, Speed);
}

triangle.prototype.turn = function(degrees){
	this.angle = this.angle + degrees;
	if ( this.angle <0){this.angle = 360 + this.angle}
	else if( this.angle >360) {this.angle = Math.abs(this.angle%360)};
}

triangle.prototype.move = function(distance){
	Rad = toRadians(this.angle);

	ax = (distance *Math.cos(Rad));
	ay = (distance *Math.sin(Rad));
	
	var addVelocity = new Vector (ax, ay);
	this.vel = this.vel.add(addVelocity);
	this.position = this.position.add(this.vel);
	this.setSpeed();//set a max speed
}

triangle.prototype.bind = function(position){
	position.bounds;
	x = this.position.x;
	y =this.position.y;
	this.position.x = this.position.x + (distance *Math.cos(Rad));
	this.position.y = this.position.y + (distance *Math.sin(Rad));
	
}

function keyL(player, keys){
	for( var i =0; i < keys.length; i++){
		if(keys[i]){
			if(i ===0){
				player.move(.1);
			}
			if(i === 1){
				player.turn(-2);
			}
			if(i ===2){
				player.turn(2);
			}
			if(i ===3){
				player.move(-.1);
			}
		}
	}
}

triangle.prototype.draw = function(ctx){
	this.friction();//slow down the velocity 
	VectorAngle= this.vel.angle();
	nx = Math.abs(1 *Math.cos(VectorAngle));
	ny = Math.abs(1 *Math.sin(VectorAngle));
	subVector = new Vector(nx,ny);
	this.position = this.position.add(this.vel).bound(this.bounds);
	drawTriangle(ctx, this);
}

triangle.prototype.setSpeed = function(){
	
	vectorAbs = this.vel.abs();
	Velspeed = (vectorAbs.x + vectorAbs.y)/2
	if(Velspeed > this.maxSpeed){
		this.vel.x = this.vel.x/2;
		this.vel.y = this.vel.y/2;
	}
	/*
	if(Math.abs(this.vel.x) > this.maxSpeed){
		if(this.vel.x >0){
		this.vel.x = this.maxSpeed;
		}
		else{
			this.vel.x = this.maxSpeed *-1;
		}
	}
	if(Math.abs(this.vel.y) > this.maxSpeed){
		if(this.vel.y >0){
		this.vel.y = this.maxSpeed;
		}
		else{
			this.vel.y = this.maxSpeed *-1;
		}
	}*/
}

triangle.prototype.friction = function(){
	
	this.vel.x = this.vel.x/1.005;
	this.vel.y = this.vel.y/1.005;
}
