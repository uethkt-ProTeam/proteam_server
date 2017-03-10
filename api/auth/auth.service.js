'use strict';

var passport = require('passport');
var config = require('./config');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../user/user.model');

var validateJwt = expressJwt({
  secret: config.secret
});

module.exports = {
  /**
   * Attaches the user object to the request if authenticated
   * Otherwise returns 403
   */
  isAuthenticated : function() {
    return compose()
    // Validate jwt
      .use(function(req, res, next) {
        // allow access_token to be passed through query parameter as well
        if (req.cookies.token) {
          // if (req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = 'Bearer ' + req.cookies.token;
          // }
        }
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use(function(req, res, next) {
        User.findById(req.user._id).exec()
          .then(user => {
            if (!user) {
              return res.json({code: 0, message: 'Not login yet '});
            }
            req.user = user;
            next();
          })
          .catch(err => next(err));
      });
  },

  /**
   * Checks if the user role meets the minimum requirements of the route
   */
  hasRole: function(roleRequired) {
    if (!roleRequired) {
      throw new Error('Required role needs to be set');
    }

    return compose()
      .use(this.isAuthenticated())
      .use(function(req, res, next) {
        if (config.userRoles.indexOf(req.user.role) >=
          config.userRoles.indexOf(roleRequired)) {
          next();
        } else {
          res.json({code: 0, message: 'Forbidden. your role do not have permission'});
        }
      });
  },

  /**
   * Returns a jwt token signed by the app secret
   */
  // signToken: function(id, role) {
  //   return
  // },

  /**
   * Set token cookie directly for oAuth strategies
   */
  signToken: function(data, cb) {
    var token =jwt.sign({ _id: data._id, role: data.role }, config.secret, {
      expiresIn: 60 * 3000
    });
    cb(token);
  }
};
