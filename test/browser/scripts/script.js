var container, renderer, objects, n = 0;

function animate() {
  //requestAnimationFrame( animate );
  
  // if rendering one object at a time
  // renderer.build(objects[n]);
  // n++;
  
  // renderer.update();
  renderer.render();
}

$(function() {
  
  // compiling...
  var s = +new Date();
  objects = EISEN.compile($('#eisenscript').text());
  console.log('compile time:', (+new Date() - s) + 'ms');
  
  // rendering...
  var s = +new Date();
  renderer = new EISEN.TestRenderer({
    width: window.innerWidth,
    height: window.innerHeight
  })
  
  // if rendering all objects at a time
  renderer.build(objects);
  
  console.log('render time:', (+new Date() - s) + 'ms');
  
  // appending to body...
  container = document.createElement('div');
  document.body.appendChild(container);
  container.appendChild(renderer.domElement);
  
  // animating...
  animate();
});