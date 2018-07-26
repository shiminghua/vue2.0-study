// @flow

function foo(x: number): number {
  return x + 10;
}

function foo2(x: number | boolean): number | string {
  if (typeof x === 'number') {
    return x + 10;
  }
  return 'x is a boolean.';
}

console.log(foo2(6));
console.log(foo2(true));
// console.log(foo2(null));