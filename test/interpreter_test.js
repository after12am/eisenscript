'use strict';

const { assert } = require('chai');
const fs = require('fs');
const parser = require('../src/parser');
const Interpreter = require('../src/interpreter');

// prettify json and dump
function dump(object, replacer, space) {
  replacer = replacer || null;
  space = space || 2;
  return JSON.stringify(object, replacer, space);
}

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

// set output of interpret against expectation
function check({ source, expected }) {
  return Promise.resolve()
  .then(() => {
    const output = compile(source);
    assert.deepEqual(JSON.stringify(output), expected);
  });
}

function shouldBeCorrect(testset) {
  it(testset.split('/')[1], function() {
    return read(testset)
    .then(check);
  });
}

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
      'primitive/box.es'
    ];

    tests.forEach(shouldBeCorrect);
  });

  describe('#maxdepth', function() {

    const tests = [
      'maxdepth/nested_recursive_rule.es',
      'maxdepth/nested_transform.es',
      'maxdepth/alternate_rule.es',
      'maxdepth/parallel_traverse.es',
    ];

    tests.forEach(shouldBeCorrect);
  });
});
