var Interpreter = function(context) {
  this.context = context;
  this.maxdepth = 100;
  this.maxobjects = 1000;
  this.minsize = .2;
  this.maxsize = 1.0;
  this.seed = 1; // integer or initial
}

// execute eisenscript
Interpreter.prototype.run = function() {
  var that = this;
  // extends for stacking intermediate product
  this.context = exports._.extend(this.context, { objects: [] }, { products: {
    define: [],
    rules: {},
    computed: []
  }});
  // rewriting
  this.context.ast.forEach(function(statement) {
    switch (statement.type) {
      case Symbol.Define: that.context.products.define.push(statement); break;
      case Symbol.Set: that.context.products.define.push(statement); break;
      case Symbol.Statement: if (statement.computed) that.context.products.computed.push(statement); break;
      case Symbol.Rule: that.rewrite(that.context.products.rules, statement); break;
      default: throw 'Unexpected Statement Error';
    }
  });
  // scanning and create intermediate code
  // promise
  this.context.products.define.forEach(function(statement) {
    switch (statement.type) {
      case Symbol.Set:
        switch (statement.key) {
          case Modifier.Maxdepth: that.maxdepth = statement.value; break;
          case Modifier.Maxobjects: that.maxobjects = statement.value; break;
          case Modifier.Minsize: that.minsize = statement.value; break;
          case Modifier.Maxsize: that.maxsize = statement.value; break;
          case Modifier.Seed: that.seed = statement.value; break;
          case Modifier.Background: that.context.objects.push({ type: Type.Background, color: statement.value }); break;
        }
        break;
      case Symbol.Define:
        // not implemented
        break;
    }
  });
  // execute main
  this.executeStatements(this.context.products.computed);
  return this.context;
}

// rewrite subtree of rules
Interpreter.prototype.rewrite = function(rules, rule) {
  // defined the property if not defined
  if (!rules[rule.id]) rules[rule.id] = [];
  // in order to facilitate the scrutiny
  rule.params.forEach(function(param) {
    if (param.type === Symbol.Modifier) {
      switch (param.key) {
        case Modifier.Weight: rule.weight = param.value; break;
        case Modifier.Maxdepth: rule.maxdepth = param.value; rule.alternate = param.alternate; break;
        default: throw 'Unexpected Modifier Error';
      }
    }
  });
  // rule.params is no more need
  delete rule.params;
  // push for randomly rule select
  rules[rule.id].push(rule);
  return rules;
}

// execute statements
Interpreter.prototype.executeStatements = function(statements) {
  statements.forEach(exports._.bind(this.executeStatement, this));
}

// execute a statement
Interpreter.prototype.executeStatement = function(statement) {
  console.log(statement)
  if (Primitive.indexOf(statement.id) !== -1) {
    this.context.objects.push({
      type: Type.Primitive,
      name: statement.id,
      attr: []
    })
    return;
  }
}

// randomly choose one of rules according to their weights
Interpreter.prototype.sampling = function(func_name) {
  
}