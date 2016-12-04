// TODO: move to parser.jison
var Primitive = {
  Box: 'box',
  Grid: 'grid',
  Sphere: 'sphere',
  Line: 'line',
  Point: 'point',
  Triangle: 'triangle',
  Mesh: 'mesh',
  Cylinder: 'cylinder',
  Tube: 'tube',
  Squash: 'squash'
};

if (module) {
  module.exports = Primitive;
}
