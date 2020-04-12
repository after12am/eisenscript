/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[5,18,29,31,32,33,34,35,36,43,44,47,77,78,79,80,81,82,83,84,85,86,87],$V1=[29,47,77,78,79,80,81,82,83,84,85,86,87],$V2=[2,57],$V3=[1,19],$V4=[1,17],$V5=[1,18],$V6=[1,20],$V7=[1,21],$V8=[1,22],$V9=[1,32],$Va=[1,37],$Vb=[1,38],$Vc=[1,39],$Vd=[1,40],$Ve=[1,55],$Vf=[1,71],$Vg=[5,18,29,31,32,33,34,35,36,43,44,47,49,63,64,65,66,67,68,69,70,77,78,79,80,81,82,83,84,85,86,87],$Vh=[5,18,19,29,31,32,33,34,35,36,43,44,47,49,51,52,63,64,65,66,67,68,69,70,71,72,74,77,78,79,80,81,82,83,84,85,86,87],$Vi=[19,47,51],$Vj=[5,18,29,31,32,33,34,35,36,43,44,47,49,77,78,79,80,81,82,83,84,85,86,87],$Vk=[18,31,32,33,34,35,36,49,63,64,65,66,67,68,69,70],$Vl=[29,47,49,77,78,79,80,81,82,83,84,85,86,87];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"eisenscript":3,"lines":4,"EOF":5,"line":6,"maxdepth":7,"maxobjects":8,"minsize":9,"maxsize":10,"seed":11,"background":12,"color":13,"colorpool":14,"define":15,"rule":16,"statement":17,"SET":18,"MAXDEPTH":19,"num":20,"MAXOBJECTS":21,"MINSIZE":22,"MAXSIZE":23,"SEED":24,"INITIAL":25,"BACKGROUND":26,"COLOR3":27,"COLOR6":28,"STRING":29,"RANDOM":30,"COLOR":31,"HUE":32,"ALPHA":33,"BLEND":34,"SATURATION":35,"BRIGHTNESS":36,"COLORPOOL":37,"RANDOMHUE":38,"RANDOMRGB":39,"GREYSCALE":40,"COLORLIST":41,"IMAGE":42,"DEFINE":43,"RULE":44,"id":45,"modifiers":46,"{":47,"statements":48,"}":49,"modifier":50,"WEIGHT":51,">":52,"rulename":53,"expressions":54,"primitive":55,"expression":56,"object":57,"n":58,"*":59,"properties":60,"property":61,"geo":62,"XSHIFT":63,"YSHIFT":64,"ZSHIFT":65,"ROTATEX":66,"ROTATEY":67,"ROTATEZ":68,"SIZE":69,"MATRIX":70,"+":71,"-":72,"/":73,"(":74,"e":75,")":76,"NUMBER":77,"BOX":78,"SPHERE":79,"GRID":80,"LINE":81,"POINT":82,"TRIANGLE":83,"MESH":84,"CYLINDER":85,"TUBE":86,"SQUASH":87,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",18:"SET",19:"MAXDEPTH",21:"MAXOBJECTS",22:"MINSIZE",23:"MAXSIZE",24:"SEED",25:"INITIAL",26:"BACKGROUND",27:"COLOR3",28:"COLOR6",29:"STRING",30:"RANDOM",31:"COLOR",32:"HUE",33:"ALPHA",34:"BLEND",35:"SATURATION",36:"BRIGHTNESS",37:"COLORPOOL",38:"RANDOMHUE",39:"RANDOMRGB",40:"GREYSCALE",41:"COLORLIST",42:"IMAGE",43:"DEFINE",44:"RULE",47:"{",49:"}",51:"WEIGHT",52:">",59:"*",63:"XSHIFT",64:"YSHIFT",65:"ZSHIFT",66:"ROTATEX",67:"ROTATEY",68:"ROTATEZ",69:"SIZE",70:"MATRIX",71:"+",72:"-",73:"/",74:"(",75:"e",76:")",77:"NUMBER",78:"BOX",79:"SPHERE",80:"GRID",81:"LINE",82:"POINT",83:"TRIANGLE",84:"MESH",85:"CYLINDER",86:"TUBE",87:"SQUASH"},
productions_: [0,[3,2],[4,2],[4,0],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,3],[9,3],[10,3],[11,3],[11,3],[12,3],[12,3],[12,3],[12,3],[13,3],[13,2],[13,2],[13,2],[13,2],[13,2],[13,2],[13,2],[13,2],[13,3],[13,3],[13,3],[13,3],[13,2],[13,2],[14,3],[14,3],[14,3],[14,3],[14,3],[15,3],[16,6],[46,2],[46,0],[50,2],[50,2],[50,4],[48,2],[48,0],[17,2],[17,2],[54,2],[54,0],[56,1],[56,3],[57,3],[60,2],[60,0],[61,1],[61,1],[62,2],[62,2],[62,2],[62,2],[62,2],[62,2],[62,2],[62,4],[62,10],[62,2],[62,2],[62,2],[62,2],[62,2],[62,2],[62,2],[62,4],[62,10],[20,1],[20,2],[20,2],[20,3],[20,3],[20,4],[20,4],[20,3],[58,1],[45,1],[53,1],[55,1],[55,1],[55,1],[55,1],[55,1],[55,1],[55,1],[55,1],[55,1],[55,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = $$[$0-1]; return this.$; 
break;
case 2: case 47: case 52: case 56:
 this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 3: case 48: case 53: case 57: case 62:
 this.$ = []; 
break;
case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13:
 this.$ = $$[$0]; 
break;
case 14:
 this.$ = $$[$0]; $$[$0].computed = true; 
break;
case 15:
 this.$ = { type: 'set', key: 'maxdepth', value: $$[$0] }; 
break;
case 16:
 this.$ = { type: 'set', key: 'maxobjects', value: $$[$0] }; 
break;
case 17:
 this.$ = { type: 'set', key: 'minsize', value: $$[$0] }; 
break;
case 18:
 this.$ = { type: 'set', key: 'maxsize', value: $$[$0] }; 
break;
case 19: case 20:
 this.$ = { type: 'set', key: 'seed', value: $$[$0] }; 
break;
case 21: case 22: case 23: case 24:
 this.$ = { type: 'set', key: 'background', value: $$[$0].toLowerCase() }; 
break;
case 25:
 this.$ = { type: 'set', key: 'color', value: $$[$0].toLowerCase() }; 
break;
case 26: case 27:
 this.$ = { type: 'property', key: 'hue',   value: $$[$0] }; 
break;
case 28: case 29:
 this.$ = { type: 'property', key: 'alpha', value: $$[$0] }; 
break;
case 30: case 31: case 32: case 33:
 this.$ = { type: 'property', key: 'color', value: $$[$0].toLowerCase() }; 
break;
case 34: case 35: case 36: case 37:
 this.$ = { type: 'property', key: 'blend', color: $$[$0-1].toLowerCase(), strength: $$[$0] }; 
break;
case 38:
 this.$ = { type: 'property', key: 'saturation', value: $$[$0] }; 
break;
case 39:
 this.$ = { type: 'property', key: 'brightness', value: $$[$0] }; 
break;
case 40: case 41: case 42: case 43: case 44:
 this.$ = { type: 'set', key: 'colorpool', value: $$[$0].toLowerCase() }; 
break;
case 45:
 this.$ = { type: 'define', varname: $$[$0-1], value: $$[$0] }; 
break;
case 46:
 this.$ = { type: 'rule', id: $$[$0-4], params: $$[$0-3], body: $$[$0-1] }; 
break;
case 49:
 this.$ = { type: 'modifier', key: 'weight',   value: $$[$0] }; 
break;
case 50:
 this.$ = { type: 'modifier', key: 'maxdepth', value: $$[$0] }; 
break;
case 51:
 this.$ = { type: 'modifier', key: 'maxdepth', value: $$[$0-2], alternate: $$[$0]}; 
break;
case 54:
 this.$ = { type: 'primitive', id: $$[$0], exprs: $$[$0-1] }; 
break;
case 55:
 this.$ = { type: 'statement', id: $$[$0], exprs: $$[$0-1] }; 
break;
case 58:
 this.$ = { type: 'expr', left:  1, right: $$[$0] }; 
break;
case 59:
 this.$ = { type: 'expr', left: $$[$0-2], right: $$[$0] }; 
break;
case 60:
 this.$ = { type: 'object', properties: $$[$0-1] }; 
break;
case 61:
 type: 'property', this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 65: case 74:
 this.$ = { type: 'property', key: 'xshift',  value: $$[$0] }; 
break;
case 66: case 75:
 this.$ = { type: 'property', key: 'yshift',  value: $$[$0] }; 
break;
case 67: case 76:
 this.$ = { type: 'property', key: 'zshift',  value: $$[$0] }; 
break;
case 68: case 77:
 this.$ = { type: 'property', key: 'rotatex', value: $$[$0] }; 
break;
case 69: case 78:
 this.$ = { type: 'property', key: 'rotatey', value: $$[$0] }; 
break;
case 70: case 79:
 this.$ = { type: 'property', key: 'rotatez', value: $$[$0] }; 
break;
case 71: case 80:
 this.$ = { type: 'property', key: 'size',    value: { x: $$[$0], y: $$[$0], z: $$[$0] } }; 
break;
case 72: case 81:
 this.$ = { type: 'property', key: 'size',    value: { x: $$[$0-2], y: $$[$0-1], z: $$[$0] } }; 
break;
case 73: case 82:
 this.$ = { type: 'property', key: 'matrix', value: [$$[$0-8], $$[$0-7], $$[$0-6], $$[$0-5], $$[$0-4], $$[$0-3], $$[$0-2], $$[$0-1], $$[$0]] }; 
break;
case 84:
 this.$ =  $$[$0]; 
break;
case 85:
 this.$ = -$$[$0]; 
break;
case 86:
 this.$ =  $$[$0-2]*$$[$0]; 
break;
case 87:
 this.$ =  $$[$0-2]/$$[$0]; 
break;
case 88:
 this.$ = -$$[$0-2]*$$[$0]; 
break;
case 89:
 this.$ = -$$[$0-2]/$$[$0]; 
break;
case 90:
 this.$ =  $$[$0-1]; 
break;
case 91:
 this.$ = parseFloat(yytext); 
break;
case 92: case 94: case 95: case 96: case 97: case 98: case 99: case 100: case 101: case 102: case 103:
 this.$ = yytext; 
break;
case 93:
this.$ = $$[$0]; 
break;
}
},
table: [o($V0,[2,3],{3:1,4:2}),{1:[3]},o($V1,$V2,{6:4,7:5,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,54:25,5:[1,3],18:[1,16],31:$V3,32:$V4,33:$V5,34:$V6,35:$V7,36:$V8,43:[1,23],44:[1,24]}),{1:[2,1]},o($V0,[2,2]),o($V0,[2,4]),o($V0,[2,5]),o($V0,[2,6]),o($V0,[2,7]),o($V0,[2,8]),o($V0,[2,9]),o($V0,[2,10]),o($V0,[2,11]),o($V0,[2,12]),o($V0,[2,13]),o($V0,[2,14]),{19:[1,26],21:[1,27],22:[1,28],23:[1,29],24:[1,30],26:[1,31],31:$V9,37:[1,33]},{20:34,29:[1,35],58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:41,29:[1,42],58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{27:[1,43],28:[1,44],29:[1,46],30:[1,45]},{27:[1,47],28:[1,48],29:[1,50],30:[1,49]},{20:51,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:52,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{29:[1,53]},{29:$Ve,45:54},{29:$Ve,45:57,47:$Vf,55:56,56:58,57:69,58:70,77:$Vd,78:[1,59],79:[1,60],80:[1,61],81:[1,62],82:[1,63],83:[1,64],84:[1,65],85:[1,66],86:[1,67],87:[1,68]},{20:72,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:73,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:74,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:75,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:76,25:[1,77],58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{27:[1,78],28:[1,79],29:[1,80],30:[1,81]},{30:[1,82]},{38:[1,83],39:[1,84],40:[1,85],41:[1,86],42:[1,87]},o($Vg,[2,26]),o($Vg,[2,27]),o($Vh,[2,83],{59:[1,88],73:[1,89]}),{58:90,77:$Vd},{58:91,77:$Vd},{75:[1,92]},o([5,18,19,29,31,32,33,34,35,36,43,44,47,49,51,52,59,63,64,65,66,67,68,69,70,71,72,73,74,77,78,79,80,81,82,83,84,85,86,87],[2,91]),o($Vg,[2,28]),o($Vg,[2,29]),o($Vg,[2,30]),o($Vg,[2,31]),o($Vg,[2,32]),o($Vg,[2,33]),{20:93,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:94,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:95,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:96,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},o($Vg,[2,38]),o($Vg,[2,39]),{20:97,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},o($Vi,[2,48],{46:98}),o([5,18,19,29,31,32,33,34,35,36,43,44,47,49,51,77,78,79,80,81,82,83,84,85,86,87],[2,92]),o($Vj,[2,54]),o($Vj,[2,55]),o($V1,[2,56]),o($Vj,[2,94]),o($Vj,[2,95]),o($Vj,[2,96]),o($Vj,[2,97]),o($Vj,[2,98]),o($Vj,[2,99]),o($Vj,[2,100]),o($Vj,[2,101]),o($Vj,[2,102]),o($Vj,[2,103]),o($V1,[2,58]),{59:[1,99]},o($Vk,[2,62],{60:100}),o($V0,[2,15]),o($V0,[2,16]),o($V0,[2,17]),o($V0,[2,18]),o($V0,[2,19]),o($V0,[2,20]),o($V0,[2,21]),o($V0,[2,22]),o($V0,[2,23]),o($V0,[2,24]),o($Vg,[2,25]),o($V0,[2,40]),o($V0,[2,41]),o($V0,[2,42]),o($V0,[2,43]),o($V0,[2,44]),{58:101,77:$Vd},{58:102,77:$Vd},o($Vh,[2,84]),o($Vh,[2,85],{59:[1,103],73:[1,104]}),{76:[1,105]},o($Vg,[2,34]),o($Vg,[2,35]),o($Vg,[2,36]),o($Vg,[2,37]),o($V0,[2,45]),{19:[1,109],47:[1,106],50:107,51:[1,108]},{47:$Vf,57:110},{13:114,18:[1,123],31:$V3,32:$V4,33:$V5,34:$V6,35:$V7,36:$V8,49:[1,111],61:112,62:113,63:[1,115],64:[1,116],65:[1,117],66:[1,118],67:[1,119],68:[1,120],69:[1,121],70:[1,122]},o($Vh,[2,86]),o($Vh,[2,87]),{58:124,77:$Vd},{58:125,77:$Vd},o($Vh,[2,90]),o($Vl,[2,53],{48:126}),o($Vi,[2,47]),{20:127,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:128,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},o($V1,[2,59]),o($V1,[2,60]),o($Vk,[2,61]),o($Vk,[2,63]),o($Vk,[2,64]),{20:129,29:[1,130],58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:131,29:[1,132],58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:133,29:[1,134],58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:135,29:[1,136],58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:137,29:[1,138],58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:139,29:[1,140],58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:141,29:[1,142],58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{20:143,29:[1,144],58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{31:$V9},o($Vh,[2,88]),o($Vh,[2,89]),o($V1,$V2,{54:25,17:146,49:[1,145]}),o($Vi,[2,49]),o($Vi,[2,50],{52:[1,147]}),o($Vk,[2,65]),o($Vk,[2,74]),o($Vk,[2,66]),o($Vk,[2,75]),o($Vk,[2,67]),o($Vk,[2,76]),o($Vk,[2,68]),o($Vk,[2,77]),o($Vk,[2,69]),o($Vk,[2,78]),o($Vk,[2,70]),o($Vk,[2,79]),o($Vk,[2,71],{58:36,20:148,71:$Va,72:$Vb,74:$Vc,77:$Vd}),o($Vk,[2,80],{29:[1,149]}),{20:150,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{29:[1,151]},o($V0,[2,46]),o($Vl,[2,52]),{29:[1,153],53:152},{20:154,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{29:[1,155]},{20:156,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{29:[1,157]},o($Vi,[2,51]),o($Vi,[2,93]),o($Vk,[2,72]),o($Vk,[2,81]),{20:158,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{29:[1,159]},{20:160,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{29:[1,161]},{20:162,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{29:[1,163]},{20:164,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{29:[1,165]},{20:166,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{29:[1,167]},{20:168,58:36,71:$Va,72:$Vb,74:$Vc,77:$Vd},{29:[1,169]},o($Vk,[2,73]),o($Vk,[2,82])],
defaultActions: {3:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip */
break;
case 1:/* ignore comment */
break;
case 2:/* ignore comment */
break;
case 3:return 18
break;
case 4:return 51;
break;
case 5:return 51;
break;
case 6:return 19;
break;
case 7:return 19;
break;
case 8:return 21;
break;
case 9:return 22;
break;
case 10:return 23;
break;
case 11:return 24;
break;
case 12:return 25;
break;
case 13:return 26;
break;
case 14:return 37;
break;
case 15:return 44;
break;
case 16:return 52;
break;
case 17:return 47;
break;
case 18:return 49;
break;
case 19:return '[';
break;
case 20:return ']';
break;
case 21:return '^';
break;
case 22:return 59;
break;
case 23:return 73;
break;
case 24:return 71;
break;
case 25:return 72;
break;
case 26:return 74;
break;
case 27:return 76;
break;
case 28:return ',';
break;
case 29:return 63;
break;
case 30:return 64;
break;
case 31:return 65;
break;
case 32:return 66;
break;
case 33:return 67;
break;
case 34:return 68;
break;
case 35:return 69;
break;
case 36:return 70;
break;
case 37:return 70;
break;
case 38:return 32;
break;
case 39:return 32;
break;
case 40:return 35;
break;
case 41:return 35;
break;
case 42:return 36;
break;
case 43:return 36;
break;
case 44:return 33;
break;
case 45:return 33;
break;
case 46:return 31;
break;
case 47:return 30;
break;
case 48:return 34;
break;
case 49:return 38;
break;
case 50:return 39;
break;
case 51:return 40;
break;
case 52:return 5;
break;
case 53:return 77;
break;
case 54:return 77;
break;
case 55:return 41;
break;
case 56:return 42;
break;
case 57:return 78;
break;
case 58:return 80;
break;
case 59:return 79;
break;
case 60:return 81;
break;
case 61:return 82;
break;
case 62:return 83;
break;
case 63:return 84;
break;
case 64:return 85;
break;
case 65:return 86;
break;
case 66:return 87;
break;
case 67:return 29;
break;
case 68:return 43;
break;
case 69:return 28;
break;
case 70:return 27;
break;
}
},
rules: [/^(?:\s+)/,/^(?:\/\/.*)/,/^(?:\/\*[\w\W]*?\*\/)/,/^(?:set\b)/,/^(?:w\b)/,/^(?:weight\b)/,/^(?:md\b)/,/^(?:maxdepth\b)/,/^(?:maxobjects\b)/,/^(?:minsize\b)/,/^(?:maxsize\b)/,/^(?:seed\b)/,/^(?:initial\b)/,/^(?:background\b)/,/^(?:colorpool\b)/,/^(?:rule\b)/,/^(?:>)/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:\^)/,/^(?:\*)/,/^(?:\/)/,/^(?:\+)/,/^(?:-)/,/^(?:\()/,/^(?:\))/,/^(?:,)/,/^(?:x\b)/,/^(?:y\b)/,/^(?:z\b)/,/^(?:rx\b)/,/^(?:ry\b)/,/^(?:rz\b)/,/^(?:s\b)/,/^(?:m\b)/,/^(?:matrix\b)/,/^(?:hue\b)/,/^(?:h\b)/,/^(?:saturation\b)/,/^(?:sat\b)/,/^(?:brightness\b)/,/^(?:b\b)/,/^(?:alpha\b)/,/^(?:a\b)/,/^(?:color\b)/,/^(?:random\b)/,/^(?:blend\b)/,/^(?:randomhue\b)/,/^(?:randomrgb\b)/,/^(?:greyscale\b)/,/^(?:$)/,/^(?:[0-9]+(\.[0-9]*)?)/,/^(?:\.[0-9]+)/,/^(?:list:[\w,#]+)/,/^(?:image:[\w\.\w]+)/,/^(?:box\b)/,/^(?:grid\b)/,/^(?:sphere\b)/,/^(?:line\b)/,/^(?:point\b)/,/^(?:triangle\b)/,/^(?:mesh\b)/,/^(?:cylinder\b)/,/^(?:tube\b)/,/^(?:squash\b)/,/^(?:[a-zA-Z_]+[a-zA-Z0-9_]*)/,/^(?:#define\b)/,/^(?:#[a-fA-F0-9]{6})/,/^(?:#[a-fA-F0-9]{3})/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}