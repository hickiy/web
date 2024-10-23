"use strict";
// 泛型
/**
 * 使用<T> 这种形式表示泛型
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// 泛型函数
function rangeType(arg) {
    return arg;
}
function identity(arg) {
    return arg;
}
var myIdentity1 = identity; // 推断泛型类型
var myIdentity2 = identity; // 显示声明泛型类型
// 泛型类
var Machine = /** @class */ (function () {
    function Machine() {
    }
    return Machine;
}());
var machine1 = new Machine(); // 生成实例时  显示指定泛型的类型
machine1.name = 1; // 赋值时必须匹配所指定的类型
machine1.add = function (x, y) { return x * y; }; // 赋值时必须匹配所指定的类型
function rangeTypeFn1(arg) {
    return arg;
}
rangeTypeFn1({ x: 1, y: 2 }); // 传递的参数必须符合泛型所继承的接口的约束
// 类类型的泛型
var Card = /** @class */ (function () {
    function Card() {
        this.nameed = '桌子';
    }
    return Card;
}());
var Box = /** @class */ (function (_super) {
    __extends(Box, _super);
    function Box(name) {
        if (name === void 0) { name = '盒子'; }
        var _this = _super.call(this) || this;
        _this.nameed = name;
        return _this;
    }
    return Box;
}(Card));
function createTable(c) {
    return new c();
}
console.log(createTable(Box).nameed);
exports.default = {};
