var container, renderer, prod, n = 0;

function animate() {
  //requestAnimationFrame( animate );
  
  // if rendering one object at a time
  // renderer.build(prod.objects[n]);
  // n++;
  
  // renderer.update();
  renderer.render();
  
  setTimeout(animate, 1000 / 30);
}

$(function() {
  
  // compiling...
  var s = +new Date();
  prod = EISEN.compile($('#eisenscript').text());
  console.log('compile time:', (+new Date() - s) + 'ms');
  
  // rendering...
  var s = +new Date();
  renderer = new EISEN.TestRenderer(prod.objects, {
    width: window.innerWidth,
    height: window.innerHeight
  })
  
  // if rendering all objects at a time
  renderer.build(prod.objects);
  
  console.log('render time:', (+new Date() - s) + 'ms');
  
  // appending to body...
  container = document.createElement('div');
  document.body.appendChild(container);
  container.appendChild(renderer.domElement);
  
  // animating...
  animate();
});