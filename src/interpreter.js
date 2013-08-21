// module generate object code from ast
var Interpreter = function(ast) {
  this.ast = ast;
  this.objects = [];
  this.define = [];
  this.rules = {};
  this.computed = [];
  this.maxdepth = 100;
  this.depth = 0;
  this.maxobjects = 1000;
  this.objectnum = 0;
  this.minsize = .2;
  this.maxsize = 1.0;
  this.seed = 'initial'; // integer or 'initial'
  this.stack = [];
  this.currMatrix = new Matrix4().identity();
  this.currHex = Color('#ff0000');
  this.currHsv = _.extend(Color({ hue: 0, saturation: 1, value: 1 }), { computed: false });
  this.currBlend = { color: null, strength: 0, computed: false };
  this.currAlpha = 1;
  this.mt = new MersenneTwister();
}

// termination criteria
Interpreter.prototype.terminated = function() {
  if (this.objectnum > this.maxobjects) return true;
  if (this.depth >= this.maxdepth) return true;
  return false;
}

// stack current transformation state
Interpreter.prototype.pushState = function() {
  this.stack.push({
    matrix: this.currMatrix.clone(),
    hex: this.currHex.clone(),
    hsv: this.currHsv.clone(),
    blend: _.extend({}, this.currBlend),
    alpha: this.currAlpha
  });
}

// pull the parent transformation state
Interpreter.prototype.popState = function() {
  if (this.stack.length === 0) return;
  var state = this.stack.pop();
  this.currMatrix = state.matrix
  this.currHex = state.hex;
  this.currHsv = state.hsv;
  this.currBlend = state.blend;
  this.currAlpha = state.alpha;
}

// execute eisenscript
Interpreter.prototype.generate = function() {
  // rewriting ast
  var that = this;
  this.ast.forEach(function(statement) {
    switch (statement.type) {
      case Symbol.Rule: that.rewriteRule(statement); break;
    }
  });
  
  // pull the defines
  this.ast.forEach(function(statement) {
    switch (statement.type) {
      case Symbol.Define: that.define.push(statement); break;
      case Symbol.Set: that.define.push(statement); break;
      case Symbol.Statement: if (statement.computed) that.computed.push(statement); break;
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
        }
        break;
      case Symbol.Define:
        // not implemented
        break;
    }
  });
  
  // initial value is randomised chosen integer
  this.mt.setSeed(this.seed === 'initial' ? randInt(0, 65535) : this.seed);
  
  // pull the statement of system environment
  this.define.forEach(function(statement) {
    switch (statement.type) {
      case Symbol.Set:
        if (statement.key === Condition.Background) that.generateBackground(statement);
        break;
    }
  });
  
  // execute main
  this.parseStatements(this.computed);
  
  // return the intermediate code
  return this.objects;
}

// rewrite subtree related to rule statement
Interpreter.prototype.rewriteRule = function(rule) {
  rule.params.forEach(function(param) {
    if (param.type === Symbol.Modifier) {
      switch (param.key) {
        case Condition.Weight: rule.weight = param.value; break;
        case Condition.Maxdepth: rule.maxdepth = param.value; rule.alternate = param.alternate; break;
      }
    }
  });
  if (!this.rules[rule.id]) this.rules[rule.id] = [];
  this.rules[rule.id].push(rule);
}

// execute statements
Interpreter.prototype.parseStatements = function(statements) {
  var i = 0, len = statements.length;
  while (i < len) {
    if (this.terminated()) break;
    this.parseStatement(statements[i], 0);
    i++;
  }
}

// execute a statement
Interpreter.prototype.parseStatement = function(statement, index) {
  // parse transformation expression
  var expr = statement.exprs[index];
  if (expr) {
    this.depth++;
    this.pushState();
    for (var i = 0; i < expr.left; i++) {
      if (this.terminated()) break;
      this.parseTransformStatement(expr.right);
      // if statement.exprs[index + 1] is undefined, it would break the transformation loops.
      this.parseStatement(statement, index + 1);
    }
    this.popState();
    this.depth--;
    return;
  }
  // if not primitive, call rule and parse next transformation loops
  if (_.values(Primitive).indexOf(statement.id) === -1) {
    var rule = this.sampling(statement.id);
    if (rule) this.parseStatements(rule.body);
    return;
  }
  // achieve the end of nested transformation loops
  this.generatePrimitive(statement);
}

// break down transformation set
Interpreter.prototype.parseTransformStatement = function(transform) {
  var i = 0, len = transform.properties.length;
  while (i < len) {
    this.parseTransform(transform.properties[i]);
    i++;
  }
}

