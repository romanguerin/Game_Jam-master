class Player {
    constructor() {
        this.player = {
            xPos: 300,
            yPos: 780,
            height: 10,
            width: 10,
            hp: 3,
            color: "rgba(255,224,50,5)",
            gravity: 0.5,
            gravitySpeed: 0.2,
            jump: false,
            stay: false,
            basic: false,
            under: false,
            finich: false


        };
        this.key = true; //Zorgt dat het niet continu de key indrukt
    };


    move(movement) {
        if (movement.left && this.player.xPos <= window.innerWidth - window.innerWidth) {
            this.player.xPos = 0;
        } else if (movement.left) {
            this.player.xPos -= 10;
        }

        if (movement.right && this.player.xPos >= window.innerWidth - 10) {
            this.player.xPos = window.innerWidth;
        } else if (movement.right) {
            this.player.xPos += 10;
        }

        if (movement.up && this.key == true) {      //zorgt er voor dat het niet automatisch door springt
            this.player.jump = true;
            this.key = false;
        }

        if (this.player.jump == true) {                         // spring functie pas wanner je klikt
            // console.log(this.player.yPos);
            this.player.gravitySpeed += this.player.gravity;
            this.player.yPos -= 20 - this.player.gravitySpeed;
            this.key = false;
            //console.log('speed' + this.player.gravitySpeed);
        }

        if ((this.player.gravitySpeed >= 5)                               //kijkt of hij omhoogspringt
            && (this.player.gravitySpeed <= 14)) {
            this.player.under = true;
            //console.log("up")
        }

        if (this.player.gravitySpeed >= 14) {
            this.player.under = false;
            // console.log("down")
        }


        if (this.player.gravitySpeed >= 28)                                 //zorgt ervoor dat de gravity niet te snel gaat waardoor de player door het platform valt
        {
            this.player.gravitySpeed = 28;
        }


        if (this.player.basic == true) {
            this.player.gravitySpeed += this.player.gravity;
            this.player.yPos -= 10 - this.player.gravitySpeed;     // continu springen
        }

        this.collision();  //particle
        this.collision2();  //platform
        this.collision3();  //finich

    }

    collision(particle) {
        if (!particle) return;

        if ((particle.x + particle.width >= this.player.xPos)
            && (particle.x <= this.player.xPos + this.player.width)
            && (particle.y + particle.height >= this.player.yPos)
            && (particle.y <= this.player.yPos + this.player.height)
        ) {
            //console.log(this.player.hp - 1);
            this.player.hp = this.player.hp - 1;
            this.player.color = "rgba(200,0,0,1)";
            setTimeout(()=> {
                this.player.color = "rgba(255,224,50,5)";
            }, 100);
            return true;
        }
        return false;
    };

    collision2(platforms) {
        if (!platforms) return;

        if ((platforms.x + platforms.width >= this.player.xPos)                        // collide met platform van boven
            && (platforms.x <= this.player.xPos + this.player.width)
            && (platforms.y + platforms.height >= this.player.yPos)
            && (platforms.y <= this.player.yPos + this.player.height)
        ) {
            // console.log("platform");
            this.player.gravitySpeed = 0.5;
            this.key = true;
            this.player.jump = false;
            this.player.basic = true;
        }
        if ((this.player.under == true)
            && (platforms.x + platforms.width >= this.player.xPos)                        // collide met platform van onder
            && (platforms.x <= this.player.xPos + this.player.width)
            && (platforms.y + platforms.height >= this.player.yPos)
            && (platforms.y <= this.player.yPos + this.player.height)
        ) {
            this.player.gravitySpeed = 20;
            this.player.yPos += 10;
        }
    };

    collision3(finich) {
        if (!finich) return;

        if ((finich.x + finich.width >= this.player.xPos)
            && (finich.x <= this.player.xPos + this.player.width)
            && (finich.y + finich.height >= this.player.yPos)
            && (finich.y <= this.player.yPos + this.player.height)
        ){
            console.log("finich");
            this.player.finich = true;

        }
    };


    get pos1() {
        return {
            x: this.player.xPos,
            y: this.player.yPos,
            width: this.player.width,
            height: this.player.height,
            color: this.player.color
        };
    }

    get heap() {
        return {
            hp: this.player.hp,
            fn: this.player.finich
        };
    }
}

module.exports = Player;