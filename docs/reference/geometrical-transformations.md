# Transformations

A transformation is any function f mapping a set X to itself, i.e. f:X→X. Examples include linear transformations and affine transformations, rotations, reflections and translations.

## Translation

A translation moves every point by a fixed distance in the same direction.

### x [float]

X axis translation. The float argument is the offset measured in units of the local coordinate system.

```
{ a .5 color #333 } box
{ x 2 } box
```

### y [float]

Y axis translation. The float argument is the offset measured in units of the local coordinate system.

```
{ a .5 color #333 } box
{ y 2 } box
```

### z [float]

Z axis translation. The float argument is the offset measured in units of the local coordinate system.

```
{ a .5 color #333 } box
{ z 2 } box
```

## Rotation

A rotation is a transformation that is performed by "spinning" the object around a fixed point.

### rx [float]

Rotation about the x axis. The 'float' argument is the angle specified in degrees. The rotation axis is centered at the unit cube in the local coordinate system: that is the rotation axis contains the line segment from (0, 0.5, 0.5) -> (1, 0.5, 0.5).

```
{ a .5 color #333 } box
{ rx 45 } box
```

### ry [float]

Rotation about the y axis. The 'float' argument is the angle specified in degrees. The rotation axis is centered at the unit cube in the local coordinate system: that is the rotation axis contains the line segment from (0, 0.5, 0.5) -> (1, 0.5, 0.5).

```
{ a .5 color #333 } box
{ ry 45 } box
```

### rz [float]

Rotation about the z axis. The 'float' argument is the angle specified in degrees. The rotation axis is centered at the unit cube in the local coordinate system: that is the rotation axis contains the line segment from (0, 0.5, 0.5) -> (1, 0.5, 0.5).

```
{ a .5 color #333 } box
{ rz 45 } box
```

## Scaling

A scaling is a linear transformation that enlarges or diminishes object.

### s [float]

Resizes the local coordinate system. Notice that the center for the resize is located at the center of the unit cube in the local system (at (0.5,0.5,0.5)

```
{ a .5 color #333 } box
{ s 10 } box
```

### s [float] [float] [float]

Resizes the local coordinate system. As above but with separate scale for each dimension.

```
{ a .5 color #333 } box
{ s 1 10 1 } box
```

<!--
### fx
Mirrors the local coordinate system about the x-axis. As above the mirroring planes is centered at the cube.

### fy
Mirrors the local coordinate system about the y-axis.

### fz
Mirrors the local coordinate system about the z-axis.
-->
