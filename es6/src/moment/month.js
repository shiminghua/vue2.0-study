import moment from 'moment';


function getLastMonth() {

  let now = moment();
  console.log('当前时间：', now.format());
  now.set('date', 31);
  console.log('设置为31号：', now.format());
  let month = now.get('month');
  now.set('month', month - 1);
  console.log('减去一个月的时间：', now.format());

  console.log('月的第一天', now.startOf('month').format());
  console.log('月的最后一天', now.endOf('month').format());

  return now;
}

console.log(getLastMonth());

console.log('月的第一天', moment().startOf('month').format());