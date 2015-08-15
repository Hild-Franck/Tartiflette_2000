var http = require('http');
//---DATABASE---
//---------------------------------------------

var db = require('./databases/databases.js');

db.on('ready', function(){
    console.log("Base de données OK");
    console.log(db.database.getCollection('EnemiesOnMap').find()[0].$loki);

});

//---------------------------------------------

var timers = [];
var data = {};

//---------------------------------------------

var server = http.createServer();
var io = require('socket.io').listen(server);

var time = 0;
setInterval(function(){
    var date = new Date();
    for(var i = 0; i < db.database.getCollection('EnemiesOnMap').find().length; i++){
        var enemy = db.database.getCollection('EnemiesOnMap').find()[i];
        eval("enemy.ia = " + enemy.update);
        enemy.ia();
        db.database.getCollection('EnemiesOnMap').update(enemy)
    }

    data.date = date.getTime();
    data.enemies = db.database.getCollection('EnemiesOnMap').find();

    io.sockets.emit('message', data);
}, 1000/60);

io.sockets.on('connection', function(socket){
    console.log('Un client est connecté !');
    socket.on('message', function (message) {
        console.log(message);
    });
});


server.listen(8081);