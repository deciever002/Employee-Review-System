//Require all the necessary modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

//Use this new local strategy to initialize an identity in session
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async function(req,email,password,done){
    try{
        //find the user
        const user = await User.findOne({ email });

        //If the user isn't found then provide the user with the prompt invali email
        if(!user){
            req.flash('error', 'Invalid Username');
            return done(null, false , { message: 'Incorrect Email'});
        }

        //If the user is found compare the password
        const isPasswordValid = await bcrypt.compare(password,user.password);

        //If the password is not valid then display the prompt Incorrect password
        if(!isPasswordValid){
            req.flash('error', 'Invalid Password');
            return done(null, false , { message: 'Incorrect Password'} );
        }

        //If everything is succesfful then pass the callback along with the user
        return done(null,user);
    }
    catch(error){
        //If there is an error then prompt the user with the error message
        req.flash('error', error);
        console.log('Passport error occured while verifying user',error);
        //return the callback with error object
        return done(error);
    }
}));

//serializes the user data into session and store that cookie in the browser and db
passport.serializeUser((user,done) => {
    //callback which is used to serialize user id
    done(null,user.id);
});


//deserialize the user by finding the user from session
passport.deserializeUser(async (id,done) => {
    try{
        //find the user from session by passing id
        let user = await User.findById(id);
        done(null,user);
    }catch(err){
        //if something went wrong while deserializing pass err object in callback with second argument as false
        console.log("error occured while deserializing",err);
        done(err,false);
    }
});


//Set the authenticated user to locals for use of views
passport.setAutheticatedUser = function(req,res,next){
    //set the user if exists to locals for views to read it
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

//export this module to use in other modules
module.exports = passport;