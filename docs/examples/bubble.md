# Bubble

![bubble.png](bubble.png)

```
/*
  Beddards Bubble Branching
  2011-06-26 by Jedidiah Hurt
*/
{ sat 0 b 100 } bubble
{ s 50 0.01 50 y -118 sat 0 b 100 } box

rule bubble md 6 {
  sphere
  { s 0.6 ry 22 x 0.8 y -0.8 } bubble
  { s 0.6 ry 165 x 0.8 y -0.8 } bubble
  { s 0.6 ry 285 x 0.8  y -0.8 } bubble
}
```
