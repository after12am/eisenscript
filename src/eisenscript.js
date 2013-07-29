/*
  compile option
*/
exports.option = {
  renderer: 'threejs'
}

/*
  rewrite ast and create intermediate code
*/
exports.compile = function(source) {
  var code = null, error = null;
  try {
    code = codegen(parser.parse(source));
  } catch (e) {
    error = e.message;
  }
  return {
    code: code,
    error: error,
    run: new Interpreter(code, {
      renderer: exports.option.renderer
    })
  }
}

/*
  execute eisenscript
*/
exports.interpret = exports.run = function(code) {
  new Interpreter(code, {
    renderer: exports.option.renderer
  }).run();
}