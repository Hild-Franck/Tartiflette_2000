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
        this.key = 0;
        this.date = 0;
        this.speed = 4;
        this.attack = 1;
        this.level = 1;
        this.xp = 0;
        this.strength = 1;
        this.maxStm = 10;
        this.currentStm = 10;
        this.currHp = 10;
        this.maxHp = 10;
        this.connected = false;
        this.perks = {
            damage: 0,
            state: "",
            charged: null,
            coolDown: 0,
            back: 0,
            hlthSteal: 0,
            hlth: 0,
            hlthReg: 0,
            staminaReg: 0,
            armor: 0,
            speedMod: 0,
            xpMod: 0,
            trapDtct: 0
        }
    }
};