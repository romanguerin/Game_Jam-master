class Platform {
    constructor(props) {
        this.platform = props;
    };



    get pos4 () {
        return {
            width: this.platform.width,
            height: this.platform.height,
            x: this.platform.xPos,
            y: this.platform.yPos,
            color: this.platform.color,
        }
    }
}

module.exports = Platform;



