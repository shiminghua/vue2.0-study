/**
 * empty function
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
};

/**
 * This function accepts and discards inputs; it has no side effects. 
 * This is primarily useful idiomatically for overridable function endpoints which always need to be callable, 
 * since JS lacks a null-call idiom ala Cocoa.
 * 该函数接受和丢弃输入;它没有副作用。
 * 这对于经常需要被调用的可重写的函数端点来说是非常有用的，因为JS缺少一个null-call习语ala Cocoa。
 */
let emptyFunction = function emptyFunction() { };
emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;