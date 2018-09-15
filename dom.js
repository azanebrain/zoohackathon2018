(function() {

  var myImage = document.querySelector('img');

  let posts = {};
  let categories = {};

  fetch('https://2018zoohackathon.ajzane.com/wp-json/wp/v2/categories/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then((response) => { return response.json() })
  .then((jsonData) => {
    
    var context = document.querySelector("body"); // expensive.

    const categoryNames = jsonData.filter(category => category.name != "Uncategorized")
    .map((item) => { return item.name; }).forEach((item) => { console.log(item);
        var options = {
          end: function(count) {
            console.log(count);
          },
          ignoreJoiners: true,
          accuracy: 'exactly',
          separateWordSearch: false
        };
        var instance = new Mark(context, options);
        instance.mark(item);
      });
    return categories = jsonData;
  })
  .catch(err => {
    console.log(err);
  });


  fetch('https://2018zoohackathon.ajzane.com/wp-json/wp/v2/posts/', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => { response.json() })
  .then((jsonData) => { posts = jsonData; } )
  .catch(err => {
    console.log(err);
  });
  
  chrome.runtime.sendMessage(null, {
    count: 42
  });

})();
