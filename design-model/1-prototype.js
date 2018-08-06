/**
 * 语言之魂 - 原型模式
 * 
 * 原型模式（Prototype）：用原型实例指向创建对象的类，是用于创建新的对象的类共享原型对象的属性和方法。
 */

// 原型模式就是将可复用的、可共享的、耗时大的从基类中提出来然后放在其原型中，然后类通过组合继承或寄生组合式继承而将方法和属性继承下来，对于子类中哪些需要重写的方法进行重写，这样子类创建的对象即具有子类的属性和方法也共享了基类的原型方法。

// 原型模式可以让多个对象分享同一个原型对象的属性和方法，这也是一种继承方式。不过这种继承的实现是不需要创建的，而是将原型对象分享给那些继承的对象。

// 原型对象更适合在创建复杂的对象时，对于那些需求一直在变化而导致对象结构不停的改变时，将那些比较稳定的属性和方法公用而提取的继承的实现。

// 图片轮播类
let LoopImages = function (imgArr, container) {
  this.imageArr = imgArr; // 轮播图片数据
  this.container = container; // 轮播图片容器
};
LoopImages.prototype = {
  // 创建轮播图片
  createImage: function () {
    console.log('LoopImages createImage function');
  },
  // 切换下一张图片
  changeImage: function () {
    console.log('LoopImages changeImage function');
  },
};

// 上下滑动切换类
let SlideLoopImg = function (imgArr, container) {
  // 构造函数继承图片轮播类
  LoopImages.call(this, imgArr, container);
};
SlideLoopImg.prototype = new LoopImages();
// 重写继承的切换下一张图片方法
SlideLoopImg.prototype.changeImage = function () {
  console.log('SlideLoopImg changeImage function');
};

// 渐隐切换类
let FadeLoopImg = function (imgArr, container, arrow) {
  LoopImages.call(this, imgArr, container);
  // 切换箭头私有变量
  this.arrow = arrow;
};
FadeLoopImg.prototype = new LoopImages();
FadeLoopImg.prototype.changeImage = function () {
  console.log('FadeLoopImg changeImage function');
};

// 测试
const fadeImg = new FadeLoopImg([], '#aa', true);
console.log(fadeImg);
console.log(fadeImg.container);
fadeImg.changeImage();
fadeImg.createImage();

// 1、原型对象是一个共享的对象，不论是父类的实例对象或者是子类的继承，都是对它的一个指向引用。
// 2、对原型对象的扩展，不论是子类还是父类的实例对象都会继承下来
LoopImages.prototype.getImageLength = function () {
  return this.imageArr.length;
};
FadeLoopImg.prototype.getContainer = function () {
  return this.container;
};

console.log(fadeImg.getImageLength());
console.log(fadeImg.getContainer());


// 原型继承
/**
 * 基于已经存在的模版对象克隆出新对象的模式
 * arguments[0], arguments[1], arguments[2]：参数1，参数2，参数3 表示模版对象
 * 注意：这里对模版引用类型的属性实质上进行了浅复制（引用类型属性共享），根据需求可以进行深复制（引用类型属性复制）
 */
function prototypeExtend() {
  // 缓存类，为实例化返回对象临时创建
  let F = function () { }, args = arguments, i = 0, len = args.length;
  for (; i < len; i++) {
    // 遍历每个模版对象中的属性
    for (let j in args[i]) {
      // 将这些属性复制到缓存类原型中
      F.prototype[j] = args[i][j];
    }
  }
  // 返回缓存类的一个实例
  return new F();
}

// 测试
const swim = {
  speed: 20,
  swim: function () { console.log('游泳速度：' + this.speed); },
};
const run = { run: function (speed) { console.log('奔跑速度' + speed); } };
const jump = { jump: function () { console.log('跳跃动作'); } };

// 创建企鹅实例对象
let penguin = prototypeExtend(swim, run, jump);

penguin.swim();
penguin.run(10);
penguin.jump();
console.log(penguin);

