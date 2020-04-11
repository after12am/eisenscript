export const clamp = (x, a, b) => (x < a) ? a : ((x > b) ? b : x);

export const degToRad = (degrees) => degrees * Math.PI / 180;
