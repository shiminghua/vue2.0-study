
const createDate = new Date('2018-03-09T11:54:09.415954Z');
const currentDate = new Date();

console.log((new Date() - new Date('2018-03-09T11:54:09.415954')) / 60000);
console.log((new Date() - new Date('2018-03-09T11:54:09.415954Z')) / 60000);

const timeTwo = 2 * 60 * 60 * 1000;

console.log(createDate.getTimezoneOffset());
console.log(createDate.toString(), createDate.toUTCString(), createDate.getTime());
console.log(currentDate.toString(), currentDate.toUTCString(), Date.now(), currentDate.getTime(), timeTwo);

console.log(Date.now() - currentDate.getTime(), Date('2018-03-09T11:54:09.415954'));

console.log(Date.UTC('2018-03-09T11:54:09.415954Z'));


