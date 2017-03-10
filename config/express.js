'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./environment');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
// var scribe = require('scribe-js')();


module.exports = function(app) {
  var env = app.get('env');

  app.use(cookieParser('hackathon', {maxAge: 120}));
  app.use(session({
    secret: 'hackathon'
  }));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // app.use(scribe.express.logger());
  // app.use('/logs', scribe.webPanel());


  var appPath = path.join(config.root, 'app');
  var bowers = path.join(config.root, 'bower_components');

  app.use(express.static(appPath));


  if (env === 'development') {
    app.use('/bower_components', express.static(bowers));
  }
};
