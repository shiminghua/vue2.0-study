
// const a = {
//   a: 1,
//   b: 2,
//   c: 3,
//   *[Symbol.iterator]() {
//     // yield 'a';
//     // yield 'b';
//     // yield 'c';
//     let arr = Object.keys(a);
//     for (let i = 0; i < arr.length; i++) {
//       yield arr[i];
//     }
//   }
// };

// for (let key of a) {
//   console.log(key, a[key]);
//   // console.log(key);
// }

function* a() {
  yield 1;
  yield 2;
}

function* b() {
  yield 3;
  yield* a();
  yield 4;
}

let bb = b();
for (let i = 0; i < 8; i++) {
  // setTimeout(() => {
  //   console.log(bb.next());
  // }, 1000);
}
