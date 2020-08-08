%lex
%%

\s+                       /* skip */
"//".*                    /* ignore comment */
"/*"[\w\W]*?"*/"          /* ignore comment */

"set"                     return 'SET'
"w"                       return 'WEIGHT';
"weight"                  return 'WEIGHT';
"md"                      return 'MAXDEPTH';
"maxdepth"                return 'MAXDEPTH';
"maxobjects"              return 'MAXOBJECTS';
"minsize"                 return 'MINSIZE';
"maxsize"                 return 'MAXSIZE';
"seed"                    return 'SEED';
"initial"                 return 'INITIAL';
"background"              return 'BACKGROUND';
"colorpool"               return 'COLORPOOL';
"rule"                    return 'RULE';
"Rule"                    return 'RULE';
">"                       return '>';
"{"                       return '{';
"}"                       return '}';
"["                       return '[';
"]"                       return ']';
"^"                       return '^';
"*"                       return '*';
"/"                       return '/';
"+"                       return '+';
"-"                       return '-';
"("                       return '(';
")"                       return ')';
","                       return ',';
"x"                       return 'XSHIFT';
"y"                       return 'YSHIFT';
"z"                       return 'ZSHIFT';
"rx"                      return 'ROTATEX';
"ry"                      return 'ROTATEY';
"rz"                      return 'ROTATEZ';
"fx"                      return 'FX';
"fy"                      return 'FY';
"fz"                      return 'FZ';
"s"                       return 'SIZE';
"m"                       return 'MATRIX';
"matrix"                  return 'MATRIX';
"hue"                     return 'HUE';
"h"                       return 'HUE';
"saturation"              return 'SATURATION';
"sat"                     return 'SATURATION';
"brightness"              return 'BRIGHTNESS';
"b"                       return 'BRIGHTNESS';
"alpha"                   return 'ALPHA';
"a"                       return 'ALPHA';
"color"                   return 'COLOR';
"random"                  return 'RANDOM';
"blend"                   return 'BLEND';
"randomhue"               return 'RANDOMHUE';
"randomrgb"               return 'RANDOMRGB';
"greyscale"               return 'GREYSCALE';
<<EOF>>                   return 'EOF';
[0-9]+("."[0-9]*)?        return 'NUMBER';
"."[0-9]+                 return 'NUMBER';
"list:"[\w,#]+            return 'COLORLIST';
"image:"[\w\.\w]+         return 'IMAGE';
"box"                     return 'BOX';
"grid"                    return 'GRID';
"sphere"                  return 'SPHERE';
"line"                    return 'LINE';
"point"                   return 'POINT';
"triangle"                return 'TRIANGLE';
"mesh"                    return 'MESH';
"cylinder"                return 'CYLINDER';
"tube"                    return 'TUBE';
"squash"                  return 'SQUASH';
(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgrey|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|grey|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgrey|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen) return 'COLORNAME';
(ALICEBLUE|ANTIQUEWHITE|AQUA|AQUAMARINE|AZURE|BEIGE|BISQUE|BLACK|BLANCHEDALMOND|BLUE|BLUEVIOLET|BROWN|BURLYWOOD|CADETBLUE|CHARTREUSE|CHOCOLATE|CORAL|CORNFLOWERBLUE|CORNSILK|CRIMSON|CYAN|DARKBLUE|DARKCYAN|DARKGOLDENROD|DARKGRAY|DARKGREY|DARKGREEN|DARKKHAKI|DARKMAGENTA|DARKOLIVEGREEN|DARKORANGE|DARKORCHID|DARKRED|DARKSALMON|DARKSEAGREEN|DARKSLATEBLUE|DARKSLATEGRAY|DARKSLATEGREY|DARKTURQUOISE|DARKVIOLET|DEEPPINK|DEEPSKYBLUE|DIMGRAY|DIMGREY|DODGERBLUE|FIREBRICK|FLORALWHITE|FORESTGREEN|FUCHSIA|GAINSBORO|GHOSTWHITE|GOLD|GOLDENROD|GRAY|GREY|GREEN|GREENYELLOW|HONEYDEW|HOTPINK|INDIANRED|INDIGO|IVORY|KHAKI|LAVENDER|LAVENDERBLUSH|LAWNGREEN|LEMONCHIFFON|LIGHTBLUE|LIGHTCORAL|LIGHTCYAN|LIGHTGOLDENRODYELLOW|LIGHTGRAY|LIGHTGREY|LIGHTGREEN|LIGHTPINK|LIGHTSALMON|LIGHTSEAGREEN|LIGHTSKYBLUE|LIGHTSLATEGRAY|LIGHTSLATEGREY|LIGHTSTEELBLUE|LIGHTYELLOW|LIME|LIMEGREEN|LINEN|MAGENTA|MAROON|MEDIUMAQUAMARINE|MEDIUMBLUE|MEDIUMORCHID|MEDIUMPURPLE|MEDIUMSEAGREEN|MEDIUMSLATEBLUE|MEDIUMSPRINGGREEN|MEDIUMTURQUOISE|MEDIUMVIOLETRED|MIDNIGHTBLUE|MINTCREAM|MISTYROSE|MOCCASIN|NAVAJOWHITE|NAVY|OLDLACE|OLIVE|OLIVEDRAB|ORANGE|ORANGERED|ORCHID|PALEGOLDENROD|PALEGREEN|PALETURQUOISE|PALEVIOLETRED|PAPAYAWHIP|PEACHPUFF|PERU|PINK|PLUM|POWDERBLUE|PURPLE|REBECCAPURPLE|RED|ROSYBROWN|ROYALBLUE|SADDLEBROWN|SALMON|SANDYBROWN|SEAGREEN|SEASHELL|SIENNA|SILVER|SKYBLUE|SLATEBLUE|SLATEGRAY|SLATEGREY|SNOW|SPRINGGREEN|STEELBLUE|TAN|TEAL|THISTLE|TOMATO|TURQUOISE|VIOLET|WHEAT|WHITE|WHITESMOKE|YELLOW|YELLOWGREEN) return 'COLORNAME';
[a-zA-Z_]+[a-zA-Z0-9_]*   return 'STRING';
"#define"                 return 'DEFINE';
"#"[a-fA-F0-9]{6}         return 'COLOR6';
"#"[a-fA-F0-9]{3}         return 'COLOR3';

/lex

%left '+' '-'
%left '*' '/'
%left '^'
%left NEG POS


////////////////////////////////////////////////////
//  EISENSCRIPT
////////////////////////////////////////////////////

%start eisenscript

%% /* language grammar */

eisenscript
  : lines EOF { $$ = $1; return $$; }
  ;

lines
  : lines line { $$ = $1; $$.push($2); }
  | { $$ = []; }
  ;

line
  : maxdepth   { $$ = $1; }
  | maxobjects { $$ = $1; }
  | minsize    { $$ = $1; }
  | maxsize    { $$ = $1; }
  | seed       { $$ = $1; }
  | background { $$ = $1; }
  | color      { $$ = $1; }
  | colorpool  { $$ = $1; }
  | define     { $$ = $1; }
  | rule       { $$ = $1; }
  | statement  { $$ = $1; $1.computed = true; }
  ;


////////////////////////////////////////////////////
//  ACTION
////////////////////////////////////////////////////

maxdepth
  : SET MAXDEPTH num { $$ = { type: 'set', key: 'maxdepth', value: $3 }; }
  ;

maxobjects
  : SET MAXOBJECTS num { $$ = { type: 'set', key: 'maxobjects', value: $3 }; }
  ;

minsize
  : SET MINSIZE num { $$ = { type: 'set', key: 'minsize', value: $3 }; }
  ;

maxsize
  : SET MAXSIZE num { $$ = { type: 'set', key: 'maxsize', value: $3 }; }
  ;

seed
  : SET SEED num     { $$ = { type: 'set', key: 'seed', value: $3 }; }
  | SET SEED INITIAL { $$ = { type: 'set', key: 'seed', value: $3 }; }
  ;

background
  : SET BACKGROUND COLOR3 { $$ = { type: 'set', key: 'background', value: $3.toLowerCase() }; }
  | SET BACKGROUND COLOR6 { $$ = { type: 'set', key: 'background', value: $3.toLowerCase() }; }
  | SET BACKGROUND COLORNAME { $$ = { type: 'set', key: 'background', value: $3.toLowerCase() }; }
  | SET BACKGROUND STRING { $$ = { type: 'set', key: 'background', value: $3.toLowerCase() }; }
  | SET BACKGROUND RANDOM { $$ = { type: 'set', key: 'background', value: $3.toLowerCase() }; }
  ;

color
  : SET COLOR RANDOM { $$ = { type: 'set', key: 'color', value: $3.toLowerCase() }; }
  ;

colorpool
  : SET COLORPOOL RANDOMHUE { $$ = { type: 'set', key: 'colorpool', value: $3.toLowerCase() }; }
  | SET COLORPOOL RANDOMRGB { $$ = { type: 'set', key: 'colorpool', value: $3.toLowerCase() }; }
  | SET COLORPOOL GREYSCALE { $$ = { type: 'set', key: 'colorpool', value: $3.toLowerCase() }; }
  | SET COLORPOOL COLORLIST { $$ = { type: 'set', key: 'colorpool', value: $3.toLowerCase() }; }
  | SET COLORPOOL IMAGE     { $$ = { type: 'set', key: 'colorpool', value: $3.toLowerCase() }; }
  ;

define
  : DEFINE STRING num       { $$ = { type: 'define', varname: $2, value: $3 }; }
  | DEFINE STRING COLOR3    { $$ = { type: 'define', varname: $2, value: $3 }; }
  | DEFINE STRING COLOR6    { $$ = { type: 'define', varname: $2, value: $3 }; }
  | DEFINE STRING COLORNAME { $$ = { type: 'define', varname: $2, value: $3 }; }
  ;

////////////////////////////////////////////////////
//  RULE
////////////////////////////////////////////////////

rule
  : RULE id modifiers '{' statements '}'  { $$ = { type: 'rule', id: $2, params: $3, body: $5 }; }
  ;

modifiers
  : modifiers modifier { $$ = $1; $$.push($2); }
  | { $$ = []; }
  ;

modifier
  : WEIGHT num                    { $$ = { type: 'modifier', key: 'weight',   value: $2 }; }
  | MAXDEPTH num                  { $$ = { type: 'modifier', key: 'maxdepth', value: $2 }; }
  | MAXDEPTH num '>' rulename     { $$ = { type: 'modifier', key: 'maxdepth', value: $2, alternate: $4}; }
  | MAXDEPTH STRING               { $$ = { type: 'modifier', key: 'maxdepth', value: $2, defined: true }; }
  | MAXDEPTH STRING '>' rulename  { $$ = { type: 'modifier', key: 'maxdepth', value: $2, alternate: $4, defined: true}; }
  ;

statements
  : statements statement { $$ = $1; $$.push($2); }
  | { $$ = []; }
  ;

statement
  : expressions primitive { $$ = { type: 'primitive', id: $2, exprs: $1 }; }
  | expressions id        { $$ = { type: 'statement', id: $2, exprs: $1 }; }
  ;

expressions
  : expressions expression { $$ = $1; $$.push($2); }
  | { $$ = []; }
  ;

expression
  : object            { $$ = { type: 'expr', left:  1, right: $1 }; }
  | n '*' object      { $$ = { type: 'expr', left: $1, right: $3 }; }
  | STRING '*' object { $$ = { type: 'expr', left: $1, right: $3 }; }
  ;

object
  : '{' properties '}' { $$ = { type: 'object', properties: $2 }; }
  ;

properties
  : properties property { type: 'property', $$ = $1; $$.push($2); }
  | { $$ = []; }
  ;

property
  : geo
  | color
  ;


////////////////////////////////////////////////////
//  ATTRIBUTE
////////////////////////////////////////////////////

geo
  : XSHIFT num       { $$ = { type: 'property', key: 'xshift',  value: $2 }; }
  | YSHIFT num       { $$ = { type: 'property', key: 'yshift',  value: $2 }; }
  | ZSHIFT num       { $$ = { type: 'property', key: 'zshift',  value: $2 }; }
  | ROTATEX num      { $$ = { type: 'property', key: 'rotatex', value: $2 }; }
  | ROTATEY num      { $$ = { type: 'property', key: 'rotatey', value: $2 }; }
  | ROTATEZ num      { $$ = { type: 'property', key: 'rotatez', value: $2 }; }
  | SIZE num         { $$ = { type: 'property', key: 'size',    value: { x: $2, y: $2, z: $2 } }; }
  | SIZE num num num { $$ = { type: 'property', key: 'size',    value: { x: $2, y: $3, z: $4 } }; }
  | MATRIX num num num num num num num num num { $$ = { type: 'property', key: 'matrix', value: [$2, $3, $4, $5, $6, $7, $8, $9, $10] }; }
  | XSHIFT STRING    { $$ = { type: 'property', key: 'xshift',  value: $2, defined: true }; }
  | YSHIFT STRING    { $$ = { type: 'property', key: 'yshift',  value: $2, defined: true }; }
  | ZSHIFT STRING    { $$ = { type: 'property', key: 'zshift',  value: $2, defined: true }; }
  | ROTATEX STRING   { $$ = { type: 'property', key: 'rotatex', value: $2, defined: true }; }
  | ROTATEY STRING   { $$ = { type: 'property', key: 'rotatey', value: $2, defined: true }; }
  | ROTATEZ STRING   { $$ = { type: 'property', key: 'rotatez', value: $2, defined: true }; }
  | FX               { $$ = { type: 'property', key: 'fx' }; }
  | FY               { $$ = { type: 'property', key: 'fy' }; }
  | FZ               { $$ = { type: 'property', key: 'fz' }; }
  | SIZE STRING      { $$ = { type: 'property', key: 'size',    value: { x: $2, y: $2, z: $2 }, defined: true }; }
  | SIZE STRING STRING STRING { $$ = { type: 'property', key: 'size',    value: { x: $2, y: $3, z: $4 }, defined: true }; }
  | MATRIX STRING STRING STRING STRING STRING STRING STRING STRING STRING { $$ = { type: 'property', key: 'matrix', value: [$2, $3, $4, $5, $6, $7, $8, $9, $10], defined: true }; }
  ;

color
  : HUE num           { $$ = { type: 'property', key: 'hue',   value: $2 }; }
  | HUE STRING        { $$ = { type: 'property', key: 'hue',   value: $2, defined: true }; }
  | ALPHA num         { $$ = { type: 'property', key: 'alpha', value: $2 }; }
  | ALPHA STRING      { $$ = { type: 'property', key: 'alpha', value: $2, defined: true }; }
  | COLOR COLOR3      { $$ = { type: 'property', key: 'color', value: $2.toLowerCase() }; }
  | COLOR COLOR6      { $$ = { type: 'property', key: 'color', value: $2.toLowerCase() }; }
  | COLOR RANDOM      { $$ = { type: 'property', key: 'color', value: $2.toLowerCase() }; }
  | COLOR COLORNAME   { $$ = { type: 'property', key: 'color', value: $2.toLowerCase() }; }
  | COLOR STRING      { $$ = { type: 'property', key: 'color', value: $2.toLowerCase(), defined: true }; }
  | BLEND COLOR3 num  { $$ = { type: 'property', key: 'blend', color: $2.toLowerCase(), strength: $3 }; }
  | BLEND COLOR6 num  { $$ = { type: 'property', key: 'blend', color: $2.toLowerCase(), strength: $3 }; }
  | BLEND COLORNAME num { $$ = { type: 'property', key: 'blend', color: $2.toLowerCase(), strength: $3 }; }
  | BLEND RANDOM num  { $$ = { type: 'property', key: 'blend', color: $2.toLowerCase(), strength: $3 }; }
  | BLEND STRING num  { $$ = { type: 'property', key: 'blend', color: $2.toLowerCase(), strength: $3 }; }
// TODO: make BLEND possible to use defined varname.
  | SATURATION num    { $$ = { type: 'property', key: 'saturation', value: $2 }; }
  | SATURATION STRING { $$ = { type: 'property', key: 'saturation', value: $2, defined: true }; }
  | BRIGHTNESS num    { $$ = { type: 'property', key: 'brightness', value: $2 }; }
  | BRIGHTNESS STRING { $$ = { type: 'property', key: 'brightness', value: $2, defined: true }; }
  ;


////////////////////////////////////////////////////
//  LITERAL
////////////////////////////////////////////////////

num
  : n
  | '+' n         { $$ =  $2; }
  | '-' n         { $$ = -$2; }
  | n '*' n       { $$ =  $1*$3; }
  | n '/' n       { $$ =  $1/$3; }
  | '-' n '*' n   { $$ = -$2*$4; }
  | '-' n '/' n   { $$ = -$2/$4; }
  | '(' e ')'     { $$ =  $2; }
  ;

n
  : NUMBER { $$ = parseFloat(yytext); }
  ;

id
  : STRING { $$ = yytext; }
  ;

rulename
  : STRING {$$ = $1; }
  ;

primitive
  : BOX      { $$ = yytext; }
  | SPHERE   { $$ = yytext; }
  | GRID     { $$ = yytext; }
  | LINE     { $$ = yytext; }
  | POINT    { $$ = yytext; }
  | TRIANGLE { $$ = yytext; }
  | MESH     { $$ = yytext; }
  | CYLINDER { $$ = yytext; }
  | TUBE     { $$ = yytext; }
  | SQUASH   { $$ = yytext; }
  ;

