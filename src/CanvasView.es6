class CanvasView {
    constructor() {
        this.c = document.getElementById("myCanvas");
        this.ctx = this.c.getContext("2d");
        this.c.width = window.innerWidth = 650;
        this.c.height = window.innerHeight = 800;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    }
    drawHp(heap) {
        this.ctx.font = '48px serif';
        this.ctx.fillText("HP "  + heap.hp , 20, 50);                                                                   //draw hp

    }

    drawScore(score) {
        this.ctx.font = '48px serif';                                                                                   //draw score
        this.ctx.fillText("score  " + score , 400, 50);
        //console.log(score);

    }

    drawPlayer(pos1) {
        this.ctx.fillStyle = pos1.color;
        this.ctx.fillRect(pos1.x, pos1.y, pos1.width, pos1.height);
    }

    drawEnemy(pos2) {
        this.ctx.fillStyle = pos2.color;
        this.ctx.fillRect(pos2.x, pos2.y, pos2.width, pos2.height);
    }

    drawParticles(pos3) {
        this.ctx.fillStyle = pos3.color;
        this.ctx.fillRect(pos3.x, pos3.y, pos3.width, pos3.height);
    }

    drawPlatform(pos4) {
        this.ctx.fillStyle = pos4.color ;
        this.ctx.fillRect(pos4.x, pos4.y, pos4.width, pos4.height);

    }
    drawFinich(pos5) {
        this.ctx.fillStyle = pos5.color ;
        this.ctx.fillRect(pos5.x, pos5.y, pos5.width, pos5.height);

    }



    get bounds() {
        return {
            width: this.c.width,
            height: this.c.height,
        }
    }
}

module.exports = CanvasView;