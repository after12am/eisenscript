// simple renderer for testing whether it is possible to render correctly from the object code generated by interpreter
exports.TestRenderer = function(option) {
  this.width = option.width || window.innerWidth;
  this.height = option.height || window.innerHeight;
  this.scene = new THREE.Scene();
  this.group = new THREE.Object3D()
  
  // camera
  this.camera = new THREE.PerspectiveCamera(15, this.width / this.height, 1, 2000);
  this.camera.target = new THREE.Vector3(0, 0, 0);
  this.resetCamera().updateCamera();
  
  // geometry
  this.geometry = {
    cube: new THREE.CubeGeometry(1, 1, 1),
    sphere: new THREE.SphereGeometry(.5, 40, 32)
  }
  
  // add to scene
  this.scene.add(this.camera);
  this.scene.add(this.group);
  
  // renderer
  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.domElement = this.renderer.domElement;
  
  this.resize(this.width, this.height);
};

// interpret object code and refresh stage objects
exports.TestRenderer.prototype.build = function(objects) {
  if (objects.constructor === Object) objects = [objects];
  if (objects.constructor === Array) {
    for (var i = 0; i < objects.length; i++) {
      switch (objects[i].type) {
        case Type.Background: this.clearColor(objects[i].color); break;
        case Type.Primitive: this.add(objects[i]); break;
      }
    }
  }
  return this;
};

// repaint background with specific color
exports.TestRenderer.prototype.clearColor = function(hex) {
  this.renderer.setClearColor(new THREE.Color(hex), 1);
  return this;
};

// add any primitive to stage
exports.TestRenderer.prototype.add = function(params) {
  var geometry;
  switch (params.name) {
    case 'box': geometry = this.geometry.cube; break;
    case 'sphere': geometry = this.geometry.sphere; break;
    case 'grid': params.wireframe = true; geometry = this.geometry.cube; break;
  }
  // set transparent for working opacity.
  // see http://stackoverflow.com/questions/14609508/cant-change-opacity-anymore-when-upgrading-from-three-js-r52-to-r55
  params.transparent = true;
  // define primitive
  var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(params));
  mesh.applyMatrix(params.matrix);
  this.group.add(mesh);
  return this;
};

// remove all objects from stage
exports.TestRenderer.prototype.removeAll = function() {
  var boxes = this.group.children;
  for (var i = boxes.length - 1; i >= 0; i--) this.group.remove(boxes[i]);
}

// back to initial state
exports.TestRenderer.prototype.resetCamera = function() {
  this.lon = this.lon || 45;
  this.lonstep = this.lonstep || .5;
  this.lat = this.lat || 45;
  this.phi = this.phi || 0;
  this.theta = this.theta || 0;
  this.d = this.d || 100;
  return this;
};

// camera rotates around origin
exports.TestRenderer.prototype.updateCamera = function() {
  // calculating the position
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

// garbage collection
exports.TestRenderer.prototype.clear = function() {
  this.removeAll();
  this.renderer.render(this.scene, this.camera);
  return this;
};

// if want to resize the stage size
exports.TestRenderer.prototype.resize = function(width, height) {
  this.width = width;
  this.height = height;
  this.camera.aspect = width / height;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(width, height);
  return this;
};

// should call every frame for making the change to objects rendered on stage
exports.TestRenderer.prototype.update = function() {
  // if want to rotate camera around origin that is (0, 0, 0)
  this.lon += this.lonstep;
  this.updateCamera();
  return this;
}

// rendering the scene
exports.TestRenderer.prototype.render = function() {
  this.renderer.sortObjects = false;
  this.renderer.render(this.scene, this.camera);
  return this;
}

// save image rendered on stage with png format
exports.TestRenderer.prototype.saveImage = function() {
  window.open(this.renderer.domElement.toDataURL("image/png"));
  return this;
};