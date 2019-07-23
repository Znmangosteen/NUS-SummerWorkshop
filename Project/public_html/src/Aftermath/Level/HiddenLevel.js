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

function HiddenLevel(aHero) {
    LevelScene.call(this, aHero);
    this.maxDia = 3;
    this.kBg = "assets/Background/hidden-bg.png";

    this.levelName = "1-1-";
}


gEngine.Core.inheritPrototype(HiddenLevel, LevelScene);

HiddenLevel.prototype.loadScene = function () {
    LevelScene.prototype.loadScene.call(this);
    for (let i = 1; i <= this.maxDia; i++) {

        gEngine.Textures.loadTexture(this.kText + this.levelName + i + ".png");
    }

};


HiddenLevel.prototype.unloadScene = function () {
    LevelScene.prototype.unloadScene.call(this);
    for (let i = 1; i <= this.maxDia; i++) {
        gEngine.Textures.unloadTexture(this.kText + this.levelName + i + ".png");
    }

};


HiddenLevel.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);
    this.mBoss = new Cat(this.kNPC, this.kBullet, vec2.fromValues(130, 70));
    this.mBoss.setTarget(this.mHero);
    this.mNPCs.push(this.mBoss);

    this.bg = new TextureRenderable(this.kBg);
    this.bg.getXform().setSize(200, 112.5);
    this.bg.getXform().setPosition(100, 56.25);


    this.addTopWall();
    var i, rx, ry, obj, dx, dy;
    dx = 8;
    dy = 8;

    rx = 0;
    for (i = 0; i < 9; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 5);
        this.mAllPlatforms.addToSet(obj);


        rx += dx;
    }

    rx = 19 * dx;
    for (i = 0; i < 9; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 5);
        this.mAllPlatforms.addToSet(obj);


        rx += dx;
    }


    rx = 10 * dx;
    ry = 5 + 7 * dy;
    for (i = 0; i < 8; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        rx += dx;
    }


};

HiddenLevel.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);

};

HiddenLevel.prototype.update = function () {
    LevelScene.prototype.update.call(this);

};