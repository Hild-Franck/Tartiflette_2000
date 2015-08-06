

var enemies = [];
function Enemy(_x, _y){
    enemies.push(this);
    this.id = 0;
    this.dirX = 1;
    this.x = _x;
    this.y = _y;
    this.xPrev = 0;
    this.yPrev = 0;
    this.xSpot = 16;
    this.ySpot = 16;
    this.health = 100;
    this.strength = 10;
    this.speed = 4;
    this.closerPlayer = null;
    this.sprite = 0;
    this.sprInd = 1;
    this.spawnCoolDown = 5;
    this.attack = "Attack7";
    this.update = function(){
        this.xPrev = this.x;
        this.x += this.speed * this.dirX;
        if(this.x >= 320) {
            this.x = 316;
            this.dirX *= -1;
        }
        else if(this.x <= 0){
            this.x = 4;
            this.dirX *= -1;
        }
    }
}
var badGuy = new Enemy(10, 10);

//---DATABASE---
//---------------------------------------------
var loki = require('lokijs');
var db = new loki('game.json');
db.loadDatabase({}, function(result) {
    if(db.getCollection('Enemies') !== null)
        console.log('Base de donnée correctement chargée !');
});

//---------------------------------------------

var timers = [];
var data = {};

//---------------------------------------------
var http = require('http');

var server = http.createServer();

var io = require('socket.io').listen(server);
var time = 0;
setInterval(function(){
    var date = new Date();

    badGuy.update();

    data.date = date.getTime();
    data.enemy = badGuy;

    io.sockets.emit('message', data);
}, 1000/60);


io.sockets.on('connection', function(socket){

    console.log('Un client est connecté !');
    socket.on('message', function (message) {
        console.log(message);

    });
});


server.listen(8081);