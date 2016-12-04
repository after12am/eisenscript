var _ = {
  has: function(obj, key) {
    return hasOwnProperty.call(obj, key);
  },

  extend: function(destination, source) {
    for(var k in source) destination[k] = source[k];
    return destination;
  },

  values: function(obj) {
    var values = [];
    for (var key in obj) if (this.has(obj, key)) values.push(obj[key]);
    return values;
  }
};

if (module) {
  module.exports = _;
}
