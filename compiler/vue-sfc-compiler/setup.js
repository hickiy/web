import {
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from 'vue';

const _hoisted_1 = /*#__PURE__*/ _createElementVNode('div', null, '12312312', -1 /* HOISTED */);

export function render(_ctx, _cache) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [_createElementVNode('div', null, _toDisplayString(_ctx.count), 1 /* TEXT */), _hoisted_1],
      64 /* STABLE_FRAGMENT */
    )
  );
}

import { defineComponent as _defineComponent } from 'vue';
import { ref, h } from 'vue';

export default /*#__PURE__*/ _defineComponent({
  __name: 'setup',
  setup(__props, { expose: __expose }) {
    __expose();

    const count = ref(1);

    // export default {
    //   setup() {
    //     return () => h('div', count.value);
    //     // return {
    //     //   count
    //     // };
    //   }
    // };

    const __returned__ = { count };
    Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
    return __returned__;
  }
});
