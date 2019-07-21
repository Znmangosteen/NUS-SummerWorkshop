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

    var i, j, k, rx, ry, obj, dx, dy;
    dx = 8;
    dy = 8;
    rx = 5;
    ry = 5;


    rx += 20;
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


};
Level_2_1.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);

};

Level_2_1.prototype.update = function () {
    LevelScene.prototype.update.call(this);

};