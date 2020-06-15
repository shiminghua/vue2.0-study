/***************************************
 * 子类中需要重写的私有方法
 * 
 */

// 设置链表长度
export function setSize(num) {
  this.#length = num;
}

// 链表长度加 1 ，内部使用方法
export function sizeAddOne() {
  this.#setSize(this.size() + 1);
}

// 链表长度减 1，内部使用方法
export function sizeMinusOne() {
  this.#setSize(this.size() - 1);
}

// 链表长度设为 0
export function sizeInitZero() {
  this.#setSize(0);
}

// 获取链表头结点
export function getHead() {
  return this.#head;
}

// 获取尾结点
export function getTail() {
  return this.#tail;
}

// 获取链表中某个位置上的节点，内部使用的方法。
// index 等于 -1 时返回头节点；index 等于 this.size() 时返回尾结点。
export function getNodeIncludeHeadAndTail(index) {
  // index 等于 -1 时返回头节点
  if (index === -1) {
    return this.#getHead();
  }

  // index 等于 this.size() 时返回尾结点
  if (index === this.size()) {
    return this.#tail;
  }
  // 正常返回节点
  return this.getNodeAt(index);
}
/**
 * 子类中需要重写的私有方法结束
 ***********************************************/


class LinkedList {
  _copyHelp(examples) {
    let currentNode = this._getHead();
    for (let i = 0; i < this.size(); i++) {
      currentNode = currentNode.next;
      examples.push(currentNode.element);
    }
    return examples;
  }
  // 复制链表，返回一个新链表
  copy() {
    return this._copyHelp(new LinkedList());
  }

  // 静态方法，将数组转化为链表
  static fromArray(arr) {
    let linkedList = new LinkedList();
    linkedList.pushArray(arr);
    return linkedList;
  }
}

class DoublyLinkedList extends LinkedList {
  // 复制链表，返回一个新链表
  copy() {
    return this._copyHelp(new DoublyLinkedList());
  }

  // 静态方法，将数组转化为链表
  static fromArray(arr) {
    let linkedList = new DoublyLinkedList();
    linkedList.pushArray(arr);
    return linkedList;
  }
}
