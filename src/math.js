module.exports.clamp = (x, a, b) => (x < a) ? a : ((x > b) ? b : x);

module.exports.degToRad = (degrees) => degrees * Math.PI / 180;
