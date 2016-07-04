/**
 * @author alteredq / http://alteredqualia.com/
 */

// Clamp value to range <a, b>

var clamp = function ( x, a, b ) {
  
  return ( x < a ) ? a : ( ( x > b ) ? b : x );
};

// Clamp value to range <a, inf)

var clampBottom = function ( x, a ) {
  
  return x < a ? a : x;
};

// Linear mapping from range <a1, a2> to range <b1, b2>

var mapLinear = function ( x, a1, a2, b1, b2 ) {
  
  return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );
};

// http://en.wikipedia.org/wiki/Smoothstep

var smoothstep = function ( x, min, max ) {

  if ( x <= min ) return 0;
  if ( x >= max ) return 1;
  
  x = ( x - min )/( max - min );
  
  return x*x*(3 - 2*x);
};

var smootherstep = function ( x, min, max ) {

  if ( x <= min ) return 0;
  if ( x >= max ) return 1;

  x = ( x - min )/( max - min );

  return x*x*x*(x*(x*6 - 15) + 10);
};

// Random float from <0, 1> with 16 bits of randomness
// (standard Math.random() creates repetitive patterns when applied over larger space)

var random16 = function () {
  
  return ( 65280 * Math.random() + 255 * Math.random() ) / 65535;
};

// Random integer from <low, high> interval

var randInt = function ( low, high ) {
  
  return low + Math.floor( Math.random() * ( high - low + 1 ) );
};

// Random float from <low, high> interval

var randFloat = function ( low, high ) {
  
  return low + Math.random() * ( high - low );
};

// Random float from <-range/2, range/2> interval

var randFloatSpread = function ( range ) {
  
  return range * ( 0.5 - Math.random() );
};

var sign = function ( x ) {
  
  return ( x < 0 ) ? -1 : ( ( x > 0 ) ? 1 : 0 );
};

var degToRad = function() {

  var degreeToRadiansFactor = Math.PI / 180;

  return function ( degrees ) {
    return degrees * degreeToRadiansFactor;
  };
}();

var radToDeg = function() {

  var radianToDegreesFactor = 180 / Math.PI;

  return function ( radians ) {
    return radians * radianToDegreesFactor;
  };
}();