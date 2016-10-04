(function () {

  // var Test = function (id) {
  //   this.id = id;
  //   this.results = null;
  // };
  // Test.prototype = {
  //   assert: function (value, desc) {
  //     var li = document.createElement('li');
  //     li.className = value ? 'pass' : 'fail';
  //     li.appendChild(document.createTextNode(desc));
  //     this.results.appendChild(li);
  //     if (!value) {
  //       li.parentNode.parentNode.className = 'fail';
  //     }
  //     return li;
  //   },
  //   test: function (name, fn) {
  //     this.results = document.getElementById(this.id);
  //     this.results = this.assert(true, name).appendChild(
  //       document.createElement('ul')
  //     );
  //     fn && fn();
  //   }
  // };
  // window.Test = Test;

  var results;
  this.assert = function(value, desc) {
    var li = document.createElement('li');
    li.className = value ? 'pass' : 'fail';
    li.appendChild(document.createTextNode(desc));
    results.appendChild(li);
    if (!value) {
      li.parentNode.parentNode.className = 'fail';
    }
    return li;
  };

  this.test = function(name, fn) {
    results = document.getElementById('results');
    results = assert(true, name).appendChild(
      document.createElement('ul')
    );
    fn();
  };


})();