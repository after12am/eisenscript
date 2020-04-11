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

export default class Matrix4 {

  constructor( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {
    var te = this.elements = new Float32Array( 16 );

    // TODO: if n11 is undefined, then just set to identity, otherwise copy all other values into matrix
    //   we should not support semi specification of Matrix4, it is just weird.

    te[0] = ( n11 !== undefined ) ? n11 : 1; te[4] = n12 || 0; te[8] = n13 || 0; te[12] = n14 || 0;
    te[1] = n21 || 0; te[5] = ( n22 !== undefined ) ? n22 : 1; te[9] = n23 || 0; te[13] = n24 || 0;
    te[2] = n31 || 0; te[6] = n32 || 0; te[10] = ( n33 !== undefined ) ? n33 : 1; te[14] = n34 || 0;
    te[3] = n41 || 0; te[7] = n42 || 0; te[11] = n43 || 0; te[15] = ( n44 !== undefined ) ? n44 : 1;
  }

  set( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

    var te = this.elements;

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

  translate( v ) {

    var te = this.elements;
    var x = v.x, y = v.y, z = v.z;

    te[12] = te[0] * x + te[4] * y + te[8] * z + te[12];
    te[13] = te[1] * x + te[5] * y + te[9] * z + te[13];
    te[14] = te[2] * x + te[6] * y + te[10] * z + te[14];
    te[15] = te[3] * x + te[7] * y + te[11] * z + te[15];

    return this;

  }

  rotateX( angle ) {

    var te = this.elements;
    var m12 = te[4];
    var m22 = te[5];
    var m32 = te[6];
    var m42 = te[7];
    var m13 = te[8];
    var m23 = te[9];
    var m33 = te[10];
    var m43 = te[11];
    var c = Math.cos( angle );
    var s = Math.sin( angle );

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

    var te = this.elements;
    var m11 = te[0];
    var m21 = te[1];
    var m31 = te[2];
    var m41 = te[3];
    var m13 = te[8];
    var m23 = te[9];
    var m33 = te[10];
    var m43 = te[11];
    var c = Math.cos( angle );
    var s = Math.sin( angle );

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

    var te = this.elements;
    var m11 = te[0];
    var m21 = te[1];
    var m31 = te[2];
    var m41 = te[3];
    var m12 = te[4];
    var m22 = te[5];
    var m32 = te[6];
    var m42 = te[7];
    var c = Math.cos( angle );
    var s = Math.sin( angle );

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

    var te = this.elements;
    var x = v.x, y = v.y, z = v.z;

    te[0] *= x; te[4] *= y; te[8] *= z;
    te[1] *= x; te[5] *= y; te[9] *= z;
    te[2] *= x; te[6] *= y; te[10] *= z;
    te[3] *= x; te[7] *= y; te[11] *= z;

    return this;

  }

  clone() {

    var te = this.elements;

    return new Matrix4(

      te[0], te[4], te[8], te[12],
      te[1], te[5], te[9], te[13],
      te[2], te[6], te[10], te[14],
      te[3], te[7], te[11], te[15]

    );
  }
}
