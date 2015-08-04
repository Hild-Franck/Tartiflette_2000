/**
 * Created by Hild Franck on 7/8/2015.
 */

var game = {
    canvas: document.getElementById("canvas"),
    context: canvas.getContext("2d"),

    fps: 60,
    xOffSet: 0,
    yOffSet: 0,

    objects:{
        length: 0,

        add: function(obj){
            Array.prototype.push.call(this, obj);
        },
        refresh: function(arr, obj){
            this.length = 0;
            arr.push(obj);
            Array.prototype.push.call(this, arr);
            this.arrange();
        },
        arrange: function(){
                game.objects[0].sort(function(a, b){
                    if(a.y < b.y)
                        return -1;
                    if(a.y > b.y)
                        return 1;
                    return 0;
                });
        }
    },
    map:{
        tileSheet: new Image(),
        height: 10,
        width: 10,
        init: function(tileSheetFile, _width, _height){
            this.tileSheet.src = "resources/graphics/" + tileSheetFile;
            if(_width !== undefined)
                this.width = _width;
            if(_height !== undefined)
                this.height = _height;
        },
        dispTile: function(x, y){
            game.context.drawImage(this.tileSheet, 0, 0, 32, 32, x, y, 32, 32);
        },
        drawMap: function(){
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    this.dispTile(32 * i + game.xOffSet, 32 * j + game.yOffSet);
                }
            }
        }
    },
    init: function(){
        this.map.init("Outside_A2.png");
        this.addListeners();
    },
    portview: function(obj, pVwWdtOffset, pVwHgtOffset){
        if(obj.x + this.xOffSet > this.canvas.width - pVwWdtOffset)
            this.xOffSet += (this.canvas.width - pVwWdtOffset) - (obj.x + this.xOffSet);
        if(obj.x + this.xOffSet < 0 + pVwWdtOffset)
            this.xOffSet += pVwWdtOffset - (obj.x + this.xOffSet);
        if(obj.y + this.yOffSet > this.canvas.height - pVwHgtOffset)
            this.yOffSet += (canvas.height - pVwHgtOffset) - (obj.y + this.yOffSet);
        if(obj.y + this.yOffSet < 0 + pVwWdtOffset)
            this.yOffSet += pVwHgtOffset - (obj.y + this.yOffSet);
    },
    addListeners: function(){
        addEventListener("keydown", function(event){
            if(event.keyCode == 68)
                player.rightSwitch = true;
            if(event.keyCode == 81)
                player.leftSwitch = true;
            if(event.keyCode == 90)
                player.upSwitch = true;
            if(event.keyCode == 83)
                player.downSwitch = true;
        }, true);
        addEventListener("keyup", function(event){
            if(event.keyCode == 68)
                player.rightSwitch = false;
            if(event.keyCode == 81)
                player.leftSwitch = false;
            if(event.keyCode == 90)
                player.upSwitch = false;
            if(event.keyCode == 83)
                player.downSwitch = false;
            if(event.keyCode == 69)
                player.attack();
        }, true);
    },
    animate: function(obj){
        this.drawObj(obj, (obj.frame + 3 * obj.sprite), obj.sprInd,obj.x,obj.y);
        obj.countDraw++;

        if (obj.countDraw == game.fps)
            obj.countDraw = 0;
        if (obj.countDraw % Math.floor(game.fps / obj.nbrFrame) == 0)
            obj.frame++;
        if (obj.frame >= obj.nbrFrame)
            obj.frame = 0;

        if(obj.xPrev == obj.x && obj.yPrev == obj.y)
            obj.frame = 1;
    },
    drawObjects: function(){
        for(var i = 0; i < game.objects[0].length; i++){
            game.objects[0][i].draw();
        }
    },
    drawObj: function(obj,sprIndX,sprIndY,posX,posY,width,height){
        width = typeof width !== 'undefined' ?  width : 1;
        height = typeof height !== 'undefined' ?  height : 1;
        posX = typeof posX !== 'undefined' ? posX : obj.x;
        posY= typeof posY !== 'undefined' ? posY : obj.y;

        game.context.drawImage(obj.spriteSheet,  sprIndX * 32 , sprIndY * 32, width * 32, height * 32, posX + game.xOffSet - obj.xSpot, posY + game.yOffSet - obj.ySpot, width * 32,height * 32);
    },
    writeText: function(text,x,y,color,opacity,isStatic){
        color = typeof color !== 'undefined' ? color : "black";
        opacity = typeof opacity !== 'undefined' ? opacity : 1;
        isStatic = typeof isStatic !== 'undefined' ? isStatic : false;

        this.context.globalAlpha = opacity;
        this.context.fillStyle = color;
        if(isStatic)
            this.context.fillText(text,x,y);
        else
            this.context.fillText(text,x + game.xOffSet,y + game.yOffSet);
        this.context.globalAlpha = 1;
    },
    textFx: {
        x: 0,
        y: 0,
        opacity: 1,
        yShift: 0,

        headText: function(text,x,y,color){
            if(this.opacity > 0){
                game.writeText(text,x,y - this.yShift,color,this.opacity);
                this.yShift++;
                this.opacity -= 0.03;
            }
        }
    },
    update: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.drawMap();
        this.portview(player,100,100);
        player.update();
        player.draw();
        player.drawLife();
    }
};

