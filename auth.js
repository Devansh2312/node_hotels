const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require( './models/person' );



passport.use(new LocalStrategy(async (USERNAME, PASSWORD, done) =>{
  // authentication logic here
  try{
      // console.log('Recieved Credentials:', USERNAME, PASSWORD); // duniya ka sabse kharab kaam
      const user = await Person.findOne({username : USERNAME});
      if(!user){
          return done(null, false, {message:'Incorrect Username.'});
      }
      const isPasswordMatch = await user.comparePassword(PASSWORD);
      if(isPasswordMatch){
          return done(null, user);
      }
      else{
          return done(null, false, { message: 'Incorrect Password.' });
      }
  }
  catch(err){
      console.error("Error in local strategy", err);
      return done(err);
  }
}));

module.exports = passport;