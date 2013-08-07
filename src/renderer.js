exports.TestRenderer = function(option) {
  this.objects = option.objects;
  this.widthidth = option.width;
  this.height = option.height;
  
  this.size = 1;
  this.segments = 40;
  this.rings = 32;
  
  
  
  this.materialType = 'basic';
  this.applyShadow = false;
  this.flipSided = false;
  this.cubes = [];
  this.renderTime = 0;
  
  this.group = new THREE.Object3D();
  this.scene = new THREE.Scene();
  
  // camera
  this.camera = new THREE.PerspectiveCamera(75, this.widthidth / this.height, 1, 1000);
  this.camera.target = new THREE.Vector3(0, 0, 0);
  this.resetCamera();
  
  this.scene.add(this.camera);
  this.scene.add( this.group );
  
  this.cubeGeometry = new THREE.CubeGeometry( this.size, this.size, this.size );
  this.sphereGeometry = new THREE.SphereGeometry( this.size / 2, this.segments, this.rings );
    
  this.renderer = new THREE.WebGLRenderer( { antialias: true });
  this.domElement = this.renderer.domElement;
  
  this.build();
};

exports.TestRenderer.prototype.build = function() {
  if (!this.objects) return;
  // build the object in accordance with design specifications and place on stage
  for (var i = 0, l = this.objects.length; i < l; i++) {
  switch (this.objects[i].type) {
    case Type.Background: this.setBackgroundColor(this.objects[i].color); break;
    case Type.Primitive: this.addPrimitive(this.objects[i]); break;
  }
  }
}

exports.TestRenderer.prototype.setBackgroundColor = function(hex, alpha) {
  alpha = alpha || 1;
  this.renderer.setClearColor( new THREE.Color( hex ), alpha );
};


exports.TestRenderer.prototype.removePrimitives = function() {
  var that = this;
  this.cubes.forEach(function(mesh) { that.group.remove(mesh); });
  this.cubes = [];
};

exports.TestRenderer.prototype.addPrimitive = function(parameters) {
  
  var mesh, material;
  
  switch (this.materialType)
  {
    case 'basic':
      material = new THREE.MeshBasicMaterial(parameters);
      break;
    
    case 'normal':
      material = new THREE.MeshNormalMaterial(parameters);
      break;
      
    case 'phong':
      material = new THREE.MeshPhongMaterial(parameters);
      break;
    
    case 'lambert':
      material = new THREE.MeshLambertMaterial(parameters);
      break;
      
    default:
      throw new Error("'" + materialType + "' is not defined.\nSupported build-in geometry is basic, normal, phong and lambert");
      break;
  }
  
  switch (parameters.name)
  {
    case 'grid':
      parameters.wireframe = true;
      mesh = new THREE.Mesh( this.cubeGeometry, material);
      break;

    case 'box':
      mesh = new THREE.Mesh( this.cubeGeometry, material);
      break;

    case 'sphere':
      mesh = new THREE.Mesh( this.sphereGeometry, material);
      break;

    default:
      throw new Error("'" + parameters.name + "' is not defined.\nSupported build-in geometry is grid, box and sphere");
      break;
  }
  
  mesh.castShadow = this.applyShadow;
  mesh.receiveShadow = this.applyShadow;
  mesh.applyMatrix( parameters.matrix );
  
  this.group.add( mesh );
  this.cubes.push( mesh );
};

exports.TestRenderer.prototype.updateRenderSize = function(w, h) {
  this.widthidth = w;
  this.height = h;
};

exports.TestRenderer.prototype.update = function() {
  
  
  this.lon += this.lonstep;
  this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
  this.phi = ( 90 - this.lat ) * Math.PI / 180;
  this.theta = this.lon * Math.PI / 180;
  
  this.camera.position.x = this.d * Math.sin( this.phi ) * Math.cos( this.theta );
  this.camera.position.y = this.d * Math.cos( this.phi );
  this.camera.position.z = this.d * Math.sin( this.phi ) * Math.sin( this.theta );
  this.camera.lookAt( this.camera.target );
  
}

exports.TestRenderer.prototype.resetCamera = function() {
  // set default value
  this.lon = this.lon || 45;
  this.lonstep = this.lonstep || .5;
  this.lat = this.lat || 45;
  this.phi = this.phi || 0;
  this.theta = this.theta || 0;
  this.d = this.d || 30;
  
  // camera rotates around origin that is point(0, 0, 0)
  this.lat = Math.max(-85, Math.min(85, this.lat));
  this.phi = (90 - this.lat) * Math.PI / 180;
  this.theta = this.lon * Math.PI / 180;
  
  this.camera.position.x = this.d * Math.sin(this.phi) * Math.cos(this.theta);
  this.camera.position.y = this.d * Math.cos(this.phi);
  this.camera.position.z = this.d * Math.sin(this.phi) * Math.sin(this.theta);
  this.camera.lookAt(this.camera.target);
};

exports.TestRenderer.prototype.clear = function() {
  this.removePrimitives();
  this.renderer.render( this.scene, this.camera );
};

exports.TestRenderer.prototype.render = function() {
  
  var s = Date.now();
  this.update();
  this.renderer.shadowCameraFov = this.camera.fov;
  this.renderer.shadowMapBias = 0.0039;
  this.renderer.shadowMapDarkness = 0.5;
  this.renderer.shadowMapWidth = this.renderer.shadowMapHeight = 2048;
  this.renderer.shadowMapEnabled = this.applyShadow;
  this.renderer.shadowMapSoft = this.applyShadow;
  this.renderer.sortObjects = false;
  this.renderer.setSize( this.widthidth, this.height );
  this.renderer.render( this.scene, this.camera );
  this.renderTime = Date.now() - s;
  
  if (this.renderTime > 50) {
    console.log('render time takes ' + this.renderTime + 'ms.');
  }
  return this;
}

exports.TestRenderer.prototype.saveImage = function() {
  window.open(this.renderer.domElement.toDataURL("image/png"));
};
