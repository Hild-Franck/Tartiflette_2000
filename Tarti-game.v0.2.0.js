/**
 * Created by Hild Franck on 7/8/2015.
 */

Image.prototype.tintImg = function(color, xStart, yStart, width, height){
    xStart = xStart || 0;
    yStart = yStart || 0;
    width = width || 32;
    height = height || 32;
    var colorRatio = 255/(color.red + color.green + color.blue);
    var tintCanvas = document.createElement('canvas');
    tintCanvas.width = width;
    tintCanvas.height = height;
    var tintContext = tintCanvas.getContext('2d');
    tintContext.drawImage(this, xStart, yStart, width, height, 0, 0, width, height);
    var pixelData = tintContext.getImageData(0, 0, width, height);

    for(var j = 0; j < height*width*4; j+=width*4) {
        for (var i = 0; i < width * 4; i += 4) {
            pixelData.data[i+j] += colorRatio*color.red;
            pixelData.data[i+j+1] += colorRatio*color.green;
            pixelData.data[i+j+2] += colorRatio*color.blue;
        }
    }
    tintContext.putImageData(pixelData,0,0);

    return tintCanvas.toDataURL();

};

function Sprite(imgPath, _width, _height, _sprite, _nbrFrame, _xSpot, _ySpot){
    this.image = new Image();
    this.tintImage = new Image();
    this.image.src = imgPath;
    this.spriteInd = _sprite;
    this.animInd = 0;
    this.nbrFrame = _nbrFrame || this.image.width / 32;
    this.frame = 0;
    this.width = _width;
    this.height = _height;
    this.widthMod = 1;
    this.heightMod = 1;
    this.xSpot = _xSpot || Math.floor(this.width/2);
    this.ySpot = _ySpot || Math.floor(this.height/2);
    this.isTint = false;
}


function Entity(){
    this.countDraw = 0;
    this.countDmg = 0;
}
Entity.prototype.draw = function(sprite, sprIndX, sprIndY, width){
    width = width || 1;
    game.context.drawImage(sprite.image,  sprIndX * 32 , sprIndY * 32, 32, 32, this.x - sprite.xSpot + game.xOffSet, this.y - sprite.ySpot + game.yOffSet, 32, 32);
};
Entity.prototype.animate = function(sprite, animSpeed){
    animSpeed = animSpeed || 1;
    if(!(sprite.isTint))
        this.draw(sprite, sprite.frame + 3 * sprite.spriteInd, sprite.animInd, this.x, this.y);
    else{
        this.sprite.tintImage.src = this.sprite.image.tintImg(new ColorRGB(255, 0, 0), (sprite.frame + 3 * sprite.spriteInd)*32, sprite.animInd*32);
        game.context.drawImage(sprite.tintImage, 0, 0, 32, 32, this.x - sprite.xSpot + game.xOffSet, this.y - sprite.ySpot + game.yOffSet, 32, 32);

    }
    this.countDraw++;

    if (this.countDraw >= Math.round((game.fps/sprite.nbrFrame)/animSpeed) * sprite.nbrFrame)
        this.countDraw = 0;
    if (this.countDraw % Math.round((game.fps/sprite.nbrFrame) / animSpeed) == 0)
        sprite.frame++;
    if (sprite.frame >= sprite.nbrFrame)
        sprite.frame = 0;

    /*if((this.frame - (this.spriteSheet.width / 32) * this.sprInd) >= this.spriteSheet.width / 32 && ind == 3) {
     this.sprInd += 1;
     }*/
};

