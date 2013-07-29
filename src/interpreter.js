var Interpreter = function(code, option) {
  // intermediate code
  this.code = code;
  // rendering engine
  this.renderer = new Renderer(option);
}

Interpreter.prototype.run = function() {
  
}