'use strict';

const Color = require('color-js');

module.exports = class ColorTransformation {
  constructor(color) {
    this.hsv = color;
  }

  setColor(color) {
    this.hsv = Color(color === 'random' ? this.randomColor() : color).toHSV();
    return this;
  }

  setHue(v) {
    this.hsv.hue += v % 360;
    return this;
  }

  setSaturation(v) {
    var sat = this.hsv.saturation;
    if (0 > sat * v || sat * v > 1) console.warn('[eisenscript.js] Saturation is measured from 0 to 1 and is clamped to this interval (i.e. values larger then 1 are set to 1.');
    this.hsv.saturation = clamp(sat * v, 0, 1);
    return this;
  }

  setBrightness(v) {
    var brightness = this.hsv.value;
    if (0 > brightness * v || brightness * v > 1) console.warn('[eisenscript.js] Brightness is measured from 0 to 1 and is clamped to this interval.');
    this.hsv.value = clamp(brightness * v, 0, 1);
    return this;
  }

  setBlend(color, strength) {
    this.blend.color = color;
    this.blend.strength = this.blend.strength + clamp(strength, 0, 1) / 2;
    // blend the current color with the specified color
    this.hsv = this.hsv.blend(
      Color(this.blend.color === 'random' ? this.randomColor() : this.blend.color).toHSV(),
      this.blend.strength
    );
    return this;
  }

  clone() {
    return new ColorTransformation(this.hsv.clone());
  }
}
