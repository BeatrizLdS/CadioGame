
export default class Layer {
    constructor(gameWidth, gameHeight, imageName, speed, x, y, width, height) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.speed = speed;
        this.image = new Image();
        this.image.src = imageName;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.x1 = 0;
        this.x2 = gameWidth;
    }

    draw(context) {
        context.drawImage(this.image,
            this.x1 + this.x, this.y,
            this.width, this.height
        );
        context.drawImage(this.image,
            this.x2 + this.x, this.y,
            this.width, this.height
        );
    }

    update() {
        this.x1 = Math.floor(this.x1 - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);

        if (this.x1 < -this.gameWidth) {
            this.x1 = this.gameWidth - this.speed;
        }
        if (this.x2 < -this.gameWidth) {
            this.x2 = this.gameWidth - this.speed;
        }
    }
}