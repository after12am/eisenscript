# Bloom

![bloom.png](bloom.png)

```
{ rx -90 s 4 } sakura

rule sakura {
  6 * { rz 60 } petal
  { s 2 color #c10020 } sphere
}

rule petal {
  1 * {  y 0.8 s 1 0.25 1 } 60 * { rx 0.1 y 0.1 s 1.01 } bbox
}

rule bbox {
  { s 1 0.1 0.1 color #ce97b6  } box
}
```
