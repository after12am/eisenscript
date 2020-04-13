# Alien

![alien.png](alien.png)

```
/*
  @author nicolas barradeau
*/
set background #FFFFFF
set maxobjects  5400

//ground
{ s 100 0.01 100 y -10 color #FFF } box

40 * {   y 0.1 ry 9 rz -2 s 1.01 1.01 1.01 color #f00 } column

rule column w 0.5 {
  { y 0.5 ry 18 blend #ff0 0.1 } box
}

rule column w 0.2 {
  { x -0.25 z -0.25 y 0.5 s 0.8 blend #ff0 0.1 } box
}

rule column w 0.2 {
  20 * { rx 1 ry 1.5 rz 3 s 0.75 0.95 1.10 color #ff0 } box
}
```
