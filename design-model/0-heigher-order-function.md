# 高阶函数

高阶函数是指至少满足下列条件之一的函数：

1. 函数可以作为参数被传递。
2. 函数可以作为返回值输出。

## 箭头函数和普通函数的区别

- this
  1. 普通函数都有自己的 this
  2. 箭头函数不绑定 this，会捕获其所在上下文的 this 值，作为自己的 this 值。
- 箭头函数不绑定arguments
- 箭头函数不能用作构造器，和 new 一起用就会抛出错误。
- 箭头函数没有原型属性。var foo = () => {}; console.log(foo.prototype) //undefined
- 箭头函数当方法使用的时候没有定义 this 绑定

```JavaScript

var obj = {
  value: 1,
  add: () => console.log(this.value),
  double: function () {
    console.log(this.value * 2)
  }
}

obj.add();  //undefined
obj.double(); //2

```

## 函数作为参数传递

- 回调函数
- Array.prototype.sort

## 函数作为返回值输出

1. 判断数据的类型

```JavaScript

let isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  }
};

let isString = isType('String');
let isArray = isType('Array');
let isNumber = isType('Number');

console.log(isNumber(12));
console.log(isNumber('12'));

let Type = {};
for (let i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
  ((type) => {
    Type[`is${type}`] = function (obj) {
      return Object.prototype.toString.call(obj) === `[object ${type}]`;
    };
  })(type);
}

console.log(Type);
console.log(Type.isArray([]));
console.log(Type.isString('[]'));
console.log(Type.isString([]));

```

2. getSingle

```JavaScript

let getSingle = function (fn) {
  let ret;
  return function () {
    return ret || (ret = fn.apply(this, arguments));
  };
};

```

## 高阶函数实现AOP

AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，再通过“动态织入”的方式掺入业务逻辑模块中。这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，其次是可以很方便的复用日志统计等功能模块。

```JavaScript

Function.prototype.before = Function.prototype.before || function (beforeFn) {
  // 保存原函数的引用
  let _self = this;
  // 返回包含了原函数和新函数的代理函数
  return function () {
    // 执行新函数，修正this
    beforeFn.apply(this, arguments);
    // 执行原函数
    return _self.apply(this, arguments);
  };
};

Function.prototype.after = Function.prototype.after || function (afterFn) {
  let _self = this;
  return function () {
    let ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  };
};

let func = function func() {
  console.log(2);
};

func = func.before(() => {
  console.log(1);
}).after(() => {
  console.log(3);
});

func();

```

## 高阶函数的其他应用

1. currying - 函数柯里化（function currying）

百度百科对柯里化的解释：在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。

currying又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后，改函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。

```JavaScript

let currying = function currying(fn) {
  let args = [];
  return function () {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    }
    else {
      [].push.apply(args, arguments);
      return currying;
    }
  };
};

let cost = (function () {
  let money = 0;
  return function () {
    for (let i = 0, len = arguments.length; i < len; i++) {
      money += arguments[i];
    }
    return money;
  };
})();

cost = currying(cost);
cost(100);
cost(200);
cost(300);
console.log(cost());

// 更加通用的 currying 函数
function curry(fn){
  //第一个参数是基础执行方法，slice切除
  var args=Array.prototype.slice.call(arguments,1);
  //直接返回匿名函数
  return function(){
      //slice新参数以便能调用concat
      var innerArgs=Array.prototype.slice.call(arguments);
      //将配置的参数和新传入的参数合并
      var finalArgs=args.concat(innerArgs);
      return fn.apply(null,finalArgs);
  };
}


```

2. uncurrying 反柯里化

Uncurrying的话题来自JavaScript之父 Brendan Eich在2011年发表的一篇推特，它解决的问题是让对象去借用一个原本不属于自己的方法。在JS的语言环境中，我们可以通过call和apply完成this的转化，同样，用uncurrying可以解决this的转化问题。

```JavaScript

Function.prototype.uncurrying = function () {
  let self = this;
  return function () {
    let obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments);
  };
};

let push = Array.prototype.push.uncurrying();
(function() {
  console.log(arguments);
  push(arguments, 4);
  console.log(arguments);
})(1, 2, 3);

```

## 函数节流

在一些场景下，函数有可能被非常频繁的调用，从而造成大的性能问题。例如：window.onresize，mousemove，上传进度。

```JavaScript

let throttle = function (fn, interval) {
  let _self = fn, // 保存需要被延迟执行的函数引用
    timer, // 定时器
    firstTime = true; // 是否是第一次调用

  return function () {
    let args = arguments;
    _me = this;

    // 如果是第一次调用，不需延迟执行
    if (firstTime) {
      _self.apply(_me, args);
      return firstTime = false;
    }

    // 如果定时器还在，说明前一次延迟执行还没有完成
    if (timer) {
      return false;
    }

    // 延迟一段时间执行
    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      _self.apply(_me, args);
    }, interval || 500);
  };
};

window.onresize = throttle(function () {
  console.log(1);
}, 500);

```

## 分时函数

在短时间内向页面中大量添加dom节点的时候，会让浏览器吃不消，严重影响页面性能。

```JavaScript

let timeChunk = function (ary, fn, count) {
  let obj, t;

  let start = function () {
    let len = ary.length;
    for (let i = 0; i < Math.min(count || 1, len); i++) {
      obj = ary.shift();
      fn(obj);
    }
  };

  return function () {
    t = setInterval(function () {
      // 如果全部节点都已经被创建好
      if (ary.length === 0) {
        return clearInterval(t);
      }
      start();
    }, 200);
  };
};

let ary = [];
for (let i = 0; i < 100; i++) {
  ary.push(i);
}

let renderFriendList = timeChunk(ary, function (n) {
  let div = document.createElement('div');
  div.innerHTML = n;
  document.body.appendChild(div);
}, 15);

renderFriendList();

```

## 惰性加载函数

```JavaScript

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
addEvent(button, 'click', function () {
  alert(1);
});
addEvent(button, 'click', function () {
  alert(2);
});

```