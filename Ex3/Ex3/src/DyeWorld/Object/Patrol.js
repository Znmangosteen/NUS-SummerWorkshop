/* File: .js
 *
 * Creates and initializes a simple  object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Patrol(spriteTexture, atX, atY,speed) {
    // this.kDeltaDegree = 1;
    // this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    // this.kDeltaSpeed = 0.01;
    // this.mPatrol = new SpriteRenderable(spriteTexture);
    // this.mPatrol.setColor([1, 1, 1, 0]);
    // this.mPatrol.getXform().setPosition(50, 10);
    // this.mPatrol.getXform().setSize(3, 5.4);
    // this.mPatrol.setElementPixelPositions(130, 310, 0, 180);
    //
    // this.setSpeed(0.3);
    //
    // GameObject.call(this, this.mPatrol);

    this.mHead = new Head(spriteTexture, atX, atY,speed);
    this.mWingTop = new Wing(spriteTexture, atX + 10, atY + 6,speed);
    this.mWingBottom = new Wing(spriteTexture, atX + 10, atY - 6,speed);

    this.xBBox = null;
}

// gEngine.Core.inheritPrototype(Patrol, GameObject);

Patrol.prototype.draw = function (aCamera) {
    this.mHead.draw(aCamera);
    this.mWingTop.draw(aCamera);
    this.mWingBottom.draw(aCamera);
    var xPos = vec2.fromValues(this.mHead.getXform().getPosition()[0] + 5.625, this.mWingBottom.getXform().getPosition()[1] + 11);
    var xBBox = new BoundingBox(xPos, 18.75, 30);
    xBBox.drawBox(aCamera);
};
Patrol.prototype.update = function (aCamera) {
    this.mHead.update(aCamera);
    var headPos = this.mHead.getXform().getPosition();
    var topPos = vec2.fromValues(10, 6);
    var bottomPos = vec2.fromValues(10, -6);

    vec2.add(topPos, headPos, topPos);
    vec2.add(bottomPos, headPos, bottomPos);
    if (vec2.distance(headPos, topPos) > 3) {
        this.mWingTop.rotateObjPointTo(topPos, 1);

    }
    if (vec2.distance(headPos, bottomPos) > 3) {
        this.mWingBottom.rotateObjPointTo(bottomPos, 1);

    }
    this.mWingTop.update();
    this.mWingBottom.update();


    // GameObject.prototype.update.call(this);  // default moving forward
    //
    // var xf = this.getXform();
    // var fdir = this.getCurrentFrontDir();
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
    //     xf.incRotationByDegree(this.kDeltaDegree);
    //     vec2.rotate(fdir, fdir, this.kDeltaRad);
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
    //     xf.incRotationByRad(-this.kDeltaRad);
    //     vec2.rotate(fdir, fdir, -this.kDeltaRad);
    // }
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
    //     this.incSpeedBy(this.kDeltaSpeed);
    // }
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
    //     this.incSpeedBy(-this.kDeltaSpeed);
    // }
};