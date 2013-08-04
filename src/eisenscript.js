exports.compile = function(option) {
  var ast, objects;
  
  // parse code, that is text string, and generate ast
  var s = +new Date();
  try {
    ast = parser.parse(option.code);
  } catch (e) {
    return {
      error: e.message
    };
  }
  // generate intermediate code
  objects = new Interpreter(ast).generate();
  console.log('compile time:', (+new Date() - s) + 'ms');
  
  var s = +new Date();
  // build and rendering...
  option.renderer.build(objects);
  option.renderer.render();
  console.log('render time:', (+new Date() - s) + 'ms');
}