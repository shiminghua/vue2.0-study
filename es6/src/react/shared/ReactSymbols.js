/**
 * react symbols
 * The Symbol used to tag the ReactElement-like types.
 * If there is no native Symbol nor polyfill, then a plain number used for performance.
 */
// 是否存在Symbl
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

// 也许是迭代器标志
const MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
// 假的迭代器标志 - 人造的
const FAUX_ITERATOR_SYMBOL = '@@iterator';

export function getIteratorFn(maybeIterable) {
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