function urlToPath(url) {
  var path = require('url').parse(url).pathname;
  var result = '.' + decodeURIComponent(path);
  // Replace all '../'
  return result.replace(/\.\.\//g, '');
}