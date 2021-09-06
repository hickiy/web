// 使用require.context递归载入
const req = require.context('./module', true, /\.js$/);
console.log('require.context.resolve:', req.resolve, '\n');
console.log('require.context.keys:', req.keys, '\n');
console.log('require.context.id:', req.id, '\n');

const key = req.keys()[0];

console.log('require.context.resolve(key):', req.resolve(key), '\n');
console.log('require.context(key):', req(key), '\n');

// 使用require载入单个文件
console.log('require(path):', require('./module/a.js').default, '\n');
