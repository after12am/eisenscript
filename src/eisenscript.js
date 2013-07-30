var eisenscript = {
  option: {
    renderer: 'threejs',
    stageSize: {
      width: 400,
      height: 400
    }
  }
}

exports.compile = function(option) {
  var option = exports._.extend(option || {}, eisenscript.option);
  var error, context = {};
  try {
    context.ast = parser.parse(option.code);
  } catch (e) {
    return {
      error_message: e.message
    };
  }
  // create intermediate code from ast
  context = new Interpreter(context).run();
  // rendering...
  context.renderer = new Renderer(context, option);
  context.renderer.render();
  return context;
}