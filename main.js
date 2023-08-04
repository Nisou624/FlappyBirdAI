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
        this.framePerObstacle = 115;
        this.framePerGround = 10;
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


// MOUSE POS DETECTOR
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
}

bg = new Image();
bg.src = 'Sprites/background.png';

g = new Image();
g.src = 'Sprites/ground.png';

score = new Image();
score.src = 'Sprites/score.png'

let bestScore = localStorage?.getItem('Best Score')

let yGround = game.height - 50

var Obstacles = [];
bird = new bird(game.width/2- 80, game.height/2)

var grounds = []

function init(){
    let maxGround = Math.ceil(game.width / 37) + 10
    console.log(maxGround)
    for(i = 1; i <= maxGround; i++){
        grounds.push(new ground((i * 37) - 37, yGround))
    }
    bird.draw(game.context)
    game.start()
}

function drawAll(){
    
    game.context.drawImage(bg, 0, 0, game.width, game.height);

    Obstacles.forEach(Obstacle => {
        Obstacle.draw(game.context)
    })
    grounds.forEach(ground =>{
        ground.draw(game.context)
    })
    bird.draw(game.context);

    game.context.save()
    game.context.fillStyle = 'black'
    game.context.font = `${game.stopGame ? '30px' : '50px'} FF`
    let scoreX =  game.stopGame ? game.canvas.width/2 +20 : game.canvas.width/2 - 25;
    let scoreY =  game.stopGame ? game.canvas.height/2 - 25 : game.canvas.height/4 - 25
    if(game.stopGame){
        game.context.drawImage(score, game.width/2 - 85, game.height/2 - 85, 150, 150)
        game.context.fillText(bestScore, scoreX , scoreY + 40);
    }
    game.context.fillText(bird.score, scoreX , scoreY);
    game.context.restore()
}

function gameloop(){
    game.context.clearRect(0, 0, game.width, game.height);
    updateGame();
    drawAll();
    requestAnimationFrame(gameloop);
}

function frameInterval(n) {
	if ((game.frameCounter / n) % 1 === 0) {
		return true;
	}
	return false;
}


function updateGame(){
    game.frameCounter++;
    bird.updatePos()

    bird.hg() ? game.stopGame = true : null
    
    if(!game.stopGame){

        if(frameInterval(game.framePerGround)){
            grounds.push(new ground(game.width, yGround))
        }
        grounds.forEach(ground =>{
            ground.update()
        })

        if(game.state == 'playing'){
            bird.updateAngle()
            bird.gravity = 0.6  
            if(frameInterval(game.framePerObstacle)){
                Obstacles.push(new pipe(gc.width, gc.height-440, 100)) //max Height = 560, min height = 200
                game.framesPerObstacle = Math.floor(Math.random() * (90 - 70 + 1) + 90); //one obstacle per a randomly computed frame
            }
            Obstacles.forEach(Obstacle => {
                Obstacle.update()
                if(!Obstacle.passed) bird.hasPassed(Obstacle)
                if(bird.collision(Obstacle, game.context)){
                    bird.angle = 90
                    bird.controls = null;
                    game.stopGame = true;
                }
                if(Obstacle.filter()) Obstacles.shift()
            })
        }
    }else {
        let bestScore = localStorage?.getItem('Best Score')
        localStorage.setItem('Best Score', bird.score > bestScore ? bird.score : bestScore);
        game.canvas.addEventListener("click", function (ev){
            let mouse = getMousePos(game.canvas, ev)

            /*
                
            */
        })
    }
}


window.onload = init;