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
var playersAvailable = [];
var fx = [];
var time = 0;
//---Count----
var count = 0;
var playersConnected = [];
//---Directions---
var DIRECTION = [
    [0,1],
    [-1,0],
    [1,0],
    [0,-1]
];
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

    //---Register event from client---
    socket.on('register', function (_uuid) {
        uuid = _uuid;
        //Check if this uuid already exist
        if (playersConnected[uuid] !== undefined) {
            if (playersConnected[uuid].disconnected) {
                clearTimeout(player.timeout);
                playersConnected[uuid].disconnected = false;
            }
            player.db = players.get(playersConnected[uuid].id);
            player.db.connected = true;
            players.update(player.db);
            socket.emit("servData",{
                xPlayer: player.db.x,
                yPlayer: player.db.y,
                dirPlayer: player.db.dir,
                hlthPlayer: player.db.currHp,
                stmnPlayer: player.db.currentStm,
                xpPlayer: player.db.currXp,
                idPlayer: playersConnected[uuid].id,
                spritePlayer: player.db.sprite,
                chrgdTmPlayer: player.db.chargedTime + player.db.perks.chargedTimeMod
            });
            console.log("Player number " + playersConnected[uuid].id + " is reconnected");
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
                player.db = players.get(playersConnected[uuid].id);
                player.db.connected = true;
                players.update(player.db);
                socket.emit("servData",{
                    xPlayer: player.db.x,
                    yPlayer: player.db.y,
                    dirPlayer: player.db.dir,
                    hlthPlayer: player.db.currHp,
                    stmnPlayer: player.db.currentStm,
                    xpPlayer: player.db.currXp,
                    idPlayer: playersConnected[uuid].id,
                    spritePlayer: player.db.sprite,
                    chrgdTmPlayer: player.db.chargedTime + player.db.perks.chargedTimeMod
                });
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
        //Update positions
        if(lastKey != 0) {
            if(player.key != -1) {
                player.db.dir = player.key;
                player.db.x += 0.06 * player.db.speed * DIRECTION[player.db.dir][0] * (key.date - lastKey);
                player.db.y += 0.06 * player.db.speed * DIRECTION[player.db.dir][1] * (key.date - lastKey);
            }

        }
        lastKey = key.date;
        player.key = key.id;
        player.db.key = player.key;
        players.update(player.db);
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
    socket.on('attack', function () {
        var date = new Date();
        var lastAtck;
        if (lastAtck === undefined || date.getTime() - lastAtck > (1000 - player.db.perks.coolDown * 25) && player.db.currentStm > 0) {
            lastAtck = date.getTime();
            player.db.currentStm -= 1;
            var atckInd = player.db.attack;
            var atckPerks = attacks.get(atckInd);
            atckPerks.x = player.db.x + DIRECTION[player.db.dir][0] * 30 + random.randomIntRange(-1 * atckPerks.randomizePos, atckPerks.randomizePos);
            atckPerks.y = player.db.y + DIRECTION[player.db.dir][1] * 30 + random.randomIntRange(-1 * atckPerks.randomizePos, atckPerks.randomizePos);
            atckPerks.x += (32 - atckPerks.baseAoE) / 2;
            atckPerks.y += (32 - atckPerks.baseAoE) / 2;
            atckPerks.width = atckPerks.baseAoE;
            atckPerks.height = atckPerks.baseAoE;
            atckPerks.plrDmg = player.db.strength + player.db.perks.damage;
            atckPerks.creator = player.db;
            attacksArr.push(atckPerks);
            players.update(player.db);
            fx.push({
                x: atckPerks.x - (32 - atckPerks.baseAoE) / 2,
                y: atckPerks.y - (32 - atckPerks.baseAoE) / 2,
                graphic: atckPerks.graphic
            });
        }
    });

    eventEmitter.on('chicken', function () {
        if (register) {
            while(player.db.currXp >= player.db.maxXp){
                player.db.currXp -= player.db.maxXp;
                player.db.maxXp *= 2;
                player.db.level += 1;
                var rand = Math.floor(Math.random()*11);
                var property = Object.getOwnPropertyNames(player.db.perks)[rand];
                level.push(property);
                player.db.perks[property] += 1;
                players.update(player.db);
            }
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