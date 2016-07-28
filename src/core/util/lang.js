'use strict';

/***************
 * Check if a string starts with $ or _
 * 检查一个字符串是不是以 $ 或者 _ 开始，是否为保留字
*/
export function isReserved(str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5f;
}

/**************
 * Define a property.
 * 定义一个属性 
 * enumerable  -  枚举
*/
export function def(obj, key, val, enumerable) {
    // 将属性添加到对象，或修改现有属性的特性
    Object.defineProperty(obj, key, {
        value: val, // 属性的值
        enumerable: !!enumerable, // 如果为true，此属性将显示在for-in枚举中
        writable: true, // 如果为false，在尝试写入这一属性时会失败
        configurable: true // 如果为false，尝试删除属性或者将修改value之外的任何属性时，都会失败
    });
}

/************
 * Parse simple path.
 * 解析简单路径 bail 保释
*/
const bailRE = /[^\w\.\$]/;
export function parsePath(path) {
    if(bailRE.test(path)) {
        return;
    }
    else {
        const segments = path.split('.');
        return function(obj) {
            for (let i = 0, len = segments.length; i < len; i++) {
                if (!obj) {
                    return;
                }
                obj = obj[segments[i]];
            }
            return obj;
        };
    }
}