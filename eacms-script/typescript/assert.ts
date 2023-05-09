function identity<T>(arg: T): T {
  return arg;
}

// 类型声明
let myIdentity1: <T>(arg: T) => T = identity;

let myIdentity2: { <T>(arg: T): T } = identity;

// 前置的类型断言
let myIdentity3 = <{ <T>(arg: T): T }>identity;

// 后置类型断言（在ts中使用jsx必须使用这种形式）
let myIdentity4 = identity as <T>(arg: T) => T;

let myIdentity5 = identity as { <T>(arg: T): T };
