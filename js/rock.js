function rock(pos, velocity) {
  this.position = pos;
  this.vel = velocity;
  this.width = 4;
  this.height =4;
}

rock.create = function(speed, bounds) {
  // Generate a random position for the prey.
  var x = Math.floor(Math.random() * bounds.width);
  var y = Math.floor(Math.random() * bounds.height);
	
  var vel = new Vector(Math.random(), Math.random());
  vel = vel.normalize().scale(speed);
  vel = vel.scale(speed);
  return new rock(new Vector(x,y), vel);
}

rock.prototype.move = function(rockList, speed, ctx, params){
	this.vel = this.vel.scale(speed);
	this.position.x = this.vel.x + this.position.x;
	this.position.y = this.vel.y + this.position.y;
	this.position = this.position.bound(params);
}

rock.prototype.draw = function(ctx, color) {
  drawRock(ctx, this.position.x, this.position.y, this.width, this.height, this.vel.angle(), color);
}

rock.prototype.isHit = function(ctx, color) {
	var rval = true;
	screen.rockList.forEach(function(rock){
		if(Math.abs(rock.position.x - width) < 10 && Math.abs(rock.position.y -height) < 10){
			rval = false;
		}

	});
	return rval;
}







