# Rotation

A rotation is a transformation that is performed by "spinning" the primitive around a fixed point.

## rx [float]

Rotation about the x axis. The 'float' argument is the angle specified in degrees. The rotation axis is centered at the unit cube in the local coordinate system: that is the rotation axis contains the line segment from (0, 0.5, 0.5) -> (1, 0.5, 0.5).

```
{ rx 45 } box
{ rx 90.0 } box
```

## ry [float]

Rotation about the y axis. The 'float' argument is the angle specified in degrees. The rotation axis is centered at the unit cube in the local coordinate system: that is the rotation axis contains the line segment from (0, 0.5, 0.5) -> (1, 0.5, 0.5).

```
{ ry 45 } box
{ ry 90.0 } box
```

## rz [float]

Rotation about the z axis. The 'float' argument is the angle specified in degrees. The rotation axis is centered at the unit cube in the local coordinate system: that is the rotation axis contains the line segment from (0, 0.5, 0.5) -> (1, 0.5, 0.5).

```
{ rz 45 } box
{ rz 90.0 } box
```
