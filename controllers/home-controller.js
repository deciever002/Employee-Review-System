//action to render home page
module.exports.home = function(req,res){
    res.render('home',{
        title: "Home"
    })
}

//action to render signin page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signin',{
        title: "Sign In"
    })
}

//action to render signup page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signup',{
        title: "Sign Up"
    })
}