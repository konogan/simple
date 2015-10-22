'use strict';
var Class = require('../lib/class');
var Entity = require('../modules/entity.js');
var Bullet = require('../objects/bullet.js');

var Ship = Entity.extend({
  init: function() {
    this.name = 'Ship';
  },

  build: function(x, y, speed, direction, radius, context) {
    console.log('Build Ship');
    this.parent(x, y, speed, direction, radius, context);
    this.shield = 100;
    this.turningRadius = .05;
    this.speedLimit = 10;
    this.inMotion = false;
    this.color = 'blue';
    this.bullets = [];
  },

  turnLeft: function() {
    console.log('turnLeft');
    var _currentAngle = this.velocity.getAngle();
    this.velocity.setAngle(_currentAngle - this.turningRadius);
  },

  turnRight: function() {
    console.log('turnRight');
    var _currentAngle = this.velocity.getAngle();
    this.velocity.setAngle(_currentAngle + this.turningRadius);
  },

  accelerate: function() {
    console.log('accelerate');
    this.inMotion = true;
    var _currentLenght = this.velocity.getLength();
    var _newSpeed = _currentLenght + .05;
    if (_newSpeed > this.speedLimit) {
      _newSpeed = this.speedLimit;
    }
    this.velocity.setLength(_newSpeed);
  },

  decelerate: function() {
    console.log('decelerate');
    var _currentLenght = this.velocity.getLength();
    var _newSpeed = _currentLenght - .05;
    if (_newSpeed < 0) {
      _newSpeed = 0.001;
    }
    this.velocity.setLength(_newSpeed);
  },

  fire: function() {
    var _newBullet = new Bullet();
    _newBullet.init(
      this.position.x,
      this.position.y,
      this.velocity.getLength() + 10,
      this.velocity.getAngle(),
      10,
      this.ctx
    );
    //_newBullet.mass =100;
    return _newBullet;
  },

  draw: function() {
    this.ctx.fillStyle = 'lightgrey';
    this.ctx.strokeStyle = this.color;

    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(this.velocity.getAngle());

    this.ctx.beginPath();
    this.ctx.moveTo(45, 0);
    this.ctx.lineTo(35, 0);
    this.ctx.lineTo(25, 10);
    this.ctx.lineTo(5, 10);
    this.ctx.lineTo(-15, 25);
    this.ctx.lineTo(-25, 15);
    this.ctx.lineTo(-25, 10);
    this.ctx.lineTo(-30, 10);
    this.ctx.lineTo(-30, 5);
    this.ctx.lineTo(-25, 5);
    this.ctx.lineTo(-25, 0);
    this.ctx.lineTo(-25, -5);
    this.ctx.lineTo(-30, -5);
    this.ctx.lineTo(-30, -10);
    this.ctx.lineTo(-25, -10);
    this.ctx.lineTo(-25, -15);
    this.ctx.lineTo(-15, -25);
    this.ctx.lineTo(5, -10);
    this.ctx.lineTo(25, -10);
    this.ctx.lineTo(35, 0);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(0, 15);
    this.ctx.lineTo(0, 25);
    this.ctx.lineTo(-15, 25);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(0, -15);
    this.ctx.lineTo(0, -25);
    this.ctx.lineTo(-15, -25);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();

    this.ctx.moveTo(0, 15);
    this.ctx.lineTo(5, 15);
    this.ctx.lineTo(5, 20);
    this.ctx.lineTo(0, 20);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(0, -15);
    this.ctx.lineTo(5, -15);
    this.ctx.lineTo(5, -20);
    this.ctx.lineTo(0, -20);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(20, 5);
    this.ctx.lineTo(30, 0);
    this.ctx.lineTo(20, -5);
    this.ctx.lineTo(20, 5);
    this.ctx.stroke();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(-5, 0);
    this.ctx.lineTo(-20, 0);
    this.ctx.stroke();

    if (this.velocity.getLength() > 0.01) {
      var _size = (this.velocity.getLength() * 10 + 50) * -1;
      //console.log('draw thrust');
      //
      this.ctx.fillStyle = 'red';
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'red';
      this.ctx.moveTo(-30, 7);
      this.ctx.lineTo(-35, 10);
      this.ctx.lineTo(_size, 7);
      this.ctx.lineTo(-35, 5);
      this.ctx.lineTo(-30, 7);
      this.ctx.stroke();
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.strokeStyle = 'red';
      this.ctx.moveTo(-30, -7);
      this.ctx.lineTo(-35, -10);
      this.ctx.lineTo(_size, -7);
      this.ctx.lineTo(-35, -5);
      this.ctx.lineTo(-30, -7);
      this.ctx.stroke();
      this.ctx.fill();
    }

    //this.ctx.fill();
    this.ctx.restore();

    //this.inMotion: false;
  }
});

/** @type {Object} CommonJS export */
module.exports = Ship;
