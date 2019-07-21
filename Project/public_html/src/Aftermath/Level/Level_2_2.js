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

function Level_2_2(aHero) {
    LevelScene.call(this, aHero);
}


gEngine.Core.inheritPrototype(Level_2_2, LevelScene);


Level_2_2.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);

    var i, j, k, rx, ry, obj, dx, dy;
    dx = 8;
    dy = 8;

    rx = 0;
    for (i = 0; i < 4; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 5);
        this.mAllPlatforms.addToSet(obj);


        rx += dx;
    }
    rx = 6 * dx;
    ry = 120;
    for (i = 0; i < 13; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += dx;
    }

    rx = 5;
    ry = 5;

    rx += 2 * dx;
    for (j = 0; j < 8; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;
    }
    ry = 5 + 3 * dy;
    rx += 3 * dx;
    for (j = 0; j < 14; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;
    }
};

Level_2_2.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);

};

Level_2_2.prototype.update = function () {
    LevelScene.prototype.update.call(this);

};