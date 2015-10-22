'use strict';

/** Requires */
var Canvas = require('../modules/canvas.js');
var InputHandler = require('../modules/inputhandler.js');
var Ship = require('../objects/ship.js');
var Star = require('../objects/star.js');
var Planet = require('../objects/planet.js');

/**
 * Main game routine
 *
 * @return {game} game object
 */

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
  var sun = new Star();
  // var planet = new Entity();
  var ship = new Ship();

  // init user interaction
  var interactions = new InputHandler();

  var projectilesList = [];

  /**
  *  Buildroutine
  */
  game.build = function() {
    // init the differents canvas
    game.canvasList.bkgnd = new Canvas('bkgnd', 0, game);
    game.canvasList.ui = new Canvas('ui', 2, game);
    game.canvasList.main = new Canvas('main', 1, game);

    // init background color
    game.canvasList.bkgnd.ctx.fillStyle = 'black';
    game.canvasList.bkgnd.ctx.rect(0, 0, game.width, game.height);
    game.canvasList.bkgnd.ctx.fill();

    // Build the differents entities
    sun.build(
      game.width / 2, // x
      game.height / 2, // y
      0, // speed
      0, // direction
      20, // radius
      game.canvasList.main.ctx // context
    );
    sun.mass = 1000;

    // planet.init(
    //   game.width / 2 + 200,
    //   game.height / 2,
    //   .5,
    //   Math.PI / 2
    // );
    // planet.mass = 100;

    ship.build(
      game.width / 2 + 200,
      game.height / 2 + 100,
      0,
      Math.PI / 4,
      10,
      game.canvasList.main.ctx
    );
    ship.mass = 50;

    // begin the game loop
    game.loop();
  };

  /**
   * update routine
   *
   * @param  {int} dt [description]
   */
  game.update = function(dt) {
    if (!game.pause) {
      // controls-----
      if (interactions.isDown('up')) {
        ship.accelerate();
        console.log('up');
      }

      if (interactions.isDown('down')) {
        ship.decelerate();
        console.log('down');
      }

      if (interactions.isDown('left')) {
        ship.turnLeft();
        console.log('left');
      }

      if (interactions.isDown('right')) {
        ship.turnRight();
        console.log('right');
      }

      if (interactions.isDown('spacebar')) {
        projectilesList.push(ship.fire());
        console.log('right');
      }

      // forces-----
      //planet.gravitateAround(sun);
      //ship.gravitateAround(sun);
      //
      for (var i = 0; i < projectilesList.length; i++) {
        projectilesList[i].gravitateAround(sun);
      }

      // updates-----
      // planet.update(dt);
      ship.update(dt);
      //ship.updatebullets(dt);
      //game.updateProjectiles(dt);
    }

    if (interactions.isPressed('enter')) {
      console.log('space' + game.pause);
      game.pause = !game.pause;
    }

    if (!game.pause) {
      game.draw();
    }
  };

  /**
   * updates all independent Elements
   *
   * @param  {int} dt [description]
   */
  game.updateProjectiles = function(dt) {
    // update all projectiles
    for (var i = 0; i < projectilesList.length; i++) {
      projectilesList[i].update();
    }

    // collisions of projectiles
    for (var i = 0; i < projectilesList.length; i++) {
      if (projectilesList[i].outOfScreen()) {
        projectilesList.splice(i, 1);
      }
    }
  };

  /**
   * Draw all entities
   */
  game.draw = function() {
    game.canvasList.main.clean();
    game.canvasList.ui.clean();

    sun.draw();
    ship.draw();

    // projectiles
    for (var i = 0; i < projectilesList.length; i++) {
      projectilesList[i].draw();
    }
  };

  /**
   * RequestAnimationFrameLoop
   */
  game.loop = function() {
    var now = Date.now();
    var dt = (now - _lastTime) / 1000;

    game.update(dt);
    game.draw();

    _lastTime = now;
    document.title = 'delta in fps: ' + dt;
    _raf = _requestAnimationFrame(game.loop);

  };

  return game;
};

/** @type {Object} CommonJS export */
module.exports = Game;

