/**
 * 代码重构
 */

// ## 1、提炼函数

// 1. 避免出现超大函数
// 2. 独立出来的函数有助于代码复用
// 3. 独立出来的函数更容易被覆写
// 4. 独立出来的函数如果有一个良好的命名，它本身就起到了注释的作用。

let getUserInfo = function () {
  ajax('http://xxx.com/userInfo', (data) => {
    console.log(`userId: ${data.userId}`);
    console.log(`userName: ${data.userName}`);
    console.log(`nickName: ${data.nickName}`);
  });
};

// 改成
let getUserInfoRefactor = function () {
  ajax('http://xxx.com/userInfo', (data) => {
    printDetail(data);
  });
};

let printDetail = function (data) {
  console.log(`userId: ${data.userId}`);
  console.log(`userName: ${data.userName}`);
  console.log(`nickName: ${data.nickName}`);
};

// ## 4、合理使用循环

// 函数体内，如果有些代码实际上负责的是一些重复性的工作，那么合理利用循环不仅可以完成同样的功能，还可以使代码量更少。

let createXHR = function() {
  let xhr;
  try {
    xhr = new ActiveXObject('MSXML2.XMLHttp.6.0');
  }
  catch(e) {
    try {
      xhr = new ActiveXObject('MSXML2.XMLHttp.3.0');
    }
    catch(e) {
      xhr = new ActiveXObject('MSXML2.XMLHttp');
    }
  }
  return xhr;
};

let xhr = createXHR();
console.log('---->', xhr);