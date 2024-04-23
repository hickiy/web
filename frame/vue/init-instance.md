# 初始化实例

## 1. 当我们导入 Vue 的时候，我们导入的是什么？

```js
// 我们导入的是dist/vue.runtime.common.js
// 而dist/vue.runtime.common.js导入的是 src/platforms/web/runtime/index.js
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./vue.runtime.common.prod.js')
} else {
  module.exports = require('./vue.runtime.common.dev.js')
}


// 这里src/platforms/web/runtime/index.js导入了src/core/index.js
import Vue from 'core/index'
... // 省略
Vue.prototype.__patch__ = inBrowser ? patch : noop
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
export default Vue


// 这里src/core/index.js导入了src/core/instance/index.js
import Vue from './instance/index'
... // 省略
initGlobalAPI(Vue)
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})
// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})
export default Vue


// 这里src/core/instance/index.js的核心代码
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
import type { GlobalAPI } from 'types/global-api'

// vue的构造函数
function Vue(options) {
  // 在开发环境下，如果不是通过new关键字调用Vue构造函数，会发出警告
  if (__DEV__ && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化根实例
  this._init(options)
}

// 核心功能的初始化
initMixin(Vue)
// 这一步主要设置全局state相关的方法，如$set、$delete、$watch, $data, $props
stateMixin(Vue)
// 这一步主要设置全局事件相关的方法，如$on、$once、$off、$emit
eventsMixin(Vue)
// 这一步主要设置全局生命周期相关的方法，如_update、$forceUpdate、$destroy
lifecycleMixin(Vue)
// 这一步主要设置全局渲染相关的方法，如$nextTick、_render
renderMixin(Vue)

export default Vue as unknown as GlobalAPI
```

## 2. Vue 核心初始化过程 initMixin

- 这一步核心初始化顺序
  - 初始化实例生命周期 initLifecycle
  - 初始化实例事件 initEvents
  - 初始化实例渲染 initRender
  - 调用 beforeCreate 钩子函数 beforeCreate
  - 初始化 inject initInjections
  - 初始化 state initState (响应式核心)
  - 初始化 provide initProvide
  - 调用 created 钩子函数 created

```js
export function initMixin(Vue: typeof Component) {
  Vue.prototype._init = function (options?: Record<string, any>) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (__DEV__ && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to mark this as a Vue instance without having to do instanceof
    // check
    vm._isVue = true
    // avoid instances from being observed
    vm.__v_skip = true
    // effect scope
    vm._scope = new EffectScope(true /* detached */)
    // #13134 edge case where a child component is manually created during the
    // render of a parent component
    vm._scope.parent = undefined
    vm._scope._vm = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options as any)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor as any),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (__DEV__) {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate', undefined, false /* setContext */)
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (__DEV__ && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

## 3. Vue 响应式初始化过程 initState

- initState

  - initProps
  - initSetup
  - initMethods
  - initData
  - initComputed
  - initWatch

  ```js
  export function initState(vm: Component) {
    const opts = vm.$options;
    if (opts.props) initProps(vm, opts.props);

    // Composition API
    initSetup(vm);

    if (opts.methods) initMethods(vm, opts.methods);
    if (opts.data) {
      initData(vm);
    } else {
      const ob = observe((vm._data = {}));
      ob && ob.vmCount++;
    }
    if (opts.computed) initComputed(vm, opts.computed);
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }
  ```
