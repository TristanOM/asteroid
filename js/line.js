function Line(pos, velocity, angle, distance) {
  this.position = pos;
  this.angle = angle;
  this.distance = distance;
  this.speed = velocity;
  this.isDone = false;
}

Line.prototype.notDone = function(){
	
	if(this.distance > 0){
		this.distance = this.distance -1;
		return true;
	}
	else{
		this.isDone = true;
		this.position.x = -1;
		this.position.y = -1;
		return false;
	}
}

Line.prototype.move = function(ctx, params){
	if(this.notDone()){
		Rad = toRadians(this.angle);
		ax = (this.distance *Math.cos(Rad));
		ay = (this.distance *Math.sin(Rad));
		var velocity = new Vector (ax, ay);
		this.vel = velocity;
		this.vel = this.vel.scale(this.speed);
		this.position.x = this.vel.x + this.position.x;
		this.position.y = this.vel.y + this.position.y;
		this.position = this.position.bound(params);
		drawLine(ctx, this);
	}
}

Line.prototype.draw = function(ctx){
	this.friction();//slow down the velocity 
	VectorAngle= this.vel.angle();
	nx = Math.abs(1 *Math.cos(VectorAngle));
	ny = Math.abs(1 *Math.sin(VectorAngle));
	subVector = new Vector(nx,ny);
	this.position = this.position.add(this.vel).bound(this.bounds);
	drawLine(ctx, this);
}