/**
 * Created by Hild Franck on 6/6/2015.
 */
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var fps = 60;
debug = new Debug();
var tilesheet = new Image();
tilesheet.src = "resources/Outside_A2.png";

var xOffSet = 0;
var yOffSet = 0;
var objects = [];



/**
 * Objet de personnage
 * @constructor
 */
function Character(){
    this.charSpritesheet = new Image();
    this.charSpritesheet.src = "resources/Actor1.png";

    this.countDrawPlayer = 0;
    this.framePlayer = 0;
    this.x = 160;
    this.y = 160;
    this.xPrev = 0;
    this.yPrev = 0;
    this.sprInd = 0;
    this.leftSwitch = false;
    this.rightSwitch = false;
    this.upSwitch = false;
    this.downSwitch = false;
    this.height = 32;
    this.width = 32;
    this.xSpot = 16;
    this.ySpot = 16;
    this.speed = 4;

    /**
     * Dessine le personnage sur le canvas
     */
    this.drawChar = function(){
        animate(this);
    };
    /**
     * Déplace le personnage sur le canvas selon les input récupérées
     */
    this.move = function(){
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
}

player = new Character();

/**
 * Fonction update regroupant toutes les fonctions principales
 */

function update() {
    debug.monitor("count: ", player.countDrawPlayer);
    debug.monitor("xOffset: ", xOffSet);
    debug.monitor("yOffset: ", yOffSet);
    debug.monitor("Player x position: ", player.x);
    debug.monitor("Player y position: ", player.y);
    debug.addAssert(player.x + xOffSet == 220 || player.x + xOffSet == 100 || player.y + yOffSet == 100 || player.y + yOffSet == 220, "Perso au bord du portView");
    context.clearRect(0, 0, canvas.width, canvas.height);
    dispMap();
    player.move();
    portview(player,100, 100);
    player.drawChar();
    socket.emit('message', 'Position x : ' + player.x);
}

var charTilesheet = new Image();
charTilesheet.src = "resources/Actor1.png";

/**
 * Fonction qui permet d'afficher une tile de 32*32, d'un fichier seul ou d'un tilesheet
 * @param tile Le tile à afficher
 * @param x La coordonnée x où afficher la tile
 * @param y La coordonnée y où afficher la tile
 */
function dispTile(tile, x, y) {
    context.drawImage(tile, 0, 0, 32, 32, x, y, 32, 32)
}

/**
 * Fonction qui permet d'afficher une carte de jeu
 */
function dispMap() {
    for (var i = 0; i < 10; i++) {
        for (var y = 0; y < 10; y++) {
            dispTile(tilesheet, 32 * i + xOffSet, 32 * y + yOffSet);
        }
    }
}

/**
 * Fonction qui permet d'afficher et animer le sprite d'un objet
 * @param obj L'objet à afficher / animer
 */
function animate(obj) {
    context.drawImage(obj.charSpritesheet, obj.framePlayer * 32, obj.sprInd * 32, 32, 32, obj.x + xOffSet - obj.xSpot, obj.y + yOffSet - obj.ySpot, 32, 32);
    obj.countDrawPlayer++;


    if (obj.countDrawPlayer > fps)
        obj.countDrawPlayer = 0;
    if (obj.countDrawPlayer % 12 == 0)
        obj.framePlayer++;
    if (obj.framePlayer > 2)
        obj.framePlayer = 0;

    if (obj.rightSwitch)
        obj.sprInd = 2;
    if (obj.leftSwitch)
        obj.sprInd = 1;
    if (obj.upSwitch)
        obj.sprInd = 3;
    if (obj.downSwitch)
        obj.sprInd = 0;

    if (obj.xPrev == obj.x && obj.yPrev == obj.y)
        obj.framePlayer = 1;
}

/**
 * Fonction qui dessine les objets présents, stockés dans une liste.
 */
function drawObjects(){
    for(var i = 0; i < objects.length; i++)
        objects[i].draw();
}

/**
 * Fonction qui permet d'appliquer une portview suivant un objet
 * @param obj L'objet à traquer
 * @param pVwWdtOffset La distance du bord du canvas à partir de laquelle la caméra suis le joueur pour la largeur
 * @param pVwHgtOffset La distance du bord du canvas à partir de laquelle la caméra suis le joueur pour la hauteur
 */
function portview(obj, pVwWdtOffset, pVwHgtOffset){
    if(obj.x + xOffSet > canvas.width - pVwWdtOffset)
        xOffSet += (canvas.width - pVwWdtOffset) - (obj.x + xOffSet);
    if(obj.x + xOffSet < 0 + pVwWdtOffset)
        xOffSet += pVwWdtOffset - (obj.x + xOffSet);
    if(obj.y + yOffSet > canvas.height - pVwHgtOffset)
        yOffSet += (canvas.height - pVwHgtOffset) - (obj.y + yOffSet);
    if(obj.y + yOffSet < 0 + pVwWdtOffset)
        yOffSet += pVwHgtOffset - (obj.y + yOffSet);
}

/**
 * Fonctions récuperant la touche pressé par le joueur
 * @param event evennement qui s'active lors de la pression d'une touche
 */
document.onkeydown = function(event){
    if(event.keyCode == 68)
        player.rightSwitch = true;
    if(event.keyCode == 81)
        player.leftSwitch = true;
    if(event.keyCode == 90)
        player.upSwitch = true;
    if(event.keyCode == 83)
        player.downSwitch = true;
};
document.onkeyup = function(event){
    if(event.keyCode == 68)
        player.rightSwitch = false;
    if(event.keyCode == 81)
        player.leftSwitch = false;
    if(event.keyCode == 90)
        player.upSwitch = false;
    if(event.keyCode == 83)
        player.downSwitch = false;
};



// Regle les fps à 60

var drwIntvl = setInterval(function() {
    var start = new Date().getMilliseconds(); //Stocke la date du début d'éxécution en ms
    debug.clear();
    update();
    debug.monitor("Tps exe: ", (new Date().getMilliseconds() - start)); //Affiche le temps de l'éxécution
    debug.show();
}, 1000 / fps);