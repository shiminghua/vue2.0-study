'use strict';

import List from './list';
import Stack from './stack';
import Queue from './queue';
import { LinkedList, TwowayLinkedList, CircularLinkedList } from './linkedlist';
import Dictionary from './dictionary';

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
// 链表
DataStructure.LinkedList = LinkedList;
// 双向链表
DataStructure.TwowayLinkedList = TwowayLinkedList;
// 循环链表
DataStructure.CircularLinkedList = CircularLinkedList;
// 字典
DataStructure.Dictionary = Dictionary;

export default DataStructure;