'use strict';

const { assert } = require('chai');
const fs = require('fs');
const parser = require('../../src/parser');
const Interpreter = require('../../src/Interpreter');

// read testset from testset directory
function read(testset, encoding = 'utf8') {
  return Promise.resolve()
  .then(() => {
    return fs.readFileSync(`test/testset/${testset}`, encoding);
  })
  .then((data) => {
    const m = data.trim().match(/^\/\+\n([\s\S.]*)\n\+\/\n([\s\S.]*)/);
    if (m) {
      return {
        source: m[1],
        expected: m[2]
      };
    }
    return Promise.reject(new Error(`testset format is not correct: ${testset}`));
  });
}

// compile eisenscript code and return intermediate object
function compile(source) {
  const ast = parser.parse(source);
  const interpreter = new Interpreter();
  const object = interpreter.generate(ast);
  // console.log(JSON.stringify(object));
  return object;
}

module.exports = function(testset) {
  it(testset.split('/')[1], function() {
    return read(testset)
    .then(({ source, expected }) => {
      const output = compile(source);
      assert.deepEqual(JSON.stringify(output), expected);
    });
  });
}
