const User = require('../models/user');

 //REGISTER MIDDLWARE
 
 exports.signup = (req, res, next) =>{
    console.log('req.body content', req.body);
    const user = new User(req.body)
    console.log('newUser', user);
    user.save((err, user) => {
        if(err)
            next(err)
        user.salt = undefined;
         user.hashed_password = undefined;
            res.json({
                user
            });

    })
}