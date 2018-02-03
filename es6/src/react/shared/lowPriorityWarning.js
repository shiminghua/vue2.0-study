/**
 * Forked from fbjs/warning:
 * 从 fbjs/warning 分叉
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error, and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * 唯一的改变是我们用 console.warn 代替了 console.error，当不支持 console 时什么都不做。
 * 这确实简化了代码。
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical paths. 
 * Removing the logging code for production environments will keep the same logic and follow the same code paths.
 * 类似于不变量，但如果条件未满足，则只记录警告。
 * 这可以用于在关键路径中记录开发环境中的问题。
 * 删除生产环境的日志代码将保持相同的逻辑并遵循相同的代码路径。
 */

let lowPriorityWarning = function () { };

if (__DEV__) {
  const printWarning = function (format, ...args) {
    let argIndex = 0;
    const message = `Warning: ${format.replace(/%s/g, () => args[argIndex++])}`;
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      /**
       * --- Welcome to debugging React ---
       * This error was thrown as a convenience so that you can use this stack 
       * to find the callsite that caused this warning to fire.
       * 这个错误是为了方便起见，所以您可以使用这个堆栈来查找引起此警告的调用点（callsite）。
       */
      throw new Error(message);
    }
    catch (x) {

    }
  };

  lowPriorityWarning = function (condition, format, ...args) {
    if (format === undefined) {
      throw new Error(
        // `warning(condition, format, ...args)` 需要一个警告消息参数
        '`warning(condition, format, ...args)` requires a warning message argument'
      );
    }
    if (!condition) {
      printWarning(format, ...args);
    }
  };
}

export default lowPriorityWarning;