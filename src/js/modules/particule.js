'use strict';
var Entity = require('../modules/entity.js');

var Particule = function Bullet(lifeTime) {
  var particule = new Entity();
  particule.lifeTime = lifeTime;
  particule.color = 'white';
  particule.radius = 10;

  particule.outOfScreen = function() {
    return this.position.x < 0 ||
    this.position.x > this.ctx.canvas.width ||
    this.position.y < 0 ||
    this.position.y > this.ctx.canvas.heigth;
  };

  particule.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.stroke();
  };

  return bullet;
};

/** @type {Object} CommonJS export */
module.exports = Particule
