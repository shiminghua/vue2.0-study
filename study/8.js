
const a = [undefined, undefined, undefined];
const b = new Array(3);

let r1 = a.map(() => 'a')
let r2 = b.map(() => 'a');

console.log(r1, r2);

for (let i = 0; i < b.length; i++) {
  console.log(b[i]);
  console.log(i);
  b[i] = 1;
  console.log(b);
}
