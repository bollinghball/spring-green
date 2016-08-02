
var testAccountSid = 'ACf6cd978c9975f85e36cac227309efe48'; 
var testAuthToken = '[46608c028aaeca0b2088beab1c07b480]';

var client = require('twilio')(testAccountSid, testAuthToken);

// Example of how to send a message reminder:
// 
// client.messages.create({ 
//     to: "+16518675309", 
//     from: "+18038324951", 
//     body: "Water your plants!", 
//     mediaUrl: "",  
// }, function(err, message) { 
//     console.log(message.sid); 
// });