var path = require('path');

module.exports = function(app) {
  // Insert routes below
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/user', require('./api/user'));
  app.use('/api/eat', require('./api/eat'));
  app.use('/api/exercise', require('./api/exercise'));

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve('app' + '/index.html'));
    });


};
