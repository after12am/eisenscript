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
  : SET MAXDEPTH num { $$ = { type: 'SET', key: 'MAXDEPTH', value: $3 }; }
  ;

maxobjects
  : SET MAXOBJECTS num { $$ = { type: 'SET', key: 'MAXOBJECTS', value: $3 }; }
  ;

minsize
  : SET MINSIZE num { $$ = { type: 'SET', key: 'MINSIZE', value: $3 }; }
  ;

maxsize
  : SET MAXSIZE num { $$ = { type: 'SET', key: 'MAXSIZE', value: $3 }; }
  ;

seed
  : SET SEED num     { $$ = { type: 'SET', key: 'SEED', value: $3 }; }
  | SET SEED INITIAL { $$ = { type: 'SET', key: 'SEED', value: $3 }; }
  ;

background
  : SET BACKGROUND COLOR3 { $$ = { type: 'SET', key: 'BACKGROUND', value: $3.toLowerCase() }; }
  | SET BACKGROUND COLOR6 { $$ = { type: 'SET', key: 'BACKGROUND', value: $3.toLowerCase() }; }
  | SET BACKGROUND STRING { $$ = { type: 'SET', key: 'BACKGROUND', value: $3.toLowerCase() }; }
  | SET BACKGROUND RANDOM { $$ = { type: 'SET', key: 'BACKGROUND', value: $3.toLowerCase() }; }
  ;

color
  : SET COLOR RANDOM { $$ = { type: 'SET', key: 'COLOR', value: $3.toLowerCase() }; }
  ;

colorpool
  : SET COLORPOOL RANDOMHUE { $$ = { type: 'SET', key: 'COLORPOOL', value: $3.toLowerCase() }; }
  | SET COLORPOOL RANDOMRGB { $$ = { type: 'SET', key: 'COLORPOOL', value: $3.toLowerCase() }; }
  | SET COLORPOOL GREYSCALE { $$ = { type: 'SET', key: 'COLORPOOL', value: $3.toLowerCase() }; }
  | SET COLORPOOL COLORLIST { $$ = { type: 'SET', key: 'COLORPOOL', value: $3.toLowerCase() }; }
  | SET COLORPOOL IMAGE     { $$ = { type: 'SET', key: 'COLORPOOL', value: $3.toLowerCase() }; }
  ;

define
  : DEFINE STRING num { $$ = { type: 'DEFINE', varname: $2, value: $3 }; }
  ;

////////////////////////////////////////////////////
//  RULE
////////////////////////////////////////////////////

rule
  : RULE id modifiers '{' statements '}'  { $$ = { type: 'RULE', id: $2, params: $3, body: $5 }; }
  ;

modifiers
  : modifiers modifier { $$ = $1; $$.push($2); }
  | { $$ = []; }
  ;

modifier
  : WEIGHT num                 { $$ = { type: 'MODIFIER', key: 'WEIGHT',   value: $2 }; }
  | MAXDEPTH num               { $$ = { type: 'MODIFIER', key: 'MAXDEPTH', value: $2 }; }
  | MAXDEPTH num '>' rulename  { $$ = { type: 'MODIFIER', key: 'MAXDEPTH', value: $2, alternate: $4}; }
  ;

statements
  : statements statement { $$ = $1; $$.push($2); }
  | { $$ = []; }
  ;

statement
  : iterations id { $$ = { type: 'STATEMENT', id: $2, iteration: $1 }; }
  ;

iterations
  : iterations iteration { $$ = $1; $$.push($2); }
  | { $$ = []; }
  ;

iteration
  : '{' object '}'       { $$ = { type: 'OBJECT', iter:  1, properties: $2 }; }
  | n '*' '{' object '}' { $$ = { type: 'OBJECT', iter: $1, properties: $4 }; }
  ;

object
  : object property { type: 'PROPERTY', $$ = $1; $$.push($2); }
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
  : XSHIFT num       { $$ = { type: 'PROPERTY', key: 'XSHIFT',  value: $2 }; }
  | YSHIFT num       { $$ = { type: 'PROPERTY', key: 'YSHIFT',  value: $2 }; }
  | ZSHIFT num       { $$ = { type: 'PROPERTY', key: 'ZSHIFT',  value: $2 }; }
  | ROTATEX num      { $$ = { type: 'PROPERTY', key: 'ROTATEX', value: $2 }; }
  | ROTATEY num      { $$ = { type: 'PROPERTY', key: 'ROTATEY', value: $2 }; }
  | ROTATEZ num      { $$ = { type: 'PROPERTY', key: 'ROTATEZ', value: $2 }; }
  | SIZE num         { $$ = { type: 'PROPERTY', key: 'SIZE',    value: [$2, $2, $2] }; }
  | SIZE num num num { $$ = { type: 'PROPERTY', key: 'SIZE',    value: [$2, $3, $4] }; }
  | MATRIX num num num num num num num num num { $$ = { type: 'PROPERTY', key: 'MATRIX', value: [$2, $3, $4, $5, $6, $7, $8, $9, $10] }; }
  ;

color
  : HUE num          { $$ = { type: 'PROPERTY', key: 'HUE',   value: $2 }; }
  | ALPHA num        { $$ = { type: 'PROPERTY', key: 'ALPHA', value: $2 }; }
  | COLOR COLOR3     { $$ = { type: 'PROPERTY', key: 'COLOR', value: $2.toLowerCase() }; }
  | COLOR COLOR6     { $$ = { type: 'PROPERTY', key: 'COLOR', value: $2.toLowerCase() }; }
  | COLOR RANDOM     { $$ = { type: 'PROPERTY', key: 'COLOR', value: $2.toLowerCase() }; }
  | COLOR STRING     { $$ = { type: 'PROPERTY', key: 'COLOR', value: $2.toLowerCase() }; }
  | BLEND COLOR3 num { $$ = { type: 'PROPERTY', key: 'BLEND', color: $2.toLowerCase(), strength: $3 }; }
  | BLEND COLOR6 num { $$ = { type: 'PROPERTY', key: 'BLEND', color: $2.toLowerCase(), strength: $3 }; }
  | BLEND RANDOM num { $$ = { type: 'PROPERTY', key: 'BLEND', color: $2.toLowerCase(), strength: $3 }; }
  | BLEND STRING num { $$ = { type: 'PROPERTY', key: 'BLEND', color: $2.toLowerCase(), strength: $3 }; }
  | SATURATION num   { $$ = { type: 'PROPERTY', key: 'SATURATION', value: $2 }; }
  | BRIGHTNESS num   { $$ = { type: 'PROPERTY', key: 'BRIGHTNESS', value: $2 }; }
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