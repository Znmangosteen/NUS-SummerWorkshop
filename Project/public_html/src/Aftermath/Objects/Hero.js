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

function Hero(characterTexture, bulletTexture) {
    this.kYDelta = 130;
    this.kYMDelta = 180;

    this.width = 8;
    this.height = 8;
    this.kRwidth = 6;
    this.kRheight = 8;


    this.mDye = new SpriteAnimateRenderable(characterTexture);
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

    this.mRDye = new SpriteAnimateRenderable(characterTexture);
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
    this.kMinionSprite = characterTexture;

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
    this.target = [];
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

};

Hero.prototype.getBBox = function () {
    var xform = this.mDye.getXform();
    var b = new BoundingBox(xform.getPosition(), xform.getWidth() / 8, xform.getHeight() / 8);
    return b;

};
Hero.prototype.isInvincible = function () {
    return this.invincible;
};

Hero.prototype.setTarget = function (target) {
    this.target=target
};

Hero.prototype.update = function (reset, aCamera) {
    var m = gEngine.GameLoop.mMyGame;
    GameObject.prototype.update.call(this);
    // control by WASD
    var v = this.getRigidBody().getVelocity();
    if (reset === true) {
        this.jump = true;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        if (this.jump === true) {
            v[1] = Math.min(this.kYDelta + v[1], 1.1 * this.kYDelta);
            this.jump = false;
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
        v[1] -= this.kYMDelta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        if (this.mDye.getXform().getPosition()[0] > 0) {
            this.mDye.getXform().getPosition()[0] -= 1;
        }
        this.setCurrentFrontDir(vec2.fromValues(-1, 0));
        this.mRenderComponent = this.mRDye;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (this.mDye.getXform().getPosition()[0] < 200) {
            this.mDye.getXform().getPosition()[0] += 1;
        }
        this.setCurrentFrontDir(vec2.fromValues(1, 0));
        this.mRenderComponent = this.mDye;
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        this.mBullets.addToSet(new Bullet(this.mBullets, this.kBulletTexture, this.getXform().getPosition(), 2, this.getCurrentFrontDir()));
    }

    this.mBullets.update(aCamera);
    this.mBullets.setTarget(this.target);

    if (this.invincible > 0) {
        this.invincible -= 1;
    } else {
        this.invincible = 0;
        this.mDye.getColor()[3] = [0];

    }
    this.mRenderComponent.updateAnimation();

};