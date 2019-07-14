/* 
 * File: Patrol.js
 * a set of Patrols
 */

/*jslint node: true, vars:true , white: true*/
/*global gEngine, vec2, GameObjectSet, ParticleEmitter */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Default Contsructor<p>
 * a set of Patrols
 * @returns {Patrol} New instance of Patrol
 * @class Patrol
 */
function PatrolSet() {
    GameObjectSet.call(this);
    this.mSet = [];
    this.mBoxActivity = false;
}
gEngine.Core.inheritPrototype(PatrolSet, GameObjectSet);

/**
 * the function to call to generate particles
 * @param {vec2} p Position of Emitter in WC space
 * @param {Number} n Number of particles to be emitted
 * @param {function} func Creater Function
 * @returns {void}
 * @memberOf Patrol
 */
PatrolSet.prototype.addEmitterAt = function (p, n, func) {
    var e = new ParticleEmitter(p, n, func);
    this.mEmitterSet.push(e);
};

/**
 * Draw function called by GameLoop
 * @param {Camera} aCamera Camera to draw too
 * @returns {void}
 * @memberOf Patrol
 */
PatrolSet.prototype.draw = function (aCamera) {
    GameObjectSet.prototype.draw.call(this,aCamera);

    // var gl = gEngine.Core.getGL();
    // gl.blendFunc(gl.ONE, gl.ONE);  // for additive blending!
    // GameObjectSet.prototype.draw.call(this, aCamera);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // restore alpha blending
};

/**
 * Update Function called by GameLoop
 * @returns {void}
 * @memberOf Patrol
 */
PatrolSet.prototype.update = function (aCamera) {
    // GameObjectSet.prototype.update.call(this);
    var i;
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        this.mBoxActivity = !this.mBoxActivity;
    }
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update(aCamera, this.mBoxActivity);
    }
    for (i = 0; i < this.mSet.length; i++) {
        if (this.mSet[i].isDied()) {
            this.mSet.splice(i, 1);
            break;
        }
    }
    // var i;
    // for (i = 0; i < this.mSet.length; i++) {
    //     this.mSet[i].update();
    // }
    // Cleanup Particles
    // var i, e, obj;
    // for (i=0; i<this.size(); i++) {
    //     obj = this.getObjectAt(i);
    //     if (obj.hasExpired()) {
    //         this.removeFromSet(obj);
    //     }
    // }
    //
    // // Emit new particles
    // for (i=0; i<this.mEmitterSet.length; i++) {
    //     e = this.mEmitterSet[i];
    //     e.emitParticles(this);
    //     if (e.expired()) {
    //         this.mEmitterSet.splice(i, 1);
    //     }
    // }
};
