# 初始化状态

> 前三个初始化步骤，initProps、initSetup、initMethods，这几个步骤暂不分析
> 本文主要分析 initData、initComputed、initWatch

## 1. initData

- initData 内部主要调用了 observe 方法，将 data 对象转换成响应式对象
- observe 内部主要调用了 Observer 类，将 data 对象转换成响应式对象
- Observer 类内部主要调用了 defineReactive 方法，将 data 对象转换成响应式对象

```js
function initData(vm: Component) {
  let data: any = vm.$options.data
  data = vm._data = isFunction(data) ? getData(data, vm) : data || {}
  if (!isPlainObject(data)) {
    data = {}
    __DEV__ &&
      warn(
        'data functions should return an object:\n' +
          'https://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (__DEV__) {
      if (methods && hasOwn(methods, key)) {
        warn(`Method "${key}" has already been defined as a data property.`, vm)
      }
    }
    if (props && hasOwn(props, key)) {
      __DEV__ &&
        warn(
          `The data property "${key}" is already declared as a prop. ` +
            `Use prop default value instead.`,
          vm
        )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  const ob = observe(data)
  ob && ob.vmCount++
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
export function observe(
  value: any,
  shallow?: boolean,
  ssrMockReactivity?: boolean
): Observer | void {
  if (value && hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    return value.__ob__
  }
  if (
    shouldObserve &&
    (ssrMockReactivity || !isServerRendering()) &&
    (isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value.__v_skip /* ReactiveFlags.SKIP */ &&
    !isRef(value) &&
    !(value instanceof VNode)
  ) {
    return new Observer(value, shallow, ssrMockReactivity)
  }
}

export class Observer {
  dep: Dep
  vmCount: number // number of vms that have this object as root $data

  constructor(public value: any, public shallow = false, public mock = false) {
    // this.value = value
    this.dep = mock ? mockDep : new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (isArray(value)) {
      if (!mock) {
        if (hasProto) {
          /* eslint-disable no-proto */
          ;(value as any).__proto__ = arrayMethods
          /* eslint-enable no-proto */
        } else {
          for (let i = 0, l = arrayKeys.length; i < l; i++) {
            const key = arrayKeys[i]
            def(value, key, arrayMethods[key])
          }
        }
      }
      if (!shallow) {
        this.observeArray(value)
      }
    } else {
      /**
       * Walk through all properties and convert them into
       * getter/setters. This method should only be called when
       * value type is Object.
       */
      const keys = Object.keys(value)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        defineReactive(value, key, NO_INITIAL_VALUE, undefined, shallow, mock)
      }
    }
  }

  /**
 * Define a reactive property on an Object.
 */
export function defineReactive(obj: object, key: string, val?: any, customSetter?: Function | null, shallow?: boolean, mock?: boolean, observeEvenIfShallow = false) {
  // 处于闭包中的dep
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  // cater for pre-defined getter/setters
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && (val === NO_INITIAL_VALUE || arguments.length === 2)) {
    val = obj[key];
  }

  let childOb = shallow ? val && val.__ob__ : observe(val, false, mock);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    // 在挂载阶段，render函数内部对state的访问会调用getter，此时会收集依赖
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        if (__DEV__) {
          dep.depend({
            target: obj,
            type: TrackOpTypes.GET,
            key
          });
        } else {
          // 在这里收集依赖每个相应式属性对应的dep收集渲染watcher
          dep.depend();
        }
        if (childOb) {
          childOb.dep.depend();
          if (isArray(value)) {
            dependArray(value);
          }
        }
      }
      return isRef(value) && !shallow ? value.value : value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;
      if (!hasChanged(value, newVal)) {
        return;
      }
      if (__DEV__ && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else if (getter) {
        // #7981: for accessor properties without setter
        return;
      } else if (!shallow && isRef(value) && !isRef(newVal)) {
        value.value = newVal;
        return;
      } else {
        val = newVal;
      }
      childOb = shallow ? newVal && newVal.__ob__ : observe(newVal, false, mock);
      if (__DEV__) {
        dep.notify({
          type: TriggerOpTypes.SET,
          target: obj,
          key,
          newValue: newVal,
          oldValue: value
        });
      } else {
        //在state发生变更时，在这里触发依赖每个相应式属性对应的dep触发渲染watcher
        dep.notify();
      }
    }
  });

  return dep;
}
```

## 2. initComputed

