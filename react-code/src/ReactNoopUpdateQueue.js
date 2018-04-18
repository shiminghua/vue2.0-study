/**
 * react noop update queue
 * react 等待更新队列
 */
import warning from '../fbjs/warning';

// 是否警告了未安装组件的状态更新
const didWarnStateUpdateForUnmountedComponent = {};

// instance - 实例
function warnNoop(publicInstance, callerName) {
  if (__DEV__) {
    const constructor = publicInstance.constructor;
    const componentName = (constructor && (constructor.displayName || constructor.name)) || 'ReactClass';
    const warningKey = `${componentName}.${callerName}`;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }

    warning(
      false,
      /**
       * 只能更新安装或安装组件。
       * 这通常意味着在未安装组件上调用%s()。
       * 这是一个空操作。请检查%s组件的代码。
       */
      '%s(...): Can only update a mounted or mounting component. ' +
      'This usually means you called %s() on an unmounted component. ' +
      'This is a no-op.\n\nPlease check the code for the %s component.',
      callerName,
      callerName,
      componentName,
    );
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 * 这是更新队列的抽象API。
 */
const ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * 检查这个复合组件是否挂载。
   * 
   * @param {ReactClass} publicInstance The instance we want to test. 我们要测试的实例。
   * @return {boolean} True if mounted, false otherwise. 真如挂载，否则为假。
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. 
   * This should only be invoked when it is known with certainty that we are **not** in a DOM transaction.
   * 部队一个更新。只有在确定我们在DOM事务中是**not**的情况下，才应该调用此操作。
   * 
   * You may want to call this when you know that some deeper aspect of the component's state has changed 
   * but `setState` was not called.
   * 当您知道组件状态的某些更深的方面发生了变化，但是“setState”没有被调用时，您可能想要调用它。
   * 
   * This will not invoke `shouldComponentUpdate`, but it will invoke `componentWill Update` and `componentDidUpdate`.
   * 这不会调用“shouldComponentUpdate”，但它会调用“componentWill Update”和“componentDidUpdate”。
   * 
   * @param {ReactClass} publicInstance The instance that should rerender. 应该重新运行的实例。
   * @param {?function} callback Called after component is updated. 在组件更新后调用。
   * @param {?string} callerName name of the calling function in the public API. 公共API中的调用函数的名称。
   * @internal 内部的
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, callerName);
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is internal.
   * This provides a merging strategy that is not available to deep properties which is confusing.
   * TODO: Expose pendingState or don't use it during the merge.
   * 设置状态的子集。这只存在因为_pendingState是内部的。
   * 这提供了一种合并策略，这种策略不能用于深层属性，这是令人困惑的。
   * TODO:在合并过程中暴露pendingState或不要使用它。
   * 
   * @param {ReactClass} publicInstance The instance that should rerender. 应该重新运行的实例。
   * @param {object} partialState Next partial state to be merged with state. 下一个部分状态与状态合并。
   * @param {?function} callback Called after component is updated. 在组件更新后调用。
   * @param {?string} callerName Name of the calling function in the public API. 公共API中的调用函数的名称。
   * @internal 内部的
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  },
};

export default ReactNoopUpdateQueue;