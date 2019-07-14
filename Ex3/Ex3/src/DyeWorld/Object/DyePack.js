/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePack(spriteTexture,spawnPos) {
    this.kRefWidth = 80;
    this.kRefHeight = 130;

    this.mDyePack = new SpriteRenderable(spriteTexture);
    this.mDyePack.setColor([1, 1, 1, 0.1]);
    this.mDyePack.getXform().setPosition(spawnPos[0], spawnPos[1]);
    this.mDyePack.getXform().setSize(this.kRefWidth / 50, this.kRefHeight / 50);
    this.mDyePack.setElementPixelPositions(510, 595, 23, 153);
    GameObject.call(this, this.mDyePack);

    this.setSpeed(2);
    this.setCurrentFrontDir(vec2.fromValues(1,0));
}
gEngine.Core.inheritPrototype(DyePack, GameObject);

// DyePack.prototype.update = function () {};