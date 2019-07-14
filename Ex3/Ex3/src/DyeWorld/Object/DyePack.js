/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePack(spriteTexture, spawnPos) {
    this.kRefWidth = 80;
    this.kRefHeight = 130;

    this.mDyePack = new SpriteRenderable(spriteTexture);
    this.mDyePack.setColor([1, 1, 1, 0.1]);
    this.mDyePack.getXform().setPosition(spawnPos[0], spawnPos[1]);
    this.mDyePack.getXform().setSize(this.kRefWidth / 50, this.kRefHeight / 50);
    this.mDyePack.setElementPixelPositions(510, 595, 23, 153);
    GameObject.call(this, this.mDyePack);

    this.setSpeed(2);
    this.setCurrentFrontDir(vec2.fromValues(1, 0));

    this.spawnTime = Date.now();
    this.died = false;
    this.dying = false;
    this.hitting = false;
    this.remainFrames = 300;
}

gEngine.Core.inheritPrototype(DyePack, GameObject);

DyePack.prototype.speedDown = function () {
    this.setSpeed(0.1);

};
DyePack.prototype.speedRecover = function () {
    this.setSpeed(2);

};

DyePack.prototype.updateLiveState = function () {
    if (this.remainFrames <= 0) {
        this.died = true;
    } else if (this.getXform().getPosition()[0] > 100) {
        this.died = true;
    } else if (this.getSpeed() <= 0) {
        this.died = true;
    }

};

DyePack.prototype.isDied = function () {
    return this.died;
};

DyePack.prototype.update = function () {
    GameObject.prototype.update.call(this);  // default moving forward

    this.updateLiveState();

    this.remainFrames -= 1;
    if (this.hitting && !this.dying) {
        this.speedDown();
        this.remainFrames = 300;
        this.dying = true;
    } else {
        // this.speedRecover();
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.speedDown();
    }
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.D)) {
        this.speedRecover();

    }

};