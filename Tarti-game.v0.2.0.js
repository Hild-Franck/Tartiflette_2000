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
        }, true);
    },
    animate: function(obj){
        this.context.drawImage(obj.spriteSheet, (obj.frame + 3 * obj.sprite) * 32, obj.sprInd * 32, 32, 32, obj.x + this.xOffSet - obj.xSpot, obj.y + this.yOffSet - obj.ySpot, 32, 32);
        obj.countDraw++;

        if (obj.countDraw == game.fps)
            obj.countDraw = 0;
        if (obj.countDraw % Math.floor(game.fps / obj.nbrFrame) == 0)
            obj.frame++;
        if (obj.frame >= obj.nbrFrame)
            obj.frame = 0;
    },
    drawObjects: function(){
        for(var i = 0; i < game.objects[0].length; i++){
            game.objects[0][i].draw();
        }
    },
    update: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.drawMap();
        player.update();
        player.draw();
    }
};

var player = {
    spriteSheet: new Image(),
    countDraw: 0,
    frame: 0,
    nbrFrame: 3,
    sprite: 0,
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

    draw: function(){
        game.animate(this);
    },

    update: function(){
        this.xPrev = this.x;
        this.yPrev = this.y;
        if(this.leftSwitch)
            this.x -= this.speed;
        if(this.rightSwitch)
            this.x += this.speed;
        if(this.upSwitch)
            this.y -= this.speed;
        if(this.downSwitch)
            this.y += this.speed;
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
    debug.show();
}, 1000/game.fps);