# Scaling

A scaling is a linear transformation that enlarges or diminishes primitive.

## s [float]

Resizes the local coordinate system. Notice that the center for the resize is located at the center of the unit cube in the local system (at (0.5,0.5,0.5)

```
{ x 2 s 2 } box
{ s .5 } box
```

## s [float] [float] [float]

Resizes the local coordinate system. As above but with separate scale for each dimension.

```
{ s .5 1 1 } box
{ s 1 .5 1 } box
{ s 1 1 .5 } box
```

<!--
## sx [float]

## sy [float]

## sz [float]
-->
