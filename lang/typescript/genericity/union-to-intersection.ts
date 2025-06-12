type UnionToIntersection<U> = 
  (U extends any ? (x: U) => any : never) extends (x: infer R) => any
    ? R
    : never;

// 示例
type A = { a: string }
type B = { b: number }
type C = { c: boolean }

type Union = A | B | C;
type Result = UnionToIntersection<Union>; // { a: string } & { b: number } & { c: boolean }



// 实例2
type EventMap = {
  click: { x: number, y: number },
  keydown: { key: string }
};

type EventHandlers = UnionToIntersection<
  { [K in keyof EventMap]: (event: EventMap[K]) => void }[keyof EventMap]
>;
// 得到 (event: { x: number, y: number }) => void & (event: { key: string }) => void


let clickHandler: EventHandlers = (event: EventMap['click'] | EventMap["keydown"]) => {
  if ('x' in event) {
    console.log(`Clicked at (${event.x}, ${event.y})`);
  } else if ('key' in event) {
    console.log(`Key pressed: ${event.key}`);
  }
};

let clickHandler2 = (event: {x:number, y:number, key: string}) => {
  if ('x' in event) {
    console.log(`Clicked at (${event.x}, ${event.y})`);
  } 
}

/*函数参数逆变的实际例子*/

// 这里clickHandler的参数不能赋值给clikcHandler2的参数, 所以clickHandler2不能赋值给clickHandler
// clickHandler = clickHandler2; 

// 这里clickHandler2的参数可以赋值给clikcHandler的参数, 所以clickHandler可以赋值给clickHandler2
clickHandler2 = clickHandler;