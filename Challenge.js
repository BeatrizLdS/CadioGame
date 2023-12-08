export default class Challenge {
    constructor(type, gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.type = type

        if (type == 1) {
            this.background = document.getElementById('firstChallengeBackground');
            this.title = document.getElementById('firstChallengeTitle');
            this.instruction = document.getElementById('firstChallengeInstruction');
            this.image = document.getElementById('firstChallengeImage');
            this.AButton = document.getElementById('firstChallengeAButton');
            this.BButton = document.getElementById('firstChallengeBButton');
            this.ADescription = document.getElementById('firstChallengeADescription');
            this.BDescription = document.getElementById('firstChallengeBDescription');

            this.rightAnswer = 'A';

            this.buttonARect = new Rect(
                this.gameWidth * 0.35, 
                this.gameHeight * 0.55,
                this.gameWidth/20, this.gameWidth/20
            );
            this.buttonBRect = new Rect(
                this.gameWidth * 0.6, 
                this.gameHeight * 0.55,
                this.gameWidth/20, this.gameWidth/20
            );
        }
        else if (type == 2) {
            this.background = document.getElementById('secondChallengeBackground');
            this.title = document.getElementById('secondChallengeTitle');
            this.instruction = document.getElementById('secondChallengeInstruction');
            this.AButton = document.getElementById('secondChallengeAButton');
            this.BButton = document.getElementById('secondChallengeBButton');

            this.rightAnswer = 'B';

            let buttonsProportion = 496/115;
            let buttonsHeight = this.gameHeight/8;
            let buttonsWidth = buttonsHeight * (buttonsProportion);

            this.buttonARect = new Rect(
                this.gameWidth * 0.2, 
                this.gameHeight * 0.4,
                buttonsWidth, buttonsHeight
            );

            this.buttonBRect = new Rect(
                (this.gameWidth * 0.8) - (buttonsWidth), 
                this.gameHeight * 0.6,
                buttonsWidth, buttonsHeight
            );
        }
        else if (type == 3) {
            this.background = document.getElementById('thirdChallengeBackground');
            this.title = document.getElementById('thirdChallengeTitle');
            this.instruction = document.getElementById('thirdChallengeInstruction');
            this.AButton = document.getElementById('thirdChallengeAButton');
            this.BButton = document.getElementById('thirdChallengeBButton');

            this.rightAnswer = 'A';

            let buttonsProportion = 504/166;
            let buttonsHeight = this.gameHeight/10;
            let buttonsWidth = buttonsHeight * (buttonsProportion);

            this.buttonARect = new Rect(
                (this.gameWidth * 0.5) - (buttonsWidth), 
                this.gameHeight * 0.5,
                buttonsWidth, buttonsHeight
            );

            this.buttonBRect = new Rect(
                (this.gameWidth * 0.5) + (10), 
                this.gameHeight * 0.5,
                buttonsWidth, buttonsHeight
            );
        }
    }

    draw(context) {
        if (this.type == 1) this.drawFirstType(context);
        else if (this.type == 2) this.drawSecondType(context);
        else if (this.type == 3) this.drawThirdType(context);
    }

    drawFirstType(context) {
        context.drawImage(this.background,
            0, 0,
            this.gameWidth, this.gameHeight
        ); 
        
        context.drawImage(this.title,
            this.gameWidth/4, this.gameHeight/8,
            this.gameWidth/2, this.gameHeight/15
        ); 

        context.drawImage(this.instruction,
            this.gameWidth/4, this.gameHeight/4,
            this.gameWidth/2, this.gameHeight * 0.04
        );
        
        context.drawImage(this.image,
            (this.gameWidth/2) - (this.gameWidth/12), 
            (this.gameHeight/2) - (this.gameHeight/6),
            this.gameWidth/6, this.gameHeight/6
        ); 

        context.drawImage(this.AButton,
            this.buttonARect.x, 
            this.buttonARect.y,
            this.buttonARect.width, this.buttonARect.height
        ); 

        context.drawImage(this.BButton,
            this.buttonBRect.x, 
            this.buttonBRect.y,
            this.buttonBRect.width, this.buttonBRect.height
        );
        
        context.drawImage(this.ADescription,
            this.gameWidth * 0.35, 
            this.gameHeight * 0.68,
            this.gameWidth/20, this.gameHeight/28
        ); 

        context.drawImage(this.BDescription,
            this.gameWidth * 0.59, 
            this.gameHeight * 0.68,
            this.gameWidth/14, this.gameHeight/15
        );
    }

    drawSecondType(context) {
        context.drawImage(this.background,
            0, 0,
            this.gameWidth, this.gameHeight
        );
        
        let titleWidth = (this.gameHeight/15) * (1796/139);
        context.drawImage(this.title,
            (this.gameWidth/2) - (titleWidth/2), this.gameHeight/8,
            titleWidth, this.gameHeight/15
        );

        let instructionWidth = (this.gameHeight * 0.04) * (1036/72);
        context.drawImage(this.instruction,
            (this.gameWidth/2) - (instructionWidth/2), this.gameHeight/4,
            instructionWidth, this.gameHeight * 0.04
        ); 

        context.drawImage(this.AButton,
            this.buttonARect.x, 
            this.buttonARect.y,
            this.buttonARect.width, this.buttonARect.height
        ); 

        context.drawImage(this.BButton,
            this.buttonBRect.x, 
            this.buttonBRect.y,
            this.buttonBRect.width, this.buttonBRect.height
        );
    }

    drawThirdType(context) {
        context.drawImage(this.background,
            0, 0,
            this.gameWidth, this.gameHeight
        );

        let titleWidth = (this.gameHeight/15) * (1646/128);
        context.drawImage(this.title,
            (this.gameWidth/2) - (titleWidth/2), this.gameHeight/8,
            titleWidth, this.gameHeight/15
        );

        let instructionHeight = this.gameHeight * 0.2;
        let instructionWidth = (instructionHeight) * (872/286);
        context.drawImage(this.instruction,
            (this.gameWidth/2) - (instructionWidth/2), this.gameHeight/4,
            instructionWidth, instructionHeight
        );
        
        context.drawImage(this.AButton,
            this.buttonARect.x, 
            this.buttonARect.y,
            this.buttonARect.width, this.buttonARect.height
        ); 

        context.drawImage(this.BButton,
            this.buttonBRect.x, 
            this.buttonBRect.y,
            this.buttonBRect.width, this.buttonBRect.height
        );
    }
    
    update(input, game) {
        if (input.lastKey == "Click") {
            let selected;
            if (this.buttonARect.contains(input.x, input.y)) {
                selected = 'A';
            } else if (this.buttonBRect.contains(input.x, input.y)) {
                selected = 'B';
            }
            if (selected == this.rightAnswer) {
                game.score++;
            }
            game.challengeActivity = false;
        }
    }
}

function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
 }

 Rect.prototype.contains = function(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
 };
