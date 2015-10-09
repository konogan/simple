
/**
 * DOM insertion of Canvas element
 *
 * @param {String} name  [description]
 * @param {Int} layer [description]
 * @param {Object} size : object with width / height property
 * @return {Object} canvas
 */

var Canvas = function(name, layer, size) {
  'use strict';
  var _canvas = document.createElement('canvas');
  _canvas.width = size.width;
  _canvas.height = size.height;
  _canvas.style.zIndex = layer;
  _canvas.id = name;

  var _ctx = _canvas.getContext('2d');
  _ctx.imageSmoothingEnabled = false;

  document.body.appendChild(_canvas);

  var canvas = {
      name: name,
      dom: _canvas,
      ctx: _ctx,
      clean: function() {
        _ctx.clearRect(
          0,
          0,
          _canvas.width,
           _canvas.height
        );
      }
    };

  return canvas;
};

/** @type {Object} CommonJS export */
module.exports = Canvas;

