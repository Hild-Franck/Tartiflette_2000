/**
 * Created by Hild Franck on 6/6/2015.
 */
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var tilesheet = new Image();
tilesheet.src = "resources/Outside_A2.png";

var charTilesheet = new Image();
charTilesheet.src = "resources/Actor1.png";

/**
 * Fonction update regroupant toutes les fonctions principalles
 */

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    dispMap();
    drawPlayer();
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