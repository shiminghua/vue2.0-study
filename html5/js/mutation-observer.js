function onchange(mutationRecords, mutationObserver) {
    console.log('检测到DOM变化');
    console.log(mutationRecords);
    console.log(mutationObserver);
}
var div = document.getElementById('div');
var mo = new window.MutationObserver(onchange);
var options = {childList: true};
mo.observe(div, options);
function changeDiv() {
    var span = document.createElement('span');
    var a = document.createElement('a');
    span.innerHTML = '我是一个span元素';
    a.innerHTML = '我是一个a元素';
    div.appendChild(span);
    div.appendChild(a);
}