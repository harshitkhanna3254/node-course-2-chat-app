// Jan 1st 1970 00:00:00 AM   "Unix Epic"

var moment = require('moment');


var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createdAt = 1234;
var date = new moment(createdAt);

console.log(date.format('h:mm A'))
// 10:35 AM