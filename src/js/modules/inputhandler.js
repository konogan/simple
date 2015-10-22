'use strict';

var InputHandler = function() {
  var keys = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      spacebar: 32,
      enter: 13
    };

  var input = {};

  input.init = function() {
    input.keys = {};
    input.down = {};
    input.pressed = {};
    for (var key in keys) {
      var _code = keys[key];
      input.keys[_code] = key;
      input.down[key] = false;
      input.pressed[key] = false;
    }

    //  window.addEventListener('mousemove', function(evt) {
    //   mouse = _getMousePos(centralLayer.canvas.dom, evt);
    // }, false);

    document.addEventListener('keydown', function(evt) {
      if (input.keys[evt.keyCode]) {
        input.down[input.keys[evt.keyCode]] = true;
      }
    });

    document.addEventListener('keyup', function(evt) {
      if (input.keys[evt.keyCode]) {
        input.down[input.keys[evt.keyCode]] = false;
        input.pressed[input.keys[evt.keyCode]] = false;
      }
    });

  };
  input.init();

  input.isDown = function(key) {
    return input.down[key];
  };

  input.isPressed = function(key) {
    if (input.pressed[key]) {
      return false;
    } else if (input.down[key]) {
      return input.pressed[key] = true;
    }
    return false;
  };

  return input;
};

module.exports = InputHandler;

