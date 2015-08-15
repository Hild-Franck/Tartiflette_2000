/**
 * Created by Hild Franck on 8/12/2015.
 */

var loki = require('lokijs');
var enemies = require('../entities/enemies.js');
var EventEmitter = require('events').EventEmitter;

module.exports = new EventEmitter();


var db = new loki('game.json');

console.log("Chargement de la base de données");
db.loadDatabase({}, function(){
    if(db.getCollection('Players') !== null && db.getCollection('EnemiesOnMap') !== null){
        console.log("Base de données chargée");
        module.exports.database = db;
        module.exports.emit('ready');
    }
    else{
        console.log("Initialisation de la base de donnée...");
        if(db.getCollection('Players') === null){
            var playersDb = db.addCollection('Players');
        }
        if(db.getCollection('EnemiesOnMap') === null){
            var enemiesOnMapDb = db.addCollection('EnemiesOnMap');
            enemiesOnMapDb.insert(new enemies.Flower(10,10));
            enemiesOnMapDb.insert(new enemies.Flower(300, 300));
        }
        console.log("Bases de données créée");
        db.saveDatabase();
        module.exports.database = db;
        module.exports.emit('ready');
    }
});