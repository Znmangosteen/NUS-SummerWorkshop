/*
 * File: MyGame.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    //this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kCue = "assets/AudioTest/BlueLevel_cue.wav";
    this.kBG = "assets/galaxy.jpg";
    this.kMinionSprite = "assets/minion_sprite.png";

    // The camera to view the scene
    this.mCamera = null;
    this.ParticleButton = null;
    this.PhysicsButton = null;
    this.UIButton = null;
    this.UIText = null;
    this.LevelSelect = null;

    this.mHero = null;
    this.mPatrolSet = null;
    // this.mP = null;

    this.autoSpawn = false;
    this.lastSpawnTime = 0;
    this.autoSpawnInter = 0;

    this.mMsg = null;
}

gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.Textures.loadTexture(this.kMinionSprite);

};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kMinionSprite);

    if (this.LevelSelect === "Particle") {
        gEngine.Core.startScene(new ParticleLevel());
    }
    else if (this.LevelSelect === "Physics") {
        gEngine.Core.startScene(new RigidShapeDemo());
    }
    else if (this.LevelSelect === "UI") {
        gEngine.Core.startScene(new UIDemo());
    }
    gEngine.AudioClips.unloadAudio(this.kCue);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        200,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.bg = new TextureRenderable(this.kBG);
    this.bg.getXform().setSize(200, 150);
    this.bg.getXform().setPosition(0, 0);

    //  Create the hero object
    this.mHero = new Hero(this.kMinionSprite);
    // this.mP = new Patrol(this.kMinionSprite, Math.random() *(this.mCamera.getWCWidth()/2), Math.random()*(this.mCamera.getWCHeight()/2)-this.mCamera.getWCHeight()/4,Math.random()*5/60+5/60);
    this.mPatrolSet = new PatrolSet();

    // For echoing
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(-92, -70);
    this.mMsg.setTextHeight(5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.bg.draw(this.mCamera);

    this.mHero.draw(this.mCamera);

    // this.mP.draw(this.mCamera);

    this.mPatrolSet.draw(this.mCamera);

    this.mMsg.draw(this.mCamera);
};

MyGame.prototype.update = function () {
    // console.log(gEngine.Input.getMousePos());

    // this.mHero.rotateObjPointTo(gEngine.Input.getMousePos(), 1);
    var mousePos = vec2.fromValues(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
    if (vec2.distance(mousePos, this.mHero.getXform().getPosition()) > 5) {
        this.mHero.rotateObjPointTo(mousePos, 0.05);
        GameObject.prototype.update.call(this.mHero);  // the default GameObject: only move forward

    }

    this.mHero.update();
    // this.mP.update(this.mCamera);
    this.mPatrolSet.update(this.mCamera);

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        this.autoSpawn = !this.autoSpawn;
    }

    if (this.autoSpawn) {
        if (Date.now() - this.lastSpawnTime > this.autoSpawnInter) {
            this.autoSpawnInter = Math.random() * 1000 + 2000;
            this.lastSpawnTime = Date.now();
            this.mPatrolSet.addToSet(new Patrol(this.kMinionSprite, Math.random() * (this.mCamera.getWCWidth() / 2.1), Math.random() * (this.mCamera.getWCHeight() / 2) - this.mCamera.getWCHeight() / 4, Math.random() * 5 / 60 + 5 / 60));
        }

    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        this.mPatrolSet.addToSet(new Patrol(this.kMinionSprite, Math.random() * (this.mCamera.getWCWidth() / 2.1), Math.random() * (this.mCamera.getWCHeight() / 2) - this.mCamera.getWCHeight() / 4, Math.random() * 5 / 60 + 5 / 60));
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {

        gEngine.AudioClips.playACue(this.kCue, 0.1);
    }

    this.mMsg.setText("Status: DyePacks(" + this.mHero.mPackSet.size() + ") Patrols(" + this.mPatrolSet.size() + ") AutoSpawn(" + this.autoSpawn + ")");
};

MyGame.prototype.particleSelect = function () {
    this.LevelSelect = "Particle";
    gEngine.GameLoop.stop();
};

MyGame.prototype.physicsSelect = function () {
    this.LevelSelect = "Physics";
    gEngine.GameLoop.stop();
};

MyGame.prototype.uiSelect = function () {
    this.LevelSelect = "UI";
    gEngine.GameLoop.stop();
};