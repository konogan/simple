'use strict';
var Entity = require('../objects/entity.js');
// var  = require('../objects/bullet.js');
var Class = require('../lib/class');

var Test = Entity.extend({
  init: function(x, y, speed, direction, radius, context) {
    this.parent(x, y, speed, direction, radius, context);
    console.log('modify in test');
    this.radius = 20;
    this.color = 'red';
  },

  update: function() {

    this.parent(); // update entity
    console.log('test update');
    console.log(this);
  },

  draw: function() {
    console.log('Test draw');
  }

});

/** @type {Object} CommonJS export */
module.exports = Test;


