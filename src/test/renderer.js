
const Primitive = require('../primitive');
const Material = require('./material');
const Geometry = require('./geometry');
const { degToRad, clamp } = require('../math');

// TODO: kick out from eisenscript.
// simple renderer for testing whether it is possible to render correctly from the object code generated by interpreter
var TestRenderer = function(width, height, options) {
  this.name = 'TestRenderer';
  this.width = width;
  this.height = height;
  this.materialType = options.materialType || 'basic';
  this.scene = new THREE.Scene();
  this.group = new THREE.Object3D();
  this.camera = new THREE.PerspectiveCamera(15, this.width / this.height, 1, 2000);
  this.camera.target = new THREE.Vector3(0, 0, 0);
  this.resetCamera().updateCamera();

  this.lights = [
    new THREE.SpotLight(0xff170f, 1),
    new THREE.SpotLight(0xffcf0f, 1)
  ];

  this.lights[0].position.set(0, 500, 2000);
  this.lights[0].castShadow = true;
  this.lights[1].position.set(0, -400, -1800);
  this.lights[1].castShadow = true;

  this.scene.add(this.camera);
  this.scene.add(this.group);
  this.scene.add(this.lights[0]);
  this.scene.add(this.lights[1]);

  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.domElement = this.renderer.domElement;
  this.resize(this.width, this.height);
};

// repaint background with specific color
TestRenderer.prototype.clearColor = function(hex) {
  this.renderer.setClearColor(new THREE.Color(hex), 1);
  return this;
};

// add any primitive to stage
TestRenderer.prototype.addPrimitive = function(parameters) {
  var geometry = new Geometry(parameters.name);
  var material = new Material({
    type: this.materialType,
    color: parameters.color,
    opacity: parameters.opacity,
    transparent: true,
    wireframe: !!(parameters.name === Primitive.Grid)
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.applyMatrix(parameters.matrix);
  this.group.add(mesh);
  return this;
};

// remove all objects from stage
TestRenderer.prototype.removeAll = function() {
  var boxes = this.group.children;
  for (var i = boxes.length - 1; i >= 0; i--) this.group.remove(boxes[i]);
  return this;
}

// back to initial state
TestRenderer.prototype.resetCamera = function() {
  this.lon = this.lon || 45;
  this.lonstep = this.lonstep || .5;
  this.lat = this.lat || 45;
  this.phi = this.phi || 0;
  this.theta = this.theta || 0;
  this.d = this.d || 100;
  return this;
};

// update camera position around origin
TestRenderer.prototype.updateCamera = function() {
  this.lat = clamp(this.lat, -85, 85);
  this.phi = degToRad(90 - this.lat);
  this.theta = degToRad(this.lon);
  this.camera.position.x = this.d * Math.sin(this.phi) * Math.cos(this.theta);
  this.camera.position.y = this.d * Math.cos(this.phi);
  this.camera.position.z = this.d * Math.sin(this.phi) * Math.sin(this.theta);
  this.camera.lookAt(this.camera.target);
  return this;
}

// garbage collection
TestRenderer.prototype.clear = function() {
  this.removeAll();
  this.renderer.render(this.scene, this.camera);
  return this;
};

// if want to resize the stage size
TestRenderer.prototype.resize = function(width, height) {
  this.width = width;
  this.height = height;
  this.camera.aspect = width / height;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(width, height);
  return this;
};

// should call every frame for making the change to objects rendered on stage
// if want to rotate camera around origin that is (0, 0, 0)
TestRenderer.prototype.update = function() {
  this.lon += this.lonstep;
  this.updateCamera();
  return this;
}

// rendering the scene
TestRenderer.prototype.render = function() {
  this.renderer.sortObjects = false;
  this.renderer.shadowCameraFov = this.camera.fov;
  this.renderer.render(this.scene, this.camera);
  return this;
}

TestRenderer.prototype.toDataURL = function(format) {
  var dom = this.renderer.domElement;
  switch (format) {
    case 'jpg':
    case 'jpeg': return dom.toDataURL("image/jpeg");
    case 'gif': return dom.toDataURL("image/gif");
    default: return dom.toDataURL("image/png");
  }
}

// save image rendered on stage with png format
TestRenderer.prototype.save = function(format) {
  window.open(this.toDataURL(format));
  return this;
};

module.exports = TestRenderer;
