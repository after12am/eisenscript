# Color transformations

## h / hue [float]

Adds the 'float' value to the hue color parameter for the current state. Hues are measured from 0 to 360 and wraps cyclicly - i.e. a hue of 400 is equal to a hue of 40.

```
36 * { x .2 hue 2 } box
```

## sat / saturation [float]

Multiplies the 'float' value with the saturation color parameter for the current state. Saturation is measured from 0 to 1 and is clamped to this interval (i.e. values larger then 1 are set to 1).

```
36 * { x .2 sat .9 } box
```

## b / brightness [float]

Multiples the 'float' value with the brightness color parameter for the current state. Brightness is measured from 0 to 1 and is clamped to this interval. Notice that parameter is sometimes called 'V' or 'Value' (and the color space is often refered to as [HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)).

```
36 * { x .2 b 0.95 } box
```

## color [color]

This commands sets the color to an absolut color (most other transformations are relative modifications on the current state). Colors are specified as text-strings parsed using Qt's [color parsing](http://doc.trolltech.com/4.3/qcolor.html#setNamedColor), allowing for standard HTML RGB specifications (e.g. #F00 or #FF0000), but also SVG keyword names (e.g. red or even lightgoldenrodyellow)

```
{ x 1 color #f00 } box
{ y 1 color #0f0 } box
{ z 1 color #00f } box
```

## blend [color] [strength]

Blends the current color with the specified color. A strength of 1.0 will weight the current and new color evenly. Colors are mixed in HSV color space. Hue's will wrap around. Saturation and Value are clamped to [0,1]. Notice that since the mixing is performed in HSV space, the result may seems counterintuitive. For instance blending a red color into a blue color, may have intermediate green steps (since you are change the hue - so you will move around on the HSV color circle).

```
3 * { x 1 color #f00 } 3 * { y 1 blend #0f0 .1 } 3 * { z 1 blend #0f0 .1 } box
```

## random

Chooses a random color (using the current colorpool<!-- - see below -->).

```
3 * { x 1 color random } 3 * { y 1 color random } 3 * { z 1 color random } box
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