- 内部主要调用了 defineComputed 方法，将 computed 对象转换成响应式对象
- defineComputed 内部主要调用了 createComputedGetter 方法，将 computed 对象转换成响应式对象

```js
// 计算属性的watcher配置项, lazy为true，表示计算属性的watcher是懒执行的
const computedWatcherOptions = { lazy: true };

function initComputed(vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = (vm._computedWatchers = Object.create(null));
  // computed properties are just getters during SSR
  const isSSR = isServerRendering();

  for (const key in computed) {
    const userDef = computed[key];
    const getter = isFunction(userDef) ? userDef : userDef.get;
    if (__DEV__ && getter == null) {
      warn(`Getter is missing for computed property "${key}".`, vm);
    }
    if (!isSSR) {
      // create internal watcher for the computed property.
      // 这里为每个计算属性创建一个watcher，这里称作计算属性的watcher（三类watcher中的一种）
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      // 主要是调用了defineComputed方法
      defineComputed(vm, key, userDef);
    } else if (__DEV__) {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm);
      } else if (vm.$options.methods && key in vm.$options.methods) {
        warn(`The computed property "${key}" is already defined as a method.`, vm);
      }
    }
  }
}

export function defineComputed(target: any, key: string, userDef: Record<string, any> | (() => any)) {
  const shouldCache = !isServerRendering();
  // 处理计算属性的get，生成一个包装函数对options.computed[key]进行包装
  if (isFunction(userDef)) {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (__DEV__ && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(`Computed property "${key}" was assigned to but it has no setter.`, this);
    };
  }
  // 在这里将计算属性挂载到vm实例上，这样就可以通过this.xxx访问计算属性了
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  // 返回一个包装过的get函数
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      // 脏检查，并重新求值
      if (watcher.dirty) {
        // 这里会调用watcher的evaluate方法，进而调用watcher的get方法
        // 在get方法中将计算watcher入栈，调用计算属性函数，计算属性依赖的dep会收集计算watcher
        watcher.evaluate();
        // 执行完毕后，将计算watcher出栈，栈顶为渲染watcher
      }
      if (Dep.target) {
        if (__DEV__ && Dep.target.onTrack) {
          Dep.target.onTrack({
            effect: Dep.target,
            target: this,
            type: TrackOpTypes.GET,
            key
          });
        }

        // 在这里重点是，计算属性本身是不存在dep的，计算属性只有对应的watcher
        // 这里调用dep.depend()方法取出计算watcher的deps，对渲染watcher进行依赖收集, 此时栈顶为渲染watcher
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
```

## 3. initWatch

- 内部主要调用了 createWatcher 方法，将 watch 对象转换成响应式对象
- createWatcher 内部主要调用了$watch 方法
- $watch 内部主要调用了 Watcher 类，为每个 watcher 创建一个 watcher 实例

```js
function initWatch(vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key];
    if (isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm: Component, expOrFn: string | (() => any), handler: any, options?: Object) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}

export function stateMixin(Vue: typeof Component) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  const dataDef: any = {};
  dataDef.get = function () {
    return this._data;
  };
  const propsDef: any = {};
  propsDef.get = function () {
    return this._props;
  };
  if (__DEV__) {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };
    propsDef.set = function () {
      warn(`$props is readonly.`, this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn: string | (() => any), cb: any, options?: Record<string, any>): Function {
    const vm: Component = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    // 这里调用了Watcher类，为每个watcher创建一个watcher实例
    const watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      const info = `callback for immediate watcher "${watcher.expression}"`;
      pushTarget();
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
      popTarget();
    }
    // 返回一个unwatch函数，用于取消监听
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
```

## 4. $mount

- $mount 方法的作用是把 vue 实例挂载到 dom 上，这里的核心是调用了 mountComponent 方法
- mountComponent 方法的作用是把 vue 实例挂载到 dom 上，这里的核心是调用了 mountComponent 方法

```js
Vue.prototype.$mount = function (el?: string | Element, hydrating?: boolean): Component {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// 函数较长，只保留了核心代码
export function mountComponent(vm: Component, el: Element | null | undefined, hydrating?: boolean): Component {
  vm.$el = el;

  // 调用beforeMount钩子函数
  callHook(vm, 'beforeMount');

  // vm._render()方法生成vnode
  // vm_update进行diff算法，生成patch方法，patch方法会将vnode转换成真实dom
  updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };

  // 渲染watcher才有的属性
  const watcherOptions: WatcherOptions = {
    before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  };

  // 这里为每个组件创建一个渲染watcher，这里称作渲染watcher（三类watcher中的一种）
  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, watcherOptions, true /* isRenderWatcher */);
  hydrating = false;

  // 这里判断是否是首次挂载，如果是首次挂载，调用mounted钩子函数
  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}
```

