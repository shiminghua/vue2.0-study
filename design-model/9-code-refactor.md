# 代码重构

## 1、提炼函数

1. 避免出现超大函数
2. 独立出来的函数有助于代码复用
3. 独立出来的函数更容易被覆写
4. 独立出来的函数如果有一个良好的命名，它本身就起到了注释的作用。

```JavaScript

let getUserInfo = function () {
  ajax('http://xxx.com/userInfo', (data) => {
    console.log(`userId: ${data.userId}`);
    console.log(`userName: ${data.userName}`);
    console.log(`nickName: ${data.nickName}`);
  });
};

```

改成：

```JavaScript

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

```

## 2、合并重复的条件片段

```JavaScript

let paging = function(currPage) {
  if (currPage <= 0) {
    currPage = 0;
    jump(currPage); // 跳转
  }
  else if (currPage > totalPage) {
    currPage = totalPage;
    jump(currPage);
  }
  else {
    jump(currPage);
  }
};

```

把 jump 函数独立出来：

```JavaScript

let paging = function(currPage) {
  if (currPage <= 0) {
    currPage = 0;
  }
  else if (currPage >= totalPage) {
    currPage = totalPage;
  }
  jump(currPage);
};

```

## 3、把条件分支语句提炼成函数

在程序设计中，复杂的条件分支语句是导致程序难以阅读和理解的重要原因，而且容易导致一个庞大的函数。

把判断夏天这句代码提炼成一个单独的函数，既能更准确的表达代码的意思，函数名本身又能起到注释的作用。

```JavaScript

let getPrice = function(price) {
  let date = new Date();
  if (date.getMonth() >= 6 && date.getMonth() <= 9) { // 夏天
    return price * 0.8;
  }
  return price;
};

```

改成：

```JavaScript

let isSummer = function() {
  let date = new Date();
  return date.getMonth() >=6 && date.getMonth() <= 9;
};

let getPrice = function(price) {
  if (isSummer()) { // 夏天
    return price * 0.8;
  }
  return price;
};

```

## 4、合理使用循环

函数体内，如果有些代码实际上负责的是一些重复性的工作，那么合理利用循环不仅可以完成同样的功能，还可以使代码量更少。

```JavaScript

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

```

改成：

```JavaScript

let createXHR = function() {
  let xhr;
  const versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
  for (let i = 0, version; version = versions[i++];) {
    try {
      xhr = new ActiveXObject(version);
    }
    catch (e) {}
  }
  return xhr;
};

```

## 5、提前让函数退出代替嵌套条件分支

嵌套的条件分支语句绝对是代码维护者的噩梦，对于阅读代码的人来说，嵌套的 if、else 语句相比平铺的 if、else ，在阅读和理解上更加困难，有时候一个外层 if 分支的左括号和右括号之间相隔 500 米之远。

```JavaScript

let del = function (obj) {
  let ret;
  if (!obj.isReadOnly) {
    if (obj.isFolder) {
      ret = deleteFolder(obj);
    }
    else if (obj.isFile) {
      ret = deleteFile(obj);
    }
  }
  return ret;
};

```

改为：

```JavaScript

let del = function (obj) {
  if (obj.isReadOnly) {
    return;
  }
  if (obj.isFloder) {
    return deleteFolder(obj);
  }
  if (obj.isFile) {
    return deleteFile(obj);
  }
};

```

## 6、传递对象参数代替过长的参数列表

参数的数量越多，函数就越难理解和使用。

## 7、尽量减少参数数量

## 8、少用三目运算符

如果条件分支逻辑简单且清晰，这无碍我们使用三目运算符。

如果条件分支逻辑非常复杂，我们还是使用 if、else。

```JavaScript

let global = typeof window !== 'undefined' ? window : this;

```

## 9、合理使用链式调用

如果该链条的结构相对稳定，后期不易发生修改，那么使用链式调用无可厚非。

如果该链条很容易发生变化，导致维护和调试困难，那么还是使用普通调用方式。

## 10、分解大型类

## 11、用 return 退出多重循环

```JavaScript

let print = function(i) {
  console.log(i);
};

let func = function() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (i * j > 30) {
        return print(i);
      }
    }
  }
};

func();

```