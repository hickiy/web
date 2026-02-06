# vue 语法风格指南

## options API

```js
// 基本写法
import { h } from 'vue';
export default {
  data() {
    return {
      msg: 'hello'
    };
  },
  render() {
    return h('div', this.msg);
  }
};

// 使用jsx
export default {
  data() {
    return {
      msg: 'hello'
    };
  },
  render() {
    return <div>{this.msg}</div>;
  }
};

// 使用ts
import { h, defineComponent } from 'vue';
type State = {
  msg: string;
};
export default defineComponent({
  data() {
    return {
      msg: 'hello'
    } as State;
  },
  render() {
    return h('div', this.msg);
  }
});

// 使用ts+jsx
import { defineComponent } from 'vue';
type State = {
  msg: string;
};
export default defineComponent({
  data() {
    return {
      msg: 'hello'
    } as State;
  },
  render() {
    return <div>{this.msg}</div>;
  }
});

```

## Composition API

```js
// 基本写法
import { h, reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      msg: 'hello'
    });
    return () => h('div', state.msg);
  }
};

// 使用jsx
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      msg: 'hello'
    });
    return () => <div>{state.msg}</div>;
  }
};

// 使用ts
import { h, reactive, defineComponent } from 'vue';
type State = {
  msg: string;
};
export default defineComponent({
  setup() {
    const state = reactive({
      msg: 'hello'
    }) as State;
    return () => h('div', state.msg);
  }
});

// 使用ts+jsx
import { reactive, defineComponent } from 'vue';
type State = {
  msg: string;
};
export default defineComponent({
  setup() {
    const state = reactive({
      msg: 'hello'
    }) as State;
    return () => <div>{state.msg}</div>;
  }
});
```

## 在 SFC 中使用方法

1. 在 script 标签中通过 lang 来定义使用的语言，如 lang="ts"，lang="js"，lang="jsx"，lang="tsx"等
2. 在使用 options API 时，使用方法与普通的 js/ts 文件一致
3. 在使用 Composition API, 不使用 setup 标记的情况下，使用方法与普通的 js/ts 文件一致，

### 在使用 Composition API, 使用 setup 标记时,使用方法如下

#### 使用 template

```vue
<template>
  <div>{{ state.msg }}</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
type State = {
  msg: string;
};
const state = reactive({
  msg: 'hello'
}) as State;
//
</script>
<style scoped lang="scss"></style>
```

#### 使用 setup + tsx

```vue
<script setup lang="tsx">
import { reactive } from 'vue';
type State = {
  msg: string;
};
const state = reactive({
  msg: 'hello'
}) as State;
return () => <div>{state.msg}</div>;
</script>
<style scoped lang="scss"></style>
```
