var Renderer = function(option) {
  option = option || {};
  switch (option.renderer) {
    case 'threejs':
    default: return new ThreeRenderer(option);
  }
}