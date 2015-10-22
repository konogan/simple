'use strict';
var Entity = require('../modules/entity.js');
var Particule = require('../modules/particule.js');

var Bullet = function Bullet(hasStreak) {
  var bullet = new Entity();
  bullet.color = 'red';
  bullet.size = 4;
  bullet.hasStreak = (hasStreak) ? true : false;

  bullet.outOfScreen = function() {
    return this.position.x < 0 ||
    this.position.x > this.ctx.canvas.width ||
    this.position.y < 0 ||
    this.position.y > this.ctx.canvas.heigth;
  };

  bullet.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(this.velocity.getAngle());
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.size, 0);
    this.ctx.stroke();
    this.ctx.restore();
  };

  return bullet;
};

/** @type {Object} CommonJS export */
module.exports = Bullet;
