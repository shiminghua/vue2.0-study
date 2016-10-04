/**
 * 即时函数
 */
(function() {
  var numClicks = 0;
  document.addEventListener('click', function(){
    console.log(++numClicks);
  }, false);
})();

document.addEventListener('click', (function() {
  var numClicks = 0;
  return function() {
    console.log(++numClicks);
  }
})(), false);

(function(text) {
  console.log(text);
})('show msg');

(function() {
  var jQuery = window.jQuery = function() {};
})();

var jQuery = (function() {
  function jQuery() {}
  return jQuery;
})();