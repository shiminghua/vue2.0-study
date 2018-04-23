/**
 * react element
 */
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * 版权(c) 2014-至今，Facebook, Inc。
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 此源代码在此源代码树的根目录下的许可文件中获得许可。
 */

import invariant from '../fbjs/invariant'; // invariant 不变量
import warning from '../fbjs/warning'; // warning 警告
import { REACT_ELEMENT_TYPE } from '../shared/ReactSymbols';

import ReactCurrentOwner from './ReactCurrentOwner';

const hasOwnProperty = Object.prototype.hasOwnProperty;

// 预留props
const RESERVED_PROPS = {
  key: true, // 键，钥匙
  ref: true, // 参考，引用
  __self: true, // 自己
  __source: true, // 来源
};

let specialPropKeyWarningShown, specialPropRefWarningShown;

// 有有效的ref
function hasValidRef(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'ref')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

// 有有效的key
function hasValidKey(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'key')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  const warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(
        false,
        '%s: `key` is not a prop. Trying to access it will result ' +
        'in `undefined` being returned. If you need to access the same ' +
        'value within the child component, you should pass it as a different ' +
        'prop. (https://fb.me/react-special-props)',
        displayName,
      );
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true,
  });
}

function defineRefPropWarningGetter(props, displayName) {
  const warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(
        false,
        '%s: `ref` is not a prop. Trying to access it will result ' +
        'in `undefined` being returned. If you need to access the same ' +
        'value within the child component, you should pass it as a different ' +
        'prop. (https://fb.me/react-special-props)',
        displayName,
      );
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true,
  });
}

/**
 * Factory method to create a new React element.
 * 工厂方法创建一个新的React元素。
 * This no longer adheres to the class pattern, so do not use new to call it.
 * 这个不再依附于类模式，所以不要使用new来调用它。
 * Also, no instanceof check will work. 
 * 同样，没有instanceof检查将会起作用。
 * Instead test $$typeof field against Symbol.for('react.element') to check if something is a React element.
 * 相反测试 $$typeof 字段与 Symbol.for('react.element') 检查什么东西是React element。
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self 
 * A *temporary* helper to detect places where `this` is different from the `Owner` when React.createElement is called, 
 * so that we can warn.
 * 一个临时助手，用于检测`this`和`owner`的不同，当调用 React.createElement的时候，以便我们发出警告。
 * We want to get rid of owner and replace string `ref`s with arrow functions,
 * and as long as `this` and owner are the same, there will be no change in behavior.
 * 我们想要去掉owner，用箭头函数去掉`ref`，只要`this`和owner是相同的，行为就不会有变化。
 * 
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * 一个注释对象(由传输器或其他方式添加)，指示文件名、行号和/或其他信息。
 * @param {*} owner
 * @param {*} props
 * @internal
 */
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    /**
     * This tag allows us to uniquely identify this as a React Element
     * 这个标记允许我们唯一地将其识别为一个React Element。
     */
    $$typeof: REACT_ELEMENT_TYPE,

    /**
     * Built-in properties that belong on the element
     * 内置在元素上的属性
     */
    type: type,
    key: key,
    ref: ref,
    props: props,

    /**
     * Record the component responsible for creating this element.
     * 记录负责创建此元素的组件。
     */
    _owner: owner,
  };

  if (__DEV__) {
    /**
     * The validation flag is currently mutative.
     * 验证标志目前是可以改变的。
     * We put it on an external backing store so that we can freeze the whole object.
     * 我们把它放在一个外部后备存储器上，这样我们就可以把整个物体都冷冻起来。
     * This can be replaced with a WeakMap once they are implemented in commonly used development environments.
     * 一旦它们在常用的开发环境中实现，就可以用一个弱映射替换它。
     */
    element._store = {};

    /**
     * To make comparing ReactElements easier for testing purposes,
     * 为了便于测试，为了便于比较，
     * we make the validation flag non-enumerable (where possible, which should incalude every environment we run tests in),
     * 我们让验证标志不可枚举(在可能的情况下，我们运行测试的每个环境都应该这样做)，
     * so the test framework ignores it.
     * 所以测试框架忽略了它。
     */
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false,
    });

    /**
     * self and source are DEV only properties.
     * self和source仅是DEV属性。
     */
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self,
    });
    /**
     * Two elements created in two different places should be considered 
     * equal for testing purposes and therefore we hide it from enumeration.
     * 在两个不同的地方创建的两个元素应该被视为测试目的，因此我们将它从枚举中隐藏起来。
     */
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source,
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 * 创建并返回给定类型的新ReactElement元素。
 */
