$(function() {
  eisenscript.compile({
    el: document.getElementById('canvas'),
    code: $('#eisenscript').text()
  });
})