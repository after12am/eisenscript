'use strict';

const { assert } = require('chai');
const parser = require('../src/parser');

/**
 * TODO: consider to split into multiple files.
 * TODO: change description of each tests suitable.
 * TODO: change assertion of each tests suitable too. Especially throws.
 */
describe('Parser', function() {
  describe('#parse()', function() {
    describe('in regard to "action"', function() {

      describe('comments', function() {
        it('// single line comment', function() {
          const source = '// have a nice day';
          const ast = parser.parse(source);
          assert.equal(ast.length, 0);
        });

        it('/* multiline comment */', function() {
          const source = '/* have a nice day */';
          const ast = parser.parse(source);
          assert.equal(ast.length, 0);
        });
      });

      describe('set maxdepth [integer]', function() {
        it('set maxdepth 100', function() {
          const source = 'set maxdepth 100';
          const ast = parser.parse(source);
          // dump(ast)
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'maxdepth');
          assert.ok(ast[0].value === 100);
        });

        it('set maxdepth ten (can not set string value on maxdepth)', function() {
          try {
            const source = 'set maxdepth ten';
            const ast = parser.parse(source);
            assert(0);
          } catch (e) {
            assert.ok(1);
          }
        });
      });

      describe('set maxobjects [float]', function() {
        it('set maxobjects 100', function() {
          const source = 'set maxobjects 100';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'maxobjects');
          assert.ok(ast[0].value === 100);
        });

        it('set maxobjects ten (can not set string value on maxobjects)', function() {
          try {
            const source = 'set maxobjects ten';
            const ast = parser.parse(source);
            assert(0);
          } catch (e) {
            assert.ok(1);
          }
        });
      });

      describe('set minsize [float]', function() {
        it('set minsize 10.1', function() {
          const source = 'set minsize 10.1';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'minsize');
          assert.ok(ast[0].value === 10.1);
        });

        it('set minsize 100 (can not set integer value on minsize)', function() {
          try {
            const source = 'set minsize 100';
            const ast = parser.parse(source);
            assert(0);
          } catch (e) {
            assert.ok(1);
          }
        });

        it('set minsize ten (can not set string value on minsize)', function() {
          try {
            const source = 'set minsize ten';
            const ast = parser.parse(source);
            assert(0);
          } catch (e) {
            assert.ok(1);
          }
        });
      });

      describe('set maxsize [float]', function() {
        it('set maxsize 10.1', function() {
          const source = 'set maxsize 10.1';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'maxsize');
          assert.ok(ast[0].value === 10.1);
        });

        it('set maxsize 100 (can not set integer value on maxsize)', function() {
          try {
            const source = 'set maxsize 100';
            const ast = parser.parse(source);
            assert(0);
          } catch (e) {
            assert.ok(1);
          }
        });

        it('set maxsize ten (can not set string value on maxsize)', function() {
          try {
            const source = 'set maxsize ten';
            const ast = parser.parse(source);
            assert(0);
          } catch (e) {
            assert.ok(1);
          }
        });
      });

      describe('set seed [integer] / initial', function() {
        it('set seed 100', function() {
          const source = 'set seed 100';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'seed');
          assert.ok(ast[0].value === 100);
        });

        it('set seed initial', function() {
          const source = 'set seed initial';
          const ast = parser.parse(source);
          assert.ok(1);
        });

        it('set seed ten (can not set string value except initial on seed)', function() {
          try {
            const source = 'set seed ten';
            const ast = parser.parse(source);
            assert(0);
          } catch (e) {
            assert.ok(1);
          }
        });
      });

      describe('set background [color]', function() {
        it('set background #ffffff', function() {
          const source = 'set background #ffffff';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'background');
          assert.ok(ast[0].value === '#ffffff');
        });

        it('set background #fff', function() {
          const source = 'set background #fff';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'background');
          assert.ok(ast[0].value === '#fff');
        });

        it('set background random', function() {
          const source = 'set background random';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'background');
          assert.ok(ast[0].value === 'random');
        });

        it('set background red', function() {
          const source = 'set background red';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'background');
          assert.ok(ast[0].value === 'red');
        });
      });
    });

    describe('in regard to "rule modifiers"', function() {

      describe('md / maxdepth [integer]', function() {
        it('rule R1 maxdepth 10 { box }', function() {
          const source = 'rule R1 maxdepth 10 { box }';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'rule');
          assert.ok(ast[0].id === 'R1');
          assert.ok(ast[0].params[0].key === 'maxdepth');
          assert.ok(ast[0].params[0].value === 10);
          assert.ok(ast[0].body.length === 1);
        });

        it('rule R1 md 10 { box }', function() {
          const source = 'rule R1 md 10 { box }';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'rule');
          assert.ok(ast[0].id === 'R1');
          assert.ok(ast[0].params[0].key === 'maxdepth');
          assert.ok(ast[0].params[0].value === 10);
          assert.ok(ast[0].body.length === 1);
        });

        it('rule R1 maxdepth 10 > R2 { box }', function() {
          try {
            const source = 'rule R1 maxdepth 10.1 > R2 { box }';
            const ast = parser.parse(source);
          } catch (e) {

          }
        });

        it('rule R1 md 10.1 > R2 { box }', function() {
          try {
            const source = 'rule R1 md 10.1 > R2 { box }';
            const ast = parser.parse(source);
          } catch (e) {

          }
        });

        it('rule R1 maxdepth 10.1 { box }', function() {
          try {
            const source = 'rule R1 maxdepth 10.1 { box }';
            const ast = parser.parse(source);
            assert.ok(0);
          } catch (e) {

          }
        });

        it('rule R1 maxdepth ten { box }', function() {
          try {
            const source = 'rule R1 maxdepth ten { box }';
            const ast = parser.parse(source);
            assert.ok(0);
          } catch (e) {

          }
        });
      });

      describe('w / weight [float]', function() {
        it('rule R1 weight 10.1 { box }', function() {
          const source = 'rule R1 weight 10.1 { box }';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'rule');
          assert.ok(ast[0].id === 'R1');
          assert.ok(ast[0].params[0].key === 'weight');
          assert.ok(ast[0].params[0].value === 10.1);
          assert.ok(ast[0].body.length === 1);
        });

        it('rule R1 w 10.1 { box }', function() {
          const source = 'rule R1 w 10.1 { box }';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'rule');
          assert.ok(ast[0].id === 'R1');
          assert.ok(ast[0].params[0].key === 'weight');
          assert.ok(ast[0].params[0].value === 10.1);
          assert.ok(ast[0].body.length === 1);
        });

        it('rule R1 weight 10.1 { box }', function() {
          try {
            const source = 'rule R1 weight 10 { box }';
            const ast = parser.parse(source);
          } catch (e) {

          }
        });

        it('rule R1 w 10.1 { box }', function() {
          try {
            const source = 'rule R1 w 10 { box }';
            const ast = parser.parse(source);
          } catch (e) {

          }
        });
      });
    });

    describe('in regard to "Geometrical Transformations"', function() {
      describe('x [float]', function() {
        it('{ x 1.2 } box', function() {
          const source = '{ x 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'xshift');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });
      });

      describe('y [float]', function() {
        it('{ y 1.2 } box', function() {
          const source = '{ y 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'yshift');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });
      });

      describe('z [float]', function() {
        it('{ z 1.2 } box', function() {
          const source = '{ z 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'zshift');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });
      });

      describe('rx [float]', function() {
        it('{ rx 1.2 } box', function() {
          const source = '{ rx 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'rotatex');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });
      });

      describe('ry [float]', function() {
        it('{ ry 1.2 } box', function() {
          const source = '{ ry 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'rotatey');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });
      });

      describe('rz [float]', function() {
        it('{ rz 1.2 } box', function() {
          const source = '{ rz 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'rotatez');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });
      });

      describe('s [float]', function() {
        it('{ s 1.2 } box', function() {
          const source = '{ s 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'size');
          assert.ok(ast[0].exprs[0].right.properties[0].value.x === 1.2);
          assert.ok(ast[0].exprs[0].right.properties[0].value.y === 1.2);
          assert.ok(ast[0].exprs[0].right.properties[0].value.z === 1.2);
          assert.ok(ast[0].computed);
        });
      });

      describe('s [f1] [f2] [f3]', function() {
        it('{ s 2.1 2.2 2.3 } box', function() {
          const source = '{ s 2.1 2.2 2.3 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'size');
          assert.ok(ast[0].exprs[0].right.properties[0].value.x === 2.1);
          assert.ok(ast[0].exprs[0].right.properties[0].value.y === 2.2);
          assert.ok(ast[0].exprs[0].right.properties[0].value.z === 2.3);
          assert.ok(ast[0].computed);
        });
      });

      describe('m [f1] ... [f9]', function() {
        it('{ s 2.1 2.2 2.3 } box', function() {
          const source = '{ m 2.1 2.2 2.3 2.4 2.5 2.6 2.7 2.8 2.9 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'matrix');
          assert.ok(ast[0].exprs[0].right.properties[0].value[0] === 2.1);
          assert.ok(ast[0].exprs[0].right.properties[0].value[1] === 2.2);
          assert.ok(ast[0].exprs[0].right.properties[0].value[2] === 2.3);
          assert.ok(ast[0].exprs[0].right.properties[0].value[3] === 2.4);
          assert.ok(ast[0].exprs[0].right.properties[0].value[4] === 2.5);
          assert.ok(ast[0].exprs[0].right.properties[0].value[5] === 2.6);
          assert.ok(ast[0].exprs[0].right.properties[0].value[6] === 2.7);
          assert.ok(ast[0].exprs[0].right.properties[0].value[7] === 2.8);
          assert.ok(ast[0].exprs[0].right.properties[0].value[8] === 2.9);
          assert.ok(ast[0].computed);
        });
      });
    });

    describe('in regard to "Color Space Transformations"', function() {
      describe('h / hue [float]', function() {
        it('{ h 1.2 } box', function() {
          const source = '{ h 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'hue');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });

        it('{ hue 1.2 } box', function() {
          const source = '{ hue 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'hue');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });
      });

      describe('sat / saturation [float]', function() {
        it('{ sat 1.2 } box', function() {
          const source = '{ sat 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'saturation');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });

        it('{ saturation 1.2 } box', function() {
          const source = '{ saturation 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'saturation');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });
      });

      describe('b / brightness [float]', function() {
        it('{ b 1.2 } box', function() {
          const source = '{ b 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'brightness');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });

        it('{ brightness 1.2 } box', function() {
          const source = '{ brightness 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'brightness');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });
      });

      describe('a / alpha [float]', function() {
        it('{ a 1.2 } box', function() {
          const source = '{ a 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'alpha');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });

        it('{ alpha 1.2 } box', function() {
          const source = '{ alpha 1.2 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'alpha');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 1.2);
          assert.ok(ast[0].computed);
        });
      });

      describe('color [float]', function() {
        it('{ color #fff } box', function() {
          const source = '{ color #fff } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'color');
          assert.ok(ast[0].exprs[0].right.properties[0].value === '#fff');
          assert.ok(ast[0].computed);
        });

        it('{ color #ffffff } box', function() {
          const source = '{ color #ffffff } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'color');
          assert.ok(ast[0].exprs[0].right.properties[0].value === '#ffffff');
          assert.ok(ast[0].computed);
        });

        it('{ color red } box', function() {
          const source = '{ color red } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'color');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 'red');
          assert.ok(ast[0].computed);
        });

        it('{ color random } box', function() {
          const source = '{ color random } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'color');
          assert.ok(ast[0].exprs[0].right.properties[0].value === 'random');
          assert.ok(ast[0].computed);
        });
      });

      describe('blend [color] [strength]', function() {
        it('{ blend #fff 0.5 } box', function() {
          const source = '{ blend #fff 0.5 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'blend');
          assert.ok(ast[0].exprs[0].right.properties[0].color === '#fff');
          assert.ok(ast[0].exprs[0].right.properties[0].strength === 0.5);
          assert.ok(ast[0].computed);
        });

        it('{ blend #ffffff 0.5 } box', function() {
          const source = '{ blend #ffffff 0.5 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'blend');
          assert.ok(ast[0].exprs[0].right.properties[0].color === '#ffffff');
          assert.ok(ast[0].exprs[0].right.properties[0].strength === 0.5);
          assert.ok(ast[0].computed);
        });

        it('{ blend red 0.5 } box', function() {
          const source = '{ blend red 0.5 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'blend');
          assert.ok(ast[0].exprs[0].right.properties[0].color === 'red');
          assert.ok(ast[0].exprs[0].right.properties[0].strength === 0.5);
          assert.ok(ast[0].computed);
        });

        it('{ blend random 0.5 } box', function() {
          const source = '{ blend random 0.5 } box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs[0].left === 1);
          assert.ok(ast[0].exprs[0].right.properties[0].key === 'blend');
          assert.ok(ast[0].exprs[0].right.properties[0].color === 'random');
          assert.ok(ast[0].exprs[0].right.properties[0].strength === 0.5);
          assert.ok(ast[0].computed);
        });
      });

      describe('set color random', function() {
        it('{ set color random', function() {
          const source = 'set color random';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'color');
          assert.ok(ast[0].value === 'random');
        });
      });

      describe('set colorpool [scheme]', function() {
        it('{ set colorpool randomhue', function() {
          const source = 'set colorpool randomhue';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'colorpool');
          assert.ok(ast[0].value === 'randomhue');
        });

        it('{ set colorpool randomhue', function() {
          const source = 'set colorpool randomhue';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'colorpool');
          assert.ok(ast[0].value === 'randomhue');
        });

        it('{ set colorpool randomhue', function() {
          const source = 'set colorpool greyscale';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'colorpool');
          assert.ok(ast[0].value === 'greyscale');
        });

        it('{ set colorpool image:filename.png', function() {
          const source = 'set colorpool image:filename.png';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'colorpool');
          assert.ok(ast[0].value === 'image:filename.png');
        });

        it('{ set colorpool list:orange,white,grey', function() {
          const source = 'set colorpool list:orange,white,grey';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'set');
          assert.ok(ast[0].key === 'colorpool');
          assert.ok(ast[0].value === 'list:orange,white,grey');
        });
      });
    });

    describe('in regard to "Drawing Primitives"', function() {
      describe('box', function() {
        it('box', function() {
          const source = 'box';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'box');
          assert.ok(ast[0].exprs.length === 0);
          assert.ok(ast[0].computed === true);
        });
      });

      describe('grid', function() {
        it('grid', function() {
          const source = 'grid';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'grid');
          assert.ok(ast[0].exprs.length === 0);
          assert.ok(ast[0].computed === true);
        });
      });

      describe('sphere', function() {
        it('sphere', function() {
          const source = 'sphere';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'sphere');
          assert.ok(ast[0].exprs.length === 0);
          assert.ok(ast[0].computed === true);
        });
      });

      describe('line', function() {
        it('line', function() {
          const source = 'line';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'line');
          assert.ok(ast[0].exprs.length === 0);
          assert.ok(ast[0].computed === true);
        });
      });

      describe('point', function() {
        it('point', function() {
          const source = 'point';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'point');
          assert.ok(ast[0].exprs.length === 0);
          assert.ok(ast[0].computed === true);
        });
      });

      describe('triangle', function() {
        it('triangle', function() {
          const source = 'triangle';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'triangle');
          assert.ok(ast[0].exprs.length === 0);
          assert.ok(ast[0].computed === true);
        });
      });

      describe('mesh', function() {
        it('mesh', function() {
          const source = 'mesh';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'mesh');
          assert.ok(ast[0].exprs.length === 0);
          assert.ok(ast[0].computed === true);
        });
      });

      describe('cylinder', function() {
        it('cylinder', function() {
          const source = 'cylinder';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'cylinder');
          assert.ok(ast[0].exprs.length === 0);
          assert.ok(ast[0].computed === true);
        });
      });

      describe('tube', function() {
        it('tube', function() {
          const source = 'tube';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'statement');
          assert.ok(ast[0].id === 'tube');
          assert.ok(ast[0].exprs.length === 0);
          assert.ok(ast[0].computed === true);
        });
      });
    });

    describe('in regard to "preprocessor commands"', function() {
      describe('define', function() {
        it('#define varname 1.2', function() {
          const source = '#define varname 1.2';
          const ast = parser.parse(source);
          assert.ok(ast[0].type === 'define');
          assert.ok(ast[0].varname === 'varname');
          assert.ok(ast[0].value === 1.2);
        });
      });
    });
  });
});
