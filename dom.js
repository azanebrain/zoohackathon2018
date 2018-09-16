(function() {

  var myImage = document.querySelector('img');

  let posts = {};
  let categories = {};
  let countTotal = 0;

  fetch('https://2018zoohackathon.ajzane.com/wp-json/wp/v2/categories?per_page=100', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then((response) => { return response.json() })
  .then((jsonData) => {
    
    var context = document.querySelector("body"); // expensive.

    const categoryNames = jsonData.filter(category => category.name != "Uncategorized")
    .map((item) => { return item.name; }).forEach((item) => {
        var options = {
          "each": function (count) {
            console.log('~each: ', count);
          },
          "end": function (count) {
            console.log('~end: ', count);
          },
          "done": function (count) {
            console.log('~done: ', count);
            countTotal += count
          },
          "ignoreJoiners": true,
          "accuracy": "exactly",
          "separateWordSearch": false
        };
        var instance = new Mark(context);
        instance.mark(item, options);
      });


      chrome.runtime.sendMessage(null, {
        count: countTotal,
        posts: [42, 1337]
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


})();
