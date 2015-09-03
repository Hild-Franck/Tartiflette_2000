//---REQUIRES---
//---------------------------------------------
var http = require('http');
var QuadTree = require('./node_modules/quadTree/lib/quadTree');
var collision = require('./node_modules/collisions/lib/collisions');
var random = require('./node_modules/random/lib/random');
var events = require('events');

//---GLOBALS---
//---------------------------------------------
//---Databases ref---
var players;
var enemies;
var attacks;
//---Data containers---
var timers = [];
var data = {};
var attacksArr = [];
var fx = [];
var time = 0;

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

//---SERVER---
//---------------------------------------------

var eventEmitter = new events.EventEmitter();
var server = http.createServer();
var io = require('socket.io').listen(server);

//---SERVER LOOP---
//---------------------------------------------
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
                    console.log(attacksArr[j].creator);
                    attacksArr[j].creator.xp += 1;
                    players.update(attacksArr[j].creator);
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
    data.fx = fx;

    io.sockets.emit('message', data);
    eventEmitter.emit('chicken');
    attacks.length = 0;
    fx.length = 0;
}, 1000/60);

io.sockets.on('connection', function(socket){

    eventEmitter.on('chicken', function(){
        socket.emit('updtPly', player.db);
    });
    var lastAtck;
    var player = {};
    player.db = players.get(1);
    player.coll = {};
    player.recover = 0;
    console.log('Un client est connecté !');
    socket.on('message', function (message) {
        for(prop in message)
            player.coll[prop] = message[prop];
        player.coll.width = 32;
        player.coll.height = 32;
        if(message.concentrate){
            if(player.recover == 0)
                player.recover = (new Date()).getTime();
            if((new Date()).getTime() - player.recover >= 1000){
                console.log(player.db.currentStm);
                player.db.currentStm += 1;
                players.update(player.db);
                player.recover = 0;
            }
        }
        else
            player.recover = 0;

    });
    socket.on('attack', function(attack){
        var date = new Date();
        if(lastAtck === undefined || date.getTime() - lastAtck  > 1000) {
            lastAtck = date.getTime();
            player.db.currentStm -= 1;
            var atckInd = players.get(1).attack;
            var atckPerks = attacks.get(atckInd);
            atckPerks.x = player.coll.x + player.coll.dirX * 30 + random.randomIntRange(-1 * atckPerks.randomizePos, atckPerks.randomizePos);
            atckPerks.y = player.coll.y + player.coll.dirY * 30 + random.randomIntRange(-1 * atckPerks.randomizePos, atckPerks.randomizePos);
            atckPerks.x += (32-atckPerks.baseAoE)/2;
            atckPerks.y += (32-atckPerks.baseAoE)/2;
            atckPerks.width = atckPerks.baseAoE;
            atckPerks.height = atckPerks.baseAoE;
            atckPerks.plrDmg = player.db.strength;
            atckPerks.creator = player.db;
            attacksArr.push(atckPerks);
            players.update(player.db);
            fx.push({
                x: atckPerks.x - (32-atckPerks.baseAoE)/2,
                y: atckPerks.y - (32-atckPerks.baseAoE)/2,
                graphic: atckPerks.graphic
            });
        }
    })
});


server.listen(8081);