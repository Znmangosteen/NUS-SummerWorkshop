/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture) {
    this.kDelta = 0.3;

    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(35, 50);
    this.mDye.getXform().setSize(9, 12);
    this.mDye.setElementPixelPositions(0, 120, 0, 180);

    // this.mPackSet = new GameObjectSet();
    this.mPackSet = new DyePackSet();
    this.kMinionSprite = spriteTexture;

    this.kLastFireTime = 0;
    //Rate in per second
    this.kfireRate=5;

    GameObject.call(this, this.mDye);

    this.setSpeed(0.5);

}

gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.draw = function (aCamera) {
    this.mPackSet.draw(aCamera);
    GameObject.prototype.draw.call(this, aCamera);  // the default GameObject: only move forward

};
Hero.prototype.update = function (patrolSet) {
    // control by WASD
    var xform = this.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
        if (Date.now() - this.kLastFireTime > 1000/this.kfireRate) {
            this.kLastFireTime = Date.now();
            this.mPackSet.addToSet(new DyePack(this.kMinionSprite,xform.getPosition()));
        }
    }

    this.mPackSet.update(patrolSet);

    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
    //     xform.incYPosBy(this.kDelta);
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
    //     xform.incYPosBy(-this.kDelta);
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
    //     xform.incXPosBy(-this.kDelta);
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
    //     xform.incXPosBy(this.kDelta);
    // }
};