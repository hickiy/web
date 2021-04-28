enum Direction0 { // 自增的枚举 
    Up ,          // 自增枚举可以双向映射
    Down ,
    Left,
    Right,
}

enum Direction1 { // 初始化的枚举
    Up = "UP",    // 字符串枚举只有单向映射
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

let c: Circle = {
    kind: ShapeKind.Square,
    radius: 100,
}