set maxobjects 16000

{ a 0.3 sat 0.5 } grinder
set background #fff

rule grinder {
  36 * { rz 10 y 0.1 } 36 * { ry 10 z 1.2 b 0.99 h 12 } xbox
}

rule xbox {
  { s 1.1 } grid
  { b 0.7 color #eee a 0.2 } box
}

rule xbox {
  { s 1.1 } grid
  { b 0.7 color #fff a 0.3 } box
}