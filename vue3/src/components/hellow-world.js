import { h } from 'vue'

// 选项api
// export default {
//   name: 'hellow-world',
//   props: ['msg'],
//   render() {
//     return h('div', {}, 'option-api-js:  ' + this.msg);
//   }
// }


// 组合api
// export default {
//   props: {
//     msg: String
//   },
//   setup(props) {
//     return () => h('div', {}, 'compose-api-js: ' + props.msg)
//   }
// }


// 组合api + jsx
export default {
  props: {
    msg: String
  },
  setup(props) {
    return () => <div>{'compose-api-jsx:  ' + props.msg}</div>
  }
}


