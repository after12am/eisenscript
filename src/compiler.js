exports.Compiler = function() {
  this.interpreter = undefined;
}

exports.Compiler.prototype.compile = function(source) {
  this.interpreter = new Interpreter();
  return this.interpreter.generate(this.parse(source));
}

exports.Compiler.prototype.parse = function(source) {
  return parser.parse(source);
}