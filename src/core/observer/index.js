'use strict';
import config from '../config';
// import Dep from './dep';
// import { arrayMethods } from './array';
import {
  def,
  isObject,
  isPlainObject,
  hasProto,
  hasOwn,
  warn
} from '../util/index';




/*****************
 * Set a property on an object. 
 * Adds the new property and triggers change notification if the property doesn't already exist.
 * 在对象上设置属性。添加新的属性，并触发更改通知，如果属性不存在。
*/
export function set (obj, key, val) {
    if (Array.isArray(obj)) {
        obj.splice(key, 1, val);
        return val;
    }
    if (hasOwn(obj, key)) {
        obj[key] = val;
        return;
    }
    const ob = obj.__ob__;
    if (obj._isVue || (ob && ob.vmCount)) {
        // warn: 避免增加反应特性到Vue实例及其根$运行数据，在数据选项-申报前期。
        process.env.NODE_ENV !== 'production' && warn(
            'Avoid adding reactive properties to a Vue instance or its root $data ' +
            'at runtime - delcare it upfront in the data option.'
        );
        return;
    }
    if (!ob) {
        obj[key] = val;
        return;
    }
    defineReactive(ob.value, key, val);
    ob.dep.notify();
    return val;
}