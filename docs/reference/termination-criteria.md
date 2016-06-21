# Termination criteria

## set maxdepth [integer]

Breaks after [integer] iterations (generations). This will also serve as a upper recursion limit for all rules.

## set maxobjects [integer]

After [integer] objects have been created, the construction is terminated.

## set minsize [float]

Allows you to specify how large or small a given object can be before terminating. The 'size' parameter refers to the length of the diagonal of a unit cube in the current local state. The initial coordinate frame goes from (0,0,0) to (1,1,1) and hence has a diagonal length of sqrt(3)~1.7). It is possible to specify both a mix and a min size. The termination criteria only stops the current branch - if other branches are still within a valid range, the will be continued.

## set maxsize [float]

See above.

## set seed [integer]

Allows you to set the random seed. This makes it possible to reproduce creations.
set seed initial
This allows you to set the seed to its initial value (the value specified in the seed box). Notice that each rule call branch maintains its own sequence of random numbers. This makes it possible to generate the same set of random numbers as used earlier, making it possible to combine randomness with self-similarity.

## set background [color]

Allows you to set the background color. Colors are specified as text-strings parsed using Qt's color parsing, allowing for standard HTML RGB specifications (e.g. #F00 or #FF0000), but also SVG keyword names (e.g. red or even lightgoldenrodyellow).
