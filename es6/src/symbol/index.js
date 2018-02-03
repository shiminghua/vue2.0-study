/**
 * symbol
 */
import invariant from '../fbjs/lib/invariant';

// const firstName = Symbol('first name');
// const person = {};
// person[firstName] = 'minghua';

// console.log('first name' in person);
// console.log(person[firstName]);
// console.log(firstName);
// console.log(typeof firstName);


// const uid = Symbol.for('uid');
// const object = {
//   [uid]: '12345'
// };

// const symbols = Object.getOwnPropertySymbols(object);

// console.log(symbols.length); // 1
// console.log(symbols[0]); // 'Symbol(uid)'
// console.log(object[symbols[0]]); // '12345'
// const a = 1;
// let message = tag`Hello world.${a}dd\r\n`;
// console.log(message);

// function tag(literals, ...substitutions) {
//   console.log(literals, substitutions);
//   let result = '';

//   for (let i = 0; i < substitutions.length; i++) {
//     result += literals.raw[i];
//     result += substitutions[i];
//   }

//   result += literals.raw[literals.length - 1];

//   return result;
// }

// const emptyObject = {};
// console.log(emptyObject);

// // invariant(false, 'aaa%sbbb%sccc%sddd', '! ', '@ ', '# ', '$ ');

// // 函数尾调用优化
// function factorial(n) {
//   if (n <= 1) {
//     return 1;
//   }
//   else {
//     return n * factorial(n - 1);
//   }
// }

// function factorial2(n, p = 1) {
//   if (n <= 1) {
//     return 1 * p;
//   }
//   else {
//     let result = n * p;
//     return factorial2(n - 1, result);
//   }
// }

// let startTime = Date.now();
// let result = factorial(25);
// let result2 = factorial2(25);
// console.log(result);
// console.log(result2);
// let endTime = Date.now();

// console.log(startTime - endTime);

// let value = 5;
// function getValue() {
//   return value++;
// }

// // 初次解析函数声明时不会调用getValue方法，当调用add()函数且不传入第二个参数时才会调用。
// function add(first, second = getValue()) {
//   return first + second;
// }

// console.log(add(1, 1)); // 2
// console.log(add(1)); // 6
// console.log(add(1)); // 7


// function maxArgs(first, second = 'b') {
//   console.log(arguments.length); // 2
//   console.log(first === arguments[0]); // true
//   console.log(second === arguments[1]); // false
//   first = 'c';
//   second = 'd';
//   console.log(first === arguments[0]); // false
//   console.log(second === arguments[1]); // false
// }

// function Person(name) {
//   console.log(new.target);
//   console.log(new.target.name);
//   console.log(typeof new.target);
//   // if (typeof new.target === Person) {
//   if (typeof new.target !== 'undefined') {
//     this.name = name;
//   }
//   else {
//     throw new Error('必须通过 new 关键字来调用 Person。');
//   }
// }

// function AnotherPerson(name) {
//   Person.call(this, name);
// }

// const person = new Person('minghua');
// const anotherPerson = new AnotherPerson('minghua'); // 抛出错误

import './react-component-test';

const obj = {
  a: 1,
  0: 1,
  c: 1,
  2: 1,
  b: 1,
  1: 1,
}
obj.d = 1;

console.log(Object.getOwnPropertyNames(obj).join('')); // 012acbd

// const person = {
//   getGreeting() {
//     return 'Hello';
//   }
// };

// const dog = {
//   getGreeting() {
//     return 'Woof';
//   }
// };

// // 以 person 对象为原型
// const friend = Object.create(person);
// console.log(friend.getGreeting()); // "Hello"
// console.log(Object.getPrototypeOf(friend) === person); // true

// // 将原型设置为 dog
// Object.setPrototypeOf(friend, dog);
// console.log(friend.getGreeting()); // "Woof"
// console.log(Object.getPrototypeOf(friend) === dog); // true

const person = {
  getGreeting() {
    return 'Hello';
  },
};

// 以 person 对象为原型
const friend = {
  getGreeting() {
    return super.getGreeting() + ', hi!';
  },
};
Object.setPrototypeOf(friend, person);

// 原型是 friend
const relative = Object.create(friend);

console.log(person.getGreeting()); // 'Hello'
console.log(friend.getGreeting()); // 'Hello hi!'
console.log(relative.getGreeting()); // 'Hello hi!'
console.log(Object.getPrototypeOf(person) === Object); // false
console.log(Object.getPrototypeOf(friend) === person); // true
console.log(Object.getPrototypeOf(relative) === friend); // true
const obj2 = Object.create(Object);
console.log(Object.getPrototypeOf(obj2) === Object);
console.log(person, Object);