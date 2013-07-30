var Interpreter = function(ast, option) {
  this.ast = ast;
  this.option = option;
  this.renderer = new Renderer(option);
  this.maxdepth = 100;
  this.maxobjects = 1000;
  this.minsize = .2;
  this.maxsize = 1.0;
  this.seed = 1; // integer or inital
}

Interpreter.prototype.interpret = function() {
  var that = this, define = [], rules = {}, computed = [];
  this.ast.forEach(function(statement) {
    switch (statement.type) {
      case Symbol.Define: define.push(statement); return;
      case Symbol.Set: define.push(statement); return;
      case Symbol.Statement: if (statement.computed) computed.push(statement); return;
      case Symbol.Rule: rules = that.rewriteRule(rules, statement); return;
      default: throw 'Unexpected Statement Error';
    }
  });
  return {
    define: define,
    rules: rules,
    computed: computed
  };
}

// add rule to rules stack object
Interpreter.prototype.rewriteRule = function(rules, rule) {
  if (!rules[rule.id]) rules[rule.id] = [];
  // rewrite abstract syntax tree
  rule.params.forEach(function(param) {
    if (param.type === Symbol.Modifier) {
      switch (param.key) {
        case Modifier.Weight: rule.weight = param.value; return;
        case Modifier.Maxdepth:
          rule.maxdepth = param.value;
          rule.alternate = param.alternate;
          return;
        default: throw 'Unexpected Modifier Error';
      }
    }
  });
  // no more need
  delete rule.params;
  // push array for randomly rule select
  rules[rule.id].push(rule);
  return rules;
}

Interpreter.prototype.run = function() {
  var that = this, code = this.interpret();
  // promise
  code.define.forEach(function(statement) {
    switch (statement.type) {
      case Symbol.Set:
        switch (statement.key) {
          case Modifier.Maxdepth: that.maxdepth = statement.value; break;
          case Modifier.Maxobjects: that.maxobjects = statement.value; break;
          case Modifier.Minsize: that.minsize = statement.value; break;
          case Modifier.Maxsize: that.maxsize = statement.value; break;
          case Modifier.Seed: that.seed = statement.value; break;
          case Modifier.Background: that.renderer.setBackground(statement.value); break;
        }
        break;
      case Symbol.Define:
        // not implemented
        break;
    }
  });
  // execute main statements
  code.computed.forEach(exports._.bind(this.executeStatement, this));
  // rendering...
  this.renderer.render();
}

Interpreter.prototype.executeStatement = function(statement) {
  console.log(statement)
}

// randomly choose one of rules according to their weights
Interpreter.prototype.sampling = function(func_name) {
  
}