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
      'primitive/box.es'
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
});
