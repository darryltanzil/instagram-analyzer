const prompt = require('prompt-sync')();
var username = prompt("Enter in the username you wish to determine:")

// fetch JSON Data
var request = require('request');

request('https://www.instagram.com/darryltanzil/?__a=1', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
     /* var importedJSON = JSON.parse(body);
     console.log(importedJSON);

     // get user id by fetching logging page id and filtering to only numbers
     var user_id = importedJSON["logging_page_id"].replace(/\D/g,'');
     console.log(user_id);

     //var followingList = getFollowList(1, user_id);
     //var followerList = getFollowList(2, user_id);
     */
  }
  else {
    console.log("Username not found.");
  }
})
