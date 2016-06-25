# Matrix transformations

Applies the specified 3x3 rotation matrix to the transformation matrix for the current state. About the argument order: [f1],[f2],[f3] defines the first row of the matrix.

<!--
#### m [f1] ... [f9]

```
{ m 1 0 0
    0 1 0
    0 0 1 } box
```

## translation

A translation moves every point by a fixed distance in the same direction.
-->

## rotation

A rotation is a transformation that is performed by "spinning" the object around a fixed point.

```
{ m 1 0 0
    0 .53 -.85
    0 .85 .53 } box
```

## scaling

A scaling is a linear transformation that enlarges or diminishes object.

```
{ m 2 0 0
    0 2 0
    0 0 2 } box
```
