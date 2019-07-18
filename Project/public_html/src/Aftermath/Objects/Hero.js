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
    this.kYDelta = 150;

    this.mDye = new SpriteAnimateRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(35, 50);
    this.mDye.getXform().setSize(12, 12);
    // this.mDye.setElementPixelPositions(0, 120, 0, 180);
    this.mDye.setSpriteSequence(1024, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
        566, 566,   // widthxheight in pixels
        3,          // number of elements in this sequence
        0);         // horizontal padding in between
    this.mDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mDye.setAnimationSpeed(15);

    this.mRDye = new SpriteAnimateRenderable(spriteTexture);
    this.mRDye.setColor([1, 1, 1, 0]);
    this.mRDye.getXform().setPosition(35, 50);
    this.mRDye.getXform().setSize(12, 12);
    // this.mDye.setElementPixelPositions(0, 120, 0, 180);
    // this.mRDye.setElementPixelPositions(120, 0, 0, 180);
    this.mRDye.setSpriteSequence(1024, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
        566, 566,   // widthxheight in pixels
        3,          // number of elements in this sequence
        0);         // horizontal padding in between
    this.mRDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mRDye.setAnimationSpeed(15);



    this.mRDye.mXform = this.mDye.getXform();
    this.mRDye.mColor = this.mDye.getColor();

    // this.mPackSet = new GameObjectSet();
    this.kMinionSprite = spriteTexture;

    this.kLastFireTime = 0;
    //Rate in per second
    this.kfireRate = 5;

    this.health = 100;

    GameObject.call(this, this.mDye);

    var r = new RigidRectangle(this.getXform(), 10, 10);
    // r.setMass(.18);  // less dense than Minions
    r.setMass(0.16);  // less dense than Minions
    // r.setMass(0);  // less dense than Minions
    r.setRestitution(0);
    // r.toggleDrawBound();
    this.toggleDrawRigidShape();
    // r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(true);
    this.setRigidBody(r);

    this.setCurrentFrontDir(vec2.fromValues(0, 1));
    this.setSpeed(0);

    this.jump = false;


}

gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.draw = function (aCamera) {
    // this.mPackSet.draw(aCamera);
    GameObject.prototype.draw.call(this, aCamera);  // the default GameObject: only move forward

};

Hero.prototype.decreaseHealth = function () {
    this.mDye.setColor([1, 0, 0, 0.5]);
    // this.mDye.getColor()[1] = [1];
    this.mDye.getColor()[3] = [0.5];
//    TODO decrease

//    TODO hero get red

};

Hero.prototype.update = function (trap, savePoint, reset) {
    GameObject.prototype.update.call(this);
    // control by WASD
    var v = this.getRigidBody().getVelocity();
    if (reset === true) {
        this.jump = true;
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        if (this.jump === true) {

            // v[1] += this.kYDelta;
            v[1] = Math.min(this.kYDelta + v[1], 1.1 * this.kYDelta);
            this.jump = false;
        }

        // this.setSpeed(1);

    }
    // if (gEngine.Input.isKeyReleased(gEngine.Input.keys.W)) {
    //     // v[1] += this.kYDelta;
    //     this.setSpeed(0);
    //
    // }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        v[1] -= this.kYDelta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        // v[0] -= this.kXDelta;
        this.mDye.getXform().getPosition()[0] -= 1;
        // this.mRDye.getXform().getPosition()[0] -= 1;

        this.mRenderComponent = this.mRDye;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        // v[0] += this.kXDelta;
        this.mDye.getXform().getPosition()[0] += 1;
        // this.mRDye.getXform().getPosition()[0] += 1;
        this.mRenderComponent = this.mDye;
    }

    this.mRenderComponent.updateAnimation();
    //
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
    //     this.mDye.getXform().getPosition()[0] -= 1;
    //     this.mRDye.getXform().getPosition()[0] -= 1;
    //     this.mRenderComponent = this.mRDye;
    //
    //
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
    //     this.mDye.getXform().getPosition()[0] += 1;
    //     this.mRDye.getXform().getPosition()[0] += 1;
    //     this.mRenderComponent = this.mDye;
    //
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
    //     this.mDye.getXform().getPosition()[1] += 1;
    //     this.mRDye.getXform().getPosition()[1] += 1;
    //
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
    //     this.mDye.getXform().getPosition()[1] -= 1;
    //     this.mRDye.getXform().getPosition()[1] -= 1;
    //
    // }

    // control by WASD

    // // TODO hitbox with Trap
    if (this.getBBox().intersectsBound(trap.getBBox())) {
        this.decreaseHealth();
    }
    //
    //
    // // TODO hitbox with SavePoint
    if (this.getBBox().intersectsBound(savePoint.getBBox())) {
        savePoint.save();
    }

};