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
    list.next();
    console.log(list.currPos(), list.getElement());
}
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


console.log(new DataStructure.TwowayLinkedList());