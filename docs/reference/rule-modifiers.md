# Rule modifiers

## md / maxdepth [integer]

Rule Retirement.Sets the maximum recursive for the rule. The rule would not execute any actions after this limit has been reached.

```
10 * { x 1 } R1

rule R1 md 1 {
  { color random } box
}
```

## md / maxdepth [integer] > [rulename]

Rule Retirement with substitution.Sets the maximum recursive for the rule. After this limit has been reached [rulename] will be executed instead this rule.

```
4 * { x 1 } R1

rule R1 md 1 > R2 {
  { color random } box
}

rule R2 {
  { x 1 color random } box
}
```

## w / weight [float]

Ambiguous rules.If several rules are defined with the same name, a random definition is chosen according to the weight specified here. If no weight is specified, the default weight of 1 is used.

```
10 * { x 1 } R1

rule R1 w 0.8 {
  { color random } box
}

rule R1 w 0.2 {
  { color #000 } box
}
```
