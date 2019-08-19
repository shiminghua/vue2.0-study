function createArray(size = 0) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr[i] = i;
  }
  return arr;
};

// 第二次改写，把value换成函数
function repeatedly(times, fn) {
  // 使用 new Array(num) 生成的空数组对 map 函数不友好
  // 使用 map 进行遍历时返回空数组。
  // let arr = new Array(times);
  let arr = createArray(times);
  return arr.map(fn);
}


let result = repeatedly(3, () => {
  return (Math.floor(Math.random() * 10) + 1);
});
// result = repeat(3, 1);

// console.log(result);
// => [1, 2, 5]


// 第三次改写，全部换成函数
function iterateUntil(fn, check, init) {
  let ret = [];
  let result = fn(init);


  while (check(result)) {
    ret.push(result);
    result = fn(result);
  }


  return ret;
}


let a = iterateUntil((n) => n + n,
  (n) => (n <= 1024),
  1);
let b = repeatedly(15, (n) => Math.pow(2, n + 1));


// console.log(a, b);

Promise.resolve(1)
.then(r => {
  console.log(1);
})
.then(() => {
  console.log(2);
  throw new Error('aaa');
}, (e) => {
  console.error(e);
  console.log(44);
})
.then(() => {
  console.log(3);
}, (e) => {
  console.error(e);
  console.log(4);
}) 
.catch(e => {
  console.log(5);
  console.error(e);
})
.then(() => {
  console.log('end');
});

(function() {})();
