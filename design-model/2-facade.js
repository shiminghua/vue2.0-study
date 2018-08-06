/**
 * 套餐服务 - 外观模式
 * 
 * 外观模式（facade）：为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口的访问更容易。
 */

// 外观模式实现
function addEvent(dom, type, fn) {
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
}

// 很多代码库是通过外观模式来封装多个功能，简化底层操作方法

const A = {
  // 通过ID获取元素
  g(id) {
    return document.getElementById(id);
  },
  // 设置元素css属性
  css(id, key, value) {
    document.getElementById(id).style[key] = value;
  },
  // 设置元素的属性
  attr(id, key, value) {
    document.getElementBuId(id)[key] = value;
  },
  html(id, html) {
    document.getElementBuId(id).innerHTML = html;
  },
  on(id, type, fn) {
    document.getElementById(id)['on' + type] = fn;
  },
};
