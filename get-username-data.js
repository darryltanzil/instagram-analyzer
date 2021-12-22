const prompt = require('prompt-sync')();
var username = prompt("Enter in the username you wish to determine:")

var request = require('request');
request('https://www.instagram.com/' + username + '/?__a=1', function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var importedJSON = JSON.parse(body);
     console.log(importedJSON);
  }
  else {
    console.log("Username not found.");
  }
})




