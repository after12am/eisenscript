var scene, camera, renderer, group;

function render() {
  requestAnimationFrame( render );

  group.rotation.x += 0.005;
  group.rotation.y += 0.005;

  renderer.render( scene, camera );
};

function createGeometry(type) {
  switch (type) {
    case 'box': return new THREE.BoxBufferGeometry(1, 1, 1);
    // TODO https://threejs.org/docs/#api/en/geometries/WireframeGeometry
    case 'grid': return new THREE.BoxBufferGeometry(1, 1, 1);
    case 'sphere': return new THREE.SphereBufferGeometry(.5, 32, 32);
    case 'line':
      var points = [];
      points.push( new THREE.Vector3(-.5, 0, 0 ));
      points.push( new THREE.Vector3( .5, 0, 0 ));
      return new THREE.BufferGeometry().setFromPoints(points);
    case 'point':
        console.warn("point is not implemented yet"); return;
    case 'mesh': console.warn("mesh is not implemented yet"); return;
    case 'cylinder': return new THREE.CylinderBufferGeometry(.5, .5, 1, 32);
    case 'tube': console.warn("tube is not implemented yet"); return;
    case 'triangle': console.warn("triangle is not implemented yet"); return;
    case 'squash':
      var geometry = new THREE.SphereBufferGeometry(.5, 32, 32);
      geometry.scale(1, .5, 1);
      return geometry;
  }
}

function applyVertexColors(geometry, color) {
  var position = geometry.attributes.position;
  var colors = [];

  for ( var i = 0; i < position.count; i ++ ) {
    colors.push(color.r, color.g, color.b, -100);
  }

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
}

function init(objectCode) {

  ///////////////////////////////
  // SCENE
  ///////////////////////////////
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x444444);


  ///////////////////////////////
  // CAMERA
  ///////////////////////////////
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100000);
  camera.position.z = 10;


  ///////////////////////////////
  // RENDERER
  ///////////////////////////////
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  ///////////////////////////////
  // CONTROLLER
  ///////////////////////////////
  var orbit = new THREE.OrbitControls(camera, renderer.domElement);


  ///////////////////////////////
  // LIGHT
  ///////////////////////////////
  var lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1, 0);
  lights[1] = new THREE.PointLight(0xffffff, 1, 0);
  lights[2] = new THREE.PointLight(0xffffff, 1, 0);

  lights[0].position.set(0, 200, 0);
  lights[1].position.set(100, 200, 100);
  lights[2].position.set(- 100, - 200, - 100);

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);

  var light = new THREE.SpotLight( 0xffffff, .5 );
  light.position.set(0, 500, 2000);
  // scene.add( light );

  ///////////////////////////////
  // PRIMITIVE
  ///////////////////////////////
  group = new THREE.Group();
  scene.add(group);

  var geometries = [];

  objectCode.objects.forEach(function(object) {
    switch (object.type) {
      case 'background':
        scene.background = new THREE.Color(object.color);
        break;
      case 'primitive':
        const geometry = createGeometry(object.name);
        const matrix = new THREE.Matrix4();
        matrix.fromArray(object.matrix.elements)
        geometry.applyMatrix(matrix);

        var meshMaterial = new THREE.MeshPhongMaterial({
          color: parseInt(object.color.replace(/^#/, '0x'), 16),
          specular: 0x999999,
          shininess: 30,
          flatShading: true,
          shininess: 0,
          opacity: object.opacity,
          transparent: true
        });

        if (object.name === 'grid') {
          meshMaterial.wireframe = true
        }

        if (object.name === 'line') {
          group.add(new THREE.Line( geometry, meshMaterial ));
        } else {
          group.add(new THREE.Mesh(geometry, meshMaterial));
        }



        // if not using opacity at all, use this
        // // change hex color format to 0xFF7733 from #FF7733
        // const color = new THREE.Color();
        // applyVertexColors(geometry, color.setHex(object.color.replace(/^#/, '0x')));
        // geometries.push(geometry);
        break;
    }
  });

  // var defaultMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, flatShading: true, vertexColors: true, emissive: 0x072534, transparent: true, opacity: 1});
  // group.add(new THREE.Mesh(THREE.BufferGeometryUtils.mergeBufferGeometries(geometries), defaultMaterial));
}



window.addEventListener('resize', function() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}, false);
