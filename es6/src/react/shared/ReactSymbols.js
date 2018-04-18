/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
/**
 * The Symbol used to tag the ReactElement-like types. 
 * If there is no native Symbol nor polyfill, then a plain number is used for performance.
 * Symbol 用于标记 ReactElement-like 的类型。
 * 如果没有本地符号或多填充，则使用普通数字进行性能测试。
 */
const hasSymbol = typeof Symbol === 'function' && Symbol.for;

// react element type
export const REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
// react call type
export const REACT_CALL_TYPE = hasSymbol ? Symbol.for('react.call') : 0xeac8;
// react return type
export const REACT_RETURN_TYPE = hasSymbol ? Symbol.for('react.return') : 0xeac9;
// react portal type 入口
export const REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
// react fragment type 碎片
export const REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
// react strict mode type 严格的模型
export const REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
// react provider type 供应者
export const REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
// react context type 环境、上下文
export const REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
// react async mode type 异步模式
export const REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
// react forward ref type 前裁判 向前的
export const REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;

// 也许是迭代器标志
const MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
// 假的迭代器符号 - 人造的
const FAUX_ITERATOR_SYMBOL = '@@iterator';

export function getIteratorFn(maybeIterable: ?any): ?() => Iterator<*> {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  const maybeIterator = (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}