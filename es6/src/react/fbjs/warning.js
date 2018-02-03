/**
 * warning
 */
let emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * 类似于不变量，但如果条件未满足，则只记录警告。
 * This can be used to log issues in development environments in critical paths.
 * 这可以用于在关键路径中记录开发环境中的问题。
 * Removing the logging code for production environments will keep the same logic and follow the same code paths.
 * 删除生产环境的日志代码将保持相同的逻辑并遵循相同的代码路径。
 *  Similar to invariant but only logs a warning if the condition is not met.
 * 类似于不变量，但如果条件未满足，则只记录警告。
 */

let warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  let printWarning = function printWarning(format, ...args) {
    let argIndex = 0;
    const message = `Warning: ${format.replace(/%s/g, () => args[argIndex++])}`;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      /**
       * --- Welcome to debugging React ---
       * 欢迎进入 React 调试
       * This error was thrown as a convenience so that you can use this stack 
       * to find the callsite that caused this warning to fire.
       * 这个错误是为了方便起见，所以您可以使用这个堆栈来查找引起此警告的调用点（callsite）。
       */
      throw new Error(message);
    }
    catch (x) { }
  };
  warning = function warning(condition, format, ...args) {
    if (format === undefined) {
      // `warning(condition, format, ...args)` 需要一个警告消息参数
      throw new Error('`warning(condition, format, ...args)` requires a warning message argument');
    }
    /**
     * Ignore CompositeComponent proptype check.
     * 忽略 CompositeComponent proptype 检查
     */
    if (format.indexOf('Failed Composite propType: ') === 0) {
      return;
    }
    if (!condition) {
      printWarning(format, ...args);
    }
  }
}

module.exports = warning;