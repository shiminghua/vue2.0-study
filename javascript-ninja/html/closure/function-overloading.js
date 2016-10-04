/**
 * 函数重载
 */
// 记忆函数
Function.prototype.memorized = function(key) {
  this._values = this._values || {};
  return this._values[key] !== undefined ? 
    this._values[key] : 
    this._values[key] = this.apply(this, arguments);
};

Function.prototype.memorize = function() {
  var fn = this;
  return function() {
    return fn.memorized.apply(fn, arguments);
  }
};

var isPrime = (function (num) {
  var prime = num != 1;
  for (var i = 2; i < num;i ++) {
    if (num % i === 0) {
      prime = false;
      break;
    }
  }
  return prime;
}).memorize();

assert(isPrime(17), 'The function works; 5 is prime.');
// assert(isPrime._values[5], 'The answers has been cached.');