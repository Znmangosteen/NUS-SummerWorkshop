/* File: Head.js
 *
 * Creates and initializes a simple Head object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Head(spriteTexture,atX,atY,speed) {
    this.kDeltaDegree = 1;
    this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    this.kDeltaSpeed = 0.01;
    this.mHead = new SpriteRenderable(spriteTexture);
    this.mHead.setColor([1, 1, 1, 0]);
    this.mHead.getXform().setPosition(atX,atY);
    this.mHead.getXform().setSize(7.5, 7.5);
    this.mHead.setElementPixelPositions(130, 310, 0, 180);

    GameObject.call(this, this.mHead);

    this.setSpeed(speed);
    this.setCurrentFrontDir(vec2.fromValues(Math.random()*2-1,Math.random()*2-1));

}
gEngine.Core.inheritPrototype(Head, GameObject);

Head.prototype.draw = function (aCamera,boxActivity) {
    GameObject.prototype.draw.call(this,aCamera);  // default moving forward
    if (boxActivity) {
        GameObject.prototype.drawBBox.call(this,aCamera);  // default moving forward
    }

};
Head.prototype.update = function (aCamera) {
    GameObject.prototype.update.call(this);  // default moving forward

    var status = aCamera.collideWCBound(this.getXform(), 1);
    if (status < 16) {
        vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(),3.1415926);
    }
    
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