'use strict';

var Vector = function Vector(_x, _y) {

  var vect = {
    x: _x || 0,
    y: _y || 0,

    setX: function(value) {
      this.x = value;
    },

    getX: function() {
      return this.x;
    },

    setY: function(value) {
      this.y = value;
    },

    getY: function() {
      return this.y;
    },

    addTo: function(vectorToAdd) {
      this.x += vectorToAdd.x;
      this.y += vectorToAdd.y;
      return this;
    },

    subTo: function(vectorToSub) {
      this.x -= vectorToSub.x;
      this.y -= vectorToSub.y;
      return this;
    },

    multiply: function(multiplicator) {
      this.x *= multiplicator;
      this.y *= multiplicator;
      return this;
    },

    divide: function(divider) {
      this.x /= divider;
      this.y /= divider;
      return this;
    },

    setAngle: function(radAngle) {
      var length = this.getLength();
      this.x = Math.cos(radAngle) * length;
      this.y = Math.sin(radAngle) * length;
    },

    setDegAngle: function(degAngle) {
      var angle = Math.radians(degAngle);
      this.setAngle(angle);
    },

    getAngle: function() {
      return Math.atan2(this.y, this.x);
    },

    setLength: function(length) {
      var angle = this.getAngle();
      this.x = Math.cos(angle) * length;
      this.y = Math.sin(angle) * length;
    },

    getLength: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    toString: function() {
      return 'x:' + this.x + ', y:' + this.y;
    },

    debug: function(label) {
      console.log((label || '') + ' : ' + this.toString());
    }
  };

  Math.radians = function(deg) {
    return deg * Math.PI / 180;
  };

  Math.degres = function(rad) {
    return rad * 180 / Math.PI;
  };

  function _random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return vect;
};

/** @type {Object} CommonJS export */
module.exports = Vector;