Entity.prototype.death = function(){
    this.sprite.widthMod -= 0.02;
    this.sprite.tintImage.src = this.sprite.image.tintImg(new ColorRGB(255, 0, 0), (this.sprite.frame + 3 * this.sprite.spriteInd)*32, this.sprite.animInd*32);
    game.context.drawImage(this.sprite.tintImage, 0, 0, 32, 32, this.x - this.sprite.xSpot * this.sprite.widthMod + game.xOffSet, this.y - this.sprite.ySpot* (1/this.sprite.widthMod) + game.yOffSet, 32 * this.sprite.widthMod, 32);
    if(this.sprite.widthMod <= 0)
        this.dead = true;
};
Entity.prototype.takeDmg = function(dmg){
    game.createTxtFx(this, dmg, 15, false, false);
    if(dmg != 0){
        console.log("Compteur dommage "+this.countDmg); //  N'arrive pas a Detecter le this.countDmd alors qu'il est déclaré dans Entity #HelpFrank
        this.sprite.tintImage.src = this.sprite.image.tintImg(new ColorRGB(255, 0, 0), (this.sprite.frame + 3 * this.sprite.spriteInd)*32, this.sprite.animInd*32);
        game.context.drawImage(this.sprite.tintImage, 0, 0, 32, 32, this.x - this.sprite.xSpot + game.xOffSet, this.y - this.sprite.ySpot + game.yOffSet, 32, 32);
    }
};

