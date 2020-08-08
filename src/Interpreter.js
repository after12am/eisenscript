const Symbol = require('./Symbol');
const Color = require('color-js');
const Matrix4 = require('./Matrix4');
const utils = require('./utils');
const MersenneTwister = require('./mt');
const { degToRad, clamp } = require('./math');
const csscolor = require('./csscolor');

// module generate object code from ast
module.exports = class Interpreter {
  constructor() {
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
    this.seed = 'initial'; // 'initial' represents random color
    this.stack = [];
    this.curr = {};
    this.curr.matrix = new Matrix4();
    this.curr.hsv = utils.extend(Color({ hue: 0, saturation: 1, value: 1 }), { computed: false });
    this.curr.blend = { color: null, strength: 0 };
    this.curr.alpha = 1;
    this.colorpool = null;
    this.colorscheme = [];
    this.mt = new MersenneTwister();
  }

  // termination criteria
  terminated() {
    if (!this.maxobjects && !this.maxdepth) {
      if (this.depth >= 1000) {
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
  pushState() {
    this.depth++;
    this.stack.push({
      matrix: this.curr.matrix.clone(),
      hsv: this.curr.hsv.clone(),
      blend: utils.extend({}, this.curr.blend),
      alpha: this.curr.alpha
    });
    return this;
  }

  // pull the parent transformation state
  popState() {
    if (this.stack.length > 0) {
      this.curr = this.stack.pop();
      this.depth--;
    }
    return this;
  }

  translate(x, y, z) {
    this.curr.matrix.translate({
      x: x,
      y: y,
      z: z
    });
    return this;
  }

  rotateX(angle) {
    this.curr.matrix.rotateX(angle);
    return this;
  }

  rotateY(angle) {
    this.curr.matrix.rotateY(angle);
    return this;
  }

  rotateZ(angle) {
    this.curr.matrix.rotateZ(angle);
    return this;
  }

  scale(x, y, z) {
    this.curr.matrix.scale({
      x: x,
      y: y,
      z: z
    });
    return this;
  }

  // make 3x3 rotation matrix to 4x4 matrix
  // test: { m 1 0 0 0 .53 -.85 0 .85 .53 } box
  matrix(v) {
    this.curr.matrix.set(
      v[0], v[1], v[2], 0,
      v[3], v[4], v[5], 0,
      v[6], v[7], v[8], 0,
        0,    0,    0,  1
    );
    return this;
  }

  multiplyMatrices(v) {
    this.curr.matrix.multiplyMatrices(this.curr.matrix, new Matrix4(
      v[0], v[1], v[2], 0,
      v[3], v[4], v[5], 0,
      v[6], v[7], v[8], 0,
        0,    0,    0,  1
    ));
    return this;
  }

  randomColor() {
    // if colorpool is set, choose from colorset
    if (this.colorpool === Symbol.ColorList) {
      if (this.colorscheme.length > 0) {
        const idx = Math.floor(this.mt.next() * this.colorpool.length);
        return this.colorscheme[idx];
      }
    }
    else if (this.colorpool === Symbol.ColorGreyscale) {
      // random r=g=b
      const r = this.mt.next() * 255;
      return `#${utils.rgb2hex(r, r, r)}`;
    }
    else if (this.colorpool === Symbol.ColorRandomhue) {
      const h = Math.floor(this.mt.next() * 360);
      const rgb = utils.hsv2rgb(h, 1, 1);
      return `#${utils.rgb2hex(rgb[0], rgb[1], rgb[2])}`;
    }
    else if (this.colorpool === Symbol.ColorRandomrgb) {
      const rgb = [
        this.mt.next() * 255,
        this.mt.next() * 255,
        this.mt.next() * 255
      ];
      return `#${utils.rgb2hex(rgb[0], rgb[1], rgb[2])}`;
    }
    const rand = this.mt.next() * 0xffffff;
    const color = Math.floor(rand).toString(16);
    return `#${color}`;
  }

  setColor(color) {
    this.curr.hsv = Color(color === 'random' ? this.randomColor() : color).toHSV();
    return this;
  }

  setHue(v) {
    this.curr.hsv.computed = true;
    this.curr.hsv.hue += v % 360;
    return this;
  }

  setSaturation(v) {
    this.curr.hsv.computed = true;
    const sat = this.curr.hsv.saturation;
    if (0 > sat * v || sat * v > 1) console.warn('[eisenscript.js] Saturation is measured from 0 to 1 and is clamped to this interval (i.e. values larger then 1 are set to 1.');
    this.curr.hsv.saturation = clamp(sat * v, 0, 1);
    return this;
  }

  setBrightness(v) {
    this.curr.hsv.computed = true;
    const brightness = this.curr.hsv.value;
    if (0 > brightness * v || brightness * v > 1) console.warn('[eisenscript.js] Brightness is measured from 0 to 1 and is clamped to this interval.');
    this.curr.hsv.value = clamp(brightness * v, 0, 1);
    return this;
  }

  setBlend(color, strength) {
    this.curr.blend.color = color;
    this.curr.blend.strength = this.curr.blend.strength + clamp(strength, 0, 1) / 2;
    // blend the current color with the specified color
    this.curr.hsv = this.curr.hsv.blend(
      Color(this.curr.blend.color === 'random' ? this.randomColor() : this.curr.blend.color).toHSV(),
      this.curr.blend.strength
    );
    return this;
  }

  setAlpha(v) {
    const alpha = this.curr.alpha;
    if (0 > alpha * v || alpha * v > 1) console.warn('[eisenscript.js] Alpha is measured from 0 to 1 and is clamped to this interval.');
    this.curr.alpha = clamp(this.curr.alpha * v, 0, 1);
    return this;
  }

  resolveVarname(symbol) {
    for (let i = 0; i < this.define.length; i++) {
      const statement = this.define[i];
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
  generate(ast) {
    const that = this;

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
            case Symbol.ColorPool:
              // colorpool
              const m = statement.value.match(/^list:(.*)/);
              if (m) {
                that.colorpool = Symbol.ColorList;
                that.colorscheme = m[1].split(',').map(color => color.trim());
                break;
              }
              if (statement.value === Symbol.ColorGreyscale
               || statement.value === Symbol.ColorRandomhue
               || statement.value === Symbol.ColorRandomrgb) {
                that.colorpool = statement.value;
                break;
              }
              break;
          }
          break;
      }
    });

    // rewriting ast
    ast.forEach(function(statement) {
      switch (statement.type) {
        case Symbol.Rule: that.rewriteRule(statement); break;
      }
    });

    // if 'initial' is set, set random to seed
    // @see https://sourceforge.net/p/structuresynth/news/
    if (this.seed === 'initial') {
      this.mt.setSeed(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    } else {
      this.mt.setSeed(this.seed);
    }

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
  rewriteRule(rule) {
    const that = this;
    rule.params.forEach(function(param) {
      if (param.type === Symbol.Modifier) {
        switch (param.key) {
          case Symbol.Weight: rule.weight = param.value; break;
          case Symbol.Maxdepth:
            rule.maxdepth = param.defined ? +that.resolveVarname(param.value) : param.value;
            rule.alternate = param.alternate;
            break;
        }
      }
    });
    if (!this.rules[rule.id]) this.rules[rule.id] = [];
    this.rules[rule.id].push(rule);
    return this;
  }

  // execute statements
  parseStatements(statements) {
    let i = 0, len = statements.length;
    while (i < len) {
      if (this.terminated()) break;
      this.parseStatement(statements[i], 0);
      i++;
    }
    return this;
  }

  // execute a statement
  parseStatement(statement, index) {
    // parse transformation expression
    const expr = statement.exprs[index];
    if (expr) {
      this.pushState();
      let iterations = (typeof expr.left === 'number') ? expr.left : +this.resolveVarname(expr.left);
      for (let i = 0; i < iterations; i++) {
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
      let rule = this.sampling(statement.id);
      if (typeof rule === 'string') {
        const name = rule;
        this.rules[name].depth = (this.rules[name].depth || 0) + 1;
        rule = this.sampling(name);
        this.parseStatements(rule.body);
        this.rules[name].depth--;
      } else if (rule) {
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
  parseTransformStatement(transform) {
    let i = 0, len = transform.properties.length;
    while (i < len) {
      this.parseTransform(transform.properties[i]);
      i++;
    }
    return this;
  }

  // parse transformation property
  parseTransform(property) {
    const r = (p) => p.defined ? this.resolveVarname(p.value) : p.value;
    const p = property;
    const v = property.value;
    switch (property.key) {
      case Symbol.XShift: this.translate(r(p), 0, 0); break;
      case Symbol.YShift: this.translate(0, r(p), 0); break;
      case Symbol.ZShift: this.translate(0, 0, r(p)); break;
      case Symbol.RotateX: this.rotateX(degToRad(r(p))); break;
      case Symbol.RotateY: this.rotateY(degToRad(r(p))); break;
      case Symbol.RotateZ: this.rotateZ(degToRad(r(p))); break;
      case Symbol.FX: this.multiplyMatrices([-1, 0, 0, 0, 1, 0, 0, 0, 1]); break;
      case Symbol.FY: this.multiplyMatrices([1, 0, 0, 0, -1, 0, 0, 0, 1]); break;
      case Symbol.FZ: this.multiplyMatrices([1, 0, 0, 0, 1, 0, 0, 0, -1]); break;
      case Symbol.Size:
        if (p.defined) {
          this.scale(+this.resolveVarname(v.x), +this.resolveVarname(v.y), +this.resolveVarname(v.z));
        } else {
          this.scale(v.x, v.y, v.z);
        }
        break;
      case Symbol.Matrix:
        if (p.defined) {
          this.matrix(property.value.map(v => this.resolveVarname(v)));
        } else {
          this.matrix(property.value);
        }
        break;
      case Symbol.Color: this.setColor(r(p)); break;
      case Symbol.Hue: this.setHue(r(p)); break;
      case Symbol.Saturation: this.setSaturation(r(p)); break;
      case Symbol.Brightness: this.setBrightness(r(p)); break;
      case Symbol.Blend: this.setBlend(property.color, property.strength); break;
      case Symbol.Alpha: this.setAlpha(r(p)); break;
    }
    return this;
  }

  // create primitive object and stack it as intermediate code for renderer
  generatePrimitive(statement) {
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
  generateBackground(statement) {
    if (statement.value === 'random') {
      throw new Error('\'background\' expected a valid color identifier: Found: random');
    }
    this.objects.push({
      type: Symbol.Background,
      color: statement.value
    });
  }

  // randomly choose one of the rules according to their weights
  sampling(name, retry) {
    if (!this.rules[name]) {
      throw new Error(
        `ReferenceError: '${name}' is not defined. As reported by eisenscript interpreter.`,
        `${this.name}.js`
      );
    }

    // sum weights of each rules
    let sum = 0;
    this.rules[name].forEach(function(rule) {
      rule.weight = rule.weight || 1;
      sum += rule.weight;
    });

    // choosing...
    let rand = this.mt.next() * sum;
    let chosen;
    for (let i = 0; i < this.rules[name].length; i++) {
      const rule = this.rules[name][i];
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
}
