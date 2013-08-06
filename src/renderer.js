exports.TestRenderer = function(option) {
  this.objects = option.objects;
  this.widthidth = option.width;
  this.height = option.height;
  
  this.fov = 75;
  this.near = 1;
  this.far = 1000;
  this.size = 1;
  this.segments = 40;
  this.rings = 32;
  this.lon = 45;
  this.lonstep = .5;
  
  this.lat = 45;
  this.phi = 0;
  this.theta = 0;
  this.d = 30;
  
  this.materialType = 'basic';
  this.applyShadow = false;
  this.flipSided = false;
  this.space = null;
  this.cubes = [];
  this.cameraTarget = new THREE.Vector3( 0, 0, 0 );
  this.renderTime = 0;
  
  this.group = new THREE.Object3D();
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( this.fov, this.widthidth / this.height, this.near, this.far );
  this.camera.target = this.cameraTarget;
  
  this.scene.add( this.camera );
  this.scene.add( this.group );
  
  this.cubeGeometry = new THREE.CubeGeometry( this.size, this.size, this.size );
  this.sphereGeometry = new THREE.SphereGeometry( this.size / 2, this.segments, this.rings );
  
  this.light1 = new THREE.SpotLight( 0xff170f, 1 );//Math.random() * 0xffffff, 2 );
  this.light1.position.set( 0, 500, 2000 );
  this.scene.add( this.light1 );
  
  this.light2 = new THREE.SpotLight( 0xffcf0f, 1 );//Math.random() * 0xffffff, 2 );
  this.light2.position.set( 0, -400, -1800 );
  this.scene.add( this.light2 );
  
  this.scene.add( this.space = new THREE.Mesh(
    new THREE.SphereGeometry( 1000, this.segments, this.rings ), 
    new THREE.MeshLambertMaterial( { color: 0xffffff } ) 
  ));
  
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
  
  this.light1.castShadow = this.applyShadow;
  this.light2.castShadow = this.applyShadow;
  
  this.space.flipSided = this.flipSided;
  this.space.receiveShadow = this.applyShadow;
  
  this.lon += this.lonstep;
  this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
  this.phi = ( 90 - this.lat ) * Math.PI / 180;
  this.theta = this.lon * Math.PI / 180;
  
  this.camera.position.x = this.d * Math.sin( this.phi ) * Math.cos( this.theta );
  this.camera.position.y = this.d * Math.cos( this.phi );
  this.camera.position.z = this.d * Math.sin( this.phi ) * Math.sin( this.theta );
  this.camera.lookAt( this.camera.target );
  //this.camera.projectionMatrix = THREE.Matrix4.makePerspective( this.fov, this.widthidth / this.height, 1, 3000 );
  
  //if (this.isAnimate) {
    var dt = new Date();
    var dl = 400;
    var t = .0003 * dt.getTime();
    this.light1.position.set( this.camera.position.x, this.camera.position.y + 50, this.camera.position.z );
    
    var t = .00025 * dt.getTime();
    this.light2.position.set( dl * Math.sin( t ) * Math.cos( t ), dl * Math.sin( t ), dl * Math.cos( t ) );
  //}
}

exports.TestRenderer.prototype.resetCamera = function() {
  
  this.lon = 45;
  this.lonstep = .5;
  this.lat = 45;
  this.phi = 0;
  this.theta = 0;
  this.d = 10;
  
  this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
  this.phi = ( 90 - this.lat ) * Math.PI / 180;
  this.theta = this.lon * Math.PI / 180;
  
  this.camera.position.x = this.d * Math.sin( this.phi ) * Math.cos( this.theta );
  this.camera.position.y = this.d * Math.cos( this.phi );
  this.camera.position.z = this.d * Math.sin( this.phi ) * Math.sin( this.theta );
  this.camera.lookAt( this.camera.target );
  //this.camera.projectionMatrix = THREE.Matrix4.makePerspective( this.fov, this.widthidth / this.height, 1, 3000 );
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