function Enemy(_x, _y, _speed, _dirX, _id){
    this.type = 'enemy';
    this.xPrev = _x;
    this.yPrev = _y;
    this.x = _x;
    this.y = _y;
    this.speed = _speed;
    this.dirX = _dirX;
    this.countDraw = 0;
    this.sprite = new Sprite("resources/monster2.png", 32, 32, 0, 3);
    this.dying = false;
    this.dead = false;
    this.id = _id;
    this.display = function () {
        if(!this.dying) {
            var time = new Date();
            this.x += (((game.fps / 1000) * this.speed) * (time.getTime() - game.objects.servTime)) * this.dirX;
            if (this.dirX == -1)
                this.sprite.animInd = 1;
            if (this.dirX == 1)
                this.sprite.animInd = 2;
            if (this.y > this.yPrev)
                this.sprite.animInd = 3;
            if (this.y < this.yPrev)
                this.sprite.animInd = 0;
            this.animate(this.sprite, 1.5);
        }
        else
            this.death();
        this.xPrev = this.x;
        return true;
    };
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

function Player(_x, _y, _speed, _date, _key, sprite){
    this.type = 'player';
    this.xPrev = _x;
    this.yPrev = _y;
    this.x = _x;
    this.y = _y
    this.speed = _speed;
    this.sprInd = 0;
    this.frame = 0;
    this.xSpot = 16;
    this.ySpot = 16;
    this.nbrFrame = 3;
    this.countDraw = 0;
    this.key = _key;
    this.time = (new Date()).getTime();
    this.lastTime = _date;
    this.sprite = new Sprite("resources/Actor1.png", 32, 32, sprite, 3);
    this.display = function () {
        this.time = (new Date()).getTime();
        if(this.key != -1) {
            console.log("element.time: " + this.time);
            console.log("element.lastTime: " + this.lastTime);
            console.log("element.y: " + this.y);
            this.x += 0.06 * this.speed * player.dir[this.key][0] * (this.time - this.lastTime);
            this.y += 0.06 * this.speed * player.dir[this.key][1] * (this.time - this.lastTime);
            if (this.xPrev > this.x)
                this.sprInd = 1;
            if (this.xPrev < this.x)
                this.sprInd = 2;
            if (this.y > this.yPrev)
                this.sprInd = 3;
            if (this.y < this.yPrev)
                this.sprInd = 0;
        }
        this.animate();
        this.lastTime = this.time;
        return true;
    };
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

function SpriteFx(_x, _y,_sprite, _nbrFrame, _animSpeed, _loop, _linker, _isLinked){
    this.x = _x;
    this.y = _y;

    this.animSpeed = _animSpeed || 1;
    this.looped = _loop || false;
    this.creator = _linker || undefined;
    this.isLinked = _isLinked || false;

    this.stop = false;

    this.sprite = new Sprite("resources/graphics/fx/" + _sprite + ".png", 32, 32, 0, _nbrFrame)

    this.countDraw = 0;
    /**
     * Dessine l'effet spécial
     */
    this.display = function(){
        if(this.isLinked && this.creator !== "undefined"){
            this.x = this.creator.x;
            this.y = this.creator.y + 4;
        }
        this.animate(this.sprite, this.animSpeed);
        if((this.sprite.frame >= this.sprite.nbrFrame - 1 /*&& this.sprite.animInd == Math.floor((this.nbrFrame-1) / (this.sprite.width / 32))  */&& this.countDraw == (game.fps/this.animSpeed) - 1) || this.stop ){
            if(!this.looped || this.stop) {
                game.objects.entities.splice(game.objects.entities.indexOf(this), 1);
                return false;
            }
            else{
                this.frame = 0;
                this.sprInd = 0;
                this.countDraw = 0;
                return true;
            }
        }
        else
            return true;
    }
}
SpriteFx.prototype = Object.create(Entity.prototype);
SpriteFx.prototype.constructor = SpriteFx;

function ColorRGB(_red, _green, _blue, _alpha){
    this.red = _red;
    this.green = _green;
    this.blue = _blue;
    this.alpha = _alpha || 1;
}
ColorRGB.prototype.toHex = function(){
    return new ColorHex(this.red.toString(16) + this.green.toString(16) + this.blue.toString(16), this.alpha);
}

function ColorHex(_hex, _alpha){
    this.hex = _hex;
    this.alpha = _alpha;
}
ColorHex.prototype.toDec = function(){
    return new ColorRGB(parseInt(this.hex.splice(0,3), 16), parseInt(this.hex.splice(3,6), 16), parseInt(this.hex.splice(6,9), 16), this.alpha);
}

/**
 * L'objet du jeu
 * @class
 * @property {HTMLCanvasElement} canvas Le canvas dans lequel le jeu tourne
 * @property {CanvasRenderingContext2D} context Spécification des méthodes et propriétés du canvas
 * @property {Number} fps Nombre de frames par seconde
 * @property {Number} xOffSet Nombre de pixel de décalage entre l'origine du dessin et l'origine du canvas sur l'axe x
 * @property {Number} yOffSet Nombre de pixel de décalage entre l'origine du dessin et l'origine du canvas sur l'axe y
 */

var game = {
    /** @lends game */
    canvas: document.getElementById("canvas"),
    context: canvas.getContext("2d"),

    timeTest: (new Date()).getTime(),
    lastTimeTest: 0,
    lastUpdt: 0,
    fps: 60,
    xOffSet: 0,
    yOffSet: 0,
    /**
     * Gère les objets dans le jeu
     * @class
     */
    objects:{
        entities: [],
        gui: [],
        servTime: 0,

        /**
         * Fonction d'ajout d'un objet dans un tableau d'objets
         * @param {Array} arr Le tableau dans lequel l'objet est placé
         * @param {Object} obj L'objet à placer
         */
        add: function(arr, obj){
            arr.push(obj);
        },
        /**
         * Fonction qui rafraichi une liste d'objets à afficher
         * @param {Object} data Les données serveur à traiter
         */
        refresh: function(data){
            this.servTime = data.servData.date;
            data.servData.fx.forEach(function(element){
                game.createSpriteFx(element.x, element.y, element.graphic, 3, 5);
            });

            data.servData.enemies.forEach(function(element){
                for (var i = 0; i < game.objects.entities.length; i++){
                    if (element.$loki === game.objects.entities[i].id && game.objects.entities[i].type === 'enemy'){
                        if (!(element.hit === null) &&  game.objects.entities[i].dying == false)
                            game.objects.entities[i].takeDmg(element.hit.damage);
                        if(!element.dead) {
                            game.objects.entities[i].y = element.y;
                            game.objects.entities[i].x = element.x;
                            game.objects.entities[i].dirX = element.dirX;
                        }
                        else {
                            game.objects.entities[i].dying = true;
                            if(game.objects.entities[i].dead) {
                                game.objects.entities.splice(i, 1);
                                i--;
                            }
                        }
                        break;
                    }
                    else if(element.$loki === undefined)
                        break;

                }
                if(i == game.objects.entities.length && !element.dead) {
                    game.objects.entities.push(new Enemy(element.x, element.y, element.speed, element.dirX, element.$loki));
                }
            });
            data.servData.players.forEach(function(element){
                for (var i = 0; i < game.objects.entities.length; i++) {
                    if (element.$loki === game.objects.entities[i].$loki && game.objects.entities[i].type === 'player' && element.$loki !== player.id) {
                        if(game.objects.entities[i].key == element.key)
                            break;
                        else{
                            game.objects.entities[i].key = element.key;
                        }
                        break;
                    }
                }
                if (i == game.objects.entities.length && element.$loki !== player.id) {
                    game.objects.entities.push(new Player(element.x, element.y, element.speed, element.date, element.key));
                }
            });
            if(data.plyData.level.length != 0) {
                game.createTxtFx({
                    x: game.canvas.width / 2,
                    y: game.canvas.height - 100
                }, (data.plyData.level.length) + "Level up !", 30, true, true);
                for(var i = 0; i < data.plyData.level.length; i++)
                    game.createTxtFx({
                        x: game.canvas.width / 2,
                        y: game.canvas.height - 75
                    }, data.plyData.level[i] + " gain !", 30, true, true);
            }
            if(player.currentHp < data.plyData.data.currHp)
                game.createTxtFx(player, "+" + data.plyData.data.currHp - player.currentHp, 30, true, true);
            game.objects.arrange();
            player.currentStm = data.plyData.data.currentStm;
            player.currentHp = data.plyData.data.currHp;
            player.currXp = data.plyData.data.currXp;
            player.maxXp = data.plyData.data.maxXp;
        },
        /**
         * Fonction qui tri les objets selon leur variable y
         */
        arrange: function(){
                game.objects.entities.sort(function(a, b){
                    if(a.y < b.y)
                        return -1;
                    if(a.y > b.y)
                        return 1;
                    return 0;
                });
        }
    },
    /**
     * L'objet de la carte
     * @class
     * @property {Object} tileSheet Contient le fichier du layout de la map
     * @property {Number} height Hauteur de la map (nombre de tiles)
     * @property {Number} width Largeur de la map (nombre de tiles)
     */
    map:{
        tileSheet: new Image(),
        height: 10,
        width: 10,
        /**
         * Fonction qui initialise la map
         * @param {Object} tileSheetFile Le fichier de tiles à utiliser
         * @param {Number} [_width=10] Largeur de la map
         * @param {Number} [_height=10] Hauteur de la map
         */
        init: function(tileSheetFile, _width, _height){
            this.tileSheet.src = "resources/graphics/" + tileSheetFile;
            if(_width !== undefined)
                this.width = _width;
            if(_height !== undefined)
                this.height = _height;
        },
        /**
         * Fonction qui dessine une tile
         * @param x Coordonnée x de la tile sur le tilesheet
         * @param y Coordonnée y de la tile sur le tilesheet
         */
        dispTile: function(x, y){
            game.context.drawImage(this.tileSheet, 0, 0, 32, 32, x, y, 32, 32);
        },
        /**
         * Fonction qui dessine la map
         */
        drawMap: function(){
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    this.dispTile(32 * i + game.xOffSet, 32 * j + game.yOffSet);
                }
            }
        }
    },
    /**
     * Fonction qui initialise le jeu
     */
    init: function(){
        this.map.init("Outside_A2.png");
        this.addListeners();
    },
    /**
     * Fonction qui centre la caméra sur un objet
     * @param obj L'objet sur lequel la caméra sera centrée
     * @param pVwWdtOffset La largeur à partir de laquelle la caméra suit l'objet
     * @param pVwHgtOffset La hauteur à partir de laquelle la caméra suit l'objet
     */
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
    /**
     * Ajoute les gestionnaires d'évènement
     */
    addListeners: function(){
        addEventListener("keydown", function(event) {
            if (event.keyCode == 68) {
                player.rightSwitch = true;
                player.poi = 2;
            }
            if(event.keyCode == 81) {
                player.leftSwitch = true;
                player.poi = 1;
            }
            if(event.keyCode == 90) {
                player.upSwitch = true;
                player.poi = 3;
            }
            if(event.keyCode == 83) {
                player.downSwitch = true;
                player.poi = 0;
            }
            if(event.keyCode == 100) {
                if(!player.attackSwitch)
                    player.attackStart = (new Date()).getTime();
                player.attackSwitch = true;
            }
            if(event.keyCode == 104)
                player.concentrate();
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
            if(event.keyCode == 100)
                player.attack("attackOne");
            if(event.keyCode == 104){
                player.conc.stop = true;
                player.conc = null;
            }
        }, true);
        socket.on("message", function(message){
            game.objects.refresh(message);
        });
        socket.on("servData", function(servData){
            player.x = servData.xPlayer;
            player.y = servData.yPlayer;
            player.poi = servData.dirPlayer;
            player.currentHp = servData.hlthPlayer;
            player.currentStm = servData.stmnPlayer;
            player.currXp = servData.xpPlayer;
            player.id = servData.idPlayer;
            player.sprite = new Sprite("resources/graphics/Actor1.png", 32, 32, 1, 3);
            player.chargedTime = servData.chrgdTmPlayer;
        });
    },
    /**
     * Dessine les objets listés
     */
    drawObjects: function(){
        for(var i = 0; i < game.objects.entities.length; i++){
            if(!game.objects.entities[i].display())
                i--;
        }
        for(i = 0; i < game.objects.gui.length; i++){
            if(!game.objects.gui[i].display())
                i--;
        }
    },
    /**
     * Fonction permettant d'écirire du texte à l'écran
     * @param {String} text Le texte à afficher
     * @param {Number} x La coordonnée x de l'affichage
     * @param {Number} y La coordonnée x de l'affichage
     * @param {String} [color="black"] La couleur du texte
     * @param {Number} [opacity=1] La transparence du texte
     * @param {Number} [size=10] La taille de la police
     * @param {String} [align="left"] Le placement du texte
     * @param {Boolean} [isStatic=false] Défini si le texte suis la est fixe sur l'affichage ou non
     */
    writeText: function(text, x, y, color, opacity, size, align, isStatic){
        this.context.font = typeof size !== "undefined" ? size.toString() +  "px sans-serif" : "10px sans-serif";
        this.context.textAlign = align || "left";
        this.context.fillStyle = color || "white";
        this.context.globalAlpha = opacity || 1;
        isStatic = isStatic || false;

        this.context.strokeStyle = "black";
        this.context.lineWidth = 0.5;
        if(isStatic) {
            this.context.fillText(text, x, y);
            this.context.strokeText(text, x, y);
        }
        else {
            this.context.fillText(text, x + game.xOffSet, y + game.yOffSet);
            this.context.strokeText(text, x + game.xOffSet, y + game.yOffSet);
        }
        this.context.globalAlpha = 1;
        this.context.lineWidth = 2;
    },
    /**
     * Constructeur d'un objet de texte spécial
     * @param {Object} _creator L'objet à l'origine de la création du texte
     * @param {String} _text Le texte à afficher
     * @constructor
     */
    TextFx: function(_creator, _text, size, _persistence, _isStatic){
        this.creator = _creator;
        this.text = _text;
        this.persistence = _persistence || false;
        this.isStatic = _isStatic || false;
        this.yAnim = 0;
        this.x = this.creator.x;
        this.y = this.creator.y - 20;
        this.opacity = 1;
        this.persCnter = 0;
        /**
         * Dessine le texte
         * @returns {Boolean} Si l'objet est encore dans le tableau
         * @instance
         */
        this.display = function(){
            if(this.opacity > 0){
                game.writeText(this.text,this.x,this.y - this.yAnim, "red", this.opacity, size, "center", this.isStatic);
                if(!this.persistence)
                    this.opacity -= 0.03;
                else
                    this.persCnter++;

                if (this.persCnter < 20)
                    this.yAnim += 1;

                if (this.persCnter == 80)
                    this.persistence = false;

                return true;
            }
            else {
                game.objects.gui.splice(game.objects.gui.indexOf(this), 1);
                return false;
            }
        }
    },
    /**
     * Fonction qui permet de créer un objet de texte spécial
     * @param {Object} creator Le créateur du texte
     * @param {String} text Le texte à afficher
     */
    createTxtFx: function(creator, text,size, persistence, isStatic){
        game.objects.gui.push(new this.TextFx(creator, text, size, persistence, isStatic));
    },
    createSpriteFx: function(x, y, sprite, nbrFrame, animSpeed, loop, linker, isLinked){
        var ind = game.objects.entities.push(new SpriteFx(x, y, sprite, nbrFrame, animSpeed, loop, linker, isLinked));
        return game.objects.entities[ind - 1];
    },
    /**
     * Fonction lancée à chaque frame
     */
    update: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.drawMap();
        player.update();
        socket.emit('message',{
            x: player.x,
            y: player.y,
            dirX: player.dirX,
            dirY: player.dirY,
            concentrate: player.conc !== null
        });
        this.portview(player,100,100);
        game.drawObjects();
        player.drawLife();
        if(!socket.connected){
            this.context.font = "20px Arial";
            this.context.fillStyle = "red";
            this.context.textAlign = "center";
            this.context.fillText("Connexion en cours...", this.canvas.width/2, this.canvas.height/2)
        }
    }
};

