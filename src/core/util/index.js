'use strict';
/************
 * 常用方法
*/
export * from '../../shared/util';
/**************
 * isReserved  检查一个字符串是不是以 $ 或者 _ 开始
 * def  定义一个属性，ES5
 * parsePath  解析简单路径
*/
export * from './lang'; 
/****************
 * hasProto  我们可以用__proto__？
 * inBrowser  浏览器环境嗅探
 * devtools  检测工具
 * UA  UA嗅探在特定浏览器的怪癖工作
 * nextTick  延时执行
 * { _Set }  Set 数据结构
*/
export * from './env';
export * from './options';
export * from './debug';
// export * from './props';
// export { defineReactive } from '../observer/index';