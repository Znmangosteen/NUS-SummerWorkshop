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

function Level_1_2(aHero) {
    LevelScene.call(this, aHero);
}

gEngine.Core.inheritPrototype(Level_1_2, LevelScene);

Level_1_2.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);
    var i, rx, ry, obj;
    rx = [15, 20, 25,
        60,
        90, 90, 90, 90, 90, 90, 90,
        135,
        195];
    ry = [40, 40, 40,
        70,
        50, 55, 60, 65, 70, 75, 80,
        60,
        60];
    for (i = 0; i < 20; i++) {
        obj = new Platform(this.kPlatformTexture, rx[i], ry[i]);
        this.mAllPlatforms.addToSet(obj);
    }

};


Level_1_2.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);

};

Level_1_2.prototype.update = function () {
    LevelScene.prototype.update.call(this);

};