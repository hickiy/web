import Vue, { h } from 'vue'
import App from './App.vue'

import { Upload } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

function beforeUpload() {
  console.log(this)
}

function file() {
  return h('div', '1111')
}

const myUpload = {
  inject: ['hellow'],

  // plan one
  extends: Upload,
  props: {
    beforeUpload: {
      default() {
        return beforeUpload.bind(this);
      },
    },
  },
  render(h) {
    this.$scopedSlots.file = file;
    return Upload.render.call(this, h)
  },

  // plan two
  // extends: Upload,
  // render(h) {
  //   this.$scopedSlots.file = file;
  //   Object.defineProperty(Object.getPrototypeOf(this), 'beforeUpload', {
  //     configurable: true,
  //     enumerable: true,
  //     get() {
  //       return beforeUpload.bind(this);
  //     }
  //   })
  //   return Upload.render.call(this, h)
  // },


  // plan three
  // extends: Upload,
  // beforeCreate() {
  //   this.$options.props.beforeUpload = {
  //     type: Function,
  //     default: beforeUpload.bind(this)
  //   } 
  // },
  // render(h) {
  //   this.$scopedSlots.file = file;
  //   return Upload.render.call(this, h)
  // },


  // plan four
  // extends: Upload,
  // render(h) {
  //   console.log(this.$parent.$children[0]);
  //   const ctx = { props: this.$options.propsData };
  //   ctx.props.beforeUpload = () => beforeUpload.call(this.$children[0]);
  //   ctx.scopedSlots = { file };
  //   return h(Upload, ctx, this.$options._renderChildren);
  // },


  // plan fvie
  // functional: true,
  // render(h, context) {
  //   const ctx = Object.create(Object.getPrototypeOf(context));
  //   Object.keys(context).forEach(key => {
  //     ctx[key] = context[key]
  //   })
  //   ctx.props.beforeUpload = function () { beforeUpload.bind(this.$parent) };
  //   ctx.scopedSlots.file = file;
  //   console.log(ctx);
  //   return h(Upload, ctx, ctx.children)
  // },
  install(V) {
    V.component(Upload.name, myUpload)
  }
}
Vue.use(myUpload);

// 引入rem适配文件，动态计算document fontSize
import './rem';


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
