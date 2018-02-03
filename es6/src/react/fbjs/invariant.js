/**
 * invariant
 * 不变量
 * 
 * Use invariant() to assert state which your program assumes to be true.
 * 使用 invariant() 来断言你的程序假定为真的状态
 * 
 * Provide sprintf-style format (only %s is supported) and arguments 
 * to provide information about what broke and what you were expecting.
 * 提供打印格式（仅支持 %s ）和参数，以提供关于破坏的和你所期望的信息。
 * 
 * The invariant message will be stripped in production, 
 * but the invariant will remain to ensure logic does not differ in production.
 * The invariant message will be stripped in production,
 * but the invariant will remain to ensure logic does not differ in production.
 * 将在生产中剥离不变的消息，但不变量将保留，以确保逻辑在生产中没有差异。
 */

let validateFormat = function validateFormat(format) { };

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      // 不变量需要一个错误消息参数 invariant requires an error message argument
      throw new Error('invariant requires an error message argument');
    }
  };
}

// 错误提示函数
function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    let error;
    if (format === undefined) {
      /**
       * Minified exception occurred; use the non-minified dev environment for the full error message 
       * and additional helpful warnings.
       * 缩小异常发生；使用非缩小的dev环境来获得完整的错误消息和其他有用的警告。
       */
      error = new Error('Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.');
    }
    else {
      const args = [a, b, c, d, e, f];
      let argIndex = 0;
      error = new Error(format.replace(/%s/g, () => args[argIndex++]));
      error.name = 'Invariant Violation';
    }

    /**
     * we don't care about invariant's own frame
     * 我们不关心 invariant 的架构
     */
    error.framesToPop = 1;
    throw error;
  }
}

module.exports = invariant;