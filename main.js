const gc = document.getElementById("GameCanvas");
const gctx = gc.getContext("2d");

var game = {
    canvas: gc,
    context: gctx,
    height : 640,
    width : 480,
    stopGame: false,
    state:"beginning",
    frameCounter: 0,
    start: function(){
        
        this.canvas.width = game.width
        this.canvas.height = game.height
        this.frameNo = 0;
        this.framePerObstacle = 150;
        requestAnimationFrame(gameloop);
        window.addEventListener("keypress", function(e) {
			if (e.key == " ") {
				game.state = "playing";
			}
		});
        
    },
    stop: function(){
        this.stopGame = game;
    }

}

var Obstacles = [];
bird = new bird(game.width/2- 80, game.height/2)

function init(){
    bird.draw(game.context)
    game.start()
}

function drawAll(){
    Obstacles.forEach(Obstacle => {
        Obstacle.draw(game.context)
    })
    bird.draw(game.context)
}

function gameloop(){
    game.context.clearRect(0, 0, game.width, game.height);
    updateGame();
    drawAll();
    if(!game.stopGame){
        requestAnimationFrame(gameloop);
    }
}

function frameInterval(n) {
	if ((game.frameCounter / n) % 1 === 0) {
		return true;
	}
	return false;
}

function updateGame(){
    game.frameCounter++;
    if(game.state == 'playing'){

        if(frameInterval(game.framePerObstacle)){
            Obstacles.push(new pipe(gc.width, gc.height-440, 100)) //max Height = 560, min height = 200
            game.framesPerObstacle = Math.floor(Math.random() * (90 - 70 + 1) + 90); //one obstacle per a randomly computed frame
			game.frameCounter = 2;
            console.log(Obstacles)
        }
        bird.update(game.context)
        Obstacles.forEach(Obstacle => {
            Obstacle.update()
            if(!Obstacle.passed) bird.hasPassed(Obstacle)
            if(bird.collision(Obstacle, game.context)){
                bird.controls = null
                bird.angle = 90
            }
            if(Obstacle.filter()) Obstacles.shift()
        })
    }else if(game.state == "gameOver"){
        bird.controls = null;
        bird.angle = 90
    }
}


window.onload = init;





/* 


gc.height = 640;
gc.width = 480;
gc.frameNo = 0

let update = false;

bird = new bird(gc.width/2- 80, gc.height/2, 20)
bird.draw(gctx);

var Tpipe = [];

function everyinterval(n) {
    if ((gc.frameNo / n) % 1 == 0) {return true;}
    return false;
}

animate();

function animate(){
    gctx.clearRect(0, 0, gc.width, gc.height);
    this.frameNo += 1
    bird.update(gc);
    bird.draw(gctx);
    if(bird.abg){
        if(gc.frameNo == 1 || everyinterval(150)){
            console.log("za3ma y'a un truc")   
            Tpipe.push(new pipe(gc.width, gc.height-300, 100, 400))
        }
        for(i = 0; i < Tpipe.length; i++){
            Tpipe[i].update();
            Tpipe[i].draw(gctx)
        }
    }
    requestAnimationFrame(animate);
}
*/
