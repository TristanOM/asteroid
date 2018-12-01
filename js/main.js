var screen = {
	params:{
		width: 500,
		height:600
	},
	
	rock:{
		speed: 1,
		direction: 0,
		x: 0,
		y: 0,
		number: 2
	},
	
	triangle:{
		posx: 200,
		posy: 200,
		angle: 90,
		color: "blue",
		maxSpeed: .3
	},
	
	interval:{
		time:0
	},
	
	env:{
		delay:.05
	},
	
	keys:{
		
	},
	
	line:{
		speed: .02,
		distance: 100
	}
	
}
var shotNum = 0;
var pause = false;

var playerCheck = 1;
//var shotList = [];

function moveRocks(rockList) {
	rockList.forEach(function(rock){
		rock.move(rockList, screen.rock.speed, screen.env.ctx, screen.params);
		if( !RocknotHit(rock)){
			rock.vel.x = 0;
			rock.vel.y = 0;
		}
	});
}

function init() {
  var rocks = [];

  for (var i = 0; i < screen.rock.number; ++i) {
    rocks.push(rock.create(screen.rock.speed, screen.params));
  }

  return {
    rocks: rocks
  };
}

function render(ctx, rockList) {
  ctx.clearRect(0, 0, screen.params.width, screen.params.height);
  rockList.forEach(function(rock) {
    rock.draw(ctx, 'black');
	//drawTriangle(ctx,screen.player);
	screen.player.draw(ctx);
	playerCheck =1;
  });
}

function moveShots(rockList) {
	shotList.forEach(function(shot){
		if(!shot.isDone){
			shot.move(screen.env.ctx, screen.params);			
		}
	});
	
}

function move(rockList) {
  moveRocks(rockList);
  moveShots(shotList)  
}

/*
 * Main program loop.
 *
 * @ctx - The graphics context with which to draw.
 * @preyList - The list of prey.
 * @predatorList - The list of predators.
 */
function loop(ctx, rockList) {
	if(PlayernotHit())
	{
	  render(ctx, rockList);
	  move(rockList);
	   
	  keyL(screen.player, screen.keys );
	}
    else
	{
	  pause();
	}
}

function PlayernotHit() {
	var rval = true;
	screen.rockList.forEach(function(rock){
		if(Math.abs(rock.position.x - screen.player.position.x) < 10 && Math.abs(rock.position.y -screen.player.position.y) < 10){
			rval = false;
		}
	});
	return rval;
}

function RocknotHit(rock) {
	var rval = true;
	shotList.forEach(function(shot){
		if(Math.abs(rock.position.x - shot.position.x) < rock.width && Math.abs(rock.position.y -shot.position.y) < rock.height){
			rval = false;
		}
	});
	return rval;
}

function pause() {
  //clearInterval(screen.interval.time);
  screen.env.interval = 0;
  pause = true;
}

function play() {
	if(pause == false){
	  screen.env.interval = setInterval(function() {
		loop(screen.env.ctx, screen.rockList)
	  }, screen.env.delay);
	}
  
  //for (var i = 0; i < shotList; ++i) {
    //shotList.pop();
  //}
  shotList = [];
  
  
  $(document).click(function (e) {
	var shot = new Line(screen.player.position, screen.line.speed, screen.player.angle, screen.line.distance)
	if( shotList !== null){
		shotList.push(shot);
		
		if(shotList.length > 5){
			shotList.shift();
		}
		else{
			shotNum = shotNum + 1;
		}
	}
	});
}

function run() {
  var canvas = document.getElementById('Canvas');
  var ctx = canvas.getContext('2d');
	
  screen.params.width = canvas.width;
  screen.params.height = canvas.height;
  screen.env.ctx = ctx;

  screen.player = triangle.create(screen.triangle.posx, screen.triangle.posy, screen.triangle.angle, screen.triangle.color, screen.params, screen.triangle.maxSpeed);
  var rockInit = init();
  screen.rockList = rockInit.rocks;

  play();
}

$(document).ready(function() {
  // Configure canvas to play/pause the game when clicked.
  var canvas = $('#Canvas');
//document.getElementById("inputbox").addEventListener("click", keyL);//key listener
 // <input type="text" id="inputbox">
  canvas.on('click', function() {
    //if (screen.interval.time === 0) {
      //pause();
    //} else {
     // play();
    //}
	
  })

  // Configure the launch button.
  var launch = $('#launch');
  launch.on('click', function() {
    //screen.rock.number = 1;
	screen.interval.time = 1;
	screen.keys = [];
    run();
  });
});

//$(document).on("keypress" , function( event) {
	//if(playerCheck == 1){
	//keyL(screen.player );
	//}
	//playerCheck = 0;
    //screen.player.move(100);
//});

//use this to process multiple keys


$(document).keydown(function (e) {
	var index = getKeyIndex(e.which)
    if(index >= 0){
		screen.keys[index] = true;
	}
});

$(document).keyup(function (e) {
	var index = getKeyIndex(e.which)
	if(index >= 0){
		screen.keys[index] = false;
	}
});

//test
function getKeyIndex (key){
	switch(key){
		case 119:
		return 0;
		break;
		case 87:
		return 0;
		break;
		case 97:
		return 1;
		break;
		case 65:
		return 1;
		break;
		case 100:
		return 2;
		break;
		case 68:
		return 2;
		break;
		case 115:
		return 3;
		break;
		case 83:
		return 3;
		break;
	}
	return -1;
}