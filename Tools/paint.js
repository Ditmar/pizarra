class Paint {
    constructor(color, style, context) {
        this.color = color;
        this.style = style;
        this.context = context;
    }
    getColor () {
        return this.color;
    }
    path(initx, inity, mousex, mousey) {
        this.context.beginPath();
        this.context.moveTo(initx, inity);
        this.context.lineTo(mousex, mousey);
        this.context.lineWidth = this.style;
        this.context.lineCap="round";
        this.context.strokeStyle = this.color;
        this.context.stroke();
        this.context.closePath();
    }
    redrawpath(initx, inity, mousex, mousey, color) {
        this.context.beginPath();
        this.context.moveTo(initx, inity);
        this.context.lineTo(mousex, mousey);
        this.context.lineWidth = 1;
        this.context.lineCap="round";
        this.context.strokeStyle = color;
        this.context.stroke();
        this.context.closePath();
    }
    eraser(x, y, w, h) {
        this.context.clearRect(x, y, w, h);
        //this.context.end();
    }
}
export {Paint}