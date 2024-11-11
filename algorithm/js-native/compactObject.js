var compactObject = function (obj) {
  let result = null;
  let isArray = Array.isArray(obj);
  if (isArray) {
    result = [];
  } else {
    result = {};
  }
  let iterator = isArray ? obj.entries() : Object.entries(obj);
  for (const [key, value] of iterator) {
    if (value) {
      if (value instanceof Object) {
        let newVal = compactObject(value);
        if (newVal) {
          isArray ? result.push(newVal) : (result[key] = newVal);
        }
      } else {
        isArray ? result.push(value) : (result[key] = value);
      }
    }
  }
  if (isArray && result.length === 0) {
    return null;
  } else if (!isArray && Object.keys(result).length === 0) {
    return null;
  }
  return result;
};

let a = [null, 0, 5, [0], [false, 16]];
console.log(compactObject(a)); // [1]
