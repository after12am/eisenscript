```
/*
  @author satoshi okami
*/
set maxobjects 2000

1 * { z 4 y -3 } 72 * { x 0.3 ry 5 } R1

rule R1 {
  22 * { y 0.6 rx 3 s 0.88 } 1 * { s 1 1 0.1 color #fff } box
  { y 4.6 z 2 s 0.2 color #fff } sphere
}

{ s 600 0.1 600 color #e0e0e0 } box
```
