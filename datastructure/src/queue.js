'use strict';

/****
 * 队列
*/
class Queue {
    constructor() {
        // 保存队列元素的数组
        this.dataStore = [];
    }
    /****
     * 向队尾添加元素
    */
    enqueue(element) {
        this.dataStore.push(element);
    }
    /****
     * 删除队首的元素
    */
    dequeue() {
        return this.dataStore.shift();
    }
    /****
     * 读取队首的元素
    */
    front() {
        return this.dataStore[0];
    }
    /****
     * 读取队尾的元素
    */
    back() {
        return this.dataStore[this.dataStore.length - 1];
    }
    /****
     * 显示队列内的所有元素
    */
    toString() {
        let retStr = '';
        for (let i = 0, len = this.dataStore.length; i < len; i++) {
            retStr += this.dataStore[i] + '\r\n';
        }
        return retStr;
    }
    /****
     * 判断队列是否为空
    */
    empty() {
        return this.dataStore.length === 0;
    }
}

export default Queue;