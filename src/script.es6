const Player = require("./Player.es6");
const Enemy = require("./Enemy.es6");
const Particles = require("./particles.es6");
const KeyView = require("./KeyView.es6");
const CanvasView = require("./CanvasView.es6");
const Platform = require("./Platform.es6");
const Finich = require("./Finich.es6");

const items = [];                   //array1 van platofrm
const items2 = [];//array2 van score
console.log (items);
console.log (items2);
$.ajax({                                                                                                                //ajax vraagt via jquery de Json file op
    dataType: "json",
    url: "Database.json",
    type: "get",
    async: false,
    success: function (data) {
        $(data.Level1).each(function(key,value) {                                                                       // value is wat je ziet in json
            items.push(key,value);                                                                                      //
        });

        $(data.scoreS).each(function(key,value) {
        items2.push(key,value);
        });

    },
    fail: function (error) {
        console.log('err', error);
    }
});


class Controller {
    constructor() {
        this.platforms = [];
        this.platforms = items.map((item) => {   //map maakt er een niew array van => functie
            return new Platform(item);
        });

        this.score = [];
        this.score = items2.map((item) => {   //map maakt er een niew array van                                         //The map() method creates a new array with the results of
                                                                                                                        // calling a provided function on every element in this array.

           return item;
        });

        this.score[1] = 0;
        console.log(this.score[1]);

        this.player = new Player();
        this.enemy = new Enemy();
        this.particles = [];
        this.key = new KeyView();
        this.canvas = new CanvasView();
        this.lastPush = Date.now();                                                                                     // Huidige tijd
        this.interval = Math.random() * 2000;                                                                           // Random getal tussen 0 en 2000
        this.finich = new Finich();

        this.count = 0;                                                                                                 // telt in loop
        this.hardness = 0;                                                                                              // Zet moeilijkheidsgraad
        this.game = 0;                                                                                                  // restart game
    }

    loop() {
        this.canvas.clear();
        this.player.move(this.key.location);
        this.enemy.move(this.canvas.bounds);

        this.canvas.drawPlayer(this.player.pos1);                                                                       // draw in je loop
        this.canvas.drawFinich(this.finich.pos5);
        this.canvas.drawEnemy(this.enemy.pos2);
        this.canvas.drawHp(this.player.heap);
        this.canvas.drawScore(this.score[1]);

        this.player.collision3(this.finich.pos5);

        if (Date.now() - this.lastPush > this.interval){
            let x = this.enemy.pos2.x + this.enemy.pos2.width/2;
            let y = this.enemy.pos2.y + this.enemy.pos2.height/2;
            this.particles.push(new Particles(x,y,this.hardness));

            this.lastPush = Date.now();                                                                                 // Zet nieuwe huidige tijd
            this.interval = Math.random() * 2000;                                                                       // Zet nieuw random getal
            //console.log("new")
        }

        this.platforms.forEach((forms) => {
            // console.log(forms);
            this.canvas.drawPlatform(forms.pos4);                                                                       //tekend de platforms
            this.player.collision2(forms.pos4);
        });


        if (this.player.heap.hp <= 0){
            this.game += 1;

        }

        if (this.game == 1){                                                                                            //Af, restart game
            alert("GAME OVER");
            location.reload();
        }


        if (this.player.heap.fn == true){
            this.game += -1;
        }

        if (this.game == -1){                                                                                          //Win, restart game
            alert("You won");
            this.score[1] = 1;                          // score wordt 1
            console.log(this.score[1]);
            location.reload();
        }


        this.hardness = 1+this.count/500;                                                                               // wordt sneller

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