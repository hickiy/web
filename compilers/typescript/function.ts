// 函数参数
/**
 * 
 * @param firstName // 必传参数
 * @param lasteName // 有默认值的参数  如果有默认值参数后面有其他参数  则在调用函数时必须传递此参数进行占位
 * @param age // 必传参数
 * @param address // 可选参数 可选参数必须在必传参数与有默认值参数后面
 */
function test(firstName: string, lasteName = 'jojo', age:number, address?:string){
    return console.log(`I am ${firstName} ${lasteName} \n Age were ${age} years old`)
}


// 函数重载
/**
 * 在typescript类型系统中  函数的类型定义只能明确其返回一种类型值 或者不明确其返回类型
 * 参数也明确其属于某种类型  或者不明确其类型
 * 在javascript中，同一个函数接受不同类型的参数，返回不退类型的结果很常见
 * 所以在typescript中 函数重载被用于解决这种场景
 * 在函数重载列表中依次检查 函数调用是否符合重载列表的某一项，符合则使用此项，不符合检查下一项，都不符合则报错
 */
let suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x: {suit: string; card: number; }[]): number; // 第一种重载 接受一个对象数组  返回一个number
function pickCard(x: number): {suit: string; card: number; }; // 第二种重载方式 接受一个number  返回一个对象
function pickCard(x): any { // 函数定义  注意：这里不是声明函数重载
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = '1122'
let pickedCard1 =pickCard(myDeck); // 这里参数类型不能匹配两种重载模式中的任何一种，所以报错
