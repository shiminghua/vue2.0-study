/**
 * 闭包 - 私有变量
 */
function Ninja() {
  var feints = 0;
  this.getFeints = function() {
    return feints;
  }
  this.feint = function() {
    feints++;
  }
}

var ninja = new Ninja();
ninja.feint();

assert(ninja.getFeints() === 1, 'We are able to access the internal feint count.');
assert(ninja.feints === undefined, 'And the private data is inaccessible to us.');