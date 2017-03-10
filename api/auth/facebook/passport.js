var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(User) {
    passport.serializeUser( function( user, cb ) {
        //nothing to do here as we use the username as it is
        cb( null, user );
    } );

    passport.deserializeUser( function( obj, cb ) {
        //again, we just pass the username forward
        cb( null, obj );
    } );

    passport.use(new FacebookStrategy({
      clientID: '1327572307330779',
      clientSecret: '33c1464e1aeed505bca9e602bbcd0dcd',
      callbackURL: 'localhost:6699/api/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOneOrCreate(
        { username: profile.id},
        { username: profile.id, facebookId: profile.id },
        function (err, user) {
          return cb(err, user);
      });
    }
  ));
}
