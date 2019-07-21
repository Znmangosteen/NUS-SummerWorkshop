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
    LevelScene.call(this,aHero);
}


gEngine.Core.inheritPrototype(Level_2_2, LevelScene);

Level_2_2.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);

};

Level_2_2.prototype.update = function () {
    LevelScene.prototype.update.call(this);

};