/**
 * L'objet du joueur
 * @class
 * @property {Object} spriteSheet Contient le fichier de sprites du personnage
 * @property {Number} countDraw Compte le nombre de frame
 * @property {Number} frame Frame de l'animation rn cours
 * @property {Number} nbrFrame Nombre de frame dans une animation
 * @property {Number} sprite Origine du spriteSheet du personnage
 * @property {Number} sprInd Contient le fichier de sprites du personnage
 * @property {Number} heigth Hauteur d'un sprite en pixel
 * @property {Number} width Largeur d'un sprite en pixel
 * @property {Number} x La coordonnée x du personnage
 * @property {Number} y La coordonnée y du personnage
 * @property {Number} xPrev La coordonnée y du personnage à la frame précédente
 * @property {Number} yPrev La coordonnée y du personnage à la frame précédente
 * @property {Number} xSpot La coordonnée x de l'origine du dessin
 * @property {Number} ySpot La coordonnée y de l'origine du dessin
 * @property {Number} speed La vitesse du personnage en pixel
 * @property {Number} maxHp Le nombre de point de vie maximum pour le personnage
 * @property {Number} currentHp Le nombre de points de vie actuel du personnage
 */
var player = {
    spriteSheet: new Image(),
    sprite: null,
    countDraw: 0,

    dirX: 0,
    dirY: 1,
    dir: [
        [0,1],
        [-1,0],
        [1,0],
        [0,-1]
    ],
    key: {id: -1, date: 0},
    prevKey: {id: -1, date: 0},
    x: 150,
    y: 150,
    xPrev: 0,
    yPrev: 0,
    speed: 4,

    maxHp: 10,
    currentHp: 10,

    maxStm: 10,
    currentStm: 10,

    maxXp: 20,
    currXp: 0,

    conc: null,

    attackStart: 0,
    keys: 0,
    attackSwitch: false,
    rightSwitch: false,
    leftSwitch: false,
    upSwitch: false,
    downSwitch: false,
    arrTest: [],
    arrTestTwo: [],

    lastKey: 0,
    testKey: 0,
    sumX :0,
    loop: 0,
    chargedTime: 350,
    charge: 0,

    poi: -1,

    /**
     * Fonction d'initialisation du personnage
     * @param {Number} [_sprite=1] Sprite du personnage
     * @param {Number} [xStart=10] Coordonnée x de départ du personnage
     * @param {Number} [yStart=10] Coordonnée y de départ du personnage
     */
    init: function(_sprite, xStart, yStart){
        this.x = xStart || this.x;
        this.y = yStart || this.y;
        this.sprite = new Sprite("resources/graphics/Actor1.png", 32, 32, _sprite, 3)
        game.objects.add(game.objects.entities, this);
    },

    /**
     * Gère l'attaque du personnage
     */
    attack: function(type){
        //game.createSpriteFx(this.x + 30*this.dirX, this.y + 30*this.dirY, "Attack2", 3, 5);
        this.attackSwitch = false;
        console.log((new Date()).getTime() - this.attackStart);
        socket.emit('attack', (new Date()).getTime() - this.attackStart);
        this.attackStart = 0;
        this.charge = 0;
    },
    concentrate: function(){
        if(this.conc === null)
            this.conc = game.createSpriteFx(player.x, player.y, "Special10", 7, 1, true, player, true);
    },
    draw: Entity.prototype.draw,
    animate: Entity.prototype.animate,
    display: function(){
        this.animate(this.sprite, 2);
        return true;
    },
    /**
     * Dessine la vie du joueur
     */
    drawLife: function(){
        //Vie
        game.context.strokeRect(5,5,101,21);
        game.context.fillStyle = "#E00000";
        game.context.fillRect(6,6,this.currentHp / this.maxHp * 99,19);
        game.writeText("HP",110,20,"E00000",1, 12,"left", true);
        //Compétences (mana / force / concentration)
        game.context.strokeRect(5,31,101,21);
        game.context.fillStyle = "#CC9900";
        game.context.fillRect(6,32,this.currentStm / this.maxStm * 99,19);
        game.writeText("Stamina",110,46,"CC9900",1, 12,"left", true);
        //Expérience
        game.context.strokeRect(20,game.canvas.height - 20,game.canvas.width - 40,16);
        game.context.fillStyle = "#CC9900";
        game.context.fillRect(21,game.canvas.height - 19,this.currXp / this.maxXp * (game.canvas.width - 42), 14);
        game.writeText("XP",game.canvas.width/2,game.canvas.height - 25,"CC9900",1, 15,"center", true);
        //Charge
        game.context.strokeRect(5,57,101,21);
        game.context.fillStyle = "#CC9900";
        game.context.fillRect(6,58,(this.charge / this.chargedTime) * 99,19);
        game.writeText("Charge",110,72,"CC9900",1, 12,"left", true);
    },

    /**
     * Fonction de mise à jour du personnage à chaque frame
     */
    update: function(){
        this.prevKey.id = this.key.id;
        this.key.id = -1;
        this.xPrev = this.x;
        this.yPrev = this.y;
        if(this.rightSwitch) {
            player.poi = 2;
        }
        if(this.leftSwitch) {
            player.poi = 1;
        }
        if(this.upSwitch) {
            player.poi = 3;
        }
        if(this.downSwitch) {
            player.poi = 0;
        }

        if(this.attackStart != 0) {
            this.charge = (this.charge >= this.chargedTime) ? this.chargedTime : ((new Date()).getTime() - this.attackStart);
        }

        if((this.rightSwitch || this.leftSwitch || this.upSwitch || this.downSwitch)){
            game.timeTest = (new Date()).getTime();
            game.lastTimeTest = game.lastUpdt;
            /*if(this.testKey == 0) {
                this.testKey = game.lastTimeTest;
            }*/
            this.arrTest.push(game.timeTest - game.lastTimeTest);
            this.arrTestTwo.push((new Date()).getTime());
            this.sumX += game.timeTest - game.lastTimeTest;
            this.x += 0.06 * this.speed * this.dir[this.poi][0] * (game.timeTest - game.lastTimeTest);
            this.y += 0.06 * this.speed * this.dir[this.poi][1] * (game.timeTest - game.lastTimeTest);
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.sprite.animInd = this.poi;
            this.key.id = player.poi;
            }
        else {
            game.timeTest = (new Date()).getTime();
            this.key.id = -1;
            if (this.sumX != 0) {
                this.testKey = 0;
                this.sumX = 0;
                this.arrTest = [];
                this.arrTestTwo = [];
            }
        }
        this.key.date = game.lastUpdt;
        if(this.key.id != this.prevKey.id)
            socket.emit("movement", this.key);

        this.dirX = this.dir[this.sprite.animInd][0];
        this.dirY = this.dir[this.sprite.animInd][1];
        game.lastUpdt = game.timeTest;
        if(this.x == this.xPrev && this.y == this.yPrev){
            this.sprite.frame = 1;
            this.countDraw = 0;
        }
    }
};
//--- Initialisation ---
game.init();
player.init(1);

//--- Game loop ---
setInterval(function(){
    debug.clear();
    game.update();
    debug.monitor("x: ", player.x);
    debug.monitor("y: ", player.y);
    debug.monitor("frame: ", player.frame);
    debug.monitor("dirX: ", player.dirX);
    debug.monitor("dirY: ", player.dirY);
    debug.monitor("Player key: " + player.key);
    debug.show();
}, 1000/game.fps);