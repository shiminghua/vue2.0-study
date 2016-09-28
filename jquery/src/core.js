/**
 * 全局标记
 */
let

  arr = [],

  document = window.document,

  getProto = Object.getPrototypeOf, // 获取原型对象

  slice = arr.slice,

  concat = arr.concat,

  push = arr.push,

  indexOf = arr.indexOf,

  class2type = {},

  toString = class2type.toString,

  hasOwn = class2type.hasOwnProperty,

  fnToString = hasOwn.toString,

  ObjectFunctionString = fnToString.call(Object),

  support = {},

  DOMEval = (function () {
    function DOMEval(code, doc) {
      doc = doc || document;
      let script = doc.createElement('script');

      script.text = code;
      doc.head.appendChild(script).parentNode.removeChild(script);
    }
    return DOMEval;
  })();

let

  version = '3.1.0',

  jQuery = function (selector, context) {
    return jQuery.fn.init(selector, context);
  },

  // Support: Android <=4.0 only
  // Make sure we trim BOM and NBSP
  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

  // Matches dashed string for camelizing
  rmsPrefix = /^-ms-/,
  rdashAlpha = /-([a-z])/g,

  // Used by jQuery.camelCase as callback to replace()
  fcamelCase = function (all, letter) {
    return letter.toUpperCase();
  };

jQuery.fn = jQuery.prototype = {
  //  The current version of jQuery being used
  jquery: version,

  constructor: jQuery,

  // The default length of a jQuery object is 0
  length: 0,

  toArray: function() {
    return slice.call( this );
  },

  // Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
  get: function( num ) {

    // Return all the elements in a clean array
    if ( num == null ) {
      return slice.call( this );
    }

    // Return just the one element from the set
    return num < 0 ? this[ num + this.length ] : this[ num ];

  },

  // Take an array of elements and push it onto the stack
	// (returning the new matched element set)
  pushStack: function( elems ) {

    // Build a new jQuery matched element set
    let ret = jQuery.merge( this.constructor(), elems );

    // Add the old object onto the stack (as a reference)
    ret.prevObject = this;

    // Return the newly-formed element set
    return ret;

  },

  // Execute a callback for every element in the matched set.
  each: function( callback ) {
    return jQuery.each( this, callback );
  },

  map: function( callback ) {
    return this.pushStack( jQuery.map( this, function( elem, i ) {
      return callback.call( elem, i, elem );
    } ) );
  },

  slice: function() {
    return this.pushStack( slice.apply( this, arguments ) );
  },

  first: function() {
    return this.eq( 0 );
  },

  last: function() {
    return this.eq( -1 );
  },

  eq: function( i ) {
    let len = this.length,
      j = +i + ( i < 0 ? len : 0 );
    return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : []);
  },

  end: function() {
    return this.prevObject || this.constructor();
  },

  // For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
  push: push,
  sort: arr.sort,
  splice: arr.splice

};

/**
 * 扩展方法
 */
jQuery.extend = jQuery.fn.extend = function() {

  let options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

    // 处理一个深拷贝的情况
    // Handle a deep copy situation
    if ( typeof target === 'boolean' ) {
      deep = target;

      // 跳过布尔值
      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // 当目标是一个字符串或其他（在深拷贝的情况下）
    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== 'object' && !jQuery.isFunction( target ) ) {
      target = {};
    }

    // 只传一个参数的时候，扩展jQuery本身
    // Extend jQuery itself if only one argument is passed
    if ( i === length ) {
      target = this;
      i--;
    }

    /**
     * 开始拷贝
     */
    for ( ; i < length; i++ ) {

      // 只处理非空值
      // Only deal with non-null/undefined values
      if ( ( options = arguments[ i ] ) != null ) {

        // 扩展基本对象
        // Extend the base object
        for ( name in options ) {
          src = target[ name ];
          copy = options[ name ];

          // 防止死循环
          // Prevent never-ending loop
          if ( target === copy ) {
            continue;
          }

          // 递归，如果合并普通的对象或数组
          // Recurse if we're merging plain objects or arrays
          if ( deep && copy &&  ( jQuery.isPlainObject( copy ) || ( copyIsArray = jQuery.isArray( copy ) ) ) ) {

            // 如果是数组
            if ( copyIsArray ) {
              copyIsArray = false;
              clone = src && jQuery.isArray( src ) ? src : [];
            }
            else {
              clone = src && jQuery.isPlainObject( src ) ? src : {};
            }

            // 从不移动原始对象，克隆他们
            // Never move original objects, clone them
            target[ name ] = jQuery.extend( deep, clone, copy );

          }
          // 不引入不确定的值
          // Don't bring in undefined values
          else if ( copy !== undefined ) {
            target[ name ] = copy;
          }

        }

      }

    }

    // 返回修改后的对象
    // Return the modified object
    return target;

};

/**
 * 扩展jQuery对象，原型继承模式
 */
