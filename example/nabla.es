set seed 57
set maxdepth 10

1 * { x -2 y -6 } 10 * { x 4 } 10 * { y 4 } 1 * { ry -90 b 0.2 } R1

rule R1 {
  dbox { z 0.6 rx 5 } R1 
}

rule R1 { 
  dbox { z 0.5 rx -90 } R1 
}

rule R1 { 
  dbox { z 0.6 rz 90 } R1 
}

rule R1 { 
  dbox { z 0.6 rz -90 } R1 
}

rule R1 weight 0.01 { 

}

rule dbox { 
  { color random s 2 2 0.5 } box 
}

rule dbox weight 0.5 {
  { ry 90 s 0.5 1 1 } R1 
}

rule dbox weight 0.5 {
 { rx 90 s 0.5 2 1 } R1 
}