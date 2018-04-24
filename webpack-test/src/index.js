/**
 * index
 */

import _ from 'lodash';
import printMe from './print.js';

import './style.css';
import './index.less';

console.log(2222, process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development model!');
}


function component() {
  var element = document.createElement('div');
  var button = document.createElement('button');
  var br = document.createElement('br');

  button.innerHTML = 'Click me and look at the console!';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);

  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;

    print();
  });

  return element;
}

// async function getComponent() {
//   var element = document.createElement('div');
//   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');

//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//   return element;
// }

let element = component();
document.body.appendChild(element);
// getComponent().then(component => {
//   document.body.appendChild(component);
// });

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe moduile!');
    // printMe();
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}