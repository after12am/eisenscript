var Renderer = function(option) {
  switch (option.renderer) {
    case 'threejs':
    default: return new ThreeRenderer();
  }
}