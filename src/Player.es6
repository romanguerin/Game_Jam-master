class Player {
    constructor() {
        this.player = {
            xPos: 300,
            yPos: 300,
            height: 10,
            width: 10,
            hp: 3,
            color: "rgba(0,204,102,1)"
        };
    }
    move(movement) {
        if (movement.left && this.player.xPos <= window.innerWidth - window.innerWidth) {
            this.player.xPos == 0;
        } else if (movement.left) {
            this.player.xPos -= 10;
        }

        if(movement.right && this.player.xPos >= window.innerWidth - 10) {
            this.player.xPos == window.innerWidth;
        } else if (movement.right) {
            this.player.xPos += 10;
        }

        if(movement.down && this.player.yPos >= window.innerHeight - 10) {
            this.player.yPos == window.innerHeight;
        } else if(movement.down){
            this.player.yPos += 10;
        }

        if(movement.up && this.player.yPos <= window.innerHeight - window.innerHeight) {
            this.player.yPos == 0;
        } else if(movement.up) {
            this.player.yPos -= 10;
        }
        this.collision();
    }

    collision(particle){
        if (!particle) return;

        if ((particle.x + particle.width >= this.player.xPos)
            && (particle.x <= this.player.xPos + this.player.width)
            && (particle.y + particle.height >= this.player.yPos)
            && (particle.y <= this.player.yPos + this.player.height)
        ) {
            console.log("hi");
            this.player.hp = this.player.hp - 1;
            this.player.color = "rgba(200,0,0,1)";
            setTimeout(()=>{ this.player.color = "rgba(0,254,0,1)";}, 100);
            return true;
        }
        return false;
    }

    get pos1() {
        return {
            x: this.player.xPos,
            y: this.player.yPos,
            width: this.player.width,
            height: this.player.height,
            color: this.player.color
        };
    }
}

module.exports = Player;