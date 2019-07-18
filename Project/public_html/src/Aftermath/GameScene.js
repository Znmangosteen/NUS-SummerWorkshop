/*
 * File: GameScene.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameScene() {
    //this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kCue = "assets/AudioTest/BlueLevel_cue.wav";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kTrap = "assets/Trap.png";
    this.kSave = "assets/save.png";
    this.kPlatformTexture = "assets/BlockUnit/green-platform2.png";
    this.kHero = "assets/Character/2.png";


    // The camera to view the scene
    this.mCamera = null;
    // this.ParticleButton = null;
    // this.PhysicsButton = null;
    // this.UIButton = null;
    this.UIText = null;
    this.LevelSelect = null;
    this.mBarrage = null;
    this.mBarrageSet = null;

    this.mMsg = null;

    this.mAllPlatforms = new GameObjectSet();

//    FIXME debug thing
    this.mWing = null;

    this.LevelSelect = null;

    this.mHero = null;
    this.mTrap = null;
    this.mSavePoint = null;

    this.reset = false;
}

gEngine.Core.inheritPrototype(GameScene, Scene);


GameScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kTrap);
    gEngine.Textures.loadTexture(this.kSave);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kHero);


};

GameScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kTrap);
    gEngine.Textures.unloadTexture(this.kSave);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kHero);

    // if(this.LevelSelect==="Particle"){
    //     gEngine.Core.startScene(new ParticleLevel());
    // }
    // else if(this.LevelSelect==="Physics"){
    //     gEngine.Core.startScene(new RigidShapeDemo());
    // }
    // else if(this.LevelSelect==="UI"){
    //     gEngine.Core.startScene(new UIDemo());
    // }
    // gEngine.AudioClips.unloadAudio(this.kCue);
};

GameScene.prototype.initialize = function () {
    // Step A: set up the cameras
    // this.mCamera = new Camera(
    //     vec2.fromValues(50, 40), // position of the camera
    //     100,                     // width of camera
    //     [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    // );

    this.mCamera = new Camera(
        vec2.fromValues(100, 56.25), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    // this.ParticleButton = new UIButton(this.particleSelect,this,[400,400],[600,100],"Particle Demos",8);
    // this.PhysicsButton = new UIButton(this.physicsSelect,this,[400,300],[500,100],"Physics Demo",8);
    // this.UIButton =  new UIButton(this.uiSelect,this,[400,200],[320,100],"UI Demo",8);
    // this.UIText = new UIText("Demo", [400, 600], 8, 1, 0, [0, 0, 0, 1]);
    // this.mBarrageSet = [];

    // this.mMsg = new FontRenderable("Status Message");
    // this.mMsg.setColor([1, 1, 1, 1]);
    // this.mMsg.getXform().setPosition(5, 5);
    // this.mMsg.setTextHeight(3);

    // this.mWing = new Wing(this.kMinionSprite,50,20,0);
    this.mHero = new Hero(this.kHero);
    this.mTrap = new Trap(this.kTrap);
    this.mSavePoint = new SavePoint(this.kSave);

    var i, j, rx, ry, obj, dy, dx;

    rx = -15;
    for (i = 0; i < 9; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 5);
        this.mAllPlatforms.addToSet(obj);

        obj = new Platform(this.kPlatformTexture, rx, 112);
        this.mAllPlatforms.addToSet(obj);
        rx += 30;
    }

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray


    this.mCamera.setupViewProjection();

    this.mHero.draw(this.mCamera);
    this.mTrap.draw(this.mCamera);
    this.mSavePoint.draw(this.mCamera);

    this.mAllPlatforms.draw(this.mCamera);

    // this.ParticleButton.draw(this.mCamera);
    // this.PhysicsButton.draw(this.mCamera);
    // this.UIButton.draw(this.mCamera);
    // this.UIText.draw(this.mCamera);
    // for (let i = 0; i < this.mBarrageSet.length; i++) {
    //     this.mBarrageSet[i].draw(this.mCamera);
    // }
    //
    //
    // this.mMsg.draw(this.mCamera);
    //
    // this.mWing.draw(this.mCamera);

};

GameScene.prototype.update = function () {
    // this.ParticleButton.update();
    // this.PhysicsButton.update();
    // this.UIButton.update();
    this.mAllPlatforms.update();
    this.reset = gEngine.Physics.processObjSet(this.mHero, this.mAllPlatforms);

    this.mHero.update(this.mTrap, this.mSavePoint, this.reset);
    this.mTrap.update();
    this.mSavePoint.update();

    this.reset = false;

    // var num = 0;
    // for (let i = 0; i < this.mBarrageSet.length; i++) {
    //     this.mBarrageSet[i].update(this.mCamera,this.mWing);
    //     // FIXME debug thing
    //     num += this.mBarrageSet[i].size();
    // }
    //
    //
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
    //     this.mBarrageSet.push(new Barrage(this.kMinionSprite, vec2.fromValues(50, 50), 0.8, BARRAGE_TYPE.CIRCLE, 30));
    // }
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
    //     this.mBarrageSet.push(new Barrage(this.kMinionSprite, vec2.fromValues(50, 50), 0.8, BARRAGE_TYPE.D_SECTOR, 10));
    // }
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
    //     this.mBarrageSet.push(new Barrage(this.kMinionSprite, vec2.fromValues(50, 50), 0.8, BARRAGE_TYPE.LINE, 30));
    // }
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
    //     this.mBarrageSet.push(new Barrage(this.kMinionSprite, vec2.fromValues(50, 50), 0.8, BARRAGE_TYPE.CROSS, 30));
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
    //     gEngine.AudioClips.playACue(this.kCue, 0.1);
    // }

    //
    // this.mWing.update();
    // this.mMsg.setText("Bullet Num: " + num);

};

GameScene.prototype.gameSceneSelect = function () {
    this.LevelSelect = "Game";
    gEngine.GameLoop.stop();
};
//
// GameScene.prototype.physicsSelect = function(){
//     this.LevelSelect="Physics";
//     gEngine.GameLoop.stop();
// };
//
// GameScene.prototype.uiSelect= function(){
//     this.LevelSelect="UI";
//     gEngine.GameLoop.stop();
// };