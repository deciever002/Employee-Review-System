module.exports.isEmployeeAuthenticated = function(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.role === 'employee'){
            next();
            return;
        }else{
            return res.send('You are not Authorized to view this page');
        }
    }

    return res.redirect('/signin');
}