var ThreeRenderer = function(context, option) {
  
  var container = document.createElement('div');
  document.body.appendChild(container);
  
  this.renderer = new THREE.CanvasRenderer();
  this.scene = new THREE.Scene();
  
  var pos = 20;
  this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  this.camera.position.set(pos, pos, pos);
  this.camera.lookAt( this.scene.position );
  
  
  // Grid
  
  var size = 1000, step = 10;
  
  var geometry = new THREE.Geometry();
  
  for ( var i = - size; i <= size; i += step ) {
    geometry.vertices.push( new THREE.Vector3( - size, - 100, i ) );
    geometry.vertices.push( new THREE.Vector3(   size, - 100, i ) );
    geometry.vertices.push( new THREE.Vector3( i, - 100, - size ) );
    geometry.vertices.push( new THREE.Vector3( i, - 100,   size ) );
  }
  
  var material = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.2 } );
  var line = new THREE.Line(geometry, material);
  line.type = THREE.LinePieces;
  this.scene.add( line );
  
  
  // CREATE OBJECT
  
  var objects = context.objects;
  for (var i = 0, l = objects.length; i < l; i++) {
    switch (objects[i].type) {
      case Type.Background: this.setBackground(objects[i].color); break;
      case Type.Primitive: this.setPrimitive(objects[i]); break;
    }
  }
  
  
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(this.renderer.domElement);
}

ThreeRenderer.prototype.setBackground = function(hex, alpha) {
  alpha = alpha || 1;
  this.renderer.setClearColor( new THREE.Color( hex ), alpha );
}

ThreeRenderer.prototype.setPrimitive = function(primitive) {
  var mat = new THREE.MeshLambertMaterial({
    color: primitive.color,
    shading: THREE.FlatShading,
    side: THREE.DoubleSide,
    overdraw: true,
    opacity: primitive.opacity
  });
  
  var box = new THREE.Mesh(
    new THREE.CubeGeometry(1, 1, 1),
    mat
  );
  box.applyMatrix(primitive.matrix);
  
  this.scene.add( box );
}

ThreeRenderer.prototype.render = function() {
  this.renderer.render(this.scene, this.camera);
}