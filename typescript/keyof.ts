function pluck<T, S extends keyof T>(o: T, names: S[]): T[S][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
    is: boolean;
}
let person: Person = {
    name: 'Jarid',
    age: 35,
    is: true,
};
let strings: Array<number | string | boolean> = pluck(person, ['name', 'age', 'is']); // ok, string[]

export {}