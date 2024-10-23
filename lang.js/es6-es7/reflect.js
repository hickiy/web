const target = {
  _a: 1,
  set a(value) {
    console.log(`Setter called with value ${value}`);
    this._a = value;
  }
};

const handler = {
  set(obj, prop, value) {
    console.log(`Setting value ${value} to property ${prop}`);
    // return Reflect.set(obj, prop, value); // 使用 Reflect.set
    obj[prop] = value; // 不使用 Reflect.set
    return true;
  }
};

const proxy = new Proxy(target, handler);
proxy.a = 2; // 控制台输出: Setting value 2 to property a
             // 控制台输出: Setter called with value 2