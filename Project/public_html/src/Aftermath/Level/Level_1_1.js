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

function Level_1_1(aHero) {
    LevelScene.call(this, aHero);
}


gEngine.Core.inheritPrototype(Level_1_1, LevelScene);

Level_1_1.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);

    var i, rx, ry, obj, dx, dy;
    dx = 8;
    dy = 8;


    rx = [0, 5, 10, 15, 20, 25,
        80, 85, 90,
        185, 190, 195, 200, 205];
    ry = [40, 40, 40, 40, 40, 40,
        70, 70, 70,
        40, 40, 40, 40, 40];
    for (i = 0; i < 20; i++) {
        obj = new Platform(this.kPlatformTexture, rx[i], ry[i]);
        this.mAllPlatforms.addToSet(obj);
    }

};

Level_1_1.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);

};

Level_1_1.prototype.update = function () {
    LevelScene.prototype.update.call(this);

};