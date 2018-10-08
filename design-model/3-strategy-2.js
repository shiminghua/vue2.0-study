/**
 * strategy 策略模式
 */

// 策略模式：定义算法族，分别封装起来，让他们之间可以相互替换，此模式让算法的变化独立于使用算法的客户。


/**
 * 缓动动画
 * 
 * @param {number} t 动画已消耗的时间
 * @param {number} b 小球原始位置
 * @param {number} c 小球目标位置 - 小球移动距离
 * @param {number} d 动画持续的总时间
 * 
 * @return number 动画元素应该处在的当前位置
 */
let tween = {
  linear: function (t, b, c, d) {
    return c * t / d + b;
  },
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  strongEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  strongEaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  sineaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  sineaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
};


let Animate = function (dom) {
  this.dom = dom; // 进行运动的dom节点
  this.startTime = 0; // 动画开始时间
  this.startPos = 0; // 动画开始时，dom节点的位置，即dom的初始位置
  this.endPos = 0; // 动画结束时，dom节点的位置，即dom的目标位置
  this.propertyName = null; // dom节点需要被改变的css属性名
  this.easing = null; // 缓动算法
  this.duration = null; // 动画持续时间
};

Animate.prototype.start = function (propertyName, endPos, duration, easing) {
  this.startTime = +new Date; // 动画启动时间
  this.startPos = this.dom.getBoundingClientRect()[propertyName]; // dom 节点初始位置
  this.propertyName = propertyName; // dom 节点需要被改变的css属性名
  this.endPos = endPos; // dom 节点目标位置
  this.duration = duration; // 动画持续时间
  this.easing = tween[easing]; // 缓动算法

  let self = this;
  // 启动定时器，开始执行动画
  let timeId = setInterval(function () {
    // 如果动画已结束，则清楚定时器
    if (self.step() === false) {
      clearInterval(timeId);
    }
  }, 20);
};

Animate.prototype.step = function () {
  let t = +new Date; // 取得当前时间
  if (t >= this.startTime + this.duration) {
    this.update(this.endPos); // 更新小球的css属性值
    return false;
  }
  let pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
  this.update(pos); // 更新小球的 css 属性值
};

Animate.prototype.update = function (pos) {
  this.dom.style[this.propertyName] = pos + 'px';
};


function test() {
  let div = document.getElementById('animate');
  let animate = new Animate(div);

  // animate.start('left', 500, 2000, 'strongEaseOut');
  // animate.start('left', 500, 2000, 'strongEaseIn');
  // animate.start('left', 500, 2000, 'easeIn');
  // animate.start('left', 500, 2000, 'linear');
  // animate.start('left', 500, 2000, 'sineaseIn');
  animate.start('left', 500, 2000, 'sineaseOut');
}

test();