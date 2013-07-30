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
  var ast, error;
  try {
    ast = parser.parse(option.code);
  } catch (e) {
    return e.message;
  }
  new Interpreter(ast, option).run();
  return exports;
}