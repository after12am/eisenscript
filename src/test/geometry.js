var Geometry = function(type) {
  switch (type) {
    case Primitive.Box:
    case Primitive.Grid: return new THREE.CubeGeometry(1, 1, 1);
    case Primitive.Sphere: return new THREE.SphereGeometry(.5, 40, 32);
  }
}
