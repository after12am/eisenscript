/**
 * @author alteredq / http://alteredqualia.com/
 */

// Clamp value to range <a, b>

var clamp = function ( x, a, b ) {

  return ( x < a ) ? a : ( ( x > b ) ? b : x );
};

var degToRad = function() {

  var degreeToRadiansFactor = Math.PI / 180;

  return function ( degrees ) {
    return degrees * degreeToRadiansFactor;
  };
}();

if (module) {
  module.exports.degToRad = degToRad;
  // module.exports.randInt = randInt;
  module.exports.clamp = clamp;
}