var player = {
    spriteSheet: new Image(),
    countDraw: 0,
    frame: 0,
    nbrFrame: 3,
    sprite: 1,
    sprInd: 0,

    heigth: 32,
    width: 32,


    x: 60,
    y: 60,
    xPrev: 0,
    yPrev: 0,
    xSpot: 16,
    ySpot: 16,
    speed: 4,

    maxHp: 1000,
    currentHp: 920,

    leftSwitch: false,
    rightSwitch: false,
    upSwitch: false,
    downSwitch: false,

    init: function(_sprite, xStart, yStart){
        this.spriteSheet.src = "resources/graphics/Actor1.png";
        this.x = (xStart !== undefined) ? xStart : this.x;
        this.y = (yStart !== undefined) ? yStart : this.y;
        this.sprite = (_sprite !== undefined) ? _sprite : this.sprite;
    },

    attack: function(){
        console.log("Attaque !");
        socket.emit('message', 'Attaque lancée !');
    },

    draw: function(){
        game.animate(this);
    },

    drawLife: function(){
        game.context.strokeRect(5,5,101,21);
        game.context.fillStyle = "#E00000";
        game.context.fillRect(6,6,this.currentHp / this.maxHp * 99,19);
        game.writeText("HP",110,20,"E00000",1,true);
    },

    update: function(){
        this.xPrev = this.x;
        this.yPrev = this.y;

        if(this.leftSwitch && this.upSwitch){
            this.x -= this.speed/Math.sqrt(2);
            this.y -= this.speed/Math.sqrt(2);
        }
        else if(this.leftSwitch && this.downSwitch){
            this.x -= this.speed/Math.sqrt(2);
            this.y += this.speed/Math.sqrt(2);
        }
        else if(this.rightSwitch && this.upSwitch){
            this.x += this.speed/Math.sqrt(2);
            this.y -= this.speed/Math.sqrt(2);
        }
        else if(this.rightSwitch && this.downSwitch){
            this.x += this.speed/Math.sqrt(2);
            this.y += this.speed/Math.sqrt(2);
        }
        else{
            if(this.leftSwitch) {
                this.x -= this.speed;
                this.sprInd = 1;
            }
            if(this.rightSwitch) {
                this.x += this.speed;
                this.sprInd = 2;
            }
            if(this.upSwitch) {
                this.y -= this.speed;
                this.sprInd = 3;
            }
            if(this.downSwitch) {
                this.y += this.speed;
                this.sprInd = 0;
            }
        }

    }
};
debug = new Debug();
game.init();
player.init();

setInterval(function(){
    debug.clear();
    game.update();
    debug.monitor("x: ", player.x);
    debug.monitor("y: ", player.y);
    debug.monitor("frame: ", player.frame);
    debug.monitor("opacity ",game.textFx.opacity);
    debug.show();
}, 1000/game.fps);