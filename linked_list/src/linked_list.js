import Node from './node.js';
import defaultEquals from './default_equals.js';

class LinkedList {

  length = 0; // 链表长度
  head = new Node('head'); // 头节点
  tail = undefined; // 尾指针

  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn; // 判断相等函数
  }

  // 获取链表中某个位置上的元素
  getElementAt(index) {
    // 判断index的值在合法范围
    if (index >= 0 && index < this.length) {
      // 设置当前节点为头节点
      let node = this.head;
      for (let i = 0; i <= index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    // index不在合法范围，返回undefined
    return undefined;
  }

  // 返回一个元素的位置
  indexOf(element) {
    // 设置当前节点为第一节点，即第零个正式节点
    let node = this.head.next;
    // 遍历整个链表节点
    for (let i = 0; i < this.length && node != null; i++) {
      // 判断节点元素和传入的元素是否相等，相等则返回位置 i
      if (this.equalsFn(element, node.element)) {
        return i;
      }
      node = node.next;
    }
    // 没有找到匹配元素，返回 -1
    return -1;
  }

  // 返回链表长度
  size() {
    return this.length;
  }

  // 判断链表是否为空
  isEmpty() {
    return this.length === 0;
  }

  // 获取链表头结点
  getHead() {
    return this.head;
  }

  // 获取链表的第一个元素节点
  getFirstNode() {
    return this.head.next;
  }

  // 向链表尾部添加一个新元素
  push(element) {
    const node = new Node(element);
    // 尾指针为空时，链表为空。此时头指针和尾指针都指向 node 元素
    // 也可以用 length 来判断，我们使用length判断
    // if (this.tail == null) {
    if (this.length === 0) {
      this.head.next = this.tail = node;
    } else {
      // 将尾元素的next指向node节点，再将尾指针指向node节点。
      this.tail.next = node;
      this.tail = node;
    }
    // 链表长度加一
    this.length++;
  }

  // 将数组添加到链表
  pushArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.push(arr[i]);
    }
  }

  // 在任意位置插入元素
  insert(element, index) {
    if (index >= 0 && index <= this.length) {

      const node = new Node(element);

      // index 的上一个节点
      let prevNode;

      // 当 index === 0 的时候，上一个节点为头节点
      if (index === 0) {
        prevNode = this.head;
      } else {
        prevNode = this.getElementAt(index - 1);
      }

      let currentNode = prevNode.next;
      node.next = currentNode;
      prevNode.next = node;
      this.length++;
      return true;
    }
    return false;
  }

  // 删除给定位置的节点
  removeAt(index) {
    // 检查越界值
    if (index >= 0 && index < this.length) {
      // 第一个真实节点
      let current = this.head.next;
      let previous;

      // 移除第一项
      if (index === 0) {
        // 直接将头节点的next指向当前节点的下一个节点
        this.head.next = current.next;
      } else {
        // 获取将被删除的节点的上一个节点
        previous = this.getElementAt(index - 1);
        // 获取被删除的节点（当前节点）
        current = previous.next;
        // 将上一个节点指向当前节点的下一个节点
        previous.next = current.next;
      }
      // 表长减一
      this.length--;

      // 当删除尾结点时，移动尾指针，使其指向真正的尾结点
      if (index === this.length) {
        this.tail = previous;
      }
      // 当表长为0时，清空尾结点
      if (this.length === 0) {
        this.tail = undefined;
      }
      // 返回删除的节点元素
      return current.element;
    }

    // index 不再合法范围，返回 undefined
    return undefined;
  }

  // 转为数组
  toArray() {
    let arr = [];
    let current = this.head;
    for (let i = 0; i < this.size(); i++) {
      current = current.next;
      arr.push(current.element);
    }
    return arr;
  }

  // 转为字符串
  toString() {
    let arr = this.toArray();
    return arr.toString();
  }

  // 静态方法，将数组转化为链表
  static fromArray(arr) {
    let linkedList = new LinkedList();
    linkedList.pushArray(arr);
    return linkedList;
  }
}

export default LinkedList;
