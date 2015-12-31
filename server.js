var http = require('http');
var fs = require('fs');

// Creates the server
var server = http.createServer(function requestHandler(req, res) {
  req.on('data', function (data) {
    console.log(data.toString());
  });

  // Sets up the switch case to watch for the GET and POST case
  switch (req.method.toUpperCase()) {
    // GET Case
    case 'GET':
    console.log('Processing GET request');
    req.on('end', function (data) {
      // Console logs requested page
      console.log(req.url);
      // Directs default page to index.html if no page requested
      var resource = 'public/';
      if (req.url === '/') {
        resource += 'index.html';
      } else {
        resource += req.url;
      }

      // Directs to the requested page, or the 404 error page if not found
      fs.readFile(resource, 'utf8', function (err, data) {
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
    var stringifiedData = JSON.stringify();

    if (req.url === '/elements') {
      console.log('Connected via POST request');
      fs.writeFile('./public/' + data.elementName + '.html', newPage(data), function (err) {

        // Error case if unable to create page
        if (err) {
          console.log('Unable to create new page');
          res.statusCode = 123;
          res.statusMessage = "Unable to create new page";
          return res.end();
        }
      });
      return res.end();
    } else {
      console.log('Unable to connect');
      return res.end('Please connect through the proper means...');
    }



    break;
  }
});

// Has the server listen
server.listen(8080, function () {
  console.log('Listening at: http://localhost:' + 8080);
});

// Function to build a new page from the POST data
function newPage (data) {
  return '<html lang="en">' +
    '<head>' +
      '<meta charset="UTF-8">' +
      '<title> The Elements - ' + data.elementName + '</title>' +
      '<link rel="stylesheet" href="/css/styles.css">' +
    '</head>' +
    '<body>' +
      '<h1>' + data.elementName + '</h1>' +
      '<h2>' + data.elementSymbol + '</h2>' +
      '<h3>' + 'Atomic number ' + data.elementAtomicNumber + '</h3>' +
      '<p>' + data.elementDescription + '</p>' +
      '<p><a href="/">back</a></p>' +
    '</body>' +
  '</html>';
}

