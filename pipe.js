class pipe{
    space = 127;
    maxHeight = 300;
    minHeight = 100;
    constructor(x,y,width){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = Math.floor(Math.random()*(this.maxHeight-this.minHeight+1)+this.minHeight);
    
        this.passed = false
        
        this.pipeHead = new Image();
        this.pipeHead.src = 'Sprites/pipeHead.png';
        this.pipeBody = new Image();
        this.pipeBody.src = 'Sprites/pipeBody.png';

        this.pipeHeadR = new Image();
        this.pipeHeadR.src = 'Sprites/pipeHeadR.png';
        this.pipeBodyR = new Image();
        this.pipeBodyR.src = 'Sprites/pipeBodyR.png';
    }

    update(){
        this.x -= 3;
    }

    filter(){
        if(this.x + this.width <= 0){
            return true
        }
    }

    draw(ctx){
        ctx.fillStyle = 'green';
        ctx.drawImage(this.pipeBodyR, this.x+5, 0, this.width-10, this.height-50);
        ctx.drawImage(this.pipeHeadR, this.x, this.height-50, this.width, 50);
        const bottomPipeY = this.height + this.space;
        ctx.drawImage(this.pipeHead, this.x, bottomPipeY, this.width, 50)
        ctx.drawImage(this.pipeBody, this.x+5, bottomPipeY+50, this.width-10, ctx.canvas.clientHeight - bottomPipeY +50)
    }
}