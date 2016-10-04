/**
 * object
 */
// function Ninja() { }
// Ninja.prototype.swingSword = function () {
//   return true;
// };
// var ninja1 = Ninja();
// assert(ninja1 === undefined, 'No Instance of Ninja created.');

// var ninja2 = new Ninja();
// assert(ninja2 && ninja2.swingSword && ninja2.swingSword(), 'Instance exists and method is callable.');

// function Ninja() {
//   this.swung = false;
//   this.swingSword = function() {
//     return !this.swung;
//   };
// }
// Ninja.prototype.swingSword = function() {
//   return this.swung;
// };

// var ninja = new Ninja();
// assert(ninja.swingSword(), 'Called the instance method, not the prototype method.');


// function Ninja() {
//   this.swung = true;
// }
// var ninja = new Ninja();
// Ninja.prototype.swingSword = function() {
//   return this.swung;
// }
// assert(ninja.swingSword(), 'Method exists, even out of order.');
// console.log(ninja);
// console.log(ninja.constructor);
// console.log(ninja.constructor.prototype);
// console.log(ninja.constructor.prototype.swingSword);

// assert(typeof ninja === 'object', 'The type of the instance is object');
// assert(ninja instanceof Ninja, 'instanceof identifies the constructor.');
// assert(ninja.constructor === Ninja, 'The ninja object was created by the Ninja function.');


function Person() {}
Person.prototype.dance = function() {

};
function Ninja() {}
Ninja.prototype = new Person();

var ninja = new Ninja();
assert(ninja instanceof Ninja, 'ninja receives functionality from the Ninja prototype.');
assert(ninja instanceof Person, '... and the Person prototype');
assert(ninja instanceof Object, '... and the Object prototype.');
assert(typeof ninja.dance === 'function', '... and can dance!');
console.log(Array.prototype.forEach);

console.log(HTMLElement);
HTMLElement.prototype.remove = function() {
  if (this.parentNode) {
    this.parentNode.removeChild(this);
  }
}
var a = document.getElementById('a');
a.parentNode.removeChild(a);
document.getElementById('b').remove();

assert(!document.getElementById('a'), 'a is gone.');
assert(!document.getElementById('b'), 'b is gone too.');


// 模拟array功能
function MyArray() {}
MyArray.prototype.length = 0;
(function() {
  var methods = ['push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'join'];
  for (var i = 0; i < methods.length; i++) {
    (function(name) {
      MyArray.prototype[name] = function() {
        return Array.prototype[name].apply(this, arguments);
      }
    })(methods[i]);
  }
})();

var mine = new MyArray();
mine.push(1, 2, 3);
assert(mine.length === 3, 'All the items are our sub-clsssed array.');
assert(!(mine instanceof Array), 'We are not subclassing Array, though.');


function Test() {
  return this instanceof Text;
}

assert(!Test(), 'We did not instantiate, so it returns false.');
assert(new Test(), 'We did instantiate, returning true');

function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }
  this.name = first + ' ' + last;
}
var name = 'Rukia';
var user = User('Ichigo', 'Kurosaki');
assert(name === 'Rukia', 'Name was set to Rukia');
assert(user instanceof User, 'User instantiated');
assert(user.name === 'Ichigo Kurosaki', 'User name correctly assigned.');