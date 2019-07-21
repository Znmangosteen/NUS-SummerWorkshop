/* File: TrapWall.js
 *
 * Creates and initializes a simple TrapWall object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function TrapWall(spriteTexture) {

    //TODO get another texture
    this.mTrapWall = new SpriteRenderable(spriteTexture);
    this.mTrapWall.setColor([1, 1, 1, 0]);
    this.mTrapWall.getXform().setPosition(80, 20);
    this.mTrapWall.getXform().setSize(7.5, 7.5);
    // this.mTrapWall.setElementPixelPositions(130, 310, 0, 180);
    this.mTrapWall.setElementPixelPositions(0, 64, 0, 64);
    // this.mTrapWall.setElementPixelPositions(0, 120, 0, 180);


    GameObject.call(this, this.mTrapWall);


}

gEngine.Core.inheritPrototype(TrapWall, GameObject);

TrapWall.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);  // default moving forward

};

TrapWall.prototype.update = function () {
    // GameObject.prototype.update.call(this);  // default moving forward


};