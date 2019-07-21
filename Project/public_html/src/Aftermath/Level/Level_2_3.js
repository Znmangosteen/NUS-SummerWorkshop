/*
 * File: LevelScene.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level_2_3(aHero) {
    LevelScene.call(this, aHero);
    this.Bar = new UIBar([600, 10], [1000, 20]);
    this.Bar.setMidElemColor([0.6, 0, 0, 1]);

    this.mBoss = null;

}


gEngine.Core.inheritPrototype(Level_2_3, LevelScene);

Level_2_3.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);


    this.mBoss = new Boss2(this.kCharacters, this.kBullet);
    this.mBoss.setTarget(this.mHero);
    this.mNPCs.push(this.mBoss);

    this.Bar.setMaxValue(this.mBoss.health);


    this.addTopWall();
    this.addGround();

    var i, j, k, rx, ry, obj, dx, dy;
    dx = 8;
    dy = 8;

    rx = -0;
    for (i = 0; i < 5; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 40);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += 5;
    }
    rx = 200;
    for (i = 0; i < 5; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 40);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx -= 5;
    }

    rx = 50;
    for (i = 0; i < 20; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 80);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += 5;
    }


    rx = 10;
    for (i = 0; i < this.mHero.health; i++) {
        this.hearts[i] = new Heart(this.kHeart, rx);
        rx += 7;
    }

};

Level_2_3.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);
    this.Bar.draw(this.mCamera);

};

Level_2_3.prototype.update = function () {
    LevelScene.prototype.update.call(this);
    this.Bar.setCurrentValue(this.mBoss.health);
    // this.Bar.setCurrentValue(-3);
    this.Bar.update();
};