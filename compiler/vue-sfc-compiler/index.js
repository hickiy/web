const { parse, compileScript, compileTemplate } = require('@vue/compiler-sfc');
const fs = require('fs');
const path = require('path');
const source = fs.readFileSync(path.resolve(__dirname, './setup.vue'), 'utf-8');

const { descriptor } = parse(source, {
  id: '1',
  filename: 'setup.vue'
});

const { code } = compileTemplate({ id: '1', filename: 'setup.vue', source: descriptor.template.content });

const { content } = compileScript(descriptor, { id: '1', filename: 'setup.vue' });

fs.writeFileSync(path.resolve(__dirname, './setup.js'), code + '\n\n' + content, 'utf-8');
