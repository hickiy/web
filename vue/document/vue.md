# vue编码风格

## 项目命名规则

``` javascript
/**
  * 文件夹 采用烤串形式
  * 文件名 采用烤串形式
  * 常量名称 采用小驼峰形式
  * 变量名称 采用小驼峰形式
  * 样式类名 采用烤串形式
  */
```

## vue 注意事项

```javascript
/**
 * 组件文件名 采用大驼峰命名
 * 组件名称 采用大驼峰命名
 * 引入组件的变量名称采用大驼峰
 * 注册组件 采用大驼峰命名
 * 组件模板(单文件)、字符串模板中（实例选项template），采用大驼峰且自闭合,具有插槽作用域的组件则写闭合标签
 * // 由vue编译器编译对模板中，对自定义标签的编译时，与注册标签的名称匹配过程是有一个转义过程的
 * // 转义规则：
 * // 1. case-name 写法会转义为三种形式 case-name caseName CaseName 这三种注册方式都能够被匹配到
 * // 2. caseName  写法会转义为两种形式 caseName CaseName 这两种注册方式都能被匹配到
 * // 3. CaseName  写法不会转义 注册时必须命名为 CaseName
 * DOM模板中组件名称采用烤串形式，且需要写闭合标签
 * // Dom模板中，由于html对与大小写不敏感，所以caseName、CaseName 两种写法都会被解析为 casename
 * // 在vue编译器对自定义标签进行解析时，casename 不会被转义，从而匹配不到  case-name caseName CaseName 这三种注册方式任意一种
 * // 所以在Dom模板中 必须以 case-name 声明自定义标签，这种格式的标签会被vue编译器进行转义
 * // 能够匹配 case-name caseName CaseName 三种注册方式中任意一种
 * // DOM模板使用场景 vue挂在元素在指定了elment挂载元素时 若挂载元素内部才能在DOM模板则会将其视为vue模板进行渲染
 * prop传递属性需要定义类型、设置默认值、是否必传、验证函数
 * 样式文件添加作用域scoped
 * 样式穿透使用::v-deep
 * /
```

## vue模板插值

``` jsx
<%= VALUE %> 用来做不转义插值；
<%- VALUE %> 用来做 HTML 转义插值；
<% expression %> 用来描述 JavaScript 流程控制。
an example
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

## vue添加工具函数

``` javascript
/**
* 以模块的形式，每个组件内使用时单独引入（使用麻烦）
* 使用全局的mixin混入，相当于每个实例上都定义一次该方法，（浪费内存）
* 全局provid注入，在引入时存在一个递归向上的查找过程、类似与原型链（需要注入inject）
* Vue构造函数原型中注册（推荐使用）（$、_、）两种属性名起始key以被vue内置使用，注意使用其他关键字
*/
```
