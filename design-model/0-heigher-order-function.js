/**
 * heigher-order function
 * 高阶函数
 */

// 函数作为返回值输出

// 1. 判断数据的类型

// let isString = function (obj) {
//   return Object.prototype.toString.call(obj) === '[object String]';
// };

// let isArray = function (obj) {
//   return Object.prototype.toString.call(obj) === '[object Array]';
// };

// let isNumber = function (obj) {
//   return Object.prototype.toString.call(obj) === '[object Number]';
// };

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

// 2. getSingle

let getSingle = function (fn) {
  let ret;
  return function () {
    return ret || (ret = fn.apply(this, arguments));
  };
};


// 高阶函数实现AOP

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


// 高阶函数的其他应用

// 1. 函数柯里化 currying

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

function curry(fn) {
  //第一个参数是基础执行方法，slice切除
  var args = Array.prototype.slice.call(arguments, 1);
  //直接返回匿名函数
  return function () {
    //slice新参数以便能调用concat
    var innerArgs = Array.prototype.slice.call(arguments);
    //将配置的参数和新传入的参数合并
    var finalArgs = args.concat(innerArgs);
    return fn.apply(null, finalArgs);
  };
}

let curryCost = curry(cost);
curryCost(100);
curryCost(200);
curryCost(300);
console.log(cost)

// 2. uncurrying 反柯里化
Function.prototype.uncurrying = function () {
  let self = this;
  return function () {
    let obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments);
  };
};

let push = Array.prototype.push.uncurrying();
(function () {
  console.log(arguments);
  push(arguments, 4);
  console.log(arguments);
})(1, 2, 3);


// 函数节流

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

var obj = {
  value: 1,
  add: () => console.log(this.value),
  double: function () {
    console.log(this.value * 2)
  }
}

obj.add();  //undefined
obj.double(); //2

// 分时函数

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
addEvent(button, 'click', function () {
  alert(1);
});
addEvent(button, 'click', function () {
  alert(2);
});