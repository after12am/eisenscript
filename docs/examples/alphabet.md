```
/*
  @author satoshi okami
*/
F

rule F {
  { y -1.1 * 0  } R7
  { y -1.1 * 1  } R7
  { y -1.1 * 2  } R2
  { y -1.1 * 3  } R2
  { y -1.1 * 4  } R2
  { y -1.1 * 5  } R2
  { y -1.1 * 6  } R5
  { y -1.1 * 7  } R5
  { y -1.1 * 8  } R2
  { y -1.1 * 9  } R2
  { y -1.1 * 10 } R2
  { y -1.1 * 11 } R2
}

rule R1 {
  1 * { x 1.1 } box
}

rule R2 {
  2 * { x 1.1 } box
}

rule R3 {
  3 * { x 1.1 } box
}

rule R4 {
  4 * { x 1.1 } box
}

rule R5 {
  5 * { x 1.1 } box
}

rule R6 {
  6 * { x 1.1 } box
}

rule R7 {
  7 * { x 1.1 } box
}
```
