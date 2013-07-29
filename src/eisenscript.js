/*
  compile option
*/
var _option = {
  renderer: 'threejs'
}

/*
  rewrite ast and create intermediate code
*/
exports.compile = function(source, option) {
  var option = exports._.extend(option || {}, _option);
  var code, context, error;
  try {
    code = parser.parse(source);
  } catch (e) {
    error = e.message;
  }
  context = new Context(code, option);
  return {
    code: code || null,
    error: error || null,
    run: new Interpreter(context, {
      renderer: option.renderer
    })
  }
}