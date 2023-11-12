
export default class Background {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameSpeed = 5;

        this.ground = new Image();
        this.ground.src = 'ground.png';
        this.groundWidth = 1100;
        this.groundHeigh = 88;

        this.sky = new Image();
        this.sky.src = 'sky.png';

        this.x1 = 0;
        this.x2 = gameWidth;
    }

    draw(context) {
        context.drawImage(this.sky, 
            this.gameWidth/6 + this.x1, 0,
            1000, 500);
            context.drawImage(this.sky, 
                this.gameWidth/6 + this.x2, 0,
                1000, 500);

        context.drawImage(this.ground, 
            0 + this.x1, this.gameHeight - this.groundHeigh,
            this.gameWidth, this.groundHeigh);
        context.drawImage(this.ground, 
            this.x2, this.gameHeight - this.groundHeigh,
            this.gameWidth, this.groundHeigh);
    }

    update() {
        this.x1 -= this.gameSpeed;
        this.x2 -= this.gameSpeed;

        if (this.x1 < -this.gameWidth) {
            this.x1 = this.gameWidth - this.gameSpeed;
        }
        if (this.x2 < -this.gameWidth) {
            this.x2 = this.gameWidth - this.gameSpeed;
        }
    }
}