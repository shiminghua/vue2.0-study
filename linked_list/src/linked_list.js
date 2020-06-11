import Node from './node.js';
import defaultEquals from './default_equals.js';

// 单链表 
class LinkedList {

  #length = 0; // 链表长度
  #head = new Node('head'); // 头节点
  #tail = undefined; // 尾指针

  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn; // 判断相等函数
  }

  // 返回链表长度
  size() {
    return this.#length;
  }

  // 链表长度加 1 ，内部使用方法
  _sizeAddOne() {
    this.#length++;
  }

  // 链表长度减 1，内部使用方法
  _sizeMinusOne() {
    this.#length--;
  }

  // 链表长度设为 0
  _sizeInitZero() {
    this.#length = 0;
  }

  // 使用 getter ，返回链表长度
  get length() {
    return this.size();
  }

  // 判断链表是否为空
  isEmpty() {
    return this.size() === 0;
  }

  // 获取链表头结点
  getHead() {
    return this.#head;
  }

  // 获取链表的第一个元素节点
  getFirstNode() {
    if (!this.isEmpty()) {
      return this.getHead().next;
    }
    return undefined;
  }

  // 获取链表的第一个元素值
  getFirstElement() {
    let firstNode = this.getFirstNode();
    if (firstNode != null) {
      return firstNode.element;
    }
    return undefined;
  }

  getTail() {
    return this.#tail;
  }

  getLastNode() {
    if (!this.isEmpty()) {
      return this.getTail();
    }
    return undefined;
  }

  getLastElement() {
    let lastNode = this.getLastNode();
    if (lastNode != null) {
      return lastNode.element;
    }
    return undefined;
  }

  // 返回一个元素的位置
  indexOf(element) {
    // 设置当前节点为第一节点，即第零个正式节点
    let node = this.getHead();
    // 遍历整个链表节点
    for (let i = 0; i < this.size() && node != null; i++) {
      node = node.next;
      // 判断节点元素和传入的元素是否相等，相等则返回位置 i
      if (this.equalsFn(element, node.element)) {
        return i;
      }
    }
    // 没有找到匹配元素，返回 -1
    return -1;
  }

  // 获取链表中某个位置上的节点
  getNodeAt(index) {
    // 判断index的值在合法范围
    if (index >= 0 && index < this.size()) {
      // 设置当前节点为头节点
      let node = this.getHead();
      for (let i = 0; i <= index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    // index不在合法范围，返回undefined
    return undefined;
  }

  // 获取链表中某个位置上的节点上的元素
  getElementAt(index) {
    let node = this.getNodeAt(index);
    if (node != null) {
      return node.element;
    }
    return undefined;
  }

  // 获取链表中某个位置上的节点，内部使用的方法。
  // index 等于 -1 时返回头节点；index 等于 this.size() 时返回尾结点。
  _getNodeIncludeHeadAndTail(index) {
    // index 等于 -1 时返回头节点
    if (index === -1) {
      return this.getHead();
    }

    // index 等于 this.size() 时返回尾结点
    if (index === this.size()) {
      return this.#tail;
    }
    // 正常返回节点
    return this.getNodeAt(index);
  }

  // 向链表尾部添加一个新元素
  push(element) {
    const node = new Node(element);
    // 尾指针为空时，链表为空。此时头指针和尾指针都指向 node 元素
    if (this.isEmpty()) {
      this.getHead().next = this.#tail = node;
    } else {
      // 将尾元素的next指向node节点，再将尾指针指向node节点。
      this.#tail.next = node;
      this.#tail = node;
    }
    // 链表长度加一
    this._sizeAddOne();
  }

  enTail(element) {
    this.push(element);
  }

  // 将数组添加到链表
  pushArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.push(arr[i]);
    }
  }

  enTailArray(arr) {
    this.pushArray(arr);
  }

  // 向链表头部添加一个节点
  addHead(element) {
    const node = new Node(element);
    // 获取头结点
    let headNode = this.getHead();
    // 获取第一个元素节点
    let firstNode = this.getFirstNode();

    // 新节点的next指向第一个元素节点
    node.next = firstNode;
    // 头结点指向新节点
    headNode.next = node;

    // 链表长度 +1
    this._sizeAddOne();

    // 移动尾指针，指向正确的尾元素节点
    if (this.size() === 1) {
      this.#tail = node;
    }
  }

  enHead(element) {
    this.addHead(element);
  }

  // 通过数组向链表头部添加元素
  addHeadArray(arr) {
    // 为了保证和数组中的顺序一致，从数组尾部开始循环
    for (let i = arr.length - 1; i >= 0; i--) {
      this.addHead(arr[i]);
    }
  }

  enHeadArray(arr) {
    this.addHeadArray(arr);
  }

  // 在任意位置插入元素
  insert(element, index) {

    if (this.size() === 0 || index === this.size()) {
      this.push(element);
      return true;
    }
    if (index >= 0 && index < this.size()) {

      const node = new Node(element);
      // 上一个节点
      let prevNode = this._getNodeIncludeHeadAndTail(index - 1);
      let currentNode = prevNode.next;

      node.next = currentNode;
      prevNode.next = node;

      // 链表长度 +1
      this._sizeAddOne();

      return true;
    }
    return false;
  }

  // 通过数组插入元素
  // 可优化：先把数组转成链表，再插入
  insertArray(arr, index) {
    // 为了保证和数组中的顺序一致，从数组尾部开始循环
    for (let i = arr.length - 1; i >= 0; i--) {
      this.insert(arr[i], index);
    }
  }

  // 删除给定位置的节点
  removeAt(index) {
    // 检查越界值
    if (index >= 0 && index < this.size()) {

      // 上一个节点
      let prevNode = this._getNodeIncludeHeadAndTail(index - 1);

      // 获取被删除的节点（当前节点）
      let current = prevNode.next;
      // 将上一个节点指向当前节点的下一个节点
      prevNode.next = current.next;
      // 表长减一
      this._sizeMinusOne();

      // 当删除尾结点时，移动尾指针，使其指向真正的尾结点
      if (index === this.size()) {
        this.#tail = prevNode;
      }
      // 当表长为0时，清空尾指针
      if (this.size() === 0) {
        this.#tail = undefined;
      }
      // 返回删除的节点元素
      return current.element;
    }

    // index 不再合法范围，返回 undefined
    return undefined;
  }

  // 删除一个节点
  remove(element) {
    // 需要循环两次
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  // 在链表头部移除节点
  removeHead() {
    return this.removeAt(0);
  }

  deHead() {
    return this.removeHead();
  }

  // 在链表尾部删除节点
  removeTail() {
    return this.removeAt(this.size() - 1);
  }

  deTail() {
    return this.removeTail();
  }

  // 转为数组
  toArray() {
    let arr = [];
    let current = this.getHead();
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

  // 清空链表
  clean() {

    // 考虑可能会造成内存泄漏，使用循环释放每一个节点;
    // 感觉释放内存这一段可以删掉
    // let current = this.getFirstNode();
    // let length = this.size();
    // let i = 0;
    // let next;

    // while (i < length && current != null) {
    //   next = current.next;
    //   current.next = undefined;
    //   current = next;

    //   this._sizeMinusOne();

    //   i++;
    // }

    // 初始化链表参数
    this.getHead().next = undefined;
    this.#tail = undefined;
    this._sizeInitZero();
  }

  // 清空链表
  clear() {
    this.clean();
  }

  // 静态方法，将数组转化为链表
  static fromArray(arr) {
    let linkedList = new LinkedList();
    linkedList.pushArray(arr);
    return linkedList;
  }
}

export default LinkedList;

// 两个链表的拼接和插入
