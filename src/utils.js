module.exports = {
  extend: function(destination, source) {
    for(var k in source) destination[k] = source[k];
    return destination;
  }
};
