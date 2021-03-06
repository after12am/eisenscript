'use strict';

const fs = require('fs');
const path = require('path');
const shouldBeGoodInterpreter = require('./behavior/should_be_good_interpreter');
const { assert } = require('chai');
const parser = require('../src/parser');
const Interpreter = require('../src/Interpreter');
const utils = require('../src/utils');

function readdir(dir) {
  return fs.readdirSync(dir).map(filename => path.join(dir, filename));
}

/**
 * TODO: more matrix tests
 * TODO: more color translation tests. blend
 */
describe('Interpreter', function() {
  describe.skip('default', function() {
    const tests = [

    ];
    tests.forEach(shouldBeGoodInterpreter);
  });

  describe('comments', function() {
    const tests = readdir('test/testset/comments');
    tests.forEach(shouldBeGoodInterpreter);
  });

  describe('primitives', function() {
    const tests = readdir('test/testset/primitives');
    tests.forEach(shouldBeGoodInterpreter);
  });

  describe('modifiers', function() {
    describe('md / maxdepth [integer]', function() {
      const tests = readdir('test/testset/modifiers/maxdepth');
      tests.forEach(shouldBeGoodInterpreter);
    });

    describe('weight', function() {
      const tests = readdir('test/testset/modifiers/weight');
      tests.forEach(shouldBeGoodInterpreter);
    });
  });

  describe('actions', function() {
    describe('set background [color]', function() {
      const tests = readdir('test/testset/actions/background');
      tests.forEach(shouldBeGoodInterpreter);

      // disable to use random as background color
      const source = 'set background random';
      const ast = parser.parse(source);
      const interpreter = new Interpreter();
      assert.throws(() => interpreter.generate(ast));
    });

    describe('set seed [integer] / initial', function() {
      const tests = readdir('test/testset/actions/seed');
      tests.forEach(shouldBeGoodInterpreter);

      // The color is different every time if initial is set.
      const source = 'set seed initial\n10 * { x 1 color random } box';
      const ast = parser.parse(source);
      const interpreter = new Interpreter();
      const object = interpreter.generate(ast);
      assert.isFalse(JSON.stringify(interpreter.generate(ast)) === JSON.stringify(interpreter.generate(ast)));
    });

    describe('set maxobjects [integer]', function() {
      const tests = readdir('test/testset/actions/maxobjects');
      tests.forEach(shouldBeGoodInterpreter);
    });

    describe('set maxdepth [integer]', function() {
      const tests = readdir('test/testset/actions/maxdepth');
      tests.forEach(shouldBeGoodInterpreter);
    });

    // TODO: not implemented yet
    describe('set minsize [float]', function() {
      // it('set minsize 10.1', function() {
      //   const source = 'set minsize 10.1';
      // });
    });

    // TODO: not implemented yet
    describe('set maxsize [float]', function() {
      // it('set maxsize 10.1', function() {
      //   const source = 'set maxsize 10.1';
      // });
    });
  });

  // NOTE: If you want to express same color transformation in three.js, use basic material type.
  describe('colorspace', function() {
    const tests = readdir('test/testset/colorspace');
    tests.forEach(shouldBeGoodInterpreter);
  });

  describe('geometrical transformations', function() {
    const tests = readdir('test/testset/geometric');
    tests.forEach(shouldBeGoodInterpreter);
  });

  describe('preprocessor commands', function() {
    describe('define', function() {
      it('#define varname 10', function() {
        const source = '#define varname 10\n{ x varname } box';
        const ast = parser.parse(source);
        const interpreter = new Interpreter();
        const object = interpreter.generate(ast);
        const expected = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 0, 0, 1];
        assert.deepEqual(expected, Array.from(object.objects[0].matrix.elements))
      });
    });
  });

  // NOTE: not implement yet
  describe('colorpool', function() {
    it('{ set colorpool randomhue', function() {
      const source = 'set colorpool randomhue\n100 * { color random } box';
      const ast = parser.parse(source);
      const interpreter = new Interpreter();
      const object = interpreter.generate(ast);
      for (let i = 0; i < 100; i++) {
        const color = object.objects[i].color;
        const hex = color.substring(1, 7);
        const rgb = utils.hex2rgb(hex);
        const hsv = utils.rgb2hsv(rgb[0], rgb[1], rgb[2]);
        assert.ok(hsv[0] >= 0 && hsv[0] <= 360);
        assert.equal(hsv[1], 1);
        assert.equal(hsv[2], 1);
      }
    });
    
    it('{ set colorpool randomrgb', function() {
      const source = 'set colorpool randomrgb\n100 * { color random } box';
      const ast = parser.parse(source);
      const interpreter = new Interpreter();
      const object = interpreter.generate(ast);
      for (let i = 0; i < 100; i++) {
        const color = object.objects[i].color;
        const hex = color.substring(1, 7);
        const rgb = utils.hex2rgb(hex);
        assert.ok(rgb[0] >= 0 && rgb[0] <= 360);
        assert.ok(rgb[1] >= 0 && rgb[1] <= 360);
        assert.ok(rgb[2] >= 0 && rgb[2] <= 360);
      }
    });

    it('{ set colorpool greyscale', function() {
      const source = 'set colorpool greyscale\n100 * { color random } box';
      const ast = parser.parse(source);
      const interpreter = new Interpreter();
      const object = interpreter.generate(ast);
      for (let i = 0; i < 100; i++) {
        const color = object.objects[i].color;
        const r = color.substring(1, 3);
        assert.equal(color, `#${r}${r}${r}`);
      }
    });
    //
    // it('{ set colorpool image:filename.png', function() {
    //   const source = 'set colorpool image:filename.png';
    // });
    //
    it('{ set colorpool list:orange,white,grey', function() {
      const source = 'set colorpool list:orange,white,grey\n100 * { color random } box';
      const ast = parser.parse(source);
      const interpreter = new Interpreter();
      const object = interpreter.generate(ast);
      for (let i = 0; i < 100; i++) {
        assert.ok(['#808080', '#FFFFFF', '#FFA500'].includes(object.objects[i].color));
      }
    });
  });
});




