# Rule modifiers

## md / maxdepth [integer]

Rule Retirement.Sets the maximum recursive for the rule. The rule would not execute any actions after this limit has been reached.

## md / maxdepth [integer] > [rulename]

Rule Retirement with substitution.Sets the maximum recursive for the rule. After this limit has been reached [rulename] will be executed instead this rule.

## w / weight [float]

Ambiguous rules.If several rules are defined with the same name, a random definition is chosen according to the weight specified here. If no weight is specified, the default weight of 1 is used.
