/**
 * react base classes
 */
import emptyObject from '../fbjs/emptyObject';
import invariant from '../fbjs/invariant';
import lowPriorityWarning from '../shared/lowPriorityWarning'; // 低优先级警告

import ReactNoopUpdateQueue from './ReactNoopUpdateQueue';

/**
 * Base class helpers for the updating state of a component.
 * 基类助手，用于更新组件的状态
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  /**
   * We initialize the default updater but the real one gets injected by the renderer.
   * 我们初始化默认的更新程序，但真正的更新是有渲染器注入的。
   */
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate state. 
 * You should treat `this.state` as immutable.
 * 设置状态的子集。经常用这个改变状态。你应该把状态看作是不可变的。
 * 
 * There is no guarantee that `this.state` will be immediately updated, 
 * so accessing `this.state` after calling this method may return the old value.
 * 并不能保证状态会立即更新，所以访问调用该方法后的状态 this.state 可能会返回旧值。
 * 
 * There is no guarantee that calls to `setState` will run synchronously, as they may eventually be batched together.
 * You can provide an optional callback that will be executed when the call to setState is actually completed.
 * 不能保证对“setState”的调用会同步运行，因为它们最终可能会被组合在一起。
 * 你可以提供一个可选的回调函数，当对“setState”的调用实际完成时，将执行该回调。
 * 
 * When a function is provided to setState, it will be called at some point in the future (not synchronously). 
 * It will be called with the up to date component arguments (state, props, context). 
 * These values can be different from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be assigned to this.
 * 当一个函数被提供给setState时，它将在将来某个时刻被调用（不是同步的）。
 * 它将调用到最新的组件参数（state, props, context）。
 * 这些值可能与this.*不同，因为你的功能将在receiveProps后shouldComponentUpdate前调用，
 * 新的 state, props, context 将不会被分配到。
 * 
 * @param {Object|function} partialState 
 * Next partial state or function to produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated. 在状态更新后调用。
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  invariant(
    typeof partialState === 'object' || typeof partialState === 'function' || partialState == null,
    // 获取状态变量的对象，以更新或返回一个返回状态变量的函数。
    'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
  );
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. 
 * This should only be invoked when it is known with certainty that we are **not** in a DOM transaction.
 * 更新兵力。当我们确定无疑不在一个DOM事务中时才调用此操作。
 * 
 * You may want to call this when you know that some deeper aspect of the component's state has changed 
 * but `setState` was not called.
 * 当您知道组件状态的某些更深的方面发生了变化，但是“setState”没有被调用时，您可能想要调用它。
 * 
 * This will not invoke `shouldComponentUpdate`, but it will invoke `componentWillUpdate` and `componentDidUpdate`.
 * 这不会调用 “shouldComponentUpdate”，但是会调用“componentWillUpdate”和“componentDidUpdate”。
 * 
 * @param {?function} callback Called after update is complete. 更新完成后调用
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. 
 * These APIs used to exist on classic React classes but since we would like to deprecate them, 
 * we're not going to move them over to this modern base class. 
 * Instead, we define a getter that warns if it's accessed.
 * 弃用 APIs。
 * 这些api曾经存在于经典的反应类中，但是由于我们想要贬低它们，所以我们不打算将它们转移到这个现代基类上。
 * 相反，我们定义一个getter，它在访问时警告它。
 */
if (__DEV__) {
  // 弃用api
  const deprecatedAPIs = {
    isMounted: [
      'isMounted',
      // 相反，要确保在componentWillUnmount中清除订阅和挂起的请求，以防止内存泄漏。
      'Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.'
    ],
    replaceState: [
      'replaceState',
      // 重构代码以使用设置状态(见https://github.com/facebook/react/issues/3236)。
      'Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236).'
    ]
  };
  // 定义启用警告函数
  const defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning(
          false,
          '%s(...) is deprecated in plain JavaScript React classes. %s',
          info[0],
          info[1]
        );
        return undefined;
      },
    });
  };
  // 如果使用了弃用的api，发出弃用警告
  for (const fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 * 基类助手，用于更新组件的状态
 */
// 纯粹的组件
function PureComponent(props, context, updater) {
  /**
   * Duplicated from Component. 从组建复制
   */
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  /**
   * We initialize the default updater but the real one gets injected by the renderer.
   * 我们初始化默认的更新程序，但真正的更新是由渲染器注入的。
   */
  this.updater = updater || ReactNoopUpdateQueue;
}

// 虚拟组件
function ComponentDummy() { }
ComponentDummy.prototype = Component.prototype;

const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
/**
 * Avoid an extra prototype jump for these methods.
 * 为这些方法避免额外的原型跳转。
 */
Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

// 异步组件
function AsyncComponent(props, context, updater) {
  // Duplicated from Component. 从 Component 复制
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  /**
   * We initialize the default updater but the real one gets injected by the renderer.
   * 我们初始化默认的更新程序，但真正的更新是由渲染器注入的。
   */
  this.updater = updater || ReactNoopUpdateQueue;
}

const asyncComponentPrototype = (AsyncComponent.prototype = new ComponentDummy());
asyncComponentPrototype.constructor = AsyncComponent;
/**
 * Avoid an extra prototype jump for these methods.
 * 为这些方法避免额外的原型跳转。
 */
Object.assign(asyncComponentPrototype, Component.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
};

export { Component, PureComponent, AsyncComponent };