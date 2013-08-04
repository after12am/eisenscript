exports.Renderer = function() {
  // if possible, use renderer based on WebGL
  if (Detector.webgl) return new WebGLRenderer();
  // if could not use webgl, return renderer based on Canvas
  return new CanvasRenderer();
}