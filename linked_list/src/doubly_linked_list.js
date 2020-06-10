// 双向链表

import LinkedList from './linked_list';
import DoublyNode from './doubly_node';
import defaultEquals from './default_equals';


class DoublyLinkedList extends LinkedList {

  tail = new DoublyNode('tail'); // 尾结点

  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.head.next = this.tail; // 头结点 next 指向尾结点
    this.tail.prev = this.head; // 尾结点 prev 指向头结点
  }

  // 获取链表的最后一个元素节点
  getLastNode() {
    if (!this.isEmpty()) {
      return this.tail.prev;
    }
    return undefined;
  }

  // 正序循环，获取链表中某个位置上的节点
  _loopFromHead(index) {
    // 判断index的值在合法范围
    if (index >= 0 && index < this.size()) {
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

  // 逆序循环，获取链表中某个位置上的节点
  _loopFromTail(index) {
    // 判断index的值在合法范围
    if (index >= 0 && index < this.size()) {
      // 设置当前节点为尾节点
      let node = this.tail;
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

  // 获取链表中某个位置上的节点，内部使用的方法。
  // index 等于 -1 时返回头节点；index 等于 this._length 时返回尾结点。
  _getElementIncludeHeadAndTail(index) {
    // index 等于 -1 时返回头节点
    if (index === -1) {
      return this.head;
    }

    // index 等于 this._length 时返回尾结点
    if (index === this.size()) {
      return this.tail;
    }
    // 正常返回节点
    return this.getNodeAt(index);
  }

  // 向链表尾部添加元素节点
  push(element) {
    const currentNode = new DoublyNode(element);
    // 尾结点
    let tailNode = this.tail;
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

  // 在链表头部添加元素
  addHead(element) {
    const currentNode = new DoublyNode(element);
    // 头结点
    let headNode = this.head;
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

  // 在链表任意位置插入元素
  insert(element, index) {
    // 检查越界值，index === this.size() 时，在链表尾部插入元素节点
    if (index >= 0 && index <= this.size()) {
      const node = new DoublyNode(element);
      // 获取index的上一个节点
      let prevNode = this._getElementIncludeHeadAndTail(index - 1);
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

  // 在链表任意位置移除元素
  removeAt(index) {
    // 检查越界值
    if (index >= 0 && index < this.size()) {
      // 获取 index 位置上即将被删除的节点
      let currentNode = this._getElementIncludeHeadAndTail(index);
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

  // 在链表尾部移除节点
  removeTail() {
    return this.removeAt(this.size() - 1);
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

}

export default DoublyLinkedList;
