/**
 * Created by Hild Franck on 8/12/2015.
 */

module.exports = {
    Flower: function (_x, _y) {
        this.name = "Flower";
        this.level = 1;
        this.dead = false;
        this.deadTime = 0;
        this.dirX = 1;
        this.x = _x;
        this.y = _y;
        this.xPrev = 0;
        this.yPrev = 0;
        this.xSpot = 16;
        this.ySpot = 16;
        this.width = 32;
        this.height = 32;
        this.currHealth = 6;
        this.maxHealth = 6;
        this.strength = 2;
        this.speed = 1;
        this.closerPlayer = null;
        this.sprite = 0;
        this.sprInd = 1;
        this.spawnCoolDown = 3;
        this.hit = null;
        this.attack = "Attack7";
        this.update = function () {
            this.xPrev = this.x;
            this.x += this.speed * this.dirX;
            if (this.x >= 320) {
                this.x = 316;
                this.dirX *= -1;
            }
            else if (this.x <= 0) {
                this.x = 4;
                this.dirX *= -1;
            }
        }.toString();
    }
};