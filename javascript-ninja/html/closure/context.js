/**
 * 闭包 - 绑定函数上下文
 */

// function bind(context, name) {
//   return function() {
//     return context[name].apply(context, arguments);
//   }
// }

if (!Function.prototype.bind) {
  Function.prototype.bind = function(context) {
    var self = this, args = Array.prototype.slice.call(arguments);
    return function() {
      return self.apply(context, args.slice(1));
    }
  }
}

var button = {
  clicked: false,
  click: function() {
    this.clicked = true;
    assert(button.clicked, 'The button has been clicked');
    console.log(this);
  }
};

var elem = document.getElementById('test');
// elem.addEventListener('click', button.click, false);
elem.addEventListener('click', button.click.bind(button), false);
// elem.addEventListener('click', function() {
//   button.click.apply(button, arguments);
// }, false);