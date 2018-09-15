(function() {
  const redAlert = [
    'plastic straws',
    'Brandon',
  ];

  // http://2018zoohackathon.ajzane.com/wp-json/wp/v2/posts/

  var myImage = document.querySelector('img');

  fetch('http://2018zoohackathon.ajzane.com/wp-json/wp/v2/posts/', {
        method: 'get'
    })
    .then(response => response.json())
    .then(jsonData => console.log(jsonData))
    .catch(err => {
            console.log(err);
          });


  var context = document.querySelector("body"); // requires an element with class "context" to exist
  var options = {
    end: function(count) {
      console.log(count);
    }
  };
  var instance = new Mark(context, options);
  instance.markRegExp(/Karazan/gmi);
  console.log(instance.markRanges.length);
  
})();
