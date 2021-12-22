your_user_id = prompt("Enter in your username")

options = {
    userId: your_user_id,
    list: 1 //1 for following, 2 for followers
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
