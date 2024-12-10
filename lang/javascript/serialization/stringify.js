function depthLimitedStringify(obj, depth) {
  return JSON.stringify(obj, createReplacer(depth), 2);
}

function createReplacer(maxDepth) {
  const visited = new WeakMap();
  return function(key, value) {
      const currentDepth = visited.get(this) || 0;
      if (currentDepth >= maxDepth) {
          return undefined;
      }
      if (typeof value === 'object' && value !== null) {
          visited.set(value, currentDepth + 1);
      }
      return value;
  };
}

// 示例对象
const obj = {
  a: 1,
  b: {
      c: 2,
      d: {
          e: 3
      }
  }
};

// 指定深度为2
console.log(depthLimitedStringify(obj, 2));