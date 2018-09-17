/**
 * heigher-order function
 * 高阶函数
 */
// 惰性加载函数
let addEvent = function (elem, type, handler) {
  if (window.addEventListener) {
    addEvent = function (elem, type, handler) {
      elem.addEventListener(type, handler, false);
    }
  }
  else if (window.attachEvent) {
    addEvent = function (elem, type, handler) {
      elem.attachEvent('on' + type, handler);
    }
  }

  addEvent(elem, type, handler);
};

let button = document.getElementById('button');
console.log(addEvent);
addEvent(button, 'click', function() {
  alert(1);
});
console.log(addEvent);
addEvent(button, 'click', function() {
  alert(2);
});
console.log(addEvent);

// 分时函数
