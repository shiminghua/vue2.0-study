/**
 * 一个人的寂寞 - 单例模式
 * 
 * 单例模式（Singleton）：又被称为单体模式，是只允许实例化一次的对象类。
 * 有时我们也用一个对象来规划一个明明空间，井井有条的管理对象上的属性与方法。
 */

//  创建一个小型代码库
const A = {
  util: {
    util_method1: function () { },
    util_method2: () => { },
  },
  tool: {
    tool_method1: () => { },
    tool_method2: () => { },
  },
  ajax: {
    get: () => { },
    post: () => { },
  },
  others: {
    others_method1() { },
    others_method2() { },
  },
};

// 无法修改的静态变量
const Conf = (() => {
  // 私有变量
  const conf = {
    MAX_NUM: 100,
    MIN_NUM: 1,
    COUNT: 100,
  };
  // 返回取值器对象
  return {
    // 取值器方法
    get(name) {
      return conf[name] ? conf[name] : null;
    }
  };
})();

// 惰性单例 - 惰性创建
// 惰性载入单例
const LazySingle = (() => {
  // 单例实例引用
  let _instance = null;
  // 单例
  function Single() {
    /* 在这里定义私有属性和方法 */
    return {
      publicMethod() { },
      publicProperty: '1.1.0'
    };
  }
  // 获取单例对象接口
  return function () {
    // 如果未创建单例，将创建单例
    if (!_instance) {
      _instance = Single();
    }
    return _instance;
  };
})();

// 测试
console.log(LazySingle().publicProperty);