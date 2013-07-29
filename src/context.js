var Context = function(code, option) {
  this.seed;
  this.code = code;
  this.define = [];
  this.rules = {};
  this.computed = [];
  this.parse();
}

Context.prototype.parse = function() {
  var that = this;
  this.code.forEach(function(statement) {
    switch (statement.type) {
      case Syntax.Define: that.define.push(statement); break;
      case Syntax.Set: that.define.push(statement); break;
      case Syntax.Statement: if (statement.computed) that.computed.push(statement); break;
      case Syntax.Rule: that.register(statement); break;
      default: console.error(statement); throw 'Unexpected Statement Error';
    }
  });
}

// add rule to rules stack object
Context.prototype.register = function(rule) {
  if (!this.rules[rule.id]) this.rules[rule.id] = [];
  // rewrite ast
  rule.params.forEach(function(param) {
    if (param.type === Syntax.Modifier) {
      switch (param.key) {
        case 'weight':
          rule.weight = param.value;
          break;
        case 'maxdepth':
          rule.maxdepth = param.value;
          rule.alternate = param.alternate;
          break;
        default:
          console.error(param);
          throw 'Unexpected Modifier Error';
      }
    }
  });
  delete rule.params;
  this.rules[rule.id].push(rule);
}

// randomly choose one of rules according to their weights
Context.prototype.sampling = function(func_name) {
  
}