import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from 'vue';

export function render(_ctx, _cache) {
  return _openBlock(), _createElementBlock('div', null, _toDisplayString(_ctx.count), 1 /* TEXT */);
}

import { ref, h } from 'vue';

export default {
  __name: 'setup',
  setup(__props, { expose: __expose }) {
    __expose();

    const count = ref(1);

    const __returned__ = { count, ref, h };
    Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
    return __returned__;
  }
};
