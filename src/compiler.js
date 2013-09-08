exports.Compiler = function() {
  
}

exports.Compiler.prototype.compile = function(source) {
  var ast = parser.parse(source);
  return new Interpreter(ast).generate();
}