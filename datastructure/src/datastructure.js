'use strict';

import List from './list';
import Stack from './stack';
import Queue from './queue';

/***
 * 数据结构对象
*/
let DataStructure = Object.create(null);
// 列表
DataStructure.List = List;
// 栈
DataStructure.Stack = Stack;
// 队列
DataStructure.Queue = Queue;

export default DataStructure;