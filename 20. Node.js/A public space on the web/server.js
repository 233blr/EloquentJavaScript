var http = require('http');
var fs = require('fs');
var obj = '';

http.createServer(function (req, res) {
  if (req.url === '/') {
    sendMainPage('index.html', res);
  } else if (req.url === '/addlist') {
    sendFileList(res);
  } else if (req.method === 'POST') {
    // process the request body
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      obj = JSON.parse(body);
      saveFile(obj.message, obj.path);
      res.end();
    });
    // req.url used as file path
  } else if (/^\/files\//.test(req.url)) {
    sendTextContent(req.url, res);
  } else {
    res.statusCode = 400;
    res.end('Bad request');
  }
}).listen(8000, function () {
  console.log('server online');
});

// Receives the message and the path to
// the desired file and rewrites it
function saveFile(message, path) {
  fs.writeFile(path, message, function (err) {
    if (err) {
      console.error(err);
    }
  });
}

// Receives the path to the file and sends its contents
function sendTextContent(path, res) {
  fs.readFile('.' + path, 'utf8', function (err, data) {
    if (err) {
      console.error(err);
    } else {
      res.end(data);
    }
  });
}

// Receives all filenames in a folder
// and sends a string of filenames
function sendFileList(res) {
  fs.readdir('./files', function (err, files) {
    if (err) {
      console.error(err);
    } else {
      res.end(files.join(' '));
    }
  });
}

// Render index.html
function sendMainPage(fileName, res) {
  var fileStream = fs.createReadStream(fileName);
  fileStream.on('error', function () {
    res.statusCode = 500;
    res.end('Server error');
  });
  fileStream.pipe(res);
  fileStream.on('close', function () {
    fileStream.destroy();
  });
}