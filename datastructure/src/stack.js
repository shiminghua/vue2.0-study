'use strict';

/************
 * 栈
*/
class Stack {
    constructor() {
        // 保存栈内元素的数组
        this.dataStore = [];
        // 栈顶位置
        this.top = 0;
    };

    /***
     * 入栈
    */
    push(element) {
        this.dataStore[this.top++] = element;
    }
    /***
     * 察看栈顶元素，不会删除栈顶元素
    */
    peek() {
        return this.dataStore[this.top - 1];
    }
    /****
     * 出栈
    */
    pop() {
        return this.dataStore[--this.top];
    }
    /***
     * 清空栈数据
    */
    clear() {
        this.top = 0;
    }
    /****
     * 返回栈内的元素个数
    */
    length() {
	    return this.top;
    }
}

export default Stack;