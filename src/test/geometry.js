var Geometry = function(type) {
  switch (type) {
    case Primitive.Box:
    case Primitive.Grid: return Geometry.Cube;
    case Primitive.Sphere: return Geometry.Sphere;
  }
}

Geometry.Cube = new THREE.CubeGeometry(1, 1, 1);
Geometry.Sphere = new THREE.SphereGeometry(.5, 40, 32);