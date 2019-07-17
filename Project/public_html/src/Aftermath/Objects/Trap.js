/* File: Trap.js
 *
 * Creates and initializes a simple Trap object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Trap(spriteTexture) {

    //TODO get another texture
    this.mTrap = new SpriteRenderable(spriteTexture);
    this.mTrap.setColor([1, 1, 1, 0]);
    this.mTrap.getXform().setPosition(80, 20);
    this.mTrap.getXform().setSize(7.5, 7.5);
    // this.mTrap.setElementPixelPositions(130, 310, 0, 180);
    this.mTrap.setElementPixelPositions(0, 64, 0, 64);
    // this.mTrap.setElementPixelPositions(0, 120, 0, 180);


    GameObject.call(this, this.mTrap);


}

gEngine.Core.inheritPrototype(Trap, GameObject);

Trap.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);  // default moving forward

};

Trap.prototype.update = function () {
    // GameObject.prototype.update.call(this);  // default moving forward


};