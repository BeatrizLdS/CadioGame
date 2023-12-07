export default class Food {
    constructor(startX, y, gameVelocity) {
        let imageName = this.#getRandomImageName();

        this.velocity = gameVelocity

        this.image = new Image();
        this.image.src = './Resources/Foods/'+imageName;
        this.x = startX;
        this.originalY = y;
        this.y = y;
        this.width = 100;
        this.height = 100;

        this.markedForDelection = false;

        this.collisionDimension = this.width/1.5;
        this.collisionFix = this.width / 4;
    }

    #getRandomImageName() {
        var types = ['1', '2'];
        let indexType = Math.floor(Math.random() * types.length);
        let type = types[indexType];
        this.foodType = type == '1'? 'good' : 'bad';

        let names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
        let indexName = Math.floor(Math.random() * names.length);
        let name = names[indexName];

        return type+'-'+name+'.png';
    }

    update() {
        this.x -= this.velocity;
        if (this.x < 0 - this.width) this.markedForDelection = true;
    }
    
    draw(context) {
        context.drawImage(this.image,
            this.x, this.y,
            this.width, this.height
        );  
    }
    
    // Desenha um quadrado ao redor da área de colisão da comida
    drawCollisionArea(context) {
        context.strokeStyle = 'red'; // Cor do quadrado (pode ser ajustada)
        context.lineWidth = 2; // Largura da linha do quadrado (pode ser ajustada)

        context.strokeRect(
            this.x + this.collisionFix, this.y + this.collisionFix, this.collisionDimension, this.collisionDimension
        );
    }
}