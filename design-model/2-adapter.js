/**
 * 水管弯弯 - 适配器模式
 * 
 * 适配器模式（adapter）：将一个类（对象）的接口（方法或属性）转化为另一个接口，以满足用户需求，使类（对象）之间接口的不兼容问题通过适配器得以解决。
 */

// 适配异类框架
const A = A || {};
A.g = (id) => {
  return document.getElementById(id);
};
A.on = (id, type, fn) => {
  // 如果传递参数时字符串以 id 处理，否则以元素对象处理
  const dom = typeof id === 'string' ? this.g(id) : id;
  // 对于支持dom2级事件处理程序 addEventListener方法的浏览器
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  }
  // 队友支持 attachEvent 方法的浏览器
  else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn);
  }
  // 对于支持 on + 事件名的浏览器
  else {
    dom['on' + type] = fn;
  }
};

// 适配 jQuery
A.g = (id) => {
  return $(`#+${id}`).get(0);
};
A.on = (id, type, fn) => {
  const dom = typeof id === 'string' ? $(`#${id}`) : $(id);
  dom.on(type, fn);
};

// 参数适配器
function doSomeThing(obj) {
  let _adapter = {
    name: 'name',
    title: '设计模式',
    age: 24,
    color: 'pink',
    size: 100,
    prize: 50,
  };
  for (let i in _adapter) {
    _adapter[i] = obj[i] || _adapter[i];
  }
  // 或者 extend(_adapter, obj)
  // do things
}

// 数据适配
// 原始数据
const arr = ['javascript', 'book', '前端编程语言', '8月1日'];
// 我们需要的数据
const obj = {
  name: '',
  type: '',
  title: '',
  time: '',
};
// 适配器
function arrToObjAdapter(arr) {
  return {
    name: arr[0],
    type: arr[1],
    title: arr[2],
    time: arr[3],
  };
};

// 服务器端数据适配
function ajaxAdapter(data) {
  // 处理数据并返回新数据
  return [data['key1'], data['key2'], data['key3']];
}
$.ajax({
  url: 'someAddress.php',
  success: (data, status) => {
    if (data) {
      // 使用适配后的数据
      doSomeThing(ajaxAdapter(data));
    }
  }
});
