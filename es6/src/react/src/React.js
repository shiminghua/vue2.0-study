/**
 * React
 */
import assign from 'object-assign';
import ReactVersion from '../shared/ReactVersion';
import { REACT_FRAGMENT_TYPE } from '../shared/ReactSymbols';

import { Component, PureComponent, AsyncComponent } from './ReactBaseClasses';
import { forEach, map, count, toArray, only } from './ReactChildren';
import ReactCurrentOwner from './ReactCurrentOwner';
import {
  createElement,
  createFactory,
  cloneElement,
  isValidElement,
} from './ReactElement';
import {
  createElementWithValidation,
  createFactoryWithValidation,
  cloneElementWithValidation,
} from './ReactElementValidator';
import ReactDebugCurrentFrame from './ReactDebugCurrentFrame';

const React = {
  // 子元素
  Children: {
    map,
    forEach,
    count,
    toArray,
    only,
  },

  // 组件
  Component,
  // 纯粹的组件
  PureComponent,
  // 不稳定的异步组件
  unstable_AsyncComponent: AsyncComponent,

  Fragment: REACT_FRAGMENT_TYPE,

  // 创建元素
  createElement: __DEV__ ? createElementWithValidation : createElement,
  // 拷贝元素
  cloneElement: __DEV__ ? cloneElementWithValidation : cloneElement,
  // 创建工厂函数
  createFactory: __DEV__ ? createFactoryWithValidation : createFactory,
  // 有效的元素
  isValidElement: isValidElement,

  // 版本号
  version: ReactVersion,

  // 秘密的内部构件
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner,
    /**
     * Used by renderers to avoid bundling object-assign twice in UMD bundles:
     * 由renders使用，以避免在UMD包中两次绑定object-assign
     */
    assign,
  },

};

if (__DEV__) {
  Object.assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactDebugCurrentFrame,
    /**
     * Shim for React DOM 16.0.0 which still destructured (but not used) this.
     * TODO: remove in React 17.0.
     */
    ReactComponentTreeHook: {},
  });
}

export default React;
