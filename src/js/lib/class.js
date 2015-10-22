/**
 * ES5 compliant AMD/CommonJS Class Module
 * Copyright (c) 2012 James Florentino
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * Derived from John Resig's Simple Prototype Inheritance http://ejohn.org/
 * UMD compatible
 **/
(function() {
  'use strict'; // Comply to ES5 standards

  function factory(require, exports, module) {
    /**
     * Flag to prevent the Class.proto.init from being invoked during initialization
     * @type {Boolean}
     */
    var start = true;

    /**
     * Creates a shim for invoking a this.parent() command by wrapping it inside a closure
     * @method protoParent
     * @private
     * @param {object} prototype
     * @param {string} name
     * @param {function} method
     * @return {Function}
     */
    function protoParent(prototype, name, method) {
      return function() {
        this.parent = prototype[name];
        return method.apply(this, arguments);
      };
    }

    /**
     * Extends an object's properties and assign them as prototypes in a Function
     * @protected
     * @param {Function} BaseClass
     * @param {object} properties
     * @return {Function}
     */
    function extendClass(BaseClass, properties) {
      var parent = BaseClass.prototype;
      start = false;
      var prototype = new BaseClass();
      start = true;
      var attribute;
      // iterate over the properties and copy them.
      for (var name in properties) {
        if (properties.hasOwnProperty(name)) {
          attribute = properties[name];
          prototype[name] = typeof parent[name] === 'function' && typeof properties[name] === 'function' ?
              protoParent(parent, name, attribute) :
              attribute;
        }
      }
      /**
       * Create a fresh constructor
       * @class Class
       * @constructor
       */
      function Class() {
        // use the init method to define your constructor's content.
        if (start && this.init.apply) {
          this.init.apply(this, arguments);
        }
      }
      Class.prototype = prototype;
      Class.prototype.constructor = Class;
      /**
       * @method extend
       * @param attributes
       * @return {Class}
       */
      Class.extend = function(attributes) {
        return extendClass(Class, attributes);
      };
      return Class;
    }

    var Class = extendClass(function() {}, {});

    return module.exports = Class;
  }

  // Defines a module that both works in CommonJS and AMD.
  if (typeof define === 'function') {
    define(factory);
  } else if (typeof exports === 'object' && typeof module === 'object') {
    factory(require, exports, module);
  } else {
    /* if all else fails, default to the window namespace */
    window.Class = factory(function() {}, {}, {});
  }

})();
