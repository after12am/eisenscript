'use strict';

const Symbol = require('./symbol');
const Color = require('color-js');
const Matrix4 = require('./matrix');
const Type = require('./type');
const Primitive = require('./primitive');
const _ = require('./_');
const MersenneTwister = require('./mt');
const sprintf = require('./sprintf');
const { degToRad, randInt, clamp } = require('./math');

// module generate object code from ast
var Interpreter = function() {
  this.name = 'Interpreter';
  this.objects = [];
  this.define = [];
  this.rules = {};
  this.computed = [];
  this.maxdepth = 1000;
  this.depth = 0;
  this.maxobjects = 1000;
  this.objectnum = 0;
  this.minsize = .2;
  this.maxsize = 1.0;
  this.seed = 'initial'; // integer or 'initial'
  this.stack = [];
  this.curr = {};
  this.curr.matrix = new Matrix4();
  this.curr.hex = Color('#ff0000');
  this.curr.hsv = _.extend(Color({ hue: 0, saturation: 1, value: 1 }), { computed: false });
  this.curr.blend = { color: null, strength: 0, computed: false };
  this.curr.alpha = 1;
  this.mt = new MersenneTwister();
}

// termination criteria
Interpreter.prototype.terminated = function() {
  if (this.objectnum > this.maxobjects) return true;
  if (this.depth > this.maxdepth) return true;
  return false;
}

// stack current transformation state
Interpreter.prototype.pushState = function() {
  this.depth++;
  this.stack.push({
    matrix: this.curr.matrix.clone(),
    hex: this.curr.hex.clone(),
    hsv: this.curr.hsv.clone(),
    blend: _.extend({}, this.curr.blend),
    alpha: this.curr.alpha
  });
  return this;
}

// pull the parent transformation state
Interpreter.prototype.popState = function() {
  if (this.stack.length > 0) {
    this.curr = this.stack.pop();
    this.depth--;
  }
  return this;
}

Interpreter.prototype.translate = function(x, y, z) {
  this.curr.matrix.translate({
    x: x,
    y: y,
    z: z
  });
  return this;
}

Interpreter.prototype.rotateX = function(angle) {
  this.curr.matrix.rotateX(angle);
  return this;
}

Interpreter.prototype.rotateY = function(angle) {
  this.curr.matrix.rotateY(angle);
  return this;
}

Interpreter.prototype.rotateZ = function(angle) {
  this.curr.matrix.rotateZ(angle);
  return this;
}

Interpreter.prototype.scale = function(x, y, z) {
  this.curr.matrix.scale({
    x: x,
    y: y,
    z: z
  });
  return this;
}

// make 3x3 rotation matrix to 4x4 matrix
// test: { m 1 0 0 0 .53 -.85 0 .85 .53 } box
Interpreter.prototype.matrix = function(v) {
  this.curr.matrix.set(
    v[0], v[1], v[2], 0,
    v[3], v[4], v[5], 0,
    v[6], v[7], v[8], 0,
       0,    0,    0, 1
  );
  return this;
}

Interpreter.prototype.random16 = function() {
  var rand = this.mt.next() * 0xffffff;
  return Math.floor(rand).toString(16);
}

Interpreter.prototype.randomColor = function() {
  return sprintf('#%s', this.random16());
}

Interpreter.prototype.setColor = function(color) {
  if (color === 'random') color = this.randomColor();
  this.curr.hex = Color(color);
  return this;
}

Interpreter.prototype.setHue = function(v) {
  this.curr.hsv.computed = true;
  this.curr.hsv.hue += v % 360;
  return this;
}

Interpreter.prototype.setSaturation = function(v) {
  this.curr.hsv.computed = true;
  this.curr.hsv.saturation = clamp(this.curr.hsv.saturation * v, 0, 1);
  return this;
}

Interpreter.prototype.setBrightness = function(v) {
  this.curr.hsv.computed = true;
  this.curr.hsv.value = clamp(this.curr.hsv.value * v, 0, 1);
  return this;
}

Interpreter.prototype.setBlend = function(color, strength) {
  this.curr.blend.computed = true;
  this.curr.blend.color = color;
  this.curr.blend.strength = this.curr.blend.strength + clamp(strength, 0, 1);
  return this;
}

// execute eisenscript
Interpreter.prototype.generate = function(ast) {
  // rewriting ast
  var that = this;
  ast.forEach(function(statement) {
    switch (statement.type) {
      case Symbol.Rule: that.rewriteRule(statement); break;
    }
  });

  // pull the defines
  ast.forEach(function(statement) {
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
          case Symbol.Maxdepth: that.maxdepth = statement.value; break;
          case Symbol.Maxobjects: that.maxobjects = statement.value; break;
          case Symbol.Minsize: that.minsize = statement.value; break;
          case Symbol.Maxsize: that.maxsize = statement.value; break;
          case Symbol.Seed: that.seed = statement.value; break;
        }
        break;
      case Symbol.Define:
        // not implemented, but I don't think the definition statement is need.
        break;
    }
  });

  // initial value is randomised chosen integer
  this.mt.setSeed(this.seed === 'initial' ? randInt(0, 65535) : this.seed);

  // pull the statement of system environment
  this.define.forEach(function(statement) {
    switch (statement.type) {
      case Symbol.Set:
        if (statement.key === Symbol.Background) that.generateBackground(statement);
        break;
    }
  });

  // execute main
  this.parseStatements(this.computed);

  // return the intermediate code
  return {
    maxdepth: this.maxdepth,
    maxobjects: this.maxobjects,
    minsize: this.minsize,
    maxsize: this.maxsize,
    seed: this.seed,
    objects: this.objects,
    num: this.objects.length
  }
}

