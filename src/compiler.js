import parser from './parser';
import Interpreter from './Interpreter';

export default class Compiler {
  /**
   * convert eisenscript code to intermediate object that is possible to load 3d renderer.
   *
   * @description parse eisenscript code and interpret the result while scanning the ast.
   * @param {String} source eisenscript
   * @return {Object} execution result
   * <pre>
   * new Compiler().compile('2 * { x 1 } box');
   * </pre>
   */
  compile(source) {
    var interpreter = new Interpreter();
    return interpreter.generate(this.parse(source));
  }

  /**
   * parse eisenscript code
   *
   * @description parse eisenscript code and get [ast](https://en.wikipedia.org/wiki/Abstract_syntax_tree).
   * @param {String} source eisenscript
   * @return {Object} ast
   * <pre>
   * new Compiler().parse('2 * { x 1 } box');
   * </pre>
   */
  parse(source) {
    return parser.parse(source);
  }
}
