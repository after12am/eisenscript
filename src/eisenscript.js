exports.compile = function(option) {
  var ast, objects;
  // parse code, that is text string, and generate ast
  try {
    ast = parser.parse(option.code);
  } catch (e) {
    return {
      error: e.message
    };
  }
  // generate intermediate object code
  objects = new Interpreter(ast).generate();
  // return package of intermediate products
  return {
    ast: ast,
    objects: objects
  }
}