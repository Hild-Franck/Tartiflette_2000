var http = require('http');
var QuadTree = require('./node_modules/quadTree/lib/quadTree');
var collision = require('./node_modules/collisions/lib/collisions');
var events = require('events');
var players;
var enemies;
var attacks;
//---DATABASE---
//---------------------------------------------

var db = require('./databases/databases.js');

db.on('ready', function(){
    console.log("Base de données OK");
    players = db.database.getCollection('Players');
    enemies = db.database.getCollection('EnemiesOnMap');
    attacks = db.database.getCollection('Attacks');
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
var attacksArr = [];
//---------------------------------------------

var eventEmitter = new events.EventEmitter();
var server = http.createServer();
var io = require('socket.io').listen(server);

var time = 0;
setInterval(function(){
    tree.clear();
    tree.insert(enemies.find());
    var date = new Date();
    for(var i = 0; i < enemies.find().length; i++){
        var enemy = enemies.find()[i];
        if(enemy.dead) {
            if(date.getTime() - enemy.deadTime >= enemy.spawnCoolDown * 1000) {
                enemy.dead = false;
                enemy.currHealth = enemy.maxHealth;
                enemy.hit.creator.xp += 1;
                players.update(enemy.hit.creator);
            }
            else
                continue;
        }
        enemy.hit = null;

        for(var j = 0; j < attacksArr.length; j++){
            if(collision("rectangle", attacksArr[j], enemy)){
                enemy.currHealth -= attacksArr[j].baseDamage + attacksArr[j].plrDmg;
                console.log("Health of the enemy number " + enemy.$loki + ": " + enemy.currHealth);
                if(enemy.currHealth <= 0) {
                    enemy.dead = true;
                    enemy.deadTime = date.getTime();
                }
                enemy.hit = {
                    damage: attacksArr[j].baseDamage + attacksArr[j].plrDmg,
                    type: "physical",
                    hitter: attacksArr[j].creator
                }
            }
        }

        enemy.ia = function(){};
        eval("enemy.ia = " + enemy.update);
        enemy.ia();
        enemies.update(enemy);
    }
    attacksArr.length = 0;
    data.date = date.getTime();
    data.enemies = enemies.find();

    io.sockets.emit('message', data);
    eventEmitter.emit('chicken');
    attacks.length = 0;
}, 1000/60);

io.sockets.on('connection', function(socket){

    eventEmitter.on('chicken', function(){
        socket.emit('player', player);
    });
    var lastAtck;
    var player = players.get(1);
    console.log('Un client est connecté !');
    socket.on('message', function (message) {
        for(prop in message)
            player[prop] = message[prop];
        player.width = 32;
        player.height = 32;
    });
    socket.on('attack', function(attack){
        var date = new Date();
        if(lastAtck === undefined || date.getTime() - lastAtck  > 1000) {
            lastAtck = date.getTime();
            player.stamina -= 1;
            console.log("Attaque lancée !");
            var atckInd = players.get(1).attack;
            var atckPerks = attacks.get(atckInd);
            atckPerks.x = player.x + player.dirX * 30;
            atckPerks.y = player.y + player.dirY * 30;
            atckPerks.width = atckPerks.baseAoE;
            atckPerks.height = atckPerks.baseAoE;
            atckPerks.plrDmg = player.strength;
            atckPerks.creator = player;
            attacksArr.push(atckPerks);
            players.update(player);
        }
    })
});


server.listen(8081);