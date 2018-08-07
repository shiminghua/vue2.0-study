/**
 * 房子装修 - 装饰者模式
 * 
 * 装饰者模式（Decorator）：在不改变原对象的基础上，通过对齐包装拓展（添加属性或者方法）使原有对象可以满足用户的更复杂需求。
 */

// 1. 适配器模式是对对象内部结构的重组，因此了解其自身结构是必须的。
// 2. 装饰者是一种良性拓展，不用了解其具体实现，只是在外部进行了一次封装拓展，这又是对原有功能完整性的一种保护。

/**
 * 原有功能
 */
// 输入框元素
let telInput = document.getElementById('tel_input');
// 输入格式提示文案
let telWarnText = document.getElementById('tel_warn_text');
// 点击输入框显示输入格式提示文案
telInput.onclick = function () {
  telWarnText.style.display = 'inline-block';
};

/**
 * 装饰者
 */
let decorator = function (input, fn) {
  // 获取事件源
  let input = document.getElementById(input);
  // 若事件源已经绑定事件
  if (typeof input.onclick === 'function') {
    // 缓存事件源原有函数
    let oldClickFn = input.onclick;
    // 为事件源定义新的事件
    input.onclick = function () {
      // 事件源原有回调函数
      oldClickFn();
      // 执行事件源新增回调函数
      fn();
    };
  }
  else {
    // 事件源未绑定事件，直接为事件源添加回调函数
    input.onclick = fn();
  }
};

// 使用
// 电话输入框功能装饰
decorator('tel_input', function () {
  document.getElementById('tel_demo_text').style.display = 'none';
});
// 姓名输入框功能装饰
decorator('name_input', function () {
  document.getElementById('name_demo_text').style.display = 'none';
});
