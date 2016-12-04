'use strict';

const shouldBeGoodInterpreter = require('./behavior/should_be_good_interpreter');

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
      'comments/single_line.es',
      'comments/multiline.es',
    ];
    tests.forEach(shouldBeGoodInterpreter);
  });

  describe('primitives', function() {
    const tests = [
      'primitives/box.es',
      'primitives/grid.es',
      'primitives/sphere.es',
      'primitives/line.es',
      // NOTE: THREE.PointCloudMaterial is not a constructor
      // 'primitives/point.es',
      'primitives/triangle.es',
      // 'primitives/mesh.es',
      'primitives/cylinder.es',
      // 'primitives/tube.es',
    ];
    tests.forEach(shouldBeGoodInterpreter);
  });

  describe('modifiers', function() {
    describe('md / maxdepth [integer]', function() {
      const tests = [
        'modifiers/md.es',
        'modifiers/maxdepth.es',
        'modifiers/maxdepth.nested_recursive_rule.es',
        'modifiers/maxdepth.nested_transform.es',
        'modifiers/maxdepth.alternate_rule.es',
        'modifiers/maxdepth.parallel_traverse.es',
        'modifiers/md.w.recursive.es',
      ];
      tests.forEach(shouldBeGoodInterpreter);
    });

    describe('weight', function() {
      const tests = [
        'modifiers/w.es',
        'modifiers/weight.es',
      ];
      tests.forEach(shouldBeGoodInterpreter);
    });
  });

  describe('actions', function() {
    describe('set background [color]', function() {
      const tests = [
        'actions/background.colorname.es',
        'actions/background.hex3.es',
        'actions/background.hex6.es',
        'actions/background.random.es',
      ];
      tests.forEach(shouldBeGoodInterpreter);
    });

    describe('set seed [integer] / initial', function() {
      const tests = [
        'actions/seed.es',
        'actions/seed.initial.es',
        // TODO: test default seed
      ];
      tests.forEach(shouldBeGoodInterpreter);
    });

    describe('set maxobjects [integer]', function() {
      const tests = [
        'actions/maxobjects.es',
        // 'actions/maxobjects.achive_max_value.es',
      ];
      tests.forEach(shouldBeGoodInterpreter);
    });

    describe('set maxdepth [integer]', function() {
      const tests = [
        'actions/maxdepth.es',
        'actions/maxdepth.strange.es'
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
      'colorspace/h.es',
      'colorspace/hue.es',
      'colorspace/sat.es',
      'colorspace/saturation.es',
      'colorspace/b.es',
      'colorspace/brightness.es',
      'colorspace/a.es',
      'colorspace/alpha.es',
      'colorspace/color.colorname.es',
      'colorspace/color.hex3.es',
      'colorspace/color.hex6.es',
      'colorspace/color.random.es',
      'colorspace/color.default_color.es',
      'colorspace/blend.hex.and.hsv.es',
      'colorspace/blend.colorname.es',
      'colorspace/blend.hex3.es',
      'colorspace/blend.hex6.es',
      'colorspace/blend.random.es',
    ];
    tests.forEach(shouldBeGoodInterpreter);
  });

  describe('geometrical transformations', function() {
    const tests = [
      'geometric/x.es',
      'geometric/y.es',
      'geometric/z.es',
      'geometric/rx.es',
      'geometric/ry.es',
      'geometric/rz.es',
      'geometric/s.1.es',
      'geometric/s.3.es',
      'geometric/m.es',
      'geometric/matrix.es',
    ];
    tests.forEach(shouldBeGoodInterpreter);
  });

  // NOTE: not implement yet
  describe.skip('preprocessor commands', function() {
    // describe('define', function() {
    //   it('#define varname 1.2', function() {
    //     const source = '#define varname 1.2';
    //   });
    // });
  });

  // NOTE: not implement yet
  describe.skip('colorpool', function() {
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
    // it('{ set colorpool list:orange,white,grey', function() {
    //   const source = 'set colorpool list:orange,white,grey';
    // });
  });
});
