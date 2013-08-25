exports.compile = function(code) {
  var ast, objects;
  try {
    // parse code, that is text string, and generate ast
    ast = parser.parse(code);
    // generate intermediate object code
    objects = new Interpreter(ast).generate();
  } catch (e) {
    return {
      error: e.message
    };
  }
  // return package of intermediate products
  return objects
}