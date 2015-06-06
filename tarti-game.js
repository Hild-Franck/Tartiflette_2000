/**
 * Created by Hild Franck on 6/6/2015.
 */
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var tilesheet = new Image();
tilesheet.src = "resources/Outside_A2.png";

/**
 * Fonction qui permet d'afficher une tile de 32*32, d'un fichier seul ou d'un tilesheet
 * @param tile Le tile à afficher
 * @param x La coordonnée x où afficher la tile
 * @param y La coordonnée y où afficher la tile
 */
function dispTile(tile, x, y){
    context.drawImage(tile, 0, 0, 32, 32, x, y, 32, 32)
}

/**
 * Fonction qui permet d'afficher une carte de jeu
 */
function dispMap(){
    for(var i = 0; i < 10; i++){
        for(var y = 0; y < 10; y++) {
            dispTile(grassTile, 32*i, 32*y);
        }
    }
}
var drwIntvl = setInterval(function(){ dispMap() }, 1000/60);