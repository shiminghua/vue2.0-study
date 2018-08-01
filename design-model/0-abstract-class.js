/**
 * 抽象类
 * 
 * 1、abstract 在 JavaScript 中还是一个保留字，所以目前还不能象传统面向对象语言那样轻松创建。
 * 2、抽象类是一种声明但不能使用的类，当你使用时就会报错。
 * 3、我们可以在类的方法中手动抛出错误来模拟抽象类。
 */

// 汽车抽象类，当使用期实例对象的方法时会抛出错误
const Car = function() {};
Car.prototype = {
  getPrice: function() {
    throw new Error('抽象方法不能调用');
  },
  getSpeed: function() {
    throw new Error('抽象方法不能调用');
  },
};
