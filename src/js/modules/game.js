'use strict';

var Canvas = require('../modules/canvas.js');
var Helpers = require('../modules/helpers.js');
var Input = require('../modules/input.js');
var Vector = require('../modules/vector.js');

var Entity = require('../objects/entity.js');

var Game = function() {
  var _lastTime;
  var _raf;
  var _requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
  var _cancelAnimationFrame = window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame;

  var game = {
    pause: false,
    width: window.innerWidth,
    height: window.innerHeight,
    fps: 30,
    canvasList: {}
  };

  // init the differents entities
  var sun = new Entity();
  var planet = new Entity();
  var ship = new Entity();

  // var asteroids = [];
  // var MAXASTER = 100;
  // for (var i = 0; i < MAXASTER; i++) {
  //   asteroids[i] = new Entity();
  // }

  // init user interaction
  var interactions = new Input();

  // game
  game.init = function() {
    // init the differents canvas
    game.canvasList.bkgnd = new Canvas('bkgnd', 0, game);
    game.canvasList.ui = new Canvas('ui', 2, game);
    game.canvasList.main = new Canvas('main', 1, game);

    // init the differents entities
    sun = sun.init(
      game.width / 2,
      game.height / 2,
      0,
      0
    );
    sun.mass = 100;

    planet = planet.init(
      game.width / 2 + 200,
      game.height / 2,
      .5,
      Math.PI / 2
    );
    planet.mass = 100;

    // for (var i = 0; i < MAXASTER; i++) {
    //   asteroids[i].init(
    //     Math.random() * game.width,
    //     Math.random() * game.height,
    //     Math.random() * 2,
    //     Math.random() * 2 * Math.PI
    //   );
    //   asteroids[i].mass = 10;
    // }

    // begin the game loop
    game.loop();
  };

  game.update = function(dt) {
    // controls
    if (interactions.isDown('up')) {
      console.log('up');
    }

    if (interactions.isDown('down')) {
      console.log('down');
    }

    if (interactions.isDown('left')) {
      console.log('left');
    }

    if (interactions.isDown('right')) {
      console.log('right');
    }

    if (interactions.isPressed('space')) {
      game.pause != game.pause;
    }
    // forces-----
    planet.gravitateAround(sun);

    // forces pour les asteroids
    //  - entre eux
    //  - le soleil
    //  - la planete
    /*for (var i = 0; i < MAXASTER; i++) {
      asteroids[i].gravitateAround(sun);
      asteroids[i].gravitateAround(planet);
      planet.gravitateAround(asteroids[i]);
      for (var j = 0; j < MAXASTER; j++) {
        if (i != j) {

          asteroids[i].gravitateAround(asteroids[j]);
        }
      }
      asteroids[i].update(dt);
    }*/

    planet.update(dt);

    game.draw();
  };

  game.draw = function() {
    game.canvasList.main.clean();
    game.canvasList.ui.clean();
    // game.canvasList.main.ctx.globalCompositeOperation = 'source-over';
    // game.canvasList.main.ctx.fillStyle = 'rgba(0, 0, 0, 0.09)';
    // game.canvasList.main.ctx.fillRect(
    //   0,
    //   0,
    //   game.width,
    //   game.height
    // );

    // game.canvasList.main.ctx.globalCompositeOperation = 'lighter';

    sun.drawDebug(game.canvasList.main.ctx, 'yellow', 20);
    planet.drawDebug(game.canvasList.main.ctx, 'red', 10, false);
    planet.drawInfos(game.canvasList.ui.ctx);

/*    for (var i = 0; i < MAXASTER; i++) {
      asteroids[i].drawDebug(game.canvasList.main.ctx, 'lightblue', 10, false);
    }*/

  };

  game.loop = function() {
    if (!game.pause) {
      var now = Date.now();
      var dt = (now - _lastTime) / 1000;

      game.update(dt);
      game.draw();

      _lastTime = now;
      document.title = 'delta in fps: ' + dt;
      _raf = _requestAnimationFrame(game.loop);
    } else {
      _cancelAnimationFrame(_raf);
    }
  };

  return game;
};

/** @type {Object} CommonJS export */
module.exports = Game;

