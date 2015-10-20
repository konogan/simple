'use strict';
var Entity = require('../objects/entity.js');
// var  = require('../objects/bullet.js');
var Class = require('../lib/class');

var Test = Entity.extend({
  init: function() {
    this.parent().name = 'test';
    this.name = 'test';
  },

  update: function() {
    this.parent(); // update entity
    console.log('Test update');
    console.log('toto', this);
  },

  draw: function() {
    console.log('Test draw');
  }

});

/** @type {Object} CommonJS export */
module.exports = Test;


