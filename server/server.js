var http = require('http');
var QuadTree = require('./node_modules/quadTree/lib/quadTree');
var collision = require('./node_modules/collisions/lib/collisions');
//---DATABASE---
//---------------------------------------------

var db = require('./databases/databases.js');

db.on('ready', function(){
    console.log("Base de données OK");
});

//---------------------------------------------
//---BOUNDS---

var gameBounds = {
    x: 0,
    y: 0,
    width: 500,
    height: 500
};
var tree = new QuadTree(gameBounds, false, 7);

//---------------------------------------------

var timers = [];
var data = {};
var attacks = [];
var player = null;

//---------------------------------------------

var server = http.createServer();
var io = require('socket.io').listen(server);

var time = 0;
setInterval(function(){
    tree.clear();
    tree.insert(db.database.getCollection('EnemiesOnMap').find());
    var date = new Date();
    for(var i = 0; i < db.database.getCollection('EnemiesOnMap').find().length; i++){
        var enemy = db.database.getCollection('EnemiesOnMap').find()[i];
        /*if(player !== null && collision("rectangle", enemy, player))
            console.log("Ca se TOUCHE !");*/
        for(var j = 0; j < attacks.length; j++){
            if(collision("rectangle", attacks[j], enemy)){
                console.log("L'attaque touche !");
                attacks.splice(attacks.indexOf(this), 1);
            }
        }
        eval("enemy.ia = " + enemy.update);
        enemy.ia();
        db.database.getCollection('EnemiesOnMap').update(enemy);
    }

    data.date = date.getTime();
    data.enemies = db.database.getCollection('EnemiesOnMap').find();

    io.sockets.emit('message', data);
    attacks.length = 0;
}, 1000/60);

io.sockets.on('connection', function(socket){
    console.log('Un client est connecté !');
    socket.on('message', function (message) {
        player = message;
        player.width = 32;
        player.height = 32;
    });
    socket.on('attack', function(attack){
        console.log("Attaque lancée !");
        attack.width = 28;
        attack.height = 28;
        attacks.push(attack);
    })
});


server.listen(8081);