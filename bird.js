class bird{
    constructor(x, y){

        this.score = 0

        this.x = x;
        this.y = y;
        this.radius = 24;
        this.angle = 0

        this.controls = new controls();

        this.imgSrc = 'Sprites/FLoppy-1.png';
        this.image = new Image();
        this.image.src = this.imgSrc;

        this.gravity = 0.6;
        this.speed = 0
    }


    update(){
        if(this.y + this.radius <= 590){
            if(this.controls?.jump){
                this.speed = - 6
                this.angle >= -25 ? this.angle -= 11 : this.angle = -25
            }
            this.speed += this.gravity
            this.y += this.speed;
    
            this.angle <= 90 ? this.angle++ : this.angle = 90
        }
    }

    hasPassed(object){
        if(this.x >= object.x + object.width/2){
            this.score++
            object.passed = true
        }
    }

    collision(object, ctx){
        ctx.fillStyle = 'green'
        ctx.fillRect(object.x, 0, 1,100)
        if(this.x + this.radius >= object.x && this.x - this.radius <= object.x + object.width 
            && 
            (this.y - this.radius <= object.height || this.y + this.radius >= object.height + object.space)){
            return true
        }else{
            return false
        }
    }

    draw(ctx){
        const deg = Math.PI / 180
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle * deg)
        ctx.drawImage(this.image, 0 - 28, 0 - 20, 56, 40)
        ctx.restore();
    }
}