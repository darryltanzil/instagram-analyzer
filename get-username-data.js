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

     var followingList = getFollowList(1, user_id);
     var followerList = getFollowList(2, user_id);
    
  }
  else {
    console.log("Username not found.");
  }
})

// (@signature Integer String -> (listof String))
// retrive follow list from user_id JSON data
function getFollowList (type, user_id) {
    options = {
      userId: user_id,
      list: type //1 for following, 2 for followers
  }

  let config = {
      followers: {
        hash: 'c76146de99bb02f6415203be841dd25a',
        path: 'edge_followed_by'
      },
      following: {
        hash: 'd04b0a864b4b54837c0d870b0e77e076',
        path: 'edge_follow'
      }
    };
    
    var allUsers = [];
    
    function getUsernames(data) {
        var userBatch = data.map(element => element.node.username);
        allUsers.push(...userBatch);
    }
    
    async function makeNextRequest(nextCurser, listConfig) {
        var params = {
            "id": options.userId,
            "include_reel": true,
            "fetch_mutual": true,
            "first": 50
        };
        if (nextCurser) {
            params.after = nextCurser;
        }
        var requestUrl = `https://www.instagram.com/graphql/query/?query_hash=` + listConfig.hash + `&variables=` + encodeURIComponent(JSON.stringify(params));
    
        var xhr = new XMLHttpRequest();
        xhr.onload = function(e) {
            var res = JSON.parse(xhr.response);
    
            var userData = res.data.user[listConfig.path].edges;
            getUsernames(userData);
    
            var curser = "";
            try {
                curser = res.data.user[listConfig.path].page_info.end_cursor;
            } catch {
    
            }
            var users = [];
            if (curser) {
                makeNextRequest(curser, listConfig);
            } else {
                var printString =""
                allUsers.forEach(item => printString = printString + item + "\n");
                console.log(printString);
            }
        }
    
        xhr.open("GET", requestUrl);
        xhr.send();
    }
    
    if (options.list === 1) {
    
        console.log('following');
        makeNextRequest("", config.following);
    } else if (options.list === 2) {
    
        console.log('followers');
        makeNextRequest("", config.followers);
    }

    return allUsers;
}



