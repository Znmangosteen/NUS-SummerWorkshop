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

function Level_2_1(aHero) {
    LevelScene.call(this, aHero);
}


gEngine.Core.inheritPrototype(Level_2_1, LevelScene);

Level_2_1.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);

    this.addTopWall();
    // this.addGround();
    var i, j, k, rx, ry, obj, dx, dy;
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

    rx = 5;
    ry = 5;


    rx += 2 * dx;
    for (j = 0; j < 12; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;
    }
    ry = 5 + 3 * dy;
    rx += 4 * dx;
    for (j = 0; j < 14; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;
    }

    rx -= 3 * dx;
    ry = 5 + 3 * dy;
    for (i = 0; i < 3; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += 3 * dy;
        rx += Math.pow(-1, i) * 2 * dx;

    }

    rx += 4 * dx;
    ry = 5 + 4 * dy;

    for (i = 0; i < 5; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        rx += 1.6 * dx;

    }

    rx = 7 * dx;
    ry = 5 + 8 * dy;

    for (i = 0; i < 10; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        rx += dx;

    }
    for (i = 0; i < 6; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;

    }

    rx = 22 * dx;
    ry = 5 + dy;

    for (i = 0; i < 11; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;

    }

    rx = 24.5 * dx;
    ry = 5 + 2 * dy;
    for (i = 0; i < 12; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;

    }

};
Level_2_1.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);

};

Level_2_1.prototype.update = function () {
    LevelScene.prototype.update.call(this);

};