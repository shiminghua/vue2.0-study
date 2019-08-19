
function createArray(size = 0) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr[i] = i;
  }
  return arr;
};

function repeat(times, value) {
  let arr = [];
  for (let i = 0; i < times; i++) {
    arr.push(value);
  }
  return arr;
}

// function repeat(times, value) {
//   let arr = new Array(times);
//   return arr.map(() => value);
// }

// 把value换成函数
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

console.log(result);

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

// a = iterateUntil((n) => Math.pow(2, n + 1), (n) => n <= Math.pow(2, 20), 1);

console.log(a, b);

// => [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
