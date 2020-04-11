module.exports = {
  extend: function(destination, source) {
    for(let k in source) destination[k] = source[k];
    return destination;
  }
};
