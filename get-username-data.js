const prompt = require('prompt-sync')();
var username = prompt("Enter in the username you wish to determine:")

// fetch JSON Data
var request = require('request');

request('https://www.instagram.com/' + username + '/?__a=1', function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var importedJSON = JSON.parse(body);
     console.log(importedJSON);

     // get user id by fetching logging page id and filtering to only numbers
     var user_id = importedJSON["logging_page_id"].replace(/\D/g,'');
     console.log(user_id);

     //var followingList = getFollowList(1, user_id);
     //var followerList = getFollowList(2, user_id);
     
  }
  else {
    console.log("Username not found.");
  }
})

/*

// (@signature Integer String -> (listof String))
// retrive follow list from user_id JSON data
function getFollowList (type, user_id) {
    options = {
      userId: user_id,
      list: type //1 for following, 2 for followers
    }

    var newWindow = window.open(`https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=` + encodeURIComponent(JSON.stringify({
      "id": options.userId,
      "include_reel": true,
      "fetch_mutual": true,
      "first": 50
  })), "_blank");

    newWindow.document.createElement('script');
    script.src = 'fetch-list.js';
    newWindow.document.head.appendChild(script);
}

*/


