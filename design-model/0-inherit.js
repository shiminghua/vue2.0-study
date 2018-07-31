/**
 * 继承 inherit
 */

// /**
//  * 子类的原型对象 - 类式继承
//  */
// // 声明父类
// function SuperClass(name) {
//   this.superClass = true;
//   this.name = name;
// }
// SuperClass.prototype.getSuperValue = function () {
//   return this.superValue;
// };

// // 声明子类
// function SubClass() {
//   this.subValue = false;
// }
// SubClass.prototype = new SuperClass();
// SubClass.prototype.getSubValue = function () {
//   return this.subValue;
// };

// let superClass = new SuperClass('name');
// let subClass = new SubClass();

// console.log(SuperClass);
// console.log(SubClass);
// console.log(superClass);
// console.log(subClass);

// // 类式继承的两个缺点：
// // 由于子类通过其原型 prototype 对父类实例化，继承了父类。所以说要是父类中的共有属性是引用类型，就会在子类中被所有实例公用，因此一个子类的实例更改子类原型从父类构造函数中继承来的共有属性就会直接影响到其他子类。
// // 由于子类实现的继承是靠其原型 prototype 对父类的实例化实现的，因此在创建父类的时候是无法向父类传递参数的，因而在实例化父类的时候也无法对父类构造函数内的属性进行初始化。


// /**
//  * 创建即继承 - 构造函数继承
//  */
// // 声明父类
// function SuperBooks(id) {
//   this.books = ['javascript', 'html', 'css'];
//   this.id = id;
// }
// // 父类声明原型方法
// SuperBooks.prototype.showBooks = function () {
//   console.log(this.books);
// };
// // 声明子类
// function SubBooks(id) {
//   // 继承父类
//   SuperBooks.call(this, id);
// }

// let books1 = new SuperBooks('super books');
// let books2 = new SubBooks('sub books');

// books1.books.push('设计模式'); // ['javascript', 'html', 'css', '设计模式']
// console.log(books1.books);
// console.log(books2.books); // ['javascript', 'html', 'css']

// console.log(books1);
// console.log(books2);

// /**
//  * 将优点为我所用 - 组合式继承
//  */
// // 声明父类
// function SuperBook(name) {
//   // 值类共有属性
//   this.name = name;
//   // 引用类共有属性
//   this.books = ['javascript', 'html', 'css'];
// }
// // 父类原型共有方法
// SuperBook.prototype.getName = function () {
//   console.log(this.name);
// };

// // 声明子类
// function SubBook(name, time) {
//   // 构造函数式继承父类 name 属性
//   SuperBook.call(this, name);
//   // 子类中新增共有属性
//   this.time = time;
// }
// // 类式继承，子类原型继承父类
// SubBook.prototype = new SuperBook();
// // 子类原型方法
// SubBook.prototype.getTime = function () {
//   console.log(this.time);
// };

// let superBook = new SuperBook('js');
// let book1 = new SubBook('js book', 2013);
// let book2 = new SubBook('css book', 2014);
// console.log(superBook);
// console.log(book1);
// console.log(book2);

/**
 * 洁净的继承者 - 原型式继承
 */
// 原型式继承
function inheritObject(o) {
  // 声明一个过渡函数对象
  function F() { }
  // 过渡函数对象的原型继承父对象
  F.prototype = o;
  // 返回过渡函数对象的一个实例，该实例的原型继承了父对象
  return new F();
}

// let book = {
//   name: 'js book',
//   alikeBook: ['css book', 'html book'],
// };

// let newBook = inheritObject(book);
// newBook.name = 'ajax book';
// newBook.alikeBook.push('xml book');

// let otherBook = inheritObject(book);
// otherBook.name = 'flash book';
// otherBook.alikeBook.push('as book');

// console.log(newBook.name); // ajax book
// console.log(newBook.alikeBook); // ['css book', 'html book', 'xml book', 'as book']
// console.log(otherBook.name); // flash book
// console.log(otherBook.alikeBook); // ['css book', 'html book', 'xml book', 'as book']
// console.log(book.name); // js book
// console.log(book.alikeBook); // ['css book', 'html book', 'xml book', 'as book']

// 和类式继承一样，父类中的值类型的属性被复制，引用类型的属性被共用。


/**
 * 如虎添翼 - 寄生式继承
 */

// 声明基对象
let book = {
  name: 'js book',
  alikeBook: ['css book', 'html book'],
};
function createBook(obj) {
  // 通过原型继承方式创建新对象
  const o = inheritObject(obj);
  // 拓展新对象
  o.getName = function () {
    console.log(this.name);
  };
  // 返回拓展后的新对象
  return o;
}

const newBook = createBook(book);
console.log(newBook);
console.log(newBook.name, newBook.alikeBook);
newBook.getName();


/**
 * 终极继承者 - 寄生组合式继承
 */

/**
 * 寄生式继承 原型继承
 * @param {object} 子类
 * @param {superClass} 父类
 */
function inheritPrototype(subClass, superClass) {
  // 复制一份父类的原型保存在变量中
  let p = inheritObject(superClass.prototype);
  // 修正因为重写子类原型导致子类的 constructor 属性被修改
  p.constructor = subClass;
  // 设置子类的原型
  subClass.prototype = p;
}

// 定义父类
function SuperClass(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
// 定义父类原型方法
SuperClass.prototype.getName = function () {
  console.log(this.name);
};

// 定义子类
function SubClass(name, time) {
  // 构造函数式继承
  SuperClass.call(this, name);
  this.time = time;
}
// 寄生式继承父类原型
inheritPrototype(SubClass, SuperClass);
// 子类新增方法
SubClass.prototype.getTime = function () {
  console.log(this.time);
};

// 测试
let sub1 = new SubClass('js book', 2014);
let sub2 = new SubClass('css book', 2013);

sub1.colors.push('black');

console.log(sub1, sub1.colors);
console.log(sub2, sub2.colors);
sub1.getName();
sub1.getTime();
sub2.getName();
sub2.getTime();
