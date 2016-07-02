function makeArray(array) {
	var ret = [];
	if(array != null){
		var i = array.length;
		if ( i == null || array.split || array.setInterval || array.call ) {
      ret[0] = array;
    } else {
      while( i ) ret[--i] = array[i];
    }
	}
	return ret;
}

function sprintf(){
  var _arg = makeArray(arguments), template = _arg.shift(), i;
  for(i in _arg){
    template = template.replace('%s', _arg[i]);
  }
  return template;
}
