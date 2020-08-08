const HCHARS = "0123456789ABCDEF"

module.exports = {
  extend: function(destination, source) {
    for(let k in source) destination[k] = source[k];
    return destination;
  },

  /**
   * Converts 0-1 to 0-255
   * @method real2dec
   * @param n {float} the number to convert
   * @return {int} a number 0-255
   */
  real2dec: function(n) {
    return Math.min(255, Math.round(n*256));
  },

  /**
   * Converts HSV (h[0-360], s[0-1]), v[0-1] to RGB [255,255,255]
   * @method hsv2rgb
   * @param h {int|[int, float, float]} the hue, or an
   *        array containing all three parameters
   * @param s {float} the saturation
   * @param v {float} the value/brightness
   * @return {[int, int, int]} the red, green, blue values in
   *          decimal.
   */
  hsv2rgb: function(h, s, v) { 

    var r, g, b, i, f, p, q, t;
    i = Math.floor((h/60)%6);
    f = (h/60)-i;
    p = v*(1-s);
    q = v*(1-f*s);
    t = v*(1-(1-f)*s);
    switch(i) {
        case 0: r=v; g=t; b=p; break;
        case 1: r=q; g=v; b=p; break;
        case 2: r=p; g=v; b=t; break;
        case 3: r=p; g=q; b=v; break;
        case 4: r=t; g=p; b=v; break;
        case 5: r=v; g=p; b=q; break;
    }

    var fn=this.real2dec;

    return [fn(r), fn(g), fn(b)];
  },

  /**
   * Converts to RGB [255,255,255] to HSV (h[0-360], s[0-1]), v[0-1]
   * @method rgb2hsv
   * @param r {int|[int, int, int]} the red value, or an
   *        array containing all three parameters
   * @param g {int} the green value
   * @param b {int} the blue value
   * @return {[int, float, float]} the value converted to hsv
   */
  rgb2hsv: function(r, g, b) {

    r=r/255;
    g=g/255;
    b=b/255;

    var min,max,delta,h,s,v;
    min = Math.min(Math.min(r,g),b);
    max = Math.max(Math.max(r,g),b);
    delta = max-min;

    switch (max) {
      case min: h=0; break;
      case r:   h=60*(g-b)/delta;
                if (g<b) {
                    h+=360;
                }
                break;
      case g:   h=(60*(b-r)/delta)+120; break;
      case b:   h=(60*(r-g)/delta)+240; break;
    }

    s = (max === 0) ? 0 : 1-(min/max);

    var hsv = [Math.round(h), s, max];

    return hsv;
  },

  /**
   * Converts decimal rgb values into a hex string
   * 255,255,255 -> FFFFFF
   * @method rgb2hex
   * @param r {int|[int, int, int]} the red value, or an
   *        array containing all three parameters
   * @param g {int} the green value
   * @param b {int} the blue value
   * @return {string} the hex string
   */
  rgb2hex: function(r, g, b) {
    var f=this.dec2hex;
    return f(r) + f(g) + f(b);
  },

  /**
   * Converts an int 0...255 to hex pair 00...FF
   * @method dec2hex
   * @param n {int} the number to convert
   * @return {string} the hex equivalent
   */
  dec2hex: function(n) {
      n = parseInt(n, 10);
      n = (typeof n === 'number') ? n : 0;
      n = (n > 255 || n < 0) ? 0 : n;

      return HCHARS.charAt((n - n % 16) / 16) + HCHARS.charAt(n % 16);
  },

  /**
   * Converts a hex pair 00...FF to an int 0...255 
   * @method hex2dec
   * @param str {string} the hex pair to convert
   * @return {int} the decimal
   */
  hex2dec: function(str) {
    var f = function(c) {
      return HCHARS.indexOf(c.toUpperCase());
    };

    var s=str.split('');

    return ((f(s[0]) * 16) + f(s[1]));
  },

  /**
   * Converts a hex string to rgb
   * @method hex2rgb
   * @param str {string} the hex string
   * @return {[int, int, int]} an array containing the rgb values
   */
  hex2rgb: function(s) {
    var f = this.hex2dec;
    return [f(s.substr(0, 2)), f(s.substr(2, 2)), f(s.substr(4, 2))];
  }
};
