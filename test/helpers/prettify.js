'use strict';

// prettify json and dump
module.exports = function(object, replacer, space) {
  replacer = replacer || null;
  space = space || 2;
  return JSON.stringify(object, replacer, space);
}
