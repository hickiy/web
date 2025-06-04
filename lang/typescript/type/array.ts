let arr1:number[] = [111] // 类型数组 概念源自于dataview
let arr2:Array<string> = ['222'] // 数组泛型
let arr3:[number, string] = [1, '222'] // 联合类型tuple
// tuple类型访问越界
// arr3[2] = true
// typescript编译器警告 index 2 元素不存在，
// 默认类型为undefined 布尔类型不能赋值给undefined类型