## 5. Watcher

-- Watcher 类的核心代码，功能点在下方注释

```js
constructor(
    vm: Component | null, // 组件实例
    expOrFn: string | (() => any), // 渲染函数，或者计算属性函数，或者watch的keypath|keyfunction
    cb: Function, // watch的回调函数
    options?: WatcherOptions | null, // watch的配置项
    isRenderWatcher?: boolean // 是否是渲染watcher
  ) {
    recordEffectScope(
      this,
      // if the active effect scope is manually created (not a component scope),
      // prioritize it
      activeEffectScope && !activeEffectScope._vm
        ? activeEffectScope
        : vm
        ? vm._scope
        : undefined
    )
    if ((this.vm = vm) && isRenderWatcher) {
      vm._watcher = this
    }
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
      if (__DEV__) {
        this.onTrack = options.onTrack
        this.onTrigger = options.onTrigger
      }
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.post = false
    this.dirty = this.lazy // 计算属性的dirty, lazy默认为true
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = __DEV__ ? expOrFn.toString() : ''

    // 对渲染函数，或者计算属性函数，或者watch的keypath|keyfunction，进行包装
    if (isFunction(expOrFn)) {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        __DEV__ &&
          warn(
            `Failed watching path: "${expOrFn}" ` +
              'Watcher only accepts simple dot-delimited paths. ' +
              'For full control, use a function instead.',
            vm
          )
      }
    }
    /* 核心解释 */
    // 在创建watcher阶段
    // 第一轮是计算属性的watcher，由于计算属性的lazy为true，所以不会执行get方法
    // 第二轮创建的是渲染watcher，将直接执行get方法，实现依赖收集
    // 最后是在$mount期间创建的渲染watcher，将直接执行get方法，进而执行updateComponent方法
    // 在updateComponent方法中，会执行vm._render()方法生成vnode
    // 在生成vnode的过程中，会访问state，触发state的getter，进而触发state的依赖收集
    // 同时也会访问计算属性，触发计算属性的getter，进而触发计算属性的依赖收集
    this.value = this.lazy ? undefined : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get() {
    // 维护一栈结构栈底为渲染watcher, 在触发getter时，将watcher入栈
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      // 在初始化阶段，watch watcher的getter，直接执行完成将回调注入到dep中
      // 在渲染阶段，首先会执行渲染watcher的getter，会执行vm._render()方法生成vnode，进而在渲染过程中完成整个依赖收集
      value = this.getter.call(vm, vm)
    } catch (e: any) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      // 依赖收集完成后，将watcher出栈
      popTarget()
      // 清理依赖
      this.cleanupDeps()
    }
    return value
  }

  /**
   * Add a dependency to this directive.
   */
  // 在这里收集依赖每个相应式属性对应的dep收集渲染watcher
  addDep(dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
  // 在这里对新旧depid进行对比，如果旧的depid不存在于新的depid中，
  // 则从的deps中移除当前watcher
  cleanupDeps() {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp: any = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update() {
    /* istanbul ignore else */
    if (this.lazy) {
      // 计算属性的watcher重新被触发，dirty重置为true，表示为脏，在下一轮render时，会重新计算
      this.dirty = true
    } else if (this.sync) {
      // watch watcher被重新触发，同步执行回调
      this.run()
    } else {
      // 渲染watcher被重新触发，将watcher放入队列中，等待下一轮event loop执行
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  // 执行watcher的回调
  run() {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {
          const info = `callback for watcher "${this.expression}"`
          invokeWithErrorHandling(
            this.cb,
            this.vm,
            [value, oldValue],
            this.vm,
            info
          )
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  // 计算属性求值，求值完成后，将dirty重置为false
  evaluate() {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  // 计算watcher, 被dep收集后，取出所有的dep，对渲染watcher进行依赖收集
  depend() {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  // 从所有依赖的dep中移除当前watcher
  teardown() {
    if (this.vm && !this.vm._isBeingDestroyed) {
      remove(this.vm._scope.effects, this)
    }
    if (this.active) {
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
      if (this.onStop) {
        this.onStop()
      }
    }
  }
}

```
