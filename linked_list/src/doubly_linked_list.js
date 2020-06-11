// 双向链表

// import LinkedList from './linked_list';
import DoublyNode from './doubly_node';
import defaultEquals from './default_equals';


class DoublyLinkedList {

  #length = 0; // 链表长度
  _head = new DoublyNode('head'); // 头节点
  _tail = new DoublyNode('tail'); // 尾结点

  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this._head.next = this._tail; // 头结点 next 指向尾结点
    this._tail.prev = this._head; // 尾结点 prev 指向头结点
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
    return this._head;
  }

  // 获取链表的第一个元素节点
  getFirstNode() {
    if (!this.isEmpty()) {
      return this._head.next;
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

  // 获取链表尾结点
  getTail() {
    return this._tail;
  }

  // 获取链表的最后一个元素节点
  getLastNode() {
    if (!this.isEmpty()) {
      return this._tail.prev;
    }
    return undefined;
  }

  // 获取链表的最后一个元素节点的值
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
    let node = this._head;
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
      let node = this._head;
      for (let i = 0; i <= index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    // index不在合法范围，返回undefined
    return undefined;
  }

  // 正序循环，获取链表中某个位置上的节点
  _loopFromHead(index) {
    // 判断index的值在合法范围
    if (index >= 0 && index < this.size()) {
      // 设置当前节点为头节点
      let node = this._head;
      for (let i = 0; i <= index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    // index不在合法范围，返回undefined
    return undefined;
  }

  // 逆序循环，获取链表中某个位置上的节点
  _loopFromTail(index) {
    // 判断index的值在合法范围
    if (index >= 0 && index < this.size()) {
      // 设置当前节点为尾节点
      let node = this._tail;
      for (let i = this.size() - 1; i >= index && node != null; i--) {
        node = node.prev;
      }
      return node;
    }
    // index不在合法范围，返回undefined
    return undefined;
  }

  // 获取链表中某个位置上的节点
  getNodeAt(index) {
    // 判断index的值在合法范围
    if (index >= 0 && index < this.size()) {
      // 取链表程度的一半
      let median = Math.floor(this.size() / 2);
      let node;

      // index 小于等于 median 的时候，使用正序循环，否则使用逆序循环获取节点
      // 这样能节省一半的循环时间，但是时间复杂度依然是 O(n)
      if (index <= median) {
        node = this._loopFromHead(index);
      } else {
        node = this._loopFromTail(index);
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
      return this._head;
    }

    // index 等于 this.size() 时返回尾结点
    if (index === this.size()) {
      return this._tail;
    }
    // 正常返回节点
    return this.getNodeAt(index);
  }

  // 向链表尾部添加元素节点
  push(element) {
    const currentNode = new DoublyNode(element);
    // 尾结点
    let tailNode = this._tail;
    // 尾结点的上一个节点
    let prevNode = tailNode.prev;

    // 添加逻辑
    currentNode.next = tailNode;
    currentNode.prev = prevNode;
    prevNode.next = currentNode;
    tailNode.prev = currentNode;

    // 链表长度加 1
    this._sizeAddOne();
  }

  // 将数组添加到链表
  pushArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.push(arr[i]);
    }
  }

  enTail(element) {
    this.push(element);
  }

  enTailArray(arr) {
    this.pushArray(arr);
  }

  // 在链表头部添加元素
  addHead(element) {
    const currentNode = new DoublyNode(element);
    // 头结点
    let headNode = this._head;
    // 头结点的下一个节点
    let nextNode = headNode.next;

    // 添加逻辑
    currentNode.next = nextNode;
    currentNode.prev = headNode;
    headNode.next = currentNode;
    nextNode.prev = currentNode;

    // 链表长度加 1
    this._sizeAddOne();
  }

  // 通过数组向链表头部添加元素
  addHeadArray(arr) {
    // 为了保证和数组中的顺序一致，从数组尾部开始循环
    for (let i = arr.length - 1; i >= 0; i--) {
      this.addHead(arr[i]);
    }
  }

  enHead(element) {
    this.addHead(element);
  }

  enHeadArray(arr) {
    this.addHeadArray(arr);
  }

  // 在链表任意位置插入元素
  insert(element, index) {
    // 检查越界值，index === this.size() 时，在链表尾部插入元素节点
    if (index >= 0 && index <= this.size()) {
      const node = new DoublyNode(element);
      // 获取index的上一个节点
      let prevNode = this._getNodeIncludeHeadAndTail(index - 1);
      let currentNode = prevNode.next;

      // 插入逻辑
      node.next = currentNode;
      node.prev = prevNode;
      prevNode.next = node;
      currentNode.prev = node;

      // 链表长度加 1
      this._sizeAddOne();

      return true;
    }
    return false;
  }

  // 通过数组插入元素
  insertArray(arr, index) {
    // 为了保证和数组中的顺序一致，从数组尾部开始循环
    for (let i = arr.length - 1; i >= 0; i--) {
      this.insert(arr[i], index);
    }
  }

  // 在链表任意位置移除元素
  removeAt(index) {
    // 检查越界值
    if (index >= 0 && index < this.size()) {
      // 获取 index 位置上即将被删除的节点
      let currentNode = this._getNodeIncludeHeadAndTail(index);
      let prevNode = currentNode.prev;
      let nextNode = currentNode.next;

      // 删除逻辑
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      // 释放当前节点的内存
      currentNode.prev = undefined;
      currentNode.next = undefined;

      // 链表长度减一
      this._sizeMinusOne();

      return currentNode.element;
    }
    return undefined;
  }

  // 删除一个节点
  remove(element) {
    // 需要循环两次
    // let index = this.indexOf(element);
    // this.removeAt(index);

    // 头结点
    let node = this.getHead();
    // 遍历整个链表节点
    for (let i = 0; i < this.size() && node != null; i++) {
      node = node.next;
      // 判断节点元素和传入的元素是否相等，相等则返回位置 i
      if (this.equalsFn(element, node.element)) {
        let prevNode = node.prev;
        let nextNode = node.next;

        // 删除逻辑
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        // 释放当前节点的内存
        node.next = undefined;
        node.prev = undefined;

        // 链表长度减一
        this._sizeMinusOne();

        return element;
      }
    }

    return undefined;
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
    let current = this._head;
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
    // let current = this.getFirstNode();
    // let index = 0;
    // let length = this.size();
    // let prev, next;

    // while (index < length && current != null) {
    //   next = current.next;
    //   prev = current.prev;

    //   prev.next = next;
    //   next.prev = prev;
    //   current.next = undefined;
    //   current.prev = undefined;
    //   current = next;

    //   this._sizeMinusOne();

    //   index++;
    // }

    const length = this.size();
    for (let i = 0; i < length; i++) {
      this.removeHead();
    }
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

export default DoublyLinkedList;
