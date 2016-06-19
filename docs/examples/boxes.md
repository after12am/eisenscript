```
set maxdepth 600
set background #333
{ h 30 sat 0.2 h -67 b 0.8 } spiral

rule spiral w 100 {
  box2
  { y 0.4 rx 90 hue 1 s 0.995 b 0.999 } spiral
}

rule spiral w 100 {
  box2
  { y 0.4 rx 90 hue -1 rz -90 s 0.995 b 0.999 } spiral
}

rule spiral w 100 {
  box2
  { y 0.4 rx 90 hue 0 rz 90 s 0.995 b 0.995 } spiral
}

rule spiral w 3 {
  { rz 5 s 1 1 1 } spiral
  { ry 4 h 3 s 1 1 1 } spiral
}

rule box2 {
  { s 1 5 1 } box
}

rule box2 {
  { s 5 1 1 } box
}

rule box2 {

}
```
