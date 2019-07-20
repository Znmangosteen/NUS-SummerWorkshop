HomePage.prototype.initAcknowledgementInfo = function () {
    this.mAcknowledgementInfo = new SpriteRenderable(this.kControlGuide);
    this.mAcknowledgementInfo.setColor([1, 1, 1, 0]);
    this.mAcknowledgementInfo.getXform().setPosition(150, 80);
    this.mAcknowledgementInfo.getXform().setSize(5, 5);
    this.mAcknowledgementInfo.setElementPixelPositions(0, 64, 0, 64);
};

HomePage.prototype.drawAcknowledgementInfo = function () {
    this.mAcknowledgementInfo.draw(this.mCamera);

};