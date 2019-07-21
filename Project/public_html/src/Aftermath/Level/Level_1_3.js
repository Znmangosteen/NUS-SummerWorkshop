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

function Level_1_3() {
    LevelScene.call(this);
    this.Bar = new UIBar([600, 10], [1000, 20]);
    this.Bar.setMidElemColor([0.6, 0, 0, 1]);
    this.Bar.setMaxValue(100);

}


gEngine.Core.inheritPrototype(Level_1_3, LevelScene);

Level_1_3.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);
    this.Bar.draw(this.mCamera);

};

Level_1_3.prototype.update = function () {
    LevelScene.prototype.update.call(this);
    this.Bar.incCurrentValue(-3);
    // this.Bar.setCurrentValue(-3);
    this.Bar.update();
};