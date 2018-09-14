let obj = { name: 'sven' };

let A = function () {
  this.age = 10;
};
A.prototype = obj;
A.prototype.getAge = function () { };

// let a = new A();

let B = function () { };
B.prototype = new A();
B.prototype.getName = function () { };

let b = new B();

console.log(A, b);
console.log(b.name);

function inheritObject(obj) {
  function F() { };
  F.prototype = obj;
  return new F();
};
function inheritPrototype(subClass, superClass) {
  let p = inheritObject(superClass.prototype);
  p.contructor = subClass;
  subClass.prototype = p;
}

let C = function () { };
inheritPrototype(C, A);
let c = new C();
console.log(c);

let D = function() {};
D.prototype = inheritObject(A.prototype);

let d = new D();
console.log(d);