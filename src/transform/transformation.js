'use strict';

const Matrix4 = require('../matrix');

module.exports = class Transformation {
  constructor(matrix) {
    this.matrix4 = matrix || new Matrix4();
  }

  translate(x, y, z) {
    this.matrix4.translate({
      x: x,
      y: y,
      z: z
    });
    return this;
  }

  rotateX(angle) {
    this.matrix4.rotateX(angle);
    return this;
  }

  rotateY(angle) {
    this.matrix4.rotateY(angle);
    return this;
  }

  rotateZ(angle) {
    this.matrix4.rotateZ(angle);
    return this;
  }

  scale(x, y, z) {
    this.matrix4.scale({
      x: x,
      y: y,
      z: z
    });
    return this;
  }

  // make 3x3 rotation matrix to 4x4 matrix
  // test: { m 1 0 0 0 .53 -.85 0 .85 .53 } box
  matrix(v) {
    this.matrix4.set(
      v[0], v[1], v[2], 0,
      v[3], v[4], v[5], 0,
      v[6], v[7], v[8], 0,
         0,    0,    0, 1
    );
    return this;
  }

  clone() {
    return new Transformation(this.matrix4.clone());
  }
}
