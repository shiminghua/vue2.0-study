import Node from './node.mjs';
import defaultEquals from './default_equals.mjs';

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.length = 0; // 链表长度
    this.head = undefined; // 头指针
    this.tail = undefined; // 尾指针
    this.equalsFn = equalsFn; // 判断相等函数
  }

  // 向链表尾部添加一个新元素
  push(element) {
    const node = new Node(element);
    // 尾指针为空时，链表为空。此时头指针和尾指针都指向 node 元素
    // 也可以用 length 来判断
    // if (this.length === 0) {
    if (this.tail == null) {
      this.head = this.tail = node;
    } else {
      // 将尾元素的next指向node节点，再将尾指针指向node节点。
      this.tail.next = node;
      this.tail = node;
    }
    // 链表长度加一
    this.length++;
  }

  
}

export default LinkedList;