export function createElement(type, config, children) {
  let propName;

  /**
   * Reserved names are extracted
   * 保留名称提取
   */
  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;

    /**
     * Remaining properties are added to a new props object
     * 剩余的属性被添加到一个新的props对象中。
     */
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  /**
   * Children can be more than one argument, and those are transferred onto the newly allocated props object.
   * 孩子可以不止一个参数，而那些被转移到新分配的道具对象上。
   */
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  }
  else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (__DEV__) {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  /**
   * Resolve default props
   * 解决默认props
   */
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  // 测试环境
  if (__DEV__) {
    if (key || ref) {
      if (
        typeof props.$$typeof === 'undefined' ||
        props.$$typeof !== REACT_ELEMENT_TYPE
      ) {
        const displayName =
          typeof type === 'function'
            ? type.displayName || type.name || 'Unknown'
            : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );

}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 * 返回一个函数，该函数产生给定类型的ReactElement。
 */
export function createFactory(type) {
  const factory = createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook: remove it
  /**
   * Expose the type on the factory and the prototype so that it can be easily accessed on elements. E.g. `<Foo />.type === Foo`.
   * 在工厂和原型上公开类型，这样就可以很容易地访问元素。举例说明： `<Foo />.type === Foo`.
   * This should not be named `constructor` since this may not be the function that created the element,
   * and it may not even be a constructor.
   * 这不应该被命名为“构造函数”，因为这可能不是创建元素的函数，它甚至可能不是构造函数。
   * Legacy hook: remove it
   * 遗留钩:删除它
   */
  factory.type = type;
  return factory;
}

/**
 * 使用新的key克隆旧元素，返回新元素
 * 
 * @param {*} oldElement 
 * @param {*} newKey 
 */
export function cloneAndReplaceKey(oldElement, newKey) {
  const newElement = ReactElement(
    oldElement.type,
    newKey,
    oldElement.ref,
    oldElement._self,
    oldElement._source,
    oldElement._owner,
    oldElement.props,
  );

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 * Clone and return a new ReactElement using element as the starting point.
 * 使用元素作为起始点来复制和返回一个新的元素。
 */
export function cloneElement(element, config, children) {
  invariant(
    !(element === null || element === undefined),
    'React.cloneElement(...): The argument must be a React element, but you passed %s.',
    element,
  );

  let propName;

  /**
   * Original props are copied
   * 原始props复制
   */
  const props = Object.assign({}, element.props);

  /**
   * Reserved names are extracted
   * 保留名称提取
   */
  let key = element.key;
  let ref = element.ref;

  /**
   * Self is preserved since the owner is preserved.
   */
  const self = element._self;
  /**
   * Source is preserved since cloneElement is unlikely to be targeted by a transpiler,
   * and the original source is probable a better indicator of the true owner.
   * 来源被保留，因为cloneElement不太可能被一个传输器作为目标，而且原始的来源很可能是真正拥有者的更好的指示器。
   */
  const source = element._source;

  /**
   * Owner will be preserved, unless ref is overridden
   * Owner 将被保存，除非 ref 被覆盖
   */
  const owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      /**
       * Silently steal the ref from the parent.
       * 悄悄从父节点窃取ref。
       */
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    /**
     * Remaining properties override existing props
     * 剩余的属性覆盖现存的props
     */
    let defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          /**
           * Resolve default props
           */
          props[propName] = defaultProps[propName];
        }
        else {
          props[propName] = config[propName];
        }
      }
    }
  }

  /**
   * Children can be more than one argument, and those are transferred onto the newly allocated props object.
   * 孩子可以不止一个参数，而那些被转移到新分配的props对象上。
   */
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  }
  else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * 验证对象是一个ReactElement
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
export function isValidElement(object) {
  return (
    typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE
  );
}
