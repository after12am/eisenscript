var container, renderer, prod;

function animate() {
  //requestAnimationFrame( animate );
  renderer.render();
}

$(function() {
  
  // compiling...
  var s = +new Date();
  prod = es.compile($('#eisenscript').text());
  console.log('compile time:', (+new Date() - s) + 'ms');
  
  // rendering...
  var s = +new Date();
  renderer = new es.TestRenderer(prod.objects, {
    width: window.innerWidth,
    height: window.innerHeight
  }).render();
  console.log('render time:', (+new Date() - s) + 'ms');
  
  // appending to body...
  container = document.createElement('div');
  document.body.appendChild(container);
  container.appendChild(renderer.domElement);
  
  // animating...
  animate();
});