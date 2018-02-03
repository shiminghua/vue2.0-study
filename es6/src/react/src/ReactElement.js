/**
 * react element
 */
import warning from '../fbjs/warning';
import { REACT_ELEMENT_TYPE } from '../shared/ReactSymbols';

import ReactCurrentOwner from './ReactCurrentOwner';

// 有自己的属性
const hasOwnProperty = Object.prototype.hasOwnProperty;

// 保留的 props
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

/**
 * special - 特别的，专用的
 */
let specialPropKeyWarningShown, specialPropRefWarningShown;

/**
 * 有有效的 ref
 */
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

/**
 * 有有效的 key
 */
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

/**
 * define key prop warning getter
 * 定义 key prop 警告getter。
 */
function defineKeyPropWarningGetter(props, displayName) {
  // Accessing 访问，接近，到达
  const warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(
        false,
        /**
         * key 不是一个属性。视图访问它将返回 undefined。
         * 如果您需要在子组件中访问相同的值，你应该把它当作一个不同的 prop。
         */
        '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. ' +
        'If you need to access the same value within the child component, ' +
        'you should pass it as a different prop. (https://fb.me/react-special-props)',
        displayName
      );
    }
  }
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true,
  });
}

/**
 * define ref prop warning getter
 */
function defineRefPropWarningGetter(props, displayName) {
  const warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(
        false,
        /**
         * ref 不是一个属性。视图访问它将返回 undefined。
         * 如果您需要在子组件中访问相同的值，你应该把它当作一个不同的 prop。
         */
        '%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. ' +
        'If you need to access the same value within the child component, ' +
        'you should pass it as a different prop. (https://fb.me/react-special-props)',
        displayName,
      );
    }
  }
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true,
  });
}

/**
 * Factory method to create a new React element.
 * This no longer adheres to the class pattern, so do not use new to call it.
 * Also, no instanceof check will work. 
 * Instead test $$typeof field against Symbol.for('react.element') to check if something is a React Element.
 * 创建一个新React元素的工厂方法。这个不再依附于类模式，所以不要使用new来调用它。
 * 同样，没有instanceof检查将会起作用。
 * 相反测试 $$typeof 字段和检查 Symbol.for('react.element')，如果是 React 元素。
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * 一个*临时助手，用于检测“这个”与“所有者”的反应不同的地方。调用createElement，以便我们可以发出警告。
 * 我们想要去掉所有者，用箭头函数替换字符串' ref '，只要' this '和owner是相同的，行为就不会有变化。
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
     * This tag allow us to uniquely identify this as a React Element.
     * 这个标记允许我们唯一地将其标识为React元素。
     */
    $$typeof: REACT_ELEMENT_TYPE,
    /**
     * Built-on properties that belong on the element.
     * 构建在元素上的属性。
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
     * We put it on an external backing store so that we can freeze the whole object. 
     * This can be replaced with a WeakMap once they are implemented in commonly used development environments.
     * 验证标志目前是可以改变的。
     * 我们把它放在一个外部后备存储器上，这样我们就可以把整个物体都冷冻起来。
     * 一旦它们在常用的开发环境中实现，就可以用一个弱映射替换它。
     */
    element._store = {};
    /**
     * To make comparing ReactElements easier for testing purposes, 
     * we make the validation flag non-enumerable 
     * (where possible, which should include every environment we run tests in), 
     * so the test framework ignores it.
     * 为了便于测试，为了便于比较，我们使验证标志不可枚举(在可能的情况下，应该包括我们运行测试的每个环境?)，
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
     * Two elements created in two different places 
     * should be considered equal for testing purposes and therefore we hide it from enumeration.
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
 * 创建并返回给定类型的新元素。
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
    // 如果有有效的 ref
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
     * 剩余的属性被添加到一个新的道具对象中。
     */
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  };

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
   * 解决默认 props
   */
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  if (__DEV__) {
    if (key || ref) {
      if (typeof props.$$typeof === undefined || props.$$typeof !== REACT_ELEMENT_TYPE) {
        const displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
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


