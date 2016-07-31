'use strict';

/***************** 链表 **************/

/**********************
 * 单项链表 
 * 头节点为 head {element: 'head', next: null}
*/
// 节点类
class Node {
    contructor(element) {
        this.element = element;
        this.next = null;
    }
}
// 链表类
class LinkedList {
    contructor() {
        // 链表的头节点
        this.head = new Node('head');
        // 链表的当前节点
        this.currNode = this.head;
    }
    /***
     * 查找节点
    */
    find(item) {
        // 当前节点设为 head 节点
        let currNode = this.head;
        while (currNode !== null && currNode.element !== item) {
            currNode = currNode.next;
        }
        return currNode;
    }
    /****
     * 插入新节点
    */
    insert(newElement, item) {
        // 定义新节点
        let newNode = new Node(newElement);
        // item的节点位置
        let currNode = this.find(item);
        // 新节点的 next 设置为item节点的 next
        newNode.next = currNode.next;
        // item节点的 next 设置为 newNode
        currNode.next = newNode;
    }
    /****
     * 查找前一个节点
    */
    findPrevious(item) {
        let currNode = this.head;
        while (currNode.next !== null && currNode.next.element !== item) {
            currNode = currNode.next;
        }
        return currNode;
    }
    /*****
     * 删除节点
    */
    remove(item) {
        let prevNode = this.findPrevious(item);
        if (prevNode.next !== null) {
            prevNode.next = prevNode.next.next;
        }
    }
    /****
     * 显示链表中的元素
    */
    display() {
        let currNode = this.head;
        let retArr = [];
        while (currNode.next !== null) {
            currNode = currNode.next;
            retArr.push(currNode.element);
        }
        return retArr;
    }
    /****
     * 在链表中向前移动N个元素
    */
    advance(n) {
        while (n > 0) {
            n--;
            if (this.currNode.next !== null) {
                this.currNode = this.currNode.next;
            }
            else {
                throw new Error('超出链表范围');
            }
        }
    }
    /****
     * 只显示当前节点
    */
    show() {
        return this.currNode.element;
    }
};

/********
 * 双向链表
*/
// 节点类
class TwowayNode extends Node {
    contructor(element) {
        super(element);
        this.previous = null;
    }
}
// 链表类
class TwowayLinkedList extends LinkedList {
    contructor() {
        // 链表的头节点
        this.head = new TwowayNode('head');
        // 链表的当前节点
        this.currNode = this.head;
    }
    /****
     * 插入节点
    */
    insert(newElement, item) {
        let newNode = new TwowayNode(element);
        let current = this.find(item);
        newNode.next = current.next;
        newNode.previous = current;
        current.next.previous = newNode;
        current.next = newNode;
    }
    /****
     * 删除节点
    */
    remove(item) {
        let currNode = this.find(item);
        if (currNode.next !== null) {
            currNode.previous.next = currNode.next;
            currNode.next.previous = currNode.previous;
            currNode.next = null;
            currNode.previous = null;
            // currNode = null;
        }
    }
    /****
     * 查找最后一个节点
    */
    findLast() {
        let currNode = this.head;
        while (currNode.next !== null) {
            currNode = currNode.next;
        }
        return currNode;
    }
    /****
     * 反向显示链表中的元素
    */
    displayReverse() {
        // let currNode = this.head;
        let currNode = this.findLast();
        let retArr = [];
        while (currNode.previous !== null) {
            currNode = currNode.previous;
            retArr.push(currNode);
        }
        return retArr;
    }
    /****
     * 在链表中向后移动N个元素
    */
    back(n) {
        while (n > 0) {
            if (this.currNode.previous !== null) {
                this.currNode = this.currNode.previous;
            }
            else {
                throw new Error('超出链表范围');
            }
        }
    }
}

/********************************
 * 循环链表
*/
class CircularLinkedList extends LinkedList {
    contructor() {
        super();
        this.head.next = this.head;
    }
    /*****
     * 显示链表中的元素
    */
    display() {
        let currNode = this.head;
        let retArr = [];
        while (currNode.next !== null && currNode.next.element !== 'head') {
            currNode = currNode.next;
            retArr.push(currNode);
        }
        return retArr;
    }
}