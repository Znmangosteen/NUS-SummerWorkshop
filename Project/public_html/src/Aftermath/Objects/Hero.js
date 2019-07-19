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

function Hero(spriteTexture, bulletTexture) {
    this.kDelta = 0.3;
    this.kYDelta = 130;
    this.kYMDelta = 180;

    this.width = 8;
    this.height = 8;
    this.kRwidth = 6;
    this.kRheight = 8;


    this.mDye = new SpriteAnimateRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(35, 50);
    this.mDye.getXform().setSize(this.width, this.height);
    // this.mDye.setElementPixelPositions(0, 120, 0, 180);
    this.mDye.setSpriteSequence(512, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
        566, 512,   // widthxheight in pixels
        3,          // number of elements in this sequence
        0);         // horizontal padding in between
    this.mDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mDye.setAnimationSpeed(15);

    this.mRDye = new SpriteAnimateRenderable(spriteTexture);
    this.mRDye.setColor([1, 1, 1, 0]);
    this.mRDye.getXform().setPosition(35, 50);
    this.mRDye.getXform().setSize(this.width, this.height);
    // this.mDye.setElementPixelPositions(0, 120, 0, 180);
    // this.mRDye.setElementPixelPositions(120, 0, 0, 180);
    this.mRDye.setSpriteSequence(1024, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
        566, 512,   // widthxheight in pixels
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

    this.health = 3;
    this.death = false;

    GameObject.call(this, this.mDye);

    var r = new RigidRectangle(this.getXform(), this.kRwidth, this.kRheight);
    // r.setMass(.18);  // less dense than Minions
    r.setMass(0.16);  // less dense than Minions
    // r.setMass(0);  // less dense than Minions
    r.setRestitution(0);
    // r.toggleDrawBound();
    this.toggleDrawRigidShape();
    // r.setColor([0, 1, 0, 1]);
    // r.setDrawBounds(true);
    this.setRigidBody(r);

    this.setCurrentFrontDir(vec2.fromValues(1, 0));
    this.setSpeed(0);

    this.jump = false;
    this.invincible = 0;

    this.mBullets = new HeroBullet();
    this.kBulletTexture = bulletTexture;
}

gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.draw = function (aCamera) {
    // this.mPackSet.draw(aCamera);
    GameObject.prototype.draw.call(this, aCamera);  // the default GameObject: only move forward
    this.mBullets.draw(aCamera);

};

Hero.prototype.decreaseHealth = function () {
    if (this.isInvincible()) {
        return;
    }
    // this.mDye.setColor([1, 0, 0, 0.5]);
    // this.mDye.getColor()[1] = [1];
    this.health -= 1;
    if (this.health <= 0) {
        this.death = true;
    }
    this.mDye.getColor()[3] = [0.5];
    this.invincible = 150;
//    TODO decrease

//    TODO hero get red

};

Hero.prototype.getBBox = function () {
    var xform = this.mDye.getXform();
    var b = new BoundingBox(xform.getPosition(), xform.getWidth() / 8, xform.getHeight() / 8);
    return b;

};
Hero.prototype.isInvincible = function () {
    return this.invincible;
};

Hero.prototype.update = function (trap, savePoint, reset, aCamera, aBoss) {
    GameObject.prototype.update.call(this);
    // control by WASD
    var v = this.getRigidBody().getVelocity();
    if (reset === true) {
        this.jump = true;
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        if (this.jump === true) {

            // v[1] += this.kYDelta;
            v[1] = Math.min(this.kYDelta + v[1], 1.1 * this.kYDelta);
            this.jump = false;
        }

        // this.setSpeed(1);

    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
        v[1] -= this.kYMDelta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        // v[0] -= this.kXDelta;
        if (this.mDye.getXform().getPosition()[0] > 0) {

            this.mDye.getXform().getPosition()[0] -= 1;
        }
        // this.mRDye.getXform().getPosition()[0] -= 1;
        this.setCurrentFrontDir(vec2.fromValues(-1, 0));

        this.mRenderComponent = this.mRDye;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (this.mDye.getXform().getPosition()[0] < 200) {

            // v[0] += this.kXDelta;
            this.mDye.getXform().getPosition()[0] += 1;

        }
        // this.mRDye.getXform().getPosition()[0] += 1;
        this.setCurrentFrontDir(vec2.fromValues(1, 0));

        this.mRenderComponent = this.mDye;
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        // this.mBullets.addToSet(new Bullet(this.mBullets, this.kBulletTexture, this.getXform().getPosition(), 1, vec2.fromValues(1, 0)));
        this.mBullets.addToSet(new Bullet(this.mBullets, this.kBulletTexture, this.getXform().getPosition(), 2, this.getCurrentFrontDir()));


    }

    this.mBullets.update(aCamera, aBoss);

    if (this.invincible > 0) {
        this.invincible -= 1;
    } else {
        this.invincible = 0;
        this.mDye.getColor()[3] = [0];

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

    // // // TODO hitbox with Trap
    // if (this.getBBox().intersectsBound(trap.getBBox())) {
    //     this.decreaseHealth();
    // }
    //
    //
    // // // TODO hitbox with SavePoint
    // if (this.getBBox().intersectsBound(savePoint.getBBox())) {
    //     savePoint.save();
    // }

};