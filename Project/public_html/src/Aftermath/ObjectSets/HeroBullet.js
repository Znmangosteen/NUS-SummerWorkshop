/*
 * File: HeroBullet.js
 * a set of Dyepacks
 */

/*jslint node: true, vars:true , white: true*/
/*global gEngine, vec2, GameObjectSet, ParticleEmitter */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Default Contsructor<p>
 * a set of Dyepacks
 * @returns {HeroBullet} New instance of HeroBullet
 * @class HeroBullet
 */
function HeroBullet() {
    GameObjectSet.call(this);
    // var i = 0;
    //
    // this.HeroBulletNum = num ? num : 100;
    // var unit = 1;
    // var theta = 0;
    //
    // switch (type) {
    //     case HeroBullet_TYPE.CIRCLE:
    //         unit = 2 * Math.PI / this.HeroBulletNum;
    //         for (i = 0; i < this.HeroBulletNum; i++) {
    //             theta = rotate + i * unit;
    //             this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
    //         }
    //         break;
    //     case HeroBullet_TYPE.SECTOR:
    //         unit = Math.PI / (2 * this.HeroBulletNum);
    //         for (i = 0; i < this.HeroBulletNum; i++) {
    //             theta = rotate + (i - this.HeroBulletNum / 2) * unit;
    //             this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
    //         }
    //         break;
    //     case HeroBullet_TYPE.D_SECTOR:
    //         unit = Math.PI / (2 * this.HeroBulletNum);
    //         for (i = 0; i < this.HeroBulletNum; i++) {
    //             theta = rotate + (i - this.HeroBulletNum / 2) * unit;
    //             this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
    //             this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(-Math.cos(theta), -Math.sin(theta))));
    //         }
    //         break;
    //     case HeroBullet_TYPE.LINE:
    //         theta += rotate;
    //         this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
    //
    //         break;
    //     case HeroBullet_TYPE.CROSS:
    //         theta += rotate;
    //         this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
    //         theta += Math.PI/2;
    //         this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
    //         theta += Math.PI/2;
    //         this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
    //         theta += Math.PI/2;
    //         this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
    //
    //         break;
    //
    //
    // }

}


gEngine.Core.inheritPrototype(HeroBullet, GameObjectSet);

/**
 * the function to call to generate particles
 * @param {vec2} p Position of Emitter in WC space
 * @param {Number} n Number of particles to be emitted
 * @param {function} func Creater Function
 * @returns {void}
 * @memberOf HeroBullet
 */
HeroBullet.prototype.addEmitterAt = function (p, n, func) {
    var e = new ParticleEmitter(p, n, func);
    this.mEmitterSet.push(e);
};

/**
 * Draw function called by GameLoop
 * @param {Camera} aCamera Camera to draw too
 * @returns {void}
 * @memberOf HeroBullet
 */
HeroBullet.prototype.draw = function (aCamera) {
    GameObjectSet.prototype.draw.call(this, aCamera);
};

/**
 * Update Function called by GameLoop
 * @returns {void}
 * @memberOf HeroBullet
 */
HeroBullet.prototype.update = function (aCamera, target) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update(aCamera);

    }
    if (target !== undefined) {

        if (!target.isInvincible()) {
            for (i = 0; i < this.mSet.length; i++) {
                var h = [];
                // if (this.mSet[i].pixelTouches(wing,h)) {
                if (this.mSet[i].getBBox().intersectsBound(target.getBBox())) {
                    target.decreaseHealth();
                    this.removeFromSet(this.mSet[i]);
                    // wing.hitTime += 1;
                }

            }
        }
    }


};
