export default class Food {
    constructor(startX, y) {
        let imageName = this.#getRandomImageName();

        this.image = new Image();
        this.image.src = './Resources/Foods/'+imageName;
        this.x = startX;
        this.originalY = y;
        this.y = y;
        this.width = 300;
        this.height = 300;
    }

    #getRandomImageName() {
        var types = ['1', '2'];
        let indexType = Math.floor(Math.random() * types.length);
        let type = types[indexType];

        let names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
        let indexName = Math.floor(Math.random() * names.length);
        let name = names[indexName];

        return type+'-'+name+'.png';
    }

    update() {
        this.x--;
    }
    
    draw(context) {
        context.drawImage(this.image,
            this.x, this.y,
            this.width, this.height
        );  
    }
}