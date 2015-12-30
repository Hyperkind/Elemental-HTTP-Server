var http = require('http');
var fs = require('fs');

// Creates the server
var server = http.createServer(function requestHandler(req, res) {
  req.on('data', function (data) {
    console.log(data.toString());
  });

  switch (req.method.toUpperCase()) {
    // GET Case
    case 'GET':
    console.log('Processing GET request');
    req.on('end', function (data) {
      // Console logs requested page
      console.log(req.url);
      var resource = 'public/';
      if (req.url === '/') {
        resource += 'index.html';
      } else {
        resource += req.url;
      }

      fs.readFile(resource, function (err, data) {
        // If err, loads 404 page
        if (err) {
          console.log('Page cannot be found');
          res.statusCode = 404;
          res.statusMessage = "Page cannot be found...";
          return fs.readFile('public/404.html', function (err, rawbuffer) {
            return res.end(rawbuffer);
          });
        }
        // If no err, loads requested page
        return res.end(data.toString());
      });
    });
    break;

    // POST Case
    case 'POST':
    console.log('Processing POST request');


    break;
  }
});

// Listens for the server
server.listen(8080, function () {
  console.log('Listening at: http://localhost:' + 8080);
});