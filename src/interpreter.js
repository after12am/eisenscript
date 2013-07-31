var Interpreter = function(context) {
  this.context = context;
  this.define = [];
  this.rules = {};
  this.computed = [];
  this.maxdepth = 100;
  this.maxobjects = 1000;
  this.minsize = .2;
  this.maxsize = 1.0;
  this.seed = 1;
  this.matrices = [];
  this.currMatrix = new THREE.Matrix4();
}

Interpreter.prototype.pushMatrix = function() {
  this.matrices.push(this.currMatrix.clone());
}

Interpreter.prototype.popMatrix = function() {
  if (this.matrices.length > 0) this.currMatrix = this.matrices.pop();
}

// execute eisenscript
Interpreter.prototype.generate = function() {
  var that = this;
  
  // initialize parameter
  this.currMatrix.identity();
  
  // extends for stacking intermediate product
  this.context = exports._.extend(this.context, {
    objects: []
  });
  
  // rewriting
  this.context.ast.forEach(function(statement) {
    switch (statement.type) {
      case Symbol.Define: that.define.push(statement); break;
      case Symbol.Set: that.define.push(statement); break;
      case Symbol.Statement: if (statement.computed) that.computed.push(statement); break;
      case Symbol.Rule: that.rewrite(that.rules, statement); break;
      default: throw 'Unexpected Statement Error';
    }
  });
  
  // creating intermediate code...
  // promise
  this.define.forEach(function(statement) {
    switch (statement.type) {
      case Symbol.Set:
        switch (statement.key) {
          case Condition.Maxdepth: that.maxdepth = statement.value; break;
          case Condition.Maxobjects: that.maxobjects = statement.value; break;
          case Condition.Minsize: that.minsize = statement.value; break;
          case Condition.Maxsize: that.maxsize = statement.value; break;
          case Condition.Seed: that.seed = statement.value; break;
          case Condition.Background: that.generateBackground(statement); break;
        }
        break;
      case Symbol.Define:
        // not implemented
        break;
    }
  });
  
  // execute main
  this.parseStatements(this.computed);
  
  // return the context that has objects property as code
  return this.context;
}

// rewrite subtree of rules
Interpreter.prototype.rewrite = function(rules, rule) {
  rule.params.forEach(function(param) {
    if (param.type === Symbol.Modifier) {
      switch (param.key) {
        case Condition.Weight: rule.weight = param.value; break;
        case Condition.Maxdepth: rule.maxdepth = param.value; rule.alternate = param.alternate; break;
        default: throw 'Unexpected Modifier Error';
      }
    }
  });
  if (!rules[rule.id]) rules[rule.id] = [];
  rules[rule.id].push(rule);
  return rules;
}

// execute statements
Interpreter.prototype.parseStatements = function(statements) {
  var i = 0, len = statements.length;
  while (i < len) {
    this.parseStatement(statements[i], 0);
    i++;
  }
}

// execute a statement
Interpreter.prototype.parseStatement = function(statement, index) {
  var expr = statement.exprs[index];
  if (expr) {
    this.pushMatrix();
    for (var i = 0; i < expr.left; i++) {
      this.parseTransformStatement(expr.right);
      this.parseStatement(statement, index + 1);
    }
    this.popMatrix();
    return;
  }
  // end of the nested transformation loops
  this.generatePrimitive(statement);
}

Interpreter.prototype.parseTransformStatement = function(transform) {
  var i = 0, len = transform.properties.length;
  while (i < len) {
    this.parseTransform(transform.properties[i]);
    i++;
  }
}

Interpreter.prototype.parseTransform = function(property) {
  switch (property.key) {
    case Property.Xshift: this.currMatrix.translate({ x:property.value, y:0, z:0 }); break;
    case Property.Yshift: this.currMatrix.translate({ x:0, y:property.value, z:0 }); break;
    case Property.Zshift: this.currMatrix.translate({ x:0, y:0, z:property.value }); break;
  }
}

Interpreter.prototype.generatePrimitive = function(statement) {
  this.context.objects.push({
    type: Type.Primitive,
    name: statement.id,
    matrix: this.currMatrix.clone()
  });
}

Interpreter.prototype.generateBackground = function(statement) {
  this.context.objects.push({
    type: Type.Background,
    color: statement.value
  });
}

// randomly choose one of rules according to their weights
Interpreter.prototype.sampling = function(rule_name) {
  
}