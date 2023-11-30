function concatToString() {
  var list = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      list.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        var inner = concatToString.apply(null, arg);
        if (inner) {
          list.push(inner);
        }
      }
    } else if (argType === 'object') {
      if (
        arg.toString !== Object.prototype.toString &&
        !arg.toString.toString().includes('[native code]')
      ) {
        list.push(arg.toString());
        continue;
      }

      for (var key in arg) {
        if (arg[key]) {
          list.push(key);
        }
      }
    }
  }

  return list.join(' ');
}
export { concatToString };
