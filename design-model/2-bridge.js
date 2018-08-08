/**
 * 城市间的公路 - 桥接模式
 * 
 * 桥接模式（bridge）：在系统沿多个维度变化的同时，又不增减起复杂度并已达到解耦。
 */

// 桥接模式最主要的的特点即是将实现层与抽象层解耦分离，使两部分可以独立变化。

/**
 * dom 事件绑定
 */
// 抽象
function changeColor(dom, color, bg) {
  // 设置元素的字体颜色
  dom.style.color = color;
  // 设置元素的北京颜色
  dom.style.background = bg;
}

// 使用
let spans = document.getElementsByTagName('span');
spans[0].onmouseover = function () {
  changeColor(this, 'red', '#ddd');
};
spans[0].onmouseout = function () {
  changeColor(this, '#333', '#f5f5f5');
};

/**
 * 多元化对象
 */
// 多维变量类
// 运动单元
function Speed(x, y) {
  this.x = x;
  this.y = y;
}
Speed.prototype.run = function () {
  console.log('运动起来');
};
// 着色单元
function Color(cl) {
  this.color = cl;
}
Color.prototype.draw = function () {
  console.log('绘制色彩');
};
// 变形单元
function Shape(sp) {
  this.shape = sp;
}
Shape.prototype.change = function () {
  console.log('改变形状');
};
// 说话单元
function Speek(wd) {
  this.word = wd;
}
Speek.prototype.say = function () {
  console.log('书写字体');
};

/**
 * 用法
 */
// 创建一个球类，并且它可以运动，可以着色
function Ball(x, y, c) {
  // 实现运动单元
  this.speed = new Speed(x, y);
  // 实现着色单元
  this.color = new Color(c);
};
Ball.prototype.init = function () {
  // 实现运动
  this.speed.run();
  // 实现着色
  this.color.draw();
};

// 创建一个人物类，他可以运动及说话
function People(x, y, f) {
  this.speed = new Speed(x, y);
  this.font = new Speek(f);
}
People.prototype.init = function () {
  this.speed.run();
  this.font.say();
};

// 创建精灵类，让它可以运动、着色、改变形状
function Spirite(x, y, c, s) {
  this.speed = new Speed(x, y);
  this.color = new Color(c);
  this.shape = new Shape(s);
}
Spirite.prototype.init = function () {
  this.speed.run();
  this.color.draw();
  this.shape.change();
};
