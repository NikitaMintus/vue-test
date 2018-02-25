function findValues(obj, key) {
  return findValuesHelper(obj, key, []);
}

function findValuesHelper(obj, key, list) {
  if (!obj) return list;
  if (obj instanceof Array) {
    for (var i in obj) {
      list = list.concat(findValuesHelper(obj[i], key, []));
    }
    return list;
  }
  if (obj[key]) list.push(obj[key]);

  if ((typeof obj == "object") && (obj !== null)) {
    var children = Object.keys(obj);
    if (children.length > 0) {
      for (i = 0; i < children.length; i++) {
        list = list.concat(findValuesHelper(obj[children[i]], key, []));
      }
    }
  }
  return list;
}

function forIn(obj, fn, thisObj) {
  var key, i = 0;
  for (key in obj) {
    if (exec(fn, obj, key, thisObj) === false) {
      break;
    }
  }

  function exec(fn, obj, key, thisObj) {
    return fn.call(thisObj, obj[key], key, obj);
  }

  return forIn;
}

export {findValues}
