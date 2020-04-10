'use strict';

const Symbol = require('./symbol');
const Color = require('color-js');
const Matrix4 = require('./matrix');
const _ = require('./underscore');
const MersenneTwister = require('./mt');
const { degToRad, clamp } = require('./math');

// module generate object code from ast
var Interpreter = function() {
  this.name = 'Interpreter';
  this.objects = [];
  this.define = [];
  this.rules = {};
  this.computed = [];
  this.maxdepth;
  this.depth = 0;
  this.maxobjects;
  this.objectnum = 0;
  this.minsize = .2;
  this.maxsize = 1.0;
  this.seed = 'initial'; // represents '1' // TODO: defines as constant value
  this.stack = [];
  this.curr = {};
  this.curr.matrix = new Matrix4();
  this.curr.hsv = _.extend(Color({ hue: 0, saturation: 1, value: 1 }), { computed: false });
  this.curr.blend = { color: null, strength: 0 };
  this.curr.alpha = 1;
  this.mt = new MersenneTwister();
}

// termination criteria
Interpreter.prototype.terminated = function() {
  if (!this.maxobjects && !this.maxdepth) {
    if (this.depth > 1000) {
      console.warn('[eisenscript.js] terminated because maximum number of generations reached (1000)');
      return true;
    }
  }
  if (this.maxobjects && this.objectnum > this.maxobjects) return true;

  // NOTE: misterious working of structure synth
  // set maxdepth 10
  // rule R1 { box { x 1 hue 36 rx 10 } R1 } R1
  if (this.maxdepth && this.depth > this.maxdepth - 3) return true;
  return false;
}

// stack current transformation state
Interpreter.prototype.pushState = function() {
  this.depth++;
  this.stack.push({
    matrix: this.curr.matrix.clone(),
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

Interpreter.prototype.randomColor = function() {
  var rand = this.mt.next() * 0xffffff;
  var color = Math.floor(rand).toString(16);
  return `#${color}`;
}

Interpreter.prototype.setColor = function(color) {
  this.curr.hsv = Color(color === 'random' ? this.randomColor() : color).toHSV();
  return this;
}

Interpreter.prototype.setHue = function(v) {
  this.curr.hsv.computed = true;
  this.curr.hsv.hue += v % 360;
  return this;
}

Interpreter.prototype.setSaturation = function(v) {
  this.curr.hsv.computed = true;
  var sat = this.curr.hsv.saturation;
  if (0 > sat * v || sat * v > 1) console.warn('[eisenscript.js] Saturation is measured from 0 to 1 and is clamped to this interval (i.e. values larger then 1 are set to 1.');
  this.curr.hsv.saturation = clamp(sat * v, 0, 1);
  return this;
}

Interpreter.prototype.setBrightness = function(v) {
  this.curr.hsv.computed = true;
  var brightness = this.curr.hsv.value;
  if (0 > brightness * v || brightness * v > 1) console.warn('[eisenscript.js] Brightness is measured from 0 to 1 and is clamped to this interval.');
  this.curr.hsv.value = clamp(brightness * v, 0, 1);
  return this;
}

Interpreter.prototype.setBlend = function(color, strength) {
  this.curr.blend.color = color;
  this.curr.blend.strength = this.curr.blend.strength + clamp(strength, 0, 1) / 2;
  // blend the current color with the specified color
  this.curr.hsv = this.curr.hsv.blend(
    Color(this.curr.blend.color === 'random' ? this.randomColor() : this.curr.blend.color).toHSV(),
    this.curr.blend.strength
  );
  return this;
}

Interpreter.prototype.setAlpha = function(v) {
  var alpha = this.curr.alpha;
  if (0 > alpha * v || alpha * v > 1) console.warn('[eisenscript.js] Alpha is measured from 0 to 1 and is clamped to this interval.');
  this.curr.alpha = clamp(this.curr.alpha * v, 0, 1);
  return this;
}

Interpreter.prototype.resolveVarname = function(symbol) {
  for (var i = 0; i < this.define.length; i++) {
    var statement = this.define[i];
    switch (statement.type) {
      case Symbol.Define:
        if (statement.varname === symbol) {
          return statement.value;
        }
    }
  }
  throw new Error(`Invalid symbol found: ${symbol}`);
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
      case Symbol.Primitive: if (statement.computed) that.computed.push(statement); break;
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
          case Symbol.Minsize:
            console.warn('[eisenscript.js] \'set minsize\' not implement yet');
            // that.minsize = statement.value;
            break;
          case Symbol.Maxsize:
            console.warn('[eisenscript.js] \'set maxsize\' not implement yet');
            // that.maxsize = statement.value;
            break;
          case Symbol.Seed: that.seed = statement.value; break;
        }
        break;
    }
  });

  // integer or 'initial' which represents '1'
  this.mt.setSeed(this.seed === 'initial' ? 1 : this.seed);

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
  };
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
  if (statement.type === 'statement') {
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
  if (statement.type === 'primitive') {
    this.generatePrimitive(statement);
    return this
  }

  console.warn(`[eisenscript.js] Invalid statement found: ${JSON.stringify(statement)}`);
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
  var r = (value) => (typeof(value) === 'string') ? +this.resolveVarname(value) : +value;
  var v = property.value;
  switch (property.key) {
    case Symbol.XShift: this.translate(r(v), 0, 0); break;
    case Symbol.YShift: this.translate(0, r(v), 0); break;
    case Symbol.ZShift: this.translate(0, 0, r(v)); break;
    case Symbol.RotateX: this.rotateX(degToRad(r(v))); break;
    case Symbol.RotateY: this.rotateY(degToRad(r(v))); break;
    case Symbol.RotateZ: this.rotateZ(degToRad(r(v))); break;
    case Symbol.Size: this.scale(r(v.x), r(v.y), r(v.z)); break;
    case Symbol.Matrix: this.matrix(property.value.map(v => r(v))); break;
    case Symbol.Color: this.setColor(v); break;
    case Symbol.Hue: this.setHue(v); break;
    case Symbol.Saturation: this.setSaturation(v); break;
    case Symbol.Brightness: this.setBrightness(v); break;
    case Symbol.Blend: this.setBlend(property.color, property.strength); break;
    case Symbol.Alpha: this.setAlpha(v); break;
  }
  return this;
}

// create primitive object and stack it as intermediate code for renderer
Interpreter.prototype.generatePrimitive = function(statement) {
  // if achieved maxobjects
  this.objectnum++;
  if (this.terminated()) return;

  // primitive object
  this.objects.push({
    type: Symbol.Primitive,
    name: statement.id,
    matrix: this.curr.matrix.clone(),
    color: this.curr.hsv.toCSS(),
    opacity: this.curr.alpha,
    depth: this.depth
  });
}

// create background object code and stack it as intermediate code for renderer
Interpreter.prototype.generateBackground = function(statement) {
  this.objects.push({
    type: Symbol.Background,
    color: statement.value === 'random' ? this.randomColor() : statement.value
  });
}

// randomly choose one of the rules according to their weights
Interpreter.prototype.sampling = function(name, retry) {
  if (!this.rules[name]) {
    throw new Error(
      `ReferenceError: '${name}' is not defined. As reported by eisenscript interpreter.`,
      `${this.name}.js`
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
    if (rand - rule.weight > 0) {
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
  // NOTE: maybe alternative code
  // if (chosen.maxdepth && chosen.maxdepth < this.rules[name].depth) {
  //   if (chosen.alternate) return chosen.alternate;
  //   return false
  // }
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
