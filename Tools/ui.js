import {Paint} from "./paint.js";
class Ui {
    constructor() {
        //Ui interface
        this.eraser = document.getElementById("eraser");
        this.draw = document.getElementById("draw");
        this.red = document.getElementById("red");
        this.clearbtn = document.getElementById("delete");
        this.putCanvas = document.getElementById("putdraw")
        this.isDrawing = false;
        this.isEraser = false;
        
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");    
        this.paint = new Paint("#000", 1, this.context);
        this.line = new Paint("#FF0500", 1, this.context);
        this.mousex = 0;
        this.mousey = 0;
        this.lastx  = 0;
        this.lasty  = 0;
        this.cx = 8;
        this.cy = 28;
        this.cursormousex = 0;
        this.cursormousey = 0;
        this.ImageData = [];
        this.mousepresed = false;
        this.datapath = [];
        this.eraserpath = [];

        this.totalpath = [];

        this.redline = new Paint("#FF0000", 1, this.context);

        this.canvas2 = oCanvas.create({
            canvas: "#canvas"
        });
        /*this.canvas2.setLoop(() => {
            if (this.isDrawing) {
                if (this.mousepresed) {
                    this.cursormousex += ((this.mousex - this.cx) - this.cursormousex) / 7;
                    this.cursormousey += ((this.mousey - this.cy) - this.cursormousey) / 7;
                    var line = this.canvas2.display.line({
                        start: { x: this.lastx, y: this.lasty },
                        end: { x: this.cursormousex, y: this.cursormousey },
                        stroke: "1px #000"
                    });
                    console.log("BEEE");
                    
                    this.canvas2.addChild(line);
                    //console.log(this.cursormousex);
                    //this.paint.path(this.lastx, this.lasty, this.cursormousex, this.cursormousey);
                    this.lastx = this.cursormousex;
                    this.lasty = this.cursormousey;
                    //this.redline.path(this.cursormousex, this.cursormousey, (this.mousex - this.cx), (this.mousey - this.cy));
              
                }
            } else if (this.isEraser) {
                if (this.mousepresed) {
    
                    this.cursormousex += ((this.mousex - this.cx) - this.cursormousex) * 0.07;
                    this.cursormousey += ((this.mousey - this.cy) - this.cursormousey) * 0.07;
                    this.paint.eraser(this.cursormousex, this.cursormousey, 10, 10);
                    this.datapath.push({
                        lx: this.cursormousex, 
                        ly: this.cursormousey, 
                        tox: 10, 
                        toy: 10, 
                        color: "delete"});
                    this.lastx = this.cursormousex;
                    this.lasty = this.cursormousey; 
                }
            }
        });*/
        /*var sprite_1 = canvas.display.sprite({
            x: 144,
            y: 137,
            generate: true,
            width: 20,
            height: 20,
            direction: "x",
            frame: 1
        });*/
        //this.canvas2.addChild(sprite_1);
        /*var rectangle = this.canvas2.display.rectangle({
            x: 200,
            y: 77,
            width: 200,
            height: 100,
            fill: "#0aa"
        });
        
        this.canvas2.addChild(rectangle);
        var line = this.canvas2.display.line({
            start: { x: 0, y: 0 },
            end: { x: 100, y: 100 },
            stroke: "5px #000",
            cap: "round"
        });
        rectangle.addChild(line);
        this.canvas2.timeline.start();*/
    }
    resetVars() {
        this.isDrawing = false;
        this.isEraser = false;
    }
    setUpMouse() {

        //Events;
       this.canvas.addEventListener("mousemove", (e) => {
          this.mouseMove(e);
       }, true);
       this.canvas.addEventListener("mousedown", (e) => {
           this.mousepresed = true;
           this.cursormousex = this.mousex - this.cx ;
           this.cursormousey = this.mousey - this.cy;
           this.lastx = this.mousex - this.cx;
           this.lasty = this.mousey - this.cy;
           
       });
       this.canvas.addEventListener("mouseup", (e) => {
        
           this.mousepresed = false;
       });
       this.draw.addEventListener("click", (e) => {
           this.resetVars();
           this.paint = new Paint("#000", 1, this.context);
           this.isDrawing = true;
       });
       this.red.addEventListener("click", (e) => {
           this.resetVars();
           this.isDrawing = true;
           this.paint = new Paint("#FF0000", 1, this.context);
           
       });
       this.eraser.addEventListener("click", (e) => {
            this.resetVars();
            this.isEraser = true;
    
       });
       this.clearbtn.addEventListener("click", (e) => {
            this.context.clearRect(0,0, 1200, 700);
       });
       this.putCanvas.addEventListener("click", (e) => {
           console.log(this.datapath);
           
           //this.context.putImageData(this.ImageData, 0, 0);
       })
       //CAnvas Test
       
    }
    initFrame() {
        setInterval(() => {
            this.onEnterFrame();
        }, 16.6);
    }
    render() {
        console.log(this.datapath.length);
        for (var i = 0; i < this.datapath.length; i++) {
            if (this.datapath[i].color != "delete") {
                this.paint.redrawpath(
                this.datapath[i].lx, 
                this.datapath[i].ly,
                this.datapath[i].tox,
                this.datapath[i].toy,
                this.datapath[i].color);
            } else {
                this.paint.eraser(
                    this.datapath[i].lx, 
                    this.datapath[i].ly,
                    this.datapath[i].tox, 
                    this.datapath[i].toy);
            }
            
        }
    }
    onEnterFrame() {
        //enable EASE;
        //this.context.clearRect(0, 0, 1200, 700);
        if (this.isDrawing) {
            if (this.mousepresed) {
                this.cursormousex += ((this.mousex - this.cx) - this.cursormousex) / 7;
                this.cursormousey += ((this.mousey - this.cy) - this.cursormousey) / 7;
                console.log(this.cursormousex);
                this.paint.path(this.lastx, this.lasty, this.cursormousex, this.cursormousey);
                this.lastx = this.cursormousex;
                this.lasty = this.cursormousey;
                //this.redline.path(this.cursormousex, this.cursormousey, (this.mousex - this.cx), (this.mousey - this.cy));
          
            }
        } else if (this.isEraser) {
            if (this.mousepresed) {

                this.cursormousex += ((this.mousex - this.cx) - this.cursormousex) * 0.07;
                this.cursormousey += ((this.mousey - this.cy) - this.cursormousey) * 0.07;
                this.paint.eraser(this.cursormousex, this.cursormousey, 10, 10);
                this.datapath.push({
                    lx: this.cursormousex, 
                    ly: this.cursormousey, 
                    tox: 10, 
                    toy: 10, 
                    color: "delete"});
                this.lastx = this.cursormousex;
                this.lasty = this.cursormousey; 
            }
        }
        
        //this.render();
          
    }
    mouseMove (e) {
        this.mousex = e.clientX;
        this.mousey = e.clientY;
    }
}
var p = new Ui();
console.log(p);
p.setUpMouse();
p.initFrame();