jQuery.extend({

  // Unique for each copy of jQuery on the page
  expando: 'jQuery' + ( version + Math.random() ).replace( /\D/g, '' ),

  // 没有ready模块时，假设jQuery已经ready
  isReady: true,

  // 错误
  error: function( msg ) {
    throw new Error( msg );
  },

  // 空函数
  noop: function() {},

  // 是否为函数
  isFunction: function( obj ) {
    return jQuery.type( obj ) === 'function';
  },

  // 是否为数组
  isArray: Array.isArray,

  // 是否是window对象
  isWindow: function( obj ) {
    return obj != null && obj === obj.window;
  },

  // 是否是数字
  isNumeric: function( obj ) {
    // As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
    let type = jQuery.type( obj );
    return ( type === 'number' || type === 'string' ) && 
      // parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
      !isNaN( obj - parseFloat( obj ) );
  },

  // 是否为原生对象
  isPlainObject: function( obj ) {

    let proto, Ctor;

    // Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
    if ( !obj || toString.call( obj ) !== '[object Object]' ) {
      return false;
    }

    proto = getProto( obj );

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if ( !proto ) {
      return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = hasOwn.call( proto, 'constructor' ) && proto.constructor;
    return typeof Ctor === 'function' && fnToString.call( Ctor ) === ObjectFunctionString;

  },

  // 是否为空对象
  isEmptyObject: function( obj ) {

    /* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
    let name;
    for ( name in obj ) {
      return false;
    }
    return true;

  },

  type: function( obj ) {
    if ( obj == null ) {
      return obj + '';
    }

    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === 'object' || typeof obj === 'function' ? class2type[ toString.call( obj ) ] || 'object' : typeof obj;
  },

  // Evaluates a script in a global context
  globalEval: function( code ) {
    DOMEval( code );
  },

  // Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
  camelCase: function( string ) {
    return string.replace( rmsPrefix, 'ms-' ).replace( rdashAlpha, fcamelCase );
  },

  // 标签名
  nodeName: function( elem, name ) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  },

  each: function( obj, callback ) {
    let length, i = 0;

    if ( isArrayLike( obj ) ) {
      length = obj.length;
      for ( ; i < length; i++ ) {
        if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
          break;
        }
      }
    }
    else {
      for ( i in obj ) {
        if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
          break;
        }
      }
    }

    return obj;

  },

  // Support: Android <=4.0 only
  trim: function( text ) {
    return text == null ? '' : ( text + '' ).replace( rtrim, '' );
  },

  // results is for internal usage only
  makeArray: function( arr, results ) {
    let ret = results || [];

    if ( arr != null ) {
      if ( isArrayLike( Object( arr ) ) ) {
        jQuery.merge( ret, typeof arr === 'string' ? [ arr ] : arr );
      }
      else {
        push.call( ret, arr );
      }
    }
    
    return ret;
  },

  inArray: function( elem, arr, i ) {
    return arr == null ? -1 : indexOf.call( arr, elem, i );
  },

  // Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
  merge: function( first, second ) {
    let len = +second.length,
      j = 0,
      i = first.length;

      for ( ; j < len; j++ ) {
        first[ i++ ] = second[ j ];
      }

      first.length = i;

      return first;
  },

  // 检索目标行命令
  grep: function( elems, callback, invert ) {

    let callbackInverse,
      matches = [],
      i = 0,
      length = elems.length,
      callbackExpect = !invert;

    // Go through the array, only saving the items
		// that pass the validator function
    for ( ; i < length; i++ ) {
      callbackInverse = !callback( elems[ i ], i );
      if ( callbackInverse !== callbackExpect ) {
        matches.push( elems[ i ] );
      }
    }

    return matches;

  },

  // arg is for internal usage only
  map: function( elems, callback, arg ) {

    let length, value,
      i = 0,
      ret = [];

    // Go through the array, translating each of the items to their new values
    if ( isArrayLike( elems ) ) {
      length = elems.length;
      for ( ; i < length; i++ ) {
        value = callback( elems[ i ], i, arg );
        if ( value != null ) {
          ret.push( value );
        }
      }
    }

    // Go through every key on the object,
    else {
      for ( i in elems ) {
        value = callback( elems[ i ], i, arg );
        if ( value != null ) {
          ret.push( value );
        }
      }
    }

    // Flatten any nested arrays
    return concat.apply( [], ret );

  },

  // A global GUID counter for objects
  guid: 1,

  // Bind a function to a context, optionally partially applying any
	// arguments.
  proxy: function( fn, context ) {
    let tmp, args, proxy;

    if ( typeof context === 'string' ) {
      tmp = fn[ context ];
      context = fn;
      fn = tmp;
    }

    // Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
    if ( !jQuery.isFunction( fn ) ) {
      return undefined;
    }

    // Simulated bind
    args = slice.call( arguments, 2 );
    proxy = function() {
      return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
    }

    // Set the guid of unique handler to the same of original handler, so it can be removed
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;

    return proxy;
  },

  now: Date.now,

  // jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
  support: support

});

if ( typeof Symbol === 'function' ) {
  jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( 'Boolean Number String Function Array Date RegExp Object Error Symbol'.split( ' ' ), function( i, name ) {
  class2type[ '[object ' + name + ']' ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

  // Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
  let length = !!obj && 'length' in obj && obj.length,
    type = jQuery.type( obj );

  if ( type === 'function' || jQuery.isWindow( obj )) {
    return false;
  }

  return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && ( length - 1 ) in obj;

}

export default jQuery;