class ground{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 37;
        this.height = 50;
        this.passed = false
        this.g = new Image();
        this.g.src = 'Sprites/ground.png';
    }

    update(){
        this.x -= 3;
    }

    filter(){
        if(this.x + this.width <= 0){
            this.passed = true
            return true
        }
        return false
    }
    add(){
        if(this.x <= 0){
            return true
        }
    }

    draw(ctx){
        ctx.drawImage(this.g, this.x, this.y, this.width, this.height);
    }
}