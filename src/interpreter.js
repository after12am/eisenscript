var Interpreter = function(context, option) {
  // intermediate code
  this.context = context;
  this.option = option;
  // rendering engine
  this.renderer = new Renderer(option);
}

Interpreter.prototype.run = function() {
  
}