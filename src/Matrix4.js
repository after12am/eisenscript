/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://exocortex.com
 */

module.exports = class Matrix4 {

  constructor( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {
    const te = this.elements = new Float32Array( 16 );

    // TODO: if n11 is undefined, then just set to identity, otherwise copy all other values into matrix
    //   we should not support semi specification of Matrix4, it is just weird.

    te[0] = ( n11 !== undefined ) ? n11 : 1; te[4] = n12 || 0; te[8] = n13 || 0; te[12] = n14 || 0;
    te[1] = n21 || 0; te[5] = ( n22 !== undefined ) ? n22 : 1; te[9] = n23 || 0; te[13] = n24 || 0;
    te[2] = n31 || 0; te[6] = n32 || 0; te[10] = ( n33 !== undefined ) ? n33 : 1; te[14] = n34 || 0;
    te[3] = n41 || 0; te[7] = n42 || 0; te[11] = n43 || 0; te[15] = ( n44 !== undefined ) ? n44 : 1;
  }

  set( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

    const te = this.elements;

    te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
    te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
    te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
    te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;

    return this;

  }

  identity() {

    this.set(

      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1

    );

    return this;

  }

  multiplyMatrices( a, b ) {
    var ae = a.elements;
		var be = b.elements;
		var te = this.elements;

		var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
		var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
		var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
		var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

		var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
		var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
		var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
		var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

		te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;

	}

  translate( v ) {

    const te = this.elements;
    const x = v.x, y = v.y, z = v.z;

    te[12] = te[0] * x + te[4] * y + te[8] * z + te[12];
    te[13] = te[1] * x + te[5] * y + te[9] * z + te[13];
    te[14] = te[2] * x + te[6] * y + te[10] * z + te[14];
    te[15] = te[3] * x + te[7] * y + te[11] * z + te[15];

    return this;

  }

  rotateX( angle ) {

    const te = this.elements;
    const m12 = te[4];
    const m22 = te[5];
    const m32 = te[6];
    const m42 = te[7];
    const m13 = te[8];
    const m23 = te[9];
    const m33 = te[10];
    const m43 = te[11];
    const c = Math.cos( angle );
    const s = Math.sin( angle );

    te[4] = c * m12 + s * m13;
    te[5] = c * m22 + s * m23;
    te[6] = c * m32 + s * m33;
    te[7] = c * m42 + s * m43;

    te[8] = c * m13 - s * m12;
    te[9] = c * m23 - s * m22;
    te[10] = c * m33 - s * m32;
    te[11] = c * m43 - s * m42;

    return this;

  }

  rotateY( angle ) {

    const te = this.elements;
    const m11 = te[0];
    const m21 = te[1];
    const m31 = te[2];
    const m41 = te[3];
    const m13 = te[8];
    const m23 = te[9];
    const m33 = te[10];
    const m43 = te[11];
    const c = Math.cos( angle );
    const s = Math.sin( angle );

    te[0] = c * m11 - s * m13;
    te[1] = c * m21 - s * m23;
    te[2] = c * m31 - s * m33;
    te[3] = c * m41 - s * m43;

    te[8] = c * m13 + s * m11;
    te[9] = c * m23 + s * m21;
    te[10] = c * m33 + s * m31;
    te[11] = c * m43 + s * m41;

    return this;

  }

  rotateZ( angle ) {

    const te = this.elements;
    const m11 = te[0];
    const m21 = te[1];
    const m31 = te[2];
    const m41 = te[3];
    const m12 = te[4];
    const m22 = te[5];
    const m32 = te[6];
    const m42 = te[7];
    const c = Math.cos( angle );
    const s = Math.sin( angle );

    te[0] = c * m11 + s * m12;
    te[1] = c * m21 + s * m22;
    te[2] = c * m31 + s * m32;
    te[3] = c * m41 + s * m42;

    te[4] = c * m12 - s * m11;
    te[5] = c * m22 - s * m21;
    te[6] = c * m32 - s * m31;
    te[7] = c * m42 - s * m41;

    return this;

  }

  scale( v ) {

    const te = this.elements;
    const x = v.x, y = v.y, z = v.z;

    te[0] *= x; te[4] *= y; te[8] *= z;
    te[1] *= x; te[5] *= y; te[9] *= z;
    te[2] *= x; te[6] *= y; te[10] *= z;
    te[3] *= x; te[7] *= y; te[11] *= z;

    return this;

  }

  clone() {

    const te = this.elements;

    return new Matrix4(

      te[0], te[4], te[8], te[12],
      te[1], te[5], te[9], te[13],
      te[2], te[6], te[10], te[14],
      te[3], te[7], te[11], te[15]

    );
  }
}
