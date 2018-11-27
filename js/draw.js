function drawRock(ctx, x, y, width, length, angle, color){
	
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width, y + length);
  ctx.lineTo(x , y + length);
  ctx.lineTo(x , y );
  ctx.stroke();
    
}

function drawTriangle(ctx, Player){
	
	Rad = toRadians(Player.angle);
	x=Player.position.x
	y = Player.position.y
	color = Player.color
	Length = 6
	
	 X2 = x + (Length *Math.cos(Rad));
	 Y2 = y + (Length *Math.sin(Rad));
	 X3 = x - (Length *Math.cos(Rad));
	 Y3 = y - (Length *Math.sin(Rad));
	 X4 = X3 + (Length/2 * Math.cos(Rad+Math.PI/2));
	 Y4 = Y3 + (Length/2 * Math.sin(Rad + Math.PI/2));
	 X5 = X3 - (Length/2 * Math.cos(Rad + Math.PI/2));
	 Y5 = Y3 - (Length/2 * Math.sin(Rad + Math.PI/2));

	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(X2,Y2);
	ctx.lineTo(X4, Y4);
	ctx.lineTo(X5, Y5);
	ctx.lineTo(X2, Y2);
	ctx.lineTo(X5, Y5);
	ctx.stroke();
	
}

function drawLine(ctx, shot){
	
	Rad = toRadians(shot.angle);
	x = shot.position.x
	y = shot.position.y
	Length = 6
	 X2 = x + (Length *Math.cos(Rad));
	 Y2 = y + (Length *Math.sin(Rad));
	 
	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(X2, Y2);
	ctx.stroke();
	
}

function toRadians(angle){
	return (angle/360) * Math.PI *2;
	
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}