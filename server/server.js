//---CONSTANTS---
//---------------------------------------------
const DIRECTION = [
    [0,1],
    [-1,0],
    [1,0],
    [0,-1]
];
const X = 0;
const Y = 1;
//---REQUIRES---
//---------------------------------------------
var http = require('http');
var random = require('./node_modules/random/lib/random');
var QuadTree = require('./node_modules/quadTree/lib/quadTree');
var Player = require('./node_modules/player/lib/player');
var collision = require('./node_modules/collisions/lib/collisions');
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
var playersAvailable = [];
var fx = [];
var time = 0;
//---Count----
var count = 0;
var playersConnected = [];

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
    /*tree.clear();
    tree.insert(enemies.find());*/
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
                if(enemy.currHealth <= 0) {
                    enemy.dead = true;
                    enemy.deadTime = date.getTime();
                    attacksArr[j].creator.currXp += 15;
                    players.update(attacksArr[j].creator);
                }
                enemy.hit = {
                    damage: attacksArr[j].baseDamage + attacksArr[j].plrDmg,
                    type: "physical",
                    hitter: attacksArr[j].creator
                };
                if(attacksArr[j].creator.perks.hlthSteal !== 0){
                    attacksArr[j].creator.currHealth += 1;
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
    data.players = players.find({'connected': true});
    data.fx = fx;

    //io.sockets.emit('message', data);
    eventEmitter.emit('chicken');
    attacks.length = 0;
    fx.length = 0;
}, 1000/60);

//---SOCKET---
//---------------------------------------------
io.sockets.on('connection', function (socket) {
    //--Local variable---
    var player = {};
    var lastAtck;
    var lastKey = 0;
    var freeSlot = true;
    var uuid;
    var register = false;
    var level = [];
    var onHoldAtt = {
        number: 0,
        lastAtt: 0
    };

    //---Register event from client---
    socket.on('register', function (_uuid) {
        uuid = _uuid;
        //Check if this uuid already exist
        if (playersConnected[uuid] !== undefined) {
            if (playersConnected[uuid].disconnected) {
                clearTimeout(player.timeout);
                playersConnected[uuid].disconnected = false;
            }
            player = new Player(players, playersConnected[uuid].id, attacks);

            players.update(player.db);
            socket.emit("servData", player.getServerData());
            console.log("Player number " + player.id + " is reconnected");
        }
        else {
            //Check if a player slot is available
            for (var i = 0; i < 2; i++) {
                if ((playersAvailable[i]) || playersAvailable[i] === undefined) {
                    break;
                }
                if (i == 1) {
                    freeSlot = false;
                    console.log("Server full");
                }
            }
            console.log(i);
            if (freeSlot) {
                //Create player if the server is not full
                playersConnected[uuid] = {id: i + 1, disconnected: false};
                playersAvailable[i] = false;

                player = new Player(players, playersConnected[uuid].id, attacks);

                players.update(player.db);

                socket.emit("servData",player.getServerData());
                console.log("Player number " + playersConnected[uuid].id + " is connected");
                count++;
                console.log("There is " + count + " players connected");
            }
        }
        register = true;
    });
    //---Disconnect event if no response from client---
    socket.on('disconnect', function () {
        playersConnected[uuid].disconnected = true;
        console.log("Player number " + playersConnected[uuid].id + " lost connexion.");

        player.timeout = setTimeout(function () {
            if (playersConnected[uuid] !== undefined && playersConnected[uuid].disconnected) {
                playersAvailable[playersConnected[uuid].id-1] = true;
                console.log("Player number " + playersConnected[uuid].id + " is deconnected.");
                player.db.connected = false;
                players.update(player.db);
                delete playersConnected[uuid];
                count--;
                console.log("There is " + count + " players connected");
            }
        }, 5000)
    });
    //---Handle player movement---
    socket.on("movement", function(key){
        player.updtPos(key);
    });
/*
    socket.on('message', function (message) {
        for (prop in message)
            player.coll[prop] = message[prop];
        player.coll.width = 32;
        player.coll.height = 32;
        if (message.concentrate) {
            if (player.recover == 0)
                player.recover = (new Date()).getTime();
            if ((new Date()).getTime() - player.recover >= 1000 && player.db.currentStm < player.db.maxStm) {
                player.db.currentStm += 1;
                players.update(player.db);
                player.recover = 0;
            }
        }
        else
            player.recover = 0;

    });*/
    socket.on('attack', function (time) {
        var date = new Date();
        var lastAtck;
        if(time >= player.db.chargedTime) {
            onHoldAtt.number = 3;
            onHoldAtt.lastAtt = date.getTime();
        }
        if (lastAtck === undefined || date.getTime() - lastAtck > (1000 - player.db.perks.coolDown * 25) && player.db.currentStm > 0) {
            lastAtck = date.getTime();

            attacksArr.push(player.attack(fx));
        }
    });

    eventEmitter.on('chicken', function () {
        if (register) {
            if(onHoldAtt.number != 0 && ((new Date()).getTime() - onHoldAtt.lastAtt >= player.db.perks.charged.hitCoolDwn)){
                onHoldAtt.number -= 1;
                onHoldAtt.lastAtt = (new Date()).getTime();

                attacksArr.push(player.attack(fx));
            }
            player.levelUp(level);

            socket.emit('message', {
                plyData:{
                    data: player.db,
                    level: level
                },
                servData: data
            });

            level = [];
        }
    });
});


server.listen(8081);