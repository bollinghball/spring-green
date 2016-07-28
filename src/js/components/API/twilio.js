
var accountSid = 'ACc9c7cdcd6f86e2a7851ac1b9c52686e6'; 
var authToken = '[9acfa71ba14cd7bc274f3a9885e09450]';

var client = require('twilio')(accountSid, authToken);

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