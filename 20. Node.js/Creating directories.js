function creatingDirectories() {
  methods.MKCOL = function (path, respond) {
    // Read information about the directory
    fs.stat(path, function (error, stats) {
      // When file is not found, create the directory
      if (error && error.code === 'ENOENT') {
        fs.mkdir(path, respondErrorOrNothing(respond));
      }
      // Any errors we didn’t expect with status code 500,
      // which indicates that the problem exists in the server
      else if (error) {
        respond(500, error.toString());
      }
      // When a directory exists at that path,
      // return a 204 response
      else if (stats.isDirectory()) {
        respond(204);
      }
      else {
        // File here exists
        respond(400, 'bad request');
      }
    });
  };
}