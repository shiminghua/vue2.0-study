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