// parse transformation property
Interpreter.prototype.parseTransform = function(property) {
  var k = property.key, v = property.value;
  switch (k) {
    case Property.XShift:
      this.currMatrix.translate({ x:v, y:0, z:0 });
      break;
    case Property.YShift:
      this.currMatrix.translate({ x:0, y:v, z:0 });
      break;
    case Property.ZShift:
      this.currMatrix.translate({ x:0, y:0, z:v });
      break;
    case Property.RotateX:
      this.currMatrix.rotateX(degToRad(v));
      break;
    case Property.RotateY:
      this.currMatrix.rotateY(degToRad(v));
      break;
    case Property.RotateZ:
      this.currMatrix.rotateZ(degToRad(v));
      break;
    case Property.Size:
      this.currMatrix.scale({ x:v[0], y:v[1], z:v[2] });
      break;
    case Property.Matrix:
      // make 3x3 rotation matrix to 4x4 matrix
      // test: { m 1 0 0 0 .53 -.85 0 .85 .53 } box
      this.currMatrix.set(
        v[0], v[1], v[2], 0, 
        v[3], v[4], v[5], 0, 
        v[6], v[7], v[8], 0,
           0,    0,    0, 1
      );
      break;
    case Property.Color:
      var hex = v;
      if (hex === 'random') hex = sprintf('#%06s', Math.floor(this.mt.next() * 0xFFFFFF).toString(16));
      this.currHex = Color(hex);
      break;
    case Property.Hue:
      this.currHsv.computed = true;
      this.currHsv.hue += v % 360;
      break;
    case Property.Saturation:
      this.currHsv.computed = true;
      this.currHsv.saturation = clamp(this.currHsv.saturation * v, 0, 1);
      break;
    case Property.Brightness:
      this.currHsv.computed = true;
      this.currHsv.value = clamp(this.currHsv.value * v, 0, 1);;
      break;
    case Property.Blend:
      this.currBlend.computed = true;
      this.currBlend.color = property.color;
      this.currBlend.strength = this.currBlend.strength + clamp(property.strength, 0, 1);
      break;
    case Property.Alpha:
      this.currAlpha *= v;
      break;
  }
}

// create primitive object and stack it as intermediate code for renderer
Interpreter.prototype.generatePrimitive = function(statement) {
  // if achieved maxobjects
  this.objectnum++;
  if (this.terminated()) return;
  
  // blend the current color with the specified color
  if (this.currBlend.computed) {
    this.currHex = this.currHex.toHSV();
    var blend = Color(this.currBlend.color).toHSV();
    this.currHex.hue += (blend.hue - this.currHex.hue) * this.currBlend.strength / 6;
    this.currHex.hue %= 360;
  }
  
  // primitive object
  this.objects.push({
    type: Type.Primitive,
    name: statement.id,
    matrix: this.currMatrix.clone(),
    color: this.currHsv.computed ? this.currHex.blend(this.currHsv, 1).toCSS() : this.currHex.toCSS(),
    opacity: this.currAlpha
  });
}

// create background object code and stack it as intermediate code for renderer
Interpreter.prototype.generateBackground = function(statement) {
  this.objects.push({
    type: Type.Background,
    color: statement.value
  });
}

// randomly choose one of the rules according to their weights
Interpreter.prototype.sampling = function(name, retry) {
  if (!this.rules[name]) {
    // it is better to be reported with profiler or logger
    console.warn('eisenscript: undefined rule');
    return;
  }
  
  // sum weights of each rules
  var sum = 0;
  this.rules[name].forEach(function(rule) {
    rule.weight = rule.weight || 1;
    sum += rule.weight;
  });
  
  // choosing...
  var rand = this.mt.next() * sum;
  var chosen;
  for (var i = 0; i < this.rules[name].length; i++) {
    var rule = this.rules[name][i];
    if (rule.weight - rand < 0) {
      rand -= rule.weight
      continue;
    }
    chosen = rule;
    break;
  }
  
  // if rule could not be selected, interpreter tries to choose until 3 times
  if (!chosen) {
    retry = retry || 0;
    if (retry < 3) return this.sampling(name, ++retry);
    // if achieve max retry count
    return;
  }
  
  // if achieved maxdepth
  chosen.depth = (chosen.depth || 0) + 1;
  if (chosen.maxdepth && chosen.maxdepth < chosen.depth) {
    if (chosen.alternate) return this.sampling(chosen.alternate);
    return;
  }
  
  // the rule randomly chosen
  return chosen;
}