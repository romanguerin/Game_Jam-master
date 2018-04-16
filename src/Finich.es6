class Finich {
    constructor() {
        this.finich = {
            xPos: 0,
            yPos: 0,
            height: 20,
            width: 650,
            color: "rgba(14,214,0,1)",
        };
    }


    get pos5 () {
        return {
            x: this.finich.xPos,
            y: this.finich.yPos,
            width: this.finich.width,
            height: this.finich.height,
            color: this.finich.color
        };
    }
}


module.exports = Finich;