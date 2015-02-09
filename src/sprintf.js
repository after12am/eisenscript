function sprintf(){
  var _arg = $.makeArray(arguments), template = _arg.shift(), i;
  for(i in _arg){
    template = template.replace('%s', _arg[i]);
  }
  return template;
}