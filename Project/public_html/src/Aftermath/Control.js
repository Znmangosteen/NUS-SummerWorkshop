HomePage.prototype.initControlInfo = function () {
    this.mControlInfo = new SpriteRenderable(this.kControlGuide);
    this.mControlInfo.setColor([1, 1, 1, 0]);
    this.mControlInfo.getXform().setPosition(150, 50);
    this.mControlInfo.getXform().setSize(5, 5);
    this.mControlInfo.setElementPixelPositions(0, 64, 0, 64);
};

HomePage.prototype.drawControlInfo = function () {
    this.mControlInfo.draw(this.mCamera);

};