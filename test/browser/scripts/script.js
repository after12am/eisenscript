$(function() {
  var error = eisenscript.compile({
    el: document.getElementById('canvas'),
    code: $('#eisenscript').text()
  });
  console.log(error)
})