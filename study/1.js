
// a();
// b();

// function a() {
//   console.log('a');
// }

let a = 1;
let b = function bar() {
  console.log('b');
  a++
  if (a <= 3) {
    // b();
    // arguments.callee();
    bar();
  }
  
};

// console.log(a.name);
// console.log(b.name);
b();
