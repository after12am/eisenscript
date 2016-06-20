# Color transformations

## HSV color space

#### h / hue [float]

Adds the 'float' value to the hue color parameter for the current state. Hues are measured from 0 to 360 and wraps cyclicly - i.e. a hue of 400 is equal to a hue of 40.

```
1 * { s .5 } 10 * { x 1 hue 36 } 10 * { y 1 hue 36 } 10 * { z 1 hue 36 } box
```

#### sat [float]

Multiplies the 'float' value with the saturation color parameter for the current state. Saturation is measured from 0 to 1 and is clamped to this interval (i.e. values larger then 1 are set to 1).

```
1 * { s .5 } 10 * { x 1 sat 0.9 } 10 * { y 1 sat 0.9 } 10 * { z 1 sat 0.9 } box
```

#### b / brightness [float]

Multiples the 'float' value with the brightness color parameter for the current state. Brightness is measured from 0 to 1 and is clamped to this interval. Notice that parameter is sometimes called 'V' or 'Value' (and the color space is often refered to as [HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)).

```
1 * { s .5 } 10 * { x 1 b 0.95 } 10 * { y 1 b 0.95 } 10 * { z 1 b 0.95 } box
```

#### blend [color] [strength]

Blends the current color with the specified color. A strength of 1.0 will weight the current and new color evenly. Colors are mixed in HSV color space. Hue's will wrap around. Saturation and Value are clamped to [0,1]. Notice that since the mixing is performed in HSV space, the result may seems counterintuitive. For instance blending a red color into a blue color, may have intermediate green steps (since you are change the hue - so you will move around on the HSV color circle).

```
10 * { x 1 color #f00 } 10 * { y 1 blend #0f0 .04 } 10 * { z 1 blend #0f0 .04 } box
```

## Transparant

#### a / alpha [float]

Multiplies the 'float' value with the alpha color parameter for the current state. Alpha is measured from 0 to 1 and is clamped to this interval. An alpha value of zero is completely transparant, and an alpha value of one is completely opaque.

```
1 * { s .5 } 10 * { x 1 a 0.8 } 10 * { y 1 a 0.8 } 10 * { z 1 a 0.8 } box
```

## RGB color space

#### color [color]

This commands sets the color to an absolut color (most other transformations are relative modifications on the current state). Colors are specified as text-strings parsed using Qt's [color parsing](http://doc.trolltech.com/4.3/qcolor.html#setNamedColor), allowing for standard HTML RGB specifications (e.g. #F00 or #FF0000), but also SVG keyword names (e.g. red or even lightgoldenrodyellow)

```
{ a .5 color #333 } box
10 * { x 1 color #f00 } box
10 * { y 1 color #0f0 } box
10 * { z 1 color #00f } box
```

#### set color random

Chooses a random color (using the current colorpool<!-- - see below -->).

```
10 * { x 1 color random } 10 * { y 1 color random } 10 * { z 1 color random } box
```


<!--
set colorpool [scheme]
Determines how random colors are drawn. The possible schemes are:
randomhue - chooses a random hue, with full brighness and saturation.
randomrgb - three independent random r,g, and b values.
greyscale - random r=g=b.
image:filename.png - color sampling. Chooses a random pixel from the specified image.
list:orange,white,grey - chooses from the specified list of colors. A color may appear multiple times to increase its weight.
-->
