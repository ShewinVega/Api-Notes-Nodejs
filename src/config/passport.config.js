const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');


passport.use('local', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {

  // Match email's user
  const user = await User.findOne({ email });

  if(!user) {
    return done(null, false, {
      error: true,
      message: 'User not found',
    });
  }

  // Match password's user
  const match = await user.matchPassword(password);
  if(!match) {
    return done(null, false, {
      error: true,
      message: `Incorrect Password`
    });
  }

  return done(null, user);
}));

passport.serializeUser((user, done) => {
  return done(null,user.id);
});

passport.deserializeUser(async (id, done) => {

  try {

    const user = await User.findById(id).lean();
    if(!user) {
      return done(null, false, {message:`User not found`});
    }

    return done(null, user);
  
  } catch (error) {
    return done(error);
  }

});