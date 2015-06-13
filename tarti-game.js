/**
 * Created by Hild Franck on 6/6/2015.
 */
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var fps = 60;
debug = new Debug();
var tilesheet = new Image();
tilesheet.src = "resources/Outside_A2.png";

<<<<<<< HEAD

/**
 * Objet de personnage
 * @constructor
 */
function Character(){
    this.charSpritesheet = new Image();
    this.charSpritesheet.src = "resources/Actor1.png";

    this.countDrawPlayer = 0;
    this.framePlayer = 0;
    this.playerPosX = 0;
    this.playerPosY = 0;
    this.playerPrevPosX = 0;
    this.playerPrevPosY = 0;
    this.sprInd = 0;
    this.pressed = 0;
    this.leftSwitch = false;
    this.rightSwitch = false;

    this.drawChar = function(){
        animate(this);
    }
    this.move = function(char){
        if(this.leftSwitch)
            this.playerPosX -= 4;
        if(this.rightSwitch)
            this.playerPosX += 4;
    }
}

player = new Character();

/**
 * Fonction update regroupant toutes les fonctions principales
 */

function update() {
    debug.monitor("count: ", player.countDrawPlayer);
    debug.addAssert(player.rightSwitch, "Touche 'd' pressée");
    debug.addAssert(player.leftSwitch, "Touche 'q' pressée");
    debug.addTest("Tests", function(){debug.test(1==1,"Ca passe" ); debug.test(3==2, "La ca passe aussi");});
    context.clearRect(0, 0, canvas.width, canvas.height);

    dispMap();
    player.move(player);
    player.drawChar();
=======
var charTilesheet = new Image();
charTilesheet.src = "resources/Actor1.png";

/**
 * Fonction update regroupant toutes les fonctions principalles
 */

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    dispMap();
    drawPlayer();
>>>>>>> 94736f355b6a9b92f826af0659a21d1f2af30227
}

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
            dispTile(tilesheet, 32 * i, 32 * y);
        }
    }
}

/**
<<<<<<< HEAD
 * Fonction qui permet d'afficher et animer le sprite d'un objet
 * @param obj L'objet à afficher / animer
 */
function animate(obj){
    context.drawImage(obj.charSpritesheet, obj.framePlayer * 32, obj.sprInd * 32, 32, 32, obj.playerPosX, obj.playerPosY, 32, 32);
    obj.countDrawPlayer++;


    if (obj.countDrawPlayer > fps)
        obj.countDrawPlayer = 0;
    if (obj.countDrawPlayer % 12 == 0)
        obj.framePlayer++;
    if (obj.framePlayer > 2)
        obj.framePlayer = 0;
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
}
document.onkeyup = function(event){
    if(event.keyCode == 68)
        player.rightSwitch = false;
    if(event.keyCode == 81)
        player.leftSwitch = false;
}



// Regle les fps à 60

var drwIntvl = setInterval(function() {
    var start = new Date().getMilliseconds(); //Stocke la date du début d'éxécution en ms
    debug.clear();
    update();
    debug.monitor("Tps exe: ", (new Date().getMilliseconds() - start)); //Affiche le temps de l'éxécution
    debug.show();
}, 1000 / fps);
=======
 * Fonction qui affiche le personnage du joueur et qui l'anime
 * @param countDrawPlayer Compteur pour changer les frames
 * @param framePlayer La frame du personnage
 */

var countDrawPlayer = 0;
var framePlayer = 0;
var playerPosX = 0;
var playerPosY = 0;

function drawPlayer() {
    context.drawImage(charTilesheet, framePlayer * 32, 0, 32, 32, playerPosX, playerPosY, 32, 32);

    countDrawPlayer++;

    //Permet le changement de frame

    if (countDrawPlayer > 60)
        countDrawPlayer = 0;
    if (countDrawPlayer % 12 == 0)
        framePlayer++;
    if (framePlayer > 2)
        framePlayer = 0;
}
/**
 * Fonction récuperant la touche pressé par le joueur
 * @param event evennement qui s'active lors de la pression d'une touche
 * @returns retourne le code de la touche
 */
function keyPressed(event){
    var key = event.keyCode;
    return key;
}

/**
 * Fonction faisant deplacer le personnage à l'aide des touche ZQSD
 */

function movePlayer(){
    var setKey  = keyPressed(event);
    console.log(setKey);


    if(setKey == 100 && playerPosX < canvas.width - 32)
        playerPosX +=3;
    if(setKey == 115 && playerPosY < canvas.height - 32)
        playerPosY +=3;
    if(setKey == 113 && playerPosX > 0)
        playerPosX-=3;
    if(setKey == 122 && playerPosY > 0)
        playerPosY-=3;
    console.log("Postion en X " + playerPosX);
    console.log("Position en Y " + playerPosY);
}


// Regle les frames à 60 fps

var drwIntvl = setInterval(function() {
    update()
}, 1000 / 60);
>>>>>>> 94736f355b6a9b92f826af0659a21d1f2af30227

