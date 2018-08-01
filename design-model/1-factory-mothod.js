/**
 * 工厂方法模式
 * 
 * 简单工厂模式（simple factory）：又叫静态工厂方法，由一个工厂对象决定创建某一种产品对象类的实例。主要用来创建同一类对象。
 */

/**

1. 通过工厂方法模式我们可以轻松创建多个类的实例对象
2. 工厂方法模式避免了使用者和对象类之间的耦合，用户不必关心创建该对象的具体类，只需调用工厂方法即可。

 */

// 安全模式创建的工厂类
const Factory = function (type, content) {
  if (this instanceof Factory) {
    return new this[type](content);
  }
  else {
    return new Factory(type, content);
  }
};

// 工厂原型中设置创建所有类型数据对象的类
Factory.prototype = {
  java: function (content) {
    // ......
    this.content = content;
    (function (content) {
      let div = document.createElement('div');
      div.innerHTML = content;
      div.style.border = '1px solid red';
      document.getElementById('container').appendChild(div);
    })(content);
  },
  javascript: function (content) {
    // ......
    this.content = content;
    (function (content) {
      let div = document.createElement('div');
      div.innerHTML = content;
      div.style.border = '1px solid red';
      document.getElementById('container').appendChild(div);
    })(content);
  },
  ui: function (content) {
    this.content = content;
    (function (content) {
      let div = document.createElement('div');
      div.innerHTML = content;
      div.style.border = '1px solid red';
      document.getElementById('container').appendChild(div);
    })(content);
  },
  php: function (content) {
    // ......
    this.content = content;
    (function (content) {
      let div = document.createElement('div');
      div.innerHTML = content;
      div.style.border = '1px solid red';
      document.getElementById('container').appendChild(div);
    })(content);
  },
};

// 测试
const data = [
  { type: 'javascript', content: 'javascript 哪家强' },
  { type: 'java', content: 'java 哪家强' },
  { type: 'ui', content: 'ui 哪家强' },
  { type: 'php', content: 'php 哪家强' },
];

for (let i = 0; i < data.length; i++) {
  Factory(data[i].type, data[i].content);
}
