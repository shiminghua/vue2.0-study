'use strict';

import DataStructure from '../src/datastructure';

console.log(DataStructure);

/****
 * 列表测试
*/
let movieList = new DataStructure.List();

for (let i = 0; i < 10; i++) {
    movieList.append(i);
}

function displayList(list) {
    for (list.front(); list.currPos() < list.length() - 1; list.next()) {
        console.log(list.currPos(), list.getElement());
    }
    // list.next();
    // console.log(list.currPos(), list.getElement());
}
// displayList(movieList);

// movieList.clear();
// displayList(movieList);

/***
 * 栈测试
*/
function mulBase(num, base) {
    let stack = new DataStructure.Stack();
    do {
        stack.push(num % base);
        num = Math.floor(num / base);
    }
    while (num > 0);

    let converted = '';
    while (stack.length() > 0) {
        converted += stack.pop();
    }
    return converted;
}

let newNum = mulBase(10, 2);
console.log(newNum);


/*****
 * 队列测试 - 技术排序
*/
function distribute(nums, queues, n , digit) {
    for (let i = 0; i < n; i++) {
        if (digit === 1) {
            queues[nums[i] % 10].enqueue(nums[i]);
        }
        else {
            queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
        }
    }
}
function collect(queues, nums) {
    let i = 0;
    for (let digit = 0; digit < 10; digit++) {
        while (!queues[digit].empty()) {
            nums[i++] = queues[digit].dequeue();
        }
    }
}
function dispArray(arr) {
    // for (let i = 0; i < arr.length; i++) {
    //     console.log(arr[i] + ' ');
    // }
    console.log(arr.join());
}

let queues = [];
for (let i = 0; i < 10; i++) {
    queues[i] = new DataStructure.Queue();
}
let nums = [];
for (let i = 0; i < 10; i++) {
    nums[i] = Math.floor(Math.random() * 101);
}

console.log('Before redix sort:');
dispArray(nums);
distribute(nums, queues, 10, 1);
collect(queues, nums);
dispArray(nums);
distribute(nums, queues, 10, 10);
collect(queues, nums);
dispArray(nums);


let arr = new Array();
arr['aaa'] = 'bbb';
arr['ccc'] = 'ddd';
console.log(Array.prototype.slice.call(Object.keys(arr)));

/*************
 * 字典测试
*/
let dictionary = new DataStructure.Dictionary();
dictionary.add('aa', 11);
dictionary.add('bb', 22);
dictionary.clear();
console.log(dictionary.showAll());


/**************************************************************/
/******************************
 * 二叉查找树
*/
// 二叉查找树节点
class Node {
    constructor(data, left, right) {
        // 数据
        this.data = data;
        // 左节点
        this.left = left;
        // 右节点
        this.right = right;
    }
    /****
     * 显示节点
    */
    show() {
        return this.data;
    }
}
// 二叉查找树类
class TwoForkTree {
    constructor() {
        // 根节点
        this.root = null;
    }
    /****
     * 加入新节点
    */
    insert(data) {
        console.log(data);
        // 初始化新节点
        let node = new Node(data, null, null);
        // 如果不存在跟节点，将新节点设为跟节点
        if (this.root == null) {
            this.root = node;
        }
        else {
            let current = this.root;
            let parent = null;
            // 循环二叉树
            while (true) {
                parent = current;
                console.log(data, parent.data);
                // 如果新值小于当前节点的值，查找左节点
                if (data < current.data) {
                    current = current.left;
                    if (current == null) {
                        parent.left = node;
                        break;
                    }
                }
                // 新值大于当前节点的值，查找右节点
                else {
                    current = current.right;
                    if (current == null) {
                        parent.right = node;
                        break;
                    }
                }
            }
        }
    }
    /******
     * 中序遍历二叉树
    */
    inOrder() {
        let node = this.root;
        return inOrder(node);
    }
}


/****
 * 中序遍历二叉树
*/
let inOrder = (function() {
    let retArr = [];
    let i = 0;
    function inOrder(node) {
        if (!(node == null)) {
            console.log('----' + i++, node.show());
            // retArr.push(node.show());
            // console.log(node.show());
            inOrder(node.left);
            inOrder(node.right);
            
        }
        return retArr;
    }
    return inOrder;
})();
/****
 * 先序遍历二叉树
*/
let preOrder = (function() {
    let retArr = [];
    function preOrder(node) {
        if (!(node == null)) {
            retArr.push(node.show());
            console.log(node.show());
            preOrder(node.left);
            preOrder(node.right);
        }
        return retArr;
    }
    return preOrder;
})();

let numsTree = new TwoForkTree();
numsTree.insert(23);
numsTree.insert(45);
numsTree.insert(16);
numsTree.insert(37);
numsTree.insert(3);
numsTree.insert(99);
numsTree.insert(22);
console.log('two fork search tree');
console.log(numsTree.inOrder());

let root = numsTree.root;
console.log(root.show());
console.log(root.left.show(), root.right.show());
console.log(root.left.left.show(), root.left.right.show());
console.log(root.right.left.show(), root.right.right.show());


/*****/
function factorial(number) {
    console.log('factorial(' + number + ') * ')
    if (number === 1) {
        return number;
    }
    else {
        return number * factorial(number - 1);
    }
}
// console.log(factorial(5));