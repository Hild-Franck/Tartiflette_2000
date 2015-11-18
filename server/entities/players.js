/**
 * Created by Knaufux on 8/31/2015.
 */

module.exports = {
    Player: function (x, y, _sprite) {
        this.xStart = x;
        this.yStart = y;
        this.sprite = _sprite;
        this.x = this.xStart;
        this.y = this.yStart;
        this.key = -1;
        this.dir = 0;
        this.date = 0;
        this.speed = 4;
        this.attack = 1;
        this.chargedTime = 350;
        this.level = 1;
        this.currXp = 0;
        this.maxXp = 20;
        this.strength = 1;
        this.maxStm = 10;
        this.currentStm = 10;
        this.currHp = 10;
        this.coolDwn = 750;
        this.maxHp = 10;
        this.connected = false;
        this.perks = {
            damage: 0,
            speedMod: 0,
            stmMod: 0,
            hpMod: 0,
            xpMod: 0,
            chargedTimeMod: 0,
            coolDown: 0,
            hpReg: 0,
            staminaReg: 0,
            hlthSteal: 0,
            armor: 0,
            charged: {
                level: 0,
                stmCons: 0,
                dmgBst: 0,
                nbrHits: 4,
                coolDownMod: 0.4,
                hitCoolDwn: 100
            },
            back: 0
        }
    }
};