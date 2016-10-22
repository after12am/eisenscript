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
  var compiler = new EISEN.Compiler();
  var objectcode;
  try {
    objectCode = compiler.compile($('#eisenscript').text());
    console.log(objectCode);
  } catch (e) {
    console.error(e.message);
    return;
  }

  console.log('compile time:', (+new Date() - s) + 'ms');

  // rendering...
  var s = +new Date();
  renderer = new EISEN.TestRenderer(window.innerWidth, window.innerHeight, {
    materialType: window.navigator.userAgent.match('Chrome') ? 'lambert' : 'basic'
  });



  objectCode.objects.forEach(function(object) {
    switch (object.type) {
      case 'background': renderer.clearColor(object.color); break;
      case 'primitive': renderer.addPrimitive(object); break;
    }
  });

  console.log('render time:', (+new Date() - s) + 'ms');

  // appending to body...
  container = document.createElement('div');
  document.body.appendChild(container);
  container.appendChild(renderer.domElement);

  // animating...
  animate();
});
