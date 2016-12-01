'use strict';

const shouldBeGoodInterpreter = require('./behavior/should_be_good_interpreter');

/**
 * TODO: consider to split into multiple files.
 * TODO: this is just monkey testing. Required to make exhaustive.
 */
describe('Interpreter', function() {

  describe('comments', function() {
    // TODO: implementation is required
  });

  describe('#primitive', function() {

    const tests = [
      'primitive/box.es',
      'primitive/grid.es',
      'primitive/sphere.es'
    ];

    tests.forEach(shouldBeGoodInterpreter);
  });

  describe('#maxdepth', function() {

    const tests = [
      'maxdepth/nested_recursive_rule.es',
      'maxdepth/nested_transform.es',
      'maxdepth/alternate_rule.es',
      'maxdepth/parallel_traverse.es',
    ];

    tests.forEach(shouldBeGoodInterpreter);
  });



  describe('comments', function() {
    it('// single line comment', function() {
      const source = '// have a nice day';
    });

    it('/* multiline comment */', function() {
      const source = '/* have a nice day */';
    });
  });

  describe('set maxdepth [integer]', function() {
    it('set maxdepth 100', function() {
      const source = 'set maxdepth 100';
    });
  });

  describe('set maxobjects [float]', function() {
    it('set maxobjects 100', function() {
      const source = 'set maxobjects 100';
    });
  });

  describe('set minsize [float]', function() {
    it('set minsize 10.1', function() {
      const source = 'set minsize 10.1';
    });
  });

  describe('set maxsize [float]', function() {
    it('set maxsize 10.1', function() {
      const source = 'set maxsize 10.1';
    });
  });

  describe('set seed [integer] / initial', function() {
    it('set seed 100', function() {
      const source = 'set seed 100';
    });

    it('set seed initial', function() {
      const source = 'set seed initial';
    });
  });

  describe('set background [color]', function() {
    it('set background #ffffff', function() {
      const source = 'set background #ffffff';
    });

    it('set background #fff', function() {
      const source = 'set background #fff';
    });

    it('set background random', function() {
      const source = 'set background random';
    });

    it('set background red', function() {
      const source = 'set background red';
    });
  });

  describe('in regard to "rule modifiers"', function() {

    describe('md / maxdepth [integer]', function() {
      it('rule R1 maxdepth 10 { box }', function() {
        const source = 'rule R1 maxdepth 10 { box }';
      });

      it('rule R1 md 10 { box }', function() {
        const source = 'rule R1 md 10 { box }';
      });
    });

    describe('w / weight [float]', function() {
      it('rule R1 weight 10.1 { box }', function() {
        const source = 'rule R1 weight 10.1 { box }';
      });

      it('rule R1 w 10.1 { box }', function() {
        const source = 'rule R1 w 10.1 { box }';
      });
    });
  });

  describe('in regard to "Geometrical Transformations"', function() {
    describe('x [float]', function() {
      it('{ x 1.2 } box', function() {
        const source = '{ x 1.2 } box';
      });
    });

    describe('y [float]', function() {
      it('{ y 1.2 } box', function() {
        const source = '{ y 1.2 } box';
      });
    });

    describe('z [float]', function() {
      it('{ z 1.2 } box', function() {
        const source = '{ z 1.2 } box';
      });
    });

    describe('rx [float]', function() {
      it('{ rx 1.2 } box', function() {
        const source = '{ rx 1.2 } box';
      });
    });

    describe('ry [float]', function() {
      it('{ ry 1.2 } box', function() {
        const source = '{ ry 1.2 } box';
      });
    });

    describe('rz [float]', function() {
      it('{ rz 1.2 } box', function() {
        const source = '{ rz 1.2 } box';
      });
    });

    describe('s [float]', function() {
      it('{ s 1.2 } box', function() {
        const source = '{ s 1.2 } box';
      });
    });

    describe('s [f1] [f2] [f3]', function() {
      it('{ s 2.1 2.2 2.3 } box', function() {
        const source = '{ s 2.1 2.2 2.3 } box';
      });
    });

    describe('m [f1] ... [f9]', function() {
      it('{ s 2.1 2.2 2.3 } box', function() {
        const source = '{ m 2.1 2.2 2.3 2.4 2.5 2.6 2.7 2.8 2.9 } box';
      });
    });
  });

  describe('in regard to "Color Space Transformations"', function() {
    describe('h / hue [float]', function() {
      it('{ h 1.2 } box', function() {
        const source = '{ h 1.2 } box';
      });

      it('{ hue 1.2 } box', function() {
        const source = '{ hue 1.2 } box';
      });
    });

    describe('sat / saturation [float]', function() {
      it('{ sat 1.2 } box', function() {
        const source = '{ sat 1.2 } box';
      });

      it('{ saturation 1.2 } box', function() {
        const source = '{ saturation 1.2 } box';
      });
    });

    describe('b / brightness [float]', function() {
      it('{ b 1.2 } box', function() {
        const source = '{ b 1.2 } box';
      });

      it('{ brightness 1.2 } box', function() {
        const source = '{ brightness 1.2 } box';
      });
    });

    describe('a / alpha [float]', function() {
      it('{ a 1.2 } box', function() {
        const source = '{ a 1.2 } box';
      });

      it('{ alpha 1.2 } box', function() {
        const source = '{ alpha 1.2 } box';
      });
    });

    describe('color [float]', function() {
      it('{ color #fff } box', function() {
        const source = '{ color #fff } box';
      });

      it('{ color #ffffff } box', function() {
        const source = '{ color #ffffff } box';
      });

      it('{ color red } box', function() {
        const source = '{ color red } box';
      });

      it('{ color random } box', function() {
        const source = '{ color random } box';
      });
    });

    describe('blend [color] [strength]', function() {
      it('{ blend #fff 0.5 } box', function() {
        const source = '{ blend #fff 0.5 } box';
      });

      it('{ blend #ffffff 0.5 } box', function() {
        const source = '{ blend #ffffff 0.5 } box';
      });

      it('{ blend red 0.5 } box', function() {
        const source = '{ blend red 0.5 } box';
      });

      it('{ blend random 0.5 } box', function() {
        const source = '{ blend random 0.5 } box';
      });
    });

    describe('set color random', function() {
      it('{ set color random', function() {
        const source = 'set color random';
      });
    });

    describe('set colorpool [scheme]', function() {
      it('{ set colorpool randomhue', function() {
        const source = 'set colorpool randomhue';
      });

      it('{ set colorpool randomhue', function() {
        const source = 'set colorpool randomhue';
      });

      it('{ set colorpool randomhue', function() {
        const source = 'set colorpool greyscale';
      });

      it('{ set colorpool image:filename.png', function() {
        const source = 'set colorpool image:filename.png';
      });

      it('{ set colorpool list:orange,white,grey', function() {
        const source = 'set colorpool list:orange,white,grey';
      });
    });

    describe('in regard to "Drawing Primitives"', function() {

      describe('line', function() {
        it('line', function() {
          const source = 'line';
        });
      });

      describe('point', function() {
        it('point', function() {
          const source = 'point';
        });
      });

      describe('triangle', function() {
        it('triangle', function() {
          const source = 'triangle';
        });
      });

      describe('mesh', function() {
        it('mesh', function() {
          const source = 'mesh';
        });
      });

      describe('cylinder', function() {
        it('cylinder', function() {
          const source = 'cylinder';
        });
      });

      describe('tube', function() {
        it('tube', function() {
          const source = 'tube';
        });
      });
    });

    describe('in regard to "preprocessor commands"', function() {
      describe('define', function() {
        it('#define varname 1.2', function() {
          const source = '#define varname 1.2';
        });
      });
    });
  });
});
