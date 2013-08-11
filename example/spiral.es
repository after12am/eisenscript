set background #000
set maxdepth 40
set maxobjects 10000

4 * { ry 90 color #EEE s 1.3 } R0

rule R0 {
  box
  { x 0.99 s 0.9 rx 5 ry 15 rz -10 } R0
  R1
}

rule R0 {
  box
  { x 0.99 s 0.9 rx 1 ry 15 rz -5 } R0
  R1
}

rule R1 {
  box
  { y 0.7 s 0.9 rz -15 rx 15 } R1
}

rule R1 {
  box
  { y 0.7 s 0.9 rz 15 rx -15 } R1
}

rule R1 {
  box
  { y 0.7 s 0.9 rz 15 rx -15 } R1
}

rule R1 {
  box
  { y 0.7 s 0.9 ry -5 rz -15 rx -15 } R1
}

rule R1 {
  box
  { y 0.7 s 0.9 ry -5 rz 15 rx -15 } R1
}