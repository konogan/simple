'use strict';
var Vector = require('../modules/vector.js');
var Class = require('../lib/class');

var Entity = Class.extend({


  init: function(x, y, speed, direction, radius, context) {
    this.name = 'entity';
    this.size = 20; // squa
    this.angle = 0;
    this.mass = 1;
    this.lastPositions = [];
    this.position = new Vector(x, y); // initial poistion
    this.velocity = new Vector(0, 0); // initial velocity
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);
    this.radius = radius || 10;
    if (context) {
      this.ctx = context;
    }
    return this;
  },

  accelerate: function(accel) {
    this.velocity.addTo(accel);
  },

  // angle entre 2 vecteurs
  angleTo: function(entity2) {
    return Math.atan2(entity2.position.y - this.position.y, entity2.position.x - this.position.x);
  },

  // distance entre 2 vecteurs
  distanceTo: function(entity2) {
    var dx = entity2.position.x - this.position.x;
    var dy = entity2.position.y - this.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  },

  // gravitation
  gravitateAround: function(entity2) {
    var grav = new Vector(0, 0); // nouveau vecteur null
    var dist = this.distanceTo(entity2); // distance par rapport a l'object vers lequel on veut graviter
    grav.setLength(entity2.mass / (dist * dist)); // calucl longeur vect grav
    grav.setAngle(this.angleTo(entity2)); // calcul angle vect grav
    this.velocity.addTo(grav); // on ajoute la grav a notre velocité
  },

  update: function(dt) {
    console.log('entity update');
    //console.log(dt);
    //this.lastPositions.push(this.position);
    //this.position.addTo(this.velocity);
  },

  setContext: function(_ctx) {
      this.ctx = _ctx;
    },

  drawDebug: function(_ctx, color, size, arrow) {
      _ctx.fillStyle = color;
      _ctx.strokeStyle = color;

      if (arrow) {
        _ctx.save();
        _ctx.translate(this.position.x, this.position.y);
        _ctx.rotate(this.velocity.getAngle());
        _ctx.beginPath();
        _ctx.moveTo(10, 0);
        _ctx.lineTo(-10, -7);
        _ctx.lineTo(-10, 7);
        _ctx.lineTo(10, 0);
        _ctx.stroke();
        _ctx.fill();
        _ctx.restore();
      } else {
        _ctx.beginPath();
        _ctx.arc(this.position.x, this.position.y, size, 0, 2 * Math.PI, false);

        _ctx.fill();
      }
    },

  drawInfos: function(_ctx) {
        _ctx.font = '20pt VT323';
        _ctx.fillStyle = 'white';
        _ctx.fillText(
          'x: ' + Math.round(this.position.x * 100) / 100,
          this.position.x + 80,
          this.position.y - 20
        );
        _ctx.fillText(
         'y: ' + Math.round(this.position.y * 100) / 100,
         this.position.x + 80,
         this.position.y
       );

        _ctx.fillText(
         'velocity.angle: ' + Math.round(this.velocity.getAngle() * 100) / 100,
         this.position.x + 80,
         this.position.y + 20
       );
        _ctx.fillText(
         'velocity.lenght: ' + Math.round(this.velocity.getLength() * 100) / 100,
         this.position.x + 80,
         this.position.y + 40
       );

      }

  //return entity;
});

/** @type {Object} CommonJS export */
module.exports = Entity;