// rewrite subtree related to rule statement
Interpreter.prototype.rewriteRule = function(rule) {
  rule.params.forEach(function(param) {
    if (param.type === Symbol.Modifier) {
      switch (param.key) {
        case Symbol.Weight: rule.weight = param.value; break;
        case Symbol.Maxdepth: rule.maxdepth = param.value; rule.alternate = param.alternate; break;
      }
    }
  });
  if (!this.rules[rule.id]) this.rules[rule.id] = [];
  this.rules[rule.id].push(rule);
  return this;
}

// execute statements
Interpreter.prototype.parseStatements = function(statements) {
  var i = 0, len = statements.length;
  while (i < len) {
    if (this.terminated()) break;
    this.parseStatement(statements[i], 0);
    i++;
  }
  return this;
}

// execute a statement
Interpreter.prototype.parseStatement = function(statement, index) {
  // parse transformation expression
  var expr = statement.exprs[index];
  if (expr) {
    this.pushState();
    for (var i = 0; i < expr.left; i++) {
      if (this.terminated()) break;
      this.parseTransformStatement(expr.right);
      // if statement.exprs[index + 1] is undefined, it would break the transformation loops.
      this.parseStatement(statement, index + 1);
    }
    this.popState();
    return this;
  }

  // if not primitive, call rule and parse next transformation loops
  if (_.values(Primitive).indexOf(statement.id) === -1) {
    this.rules[statement.id].depth = (this.rules[statement.id].depth || 0) + 1;
    var rule = this.sampling(statement.id);
    if (typeof rule === 'string') {
      var name = rule;
      this.rules[name].depth = (this.rules[name].depth || 0) + 1;
      var rule = this.sampling(name);
      this.parseStatements(rule.body);
      this.rules[name].depth--;
    }
    else if (rule) {
      this.parseStatements(rule.body);
    }
    this.rules[statement.id].depth--;
    return this;
  }

  // achieve the end of nested transformation loops
  this.generatePrimitive(statement);
  return this;
}

// break down transformation set
Interpreter.prototype.parseTransformStatement = function(transform) {
  var i = 0, len = transform.properties.length;
  while (i < len) {
    this.parseTransform(transform.properties[i]);
    i++;
  }
  return this;
}

// parse transformation property
Interpreter.prototype.parseTransform = function(property) {
  var v = property.value;
  switch (property.key) {
    case Symbol.XShift: this.translate(v, 0, 0); break;
    case Symbol.YShift: this.translate(0, v, 0); break;
    case Symbol.ZShift: this.translate(0, 0, v); break;
    case Symbol.RotateX: this.rotateX(degToRad(v)); break;
    case Symbol.RotateY: this.rotateY(degToRad(v)); break;
    case Symbol.RotateZ: this.rotateZ(degToRad(v)); break;
    case Symbol.Size: this.scale(v.x, v.y, v.z); break;
    case Symbol.Matrix: this.matrix(v); break;
    case Symbol.Color: this.setColor(v); break;
    case Symbol.Hue: this.setHue(v); break;
    case Symbol.Saturation: this.setSaturation(v); break;
    case Symbol.Brightness: this.setBrightness(v); break;
    case Symbol.Blend: this.setBlend(property.color, property.strength); break;
    case Symbol.Alpha: this.curr.alpha *= v; break;
  }
  return this;
}

// create primitive object and stack it as intermediate code for renderer
Interpreter.prototype.generatePrimitive = function(statement) {
  // if achieved maxobjects
  this.objectnum++;
  if (this.terminated()) return;

  // blend the current color with the specified color
  if (this.curr.blend.computed) {
    this.curr.hex = this.curr.hex.toHSV();
    var blend = Color(this.curr.blend.color).toHSV();
    this.curr.hex.hue += (blend.hue - this.curr.hex.hue) * this.curr.blend.strength / 6;
    this.curr.hex.hue %= 360;
  }

  // primitive object
  this.objects.push({
    type: Type.Primitive,
    name: statement.id,
    matrix: this.curr.matrix.clone(),
    color: this.curr.hsv.computed ? this.curr.hex.blend(this.curr.hsv, 1).toCSS() : this.curr.hex.toCSS(),
    opacity: this.curr.alpha,
    depth: this.depth
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
    throw new Error(
      sprintf("ReferenceError: '%s' is not defined. As reported by eisenscript interpreter.", name),
      sprintf("%s.js", this.name)
    );
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
    return false;
  }

  // if achieved maxdepth
  if (chosen.maxdepth && chosen.maxdepth < this.rules[name].depth) {
    if (chosen.alternate) return chosen.alternate;
    if (this.rules[name].depth >= chosen.maxdepth) return false;
    if (this.depth < chosen.maxdepth) return chosen;
    return false;
  }

  // the rule randomly chosen
  return chosen;
}

if (module) {
  module.exports = Interpreter;
}
