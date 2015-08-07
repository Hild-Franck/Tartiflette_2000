/**
 * Created by Hild Franck on 7/8/2015.
 */

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

        /**
         * Fonction d'ajout d'un objet dans un tableau d'objets
         * @param arr Le tableau dans lequel l'objet est placé
         * @param obj L'objet à placer
         */
        add: function(arr, obj){
            arr.push(obj);
        },
        /**
         * Fonction qui rafraichi une liste d'objets à afficher
         * @param arr Le tableau à rafraichir
         * @param obj L'objet à rajouter au tableau
         */
        refresh: function(arr, obj){
            arr.push(obj);
            Array.prototype.push.call(this, arr);
            this.arrange();
        },
        /**
         * Fonction qui tri les objets selon leur variable y
         */
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
    /**
     * Anime le sprite d'un objet
     * @param {Object} obj L'objet à animer
     * @param {Number} [animSpeed=1] La vitesse d'animation, 1 étant la vitesse normale
     * @param {Number} [width] La largeur du sprite en pixel
     * @param {Number} [height] La hauteur du sprite en pixel
     */
    animate: function(obj, animSpeed, width, height){
        animSpeed = typeof animSpeed !== "undefined" ? animSpeed : 1;
        this.drawObj(obj, (obj.frame + 3 * obj.sprite), obj.sprInd,obj.x,obj.y, width, height);
        obj.countDraw++;

        if (obj.countDraw >= game.fps/animSpeed)
            obj.countDraw = 0;
        if (obj.countDraw % Math.round((game.fps/animSpeed) / obj.nbrFrame) == 0)
            obj.frame++;
        if (obj.frame >= obj.nbrFrame)
            obj.frame = 0;

        if(obj.xPrev == obj.x && obj.yPrev == obj.y)
            obj.frame = 1;
    },
    /**
     * Dessine les objets listés
     */
    drawObjects: function(){
        for(var i = 0; i < game.objects.entities.length; i++){
            game.objects.entities[i].draw();
        }
        for(i = 0; i < game.objects.gui.length; i++){
            if(!game.objects.gui[i].draw())
                i--;
        }
    },
    drawObj: function(obj,sprIndX,sprIndY,posX,posY,width,height){
        width = typeof width !== 'undefined' ?  width : 1;
        height = typeof height !== 'undefined' ?  height : 1;
        posX = typeof posX !== 'undefined' ? posX : obj.x;
        posY= typeof posY !== 'undefined' ? posY : obj.y;

        game.context.drawImage(obj.spriteSheet,  sprIndX * 32 * width , sprIndY * 32 * width, width * 32, height * 32, posX + game.xOffSet - obj.xSpot, posY + game.yOffSet - obj.ySpot, width * 32,height * 32);
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
        this.context.textAlign = typeof align !== "undefined" ? align : "left";
        this.context.fillStyle = typeof color !== 'undefined' ? color : "black";
        this.context.globalAlpha = typeof opacity !== 'undefined' ? opacity : 1;
        isStatic = typeof isStatic !== 'undefined' ? isStatic : false;
        if(isStatic)
            this.context.fillText(text,x,y);
        else
            this.context.fillText(text,x + game.xOffSet,y + game.yOffSet);
        this.context.globalAlpha = 1;
    },
    /**
     * Constructeur d'un objet de texte spécial
     * @param {Object} _creator L'objet à l'origine de la création du texte
     * @param {String} _text Le texte à afficher
     * @constructor
     */
    TextFx: function(_creator, _text){
        this.creator = _creator;
        this.text = _text;

        this.yOffset = 0;
        this.x = this.creator.x;
        this.y = this.creator.y - 20;
        this.opacity = 1;

        /**
         * Dessine le texte
         * @returns {Boolean} Si l'objet est encore dans le tableau
         * @instance
         */
        this.draw = function(){
            if(this.opacity > 0){
                game.writeText(this.text,this.x,this.y - this.yOffset,"blue",this.opacity, 15, "center");
                this.yOffset++;
                this.opacity -= 0.03;
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
    createTxtFx: function(creator, text){
        game.objects.gui.push(new this.TextFx(creator, text));
    },
    /**
     * Constructeur d'un objet d'effet spécial
     * @param {String} _sprite Le sprite à afficher
     * @param {Number} _nbrFrame Le nombre de frames de l'animation
     * @param {Number} _animSpeed La vitesse d'animation du sprite
     * @param {Number} [_loop=0] Le nombre de fois que l'animation doit se lancer
     * @param {Object} [_linker=undefined] L'objet auquel lier l'effet
     * @param {Boolean} [_isLinked=false] Détermine si l'effet doit être attaché à un objet
     * @constructor
     */
    SpriteFx: function(_sprite, _nbrFrame, _animSpeed, _loop, _linker, _isLinked){
        this.sprite = 0;
        this.nbrFrame = _nbrFrame;
        this.looped = typeof _loop !== "undefined" ? _loop : 0;
        this.creator = typeof _linker !== "undefined" ? _linker : undefined;
        this.isLinked = typeof _isLinked !== "undefined" ? _isLinked : false;
        this.animSpeed = typeof _animSpeed !== "undefined" ? _animSpeed : 1;


        this.spriteSheet = new Image();
        this.spriteSheet.src = "resources/graphics/fx/" + _sprite + ".png";
        this.frame = 0;
        this.sprInd = 0;
        this.countDraw = 0;
        this.x = 150;
        this.y = 150;
        this.xSpot = 0;
        this.ySpot = 0;
        /**
         * Dessine l'effet spécial
         */
        this.draw = function(){
            game.animate(this,this.animSpeed, 6, 6);
            console.log("CountDraw: " + this.countDraw);
            console.log("Frame: " + this.frame);
            if(this.frame >= this.nbrFrame - 1 && this.countDraw == (game.fps/this.animSpeed) - 1){
                game.objects.entities.splice(game.objects.entities.indexOf(this), 1);
                return false;
            }
        }
    },
    createSpriteFx: function(sprite, nbrFrame, animSpeed, loop, linker, isLinked){
        game.objects.entities.push(new this.SpriteFx(sprite, nbrFrame, animSpeed, loop, linker, isLinked));
    },
    /**
     * Fonction lancée à chaque frame
     */
    update: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.drawMap();
        player.update();
        this.portview(player,100,100);
        game.drawObjects();
        //player.draw();
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

    /**
     * Fonction d'initialisation du personnage
     * @param {Number} [_sprite=1] Sprite du personnage
     * @param {Number} [xStart=10] Coordonnée x de départ du personnage
     * @param {Number} [yStart=10] Coordonnée y de départ du personnage
     */
    init: function(_sprite, xStart, yStart){
        this.spriteSheet.src = "resources/graphics/Actor1.png";
        this.x = (xStart !== undefined) ? xStart : this.x;
        this.y = (yStart !== undefined) ? yStart : this.y;
        this.sprite = (_sprite !== undefined) ? _sprite : this.sprite;
        game.objects.add(game.objects.entities, this);
    },

    /**
     * Gère l'attaque du personnage
     */
    attack: function(){
        console.log("Attaque !");
        game.createSpriteFx("Attack1", 3, 3);
        game.createTxtFx(this, "Attaque lancée !");
        socket.emit('message', 'Attaque lancée !');
    },

    draw: function(){
        game.animate(this);
        return true;
    },
    /**
     * Dessine la vie du joueur
     */
    drawLife: function(){
        game.context.strokeRect(5,5,101,21);
        game.context.fillStyle = "#E00000";
        game.context.fillRect(6,6,this.currentHp / this.maxHp * 99,19);
        game.writeText("HP",110,20,"E00000",1, 10,"left", true);
    },

    /**
     * Fonction de mise à jour du personnage à chaque frame
     */
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
//--- Initialisation ---
debug = new Debug();
game.init();
player.init();

//--- Game loop ---
setInterval(function(){
    debug.clear();
    game.update();
    debug.monitor("x: ", player.x);
    debug.monitor("y: ", player.y);
    debug.monitor("frame: ", player.frame);
    debug.show();
}, 1000/game.fps);