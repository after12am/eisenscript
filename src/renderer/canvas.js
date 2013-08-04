var CanvasRenderer = function() {
  this.scene = new THREE.Scene();
  
  // renderer
  this.renderer = new THREE.CanvasRenderer();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.domElement = this.renderer.domElement;
  
  // camera
  this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  this.camera.position.set(20, 20, 20);
  this.camera.lookAt(this.scene.position);
  
  
  // Grid
  
  // var size = 1000, step = 10;
  // 
  // var geometry = new THREE.Geometry();
  // 
  // for ( var i = - size; i <= size; i += step ) {
  //   geometry.vertices.push( new THREE.Vector3( - size, - 100, i ) );
  //   geometry.vertices.push( new THREE.Vector3(   size, - 100, i ) );
  //   geometry.vertices.push( new THREE.Vector3( i, - 100, - size ) );
  //   geometry.vertices.push( new THREE.Vector3( i, - 100,   size ) );
  // }
  // 
  // var material = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.2 } );
  // var line = new THREE.Line(geometry, material);
  // line.type = THREE.LinePieces;
  // this.scene.add( line );
}

CanvasRenderer.prototype.build = function(objects) {
  if (!objects) return;
  // build the object in accordance with design specifications and place on stage
  for (var i = 0, l = objects.length; i < l; i++) {
    switch (objects[i].type) {
      case Type.Background: this.background(objects[i].color); break;
      case Type.Primitive: this.primitive(objects[i]); break;
    }
  }
}

// set background
CanvasRenderer.prototype.background = function(hex, alpha) {
  alpha = alpha || 1;
  this.renderer.setClearColor(new THREE.Color(hex), alpha);
}

// add primitive
CanvasRenderer.prototype.primitive = function(primitive) {
  // material definition
  var mat = new THREE.MeshLambertMaterial({
    color: primitive.color,
    shading: THREE.FlatShading,
    side: THREE.DoubleSide,
    overdraw: true,
    opacity: primitive.opacity
  });
  
  // geometry definition
  var box = new THREE.Mesh(
    new THREE.CubeGeometry(1, 1, 1),
    mat
  );
  box.applyMatrix(primitive.matrix);
  
  // add to stage
  this.scene.add(box);
}

CanvasRenderer.prototype.render = function() {
  this.renderer.render(this.scene, this.camera);
}