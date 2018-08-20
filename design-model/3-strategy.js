/**
 * 活诸葛 - 策略模式
 * 
 * 策略模式（strategy）：将定义的一组算法封装起来，使其相互之间可以替换。封装的算法具有一定独立性，不会随客户端变化而变化。
 */

// 价格策略对象
let PriceStrategy = function () {
  // 内部算法对象
  let strategy = {
    // 100 返 30
    return30(price) {
      return +price + parseInt(price / 100) * 30;
    },
    // 100 返 50
    return50(price) {
      return +price + parseInt(price / 100) * 50;
    },
    // 9折
    percent90(price) {
      return price * 100 * 90 / 10000;
    },
    // 8 折
    percent80(price) {
      return price * 100 * 80 / 10000;
    },
    // 5 折
    percent50(price) {
      return price * 100 * 50 / 10000;
    },
  };

  // 策略算法调用接口
  return function (algorithm, price) {
    // 如果算法存在，则调用算法，否则返回false
    return strategy[algorithm] && strategy[algorithm](price);
  };
}();

// 使用
let price = PriceStrategy('percent50', '350');
console.log(price);


// 表单验证
let InputStrategy = function () {
  let strategy = {
    // 是否为空
    notNull(value) {
      return /\s+/.test(value) ? '请输入内容' : '';
    },
    // 是否为一个数字
    number(value) {
      return /^[0-9]+(\.[0-9]+)?$/.test(value) ? '' : '请输入数字';
    },
    // 是否是本地电话
    phone(value) {
      return /^\d{3}\-\d{8}$|^\d{4}\-\d{8}$/.test(value) ? '' : '请输入正确的电话号码';
    },
  };

  return {
    // 验证接口
    check(type, value) {
      // 去除首尾空格
      value = value.replace(/^\s+|\s+$/g, '');
      return strategy[type] ? strategy[type](value) : '没有该类型的检测方法';
    },
    // 添加策略 
    addStrategy(type, fn) {
      strategy[type] = fn;
    },
  };
};

// 拓展 可以延伸算法
InputStrategy.addStrategy('nickname', function (value) {
  return /^[a-zA-Z]\w{3,7}$/.test(value) ? '' : '请输入一个4-8位昵称';
});

// 外观模式简化元素的获取
function $tag(tag, context) {
  context = context || document;
  return context.getElementByTagName(tag);
}

// 提交按钮点击
$tag('input')[1].onclick = function () {
  let value = $tag('input')[0].value;
  // 获取昵称验证结果
  $tag('span')[0].innerHTML = InputStrategy.check('nickname', value);
};

