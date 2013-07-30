var Interpreter = function(ast, option) {
  this.ast = ast;
  this.option = option;
  this.renderer = new Renderer(option);
  this.maxdepth = 100;
  this.maxobjects = 1000;
  this.minsize = .2;
  this.maxsize = 1.0;
  this.seed = 1; // integer or initial
}

Interpreter.prototype.interpret = function() {
  var that = this, define = [], rules = {}, computed = [];
  // create intermediate code in order to facilitate the scrutiny
  this.ast.forEach(function(statement) {
    switch (statement.type) {
      case Symbol.Define: define.push(statement); break;
      case Symbol.Set: define.push(statement); break;
      case Symbol.Statement: if (statement.computed) computed.push(statement); break;
      case Symbol.Rule: rules = that.rewrite(rules, statement); break;
      default: throw 'Unexpected Statement Error';
    }
  });
  // here is the intermediate code
  return {
    define: define,
    rules: rules,
    computed: computed
  };
}

// rewrite subtree of rules
Interpreter.prototype.rewrite = function(rules, rule) {
  // defined the property if not defined
  if (!rules[rule.id]) rules[rule.id] = [];
  // rewrite the subtree related to rule
  rule.params.forEach(function(param) {
    if (param.type === Symbol.Modifier) {
      switch (param.key) {
        case Modifier.Weight: rule.weight = param.value; break;
        case Modifier.Maxdepth: rule.maxdepth = param.value; rule.alternate = param.alternate; break;
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
          // set termination criteria
          case Modifier.Maxdepth: that.maxdepth = statement.value; break;
          case Modifier.Maxobjects: that.maxobjects = statement.value; break;
          case Modifier.Minsize: that.minsize = statement.value; break;
          case Modifier.Maxsize: that.maxsize = statement.value; break;
          // other promise
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