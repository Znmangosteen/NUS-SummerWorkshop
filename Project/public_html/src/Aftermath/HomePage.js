/*
 * File: HomePage.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function HomePage() {
    this.kBg = "assets/Background/snow-bg.png";
    this.kControlGuide = "assets/UI/control-guide.png";
    this.kPlatformTexture = "assets/BlockUnit/snow-platform.png";
    this.kHero = "assets/Character/characters.png";
    this.kHeroBullet = "assets/Bullet/pink-bullet.png";





    // The camera to view the scene
    this.mCamera = null;

    //
    this.ContinueButton = null;
    this.PlayButton = null;
    this.ControlButton = null;
    this.TrophyButton = null;
    this.AcknowledgeButton = null;

    // UI Setting
    this.ButtonWidth = 300;
    this.ButtonHeight = 100;
    this.ButtonSize = [this.ButtonWidth, this.ButtonHeight];
    this.ButtonFontSize = 5;
    this.ButtonPosition = [300, 550];


    //next
    this.State = null;

}

var STATE = {
    HOME: 0,
    PLAY: 1,
    CONTROL: 2,
    TROPHY: 3,
    ACKNOWLEDGE: 4,
    HIDDEN: 1000
};

gEngine.Core.inheritPrototype(HomePage, Scene);


HomePage.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kControlGuide);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kHeroBullet);

};

HomePage.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kControlGuide);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kHeroBullet);

    if (this.State === STATE.PLAY) {
        // gEngine.Core.startScene(new GameScene());
        gEngine.Core.startScene(new LevelSelect());
    } else if (this.State === "contGame") {

    } else if (this.State === STATE.HIDDEN) {
        gEngine.Core.startScene(new HiddenLevel());
    }

};

HomePage.prototype.initialize = function () {
    // Step A: set up the cameras

    this.mCamera = new Camera(
        vec2.fromValues(100, 56.25), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );

    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.initButton();
    this.initControlInfo();
    this.initTrophyInfo();
    this.initAcknowledgementInfo();

    this.bg = new TextureRenderable(this.kBg);
    this.bg.getXform().setSize(200, 112.5);
    this.bg.getXform().setPosition(100, 56.25);


};



HomePage.prototype.initButton = function () {
    this.ContinueButton = new UIButton(this.gameSceneSelect, this, this.ButtonPosition, this.ButtonSize, "Continue", this.ButtonFontSize);
    this.ButtonPosition[1] -= (1 + this.ButtonHeight);
    this.PlayButton = new UIButton(this.gameSceneSelect, this, this.ButtonPosition, this.ButtonSize, "Play", this.ButtonFontSize);
    this.ButtonPosition[1] -= (1 + this.ButtonHeight);
    this.ControlButton = new UIButton(this.controlInfo, this, this.ButtonPosition, this.ButtonSize, "Control", this.ButtonFontSize);
    this.ButtonPosition[1] -= (1 + this.ButtonHeight);
    this.TrophyButton = new UIButton(this.trophyInfo, this, this.ButtonPosition, this.ButtonSize, "Trophy", this.ButtonFontSize);
    this.ButtonPosition[1] -= (1 + this.ButtonHeight);
    this.AcknowledgeButton = new UIButton(this.acknowledgeInfo, this, this.ButtonPosition, this.ButtonSize, "Acknowledgement", this.ButtonFontSize);


};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.

HomePage.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.bg.draw(this.mCamera);
    this.drawButton();

    switch (this.State) {
        case STATE.CONTROL:
            this.drawControlInfo();
            break;
        case STATE.TROPHY:
            this.drawTrophyInfo();
            break;
        case STATE.ACKNOWLEDGE:
            this.drawAcknowledgementInfo();
            break;

    }

    };

HomePage.prototype.drawButton = function () {
    this.ContinueButton.draw(this.mCamera);
    this.PlayButton.draw(this.mCamera);
    this.ControlButton.draw(this.mCamera);
    this.TrophyButton.draw(this.mCamera);
    this.AcknowledgeButton.draw(this.mCamera);
};


HomePage.prototype.update = function () {
    this.ContinueButton.update();
    this.PlayButton.update();
    this.ControlButton.update();
    this.TrophyButton.update();
    this.AcknowledgeButton.update();

    switch (this.State) {
        case STATE.CONTROL:
            this.updateControlInfo();
            break;
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.hiddenLevel();
    }
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {


};

// FIXME debug thing
HomePage.prototype.hiddenLevel = function () {
    this.State = STATE.HIDDEN;
    gEngine.GameLoop.stop();
};

HomePage.prototype.gameSceneSelect = function () {
    this.State = STATE.PLAY;
    gEngine.GameLoop.stop();
};

HomePage.prototype.controlInfo = function () {
    this.State = STATE.CONTROL;
};

HomePage.prototype.trophyInfo = function () {
    this.State = STATE.TROPHY;
};
HomePage.prototype.acknowledgeInfo = function () {
    this.State = STATE.ACKNOWLEDGE;
};