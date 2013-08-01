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
      case Symbol.Rule:
        var rule = that.rewrite(statement); break;
        if (!that.rules[rule.id]) that.rules[rule.id] = [];
        that.rules[rule.id].push(rule);
        break;
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
Interpreter.prototype.rewrite = function(rule) {
  rule.params.forEach(function(param) {
    if (param.type === Symbol.Modifier) {
      switch (param.key) {
        case Condition.Weight: rule.weight = param.value; break;
        case Condition.Maxdepth: rule.maxdepth = param.value; rule.alternate = param.alternate; break;
      }
    }
  });
  return rule;
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
  // achieve the end of nested transformation loops
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
  var k = property.key, v = property.value;
  switch (k) {
    case Property.XShift: this.currMatrix.translate({ x:v, y:0, z:0 }); break;
    case Property.YShift: this.currMatrix.translate({ x:0, y:v, z:0 }); break;
    case Property.ZShift: this.currMatrix.translate({ x:0, y:0, z:v }); break;
    case Property.RotateX: this.currMatrix.rotateByAxis({ x:1, y:0, z:0 }, degToRad(v)); break;
    case Property.RotateY: this.currMatrix.rotateByAxis({ x:0, y:1, z:0 }, degToRad(v)); break;
    case Property.RotateZ: this.currMatrix.rotateByAxis({ x:0, y:0, z:1 }, degToRad(v)); break;
    case Property.Size: this.currMatrix.scale({ x:v[0], y:v[1], z:v[2] }); break;
    case Property.Matrix: /* not implemented */ break;
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