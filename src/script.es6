const Player = require("./Player.es6");
const Enemy = require("./Enemy.es6");
const Particles = require("./particles.es6");
const KeyView = require("./KeyView.es6");
const CanvasView = require("./CanvasView.es6");


class Controller {
    constructor() {
        this.player = new Player();
        this.enemy = new Enemy();
        this.particles = [];
        this.key = new KeyView();
        this.canvas = new CanvasView();
    }
    loop() {
        this.canvas.clear();

        this.player.move(this.key.location);

        this.enemy.move(this.canvas.bounds);

        this.canvas.drawPlayer(this.player.pos1);

        this.canvas.drawEnemy(this.enemy.pos2);



        if (this.particles.length <= 25) {
            let x = this.enemy.pos2.x + this.enemy.pos2.width/2;
            let y = this.enemy.pos2.y + this.enemy.pos2.height/2;
            this.particles.push(new Particles(x,y));
        }

        this.particles.forEach((part) => {
            part.move();
            part.die();
            this.canvas.drawParticles(part.pos3);
            let dead = this.player.collision(part.pos3);
            if (dead) {
                part.particle.dead = true;
            }
        });

        this.particles = this.particles.filter (function(part) {
            return part.particle.dead == false;
        });



        window.requestAnimationFrame(() => {
            this.loop();
        });
    }
}

const control = new Controller();
control.loop();

setInterval(() => {
}, 3000);