
function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.scale = function(scalar) {
  return new Vector(this.x * scalar, this.y * scalar);
}

Vector.prototype.abs = function() {
  return new Vector(Math.abs(this.x), Math.abs(this.y));
}

Vector.prototype.len = function() {
  return Math.sqrt(this.len2());
}

Vector.prototype.len2 = function() {
  return this.x * this.x + this.y * this.y;
}

Vector.prototype.angle = function() {
  return Math.atan2(this.y, this.x);
}

Vector.prototype.normalize = function() {
  len = this.len();
  if (len === 0)
    return this;
  return new Vector(this.x / len, this.y / len);
}

Vector.prototype.add = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
}

Vector.prototype.subtract = function(other) {
  return new Vector(this.x - other.x, this.y - other.y);
}

Vector.prototype.bound = function(bounds) {
  var bounded = new Vector(this.x % bounds.width, this.y % bounds.height);
  if (bounded.x < 0) {
    bounded.x = bounds.width + bounded.x;
  }
  if (bounded.y < 0) {
    bounded.y = bounds.height + bounded.y;
  }
  return bounded;
}

Vector.prototype.boundedDist = function(other, bounds) {
  var d = this.subtract(other).abs();

  d.x = Math.min(d.x, bounds.x - d.x);
  d.y = Math.min(d.y, bounds.y - d.y);
  return d.len2();
}

Vector.prototype.shortestBoundedPathTo = function(other, xBound, yBound) {
  var vector = other.subtract(this);
  if (vector.x < 0) {
    vector.x = absMin(vector.x, vector.x + xBound);
  } else {
    vector.x = absMin(vector.x, vector.x - xBound);
  }
  if (vector.y < 0) {
    vector.y = absMin(vector.y, vector.y + yBound);
  } else {
    vector.y = absMin(vector.y, vector.y - yBound);
  }
  return vector;
}


Vector.prototype.linearNormalize = function(lower, upper) {
  var len = this.len();
  var scaleFactor = (len - lower) / (upper - lower);
  return this.normalize().scale(scaleFactor);
}

Vector.prototype.reverseLinearNormalize = function(lower, upper) {
  var len = this.len();
  var scaleFactor = (len - lower) / (upper - lower);
  return this.normalize().scale(1 - scaleFactor);
}

Vector.prototype.slow = function (percent, vector){
	subx = (vector.x*percent) /100;
	suby = (vector.y*percent) /100;
	
	if(subx >0){
		vector.x = vector.x - subx;
	}
	else
		vector.x = vector.x + subx;
	
	if(suby > 0){
	vector.y = vector.y - suby;
	}
	else 
		vector.y = vector.y + suby;
	
	return vector;
}