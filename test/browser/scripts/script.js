$(function() {
  
  var container = document.createElement('div');
  var renderer = new es.Renderer();
  
  document.body.appendChild(container);
  container.appendChild(renderer.domElement);
  
  var product = es.compile({
    code: $('#eisenscript').text(),
    renderer: renderer,
  });
  
  function animate() {
    requestAnimationFrame( animate );
    renderer.render();
  }
  
  animate();
})