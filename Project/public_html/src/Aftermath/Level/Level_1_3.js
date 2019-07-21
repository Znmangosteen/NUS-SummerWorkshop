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

function Level_1_3(aHero) {
    LevelScene.call(this, aHero);
    this.Bar = new UIBar([600, 10], [1000, 20]);
    this.Bar.setMidElemColor([0.6, 0, 0, 1]);

    this.mBoss = null;

}


gEngine.Core.inheritPrototype(Level_1_3, LevelScene);

Level_1_3.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);


    this.mBoss = new Boss(this.kBoss, this.kBullet);
    this.mBoss.setTarget(this.mHero);
    this.mNPCs.push(this.mBoss);

    this.Bar.setMaxValue(this.mBoss.health);

};

Level_1_3.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);
    this.Bar.draw(this.mCamera);

};

Level_1_3.prototype.update = function () {
    LevelScene.prototype.update.call(this);
    this.Bar.setCurrentValue(this.mBoss.health);
    // this.Bar.setCurrentValue(-3);
    this.Bar.update();
};