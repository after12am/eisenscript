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
"s"                       return 'SIZE';
"m"                       return 'MATRIX';
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
"list:"[\w,]+             return 'COLORLIST';
"image:"[\w\.\w]+         return 'IMAGE';
[a-zA-Z_]+[a-zA-Z0-9_]*   return 'STRING';
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
  | rule
  | statement  { $$ = $1; $1.init = true; }
  ;


////////////////////////////////////////////////////
//  ACTION
////////////////////////////////////////////////////

maxdepth
  : SET MAXDEPTH num { $$ = { type: 'SET', name: 'MAXDEPTH', value: $3 }; }
  ;

maxobjects
  : SET MAXOBJECTS num { $$ = { type: 'SET', name: 'MAXOBJECTS', value: $3 }; }
  ;

minsize
  : SET MINSIZE num { $$ = { type: 'SET', name: 'MINSIZE', value: $3 }; }
  ;

maxsize
  : SET MAXSIZE num { $$ = { type: 'SET', name: 'MAXSIZE', value: $3 }; }
  ;

seed
  : SET SEED num     { $$ = { type: 'SET', name: 'SEED', value: $3 }; }
  | SET SEED INITIAL { $$ = { type: 'SET', name: 'SEED', value: $3 }; }
  ;

background
  : SET BACKGROUND COLOR3 { $$ = { type: 'SET', name: 'BACKGROUND', value: $3 }; }
  | SET BACKGROUND COLOR6 { $$ = { type: 'SET', name: 'BACKGROUND', value: $3 }; }
  | SET BACKGROUND STRING { $$ = { type: 'SET', name: 'BACKGROUND', value: $3 }; }
  | SET BACKGROUND RANDOM { $$ = { type: 'SET', name: 'BACKGROUND', value: $3 }; }
  ;

color
  : SET COLOR RANDOM { $$ = { type: 'SET', name: 'COLOR', value: $3 }; }
  ;

colorpool
  : SET COLORPOOL RANDOMHUE { $$ = { type: 'SET', name: 'COLORPOOL', value: $3 }; }
  | SET COLORPOOL RANDOMRGB { $$ = { type: 'SET', name: 'COLORPOOL', value: $3 }; }
  | SET COLORPOOL GREYSCALE { $$ = { type: 'SET', name: 'COLORPOOL', value: $3 }; }
  | SET COLORPOOL COLORLIST { $$ = { type: 'SET', name: 'COLORPOOL', value: $3 }; }
  | SET COLORPOOL IMAGE     { $$ = { type: 'SET', name: 'COLORPOOL', value: $3 }; }
  ;


////////////////////////////////////////////////////
//  RULE
////////////////////////////////////////////////////

rule
  : RULE id modifiers '{' statements '}'  { $$ = { type: 'RULE', id: $2, modifiers: $3, body: $5 }; }
  ;

modifiers
  : modifiers modifier { $$ = $1; $$.push($2); }
  | { $$ = []; }
  ;

modifier
  : WEIGHT num                 { $$ = { name: 'WEIGHT',   value: $2 }; }
  | MAXDEPTH num               { $$ = { name: 'MAXDEPTH', value: $2 }; }
  | MAXDEPTH num '>' rulename  { $$ = { name: 'MAXDEPTH', value: $2, alternate: $4}; }
  ;

statements
  : statements statement { $$ = $1; $$.push($2); }
  | { $$ = []; }
  ;

statement
  : transformation_loops id { $$ = { type: 'STATEMENT', id: $2, loop: $1 }; }
  ;

transformation_loops
  : transformation_loops transformation_loop { $$ = $1; $$.push($2); }
  | { $$ = []; }
  ;

transformation_loop
  : '{' transformations '}'       { $$ = { iter:  1, attr: $2 }; }
  | n '*' '{' transformations '}' { $$ = { iter: $1, attr: $4 }; }
  ;

transformations
  : transformations transformation { $$ = $1; $$.push($2); }
  | { $$ = []; }
  ;

transformation
  : geo
  | color
  ;


////////////////////////////////////////////////////
//  ATTRIBUTE
////////////////////////////////////////////////////

geo
  : XSHIFT num       { $$ = { name: 'XSHIFT', value: $2 }; }
  | YSHIFT num       { $$ = { name: 'YSHIFT', value: $2 }; }
  | ZSHIFT num       { $$ = { name: 'ZSHIFT', value: $2 }; }
  | ROTATEX num      { $$ = { name: 'ROTATEX', value: $2 }; }
  | ROTATEY num      { $$ = { name: 'ROTATEY', value: $2 }; }
  | ROTATEZ num      { $$ = { name: 'ROTATEZ', value: $2 }; }
  | SIZE num         { $$ = { name: 'SIZE', value: [$2, $2, $2] }; }
  | SIZE num num num { $$ = { name: 'SIZE', value: [$2, $3, $4] }; }
  | MATRIX num num num num num num num num num { $$ = { name: 'MATRIX', value: [$2, $3, $4, $5, $6, $7, $8, $9, $10] }; }
  ;

color
  : HUE num          { $$ = { name: 'HUE', value: $2 }; }
  | ALPHA num        { $$ = { name: 'ALPHA', value: $2 }; }
  | COLOR COLOR3     { $$ = { name: 'COLOR', value: $2 }; }
  | COLOR COLOR6     { $$ = { name: 'COLOR', value: $2 }; }
  | COLOR RANDOM     { $$ = { name: 'COLOR', value: $2 }; }
  | COLOR STRING     { $$ = { name: 'COLOR', value: $2 }; }
  | BLEND COLOR3 num { $$ = { name: 'BLEND', color: $2, strength: $3 }; }
  | BLEND COLOR6 num { $$ = { name: 'BLEND', color: $2, strength: $3 }; }
  | BLEND RANDOM num { $$ = { name: 'BLEND', color: $2, strength: $3 }; }
  | BLEND STRING num { $$ = { name: 'BLEND', color: $2, strength: $3 }; }
  | SATURATION num   { $$ = { name: 'SATURATION', value: $2 }; }
  | BRIGHTNESS num   { $$ = { name: 'BRIGHTNESS', value: $2 }; }
  ;


////////////////////////////////////////////////////
//  LITERAL
////////////////////////////////////////////////////

num
  : n
  | '+' n     { $$ =  $2; }
  | '-' n     { $$ = -$2; }
  | '(' e ')' { $$ =  $2; }
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