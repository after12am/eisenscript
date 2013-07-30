var Renderer = function(context, option) {
  option = option || {};
  switch (option.renderer) {
    case 'threejs':
    default: return new ThreeRenderer(context, option);
  }
}