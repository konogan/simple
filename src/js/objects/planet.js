'use strict';
var Class = require('../lib/class');
var Entity = require('../modules/entity.js');

var Planet = Entity.extend({
  init: function() {
    this.name = 'Planet';
  },

  build: function(x, y, speed, direction, radius, context) {
    console.log('Build ' + this.name);
    this.parent(x, y, speed, direction, radius, context);
    this.color = 'lightblue';
  },

  draw: function() {
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }
});

/** @type {Object} CommonJS export */
module.exports = Planet;
