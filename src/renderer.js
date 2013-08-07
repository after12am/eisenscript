exports.TestRenderer = function(objects, option) {
  this.width = option.width || window.innerWidth;
  this.height = option.height || window.innerHeight;
  
  // set three.js renderer
  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.domElement = this.renderer.domElement;
  this.scene = new THREE.Scene();
  
  // group puts together the objects
  this.scene.add(this.group = new THREE.Object3D());
  
  // set camera
  this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 1000);
  this.camera.target = new THREE.Vector3(0, 0, 0);
  this.resetCamera().updateCamera();
  this.scene.add(this.camera);
  
  // define geometry in advance
  this.geometry = {
    cube: new THREE.CubeGeometry(1, 1, 1),
    sphere: new THREE.SphereGeometry(.5, 40, 32)
  }
  
  // build intermediate code
  if (objects) {
    for (var i = 0; i < objects.length; i++) {
      switch (objects[i].type) {
        case Type.Background: this.clearColor(objects[i].color); break;
        case Type.Primitive: this.add(objects[i]); break;
      }
    }
  }
};

// repaint background with specific color
exports.TestRenderer.prototype.clearColor = function(hex, alpha) {
  this.renderer.setClearColor(new THREE.Color(hex), alpha || 1);
  return this;
};

// add any primitive to stage
exports.TestRenderer.prototype.add = function(primitive) {
  var mat = new THREE.MeshBasicMaterial(primitive);
  var mesh;
  switch (primitive.name) {
    case 'box': mesh = new THREE.Mesh(this.geometry.cube, mat); break;
    case 'sphere': mesh = new THREE.Mesh(this.geometry.sphere, mat); break;
    case 'grid':
      primitive.wireframe = true;
      mesh = new THREE.Mesh(this.geometry.cube, mat);
      break;
  }
  // define additional setting
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  mesh.applyMatrix(primitive.matrix);
  this.group.add(mesh);
  return this;
};

// back to initial state
exports.TestRenderer.prototype.resetCamera = function() {
  this.lon = this.lon || 45;
  this.lonstep = this.lonstep || .5;
  this.lat = this.lat || 45;
  this.phi = this.phi || 0;
  this.theta = this.theta || 0;
  this.d = this.d || 30;
  return this;
};

// camera rotates around origin
exports.TestRenderer.prototype.updateCamera = function() {
  this.lat = clamp(this.lat, -85, 85);
  this.phi = degToRad(90 - this.lat);
  this.theta = degToRad(this.lon);
  // update camera position
  this.camera.position.x = this.d * Math.sin(this.phi) * Math.cos(this.theta);
  this.camera.position.y = this.d * Math.cos(this.phi);
  this.camera.position.z = this.d * Math.sin(this.phi) * Math.sin(this.theta);
  this.camera.lookAt(this.camera.target);
  return this;
}

// if want to resize the stage size
exports.TestRenderer.prototype.resize = function(width, height) {
  this.width = width;
  this.height = height;
  return this;
};

exports.TestRenderer.prototype.update = function() {
  // if want to rotate camera around origin that is (0, 0, 0)
  this.lon += this.lonstep;
  this.updateCamera();
  return this;
}

exports.TestRenderer.prototype.clear = function() {
  // garbage collection
  var cubes = this.group.children;
  for (var i = 0; i < cubes.length; i++) this.group.remove(cubes[i]);
  this.renderer.render(this.scene, this.camera);
  return this;
};

exports.TestRenderer.prototype.render = function() {
  this.update();
  this.renderer.sortObjects = false;
  this.renderer.setSize(this.width, this.height);
  this.renderer.render(this.scene, this.camera);
  return this;
}

exports.TestRenderer.prototype.saveImage = function() {
  window.open(this.renderer.domElement.toDataURL("image/png"));
};
