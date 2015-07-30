<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="user-scalable=0" />
    <title>Tartiflette 2000</title>
    <link href='http://fonts.googleapis.com/css?family=Sniglet:800' rel='stylesheet' type='text/css' />
    <link href='http://fonts.googleapis.com/css?family=Sniglet' rel='stylesheet' type='text/css' />
    <link href="http://localhost:7777/Tartiflette_2000/style.css" rel="stylesheet" type="text/css"/>
    <link href="http://localhost:7777/Tartiflette_2000/Menu/Menu.css" rel="stylesheet" type="text/css"/>
</head>

<body>

<header>
    <? include '../Menu/Menu.php'; ?>
</header>

<canvas id="canvas" width="320" height="320" style="border: 1px #000000 solid">
</canvas>


<script>
    var Perso = Character();
</script>

<script src="../debug.js" charset="utf-8"></script>
<script src="../tarti-game.js" charset="utf-8"></script>

<script>

    var fps = 60;
    debug = new Debug();

    var xOffSet = 0;
    var yOffSet = 0;
    var objects = [];


    function Character(){
        this.spritesheet = new Image();
        this.spritesheet.src = "../resources/Actor1.png";

        this.countDraw = 0;
        this.frame = 0;
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

/* Dessine le personnage sur le canvas
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

context.clearRect(0, 0, canvas.width, canvas.height);
player.move();
portview(player,10, 80);
player.drawChar();
}

var charTilesheet = new Image();
charTilesheet.src = "../resources/Actor1.png";

/**
* Fonction qui permet d'afficher une tile de 32*32, d'un fichier seul ou d'un tilesheet
* @param tile Le tile à afficher
* @param x La coordonnée x où afficher la tile
* @param y La coordonnée y où afficher la tile
*/
function dispTile(tile, x, y) {
context.drawImage(tile, 0, 0, 32, 32, x, y, 32, 32)
}



    function draw(obj,frame,sprInd){
        context.drawImage(obj.spritesheet, frame * 32 , sprInd * 32, 32, 32, obj.x + xOffSet - obj.xSpot, obj.y + yOffSet - obj.ySpot, 92, 92);
    }
</script>