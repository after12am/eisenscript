'use strict';

const shouldBeGoodInterpreter = require('./behavior/should_be_good_interpreter');
const { assert } = require('chai');
import parser from '../src/parser';
import Interpreter from '../src/interpreter';

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
    const tests = [
      'comments/single_line.es.txt',
      'comments/multiline.es.txt',
    ];
    tests.forEach(shouldBeGoodInterpreter);
  });

  describe('primitives', function() {
    const tests = [
      'primitives/box.es.txt',
      'primitives/grid.es.txt',
      'primitives/sphere.es.txt',
      'primitives/line.es.txt',
      // NOTE: THREE.PointCloudMaterial is not a constructor
      // 'primitives/point.es.txt',
      'primitives/triangle.es.txt',
      // 'primitives/mesh.es.txt',
      'primitives/cylinder.es.txt',
      // 'primitives/tube.es.txt',
    ];
    tests.forEach(shouldBeGoodInterpreter);
  });

  describe('modifiers', function() {
    describe('md / maxdepth [integer]', function() {
      const tests = [
        'modifiers/md.es.txt',
        'modifiers/maxdepth.es.txt',
        'modifiers/maxdepth.nested_recursive_rule.es.txt',
        'modifiers/maxdepth.nested_transform.es.txt',
        'modifiers/maxdepth.alternate_rule.es.txt',
        'modifiers/maxdepth.parallel_traverse.es.txt',
        'modifiers/md.w.recursive.es.txt',
      ];
      tests.forEach(shouldBeGoodInterpreter);
    });

    describe('weight', function() {
      const tests = [
        'modifiers/w.es.txt',
        'modifiers/weight.es.txt',
      ];
      tests.forEach(shouldBeGoodInterpreter);
    });
  });

  describe('actions', function() {
    describe('set background [color]', function() {
      const tests = [
        'actions/background.colorname.es.txt',
        'actions/background.hex3.es.txt',
        'actions/background.hex6.es.txt',
      ];
      tests.forEach(shouldBeGoodInterpreter);

      // disable to use random as background color
      const source = 'set background random';
      const ast = parser.parse(source);
      const interpreter = new Interpreter();
      assert.throws(() => interpreter.generate(ast));
    });

    describe('set seed [integer] / initial', function() {
      const tests = [
        'actions/seed.es.txt',
        'actions/seed.initial.es.txt',
        // TODO: test default seed
      ];
      tests.forEach(shouldBeGoodInterpreter);
    });

    describe('set maxobjects [integer]', function() {
      const tests = [
        'actions/maxobjects.es.txt',
        // 'actions/maxobjects.achive_max_value.es.txt',
      ];
      tests.forEach(shouldBeGoodInterpreter);
    });

    describe('set maxdepth [integer]', function() {
      const tests = [
        'actions/maxdepth.es.txt',
        'actions/maxdepth.strange.es.txt'
        // TODO: test default maxdepth
      ];
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
    const tests = [
      'colorspace/h.es.txt',
      'colorspace/hue.es.txt',
      'colorspace/sat.es.txt',
      'colorspace/saturation.es.txt',
      'colorspace/b.es.txt',
      'colorspace/brightness.es.txt',
      'colorspace/a.es.txt',
      'colorspace/alpha.es.txt',
      'colorspace/color.colorname.es.txt',
      'colorspace/color.hex3.es.txt',
      'colorspace/color.hex6.es.txt',
      'colorspace/color.random.es.txt',
      'colorspace/color.default_color.es.txt',
      'colorspace/blend.hex.and.hsv.es.txt',
      'colorspace/blend.colorname.es.txt',
      'colorspace/blend.hex3.es.txt',
      'colorspace/blend.hex6.es.txt',
      'colorspace/blend.random.es.txt',
    ];
    tests.forEach(shouldBeGoodInterpreter);
  });

  describe('geometrical transformations', function() {
    const tests = [
      'geometric/x.es.txt',
      'geometric/x.def.es.txt',
      'geometric/y.es.txt',
      'geometric/y.def.es.txt',
      'geometric/z.es.txt',
      'geometric/z.def.es.txt',
      'geometric/rx.es.txt',
      'geometric/rx.def.es.txt',
      'geometric/ry.es.txt',
      'geometric/ry.def.es.txt',
      'geometric/rz.es.txt',
      'geometric/rz.def.es.txt',
      'geometric/s.1.es.txt',
      'geometric/s.1.def.es.txt',
      'geometric/s.3.es.txt',
      'geometric/m.es.txt',
      'geometric/m.def.es.txt',
      'geometric/matrix.es.txt',
      'geometric/matrix.def.es.txt',
    ];
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
    // it('{ set colorpool randomhue', function() {
    //   const source = 'set colorpool randomhue';
    // });
    //
    // it('{ set colorpool randomhue', function() {
    //   const source = 'set colorpool randomhue';
    // });
    //
    // it('{ set colorpool randomhue', function() {
    //   const source = 'set colorpool greyscale';
    // });
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
