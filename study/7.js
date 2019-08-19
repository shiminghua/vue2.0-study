
// function a() {
//   let i = 0;
//   return () => {
//     console.log(i++);
//   };
// }

// const x = a();
// x();
// x();
// x();
// const y = a();
// y();


function sum(a, b, c) {
  return a + b + c;
}

sum(2, 3, 4);
// => 9

function currySum(a) {
  return (b) => {
    return (c) => {
      return a + b + c;
    }
  }
}

console.log(currySum(2)(3)(4));
