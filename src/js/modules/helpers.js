var helpers = {

  minmax: function(x, min, max) {
    return Math.max(min, Math.min(max, x));
  },

  random: function(min, max) {
    return (min + (Math.random() * (max - min)));
  },

  getRandomIntInclusive: function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
},

  randomChoice: function(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
  },

  randomBool: function() {
    return randomChoice([true, false]);
  },

  between: function(x, from, to) {
    return (is.valid(x) && (from <= x) && (x <= to));
  },

  overlap: function(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(((x1 + w1 - 1) < x2) || ((x2 + w2 - 1) < x1) || ((y1 + h1 - 1) < y2) || ((y2 + h2 - 1) < y1));
  },

  newGrid: function(rows, columns, def) {
    var _array = new Array(rows);
    for (var i = 0; i < rows; i++) {
      _array[i] = new Array(columns);
      for (var j = 0; j < columns; j++) {
        _array[i][j] = def || 0;
      }
    }
    return _array;
  }

};

module.exports = helpers;
