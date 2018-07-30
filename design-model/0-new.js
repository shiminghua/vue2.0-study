/**
 * new 操作符都干了什么
 */

function Func() { }
let func = new Func();

// new 共经历了四个阶段

// 1、创建一个空对象
let obj = new Object();

// 2、设置原型链
obj.__proto__ = Func.prototype;

// 3、让 Func 中的 this 指向 obj，并执行 Func 的函数体
let result = Func.call(obj);

// 4、判断 Func 的返回值类型；如果是值类型，返回obj；如果是引用类型，就返回这个引用类型的对象。
if (typeof result === 'object') {
  func = result;
}
else {
  func = obj;
}

// 举个栗子：
function Person1(name) {
  this.name = name;
}
function Person2(name) {
  this.name = name;
  return this.name;
}
function Person3(name) {
  this.name = name;
  return new String(name);
}
function Person4(name) {
  this.name = name;
  return function () { };
}
function Person5(name) {
  this.name = name;
  return new Array();
}

const person1 = new Person1('yuer'); // Person1 {name: 'yuer'}
const person2 = new Person2('yuer'); // Person2 {name: 'yuer'}
const person3 = new Person3('yuer'); // String {0: 'y', 1: 'u', 2: 'e', 3: 'r', length: 4, [[PrimitiveValue]]: "yuer"}
const person4 = new Person4('yuer'); // function() { }
const person5 = new Person5('yuer'); // []

console.log(person1);
console.log(person2);
console.log(person3);
console.log(person4);
console.log(person5);
