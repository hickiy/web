import { defineComponent, h } from 'vue'

// 选项api
// export default defineComponent({
//   name: 'hellow-world',
//   props: {
//     msg: { type: String, required: true },
//   },
//   render() {
//     return h('div', {}, 'option-api-ts:   ' + this.msg)
//   }
// })


// 组合api
// export default defineComponent({
//   name: 'hellow-world',
//   props: {
//     msg: { type: String, required: true },
//   },
//   setup(props) {
//     return () => h('div', {}, 'compose-api-ts:    ' + props.msg)
//   }
// })


// 组合api + jsx
export default defineComponent({
  name: 'hellow-world',
  props: {
    msg: { type: String, required: true },
  },
  setup(props) {
    return () =><div>{'compose-api-tsx:  '  + props.msg}</div>
  }
})