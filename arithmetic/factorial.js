
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.question('请输入', (answer) => {
//   console.log('输入的是：', answer);
// });

rl.on('line', (input) => {
  console.log('接收到：', input);
  console.time('a');
  console.log('阶乘为：', factorialOne(input));
  console.timeEnd('a');
  console.time('b');
  console.log('尾调用优化：', factorial(input));
  console.timeEnd('b');
});

function factorialOne(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorialOne(n - 1);
}

function factorial(n, p = 1) {
  if (n <= 1) {
    return 1 * p;
  }
  let results = n * p;
  return factorial(n - 1, results);
}
