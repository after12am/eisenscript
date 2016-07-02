require('./.color');

var sprintf = require('sprintf').sprintf;
var passed = [];
var failed = [];

function describe(title, test) {
  var no = passed.length + failed.length + 1;
  try {
    test();
    console.log(sprintf("%3s. %s => success".verbose, no, title));
    passed.push(title);
  } catch (e) {
    console.log(sprintf("%3s. %s => failure".error, no, title));
    failed.push(title);
    console.log(e)
  }
}

function run(test) {
  require(sprintf('./%s', test));
}

function report() {
  console.log(sprintf(
    passed.length === passed.length + failed.length ? "\n[%s/%s]".info : "\n[%s/%s]".error, 
    passed.length, 
    passed.length + failed.length
  ));
}

module.exports = {
  describe: describe,
  run: run,
  report: report
}