'use strict';

/**************
 * Convert a value to a string that is actually rendered.
 * 将一个值转化为字符串
*/
export function _toString(val) {
    return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/***************
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 * 将一个输入值转换为一个持久性的数字。
 * 如果转换失败，则返回原始字符串
*/
export function toNumber(val) {
    var n = parseFloat(val, 10);
    return n || n === 0 ? n : val;
}

/************
 * Make a map and return a function for checking if a key is in that map.
 * 创建一个map结构，并返回一个函数，来检查某个键值是否存在于map结构中
 * 创建一个 Map 数据结构
*/
export function makeMap(str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase ? function (val) {
        return map[val.toLowerCase()];
    } : function (val) {
        return map[val];
    }
}

/*************
 * Check if a tag is a built-in tag.
 * 检查标签是否是内置的标签
*/
export const isBuiltInTag = makeMap('slot,component', true);

/************
 * Remove an item from an array
 * 从数组中删除一个项目
*/
export function remove(arr, item) {
    if(arr.length) {
        var index = arr.indexOf(item);
        if(index > -1) {
            return arr.splice(index, 1);
        }
    }
}

/****************
 * Check whether the object has the property.
 * 检查对象是否具有属性
*/
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

/***********
 * Check if value is primitive
 * 检查是否为原始值，是否为字符串或数字
*/
export function isPrimitive(value) {
    return typeof value === 'string' || typeof value === 'number';
}

/************
 * Create a cached version of a pure function.
 * 创建一个纯函数的缓存版本
*/
export function cached(fn) {
    var cache = Object.create(null);
    return function(str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
    }
}

/***********
 * Camelize a hyphen-delmited string.
 * 转换格式  aaa-bbb-ccc => aaaBbbCcc
*/
const camelizeRE = /-(\w)/g;
/*
var camelize = cached(function(str) {
    return str.replace(camelizeRE, function(_, c) {
        return c ? c.toUpperCase() : '';
    });
});
*/
export const camelize = cached((str) => {
    return str.replace(camelizeRE, (_, c) => {
        return c ? c.toUpperCase(): '';
    });
});

/*********
 * Simple bind, faster than native
 * 简单绑定，比本地更快
*/
export function bind(fn, ctx) {
    function boundFn(a) {
        var l = arguments.length;
        return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    }
    // record original fn length
    // 记录原始的 FN 长度
    boundFn._length = fn.length;
    return boundFn;
}

/************
 * Convert an Array-like object to a real Array.
 * 将一个数组像对象转换成一个真正的数组。
*/
export function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
        ret[i] = list[i + start];
    }
    return ret;
}

/*************
 * Mix properties into target object.
 * 混合属性到目标对象，合并对象
*/
export function extend(to, _from) {
    for (var _key in _from) {
        to[_key] = _from[_key];
    }
    return to;
}

/***********
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 * 快速对象检查，当我们知道它是一个 JSON 兼容类型时。
*/
export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

/**********
 * Strict object type check. Only returns true for plain JavaScript objects.
 * 严格对象检查，只有obj为原生对象时返回 true
*/
const toString = Object.prototype.toString;
const OBJECT_STRING = '[object Object]';
export function isPlainObject(obj) {
    return toString.call(obj) === OBJECT_STRING;
}

/**************
 * Merge an Array of Objects into a single Object.
 * 将一个对象数组合并成一个单一对象
*/
export function toObject(arr) {
    var res = arr[0] || {};
    for (var i = 1, len = arr.length; i < len; i++) {
        if(arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
}

/*************
 * Perform no operation.
 * 不执行操作 - 空函数
*/
export function noop() {}

/************
 * Always return false.
 * 总是返回错误 - false
*/
export const no = () => false;

/***********
 * Generate a static keys string from compiler modules.
 * 从编译器模块生成一个静态密钥字符串
*/
export function genStaticKeys(modules) {
    return modules.reduce(function(keys, m) {
        return keys.concat(m.staticKeys || []);
    }, []).join(',');
}